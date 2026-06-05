# Keyword Opportunity Scoring Reference

The deterministic method behind the ranked table in `SKILL.md`. Every input comes from a real UnifAPI call — no field is invented. Score each shortlisted keyword, then rank by total.

## Inputs per keyword

| Field                      | Source operation                                     | Notes                                                                              |
| -------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `volume` (monthly)         | `seo/keywords/overview`                              | Use the latest monthly figure, not the 12-mo average, unless the seed is seasonal. |
| `difficulty` (KD 0–100)    | `seo/keywords/overview` or `seo/keywords/difficulty` | Top-10 ranking chance; higher = harder.                                            |
| `intent` (+ probabilities) | `seo/keywords/overview` or `seo/keywords/intent`     | informational / navigational / commercial / transactional.                         |
| `cpc` / `competition`      | `seo/keywords/overview`                              | Used only as a tie-breaker.                                                        |
| `target_position`          | `seo/serp` (with `target` set)                       | `none`, or the integer organic position.                                           |
| `serp_owners`              | `seo/serp`                                           | Top organic domains + SERP features present.                                       |

If a SERP pull was skipped for a keyword, set Winnability from `difficulty` alone and tag the row "winnability unverified."

## Sub-score 1 — Volume (weight 0.35)

Log-banded so a 50k-volume head term doesn't swamp the rubric:

| Monthly volume | Sub-score |
| -------------- | --------- |
| ≤ 50           | 1         |
| 51 – 200       | 3         |
| 201 – 1,000    | 5         |
| 1,001 – 5,000  | 7         |
| 5,001 – 20,000 | 9         |
| > 20,000       | 10        |

## Sub-score 2 — Intent fit (weight 0.35)

Match the keyword's dominant intent against the product's **desired action** (from product context). Decision tree:

1. Keyword is transactional/commercial **and** the product directly satisfies it (it is the kind of thing being searched to buy) → **9–10**.
2. Keyword is comparison / "best" / "alternatives" / "vs" and the product is a credible entrant → **7–8**.
3. Keyword is informational and the product can author an authoritative answer that leads naturally to it → **4–6**.
4. Keyword is informational but off-topic, or navigational toward a competitor's brand → **0–3**.

When `overview`/`intent` returns split probabilities, use the highest-probability intent; if two are within 10 points, score for the more commercial of the two but note the ambiguity.

## Sub-score 3 — Winnability (weight 0.30)

Read the live `seo/serp` result for who actually holds page 1, then map:

| Page-1 picture (from `seo/serp`)                                 | KD band | Base sub-score |
| ---------------------------------------------------------------- | ------- | -------------- |
| Forums/Reddit/Quora, thin or outdated pages, no major brand      | < 30    | 8–10           |
| Mixed: a couple of mid-authority sites, some weak slots          | 30 – 55 | 4–7            |
| Locked by high-authority incumbents / official docs / big brands | > 55    | 1–3            |

Adjustments (apply after the base, cap at 10, floor at 0):

- **+1** if `target_position` is 11–30 (striking distance — a push, not a build).
- **+1** if a winnable SERP feature is present that the planned content format owns (PAA for FAQ pages, video carousel if you ship video, image pack for visual content).
- **−1** if an AI Overview occupies the top slot and the target is not already cited (harder to earn the click).

## Total and ranking

```text
Opportunity = (Volume × 0.35 + IntentFit × 0.35 + Winnability × 0.30) × 10
```

Range 0–100. Rank descending. Tie-breakers in order:

1. Striking-distance target position (11–30 beats `none`).
2. A winnable SERP feature the content format can capture.
3. Lower CPC/competition (cheaper to also defend with paid if needed).

## Flags

- **Aspirational** — Volume ≥ 9 but Winnability ≤ 2: real demand, long build. Keep it visible but separate from quick wins.
- **Quick win** — Winnability ≥ 8 and `target_position` 11–30: structural/optimization push, not net-new content; hand to `seo-audit`.
- **Winnability unverified** — scored without a SERP pull; KD-only estimate.

## Worked sub-score math

Keyword: `best ci tool for monorepos`, US/English.

- `overview` → volume 2,400, KD 34, intent commercial.
- `seo/serp` (target `acme.dev`) → page 1 = two listicles (g2.com, dev.to) + a Reddit thread; no dominant vendor; target not present; PAA box present.

Sub-scores:

- Volume: 2,400 → band 1,001–5,000 → **7**.
- Intent fit: commercial, product is a CI tool → **9**.
- Winnability: weak page 1, KD 34 (band 30–55 but skewed weak) → base 8; no striking-distance bonus (target absent); +0 features net → **8**.

```text
Opportunity = (7 × 0.35 + 9 × 0.35 + 8 × 0.30) × 10
            = (2.45 + 3.15 + 2.40) × 10
            = 8.00 × 10 = 80  → rounded band 81 in the table after CPC tie-break nudge
```
