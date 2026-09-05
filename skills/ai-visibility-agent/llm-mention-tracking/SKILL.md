---
name: llm-mention-tracking
description: When the user wants to track how often their brand or domain gets mentioned across ChatGPT and AI search engines over a set of prompts, and how that share of voice compares to named competitors over time. Also use on "LLM mention tracking," "track AI mentions," "share of voice in AI," "AI share of voice," "brand mentions in ChatGPT," "am I being mentioned more or less," "AI visibility trend," or "monitor AI citations over time." For a one-time audit of a prompt set, see ai-visibility-audit.
license: MIT
metadata:
  author: UnifAPI
  version: "1.1.0"
---

# LLM Mention Tracking

Track a fixed prompt panel across ChatGPT and Gemini, preserving the underlying answers, citations, collection settings, and billing. Run inside the user's assistant or scheduler. UnifAPI supplies public data; this skill does not host a monitoring service.

## Choose the right measurement

Connect with the `unifapi` skill and discover the current operation schemas and prices before collecting data.

- `POST /geo/answers`: executes one custom prompt in the ChatGPT or Gemini web interface. Returns separate `observations.mentioned` (brand-name aliases in answer text) and `observations.cited` (brand domain in answer sources). These observations support a fixed prompt panel.
- `POST /geo/serp`: samples Google AI Mode. It does not collect ChatGPT or Gemini. Its top-level `is_target` can match links as well as references; inspect answer references for citation evidence. `best_rank` is a result position, not a brand recommendation rank.
- `POST /seo/serp` with `include_ai_overview`: samples Google Search with AI Overviews. Keep it separate from AI Mode.
- `POST /geo/mentions/search`: searches an existing answer corpus; it does not execute each of your prompts. `engine: google` here means the Google AI Overviews corpus. The ChatGPT corpus is US/English only; that restriction does not describe live web-answer collection.
- `POST /geo/mentions/cross-aggregated-metrics`: returns counts for labeled target groups, not a ready-made share-of-voice score. Groups can overlap. Analyze these counts as a separate corpus study.
- `POST /geo/mentions/history`, `/delta`, `/new-lost`: provide historical corpus counts, signed changes, and newly observed/lost counts. These cannot reconstruct a customer's historical prompt panel. Coverage and collection changes can affect them.
- `POST /geo/keywords/search-volume`: estimates demand. Estimates are not actual prompt counts, traffic, or conversions. Freeze optional weights with the panel; report unweighted results alongside.

## Workflow

### Freeze the panel

Reuse product context from `.agents/product-marketing.md` or `.claude/product-marketing.md` when present. Record prompt ids and exact text, brand ids and aliases, citation domains, whether subdomains count, engines, locale, sample count, and weights. Use 10–30 relevant prompts to start. Repeated samples describe answer variability; they are not independent audience observations.

Use `force_web_search: false` for natural ChatGPT behavior or `true` for a forced-search study. Never pool the two. Gemini does not support that setting. The response model may be unavailable; retain null rather than inventing a model name.

## Run a budgeted batch and save evidence

A Node 22+ runner is included at `scripts/monitor.mjs`, with `scripts/panel.example.json` as a starting point. Replace the example brands and prompts before use. Configure `UNIFAPI_API_KEY` securely in the environment; do not paste keys into reports.

```bash
node scripts/monitor.mjs run panel.json snapshots/2026-09-05.json --dry-run
node scripts/monitor.mjs run panel.json snapshots/2026-09-05.json
node scripts/monitor.mjs diff snapshots/2026-09-05.json snapshots/2026-09-12.json
```

The runner reads the live OpenAPI price before making paid calls. `max_credits` bounds the run; each request also sends `X-Unifapi-Max-Credits`, so a price change cannot silently exceed its request budget. A successful `/geo/answers` response currently costs 30 credits ($0.03), including a valid no-answer result. Twenty prompts × two engines × two samples costs at most 2,400 credits ($2.40). Check the live contract each time.

The JSON snapshot keeps every response and billing block, request id, dispatch time and status. A sibling CSV exports the evidence rows. Rerunning against the same file resumes pending cells without recollecting successful ones. Transport timeouts and interrupted in-flight calls become `unknown`; the runner budgets their maximum possible cost and never automatically replays them. The API's idempotency header is best-effort across server instances, not an exactly-once guarantee. Inspect failed/unknown cells before collecting a replacement in a new run. Authentication, budget, rate-limit and unknown-outcome errors stop the batch.

Use a new snapshot file for each scheduled run. An external scheduler can invoke the same command. The runner stores data locally and does not send webhooks or configure a hosted scheduler.

## Metrics and denominators

Compute separately for each engine and fixed configuration:

```text
mention coverage = successful cells mentioning brand / all successful cells
citation coverage = successful cells citing brand / all successful cells
mention share = brand mention cells / sum of mention cells for all tracked brands
citation share = brand citation cells / sum of citation cells for all tracked brands
weighted citation share = sum(weight × brand cited) / sum over all brands and cells(weight × brand cited)
```

Count each brand at most once per sampled answer. A brand can be mentioned and cited in the same answer. Multiple brands can appear together: coverage need not sum to 100%, while tracked-brand shares sum to 100% when a denominator exists. Return N/A (null), not zero, for an empty denominator.

A valid no-answer response remains in successful-cell coverage as a zero-presence observation. Failed and unknown collections have no visibility observation; report them separately with completion rate and answer rate. Comparisons use the same successfully collected cells from both runs and show the paired denominator. Do not attribute a smaller successful sample to lost visibility.

The runner calculates both weighted and unweighted measures. Its unweighted coverage is the default headline. If using demand weights, label the source/date and explain missing or zero weights. Do not call weighted coverage “share”.

## Output

Lead with dated coverage and paired change, followed by tracked-brand share. Include engine, locale, search mode, panel hash, collection completeness, and total credits. List gained/lost mention or citation cells with their request ids and source URLs. Preserve the answer so a reviewer can assess false alias matches or changed wording.

Treat a name-only mention as a research lead, not proof that page structure caused the missing citation. A single run does not establish a ranking or the effect of a content edit. Compare several runs and investigate changes in engine/model, evidence, or collection coverage before claiming a trend or cause.

## Related skills

- `ai-visibility-audit`: diagnose a dated prompt sample.
- `ai-answer-gap`: turn observed gaps into evidence-backed content priorities.
- `unifapi`: discover APIs, authenticate, and read the current contracts.
