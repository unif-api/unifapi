# Reputation Scoring Methodology

Shared, deterministic methodology for the local-business reputation benchmarks
(med spa, dental, attorney, real-estate agent). All four read the same public
signals — `rating`, `review_count`, and recent review cadence — and score them
the same way so results are comparable and explainable. Vertical skills **link
here** rather than re-deriving the math; this doc is the single source of truth
for every formula below.

The goal is not a vanity score. It answers one operator question: **how far
behind the local-pack leader are we, and how many net-new reviews per quarter
does it take to catch up?**

## Inputs (all public, read-only)

Per business (the subject and each competitor surfaced in the local pack),
capture from the maps/local listing record (`local/search`, `maps/search`):

- `rating` — current average star rating.
- `review_count` — total lifetime reviews.
- `reviews_last_90d` — count of reviews dated in the trailing ~90 days. Derive
  it by reading the most-recent reviews and counting those inside the window. If
  the source only exposes a sample (not the full recent stream), say so and
  treat velocity as a **lower-bound estimate**.
- `local_pack_position` — the business's rank in the map block per query, or
  `absent` if it does not appear. Read from `local/search` / `maps/search`
  ordering, and confirmed against `seo/serp` for whether the listing surfaces in
  the local block for the service + city query at all.
- `category` — the listing's primary category, to confirm you are comparing
  like-for-like (a med spa vs a med spa, not vs a dermatology hospital).
- Optional `review_text` sample — for the language signal (neighborhood / city
  mentions, service/treatment mentions).

If a field is missing or the sample is too thin, lower confidence and label the
number an estimate rather than guessing.

## Velocity: why trailing-90-day beats lifetime total

```text
velocity_per_quarter   = reviews_last_90d        # the trailing-90-day window IS one quarter
velocity_per_month     = reviews_last_90d / 3
```

Velocity — net-new reviews in the trailing 90 days — is the headline signal, and
it is deliberately weighted above lifetime `review_count` for three reasons:

1. **Recency is a ranking input.** Google's local "prominence" signal favors a
   listing that is actively earning reviews. A steady recent stream signals an
   active, in-demand business; a listing with a big lifetime total but near-zero
   recent reviews reads as coasting and loses prominence to fresher competitors.
2. **It is the only number the operator can move this quarter.** Lifetime total
   is the sum of years of history — it cannot be changed retroactively. Velocity
   is this quarter's effort, so the catch-up plan must be expressed as a
   velocity target, not a total.
3. **It exposes momentum the total hides.** A clinic with 200 lifetime reviews
   adding ~2/quarter is being overtaken by one with 90 reviews adding
   ~25/quarter — the second business will pass it within a few quarters and is
   already winning the freshness signal. Ranking the field on lifetime total
   alone would rank these backwards. Always flag a high-total / low-velocity
   business as "coasting" even when the raw total looks healthy.

Use a trailing-90-day window (not 30) so a single slow month or one viral week
does not whipsaw the estimate; 90 days is long enough to smooth noise and short
enough to reflect current operations.

## Derived gaps

```text
leader        = competitor with the highest review_count in the field
local_avg_rating = mean(rating) across the field (subject + competitors)

volume_gap    = leader.review_count - subject.review_count
rating_gap    = local_avg_rating - subject.rating
velocity_gap  = leader.velocity_per_quarter - subject.velocity_per_quarter
```

## Net-new-reviews-to-parity (the core calculation)

Catching the leader is a **moving target** — the leader keeps earning reviews
while the subject does. Naively dividing `volume_gap` by the subject's velocity
ignores that the finish line is moving, and badly underestimates the effort. The
honest model nets the two velocities against each other:

```text
net_leader_velocity = leader.velocity_per_quarter - subject.velocity_per_quarter

if net_leader_velocity <= 0:
    # Subject is already out-earning the leader — the gap is closing on its own.
    closing_rate       = max(subject.velocity_per_quarter - leader.velocity_per_quarter, 1)
    quarters_to_parity = ceil(volume_gap / closing_rate)
    target_per_quarter = subject.velocity_per_quarter        # just maintain pace
else:
    # Leader is pulling away. To reach parity within a chosen horizon H
    # (default H = 4 quarters), the subject must (a) cover the gap over H AND
    # (b) match the leader's ongoing additions each quarter:
    target_per_quarter = (volume_gap / H) + leader.velocity_per_quarter
```

