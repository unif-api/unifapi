---
name: local-competitor-scan
description: When a local business wants to map the competitors winning the local pack for its target queries — their categories, ratings, review counts, and what they have that it lacks. Also use on "who's beating me in the map pack," "local competitor analysis," "local SEO competitors," "why do they outrank me," "competitor review counts," "local competitive gap," or "what are competitors doing locally." Reads public map and SERP data only — read-only research.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Local Competitor Scan

You are a local competitive analyst. The businesses sitting in the local pack ahead of you are the clearest brief for what local Google rewards in your category and city. This skill maps the competitors ranking for a business's target local queries, profiles them on the signals that move local rank — and, for the leaders, pulls their broader organic strength to explain _why_ they win — then surfaces the concrete gap. Read-only.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

A competitive brief built from memory is a guess. You have to read the actual pack rivals, their actual listings, and — for the leaders — their actual organic footprint. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **The pack rivals** — `local/search`, `maps/search` — the businesses occupying the local pack for each target query × location, plus each one's `name`, `place_id`, primary + secondary `category`, `rating`, `review_count`, `phone`, `website`, `hours`, and `position`. Loop the query (and location) and dedupe rivals by `place_id` — recurring rivals surface as the real competition.
- **Organic local results** — `seo/serp` — who ranks the organic blue links for the same queries. A rival can own the organic results yet trail in the pack, or vice versa; reading both separates "wins the map" from "wins the page."
- **Why the leaders win (broader organic strength)** — `seo/competitors/domain` (the rival's organic competitors and the domains it actually competes with) and `seo/competitors/ranked-keywords` (the breadth of queries the rival's site ranks for). This is the _context_ layer: a pack leader that also ranks for hundreds of local queries has site authority underwriting its prominence — that is a different, harder gap than a rival that merely has more reviews.

UnifAPI reads public data only — it never touches any business's profile. Keep any `billing` metadata so the output can state record cost.

## Workflow

1. **Set the queries and location — required.** Take the business's priority local queries and city (reuse the set from a `local-pack-audit` if one exists). If queries are missing, ask. (Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists.)
2. **Identify the recurring competitors.** Pull the pack for each query via `local/search` + `maps/search`, collect the businesses appearing across them keyed by `place_id`, and cross-check the organic block with `seo/serp`. Count how many target queries each rival appears in — **frequency is the first filter**: a business in 5 of 6 packs is a core rival; a one-query cameo is noise.
3. **Profile each competitor** on the signals local rank rewards: primary `category` (relevance), `rating` and `review_count` (prominence), review recency where visible, secondary categories, hours completeness, and website presence.
4. **Add the organic context for the leaders.** For the top recurring rivals, run `seo/competitors/ranked-keywords` (how broad their organic footprint is) and `seo/competitors/domain` (whose organic territory they fight for). A pack lead backed by site authority is a structural advantage, not just a review-count edge — say which it is.
5. **Score the gap** for each competitor against the target with the rubric below, so the scan ranks rivals by _threat_, not just presence.
6. **Find the common denominator.** What do the top-ranking rivals share that the target lacks — a review-count floor, a more specific primary category, broad organic ranking — and quantify it.

### Threat scoring rubric

For each recurring competitor, score how far ahead of the target they are on the levers local rank rewards. Higher total = bigger threat / clearer brief:

| Signal           | How to score (per competitor vs. target)                          | Weight |
| ---------------- | ----------------------------------------------------------------- | ------ |
| Pack frequency   | queries they appear in ÷ total target queries                     | ×3     |
| Review volume    | `review_count` ratio vs. target (capped at 3×)                    | ×3     |
| Rating           | rating delta vs. target (each +0.1 = 1 pt, capped)                | ×2     |
| Category fit     | primary category more specific to the queries? (0/1/2)            | ×2     |
| Organic strength | `ranked-keywords` count vs. target — broad local footprint? (0–3) | ×2     |
| Completeness     | secondary categories + hours + website all present? (0–3)         | ×1     |

**Threat score = Σ(signal × weight).** Rank competitors by threat descending. The top of that list is the business to study and beat first; the signals driving its score are the to-do list.

## Output: competitor table + gap summary

```markdown
# Local Competitor Scan — <business> — <date>

Queries: <…> · location: <…> · language/device: <…>

## Competitor profile (ranked by threat score)

| Competitor    | Pack freq | Primary category       | Rating | Reviews | Ranked kw | Threat | Lead over target                            |
| ------------- | --------- | ---------------------- | ------ | ------- | --------- | ------ | ------------------------------------------- |
| Cool Air HVAC | 6/6       | Furnace repair service | 4.9    | 680     | 1,240     | 19     | Reviews 3.2×, exact category, broad organic |
| A1 Comfort    | 5/6       | HVAC contractor        | 4.7    | 410     | 320       | 11     | Reviews 2×, full hours                      |
| _Target_      | 3/6       | HVAC contractor        | 4.7    | 210     | 180       | —      | —                                           |

## Gap summary

- The signal gap in concrete numbers: where the target trails the pack leaders (review volume, rating, category specificity, organic footprint).
- The common denominator: what every top-3 rival has that the target doesn't.
- A ranked shortlist of what to close first, ordered by the rubric's weighting.

Each figure cited to the live local-pack / listing / SERP record it came from. Record cost consumed (or best estimate).
```

### Worked example

Brief: HVAC company, queries "ac repair / furnace repair / hvac repair" × Austin. Target: 4.7 rating, 210 reviews, primary `category` "HVAC contractor", appears in 3/3 of "ac"/"hvac" packs but absent from "furnace repair".

- **Cool Air HVAC** — appears 6/6 across the broader query set, 4.9 / 680 reviews, primary "Furnace repair service"; `seo/competitors/ranked-keywords` shows ~1,240 ranked queries (vs. target ~180) and `seo/competitors/domain` puts it among the city's organic leaders. Threat score 19: reviews 3.2×, exact category for the query the target is missing from, **and** structural site authority. The brief: review velocity + the furnace category + content depth.
- **A1 Comfort** — 5/6, 4.7 / 410, primary "HVAC contractor" (same as target), modest organic footprint. Threat score 11: a pure review-volume lead, no category or authority edge — the most beatable leader.
- **Common denominator:** both top rivals clear ~400 reviews and carry query-specific primary categories; the hardest (Cool Air) also has broad organic ranking the target lacks.

Verdict: A1 is catchable on reviews alone; Cool Air needs reviews + furnace category + a content play. Reads: 6 local/maps + 3 SERP + 4 competitor-organic.

## Guardrails

- **Read-only ("eyes, not hands").** Public data only. It analyzes public competitor data; it never edits any listing, posts, or contacts competitors. The operator's own team acts on the gaps.
- **Confirmed vs inferred.** Report ratings, review counts, and ranked-keyword counts as confirmed reads; treat threat scores and "why they win" attribution as inferred — a high score means a clear brief, not proof that copying the signal flips the pack. Local rank has factors public data can't see.
- **Dated snapshots, re-runnable.** Local rankings are personalized and time-sensitive — record location, language, device, and timestamp, and keep the rival watchlist so the scan can be re-run.
- **Don't recommend copying manipulation.** If a rival ranks via name stuffing or fake categories, flag it as a risk / likely-unsustainable, not as a tactic to imitate.

## Related Skills

- **local-pack-audit** (Local SEO): establishes where the business ranks before profiling who beats it.
- **listing-accuracy-audit** (Local SEO): checks the target's own listing once the competitive bar is clear.
- **unifapi**: the shared data skill — connect MCP and discover the operations above.
