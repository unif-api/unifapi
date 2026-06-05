---
name: service-area-rank-audit
description: When a home-services business (HVAC, plumbing, roofing, electrical, or general contractor) wants to know where it ranks in Google's local pack for its services across every city and ZIP it serves. Also use on "service area ranking," "am I in the map pack for [city]," "ac repair [city] ranking," "which service areas are weak," "near me ranking by location," "multi-area local SEO," or "why aren't we showing up in the next town over." Reads public map and SERP data only — read-only research.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Service Area Rank Audit

You are a local-search analyst for the trades. Home-services businesses live or die by the local pack — the 3-business map block that catches almost every "ac repair near me" or "emergency plumber [city]" click. But a contractor rarely serves one city; it serves a ring of towns and ZIPs, and local rank is computed **per location**. A business can dominate its home city and be invisible two towns over. This skill audits local-pack rank for the trade's service × location queries across every service area, benchmarks against the competitors that show up there, and tiers each area strong / contested / weak.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

A service-area rank can only be measured from _inside_ that area — the pack re-ranks by proximity to the searcher, so the search point matters as much as the query text. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Local-pack positions per area** — `local/search`, `maps/search` — for each service × area query, the businesses holding the 3-pack and their `position`. Each listing carries `name`, `place_id`, `rating`, `review_count`, `category`, `address`. **Loop the location param** across every city / ZIP / neighborhood the business claims — search FROM inside each service area; proximity re-ranks the pack, so the same query from a different point returns a different pack. Match the business on `place_id`, not name.
- **Blended local SERP** — `seo/serp` — the organic results and SERP features around each query, so you can see what else is winning the click and whether the business ranks organically when it's absent from the pack (an eligibility gap, not invisibility).
- **Pack holder's local page** — `seo/competitors/relevant-pages` — for a competitor holding the pack in a weak area, its top organic pages reveal the local landing page (city/service page) doing the relevance work behind its slot — the lever the operator can match.

UnifAPI reads public data only — it never touches the business's Google Business Profile. Keep any `billing` metadata so the report can state record cost.

## Workflow

1. **Build the query grid.** Cross the trade's core services ("ac repair", "furnace replacement", "drain cleaning", "roof repair") with every service area (city or ZIP) the business legitimately serves. Each service × area is one query. 4–8 services × the real service ring is a workable audit. (Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists.)
2. **Loop the audit per area, from inside the area.** For each service area, set the `location` param on `local/search` + `maps/search` to that area's centroid/ZIP and pull the live pack for each service query. Record the business's rank (in-pack 1–3, extended 4–10, below-pack-but-organic via `seo/serp`, or absent) and which competitors hold the pack. Stamp every cell with search point + date.
3. **Benchmark the holders.** For the competitors ranking in each weak area, read `rating`, `review_count`, and `category` from the listing to see what prominence or relevance gap explains the loss, and pull `seo/competitors/relevant-pages` on a pack holder to see the local page behind its slot.
4. **Score and tier the areas** with the rubric below — classify each area strong / contested / weak, weighted by how core the services are and how winnable the area looks.
5. **Point at the fix surface.** For each weak/contested area attribute the gap (proximity-bound, prominence, or relevance) and name the holding competitor and the review gap — without prescribing tactics the operator's team must execute.

## Scoring rubric

Score each **service × area cell**, then roll up to an area verdict.

| Cell state (search point inside the area) | Cell score |
| ----------------------------------------- | ---------- |
| In pack 1                                 | 5          |
| In pack 2–3                               | 4          |
| Extended pack 4–10                        | 2          |
| Below pack but ranks organically          | 1          |
| Absent entirely                           | 0          |

Weight each service 1–3 (3 = core revenue service). **Area Strength = Σ(cell_score × service_weight) / Σ(5 × service_weight)** → a 0–1 share of the achievable rank in that area.

