import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  cellsFor,
  panelIdentity,
  summarize,
  compareSnapshots,
  runMonitor,
  csv,
} from "./monitor.mjs";
const panel = {
  prompts: [
    { id: "a", prompt: "Tools?", weight: 2 },
    { id: "b", prompt: "APIs?", weight: 1 },
  ],
  engines: [{ engine: "chatgpt" }],
  brands: [
    { id: "one", names: ["One"] },
    { id: "two", names: ["Two"] },
  ],
  max_credits: 60,
};
const snapshot = () => ({
  panel,
  panel_hash: panelIdentity(panel),
  cells: cellsFor(panel).map((c, i) => ({
    ...c,
    status: "completed",
    response: {
      request_id: `r${i}`,
      data: {
        observations: [
          { brand_id: "one", mentioned: true, cited: i === 0 },
          { brand_id: "two", mentioned: i === 0, cited: i === 0 },
        ],
      },
    },
  })),
});
test("coverage differs from share with overlapping brands, including weighted counts", () => {
  const result = summarize(snapshot())[0];
  assert.equal(result.brands[0].mention_coverage, 1);
  assert.equal(result.brands[0].mention_share, 2 / 3);
  assert.equal(result.brands[0].weighted_mention_share, 3 / 5);
  assert.equal(
    result.brands.reduce((s, b) => s + b.weighted_mention_share, 0),
    1,
  );
});
test("valid no-answer samples stay in coverage; failures are separate and diffs use paired cells", () => {
  const before = snapshot(),
    after = snapshot();
  after.cells[0].status = "failed";
  after.cells[1].status = "no_answer";
  after.cells[1].response.data.observations = [];
  assert.equal(summarize(after)[0].brands[0].mention_coverage, 0);
  assert.equal(summarize(after)[0].brands[0].citation_share, null);
  assert.equal(compareSnapshots(before, after).paired_cells, 1);
  after.panel_hash = "changed";
  assert.throws(() => compareSnapshots(before, after));
});
test("dry run enforces a live price and maximum budget without making paid calls", async () => {
  let count = 0;
  const fetchImpl = async () => {
    count++;
    return new Response(
      JSON.stringify({
        paths: {
          "/geo/answers": {
            post: { "x-unifapi-billing": { minimum_credits: 30, credits_per_record: 30 } },
          },
        },
      }),
    );
  };
  assert.equal((await runMonitor({ panel, dryRun: true, fetchImpl })).maximum_credits, 60);
  await assert.rejects(() =>
    runMonitor({ panel: { ...panel, max_credits: 59 }, dryRun: true, fetchImpl }),
  );
  assert.equal(count, 2);
});
test("resumes without duplicating completed or unknown calls; protects budget across interruptions", async () => {
  const directory = await mkdtemp(join(tmpdir(), "geo-monitor-"));
  const file = join(directory, "run.json");
  let paid = 0;
  const fetchImpl = async (url, options) => {
    if (String(url).endsWith("openapi.json"))
      return new Response(
        JSON.stringify({
          paths: {
            "/geo/answers": {
              post: { "x-unifapi-billing": { minimum_credits: 30, credits_per_record: 30 } },
            },
          },
        }),
      );
    paid++;
    assert.equal(options.headers["X-Unifapi-Max-Credits"], "30");
    throw new Error("Timeout");
  };
  try {
    await runMonitor({ panel, file, key: "test", fetchImpl });
    assert.equal(paid, 1);
    let state = JSON.parse(await readFile(file, "utf8"));
    assert.equal(state.committed_credits, 30);
    // Simulate a crash immediately after dispatching the remaining cell.
    state.cells[1].status = "in_flight";
    state.cells[1].reserved_credits = 30;
    await writeFile(file, JSON.stringify(state));
    state = await runMonitor({ panel, file, key: "test", fetchImpl });
    assert.equal(paid, 1);
    assert.equal(state.committed_credits, 60);
    assert.equal(state.cells.filter((c) => c.status === "unknown").length, 2);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
test("CSV escapes formulas in user-controlled prompt ids", () => {
  const state = snapshot();
  state.cells[0].prompt_id = '=IMPORTXML("x")';
  assert.match(csv(state), /"'=IMPORTXML/);
});
