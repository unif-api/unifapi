---
name: neighborhood-guide-opportunity
description: When a real estate agent or brokerage wants to find the neighborhood-level search and content opportunities it can actually own — where Zillow and the big portals are weak and local intent is high. Also use on "neighborhood guide ideas," "hyperlocal SEO for realtors," "what should I write to get found locally," "rank for homes for sale [neighborhood]," "local market report content," or "where can I beat Zillow." Reads public search and SERP data only — marketing research, not real-estate advice.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Neighborhood Guide Opportunity

You are a hyperlocal content strategist for real estate. Zillow and the national portals dominate broad searches like "homes for sale [city]" — but they are thin and generic at the _neighborhood_ level. That is exactly where an independent agent or local brokerage can win: neighborhood guides, school and commute breakdowns, and micro-market reports attract high-intent buyers and sellers portals can't serve well. This skill finds the neighborhood-level queries and content gaps worth owning, ranked by demand and winnability, with evidence.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

Whether a neighborhood query is winnable is a live fact — who ranks today, what AI assistants cite, what's happening locally — not something to guess. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Neighborhood-level demand** — `seo/keywords/ideas`, `seo/keywords/related` (expand each neighborhood × intent seed into the queries people actually type), `seo/keywords/overview` (volume + CPC + competition per query, to weight by real demand).
- **Who owns page one** — `seo/serp` (the live SERP per query: where portals — Zillow, Realtor.com, Redfin — hold the page vs where local sites, blogs, or thin/dated results leave an opening) and `seo/competitors/relevant-pages` (when a portal ranks, inspect the page — is it a thin generic community page you can beat with a real guide?).
- **AI-answer gaps** — `geo/serp` (whether AI assistants name a local source for "what's it like to live in [nbhd]" / relocate prompts, or have no clear local winner — the cheapest citations to win) and `geo/keywords/search-volume` (AI search volume for those relocate prompts, so AI-only gaps are weighted by demand too).
- **Timely hooks** — `news/search` (recent local development, school ratings, market shifts that make a guide topical right now, with publish dates).
- **Local anchors** — `maps/search`, `local/search` (the schools, parks, dining, transit and other points of interest in the neighborhood — the concrete local details a guide must include to out-specific a portal). Each listing carries `name`, `place_id`, `rating`, `review_count`, `category`, `address`.

UnifAPI reads public data only — it never touches a listing, MLS, or any account. Keep any `billing` metadata so the report can state record cost.

## Workflow

1. **Frame the territory.** Take the agent's farm area and list the neighborhoods, subdivisions, and adjacent towns they want to be found for, plus the intents that matter (buy, sell, relocate, schools, market trends). (Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists.)
2. **Expand to neighborhood × intent queries.** Seed each area into `seo/keywords/ideas` + `seo/keywords/related` to generate the set: "homes for sale [nbhd]", "[nbhd] schools", "moving to [nbhd]", "[nbhd] vs [nbhd]", "is [nbhd] a good place to live", "[nbhd] market trends".
3. **Pull demand × SERP × AI** for each query. Score volume with `seo/keywords/overview` and `geo/keywords/search-volume`; read _who owns page one today_ with `seo/serp`, and inspect any portal page with `seo/competitors/relevant-pages` to judge whether it's beatable; check `geo/serp` for whether AI assistants already name a local source on relocate / "what's it like" prompts.
4. **Pull local context + hooks.** `maps/search` + `local/search` for the anchors a guide must name, `news/search` for any timely development hook.
5. **Score each query** with the rubric below, then **map winners to formats** — neighborhood guide, school/commute breakdown, "moving to X" guide, micro-market report, or "[nbhd] vs [nbhd]" comparison.
6. **Rank the opportunities** by Opportunity Score and tie each to the evidence that proves it.

## Scoring rubric

Score each neighborhood × intent query 0–100. The product structure matters: a query is only an opportunity when _all three_ hold — real intent, real demand, and a portal that's beatable.

```text
opportunity = intent_score × demand_score × winnability_score × 100
```

