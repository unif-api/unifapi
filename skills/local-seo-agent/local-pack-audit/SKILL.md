---
name: local-pack-audit
description: When a local business wants to know where it ranks in Google's local pack / map results for its key queries — in one location or across many. Also use on "local pack ranking," "am I in the map pack," "where do I rank on Google Maps," "local SERP audit," "rank tracking by location," "multi-location local SEO," or "why aren't we showing up locally." Reads public map and SERP data only — read-only research.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Local Pack Audit

You are a local-search analyst. The local pack — the three-business map block at the top of a "near me" search — is where most local clicks go. This skill pulls the live local pack / map results for a business's target queries and reports exactly where it ranks against the businesses above it: for one location, or the same queries across many.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

A local rank is personalized and proximity-weighted — you cannot reason about it from memory, you have to pull the actual pack for the actual query at the actual search point. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Local pack positions** — `local/search`, `maps/search` — for each query × location, the businesses occupying the pack and their `position`. **Loop the location param** to build the grid: re-run the same query from each city / branch / proximity point. Each result carries `name`, `place_id`, `rating`, `review_count`, `category`, `address`, `phone`, `website`, `hours` — everything you need to profile who sits above the target. Tie the target to its `place_id`, not its name.
- **Blended local SERP** — `seo/serp` — who ranks the _organic_ local results for the same query. A business can hold the organic blue links yet be absent from the pack (an eligibility/category gap, not invisibility) — keep the two distinct. Also confirms whether the pack the maps endpoints return matches the live SERP block.
- **Competitor local landing page** — `seo/competitors/relevant-pages` — for a rival outranking the target, its top organic pages reveal the local landing page (city/service page) doing the relevance work behind its pack slot.

UnifAPI reads public data only — it never touches the business's Google Business Profile. Keep any `billing` metadata so the output can state record cost.

## Workflow

1. **Define queries and locations — required.** Take the business's priority queries (e.g. "emergency plumber Austin", "24 hour plumber") and the location(s) to check — one storefront, or every city/branch for a multi-location operator. If queries are missing, ask; do not guess the keyword set. (Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists.)
2. **Set the proximity baseline.** The pack re-ranks by distance to the searcher, so the exact point you search from changes the result. For each location pass a precise `location` to `local/search` / `maps/search`: at minimum the city centroid; for a storefront, prefer coordinates at the address. Note the search point, `language`, and `device` with every position — a rank measured 8km away is not the same finding as one at the door.
3. **Pull the live pack** for each query × location pairing via `local/search` + `maps/search`, looping the location param. Record who ranks 1–3 (plus extended "More places" results where available) and the target's `position` — or its absence. Capture `place_id`, `name`, `rating`, `review_count`, `category` for every business in the pack. Cross-check the organic block with `seo/serp`.
4. **Score each cell** with the rubric below so the grid sorts by opportunity, not alphabet.
5. **Attribute each gap** to proximity, prominence, or relevance (see below). For a relevance/prominence gap, pull the winner's `seo/competitors/relevant-pages` to see the local page it ranks.
6. **Find the pattern.** Where does the business rank well, where does it fall out of the pack, and (for multi-location) which branches lag the others on the same query? Separate proximity-explained gaps from prominence/relevance gaps.

### Cell scoring rubric

Score every query × location cell so the grid sorts by opportunity:

| Cell state                              | Score | Meaning                                  |
| --------------------------------------- | ----- | ---------------------------------------- |
| Target in position 1                    | 5     | Defend                                   |
| Target in position 2–3                  | 4     | Hold / push to 1                         |
| Target in extended "More places" (4–10) | 2     | Within striking distance                 |
| Target absent but ranks organically     | 1     | Pack-eligibility gap, not invisibility   |
| Target absent entirely                  | 0     | Investigate category/proximity/relevance |

**Opportunity = (5 − score) × query priority weight.** Rank cells by opportunity descending; the top of that list is where work moves the needle.

### Reading the three ranking factors

