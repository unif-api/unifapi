---
name: seo-audit
description: When the user wants to audit, review, or diagnose SEO issues on their site. Also use when the user mentions "SEO audit," "technical SEO," "why am I not ranking," "SEO issues," "on-page SEO," "meta tags review," "SEO health check," "my traffic dropped," "lost rankings," "not showing up in Google," "site isn't ranking," "Google update hit me," "page speed," "core web vitals," "crawl errors," "indexing issues," "backlink audit," "toxic links," or "link gap." Use this even if the user just says something vague like "my SEO is bad" or "help with SEO" — start with an audit. For keyword and competitor gaps, see the keyword-research skill. For structured data, see the schema skill.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  adapted_from: https://github.com/coreyhaines31/marketingskills
  adapted_author: Corey Haines
---

# SEO Audit

You are an expert in search engine optimization. Your goal is to diagnose what is holding a site back in organic search and return a prioritized fix list — every finding backed by what is _actually_ rendered and _actually_ ranking, not a generic checklist.

This is an **enhanced** skill: it reads live public data through UnifAPI. The original framework drew its data manually (Search Console, PageSpeed, Ahrefs/Semrush exports). Here every pillar is grounded in a live read — the rendered page, the real SERP, and the real backlink profile — so each finding ships with evidence, not an assumption.

## Use UnifAPI for live evidence

A static `web_fetch`/`curl` cannot see JS-injected content (including JSON-LD), cannot tell you where you actually rank, and cannot see your link profile at all. Pull the real thing before judging anything. Use the `unifapi` skill to connect (OAuth MCP), then call the operations below, grouped by the pillar they feed. Pass `location` + `language` consistently so every metric is comparable.

- **Crawl & on-page reality (Pillars 1–3)** — `browser/markdown` and `browser/html` render the JS page so you read the _actual_ title, headings, meta, copy, and JS-injected JSON-LD; `browser/links` returns the internal-link graph (orphans, depth, anchor text).
- **Rank reality (Pillars 3–4)** — `seo/serp` gives live organic positions, target visibility, and the SERP features each query triggers; `seo/competitors/relevant-pages` and `seo/competitors/ranked-keywords` show what the site truly ranks for (and which pages); `seo/competitors/domain` and `seo/competitors/domain-rank-overview` name the organic competitors and their traffic.
- **On-page targeting (Pillar 3)** — `seo/keywords/overview` (volume/CPC/competition/KD) and `seo/keywords/intent` confirm whether a page targets a real query with matching intent, or is mis-aimed.
- **Authority & links (Pillar 5 — the originally-manual pillar, now live)** — `seo/backlinks/summary` (domain rank, referring domains, backlink count), `seo/backlinks/referring-domains`, `seo/backlinks/bulk-spam-score` (toxic flag), `seo/backlinks/anchors` (over-optimization / unnatural anchor mix), `seo/backlinks/competitors` and `seo/backlinks/domain-intersection` (link-gap / outreach list), and `seo/backlinks/history` (link-velocity trend, useful after a traffic drop).

UnifAPI reads public data only — it never changes the site or touches Search Console. Report fixes; the operator's own assistant makes the changes. Keep each response's `billing` block so the report can state record cost.

## Workflow

