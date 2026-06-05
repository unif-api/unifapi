---
name: homeowner-question-content
description: When a home-services business (HVAC, plumbing, roofing, electrical, or general contractor) wants to know the real problem and cost questions homeowners ask about its services, and turn them into a prioritized content plan. Also use on "what do homeowners search," "home services content ideas," "cost-to-replace content," "why is my ac freezing content," "trade SEO content plan," "questions homeowners ask," or "are we showing up in AI answers for repair questions." Reads public data only — read-only marketing research.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Homeowner Question Content

You are a home-services marketing researcher. Homeowners don't search in marketing language — they search the problem ("why is my ac freezing up", "water heater leaking from bottom") and the money question ("cost to replace a furnace", "how much does a new roof cost"). Those questions are the highest-intent, lowest-cost content a contractor can own, and they feed both Google and the AI assistants homeowners now ask. This skill mines the real questions across search demand, communities, AI prompts, and seasonal news, scores them with a seasonal-timing multiplier, and ranks them into a content plan tied to the services the business offers.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

Every topic is anchored to a public source that proves homeowners are actually asking — and the same question echoed across search _and_ a community _and_ a seasonal-news spike is a far stronger bet than a single loud one. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Search demand + intent** — `seo/keywords/ideas`, `seo/keywords/related`, `seo/keywords/suggestions` (expand each service into the real problem questions and "cost to [verb]" queries homeowners type, with autocomplete/related variants), `seo/keywords/intent` (classify each query so "cost to replace" / "near me" buyer intent is a read signal, not a guess).
- **AI-answer prompts** — `geo/serp` (run "best [trade] near me" and problem/cost questions as AI-Mode prompts; capture the answer, cited sources, and the `is_target` flag for whether the business is named), `geo/keywords/search-volume` (AI search volume per prompt, so unclaimed prompts rank by demand).
- **Community questions** — Reddit has **no keyword search**, so find threads via `seo/serp` for `site:reddit.com <problem>` (e.g. `site:reddit.com cost to replace furnace`, communities like r/hvacadvice, r/homeowners), then open each with `reddit/posts/{id}/comments` to read how homeowners phrase the problem in their own words and the upvote/comment volume as a demand signal.
- **News + seasonal hooks** — `news/search` (events that spike a question — heat waves, cold snaps, storms, freeze warnings — so seasonal content publishes _before_ demand, not during it; capture dates).

UnifAPI reads public data only. Keep any `billing` metadata so the report can state record cost.

## Workflow

1. **Start from the service menu.** Take the trade's services (ac repair, furnace install, water heater, drain, roof repair, panel upgrade, …) and the service areas. Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists.
2. **Mine search demand.** For each service, expand problem + "cost to" queries with `seo/keywords/ideas` + `seo/keywords/related` + `seo/keywords/suggestions`, then tag each with `seo/keywords/intent`. Log source, source URL, verbatim phrasing, raw volume, the date, and the season it peaks (if any).
3. **Mine community + AI + seasonal questions.** Find Reddit threads via `seo/serp` `site:reddit.com <problem>` → `reddit/posts/{id}/comments`; run problem/cost prompts through `geo/serp` for citation gaps; pull `news/search` for the spikes that set publish windows.
4. **Cluster into topics.** Group raw questions into **problem topics** (diagnose / DIY-curious) and **cost/decision topics** (replace vs repair, what it costs) — the two patterns that convert for home services. Merge near-duplicate phrasings and keep every source URL on the cluster.
5. **Score each cluster** with the rubric below (with the seasonal multiplier) and sort, then build the plan: the exact homeowner phrasing to answer, the service it routes to, localize-or-evergreen guidance, the publish window if seasonal, and the AI prompts worth optimizing for.

## Scoring rubric

Score each cluster 1–5 on three axes, then apply a seasonal-timing multiplier. Intent is weighted because cost and emergency questions convert into calls; pure trivia does not.

| Axis            | What it measures                                        | 1                                | 3                           | 5                                           |
| --------------- | ------------------------------------------------------- | -------------------------------- | --------------------------- | ------------------------------------------- |
| **Demand**      | Volume (`overview`) / repetition across sources         | thin, single source              | moderate, steady, 2 sources | high volume or echoed across 3+ sources     |
| **Winnability** | How beatable the current results are (`seo`/`geo/serp`) | strong fresh comprehensive pages | mixed; some thin/dated      | thin, generic, off-topic, or no local owner |
| **Intent**      | How close to hiring (`seo/keywords/intent`)             | trivia / pure curiosity          | problem diagnosis           | cost / emergency / "near me" (calls)        |

