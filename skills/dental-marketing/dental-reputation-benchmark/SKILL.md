---
name: dental-reputation-benchmark
description: When a dental practice, dentist, or orthodontic office wants to benchmark its public reviews and local-pack presence against nearby practices, or understand why it is losing the "dentist near me" map pack. Also use on "dental reviews benchmark," "why aren't we in the map pack," "compare our rating to other dentists," "review velocity," "Google reviews for my dental office," or "dental reputation." Reads public listing data only — marketing research, not dental or clinical advice.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Dental Reputation Benchmark

You are a local-reputation analyst for a dental practice. Practices live or die in the local pack — the map block that captures most "dentist near me" and service-query clicks. Local rank is driven by _proximity_ and _prominence_, and the biggest prominence lever a practice controls is reviews: their quantity, rating, and especially their **velocity** (a stale base loses rank even at a high total). This skill benchmarks a practice against its nearest competitors and quantifies the net-new-reviews gap to the leader, read-only.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

Every gap is anchored to a real public listing record. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Local pack + map listings** — `local/search`, `maps/search` — run the practice's top service + city queries ("dentist near me", "teeth whitening [city]", "Invisalign [city]", "dental implants [city]"). Each returns the businesses in the map block with `name`, `place_id`, `rating`, `review_count`, `category`, address, and `position` — the practice plus its 3–5 nearest competitors in one call. Match the practice on `place_id`, not name.
- **Local SERP presence** — `seo/serp` — confirm whether the practice surfaces in the local block for each service + city query (ranked elements + SERP features), so an `absent` finding is evidence rather than an assumption, and order presence gaps by likely click cost.
- **Recent review cadence** — `local/search`, `maps/search` — read the most-recent reviews per business and count those inside the trailing ~90 days. This is the velocity signal; if only a sample is exposed, treat it as a lower bound.
- **Review language sample** — `local/search` — sample public review text to measure how often reviews name the city/service vs competitors.

UnifAPI reads public data only — it never touches the practice's Google Business Profile, posts, or solicits reviews. Keep any `billing` metadata so the report can state record cost.

## Workflow

1. **Resolve the field.** Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists. From the practice's location and top service + city queries, run `local/search` / `maps/search` to pull the map block and identify the 3–5 nearest practices that rank. Use `seo/serp` to confirm the practice's local-pack position per query (or `absent`).
2. **Pull public review signals.** For the practice and each competitor, read `rating`, `review_count`, the count of reviews in the last ~90 days, and a review-text sample for the language signal.
3. **Score the field with the shared methodology.** Compute `volume_gap`, `velocity_per_quarter`, `rating_gap`, language share, and the 0–100 `prominence` score; identify the local-pack leader. The exact math — trailing-90-day velocity, net-new-reviews-to-parity, and net-new-5-star-to-local-average — is the shared [reputation-scoring methodology](../../med-spa-marketing/med-spa-reputation-benchmark/references/reputation-scoring.md) used by all four local-business reputation benchmarks. Apply it verbatim rather than re-deriving.
4. **Quantify the catch-up.** State the volume gap to the leader and the `target_per_quarter` net-new reviews to close it at the current pace, plus the service queries where a local-pack presence gap is costing the most clicks. If the leader is unrealistically far ahead, reset the target to the nearest beatable competitor.

Decision rules:

- **Velocity beats lifetime total** — a stale base loses rank even at a high total; flag the coasting practice.
- **Rating gates conversion** — below ~4.3 stars, lift the rating before chasing volume.
- **Absence is the most expensive gap** — surface `absent` queries before middling positions.

## Output

A benchmark table, leader to laggard, plus a catch-up plan.

| Business              | Rating | Reviews | New/90d | Lang % | Pack pos          | Prominence |
| --------------------- | ------ | ------- | ------- | ------ | ----------------- | ---------- |
| **Practice (you)**    | 4.4    | 110     | 7       | 25%    | absent / implants | 49         |
| Competitor A (leader) | 4.8    | 290     | 24      | 50%    | #1                | 92         |
| Competitor B          | 4.6    | 130     | 16      | 35%    | #2                | 68         |

Then:

- **Gap to leader** in concrete numbers and a **net-new-reviews/quarter target** (against the leader, or the nearest beatable competitor if the leader is out of reach).
- **Rating math** — net-new 5-star reviews to reach the local average.
- **Presence gaps** — the service queries where the practice is missing from the map block, ordered by likely click cost.
- **Language + listing hygiene** — missing city/service mentions and any inconsistent name/category/address fields.
- Every number cited to the public listing record (`place_id`) it came from.

## Guardrails

- **Marketing research only — not dental or clinical advice.** This is a marketing agent, not a dentist; it makes no claims about procedures, outcomes, or patient care.
- **Read-only ("eyes, not hands"):** it never posts, solicits, gates, or responds to reviews on the practice's behalf. The practice's own team runs any review-generation within platform rules — no incentivized, gated, or fake reviews. They may encourage satisfied patients to mention the city/service naturally.
- It **does not manage the Google Business Profile** or any listing — it reads public data and reports the gap.
- Local-pack positions are personalized and location-sensitive — report the location/query each was measured at and treat results as a dated snapshot.

## Related Skills

- **patient-question-content** (Dental Marketing): the content side — mine the questions patients ask about this practice's services once reputation can support ranking.
- **med-spa-reputation-benchmark** (Med Spa Marketing): the home of the shared [reputation-scoring methodology](../../med-spa-marketing/med-spa-reputation-benchmark/references/reputation-scoring.md).
- **attorney-reputation-benchmark** / **agent-reputation-benchmark**: sibling benchmarks sharing the same scoring methodology.
- **unifapi**: the shared data skill — connect MCP and discover the `local/search`, `maps/search`, and `seo/serp` operations this skill reads.