When the target underperforms, attribute the gap to one of Google's three local factors so the operator knows _what_ to fix:

- **Proximity** — does rank improve as the search point nears the address, and is the winner simply closer? Then the cell is proximity-bound; a single storefront can't out-rank a closer rival, but service-area or category breadth can widen the radius.
- **Prominence** — do the businesses above the target carry markedly higher `review_count` / `rating`? Prominence gaps are the most actionable: review velocity and citations.
- **Relevance** — does the winner's primary `category` or `name` match the query more exactly, or does its `seo/competitors/relevant-pages` show a dedicated local landing page? A relevance gap points at category/listing/content fixes (hand off to `listing-accuracy-audit`).

Full method, edge cases, and the multi-location pattern read are in [references/methodology.md](references/methodology.md).

## Output: rank grid + findings

```markdown
# Local Pack Audit — <business> — <date>

Search params: location(s) <…> · language <…> · device <…>

## Rank grid (one row per query × location)

| Query             | Location (search point)       | Target position | Cell score | Above target (name · rating · reviews · category) | Likely factor |
| ----------------- | ----------------------------- | --------------- | ---------- | ------------------------------------------------- | ------------- |
| emergency plumber | Austin TX (downtown centroid) | 2               | 4          | Joe's Plumbing · 4.8 · 412 · Plumber              | Prominence    |
| 24 hour plumber   | Austin TX (centroid)          | not in pack     | 0          | A1 Drain · 4.6 · 290 · Emergency plumber service  | Relevance     |

## Findings

- Top opportunities, ranked by opportunity score (highest-impact cells first).
- Multi-location: a location × query matrix flagging which branches are missing from or buried in the pack on the same query.
- Each competitor above the target annotated with rating, review count, category, and the factor that explains the gap.
- Record cost consumed (or best estimate if billing metadata is unavailable).
```

### Worked example

Brief: a 2-location HVAC company, queries "ac repair" and "furnace repair", locations Austin + Round Rock.

- "ac repair" × Austin → target position 2 (score 4); winner Cool Air has 4.9 / 680 reviews vs. target 4.7 / 210 → **prominence gap, review velocity**.
- "ac repair" × Round Rock → target position 1 (score 5) → defend.
- "furnace repair" × Austin → target absent (score 0) but ranks #4 organically on `seo/serp` (score 1, not 0); winners all carry "Furnace repair service" as primary `category` and their `seo/competitors/relevant-pages` shows a dedicated furnace page → **relevance gap**, hand to `listing-accuracy-audit`.

Verdict: the Austin furnace cell is the single highest-opportunity fix (category + landing page), Austin AC is a review-volume play, Round Rock is healthy. Reads: 8 local/maps + 4 SERP + 2 relevant-pages.

## Guardrails

- **Read-only ("eyes, not hands").** Public data only. It reports rankings; it never edits a Google Business Profile, posts, or submits anything. The operator's own team makes any listing or content changes.
- **Confirmed vs inferred.** Report the exact search point, language, device, and timestamp each position was measured at. Label positions read off the pack as confirmed and the proximity/prominence/relevance attribution as inferred; if the data doesn't support an attribution, label the cell "unattributed" rather than guessing.
- **Dated snapshots, re-runnable.** Rankings are personalized and time-sensitive — treat each pull as a snapshot, not a guarantee; keep the query × location watchlist so the grid can be re-run for a trend.
- **Pack membership ≠ organic rank.** A business can rank organically yet be absent from the pack (category/eligibility), or vice versa — keep the two measurements distinct.

## References

- [references/methodology.md](references/methodology.md) — full grid method, proximity sampling, the three-factor attribution checklist, and multi-location pattern reading.

## Related Skills

- **listing-accuracy-audit** (Local SEO): checks whether the business's own listing details are correct and complete — usually the fix behind a relevance gap.
- **local-competitor-scan** (Local SEO): profiles the competitors winning these local-pack slots.
- **unifapi**: the shared data skill — connect MCP and discover the operations above.
