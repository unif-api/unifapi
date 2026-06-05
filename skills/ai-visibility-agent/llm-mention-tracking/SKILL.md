---
name: llm-mention-tracking
description: When the user wants to track how often their brand or domain gets mentioned across ChatGPT and AI search engines over a set of prompts, and how that share of voice compares to named competitors over time. Also use on "LLM mention tracking," "track AI mentions," "share of voice in AI," "AI share of voice," "brand mentions in ChatGPT," "am I being mentioned more or less," "AI visibility trend," or "monitor AI citations over time." For a one-time audit of a prompt set, see ai-visibility-audit.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# LLM Mention Tracking

Track how often a brand and its domain are mentioned across ChatGPT and AI search engines over a fixed prompt set — and how that share of voice compares to named competitors and moves over time. Where an audit is a snapshot, this is the recurring read: the panel and competitor list stay frozen so each run is comparable to the last.

This is an **enhanced** skill: it reads live public data through UnifAPI. The deliverable is a trend, not a single number, so the value comes from running it on a cadence against an unchanging panel.

## Use UnifAPI for live evidence

This is an **enhanced** skill: it reads live public data through UnifAPI. Use the `unifapi` skill to connect (OAuth MCP), then discover these GEO operations. All are `POST`; pass `engine` (`google` / `chatgpt`), `location`, and `language` identically on every run so the trend is real movement, not config drift.

- **Share of voice across labeled groups — the core read** — `geo/mentions/cross-aggregated-metrics` compares mentions across **labeled groups**: put the brand in one group and each named competitor in its own group, and the call returns the head-to-head share directly. This is the engine of the tracker — run it identically every cadence and the output diff _is_ the SoV trend.
- **Panel-level mentions** — `geo/mentions/search` (`target` = array of up to 10 entities: brand domain + each competitor) captures, per prompt, whether each entity is mentioned and in which answers — the granular backing for the aggregated share.
- **Roll-up** — `geo/mentions/aggregated-metrics` rolls mentions up across the whole target set in one call (counts, AI search volume, cited domains), cheaper than per-prompt SERP when you only need the totals.
- **Citation vs name-drop** — `geo/serp` (`target` = brand domain, `is_target` flag) confirms whether a mention is an actual **cited source** (a link) or just an in-text name-drop. Citations are the stronger signal; track them on a separate line.
- **Who's climbing** — `geo/mentions/top-domains` ranks the most-cited domains for the set; diffing this list run-to-run is the fastest "which competitor is gaining" read.
- **Weight by demand** — `geo/keywords/search-volume` weights each prompt by AI-search demand so SoV reflects the prompts that carry traffic. Pull once at panel creation and reuse across runs (re-pull quarterly).

UnifAPI reads public data only. Keep each `billing` block for the cost line.

## Workflow

(Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists — reuse the brand, domain, and competitor set so the panel matches everything else.)

1. **Fix the panel — once, then freeze it.** Lock a stable set of prompts (10–30), the brand + domain, and the named competitors (≤10 total entities — the `mentions/search` `target` cap), and assign each entity a fixed **group label** for `cross-aggregated-metrics`. Store this panel verbatim; it must not change between runs or the trend breaks. Record AI search volume per prompt now (`geo/keywords/search-volume`) and reuse it.
2. **Run the share read.** Call `geo/mentions/cross-aggregated-metrics` with the locked group labels to get brand-vs-each-competitor share in one shot. Back it with `geo/mentions/search` per prompt for the granular panel and `geo/mentions/aggregated-metrics` for the roll-up; for each (prompt × platform × entity) record: mentioned (yes/no) and cited-as-source (yes/no via `geo/serp`/`is_target`).
3. **Compute Share-of-Voice.** Apply the SoV rubric below, per platform and overall, separating cited slots from name-drops.
4. **Diff against the prior run.** Load the last run's stored figures and compute deltas: which prompts gained/lost the brand, which competitor climbed (diff `geo/mentions/top-domains`), net SoV change. Stamp the run date and note that AI answers vary by session.
5. **Persist this run** so the next run can diff against it. The trend table grows one column per run; the group labels and prompts never change.

## Share-of-Voice scoring

SoV is computed over the **fixed panel** so it is comparable run to run. For each tracked entity:

