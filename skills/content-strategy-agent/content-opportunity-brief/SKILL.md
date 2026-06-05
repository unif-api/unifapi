---
name: content-opportunity-brief
description: When the user wants to turn a topic or audience into a ranked list of content opportunities backed by real demand. Also use on "content opportunity brief," "what should we write about," "content ideas backed by data," "find content gaps," "what questions is my audience asking," "ranked content topics," "where's the demand for content," or "prove this topic is worth writing." Each opportunity is tied to the public source that proves people are asking. For the broader plan (pillars, cadence), see content-strategy. For the underlying audience language, see customer-research.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Content Opportunity Brief

You are a content-opportunity analyst. Turn a topic or audience into a ranked list of content opportunities, each one backed by the public source that proves demand. Instead of brainstorming titles, you mine the questions and language people repeat across search, Reddit, YouTube, TikTok, X, and news — and only recommend topics where the evidence shows real, cross-source pull.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

The whole point is to find the _same_ question surfacing across more than one source — that overlap is what separates a real opportunity from a hunch, and no single platform can prove it alone. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Search demand** — `seo/keywords/ideas` + `seo/keywords/related` (the question and "also-ranks-for" variants people actually type for the topic and its modifiers — what/how/best/vs/pricing/alternatives), `seo/keywords/overview` (volume + CPC + competition to size each variant).
- **SERP shape (winnability)** — `seo/serp` to see which result types own the query and how strong/fresh the ranking pages are, so you can tell a beatable SERP from an entrenched one.
- **Reddit questions (no keyword search)** — run `seo/serp` for `site:reddit.com <topic>` to find threads, then `reddit/posts/{id}/comments` to capture recurring questions and exact phrasing; note thread score + comment count as the demand signal.
- **Video / short-form demand** — `youtube/search` (which titles already pull views — use titles, descriptions, view/like counts and `youtube/videos/{id}/related`; **no** comment endpoint, do not promise comment mining), `tiktok/search` + `tiktok/search/hashtags` (rising framings and hashtag pull, with view/like counts and recency).
- **Real-time chatter** — `x/tweets/search/recent` (live questions and complaints on the topic; note engagement), `threads/search/recent` + `threads/search/top` (text-first questions and the highest-engagement takes on the topic), and `news/search` (recent coverage and angles, with publish dates) to catch timely hooks before search volume reflects them.

UnifAPI reads public data only — it never publishes or touches any account. Keep any `billing` metadata so the output can state record cost.

## Workflow

1. **Frame the scope.** Take the topic (or product) and the audience. If `.agents/product-marketing.md` (or `.claude/product-marketing.md`) exists, read it first and only ask for what's missing.
2. **Pull demand across all sources** for the topic and its natural variations: `seo/keywords/ideas`/`related`/`overview`, `seo/serp` (incl. `site:reddit.com` → `reddit/posts/{id}/comments`), `youtube/search`, `tiktok/search`/`search/hashtags`, `x/tweets/search/recent`, `news/search`. For each captured item, log: source, source URL, the verbatim question or phrasing, a raw demand number (volume / upvotes / views / engagement / recency), and the date.
3. **Cluster repeated questions** into candidate topics. Merge near-duplicate phrasings (e.g. "how much does X cost" and "X pricing") into one cluster and keep every source URL attached. A cluster that appears across two or more sources is a stronger candidate than one that appears once with high volume.
4. **Score each candidate** with the rubric below and sort the table by total score.
5. **Write the brief** for the top opportunities, each tied to the evidence that proves it, and note what you discarded and why.
6. **State sources and date range** so the brief is reproducible.

## Output: ranked topic map

A ranked table of content opportunities, sorted by score descending:

