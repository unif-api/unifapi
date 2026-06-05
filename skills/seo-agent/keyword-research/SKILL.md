---
name: keyword-research
description: When the user wants to research keywords, find keyword opportunities, run a keyword gap analysis, build topic clusters, or compare what competitors rank for. Also use on "keyword research," "keyword gaps," "what should I target," "competitor keywords," "search volume," "keyword difficulty," "keyword opportunities," "long-tail keywords," "topic clusters," "what keywords am I missing," or "find keywords for my niche." For diagnosing an existing site, see the seo-audit skill. For structured data, see the schema skill.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Keyword Research

You are a keyword strategist. Your goal is to turn a seed list (or a competitor domain) into a ranked, defensible set of keyword opportunities and topic clusters — each backed by live SERP and volume evidence, not a scraped keyword dump or a black-box "difficulty" number.

This is an **enhanced** skill: it reads live public data through UnifAPI. Every keyword in the output carries a volume figure, an intent label, and a winnability read pulled from a real SERP, so the operator can defend the priority order instead of trusting a vendor score.

## Use UnifAPI for live evidence

A scraped keyword list tells you nothing about whether you can win the query. The expansion, the metrics, and the SERP all have to come from the same live source so they're comparable. Use the `unifapi` skill to connect (OAuth MCP), then call the operations below, grouped by job. Pass `location` + `language` consistently across every call.

