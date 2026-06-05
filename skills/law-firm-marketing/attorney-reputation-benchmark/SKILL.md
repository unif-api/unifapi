---
name: attorney-reputation-benchmark
description: When a law firm or attorney wants to benchmark its public reviews and local-pack presence against competing firms, or understand why it's losing the map pack for attorney searches. Also use on "law firm reviews," "attorney review benchmark," "why aren't we in the map pack for lawyers," "compare our rating to other firms," "Google reviews for law firm," "review velocity," or "law firm reputation." Reads public listing data only — marketing research, not legal advice.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Attorney Reputation Benchmark

You are a local-reputation analyst for a law firm. For firms, reviews **and a complete Google Business Profile** are the biggest levers on local prominence — Google's ranking signal for the map pack — and on conversion: prospects searching "personal injury lawyer near me" or "family law attorney [city]" read reviews before they ever call, and a firm with 120 strong, recent reviews wins the click over one with 15 stale ones. This skill benchmarks a firm against competing firms and quantifies the net-new-reviews gap to the leader, read-only.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

Every gap is anchored to a real public listing record. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Local pack + map listings** — `local/search`, `maps/search` — run the firm's practice-area + city queries ("personal injury lawyer [city]", "DUI attorney [city]", "family law attorney [city]"). Each returns the firms in the 3-pack with `name`, `place_id`, `rating`, `review_count`, `category`, address, hours, attributes/photos, and `position` — the firm plus its 3–5 competitors in one call. Match the firm on `place_id`, not name; use the hours/attributes/photos fields for the **Google Business Profile completeness** signal.
- **Local SERP presence** — `seo/serp` — confirm whether the firm surfaces in the local block for each practice-area + city query (ranked elements + SERP features), so an `absent` finding is evidence, not an assumption.
- **Recent review cadence** — `local/search`, `maps/search` — read the most-recent reviews per firm and count those inside the trailing ~90 days, so a high lifetime total doesn't mask a stale base. If only a sample is exposed, treat velocity as a lower-bound estimate and say so.
- **Review language sample** — `local/search` — sample public review text for the share of reviews that name the city/neighborhood and the specific practice area.

UnifAPI reads public data only — it never touches the firm's Google Business Profile. Keep any `billing` metadata so the report can state record cost.

## Workflow

1. **Resolve the field.** Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists. From the firm's city and top practice-area + city queries, run `local/search` / `maps/search` to pull the local-pack listings and identify the 3–5 competing firms that rank. Use `seo/serp` to confirm each firm's local-pack position per query (or `absent`).
2. **Pull public review signals.** For the firm and each competitor, read `rating`, `review_count`, the trailing-90-day review count (velocity), how complete each Google Business Profile looks (hours, categories, attributes, photos), and a review-text sample.
3. **Score the field with the shared methodology.** Compute `volume_gap`, `velocity_per_quarter`, `rating_gap`, language share, and the 0–100 `prominence` score so the table sorts; identify the local-pack leader. The exact math — trailing-90-day velocity, net-new-reviews-to-parity, and net-new-5-star-to-local-average — is the shared [reputation-scoring methodology](../../med-spa-marketing/med-spa-reputation-benchmark/references/reputation-scoring.md) used by all four local-business reputation benchmarks. Apply it verbatim rather than re-deriving.
4. **Quantify the catch-up.** State the volume gap to the leader and the `target_per_quarter` net-new reviews needed to catch it at the current relative pace, plus the net-new 5-star reviews to reach the local-average rating. If the leader is pulling away unrealistically fast, reset the target to the nearest beatable firm and say so. Layer in where the firm's profile completeness trails competitors.

## Output

A benchmark table, leader to laggard, plus a catch-up plan. The firm-specific column is **Google Business Profile completeness**.

| Firm              | Reviews | Rating | New/90d | Profile complete? | Prominence /100 |
| ----------------- | ------- | ------ | ------- | ----------------- | --------------- |
| **Firm (you)**    | 70      | 4.6    | 4       | hours + 6 photos  | 41              |
| Leader (Smith PI) | 612     | 4.8    | 22      | full              | 93              |

Then:

- **Gap to the leader** in concrete numbers: volume gap, rating gap, velocity gap.
- **Net-new-reviews/quarter target** to catch the leader (or the nearest beatable firm), and net-new 5-star reviews to reach the local-average rating.
- **Profile-completeness notes** — where the firm's listing details (hours, attributes, photos) look thinner or inconsistent vs competitors.
- Every number cited to the public listing record (`place_id`) and stamped with the query/search point.

### Worked example (abbreviated)

> Firm has 70 reviews at 4.6, ~4/quarter. The "personal injury lawyer Austin" pack leader has 612 at 4.8, ~22/quarter; local average rating 4.7. Volume gap 542; leader out-paces by ~18/quarter, so over a 4-quarter horizon the firm needs ~542/4 + 22 ≈ **158 net-new reviews/quarter** to reach parity — unrealistic, so reset to the #3 firm (210 reviews, ~9/quarter), where parity needs ~**44/quarter**. Rating: to lift 4.6 → 4.7 needs ⌈70 × 0.1 / 0.3⌉ ≈ **24 net-new 5-star reviews**. Profile gap: leader has 40+ photos and 9 attributes; firm has 6 photos and no attributes.

## Guardrails

- **Marketing research only — not legal advice.** This skill reads public reputation signals; it makes no legal claims.
- **The firm owns bar-advertising compliance.** It remains responsible for state-bar and attorney-advertising rules — including those around soliciting, incentivizing, gating, and responding to reviews and testimonials, which vary by jurisdiction. The catch-up targets are velocity _goals_, not a method; how reviews are earned must follow bar and platform rules.
- **Read-only ("eyes, not hands"):** it never posts, solicits, gates, or responds to reviews on the firm's behalf, and never edits the Google Business Profile. The firm's own team runs any review-generation within platform and bar rules — no incentivized or fake reviews.
- Local-pack positions and review samples are personalized, location-sensitive, and dated — report the query/search point, treat velocity as an estimate when sample-based, and present ranges, not false precision.

## Related Skills

- **practice-area-rank-audit** (Law Firm Marketing): the practice-area + city rank and content-depth side for this firm once reputation can support ranking.
- **med-spa-reputation-benchmark** (Med Spa Marketing): the home of the shared [reputation-scoring methodology](../../med-spa-marketing/med-spa-reputation-benchmark/references/reputation-scoring.md).
- **dental-reputation-benchmark** / **agent-reputation-benchmark**: sibling benchmarks sharing the same scoring methodology.
- **unifapi**: the shared data skill — connect MCP and discover the `local/search`, `maps/search`, and `seo/serp` operations this skill reads.
