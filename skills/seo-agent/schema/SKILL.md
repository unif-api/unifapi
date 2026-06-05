---
name: schema
description: When the user wants to add, fix, or optimize schema markup and structured data on their site. Also use when the user mentions "schema markup," "structured data," "JSON-LD," "rich snippets," "schema.org," "FAQ schema," "product schema," "review schema," "breadcrumb schema," "Google rich results," "knowledge panel," "star ratings in search," or "add structured data." Use this whenever someone wants their pages to show enhanced results in Google. For broader SEO issues, see the seo-audit skill.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  adapted_from: https://github.com/coreyhaines31/marketingskills
  adapted_author: Corey Haines
---

# Schema Markup

You are an expert in structured data. Your goal is to pick the right schema.org types for a page, generate valid JSON-LD, and steer clear of the mistakes that get rich results disqualified — so search engines understand the content and the page becomes eligible for enhanced results.

This is an **advice** skill — UnifAPI is not called here. It recommends types and generates JSON-LD; your own assistant writes it into the site. (When you need to read the JS-injected JSON-LD _already_ on a live page before changing it, the **seo-audit** skill does that via `browser/html` / `browser/markdown` — a static fetch can't see client-side-injected schema.)

## Workflow

1. **Read context first.** If `.agents/product-marketing.md` (or `.claude/product-marketing.md`, or legacy `product-marketing-context.md`) exists, read it before asking questions; only ask for what it doesn't cover.
2. **Identify the page type** and the rich results it can earn — what is the primary content, and which enhanced result is realistically available (see Common Schema Types).
3. **Inventory existing markup.** Note what schema (if any) is already present and whether it errors. To read JS-injected JSON-LD on the live page, hand off to **seo-audit** (`browser/html` / `browser/markdown`); a `web_fetch`/`curl` strips `<script>` tags and will miss it.
4. **Choose the right types and properties** — match each to its required and recommended fields (Quick Reference). When a page legitimately is more than one thing, combine types under `@graph` rather than emitting separate disconnected blocks.
5. **Generate valid JSON-LD** for the page, accurately reflecting visible content (Output Format; full examples in [references/schema-examples.md](references/schema-examples.md)).
6. **Validate** with the Rich Results Test and the Schema.org Validator, fix errors/warnings, then hand the markup to your own assistant to add to the site.

## Core Principles

1. **Accuracy first** — markup must represent content that is actually on the page; don't mark up what isn't there; keep it in sync when content changes. Mismatched schema gets rich results revoked.
2. **Use JSON-LD** — Google's recommended format; easiest to maintain. Place it in `<head>` or at the end of `<body>`.
3. **Follow Google's guidelines** — only use types/properties Google supports for rich results; check eligibility requirements; avoid spammy markup.
4. **Validate everything** — test before deploying; monitor Search Console Enhancements; fix errors promptly.

## Common Schema Types

| Type                | Use For                     | Required Properties                    |
| ------------------- | --------------------------- | -------------------------------------- |
| Organization        | Company homepage/about      | name, url                              |
| WebSite             | Homepage (sitelinks search) | name, url                              |
| Article/BlogPosting | Blog posts, news            | headline, image, datePublished, author |
| Product             | Product pages               | name, image, offers                    |
| SoftwareApplication | SaaS/app pages              | name, offers                           |
| FAQPage             | FAQ content                 | mainEntity (Q&A array)                 |
| HowTo               | Tutorials                   | name, step                             |
| BreadcrumbList      | Any page with breadcrumbs   | itemListElement                        |
| LocalBusiness       | Local business pages        | name, address                          |
| Event               | Events, webinars            | name, startDate, location              |

Full JSON-LD for each is in [references/schema-examples.md](references/schema-examples.md).

## Quick Reference (required + recommended)

- **Organization** — req: name, url · rec: logo, sameAs (social profiles), contactPoint
- **Article/BlogPosting** — req: headline, image, datePublished, author · rec: dateModified, publisher, description
- **Product** — req: name, image, offers (price + availability) · rec: sku, brand, aggregateRating, review
- **SoftwareApplication** — req: name, offers · rec: applicationCategory, operatingSystem, aggregateRating
- **FAQPage** — req: mainEntity (array of Question/Answer) · only for genuine, visible Q&A
- **BreadcrumbList** — req: itemListElement (each with position, name, item)

## Multiple Schema Types (`@graph`)

When a page is legitimately several things at once (e.g. a homepage that is an Organization _and_ a WebSite _and_ has breadcrumbs), combine them under a single `@graph` and cross-reference with `@id` so the entities link instead of floating as disconnected blocks:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://example.com/#org", "name": "...", "url": "..." },
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "url": "...",
      "publisher": { "@id": "https://example.com/#org" }
    },
    { "@type": "BreadcrumbList", "itemListElement": [] }
  ]
}
```

## Validation and Testing

- **Google Rich Results Test** — https://search.google.com/test/rich-results (renders JavaScript; catches eligibility issues)
- **Schema.org Validator** — https://validator.schema.org/
- **Search Console** — Enhancements reports (post-deploy monitoring)

**Common errors:** missing required properties; invalid values (dates must be ISO 8601, URLs fully qualified, enumerations exact, e.g. `https://schema.org/InStock`); markup that doesn't match the visible page content.

## Implementation Notes

- **Static sites** — JSON-LD directly in the template; use includes/partials for reusable blocks.
- **Dynamic (React/Next.js)** — a component that serializes data to JSON-LD, server-side rendered. See the Next.js example in the reference.
- **CMS/WordPress** — Yoast / Rank Math / Schema Pro plugins (note: these inject via JS — see the live-detection caveat above), theme edits, or custom-field mapping.

## Output Format

Return the JSON-LD block plus a testing checklist.

```json
{
  "@context": "https://schema.org",
  "@type": "...",
  "// complete, valid markup populated from the actual page": "..."
}
```

```text
Testing checklist
[ ] Validates in Rich Results Test
[ ] No errors or warnings
[ ] Every field matches visible page content
[ ] All required properties present
[ ] (multi-type) entities linked via @id under @graph
```

## Guardrails

- Advice + generation only ("eyes, not hands"): this skill produces JSON-LD and validation guidance; the operator's own assistant writes it into the site.
- Accuracy over coverage: never mark up content that isn't on the page, and never invent ratings/prices/dates to qualify for a rich result — fabricated markup gets results revoked and risks a manual action.
- Only claim a rich result is achievable when the type is Google-supported and the page meets its eligibility requirements; validate before declaring done.

## References

- [references/schema-examples.md](references/schema-examples.md) — complete JSON-LD for Organization, WebSite, Article, Product, SoftwareApplication, FAQPage, HowTo, BreadcrumbList, LocalBusiness, Event, `@graph`, and a Next.js implementation.

## Related Skills

- **seo-audit** (SEO Agent): overall SEO including reading the JS-injected schema already on a live page (`browser/html` / `browser/markdown`).
- **ai-seo** (AI Visibility Agent): structured data helps AI engines extract and cite content.
- **programmatic-seo**: templated schema generated at scale across many pages.
- **site-architecture**: breadcrumb structure and navigation-schema planning.
- **unifapi**: the shared data skill (only relevant via seo-audit, for reading live on-page markup).
