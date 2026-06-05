# Local Pack Audit Methodology

Detailed method for building a defensible query × location rank grid and attributing each gap to the right local ranking factor. The SKILL.md carries the summary; this is the working reference.

## 1. Scope the grid

A grid has two axes:

- **Queries** — the business's priority "intent" terms. Prefer the operator's real demand terms over head terms: "emergency plumber", "water heater repair", "drain cleaning near me". 5–15 queries is a workable audit; more becomes noise.
- **Locations / search points** — _where_ the search is run from. This is the most misunderstood axis. The local pack re-ranks by proximity to the searcher, so the same query produces different packs from different points.

For each storefront, sample at least:

1. The **address coordinates** (the "at the door" truth).
2. The **city centroid** (the average resident's experience).

For multi-location operators, repeat per branch. For service-area businesses, sample 3–5 points across the claimed service radius — pack presence usually decays with distance, and the decay curve _is_ the finding.

### The search-point method (how to loop the location param)

The grid is built by **looping the location parameter** of `local/search` (and `maps/search` to cross-check) — one call per query × search point. Each search point is one of:

- A **city / locality name** (e.g. "Austin, Texas, United States") — the coarse, resident-average view.
- **Coordinates** at a precise address — the "at the door" view a storefront actually competes from.

Run the same query from each point and the pack re-ranks; the difference between the centroid result and the address result is the proximity signal made visible. Hold `language` and `device` constant across the whole grid so the only variable that moves is the search point. A position without its search point recorded is not a finding — it cannot be compared cell to cell.

## 2. Pull and normalize each cell

For every query × search-point pair, capture the local-pack block only (ignore organic and ads for the position number, but note whether the target ranks organically — that distinguishes an eligibility gap from total invisibility). Record per business in the pack:

- Position (1–3 in the visible pack; 4–10 if "More places" is expanded)
- `name`, `place_id` (the stable key), `category`, `rating`, `review_count`

Tie the target to its `place_id`, not its name — chains and near-duplicates make name matching unreliable.

## 3. Score cells

| Cell state                                    | Score |
| --------------------------------------------- | ----- |
| Target position 1                             | 5     |
| Target position 2–3                           | 4     |
| Target in extended results 4–10               | 2     |
| Target absent from pack but ranks organically | 1     |
| Target absent entirely                        | 0     |

Assign each query a **priority weight** (1–3) from the operator: 3 = core revenue term, 1 = nice-to-have. **Opportunity = (5 − score) × weight.** Sort cells by opportunity descending. The ceiling matters: a score-4 core term (opportunity 3) can outrank a score-0 long-tail term (opportunity 5) if its weight is low — the formula handles this, the eye does not.

## 4. Attribute the gap: the three-factor checklist

Google ranks the local pack on **proximity, prominence, and relevance**. For each underperforming cell, walk this checklist in order and assign the dominant factor:

### Proximity

- Does rank improve monotonically as the search point moves toward the address?
- Is the business ranking above simply geographically closer to the search point?
- For a service-area business: does pack presence cut off at a distance ring?

If yes → **proximity-bound.** A fixed storefront cannot out-proximity a closer rival for searchers near that rival. Levers: legitimate service-area definition, a second location, or category breadth that widens eligible queries. Do **not** recommend address manipulation.

### Prominence

- Do the businesses above the target carry materially higher `review_count`?
- Higher `rating`?
- (Where visible) stronger overall web presence, citations, or longevity?

If yes → **prominence gap.** This is usually the most actionable. Levers: review-acquisition velocity, responding to reviews, citation consistency. Quantify it: "winner has 680 reviews vs. target 210" is a brief; "they're more established" is not.

### Relevance

- Does the winner's **primary category** match the query more exactly? (e.g. query "furnace repair" — winner primary "Furnace repair service" vs. target "HVAC contractor")
- Does the winner's business name or listing content contain the query terms naturally?
- Pull the winner's `seo/competitors/relevant-pages`: does it rank a **dedicated local landing page** (a city or service page) for this query that the target lacks? That on-site relevance often underwrites the pack slot.

If yes → **relevance gap.** Levers: primary/secondary category correction, services and listing content, a matching local landing page. Hand off to `listing-accuracy-audit` for the listing side.

### Unattributed

If the evidence supports none of the above cleanly (e.g. the target trails despite equal proximity, more reviews, and exact category), label the cell **unattributed** and say so. Do not invent a cause. Possible hidden factors: spam filtering, listing suspension, behavioral signals, or pack volatility — none of which are readable from public SERP data.

## 5. Read the multi-location pattern

With more than one location on the same queries, the grid becomes a diagnostic:

- **A query weak at every location** → systemic: category/relevance or a brand-wide prominence problem, not a local one.
- **A query strong at most locations, weak at one** → that branch's listing or local prominence specifically — compare its `review_count` and category against the healthy branches.
- **A location weak across all queries** → that branch is under-built (few reviews, thin/young listing) or genuinely out-positioned by local incumbents.

Present this as a location × query matrix of cell scores; the weak rows and columns name themselves.

## 6. Snapshot discipline

- Every position is stamped with **search point, language, device, and timestamp**. A rank without its search point is not a finding.
- Re-running is the only way to establish a trend; a single pull is a snapshot, never a trajectory.
- Pack composition shifts intra-day and with personalization the API cannot see — present ranges and patterns, not false precision.