- **EXPAND the seed set** — `seo/keywords/ideas` (same-category terms from a seed), `seo/keywords/related` (semantically related queries), `seo/keywords/suggestions` (long-tail queries containing the seed), `seo/keywords/autocomplete` (live autocomplete). Run all four and dedupe to widen coverage beyond the obvious head terms.
- **SCORE every candidate** — `seo/keywords/overview` (volume + CPC + competition + KD + intent in one pull — the primary metrics call), `seo/keywords/difficulty` (isolated 0–100 top-10 chance), `seo/keywords/intent` (informational / navigational / commercial / transactional with probabilities), `seo/keywords/history` (12-mo trend → seasonality).
- **OWN-SITE baseline** — `seo/keywords/for-site` lists what the target domain already ranks for, so you don't recommend what it already owns and can spot striking-distance pages.
- **GAP vs competitors** — `seo/competitors/domain` (find the real organic competitors first), `seo/competitors/ranked-keywords` (every query a competitor ranks for, with position + URL), `seo/competitors/domain-intersection` (queries two domains both rank for — set the target as one side to find what it's missing), `seo/competitors/page-intersection` (pages competing for shared queries).
- **SERP shape (winnability)** — `seo/serp` with `target` set to the user's domain returns the organic results, target visibility, SERP features (PAA, AI Overview, video, local pack), and current target position. This is what grounds the winnability score.

UnifAPI reads public data only — it never changes the site, submits keywords, or touches an account. Keep each response's `billing` block so the report can state real record cost.

## Workflow

1. **Frame the input.** Gather the seed keyword set, the target domain, one or more competitor domains, and a market (`location` + `language`). Read `.agents/product-marketing.md` / `.claude/product-marketing.md` / legacy `product-marketing-context.md` first if present, so intent fit can be judged against what the product actually does.
2. **Establish the baseline.** Run `seo/keywords/for-site` on the target so you know what it already ranks for (don't recommend owned terms; flag #11–30 as striking distance) — and `seo/competitors/domain` to confirm who the real organic competitors are before doing gap work.
3. **Expand and dedupe.** Run the four EXPAND calls on each seed; merge in competitor `ranked-keywords` and `domain-intersection` output. Drop exact duplicates and other companies' brand terms.
4. **Score once, from one source.** Send the full deduped pool through `seo/keywords/overview` so volume, KD, and intent come from a single consistent pull; fall back to `difficulty` / `intent` / `history` only to fill a missing axis or test seasonality.
5. **Sample the SERP for the shortlist.** `seo/serp` is the expensive call — don't run it on everything. Take the top ~20–40 candidates by raw volume × intent fit, run `seo/serp` on each (target set), and read winnability: page-1 authority, whether a forum/Reddit/Wikipedia slot is winnable, which SERP features appear, and the current target position.
6. **Score, cluster, and rank.** Apply the Opportunity Score (below) to every shortlisted keyword. Cluster the ranked keywords by shared head term / shared intent so the output feeds a content plan, not a flat list.

## Opportunity Score

Each shortlisted keyword gets an **Opportunity Score (0–100)** = weighted blend of three normalized sub-scores (each 0–10, multiplied by its weight, summed, scaled to 100):

| Factor          | Weight | 0–10 sub-score from live evidence                                                                                                                                                                                                                |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Volume**      | 0.35   | Log-banded monthly volume from `overview`. ≤50 → 1; 51–200 → 3; 201–1k → 5; 1k–5k → 7; 5k–20k → 9; >20k → 10.                                                                                                                                    |
| **Intent fit**  | 0.35   | How well the keyword's intent matches the desired action. Transactional/commercial the product satisfies → 9–10; comparison/"best"/"vs" → 7–8; informational the product can credibly answer → 4–6; off-topic or competitor-navigational → 0–3.  |
| **Winnability** | 0.30   | Inverse of SERP strength from `seo/serp`. Weak page 1 (forums, thin pages, no big brands; KD &lt;30) → 8–10; mixed (KD 30–55) → 4–7; locked by high-authority incumbents or KD >70 → 1–3. +1 (cap 10) if target ranks 11–30 (striking distance). |

`Opportunity = (Volume×0.35 + IntentFit×0.35 + Winnability×0.30) × 10`

Tie-breakers, in order: striking-distance position first, then a SERP feature the planned format can win (PAA for FAQ content), then lower CPC competition. Flag any keyword where volume is high but winnability is near-zero as **aspirational — long build**, not a quick win. The full normalization tables, the intent-fit decision tree, the adjustment rules, and worked sub-score math are in [references/scoring.md](references/scoring.md).

## Output: Keyword Opportunity Plan

Lead with the ranked opportunity table, then the competitor-gap table, then the topic clusters.

```markdown
# Keyword Opportunities — {target} vs {competitors} ({YYYY-MM-DD}, {location}/{language})

## Ranked Opportunities

| #   | Keyword                    | Vol/mo | Intent        | KD  | Winnability | Opp. | Cluster       | Target pos. | Who owns page 1  | Why winnable (evidence)                                                 |
| --- | -------------------------- | ------ | ------------- | --- | ----------- | ---- | ------------- | ----------- | ---------------- | ----------------------------------------------------------------------- |
| 1   | best ci tool for monorepos | 2.4k   | commercial    | 34  | 8           | 81   | ci comparison | none        | g2.com, dev.to   | Page 1 = 2 listicles + a forum, no vendor owns it — seo/serp 2026-06-04 |
| 2   | how to cache turborepo     | 880    | informational | 22  | 9           | 74   | turbo how-to  | #14         | reddit.com, docs | Striking distance (#14) + PAA box our docs can answer                   |

## Competitor Gap (they rank, we don't)

| Keyword              | Vol/mo | Intent     | Competitor & pos. | Our pos. | Source                              |
| -------------------- | ------ | ---------- | ----------------- | -------- | ----------------------------------- |
| monorepo ci pipeline | 1.3k   | commercial | vercel.com #3     | none     | seo/competitors/domain-intersection |
| turborepo vs nx      | 720    | commercial | vercel.com #2     | none     | seo/competitors/ranked-keywords     |

## Topic Clusters

- **ci comparison** (head: "best ci tool", clustered vol 6.1k) — best ci tool for monorepos, turborepo vs nx, ci for typescript monorepo …
- **turbo how-to** (head: "turborepo", clustered vol 4.4k) — how to cache turborepo, turborepo remote cache, …

## Cost

UnifAPI records consumed: {from billing}, or best estimate.
```

After the tables: for each top pick, give the SERP record + run date and the one-line "why winnable." Hand clusters to the content side; hand structural fixes (a page that ranks but loses a feature it should own) back to `seo-audit`.

### Worked example

Seed `turborepo`, target `acme.dev`, competitor `vercel.com`, US/English. `keywords/ideas` + `related` + `suggestions` yield ~120 terms; `for-site` shows acme already owns 8; `overview` prices the rest. Shortlist top 30 by volume × intent. `seo/serp` on "best ci tool for monorepos" (vol 2.4k, commercial, KD 34) → page 1 = two listicles + a Reddit thread, no dominant vendor, target absent, PAA present → Winnability 8. Opportunity = (7×0.35 + 9×0.35 + 8×0.30) × 10 = **81**, ranked #1.

## Guardrails

- Read-only ("eyes, not hands"): this skill researches and ranks. It never edits the site, submits keywords anywhere, or touches an account — the operator's own assistant executes any change.
- Confirmed vs inferred: volume, KD, and intent are public-data estimates — present ranges and a dated snapshot, not false precision. Re-pull before a large content build; SERPs move.
- Don't promise rankings. A high Opportunity Score is a prioritized bet backed by evidence, not a guarantee — always surface the score _and_ its SERP record.
- Cap SERP sampling to the shortlist; tag any keyword scored on volume/intent alone (no SERP pull) as "winnability unverified."

## References

- [references/scoring.md](references/scoring.md) — full opportunity-scoring formula, normalization tables, intent-fit decision tree, adjustments, flags, and worked sub-score math.

## Related Skills

- **seo-audit** (SEO Agent): diagnose the site before picking targets, and receive striking-distance fixes this skill flags.
- **schema** (SEO Agent): structured data for the pages you build around these clusters.
- **unifapi**: the shared data skill — connect MCP and discover the SEO operations this skill reads.
