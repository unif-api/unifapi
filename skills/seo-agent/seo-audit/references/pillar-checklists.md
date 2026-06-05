# SEO Audit — Per-Pillar Checklists

The full checklist behind each of the 5 pillars in `SKILL.md`, in the same fixed priority order. Each item names the **live operation** that confirms it (or the external tool, where UnifAPI has no equivalent — vitals come from PageSpeed/Search Console). Render pages with `browser/markdown` / `browser/html` before judging anything on-page; a static `web_fetch`/`curl` cannot see JS-injected content, including JSON-LD.

> **Schema detection caveat:** Many CMS plugins (AIOSEO, Yoast, RankMath) inject JSON-LD via client-side JavaScript. It will not appear in static HTML or `web_fetch` output (which strips `<script>` tags). To check for schema, read the rendered page with `browser/html`/`browser/markdown`, or use Google's Rich Results Test (https://search.google.com/test/rich-results), or a Screaming Frog export. Reporting "no schema found" from static HTML is a false finding.

---

## Pillar 1 — Crawlability & Indexation

_Can Google find and index it?_ This pillar is first because nothing below it matters if the page can't be indexed.

### Crawlability

- **robots.txt** — no unintentional blocks; important pages allowed; sitemap referenced. Read it directly; confirm referenced URLs render with `browser/html`.
- **XML sitemap** — exists, accessible, only canonical/indexable URLs, updated, well-formed.
- **Site architecture** — important pages within ~3 clicks of the homepage; logical hierarchy; no orphan pages. Evidence: `browser/links` (internal-link graph → depth + orphans).
- **Crawl budget (large sites)** — parameterized URLs controlled; faceted nav handled; infinite scroll has a paginated fallback; no session IDs in URLs.

### Indexation

- **Index status** — `site:domain.com` reality (run as a `seo/serp` query) vs expected page count; Search Console coverage.
- **Indexation blockers** — noindex on important pages; canonicals pointing the wrong way; redirect chains/loops; soft 404s; duplicate content without canonicals. Confirm canonical/robots meta _as rendered_ with `browser/html`.

### Canonicalization

- Every page has a canonical tag; self-referencing on unique pages; HTTP→HTTPS; www vs non-www consistency; trailing-slash consistency. Consistency is the single biggest technical-SEO factor — pick one format everywhere.

---

## Pillar 2 — Technical Foundations

_Is the site fast and functional?_

### Core Web Vitals (from PageSpeed Insights / Search Console — UnifAPI has no vitals op)

- **LCP** (Largest Contentful Paint): < 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1
- Speed factors: TTFB, image optimization, JS execution, CSS delivery, caching headers, CDN, font loading.
- Tools: PageSpeed Insights, WebPageTest, Chrome DevTools, Search Console CWV report.

### Mobile-Friendliness

- Responsive (not a separate `m.` site); adequate tap targets; viewport configured; no horizontal scroll; same content as desktop; mobile-first-indexing ready. Render mobile-width with `browser/markdown` to confirm content parity.

### Security & HTTPS

- HTTPS site-wide; valid SSL; no mixed content; HTTP→HTTPS redirects; HSTS (bonus).

### URL Structure

- Readable/descriptive; natural keywords where they fit; consistent structure; no needless parameters; lowercase + hyphen-separated.

---

## Pillar 3 — On-Page Optimization

_Is the content targeted correctly?_ Read the rendered page with `browser/html`/`browser/markdown`; confirm the target query is real with `seo/keywords/overview` + `seo/keywords/intent`; confirm visibility with `seo/serp`.

### Title Tags

- Unique per page; primary keyword near the front; ~50–60 chars (visible in SERP); compelling; brand usually at the end.
- Common issues: duplicate, truncated, too short, keyword-stuffed, missing.

### Meta Descriptions

- Unique per page; ~150–160 chars; primary keyword; clear value prop; CTA.
- Common issues: duplicate, auto-generated, wrong length, no reason to click.

