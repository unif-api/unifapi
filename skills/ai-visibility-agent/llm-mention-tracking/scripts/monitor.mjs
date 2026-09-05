#!/usr/bin/env node
/** Node 22+. Local, budgeted, resumable collection; no hosted scheduler required. */
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile, rename, open, unlink } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";

const ratio = (a, b) => (b ? a / b : null);
export function validatePanel(panel) {
  if (!Array.isArray(panel.prompts) || !panel.prompts.length || panel.prompts.length > 100)
    throw new Error("Provide 1–100 prompts.");
  if (!Array.isArray(panel.engines) || !panel.engines.length || panel.engines.length > 2)
    throw new Error("Provide ChatGPT and/or Gemini engine settings.");
  if (!Array.isArray(panel.brands) || !panel.brands.length || panel.brands.length > 10)
    throw new Error("Provide 1–10 brands.");
  const samples = panel.samples ?? 1;
  if (!Number.isInteger(samples) || samples < 1 || samples > 5)
    throw new Error("samples must be 1–5.");
  for (const p of panel.prompts)
    if (
      !p.id ||
      typeof p.id !== "string" ||
      typeof p.prompt !== "string" ||
      !p.prompt.trim() ||
      p.prompt.length > 2000 ||
      !Number.isFinite(p.weight ?? 1) ||
      (p.weight ?? 1) < 0
    )
      throw new Error("Invalid prompt id, text, or weight.");
  for (const e of panel.engines)
    if (
      !["chatgpt", "gemini"].includes(e.engine) ||
      (e.engine === "gemini" && e.force_web_search !== undefined) ||
      (e.force_web_search !== undefined && typeof e.force_web_search !== "boolean")
    )
      throw new Error("Invalid engine or forced-search option.");
  for (const b of panel.brands)
    if (
      typeof b.id !== "string" ||
      !b.id ||
      !Array.isArray(b.names) ||
      !b.names.length ||
      b.names.some((n) => typeof n !== "string" || n.length < 2)
    )
      throw new Error("Every brand needs an id and explicit name aliases.");
  for (const values of [
    panel.prompts.map((p) => p.id),
    panel.engines.map((e) => e.engine),
    panel.brands.map((b) => b.id),
  ])
    if (new Set(values).size !== values.length)
      throw new Error("Prompt, engine and brand ids must be unique.");
  if (!Number.isSafeInteger(panel.max_credits) || panel.max_credits < 1)
    throw new Error("Set max_credits to a positive integer.");
  return panel;
}
export function panelIdentity(panel) {
  // Object key order is irrelevant, but prompt/brand order and weights are fixed.
  const stable = (value) =>
    Array.isArray(value)
      ? value.map(stable)
      : value && typeof value === "object"
        ? Object.fromEntries(
            Object.keys(value)
              .sort()
              .map((k) => [k, stable(value[k])]),
          )
        : value;
  const { max_credits: _maxCredits, ...definition } = panel;
  return createHash("sha256")
    .update(JSON.stringify(stable(definition)))
    .digest("hex");
}
export function cellsFor(panel) {
  return panel.engines.flatMap((e) =>
    panel.prompts.flatMap((p) =>
      Array.from({ length: panel.samples ?? 1 }, (_, sample) => ({
        id: JSON.stringify([e.engine, p.id, sample]),
        engine: e.engine,
        prompt_id: p.id,
        sample,
        weight: p.weight ?? 1,
        body: {
          ...e,
          prompt: p.prompt,
          brands: panel.brands,
          location: panel.location ?? "us",
          language: panel.language ?? "en",
        },
      })),
    ),
  );
}
export function summarize(snapshot, allowedIds) {
  const cells = snapshot.cells.filter((c) => !allowedIds || allowedIds.has(c.id));
  return [...new Set(cells.map((c) => c.engine))].map((engine) => {
    const group = cells.filter((c) => c.engine === engine);
    const successful = group.filter((c) => c.status === "completed" || c.status === "no_answer");
    const weight = successful.reduce((sum, c) => sum + c.weight, 0);
    const brands = snapshot.panel.brands.map((brand) => {
      const mentioned = successful.filter(
        (c) => c.response?.data?.observations?.find((o) => o.brand_id === brand.id)?.mentioned,
      );
      const cited = successful.filter(
        (c) => c.response?.data?.observations?.find((o) => o.brand_id === brand.id)?.cited,
      );
      return {
        brand_id: brand.id,
        mentions: mentioned.length,
        citations: cited.length,
        weighted_mentions: mentioned.reduce((s, c) => s + c.weight, 0),
        weighted_citations: cited.reduce((s, c) => s + c.weight, 0),
      };
    });
    const total = (field) => brands.reduce((s, b) => s + b[field], 0);
    return {
      engine,
      planned: group.length,
      attempted: group.filter((cell) => cell.status !== "pending").length,
      successful: successful.length,
      answered: successful.filter((c) => c.status === "completed").length,
      unknown: group.filter((c) => ["in_flight", "unknown"].includes(c.status)).length,
      failures: group.filter((c) => c.status === "failed").length,
      completion_rate: ratio(successful.length, group.length),
      answer_rate: ratio(
        successful.filter((c) => c.status === "completed").length,
        successful.length,
      ),
      brands: brands.map((b) => ({
        ...b,
        mention_coverage: ratio(b.mentions, successful.length),
        citation_coverage: ratio(b.citations, successful.length),
        mention_share: ratio(b.mentions, total("mentions")),
        citation_share: ratio(b.citations, total("citations")),
        weighted_mention_coverage: ratio(b.weighted_mentions, weight),
        weighted_citation_coverage: ratio(b.weighted_citations, weight),
        weighted_mention_share: ratio(b.weighted_mentions, total("weighted_mentions")),
        weighted_citation_share: ratio(b.weighted_citations, total("weighted_citations")),
      })),
    };
  });
}
export function compareSnapshots(previous, current) {
  if (previous.panel_hash !== current.panel_hash)
    throw new Error("Panel changed; create a new baseline instead of comparing.");
  const success = (c) => ["completed", "no_answer"].includes(c.status);
  const before = new Map(previous.cells.filter(success).map((c) => [c.id, c]));
  const paired = new Set(
    current.cells.filter((c) => success(c) && before.has(c.id)).map((c) => c.id),
  );
  return {
    paired_cells: paired.size,
    previous: summarize(previous, paired),
    current: summarize(current, paired),
    changes: current.cells
      .filter((c) => paired.has(c.id))
      .flatMap((c) =>
        current.panel.brands.flatMap((b) => {
          const old = before
              .get(c.id)
              .response?.data?.observations?.find((o) => o.brand_id === b.id),
            now = c.response?.data?.observations?.find((o) => o.brand_id === b.id);
          return ["mentioned", "cited"]
            .filter((k) => Boolean(old?.[k]) !== Boolean(now?.[k]))
            .map((k) => ({
              cell_id: c.id,
              engine: c.engine,
              prompt_id: c.prompt_id,
              brand_id: b.id,
              metric: k,
              change: now?.[k] ? "gained" : "lost",
              previous_request_id: before.get(c.id).response.request_id,
              current_request_id: c.response.request_id,
            }));
        }),
      ),
  };
}
async function save(file, value) {
  await mkdir(dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(temporary, JSON.stringify(value, null, 2) + "\n", { mode: 0o600 });
  await rename(temporary, file);
}
async function lock(file) {
  try {
    const handle = await open(file, "wx", 0o600);
    await handle.writeFile(String(process.pid));
    await handle.close();
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
    const pid = Number(await readFile(file, "utf8"));
    if (!Number.isSafeInteger(pid) || pid < 1)
      throw new Error("Invalid run lock; inspect it before removing it.");
    try {
      process.kill(pid, 0);
    } catch (err) {
      if (err.code === "ESRCH") {
        await unlink(file);
        return lock(file);
      }
      throw err;
    }
    throw new Error(`Another monitor process (${pid}) owns this snapshot.`);
  }
}
export async function runMonitor({
  panel,
  file,
  baseUrl = "https://api.unifapi.com",
  key,
  dryRun = false,
  fetchImpl = fetch,
}) {
  validatePanel(panel);
  const base = new URL(baseUrl);
  if (
    base.username ||
    base.password ||
    base.search ||
    base.hash ||
    !(
      base.protocol === "https:" ||
      (base.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname))
    )
  )
    throw new Error("Use HTTPS, or HTTP on localhost for development.");
  base.pathname = "/";
  const specResponse = await fetchImpl(new URL("openapi.json", base), {
    signal: AbortSignal.timeout(30000),
  });
  if (!specResponse.ok) throw new Error("Cannot verify the current API price.");
  const spec = await specResponse.json();
  const op = spec.paths?.["/geo/answers"]?.post;
  const price = op?.["x-unifapi-billing"];
  if (
    !price ||
    !Number.isSafeInteger(price.minimum_credits) ||
    price.minimum_credits < 1 ||
    price.credits_per_record !== price.minimum_credits
  )
    throw new Error("Live-answer price is unavailable or no longer fixed per answer.");
  const credits = price.minimum_credits,
    cells = cellsFor(panel),
    estimate = cells.length * credits;
  if (estimate > panel.max_credits)
    throw new Error(`Panel requires up to ${estimate} credits; budget is ${panel.max_credits}.`);
  if (dryRun)
    return {
      calls: cells.length,
      credits_per_answer: credits,
      maximum_credits: estimate,
      maximum_usd: estimate / 1000,
    };
  if (!key) throw new Error("Configure UNIFAPI_API_KEY or UNIFAPI_KEY in the environment.");
  file = resolve(file);
  await mkdir(dirname(file), { recursive: true });
  const lockFile = `${file}.lock`;
  await lock(lockFile);
  try {
    let state;
    try {
      state = JSON.parse(await readFile(file, "utf8"));
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }
    const hash = panelIdentity(panel);
    if (state && state.panel_hash !== hash)
      throw new Error("Snapshot belongs to a different panel; use a new file.");
    if (!state)
      state = {
        version: 1,
        panel,
        panel_hash: hash,
        started_at: new Date().toISOString(),
        cells: cells.map((c) => ({ ...c, status: "pending" })),
      };
    // A crash/timeout may have executed and charged the request. Do not retry it
    // automatically: the API idempotency cache is explicitly best-effort.
    for (const c of state.cells)
      if (c.status === "in_flight") {
        c.status = "unknown";
        c.error = "Interrupted after dispatch; reconcile request before collecting a replacement.";
      }
    const spent = () =>
      state.cells.reduce((s, c) => s + (c.credits_charged ?? c.reserved_credits ?? 0), 0);
    const pending = state.cells.filter((c) => c.status === "pending");
    if (spent() + pending.length * credits > panel.max_credits)
      throw new Error("Remaining work exceeds budget at the current price.");
    await save(file, state);
    for (const cell of pending) {
      if (spent() + credits > panel.max_credits) break;
      cell.status = "in_flight";
      cell.reserved_credits = credits;
      cell.dispatched_at = new Date().toISOString();
      await save(file, state);
      try {
        const response = await fetchImpl(new URL("geo/answers", base), {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            "X-Unifapi-Max-Credits": String(credits),
            "Idempotency-Key": createHash("sha256")
              .update(`${hash}:${state.started_at}:${cell.id}`)
              .digest("hex"),
          },
          body: JSON.stringify(cell.body),
          signal: AbortSignal.timeout(160000),
        });
        const body = await response.json();
        cell.response = body;
        cell.http_status = response.status;
        if (
          response.ok &&
          body.data &&
          ["completed", "no_answer"].includes(body.data.status) &&
          body.data.measurement === "live_prompt" &&
          body.data.engine === cell.engine &&
          body.data.prompt === cell.body.prompt &&
          body.data.search_mode === (cell.body.force_web_search ? "forced" : "natural") &&
          Array.isArray(body.data.observations) &&
          body.data.observations.length === panel.brands.length &&
          panel.brands.every((brand) =>
            body.data.observations.some(
              (observation) =>
                observation.brand_id === brand.id &&
                typeof observation.mentioned === "boolean" &&
                typeof observation.cited === "boolean",
            ),
          ) &&
          Number.isSafeInteger(body.billing?.credits_charged) &&
          body.billing.credits_charged >= 0
        ) {
          cell.status = body.data.status;
          cell.credits_charged = body.billing.credits_charged;
        } else {
          cell.status = response.ok ? "unknown" : "failed";
          cell.error = body.error?.type ?? "invalid_response";
          // 5xx without explicit billing can be a failure after dispatch or
          // settlement. Keep the full cost reserved instead of assuming zero.
          const charged = body.error?.billing?.credits_charged;
          if (Number.isSafeInteger(charged) && charged >= 0) cell.credits_charged = charged;
          else if (body.error?.type && response.status >= 400 && response.status < 500)
            cell.credits_charged = 0;
          else cell.status = "unknown";
        }
      } catch {
        cell.status = "unknown";
        cell.error = "Transport outcome unknown; no automatic retry.";
      }
      await save(file, state);
      if (
        cell.http_status === 401 ||
        cell.http_status === 402 ||
        cell.http_status === 429 ||
        cell.status === "unknown"
      )
        break;
    }
    state.updated_at = new Date().toISOString();
    state.committed_credits = spent();
    state.summary = summarize(state);
    await save(file, state);
    await writeFile(`${file}.csv`, csv(state), { mode: 0o600 });
    return state;
  } finally {
    await unlink(lockFile);
  }
}
export function csv(state) {
  const quote = (value) => {
    const text = String(value ?? "");
    return '"' + (/^[=+\-@\t\r]/.test(text) ? "'" : "") + text.replaceAll('"', '""') + '"';
  };
  const rows = [
    [
      "engine",
      "prompt_id",
      "sample",
      "status",
      "brand_id",
      "mentioned",
      "cited",
      "citation_urls",
      "request_id",
      "observed_at",
    ],
  ];
  for (const cell of state.cells)
    for (const b of state.panel.brands) {
      const o = cell.response?.data?.observations?.find((o) => o.brand_id === b.id);
      rows.push([
        cell.engine,
        cell.prompt_id,
        cell.sample,
        cell.status,
        b.id,
        o?.mentioned,
        o?.cited,
        o?.citation_urls?.join(" "),
        cell.response?.request_id,
        cell.response?.data?.observed_at,
      ]);
    }
  return rows.map((row) => row.map(quote).join(",")).join("\n") + "\n";
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const [command, first, second, ...flags] = process.argv.slice(2);
    if (command === "diff") {
      if (!first || !second) throw new Error("Usage: monitor.mjs diff previous.json current.json");
      console.log(
        JSON.stringify(
          compareSnapshots(
            JSON.parse(await readFile(first, "utf8")),
            JSON.parse(await readFile(second, "utf8")),
          ),
          null,
          2,
        ),
      );
    } else if (command === "run") {
      if (!first || !second)
        throw new Error("Usage: monitor.mjs run panel.json snapshot.json [--dry-run]");
      const result = await runMonitor({
        panel: JSON.parse(await readFile(first, "utf8")),
        file: second,
        baseUrl: process.env.UNIFAPI_BASE_URL,
        key: process.env.UNIFAPI_API_KEY ?? process.env.UNIFAPI_KEY,
        dryRun: flags.includes("--dry-run"),
      });
      console.log(JSON.stringify(result.summary ?? result, null, 2));
    } else
      throw new Error(
        "Usage: monitor.mjs run panel.json snapshot.json [--dry-run] | diff previous.json current.json",
      );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