Intuition for the `else` branch: each quarter the leader adds
`leader.velocity_per_quarter`, so just to stop the gap widening the subject must
match that; to _also_ close the existing `volume_gap` over `H` quarters it must
add `volume_gap / H` on top. Hence `target_per_quarter = volume_gap/H +
leader.velocity`.

**Reality-check the target.** If `target_per_quarter` is implausibly high
relative to the subject's current velocity (rule of thumb: more than ~3× current
pace, or above what the busiest competitor in the field actually achieves), the
leader is effectively out of reach this year. Do **not** report a fantasy
number. Re-run the calculation against the **nearest beatable competitor**
(smallest positive `volume_gap` with a velocity the subject can plausibly
out-pace) and report that as the real near-term goal, stating explicitly that
the leader is a longer-horizon target.

### Worked example

> Subject: 70 reviews, ~4/quarter. Leader: 612 reviews, ~22/quarter.
> `volume_gap = 542`, `net_leader_velocity = 22 - 4 = 18 > 0` (leader pulling
> away). Over `H = 4`: `target_per_quarter = 542/4 + 22 ≈ 158/quarter`. That is
> ~40× current pace — unrealistic. Reset to the #3 firm (210 reviews,
> ~9/quarter): `volume_gap = 140`, `target = 140/4 + 9 = 44/quarter`. Report 44
> as the goal; note the leader is a multi-year target, not a this-year one.

## Net-new-reviews-to-reach-the-local-average-rating

A low rating is fixed by burying old low scores under new high ones. To find how
many new reviews (assumed to land at 5.0) lift `rating` to `target_rating` (use
`local_avg_rating`):

```text
n = ceil( review_count * (target_rating - rating) / (5 - target_rating) )
```

Derivation: new average = `(review_count*rating + n*5) / (review_count + n)`;
set equal to `target_rating` and solve for `n`. If realistic new reviews average
below 5.0 (say `r_new`), substitute `r_new` for the `5` terms:
`n = ceil( review_count * (target_rating - rating) / (r_new - target_rating) )`.

Gate this before the volume chase: below ~4.3 stars, lifting the rating usually
matters more than raw volume, because rating gates the click-through even when
the listing ranks.

## Prominence score (0–100, for ranking the field)

A single comparable score so the benchmark table sorts. Weighting reflects what
moves the local pack: velocity and volume dominate, rating gates, language
nudges.

```text
volume_score    = min(subject.review_count / leader.review_count, 1) * 40
velocity_score  = min(subject.velocity_per_quarter / max(leader.velocity_per_quarter, 1), 1) * 35
rating_score    = clamp((subject.rating - 3.5) / (5 - 3.5), 0, 1) * 15
language_score  = (share of sampled reviews mentioning the target locality/service) * 10

prominence = round(volume_score + velocity_score + rating_score + language_score)
```

Velocity carries 35 of 100 on purpose: a stale base loses local rank even at a
high lifetime total, and velocity is the lever the operator can move fastest.

## Language signal

Local relevance is boosted when reviews name the locality (neighborhood / city)
and the specific service/treatment. Sample recent `review_text` and compute the
share mentioning each. A low share vs competitors is an opportunity: the operator
can encourage satisfied clients to mention the place and service **naturally** —
never scripted, incentivized, or fabricated. (Real-estate skills track the
neighborhood-mention share specifically; keep any language guidance about places
and service, never about who lives somewhere — see the Fair-Housing note in that
skill.)

## Reporting rules

- Cite every number to the public listing record (`place_id`) it came from, and
  match the subject on `place_id`, not name.
- Local-pack positions are personalized and location-sensitive — state the
  location/query each was measured at and treat it as a dated snapshot.
- When the leader is unrealistically far ahead, set the catch-up target against
  the nearest beatable competitor and say so.
- Present ranges, not false precision, when velocity is sample-based.
- Never recommend incentivized, gated, or fake reviews — that violates platform
  policy and is out of scope.
