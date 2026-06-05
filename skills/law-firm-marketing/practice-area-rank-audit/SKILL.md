---
name: practice-area-rank-audit
description: When a law firm or attorney wants to know where it ranks for each practice-area + city query and what's holding it back. Also use on "personal injury lawyer [city] ranking," "family law attorney SEO," "where do we rank for practice areas," "law firm local pack," "why aren't we ranking for [practice area]," "attorney content gaps," or "law firm SEO audit." Reads public SERP and map data only — marketing research, not legal advice.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Practice Area Rank Audit

You are a legal-marketing search analyst. Law firms compete query by query: "personal injury lawyer [city]", "family law attorney [city]", "DUI lawyer [city]". Each practice area is its own race, and "near me" legal searches — high hire-intent, mostly mobile — are won by firms that rank in both the local pack and organic results _and_ back each practice area with a deep page. This skill audits the firm's rank for every practice-area × city query, benchmarks it against the firms outranking it, and flags where thin content is the reason it's losing.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

A legal rank is personalized and proximity-weighted — you can't reason it from memory, you pull the actual pack and SERP for the actual query at the actual search point. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Local-pack positions** — `local/search`, `maps/search` — for each practice-area + city query, the firms in the 3-pack and their `position`. Each listing carries `name`, `place_id`, `rating`, `review_count`, `category`, `address` — the prominence numbers behind each gap. **Loop the location param** across the firm's office(s) and the city centroid to build the grid. Tie the target to its `place_id`, not its name — firm names collide.
- **Organic SERP** — `seo/serp` — the organic positions for the same query, the firm's ranking URL, the competing firms' ranking pages, and which SERP features (local pack, People-Also-Ask, ads) sit above the fold. A firm can hold the blue links yet be absent from the pack — keep the two distinct.
- **AI-answer status** — `geo/serp` — whether the firm is cited (`is_target`) when someone asks an AI assistant for a "[practice area] lawyer in [city]", which sources the answer names, and which prompts have no clear local winner yet.
- **Who outranks + their winning page** — `seo/competitors/relevant-pages` (a higher-ranking firm's top organic pages — exposes the practice-area pillar doing the relevance work) and `seo/competitors/domain-rank-overview` (that firm's domain rank + organic traffic, so a content-depth gap is sized, not just asserted).

UnifAPI reads public data only — it never touches the firm's Google Business Profile or website CMS. Keep any `billing` metadata so the report can state record cost.

## Workflow

1. **Build the matchup grid.** Cross the firm's real revenue practice areas (personal injury, family law, criminal defense, estate planning, …) with its city/cities, splitting broad areas into the sub-niches competitors page out separately (personal injury → car accident, slip-and-fall, wrongful death). For each cell add the variants prospects type: bare "[practice area] lawyer [city]", "near me", "best [practice area] lawyer [city]". 5–15 core cells is a workable audit; more becomes noise. (Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists.)
2. **Pull live rank per cell.** Via `local/search` + `maps/search` (looping the location param) record the firm's local-pack position (1–3, extended 4–10, or absent); via `seo/serp` its organic position and ranking URL; via `geo/serp` its AI-answer status. Stamp every position with search point, language, and timestamp.
3. **Benchmark the firms above.** For each cell capture the firms ranking above the target in the pack and organically, with their `review_count` and `rating` from the listing, so each gap has named competitors and a prominence number.
4. **Score content depth per ranking page.** For a higher-ranking firm, pull `seo/competitors/relevant-pages` to find its practice-area pillar and supporting subpages, and `seo/competitors/domain-rank-overview` to size its authority; compare the firm's page against it on length and supporting-subpage coverage (rubric below).
5. **Score and rank the cells**, then write the prioritized gap list: practice areas where rank is weak _and_ content is thin, where new depth should move the needle most.

See [references/practice-area-method.md](references/practice-area-method.md) for the full grid-scoring, content-depth rubric, and gap-attribution checklist.

## Scoring rubric

Two scores combine into one priority. **Rank score** captures where the firm sits; **content-depth score** captures whether its page earns the rank.

| Rank state (per cell)                            | Rank score |
| ------------------------------------------------ | ---------- |
| In local pack 1 + organic top 3                  | 5          |
| In local pack 2–3 OR organic top 3               | 4          |
| Extended pack 4–10 OR organic 4–10               | 2          |
| Absent from pack but ranks organically (page 2+) | 1          |
| Absent entirely                                  | 0          |

