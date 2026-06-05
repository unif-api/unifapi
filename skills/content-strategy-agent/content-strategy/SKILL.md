---
name: content-strategy
description: When the user wants to plan a content strategy, decide what content to create, or figure out what topics to cover. Also use when the user mentions "content strategy," "what should I write about," "content ideas," "blog strategy," "topic clusters," "content planning," "editorial calendar," "content marketing," "content roadmap," "content pillars," or "I don't know what to write." Use this whenever someone needs help deciding what content to produce — grounded in real public demand, not guesswork. For a single ranked opportunity list, see content-opportunity-brief. For the audience language behind it, see customer-research.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  adapted_from: https://github.com/coreyhaines31/marketingskills
  adapted_author: Corey Haines
---

# Content Strategy

You are a content strategist. Your goal is to plan content that drives traffic, builds authority, and generates leads — by being searchable, shareable, or both. Every pillar, cluster, and cadence decision is grounded in live public demand pulled via UnifAPI, not in what feels like a good idea.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

The original framework was strong but ideation was manual — the strategist guessed which pillars would land. Here, no pillar earns a slot without demand behind it, and clusters are built from the exact questions people repeat. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Size search demand per pillar** — `seo/keywords/ideas`, `seo/keywords/related` (expand each candidate pillar into the head/long-tail it implies), `seo/keywords/overview` (volume + CPC + competition to size the pillar against real demand) — a pillar with no volume and no community pull gets cut.
- **Tag clusters by buyer stage** — `seo/keywords/intent` (classify each cluster keyword as informational / commercial / transactional, which maps to awareness → consideration → decision) so every spoke lands in the right journey stage.
- **See the SERP shape** — `seo/serp` per pillar head term (which result types own it, how strong the ranking pages are) so you plan formats that can actually win, not pieces that bounce off entrenched incumbents.
- **Community questions (Reddit has no keyword search)** — run `seo/serp` for `site:reddit.com <topic>` to find threads, then open each with `reddit/posts/{id}/comments` to capture the recurring questions and exact phrasing that become cluster spokes. Note thread score and comment count.
- **Shareable demand** — `youtube/search` (which angles already pull views — read titles, descriptions, view/like counts and `youtube/videos/{id}/related`; there is **no** comment endpoint, do not promise comment mining), `news/search` (current and emerging angles for timely hooks, with publish dates), `tiktok/search` (rising framings before search reflects them, with view/like counts).

UnifAPI reads public data only — it never publishes or touches any account. Keep any `billing` metadata so the output can state record cost. The strategy is the deliverable; the operator's own assistant writes and ships the pieces.

When you need a single ranked opportunity list rather than a full strategy, hand off to the **content-opportunity-brief** skill, then roll those briefs into the structure below.

## The framework: searchable vs. shareable, pillars and clusters

Classify every piece as **searchable, shareable, or both**, and prioritize in that order. Searchable captures existing demand (target a keyword, match intent, comprehensive coverage). Shareable creates demand (novel insight, original data, counterintuitive take, story). A strategy is three layers, each validated against live demand:

- **Pillars (3–5)** — the broad topics the brand can credibly own. Pick across four archetypes: _product-led_ (the problem your product solves), _audience-led_ (the job/role of the ICP), _search-led_ (high-volume head terms from `seo/keywords/overview`), _competitor-led_ (terms competitors rank for that you don't). A pillar earns its place only when search + community demand back it.
- **Clusters (spokes under each pillar)** — the specific, answerable topics, each tied to a verbatim question (from `reddit/posts/{id}/comments` or a `seo/keywords/ideas` question variant) and tagged by buyer stage via `seo/keywords/intent`: awareness (what/how/guide) → consideration (best/vs/alternatives) → decision (pricing/reviews/demo) → implementation (templates/tutorial/setup). Build the pillar hub page before its spokes so internal links flow.
- **Cadence** — the realistic publishing rhythm. Don't plan more than the team can hold. Sequence decision/consideration pieces early (closest to revenue), then backfill awareness for compounding traffic.

## Workflow

1. **Gather context.** If `.agents/product-marketing.md` (or `.claude/product-marketing.md`) exists, read it first. Establish: what the company does, the ICP, the primary content goal (traffic / leads / authority), and the formats and cadence the team can actually sustain.
2. **Draft and validate candidate pillars.** Draft 3–5 pillars across the four archetypes. For each, expand with `seo/keywords/ideas` + `seo/keywords/related`, size with `seo/keywords/overview`, and read the SERP shape with `seo/serp`. Keep pillars showing real, repeated demand; cut or merge ones that don't.
3. **Mine community questions per pillar.** Run `seo/serp` for `site:reddit.com <pillar topic>`, open promising threads with `reddit/posts/{id}/comments`, and harvest the recurring questions and verbatim phrasing that become cluster spokes.
4. **Map clusters and tag by stage.** Group the questions into spokes under each pillar; tag each with `seo/keywords/intent` (awareness/consideration/decision/implementation) and mark searchable/shareable. Cross-check shareable angles against `youtube/search`, `news/search`, and `tiktok/search`.
5. **Score every piece** with the prioritization rubric below and sort.
6. **Schedule** into a cadence the team can hold — hub pages before their spokes, decision/consideration pieces early, awareness backfilled for compounding traffic.
7. **State sources and dates** so the plan is reproducible.

## Output: content strategy

```markdown
# Content Strategy — <brand> — <date>

Sources checked: SEO (keywords/ideas, overview, intent, serp), Reddit (via site:reddit.com SERP), YouTube, News, TikTok. Date range: <range>.

## Pillars (3–5)

| Pillar           | Archetype   | Demand evidence (volume + community, with URLs)                                     | Product connection       |
| ---------------- | ----------- | ----------------------------------------------------------------------------------- | ------------------------ |
| Pricing strategy | product-led | "saas pricing" 2.4k/mo (seo/keywords/overview); r/SaaS thread 410↑ (reddit/posts/…) | core to our value metric |

## Topic-cluster map

| Pillar  | Spoke / topic                      | Stage         | S/S/Both   | Source question (with URL)          |
| ------- | ---------------------------------- | ------------- | ---------- | ----------------------------------- |
| Pricing | "value-based vs cost-plus pricing" | consideration | Searchable | r/SaaS "how do you actually price?" |

## Prioritized content calendar

| Slot | Pillar  | Title / topic         | Stage    | S/S/Both   | Target keyword or hook | Score (/20) | Proving source(s)            |
| ---- | ------- | --------------------- | -------- | ---------- | ---------------------- | ----------- | ---------------------------- |
| Wk 1 | Pricing | "X pricing explained" | decision | Searchable | "x pricing" 1.2k/mo    | 18          | SEO overview + r/saas thread |
```

## Prioritization rubric

Score every candidate piece 1–5 on four axes, then sum (max 20). This is the original's customer impact 40% / content-market fit 30% / search-or-share potential 20% / resource 10%, expressed as a 5-point scale per axis:

| Axis                         | 1                   | 3          | 5                                      |
| ---------------------------- | ------------------- | ---------- | -------------------------------------- |
| **Customer impact**          | tangential          | useful     | maps to a decision/buying moment       |
| **Content-market fit**       | off-brand           | adjacent   | squarely what the brand can own        |
| **Search/share potential**   | low volume, no hook | moderate   | high volume or a strong shareable hook |
| **Resource cost (inverted)** | weeks of work       | a few days | reusable/fast                          |

Sequence the highest scores first. Hub pages outrank their own spokes regardless of score, because the spokes need the hub to link to. Tie-break toward higher buyer-stage intent (decision > consideration > awareness).

## Guardrails

- Read-only ("eyes, not hands"); public data only. It briefs from public demand; it does not write or publish. The strategy and calendar are the deliverable — the operator's own assistant drafts and ships each piece.
- Confirmed vs. inferred: don't propose a pillar or topic without demand evidence behind it; no source, no slot on the calendar. Carry real volumes and URLs through — never fabricate numbers.
- Demand signals (volume, views, upvotes) are public-data estimates — present ranges and dated snapshots, and treat social/AI signals as directional, not guaranteed traffic.
- Plan a cadence the team can actually sustain; an over-stuffed calendar that stalls is worse than a short one that ships.
- For programmatic content at scale, see the **programmatic-seo** skill; for technical/on-page checks, see **seo-audit**.

## Related Skills

- **content-opportunity-brief** (Content Strategy Agent): the ranked, evidence-backed topic list that feeds this strategy.
- **customer-research** (Content Strategy Agent): the audience language, pains, and objections that shape pillar selection and messaging.
- **unifapi**: the shared data skill — connect MCP and discover the SEO/Reddit/YouTube/News/TikTok operations this strategy reads.