### Heading Structure

- One H1 per page; H1 contains the primary keyword; logical H1→H2→H3 hierarchy; headings describe content, not used purely for styling.
- Common issues: multiple H1s, skipped levels, no H1.

### Keyword Targeting & Cannibalization

- Each page has a clear primary target; title/H1/URL aligned; content satisfies intent (`seo/keywords/intent`).
- **Cannibalization:** run `seo/serp` for the query — if two of the site's own URLs flip in/out of the same slot, they compete. Consolidate or differentiate.
- Site-wide: a keyword-map exists; no major coverage gaps (hand expansion to `keyword-research`); logical topical clusters.

### Image Optimization

- Descriptive file names; alt text on all images that describes the image; compressed; modern formats (WebP); lazy loading; responsive images.

### Internal Linking

- Important pages well-linked; descriptive anchor text; logical relationships; no broken internal links; reasonable link count per page. Evidence: `browser/links`.
- Common issues: orphan pages (no inbound internal links), over-optimized anchors, important pages buried, excessive footer/sidebar link bloat.

---

## Pillar 4 — Content Quality

_Does it deserve to rank?_ Compare the target page against the page-1 set that actually wins (`seo/serp` + `seo/competitors/relevant-pages`), not against an abstract ideal.

### E-E-A-T Signals

- **Experience** — first-hand experience, original insights/data, real examples/case studies.
- **Expertise** — visible author credentials, accurate/detailed info, sourced claims.
- **Authoritativeness** — recognized in the space, cited by others (cross-check with `seo/backlinks/referring-domains`), industry credentials.
- **Trustworthiness** — accurate info, transparent business identity, contact info, privacy/terms, HTTPS.

### Content Depth & Freshness

- Comprehensive coverage; answers follow-up questions; demonstrably better than the top-ranking competitors for the query; updated/current.
- Flag low-effort AI copy that erodes quality signals using [ai-writing-detection.md](ai-writing-detection.md) (em-dash overuse, filler phrases, formulaic openings).

### Engagement Signals (contextual, not directly readable)

- Time on page, bounce in context, pages/session, return visits — interpret from the operator's analytics; do not assert these from public data.

---

## Pillar 5 — Authority & Links

_Does it have credibility?_ This was the manual pillar in the original framework; here it is fully live. Pull `seo/backlinks/summary` first for the headline, then drill in.

- **Profile summary** — domain rank, referring-domain count, total backlinks: `seo/backlinks/summary`.
- **Referring domains** — quality and topical relevance of who links: `seo/backlinks/referring-domains`.
- **Toxic links** — flag spammy/low-quality referrers for a disavow review: `seo/backlinks/bulk-spam-score`.
- **Anchor distribution** — over-optimized exact-match or unnatural anchor mix (a penalty risk): `seo/backlinks/anchors`.
- **Link gap / outreach** — domains linking to competitors but not the target: `seo/backlinks/competitors` (competitors by shared referrers) + `seo/backlinks/domain-intersection` (the concrete outreach list).
- **Link velocity / trend** — sudden gains or losses, especially after a traffic drop: `seo/backlinks/history` (pair with `seo/competitors/historical-rank-overview`).

---

## Traffic-Drop Playbook (when the trigger is a decline, not a fresh audit)

1. Set the before/after window.
2. `seo/competitors/historical-rank-overview` + `seo/competitors/ranked-keywords` — did the site lose specific queries, or fall broadly?
3. `seo/serp` on the lost queries — who replaced the page, and did a SERP feature (AI Overview, PAA, video) absorb the click?
4. `seo/backlinks/history` — did referring domains drop or a toxic spike land near the drop date?
5. Map the loss to a pillar (algorithm/content → Pillar 4; lost links → Pillar 5; indexation regression after a migration → Pillar 1) and write it up in the Finding Schema.