| Content depth of the firm's ranking page                 | Depth score |
| -------------------------------------------------------- | ----------- |
| Deep page (~1,500–2,500 words) + 3–5 supporting subpages | 5           |
| Solid page (~1,500+ words), few/no subpages              | 3           |
| Thin page (&lt;800 words) or only a service-list stub    | 1           |
| No dedicated practice-area page at all                   | 0           |

Assign each practice area a **priority weight** (1–3): 3 = core revenue practice, 1 = peripheral. **Opportunity = (5 − rank_score) × weight**, and the gap is **content-attributable** when `depth_score ≤ 2` and a higher-ranking competitor's `seo/competitors/relevant-pages` page scores higher. Sort by opportunity descending; surface content-attributable gaps first because they are the most actionable lever a firm controls (Google rewards demonstrated topical depth on competitive legal niches).

## Output: rank grid + content depth + gaps

```markdown
# Practice Area Rank Audit — <firm> — <date>

Search params: location(s) <…> · language <…>

## Rank grid (one row per practice-area × city)

| #   | Practice area × city     | Local pack | Organic | AI cited? | Outranked by (reviews)          | Firm page words / subpages | Depth score | Opportunity | Likely cause                  |
| --- | ------------------------ | ---------- | ------- | --------- | ------------------------------- | -------------------------- | ----------- | ----------- | ----------------------------- |
| 1   | Personal injury · Austin | absent     | 14      | no        | Smith PI (612), Jones Law (430) | 420 / 0                    | 1           | 12          | thin content + low prominence |

## Prioritized gaps

- Cells sorted by opportunity, content-attributable gaps flagged first.
- Each gap with its concrete fix surface: "PI page is 420 words with no sub-topic pages; the firm outranking you (`seo/competitors/relevant-pages`) runs a 2,100-word pillar with 4 sub-pages."
- Every position and page metric cited to the live SERP/map record, stamped with search point + date.
- Record cost consumed (or best estimate if billing metadata is unavailable).
```

### Worked example (abbreviated)

> A 3-attorney injury + family firm in Austin. Grid = (personal injury, car accident, family law, divorce) × Austin, with "near me" + "best" variants. "Car accident lawyer Austin" → firm absent from pack (`local/search`), organic #14 (`seo/serp`); the two firms above run 1,900- and 2,400-word pillars with car-accident sub-pages (rear-end, drunk-driving, pedestrian) per `seo/competitors/relevant-pages` and carry 600+ reviews. Firm's car-accident page: 380 words, no subpages → depth 1, rank 0, weight 3 → **opportunity 15, content-attributable**, ranked #1. "Estate planning Austin" scored rank 4 / depth 3, weight 1 → opportunity 1, deprioritized. The brief leads with the car-accident pillar + sub-pages, not estate planning.

## Guardrails

- **Marketing research only — not legal advice.** This skill audits visibility and content depth; it makes no legal claims and never drafts attorney-advertising copy that implies, predicts, or guarantees a case outcome.
- The firm remains responsible for state-bar and attorney-advertising compliance on anything it publishes — disclaimers, "specialist"/"expert" usage rules, testimonial and case-result rules, jurisdictional notices. Word-count and subpage targets are SEO guidance, not a license to publish unreviewed claims.
- **Read-only ("eyes, not hands").** It reports rankings and gaps; it never edits a Google Business Profile, website, or listing, and never posts. The firm's own team makes any changes.
- **Confirmed vs inferred.** Report the city/query/search point each position was measured at; label positions read off the pack as confirmed and depth attribution as inferred. Rankings are personalized and dated — treat each as a snapshot, present ranges not false precision. Word count and subpage count are public-page estimates; verify before acting.

## Related Skills

- **attorney-reputation-benchmark** (Law Firm Marketing): the reviews / local-pack prominence side for this firm — pair a prominence gap here with its review math.
- **local-pack-audit** (Local SEO): the general-purpose multi-location local-pack audit and proximity/prominence/relevance attribution checklist this rank loop is built on.
- **unifapi**: the shared data skill — connect MCP and discover the operations above.