```text
mention SoV(entity)  = entity mentions / Σ mentions(all tracked entities)   [per platform + overall]
citation SoV(entity) = entity cited-slots / Σ cited-slots(all tracked entities)
weighted SoV(entity) = Σ_p [entity mentioned on p ? volume_p : 0] / Σ_p [any tracked entity mentioned on p ? volume_p : 0]
```

Counting rules (keep identical every run):

- Count an entity **once per (prompt × platform)** even if mentioned by multiple references — avoids verbose-answer inflation.
- A **cited slot** = `is_target`/citation link present. A **name-drop** = named in text, no link. Track both; citation SoV is the headline, mention SoV is the leading indicator.
- Drop (prompt × platform) cells where no AI answer rendered from both numerator and denominator.
- Weighted SoV (by AI search volume) is the primary headline; report unweighted alongside.

## Output

Lead with the trend, because the point is movement.

**Headline:** "Brand citation SoV [this run] X% vs [last run] Y% (Δ +/−Z pts) across N panel prompts; [competitor] climbed from A% to B%." With run date and panel size.

**Share-of-Voice — this run:**

| Entity      | Mention SoV | Citation SoV | Google AI | ChatGPT | Weighted (by AI vol) |
| ----------- | ----------- | ------------ | --------- | ------- | -------------------- |
| our brand   | 24%         | 18%          | 21%       | 14%     | 16%                  |
| competitorA | 41%         | 47%          | 44%       | 51%     | 49%                  |
| competitorB | 35%         | 35%          | 35%       | 35%     | 35%                  |

**Trend vs prior runs** (one column per run; this is the deliverable):

| Entity      | 2026-03-04 | 2026-04-04 | 2026-05-04 | 2026-06-04 | Δ last run |
| ----------- | ---------- | ---------- | ---------- | ---------- | ---------- |
| our brand   | 12%        | 14%        | 16%        | 18%        | +2 pts     |
| competitorA | 52%        | 50%        | 48%        | 47%        | −1 pt      |
| competitorB | 36%        | 36%        | 36%        | 35%        | −0 pts     |

**Movement notes:** prompts the brand gained/lost this run, which competitor is climbing (from `top-domains` diff), and the net SoV change.

**Quick-win list:** prompts where the brand is **mentioned but not cited** (name-drop only) — the model knows you, you just need extractable structure to earn the link.

**Cost:** UnifAPI records consumed, or best estimate. Each figure carries its run date.

### Worked example

Panel: 20 prompts, brand `acme.dev`, competitors `g2.com`, `rivalapp.com`, US/English, monthly cadence. June run via `geo/mentions/cross-aggregated-metrics` (three frozen group labels) + `geo/mentions/search` + `geo/serp`: Acme cited in 9 of 50 tracked cited slots → citation SoV 18%, up from 16% in May (+2 pts) — driven by gaining "best [category] for startups" after a content fix. g2.com slipped 48%→47% on the `top-domains` diff. Three prompts show Acme name-dropped but uncited → quick-win extractability list.

## Guardrails

- Read-only: it measures and reports a trend. It never posts, seeds mentions, edits content, or touches any account — the operator's own assistant runs any follow-up.
- AI answers are non-deterministic and vary by session, region, and time. Treat each run as a dated sample; trend across **≥3 runs** before declaring a direction — don't over-read a single delta.
- **Keep the panel and competitor list constant** between runs. Changing prompts, adding a competitor, or switching engine/locale breaks comparability — if the panel must change, reset the trend baseline and say so.
- Separate citation SoV from mention SoV; reporting only one hides half the picture.
- AI search volume is a public-data estimate; ChatGPT engine is US/English only — mark it N/A for other markets rather than zero.

## Related Skills

- **ai-visibility-audit**: the one-time, diagnostic version that explains _why_ mentions are missing and seeds the panel. Its [references/geo-methodology.md](../ai-visibility-audit/references/geo-methodology.md) holds the shared cited-slot counting rules and the miss-cause (Structure / Authority / Presence) decision tree this tracker's quick-win column relies on.
- **ai-answer-gap**: turn the prompts where the brand is absent into a prioritized content backlist
- **unifapi**: the shared data skill (connect MCP, discover the GEO operations this tracker reads)
