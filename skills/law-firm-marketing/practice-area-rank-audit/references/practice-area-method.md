# Practice Area Rank Audit — Method

Working reference for building a defensible practice-area × city rank grid for a
law firm and attributing each gap to the right cause — rank position, content
depth, or local prominence. The SKILL.md carries the summary; this is the
detailed method. Read-only marketing research, not legal advice.

## 1. Scope the grid

Two axes, plus query variants:

- **Practice areas** — the firm's real revenue practices, not a generic menu:
  "personal injury", "car accident", "family law", "divorce", "criminal
  defense", "DUI", "estate planning". Split a broad area into the sub-niches
  that have their own demand and their own ranking page (personal injury →
  car accident, truck accident, slip-and-fall, wrongful death). Each sub-niche
  that competitors page-out separately is its own cell.
- **Cities / search points** — the local pack re-ranks by proximity, so the
  same query produces a different pack from a different point. Sample at least
  the firm's office coordinates and the city centroid; for multi-office firms,
  repeat per office.
- **Variants** — for each practice-area × city cell, run the bare term
  ("car accident lawyer austin"), the "near me" form, and the "best …" form.
  Intent and the competitive set differ across them.

5–15 core cells is a workable audit; beyond that the signal drowns.

## 2. Pull and normalize each cell

Per query × search point, capture both blocks:

- **Local pack** — position (1–3 visible, 4–10 if "More places" expanded),
  and per firm in the pack: `name`, `place_id` (the stable key), `category`,
  `rating`, `review_count`. Match the target on `place_id`, never name.
- **Organic** — the target's organic position and ranking URL, the top 3
  organic firms and their ranking URLs, and which SERP features
  (local pack, People-Also-Ask, ads, "near me" carousels) push organic down.
- **AI answer** — whether the firm is cited for the "[practice area] lawyer in
  [city]" prompt, and whether any local firm clearly owns the answer.

Stamp every cell with search point, language, device, and timestamp. A rank
without its search point is not a finding.

## 3. Score rank

| Cell state                                       | Rank score |
| ------------------------------------------------ | ---------- |
| Local pack 1 + organic top 3                     | 5          |
| Local pack 2–3 OR organic top 3                  | 4          |
| Extended pack 4–10 OR organic 4–10               | 2          |
| Absent from pack but ranks organically (page 2+) | 1          |
| Absent entirely                                  | 0          |

**Opportunity = (5 − rank_score) × priority_weight**, weight 1–3 from the firm
(3 = core revenue practice). Sort descending. A score-4 core practice can
outrank a score-0 peripheral term — the formula handles the ceiling, the eye
does not.

## 4. Score content depth

Competitive legal niches reward demonstrated topical depth: a deep pillar page
plus supporting sub-pages signals authority both to Google and to AI answer
engines. For a firm outranking the target, pull `seo/competitors/relevant-pages`
to surface its practice-area pillar and the supporting subpages behind it, and
`seo/competitors/domain-rank-overview` to size that domain's authority so the
depth gap is quantified, not asserted. For the firm's ranking (or would-be) page
and each competitor page outranking it, read from the public page:

- **Word count** of the main practice-area page. Benchmark: core practice pages
  that win tend to run ~1,500–2,500 words; <800 words is a thin stub.
- **Supporting subpage count** — distinct URLs that deepen the area (sub-niches,
  per-city pages, FAQs, case-result/result-type pages). Competitive niches
  typically need 3–5 supporting subpages behind the pillar.

| Firm page                                    | Depth score |
| -------------------------------------------- | ----------- |
| ~1,500–2,500 words + 3–5 supporting subpages | 5           |
| ~1,500+ words, few/no subpages               | 3           |
| <800 words or service-list stub              | 1           |
| No dedicated practice-area page              | 0           |

Word count and subpage count are public-page estimates, not exact CMS truth —
present them as approximate and verify before acting.

## 5. Attribute the gap

For each weak cell, walk this in order and name the dominant cause:

### Content-attributable

`depth_score ≤ 2` **and** a higher-ranking competitor's page scores higher on
depth. This is the most actionable lever the firm fully controls: build the
pillar to ~1,500–2,500 words and add the 3–5 supporting subpages competitors
run. Flag these first.

### Prominence gap

The firms above carry materially higher `review_count` / `rating` while content
depth is comparable. Quantify it ("winner has 612 reviews vs the firm's 70")
and hand the reputation side to `attorney-reputation-benchmark`. Reviews and a
complete profile drive local-pack _prominence_.

### Proximity-bound

In the local pack, rank improves monotonically as the search point moves toward
the office, and the firms above are simply closer. A fixed office cannot
out-proximity a closer rival near that rival. Levers: a legitimate second
office, or category/practice breadth that widens eligible queries. Never
recommend address manipulation.

### Relevance gap

The winner's primary `category` or page title matches the practice-area query
more exactly (e.g. "Personal injury attorney" vs the firm's generic "Law
firm"). Lever: category/title correction; hand off to listing-accuracy work.

### Unattributed

If the firm trails despite equal proximity, comparable reviews, deeper content,
and exact category, label the cell **unattributed** and say so — do not invent
a cause (spam filtering, listing issues, and behavioral signals are not
readable from public SERP data).

## 6. Snapshot discipline

- Positions are personalized and location-sensitive; every one is stamped with
  search point + date and treated as a snapshot, not a trajectory.
- Re-running over time is the only way to establish a trend; one pull is never a
  trend.
- Present ranges and patterns, not false precision — pack composition shifts
  intra-day and with personalization the API cannot see.

## Compliance note

This method scores visibility and content depth only. Word-count and subpage
targets are SEO guidance — they are not a license to publish unreviewed legal
claims. The firm owns state-bar and attorney-advertising compliance on any page
it builds (outcome/result rules, testimonial rules, "specialist/expert" usage,
required disclaimers and jurisdictional notices). The skill never drafts
outcome-implying copy and never publishes.