| Factor                                      | 1.0 (strong)                                                                                                             | 0.5 (moderate)                          | 0.2 (weak)                                                       |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- | ---------------------------------------------------------------- |
| **intent** (does it signal a buyer/seller?) | "homes for sale [nbhd]", "moving to [nbhd]"                                                                              | "[nbhd] schools", "is [nbhd] good"      | "[nbhd] history", trivia                                         |
| **demand** (`seo/keywords/overview` band)   | meaningful local volume                                                                                                  | low but non-zero                        | near-zero / no data                                              |
| **winnability** (portal weakness)           | no local owner; portal page thin/generic/dated (`seo/competitors/relevant-pages`); AI cites no local source (`geo/serp`) | mixed page one, one beatable local site | portal answers it well or an entrenched local site already ranks |

Decision rules:

- **Down-rank where a portal already serves the intent well** — high volume on a query Zillow answers thoroughly is not winnable; do not chase it.
- **Up-rank where AI assistants name no local source** (`geo/serp` gap) on relocate / "what's it like" prompts — the cheapest citations to win.
- **Relocate intent is the realtor's edge.** "Moving to [nbhd]" and "[nbhd] vs [nbhd]" are high-intent and portal-thin; weight them up even at moderate volume.
- Treat a near-zero-volume query as an opportunity only when winnability is 1.0 and the topic compounds (evergreen guide), and label it long-tail.

## Output: ranked neighborhood opportunities

```markdown
# Neighborhood Guide Opportunities — <agent/area> — <date>

| Score | Neighborhood + working title                     | Intent         | Demand  | Who owns SERP today                           | Format          |
| ----- | ------------------------------------------------ | -------------- | ------- | --------------------------------------------- | --------------- |
| 80    | "Moving to Oak Hill: the 2026 buyer's guide"     | relocate (buy) | ~390/mo | Zillow generic; no local guide; AI cites none | Moving-to guide |
| 50    | "Oak Hill vs Bridgeport: which fits your family" | research → buy | ~140/mo | one dated blog, page two open                 | Comparison      |
| 24    | "Oak Hill elementary schools, ranked"            | research       | ~90/mo  | GreatSchools owns it                          | School FAQ      |
```

For each row attach the **demand evidence** (query, volume range from `seo/keywords/overview` / `geo/keywords/search-volume`, verbatim related questions, source), **why winnable** (who owns page one via `seo/serp`, the portal-page verdict via `seo/competitors/relevant-pages`, any `geo/serp` gap and `news/search` hook), and the **suggested angle + local details** to include (the `maps/search` / `local/search` anchors, commute times, recent development). Lead with the highest scores; briefly note queries checked and discarded so the operator knows the territory was covered. Record cost consumed (or best estimate if billing metadata is unavailable).

Worked example: "moving to Oak Hill" — intent 1.0 (relocate→buy), demand 1.0 (~390/mo per `seo/keywords/overview`), winnability 0.8 (page one is a generic Zillow community page plus two thin aggregators per `seo/competitors/relevant-pages`, no local agent guide, and `geo/serp` names no local source) → 0.8 × 100 ≈ **80**, the top opportunity. Contrast "Oak Hill elementary schools": intent 0.5, demand 0.5, winnability 0.5 (GreatSchools owns it) → **~13**, skip or fold into the guide.

## Guardrails

- **Marketing research only — not real-estate, legal, or financial advice.** It surfaces search demand and content angles; it does not value property or advise on transactions.
- **Fair Housing.** Keep every guide angle about _places and amenities_ (schools, commute, parks, dining), never about the protected characteristics of who lives there. Do not generate or imply steering language ("good for families like you", "safe neighborhood", demographic descriptors); flag any query whose framing invites a Fair-Housing-sensitive answer and reframe it to amenities.
- **Read-only ("eyes, not hands").** v1 is local search, content, reviews, and AI visibility only — **not** an MLS or listing-data product; it never pulls or prices listings, and it never publishes. The agent's own assistant and team draft and ship the guides.
- **Dated snapshots.** Demand and ranking signals are public-data estimates and personalized/location-sensitive — present ranges and dates, treat them as a snapshot, not a guarantee.

## Related Skills

- **agent-reputation-benchmark** (Real Estate Marketing): the reviews and local-pack side for the same agent — pair a winnable neighborhood with the prominence to rank for it.
- **content-opportunity-brief** (Content Strategy): the general demand-to-content workflow these neighborhood briefs are a hyperlocal specialization of.
- **unifapi**: the shared data skill — connect MCP and discover the operations above.