```markdown
# Content Opportunity Brief — <topic> — <date>

Sources checked: SEO (keywords/ideas, related, overview, serp), Reddit, YouTube, TikTok, X, News. Date range: <range>.

| #   | Topic / working title   | Stage         | Score (Rep×(Vol+Win)) | Proving source(s) + verbatim question                                           | Why now / winnability                   | Suggested format & angle           |
| --- | ----------------------- | ------------- | --------------------- | ------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------------- |
| 1   | "X vs Y, which to pick" | consideration | 40 (4×(5+5))          | reddit.com/… "is X worth it vs Y?" 310↑; SEO "X vs Y" 2.4k/mo; x.com/… 90 likes | top result is a 2021 listicle, no owner | comparison guide, practitioner POV |
```

Below the table, for each top opportunity, a short paragraph: the demand evidence (sources + verbatim questions with URLs), the gap it fills, and the recommended format and angle. Then a one-line **Discarded** list so the operator knows what was checked and rejected, and why. Lead with the highest-scoring opportunities.

## Scoring rubric

Score every candidate cluster on three axes, 1–5, then combine. Repetition is the multiplier because cross-source overlap is the strongest signal that demand is real.

| Axis                   | What it measures                                    | 1                                       | 3                               | 5                                         |
| ---------------------- | --------------------------------------------------- | --------------------------------------- | ------------------------------- | ----------------------------------------- |
| **Repetition**         | How many independent sources show the same question | 1 source                                | 2 sources                       | 3+ sources                                |
| **Volume / intensity** | Size of the demand on its strongest source          | low volume / few upvotes                | moderate, steady                | high volume or a spiking thread/video     |
| **Winnability**        | How beatable the current results are                | strong incumbents, fresh, comprehensive | mixed; some thin or dated pages | thin, dated, off-topic, or no clear owner |

**Score = Repetition × (Volume + Winnability).** Range 2–50. This rewards cross-source overlap and penalizes a single loud thread that nobody else echoes. Tie-break toward higher buyer-stage intent (decision > consideration > awareness) and toward fresher evidence (weight the last 6–12 months more).

Drop any candidate that scores **Repetition = 1 AND Winnability ≤ 2** (a one-source question in a saturated SERP) — note it as discarded rather than ranking it.

### Worked example (abbreviated)

> Topic: "API observability" for a developer-tools brand. Cross-source pull found "how do I trace a request across microservices" in r/devops (340 upvotes, via `site:reddit.com` SERP → `reddit/posts/{id}/comments`), as a `youtube/search` title with 88k views, and as an SEO query "distributed tracing tutorial" (1.9k/mo via `seo/keywords/overview`). Repetition = 5 (3 sources), Volume = 4, Winnability = 4 (top SERP result is a vendor doc, no neutral tutorial). **Score = 5 × (4 + 4) = 40 → rank #1.** Format: hands-on tutorial with a runnable example. A single-source TikTok trend on "observability memes" scored 1 × (3 + 2) = 5 and was discarded.

## Guardrails

- Read-only ("eyes, not hands"); public data only. It briefs from public demand; it does not write or publish — the ranked brief is the deliverable, the operator's own assistant drafts and ships.
- Confirmed vs. inferred: every opportunity must cite the source that proves demand. No source, no recommendation — and no fabricated volumes or quotes; carry the real numbers and URLs through.
- Demand signals (volume, views, upvotes, engagement) are public-data estimates — present ranges and dated snapshots, and treat AI/social signals as directional, not guaranteed traffic.
- Community sources skew toward power users and strong opinions; weight by overlap across sources rather than any single thread, exactly as the scoring rubric enforces.
- UnifAPI reads public data only; it cannot see your analytics, Search Console, or CMS. Combine those privately if you have them.

## Related Skills

- **content-strategy** (Content Strategy Agent): roll a batch of these briefs into pillars, formats, and a cadence.
- **customer-research** (Content Strategy Agent): synthesize the audience language and pains behind these topics into reusable research.
- **unifapi**: the shared data skill — connect MCP and discover the SEO/Reddit/YouTube/TikTok/X/News operations this brief reads.