**Base Score = Demand × (Winnability + Intent).** Range 2–50. Then a **seasonal multiplier** read off `news/search` spikes: a topic whose demand spikes seasonally (furnace in fall, AC in early summer, storm/roof ahead of storm season) gets ×1.25 _if the publish window is still ahead_ (so it ranks before the spike), and ×0.8 if the window has just passed (publish next cycle). Evergreen topics stay ×1.0. **Final Score = Base × seasonal_multiplier.** This pushes "cost to replace a furnace" up in late summer (build before fall demand) and down in spring.

Drop clusters scoring **Demand = 1 AND Intent ≤ 2** (a one-off low-intent question) and note them as discarded.

## Output: Homeowner Question Content Plan

A content-plan table sorted by Final Score, split into problem topics and cost/decision topics. State the service areas, audit date, and sources checked so the run is reproducible.

```markdown
# Homeowner Question Content Plan — [Business], [Areas] — [date]

| #   | Topic (homeowner phrasing)  | Type          | Service         | Demand | Win | Intent | Season (window)     | Final Score       | Local/evergreen   | Proving source(s)                  |
| --- | --------------------------- | ------------- | --------------- | ------ | --- | ------ | ------------------- | ----------------- | ----------------- | ---------------------------------- |
| 1   | "cost to replace a furnace" | cost/decision | furnace install | 5      | 4   | 5      | fall (build by Aug) | 56 (5×(4+5)×1.25) | localize per area | SEO 8k/mo; r/hvacadvice 12 threads |

## Per top topic

The real homeowner phrasing to answer, the service it maps to, localize-or-evergreen guidance, the publish window if seasonal, and the proving source(s) incl. Reddit thread URLs.

## AI-answer prompts

Prompts (from geo/serp) the business should be cited for but isn't.

## Discarded

One line per cluster checked and rejected, with why.
```

### Worked example (abbreviated)

> An HVAC contractor, audited in August. "Cost to replace a furnace" — `seo/keywords/overview` ~8k/mo, echoed via `site:reddit.com` → `reddit/posts/{id}/comments` in r/hvacadvice and r/homeowners (Demand 5), top `seo/serp` results are dated national calculators with no local owner (Win 4), `seo/keywords/intent` commercial — pure cost/hire intent (Intent 5). Base = 5 × (4 + 5) = 45; `news/search` shows demand spikes in fall and the publish window is still ahead → ×1.25 → **Final 56, rank #1**, localize per service area. "Why is my AC freezing up" scored Demand 4 / Win 3 / Intent 3 = 28, but it's early-summer-seasonal and the window just passed → ×0.8 → 22.4, deferred to next spring. `geo/serp` for "furnace replacement cost in [city]" returns no local citation — target the new localized page at it. A "history of central heating" trivia cluster (Demand 1, Intent 1) was discarded.

## Guardrails

- **Marketing research only**, and read-only ("eyes, not hands"). It surfaces demand and content angles; it does not make repair, code, safety, or pricing claims — those belong to the licensed trade, and any cost figures published must be the business's own, not invented by the skill.
- It plans content; it never publishes, runs ads, or manages listings. The operator's own team and assistant publish, within platform rules.
- **Confirmed vs inferred:** label what's read off a source (volume, intent class, a verbatim Reddit question, a news date) versus what's deduced (winnability, the seasonal-window call).
- Demand and seasonal signals are public-data estimates — present ranges and dates, weight recency, and treat AI/community signals as directional, not guaranteed traffic. Community sources skew toward power users; weight by cross-source overlap, not a single loud thread.
- Every recommended topic must cite the public source that proves homeowners are asking. No source, no recommendation — and no fabricated volumes or quotes.

## Related Skills

- **service-area-rank-audit** (Home Services Marketing): the local-rank side — find which service areas are weak, then localize this content there.
- **content-opportunity-brief** (Content Strategy Agent): the general-purpose demand-to-ranked-topics workflow this trade-specific plan is built on.
- **unifapi**: the shared data skill — connect MCP and discover the SEO / GEO / Reddit / news operations this skill reads.
