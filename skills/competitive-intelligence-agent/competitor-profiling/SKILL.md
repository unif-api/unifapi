---
name: competitor-profiling
description: When the user wants to research, profile, or analyze a competitor from its public footprint — site, search/SEO, backlinks, social, and positioning. Also use on "competitor profile," "competitor research," "competitor analysis," "profile this competitor," "analyze competitor," "competitive intelligence," "competitor deep dive," "who are my competitors," "competitor landscape," "competitor dossier," or "research these competitors." Input is a competitor name or URL; output is a structured, source-cited dossier. For tracking a specific launch and its reception, see competitor-launch-monitor.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  adapted_from: https://github.com/coreyhaines31/marketingskills
  adapted_author: Corey Haines
---

# Competitor Profiling

You are a competitive intelligence analyst. Your goal is to turn a competitor's full public footprint — site, search and content, backlinks, social, positioning — into a structured, comparable dossier where every claim is traceable to a public source.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

A profile built from the homepage alone is marketing copy retyped. The original ran a three-phase flow — render the site, pull SEO and market data, then synthesize — and that ceiling is restored here: search footprint, backlink authority, and the rendered site are first-class evidence alongside social. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Search & content footprint (the SEO layer)** — `seo/competitors/domain` (their organic competitors), `seo/competitors/domain-rank-overview` (rank + estimated traffic), `seo/competitors/ranked-keywords` (what they actually rank for), `seo/competitors/relevant-pages` (their top pages = where their content strategy pays off).
- **Backlinks & authority** — `seo/backlinks/summary` (domain rank, referring-domain and backlink counts), `seo/backlinks/referring-domains` (who links to them), `seo/backlinks/competitors` (competitors by shared referrers) and `seo/backlinks/domain-intersection` (domains linking to them but not you = your link-gap outreach list).
- **Site & pricing (the rendered-page layer)** — `browser/markdown` — render their homepage, pricing, and key pages to Markdown to read the _actual_ content (incl. JS-injected JSON-LD) a plain fetch can't see; this replaces a generic site scrape.
- **Social footprint** — `x/users/by/username/{username}` + `x/users/{id}/tweets` (how they describe themselves, what gets traction), `linkedin/companies/{slug}` + `linkedin/companies/{slug}/jobs` + `linkedin/companies/{slug}/posts` (headcount, where they're hiring = product direction, buyer-facing framing), `youtube/channels/{channel_id}/videos` (what they showcase), `reddit/posts/{id}/comments` (unfiltered user sentiment).
- **Coverage** — `news/search` — funding, milestones, and independent reporting to separate verified facts from self-published claims.

UnifAPI reads public data only — it renders public pages and reads public records; it never logs into any account. Keep any `billing` metadata so the dossier can state record cost.

## Workflow

1. **Set scope.** Confirm the competitor (name + URL), your product, and depth: **quick scan** (positioning + pricing + headline search/social signals) or **deep profile** (full footprint). (Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists; only ask for what's missing.) Default to quick scan unless asked otherwise.
2. **Read the owned site (Phase 1).** Pull positioning, target audience, value prop, pricing, features, and proof with `browser/markdown` on the homepage and key pages — render, don't guess, so JS-injected copy and schema are captured.
3. **Pull search & market data (Phase 2).** Run the `seo/competitors/*` ops for rank, traffic, ranked keywords, and top pages, and the `seo/backlinks/*` ops for authority and link-gap. This is the layer the social-only version dropped — it shows whether the positioning is backed by real organic demand and links, or is homepage-only.
4. **Pull the social footprint.** `x/*`, `linkedin/*`, `youtube/*`, `reddit/*`, and `news/*` above; capture each as a source URL + verbatim quote/figure + date.
5. **Cross-reference, don't retype (Phase 3).** Where claims and public signals disagree (e.g. "10,000 customers" vs. thin traffic/backlinks/community footprint), flag it. Label inferences as inferences; date anything stale.
6. **Build the message map** (below) so you can see what they emphasize, repeat, and prove — then derive implications for your product.

## Output: dossier template

One dossier per competitor (add a short cross-competitor summary if profiling several), dated:

```markdown
# Competitor Dossier — [Name] (generated YYYY-MM-DD · depth: quick/deep)

## Footprint at a glance

| Field                 | Value                  | Source                        |
| --------------------- | ---------------------- | ----------------------------- |
| Tagline               |                        | homepage (browser/markdown)   |
| Founded / HQ          |                        | page / news                   |
| Team-size estimate    |                        | LinkedIn band                 |
| Funding               |                        | news                          |
| Domain rank / traffic |                        | seo/backlinks + rank-overview |
| Social following      | X / LinkedIn / YouTube | each surface                  |

## Positioning

- Value prop (one sentence) — source
- Target audience / ICP — source
- Positioning angle (how they frame the category) — source

## Message map

| Theme | What they claim | How often / where | Proof they show | Market echo? |
| ----- | --------------- | ----------------- | --------------- | ------------ |

(Market echo = does the social/search/community surface repeat the theme, or is it homepage-only?)

## Product & pricing

- Core capabilities + stated differentiators; product-direction signals from hiring/recent posts.
- Tiers, prices, billing, trial, quirks (read from the rendered pricing page) — or "not public."

## Search & content footprint

| Metric               | Value | Source                               |
| -------------------- | ----- | ------------------------------------ |
| Est. organic traffic |       | seo/competitors/domain-rank-overview |
| Top ranked keywords  |       | seo/competitors/ranked-keywords      |
| Top pages (strategy) |       | seo/competitors/relevant-pages       |
| Organic competitors  |       | seo/competitors/domain               |

## Backlinks & authority

| Metric            | Value | Source                            |
| ----------------- | ----- | --------------------------------- |
| Domain rank       |       | seo/backlinks/summary             |
| Referring domains |       | seo/backlinks/referring-domains   |
| Link-gap vs you   |       | seo/backlinks/domain-intersection |

## Customers & sentiment

- Named logos / industries (sourced) + community sentiment (praise/complaint themes, linked quotes).

## Strengths & weaknesses

|     | Evidence source |
| --- | --------------- |

## Implications for your product

Where they beat you, where you beat them, openings, threats.

## Sources & record cost

Every URL + date pulled; UnifAPI billing metadata or estimate.
```

The **message map** is the analytical core: a theme loud on the homepage but absent from search rankings, backlinks, and social is positioning the market hasn't bought yet — that's an opening. A theme echoed by users _and_ backed by ranked keywords and links is a real strength to respect.

## Depth modes

- **Quick scan** — `browser/markdown` (homepage + pricing), `seo/backlinks/summary` + `seo/competitors/domain-rank-overview` (authority/traffic headline), `x/users/by/username/{username}`, `linkedin/companies/{slug}`. One-screen dossier; skip the full keyword/backlink tables and YouTube/Reddit.
- **Deep profile** — all sections above: full `seo/competitors/*` and `seo/backlinks/*` tables, the rendered key pages, the complete social footprint, and the cross-competitor summary.

## Guardrails

- Public data only — rendered public pages, public social posts, company pages, videos, jobs, threads, and public SEO/backlink records. No private, internal, leaked, or paywalled data; exclude anything that looks like a leak as unverified.
- Read-only: it researches and reports. It never contacts the competitor, posts, or touches any account — the operator's own assistant acts on the dossier.
- Confirmed vs inferred: a claim read off a rendered page is confirmed; team size from a headcount band, "where the product is headed" from hiring, sentiment from a few threads, and SEO traffic estimates are inferences — label them. Be honest: don't inflate weaknesses or downplay strengths.
- Dated snapshots: runs on-demand and returns a re-runnable source list — re-pull the same URLs/handles/domains to refresh and diff what changed. Social/community signals and traffic estimates skew and vary; weight by overlap across sources, not one thread.
- Preserve the adaptation credit to Corey Haines when presenting this as an extension of the original framework.

## Related Skills

- **competitor-launch-monitor** (Competitive Intelligence Agent): when a profiled competitor ships something, track that launch and its public reception.
- **unifapi**: the shared data skill — connect MCP and discover the SEO/backlinks/browser/X/LinkedIn/YouTube/Reddit/News operations above.
