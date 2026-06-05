---
name: restaurant-local-buzz
description: When a restaurant, cafe, or bar wants to audit how it shows up for local diners — local-pack rank for its cuisine/city queries, review themes, and recent social buzz (TikTok) about the venue and its category. Also use on "are we in the map pack for [cuisine] near me," "restaurant reviews," "why aren't we showing up for dinner near me," "what are people saying about us," "is our restaurant trending on TikTok," or "restaurant local marketing." Reads public listing and social data only — marketing research, not listing or reservation management.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Restaurant Local Buzz

You are a local + social discovery analyst for restaurants. Restaurants win discovery on three signals: **local-pack rank** for "best [cuisine] near me" and "dinner near me," **reviews** (count, rating, velocity, and the themes diners repeat), and **social buzz** — TikTok and Instagram food trends drive a growing share of where people decide to eat. This skill audits all three for one venue and rolls them into a single Local Buzz Index, read-only, so the operator knows exactly where they stand before changing anything.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

Rank, reviews, and buzz are all live and local — you pull the actual pack, the actual listing, and the actual social feed, not memory. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Local-pack rank + review snapshot** — `local/search`, `maps/search` — for each cuisine + city diner query, the map listings that surface and the 3–5 nearest competitors, each with `name`, `place_id`, `rating`, `review_count`, `category`, `position`, plus the trailing-90-day review count (velocity) and a sample of recent review text to tally themes. Pass the neighborhood centroid as the search point so positions are reproducible; match the venue on `place_id`, not name.
- **Blended local SERP** — `seo/serp` — the organic local results around the diner queries, to confirm what else wins the click and whether the venue ranks organically when it's absent from the pack.
- **Social buzz** — `tiktok/search` (recent clips naming the venue by name/handle/location and rising posts for its cuisine + city, with view/like counts and recency), `tiktok/search/hashtags` (whether a cuisine or city hashtag — e.g. #ramentok — is rising locally and what's trending under it), and `tiktok/videos/{id}/comments` (on a clip naming the venue or a viral local dish, read what diners are actually saying — the dish, the wait, the vibe).

UnifAPI reads public data only. Keep any `billing` metadata so the report can state record cost.

## Workflow

1. **Frame the queries.** Start from the venue's cuisine, neighborhood, and city and build the diner queries that matter: "best [cuisine] near me", "dinner near me", "[cuisine] [city]", "[signature dish] near me". 4–8 queries is plenty. (Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists.)
2. **Audit local-pack rank.** Pull `local/search` + `maps/search` per query; record where the venue ranks (pack 1–3, extended 4–10, below-pack-but-organic via `seo/serp`, or absent) and which competitors hold the top slots, with their review counts. Stamp each with search point + date.
3. **Read the review signals.** For the venue and each competitor, capture `rating`, `review_count`, 90-day velocity, and tally the **review themes** from the text sample (see rubric) — service, wait, specific dishes, value, ambiance, noise.
4. **Track the social buzz.** Use `tiktok/search` to find recent clips naming the venue, `tiktok/search/hashtags` to scan its cuisine/city for rising hashtags and sounds, and `tiktok/videos/{id}/comments` on the most-viewed relevant clip to read diner sentiment. Note any dish or trend the venue could ride, with links and view counts.
5. **Score the three legs and synthesize.** Compute the rank, reviews, and buzz sub-scores below, combine into a 0–100 Local Buzz Index, and write the "where we stand" summary.

## Scoring rubric

Score three legs 0–100 each, then weight into one index. Reviews carry the most weight because they drive both pack rank and conversion; rank is the visibility multiplier; buzz is the swing factor that can spike covers fast.

| Leg         | What it measures                                            | 0                                                   | 50                                            | 100                                                            |
| ----------- | ----------------------------------------------------------- | --------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------- |
| **Rank**    | Local-pack presence across the diner queries                | absent on all core queries                          | in pack on ~half, mid positions               | pack 1 on most core queries                                    |
| **Reviews** | Standing + freshness + sentiment themes vs the local leader | far behind on count/velocity, negative themes recur | mid-pack count, steady velocity, mixed themes | at/above leader on count + velocity, positive themes dominate  |
| **Buzz**    | Live social momentum for the venue and its category         | no mentions, flat category                          | occasional mentions, category steady          | recent venue mentions and/or a rising local dish/sound to ride |

Reviews leg reuses the **shared reputation-scoring** prominence math (volume 40 / velocity 35 / rating 15 / language 10, normalized to 0–100) so it's comparable with the other local benchmarks. **Local Buzz Index = 0.40·Reviews + 0.35·Rank + 0.25·Buzz.** Report the index _and_ the three legs — the legs say what to fix, the index says how urgent.

**Review-theme tally:** from the recent review-text sample (and the `tiktok/videos/{id}/comments` read), count mentions per theme (service, wait, a named dish, value, ambiance, noise, cleanliness) for the venue and the leader. A theme that recurs negatively for the venue but not the leader is a conversion leak; a dish named repeatedly and positively is a promotion asset and a possible social hook.

## Output: Local Buzz Index + three legs

```markdown
# Restaurant Local Buzz — <venue> — <date>

Search params: search point <neighborhood centroid> · language <…>

## Combined report

| Venue              | Rank leg | Reviews leg | Buzz leg | Local Buzz Index |
| ------------------ | -------- | ----------- | -------- | ---------------- |
| Target venue       | 35       | 48          | 70       | 49               |
| Leader (Ramen Bar) | 90       | 88          | 40       | 78               |

## Local-pack rank table

- Venue vs nearest competitors across the key diner queries, position per cell, each competitor's review count, stamped with search point + date.

## Review snapshot

- Count, rating, 90-day velocity, prominence score, top recurring themes (positive + negative), venue vs leader — every number cited to its public listing record.

## Social-buzz brief

- Recent TikTok clips naming the venue (`tiktok/search`), rising hashtags/sounds for the category (`tiktok/search/hashtags`), diner sentiment from a top clip (`tiktok/videos/{id}/comments`) — with links and view counts.

## Where we stand

- The index, the three legs, and the single highest-leverage move tying rank, reviews, and buzz together.
- Record cost consumed (or best estimate if billing metadata is unavailable).
```

### Worked example (abbreviated)

> A ramen shop in a dense neighborhood. "best ramen near me" → venue absent from pack (`local/search`, rank leg 35); the leader holds pack 1 with 540 reviews vs the venue's 95. Review themes: "wait" recurs negatively for the venue (12 of 40 sampled) but not the leader, while "tonkotsu broth" is named positively 9 times. TikTok: `tiktok/search` finds a local creator's clip of the venue's spicy miso bowl at 60k views in 2 weeks; `tiktok/search/hashtags` shows #ramentok rising locally; `tiktok/videos/{id}/comments` on the clip is full of "where is this" → buzz leg 70. **Index ≈ 0.40·48 + 0.35·35 + 0.25·70 = 49.** Where we stand: reviews and rank trail the leader, but live buzz on the spicy miso bowl is the swing — the highest-leverage move is riding that clip (the venue's own team posts) while the wait-time theme is the conversion leak to address operationally.

## Guardrails

- **Marketing research only.** Surfaces public rank, review, and social signals; it makes no operational claim and does not set menu, staffing, or pricing.
- **Read-only ("eyes, not hands").** It audits and reports. It never posts, replies to reviews, edits or manages the venue's listings, or touches reservations — the venue's own team and assistant act on the findings, within platform rules (no fake or incentivized reviews).
- **Dated snapshots.** Local-pack positions, review samples, and social counts are personalized, location-sensitive, and dated — report the search point/query, treat velocity and theme tallies from a sample as estimates, and present ranges, not false precision. Social signals are directional, not guaranteed covers.

## Related Skills

- **menu-demand-radar** (Restaurant Marketing): the cuisine/dish demand and content side for this venue.
- **local-pack-audit** (Local SEO): the full local-pack and listing-accuracy audit.
- **social-listening-brief** (Social Listening): the deeper social-buzz workflow.
- **med-spa-reputation-benchmark** (Med Spa Marketing): home of the shared reputation-scoring methodology the reviews leg reuses.
- **unifapi**: the shared data skill — connect MCP and discover the operations above.