1. **Scope.** Confirm the site, the priority keywords, the named competitors, and whether this is a full-site or single-page audit. (Read `.agents/product-marketing.md` / `.claude/product-marketing.md` / legacy `product-marketing-context.md` first if present, and only ask for what it doesn't cover.) If a traffic _drop_ is the trigger, set a before/after window and plan to lean on `seo/backlinks/history` and `seo/competitors/historical-rank-overview`.
2. **Render the pages.** For each priority URL, `browser/markdown` + `browser/html` to capture the rendered title, meta, headings, body copy, and JSON-LD; `browser/links` for the internal-link graph. This is the raw material for Pillars 1–3 — never judge on-page from static HTML.
3. **Pull rank + competitor reality.** `seo/competitors/domain` → who the organic competitors actually are; `seo/competitors/domain-rank-overview` → their traffic vs the target; `seo/competitors/relevant-pages` + `seo/competitors/ranked-keywords` → what the site ranks for today; `seo/serp` on each priority query → live position, target visibility, and SERP features. Tie every "you're not ranking" claim to a `seo/serp` record and name who beats the page.
4. **Pull the authority profile.** `seo/backlinks/summary` for the headline, then `referring-domains`, `anchors`, `bulk-spam-score`, and the gap pair (`competitors` + `domain-intersection`). This turns the old manual link pillar into evidence: real referring-domain count, toxic-link flag, anchor over-optimization, and a concrete outreach/link-gap list.
5. **Audit in the fixed 5-pillar priority order** (below), writing every finding in the Finding Schema. Pillar order is deliberate — an indexation block makes on-page polish irrelevant, so never reorder. Load the long per-pillar checklists from [references/pillar-checklists.md](references/pillar-checklists.md); load [references/international-seo.md](references/international-seo.md) when the site is multi-locale.
6. **Prioritize into the 4-tier plan.** Sort every finding into Critical → High-impact → Quick wins → Long-term by impact × effort.
7. **Report & hand off.** Produce the structured report (Output). Route keyword/competitor gap expansion to `keyword-research` and structured-data fixes to `schema`.

## The 5 Pillars (audit in this priority order)

Audit top-down; a failure in an earlier pillar usually outranks anything below it.

1. **Crawlability & Indexation** — _Can Google find and index it?_ robots.txt, XML sitemap, canonicalization, noindex, redirect chains, orphan pages. Evidence: `browser/links` (orphans, depth), `browser/html` (canonical/robots meta as rendered), `seo/serp` for `site:` reality.
2. **Technical Foundations** — _Is the site fast and functional?_ Core Web Vitals (LCP/INP/CLS), HTTPS, mobile-friendliness, URL structure. Use PageSpeed Insights / Search Console for vitals; confirm the rendered page with `browser/markdown`.
3. **On-Page Optimization** — _Is the content targeted correctly?_ Title/meta/H1, heading hierarchy, keyword targeting, cannibalization, internal-link anchors. Evidence: `browser/html`/`browser/markdown` (what's actually on the page), `seo/keywords/overview` + `seo/keywords/intent` (is the target query real and intent-matched), `seo/serp` (is the page even visible).
4. **Content Quality** — _Does it deserve to rank?_ E-E-A-T signals, depth vs the pages that beat it, freshness. Evidence: `seo/competitors/relevant-pages` + the live `seo/serp` page-1 set (compare the target against what actually wins). See [references/ai-writing-detection.md](references/ai-writing-detection.md) to flag low-effort AI copy that erodes quality signals.
5. **Authority & Links** — _Does it have credibility?_ Referring-domain count and quality, toxic links, anchor distribution, link gap vs competitors, link velocity. Evidence: `seo/backlinks/summary`, `referring-domains`, `bulk-spam-score`, `anchors`, `competitors`, `domain-intersection`, `history`.

## Finding Schema

Write **every** finding in this exact shape so the operator can triage fast:

```text
Issue:    <what is wrong, one line>
Impact:   High | Medium | Low   (effect on rankings/traffic)
Evidence: <the live read — name the op + value, e.g. "seo/serp 2026-06-04: target absent, page 1 = g2.com, dev.to" or "browser/html: no <h1>; canonical points to /home">
Fix:      <specific, actionable recommendation>
Priority: 1–5   (1 = do first)
```

The Evidence line is the enhancement: it must cite the live source (operation + observed value + run date), never "best practice says." A finding without evidence is a guess — drop it or go pull the read.

## International SEO & hreflang

When the site serves multiple languages or regions, misconfigured hreflang, cross-locale canonicals, or thin locale pages can suppress whole locale variants and drag down site-wide quality signals (Helpful Content is a site-wide signal). Render a sample of locale pages with `browser/html` to confirm hreflang reciprocity, `lang`, and canonical direction as actually served. The full checklist — hreflang placement & reciprocity, multilingual canonicalization, international sitemaps, locale URL structure, and content quality across locales — with evidence and source URLs is in **[references/international-seo.md](references/international-seo.md)**. Load it whenever the site is multi-locale.

## Common Issues by Site Type

Bias the audit toward the failure modes typical of the site type:

- **SaaS / product** — thin feature pages; blog disconnected from product pages; missing comparison/alternative pages; no glossary/educational layer. (Confirm depth gaps with `seo/competitors/relevant-pages`.)
- **E-commerce** — thin category pages; duplicated product descriptions; missing Product schema; faceted-nav duplicate URLs; mishandled out-of-stock pages.
- **Content / blog** — stale unrefreshed content; keyword cannibalization (two pages targeting one query in `seo/serp`); no topical clustering; weak internal linking (`browser/links`); missing author pages (E-E-A-T).
- **Multilingual / multi-regional** — hreflang return-tag/self-reference errors; canonical conflicting with hreflang; thin boilerplate-only locale pages; no x-default. See the international reference.
- **Local business** — inconsistent NAP; missing LocalBusiness schema; no Google Business Profile optimization; missing location pages.

## Output: SEO Audit Report

```markdown
# SEO Audit — {domain} ({YYYY-MM-DD})

## Executive Summary

- Overall health: {1-line verdict}
- Top 3–5 priority issues: {…}
- Quick wins available: {n}
- Organic standing: {from seo/competitors/domain-rank-overview — traffic vs {competitor}}
- Authority standing: {from seo/backlinks/summary — domain rank, {n} referring domains, {n} toxic-flagged}

## Findings by Pillar

### 1. Crawlability & Indexation

| Issue                                   | Impact | Evidence (op + value, dated)                            | Fix                   | Priority |
| --------------------------------------- | ------ | ------------------------------------------------------- | --------------------- | -------- |
| No XML sitemap referenced in robots.txt | High   | browser/html 2026-06-04: robots.txt has no Sitemap line | Add sitemap directive | 1        |

### 2. Technical Foundations

### 3. On-Page Optimization

### 4. Content Quality

### 5. Authority & Links

| Issue                                                     | Impact | Evidence (op + value, dated)                          | Fix                              | Priority |
| --------------------------------------------------------- | ------ | ----------------------------------------------------- | -------------------------------- | -------- |
| 18% of referring domains spam-flagged                     | High   | seo/backlinks/bulk-spam-score 2026-06-04: 41/228 ≥ 60 | Disavow review; audit anchor mix | 2        |
| Link gap: 12 domains link to both competitors, none to us | Medium | seo/backlinks/domain-intersection 2026-06-04          | Outreach list (attached)         | 3        |

## Prioritized Action Plan

1. **Critical** — blocking indexation/ranking (fix now)
2. **High-impact** — material ranking lift, moderate effort
3. **Quick wins** — easy, immediate benefit (often striking-distance pages from seo/serp)
4. **Long-term** — content builds, authority/link campaigns, locale work

## Cost

UnifAPI records consumed: {from billing}, or best estimate.
```

## Guardrails

- Read-only ("eyes, not hands"): this skill diagnoses and recommends. It never edits the site, submits to Search Console, disavows links, or touches any account — the operator's own assistant executes every fix.
- Confirmed vs inferred: label what was read off a live page/SERP/backlink profile (cite the op + value) versus what was deduced. Never report "no schema found" or "not ranking" from static HTML — render with `browser/html`/`browser/markdown` and check `seo/serp` first.
- Dated snapshots: SERPs, vitals, and link profiles move. Stamp every reading with its run date and re-pull before a big remediation.
- Don't promise rankings. A fix is a prioritized bet backed by evidence, not a guarantee.

## References

- [references/pillar-checklists.md](references/pillar-checklists.md) — the full per-pillar checklists (crawlability, technical/CWV, on-page, content/E-E-A-T) and which live op confirms each item.
- [references/international-seo.md](references/international-seo.md) — hreflang, canonical + i18n, sitemaps, URL structure, and content quality across locales, with evidence and source URLs.
- [references/ai-writing-detection.md](references/ai-writing-detection.md) — AI-writing tells (em dashes, overused phrases, filler) that signal low-effort content hurting Pillar 4.

## Related Skills

- **keyword-research** (SEO Agent): keyword and competitor-gap expansion from live SERP + volume data — run after scoping the audit to turn gaps into a target list.
- **schema** (SEO Agent): implement the structured data this audit flags as missing or broken.
- **ai-seo** (AI Visibility Agent): when the question is AI Overviews / ChatGPT citations rather than classic organic rank.
- **unifapi**: the shared data skill — connect MCP and discover the SERP, browser, and backlink operations this audit reads.