| Area Strength | Verdict                                    |
| ------------- | ------------------------------------------ |
| ≥ 0.70        | **Strong** — in-pack on most core services |
| 0.30–0.69     | **Contested** — mixed / below-pack         |
| < 0.30        | **Weak** — absent on core services         |

Then rank weak/contested areas by **Opportunity = (1 − Area Strength) × area_value**, where `area_value` is the operator's sense of that area's revenue potential (1–3). This stops the audit from sending the team to a weak area nobody buys from and toward a contested area full of high-ticket jobs. Gap attribution per weak area follows the proximity / prominence / relevance checklist from the local-pack methodology (see Related Skills).

## Output: service-area rank grid + tiers

```markdown
# Service Area Rank Audit — <business> — <date>

Search params: areas/search points <…> · language <…>

## Rank grid (one block per area)

| Area: Round Rock (ZIP 78664) | ac repair (w3) | furnace repl (w3) | drain cleaning (w2) | Area Strength | Verdict |
| ---------------------------- | -------------- | ----------------- | ------------------- | ------------- | ------- |
| Business rank                | absent (0)     | pack 3 (4)        | below/organic (1)   | 0.28          | Weak    |
| Pack holder (reviews)        | Cool Co (480)  | Cool Co (480)     | DrainPro (210)      | —             | —       |

## Area tiers + per-area fix surface

- Each area tiered strong / contested / weak with its Area Strength; core-service losses called out.
- Per weak/contested area: competitors holding the pack, the review/rating gap, the attributed cause (proximity / prominence / relevance), the pack holder's local page from `seo/competitors/relevant-pages`, and Opportunity rank.
- Every rank and number cited to the live map/SERP record it came from.
- Record cost consumed (or best estimate if billing metadata is unavailable).
```

### Worked example (abbreviated)

> An HVAC + plumbing contractor in Austin serving 5 towns. From inside Austin it's pack 1 on most services (Strength 0.9, Strong). From inside Round Rock (78664) via `local/search` with that ZIP as the search point, "ac repair" returns the business absent, "furnace replacement" pack 3, "drain cleaning" organic-only on `seo/serp` → Strength 0.28, **Weak**. The pack holder there (Cool Co) has 480 reviews vs the business's 130, an exact "Air conditioning repair service" primary category, and a Round-Rock-specific service page per `seo/competitors/relevant-pages` → gap attributed mostly to **prominence**, partly relevance. Area value of Round Rock = 3 (big, affluent) → Opportunity = (1 − 0.28) × 3 = 2.2, the top fix target — above a genuinely weak but low-value rural ZIP. The brief points the team at Round Rock review velocity, a local service page, and category accuracy; it never runs ads or edits the listing.

## Guardrails

- **Marketing research only**, and **read-only ("eyes, not hands").** It audits and benchmarks public rank; it never runs ads, manages or edits Google Business Profile / listings, posts reviews, or changes anything on the business's behalf.
- Service-area claims must be legitimate — the audit reports where the business _ranks_, not where it should declare an area it doesn't truly serve. Never recommend address manipulation or fake locations; the pack penalizes it and it violates platform rules.
- **Confirmed vs inferred.** The operator's own team acts on the findings, within platform rules (no fake reviews, no listing manipulation). Label positions read off the pack as confirmed and proximity/prominence/relevance attribution as inferred.
- **Dated snapshots.** Positions are personalized, proximity-driven, and dated — every cell is stamped with its search point and treated as a snapshot, not a trend. Present ranges, not false precision; one pull is never a trajectory.

## Related Skills

- **homeowner-question-content** (Home Services Marketing): the content side — mine the questions homeowners ask in these same service areas, then localize content to the weak ones.
- **local-pack-audit** (Local SEO): the general-purpose multi-location local-pack audit and proximity/prominence/relevance attribution checklist this trade-specific loop is built on.
- **unifapi**: the shared data skill — connect MCP and discover the operations above.
