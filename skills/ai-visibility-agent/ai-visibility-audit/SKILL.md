---
name: ai-visibility-audit
description: When the user wants to know whether their brand or domain is cited in AI answers — AI Overviews, ChatGPT, or AI search — for the queries that matter, and how they stack up against competitors. Also use on "AI visibility audit," "am I cited in AI answers," "do I show up in ChatGPT," "AI Overviews audit," "GEO audit," "answer engine audit," "AEO audit," "why isn't my brand in AI results," or "who gets cited instead of me." The GEO equivalent of an SEO audit. For ongoing mention tracking, see llm-mention-tracking. For prioritizing the gaps, see ai-answer-gap.
license: MIT
metadata:
  author: UnifAPI
  version: "1.1.0"
  adapted_from: https://github.com/coreyhaines31/marketingskills
  adapted_author: Corey Haines
---

# AI Visibility Audit

Audit how a brand appears in a dated sample of AI answers and identify useful investigations. Connect through the `unifapi` skill. Read the current schema and price for each operation, set a budget, and reuse existing product context.

## Workflow

1. Choose 10–30 prompts covering definitions, comparisons, purchase criteria and concrete use cases. Freeze brands, aliases, citation domains, market and language.
2. Use `POST /geo/answers` for ChatGPT or Gemini. Record engine, surface, exact prompt, search mode, reported model (or null), observation time, answer, sources, brand observations and request id. ChatGPT natural and forced-search samples belong in separate groups.
3. Use `/geo/serp` for Google AI Mode and `/seo/serp` with `include_ai_overview` for Google Search AI Overviews. Inspect answer references; a top-level target match can also refer to another link. A result's rank is not a brand recommendation rank. Do not attribute either Google response to ChatGPT.
4. Keep corpus discovery separate. `/geo/mentions/search`, `/top-domains` and `/top-pages` identify indexed answers and frequently represented sources. They do not confirm the result of a particular live prompt. `/cross-aggregated-metrics` returns group counts with potentially overlapping groups, not a computed citation share.
5. Save raw normalized responses and billing. Use the runner in `llm-mention-tracking/scripts/monitor.mjs` for budgeted ChatGPT/Gemini collection, resumable snapshots and CSV evidence.

## Measure coverage and tracked-brand share

Use the definitions in [references/geo-methodology.md](references/geo-methodology.md). Report completion rate, answer rate, brand mention coverage and citation coverage per engine. Coverage measures presence across successful collections, including valid no-answer results. Share measures a brand's fraction of the summed observations for tracked brands; it does not estimate total market share.

Do not merge citation links with unused search results. Deduplicate a brand within each answer. Missing denominators are N/A. If weighting by estimated AI search volume, show the unweighted result and use a denominator summed across every tracked brand. Never use an “any brand appeared” denominator and label the result share.

## Investigate misses

For prompts where competitors appear and the brand does not, inspect the actual cited pages and the brand's closest relevant page. `/browser/markdown` can help inspect rendered content, while `/seo/serp` provides conventional search context.

Classify evidence as:

- **Content and extractability:** missing direct answers, ambiguous product facts, outdated comparisons, inaccessible text or confusing page structure. Preserve excerpts and URLs that show the difference.
- **Source credibility:** absent evidence, unclear authorship or dates, unsupported claims, or a source that the engine appears to rely on repeatedly. Suggest original data and verifiable sources where relevant.
- **Third-party representation:** a cited review, directory or discussion omits the brand. Propose legitimate participation or corrections where appropriate.

These are hypotheses to test, not proven causes of exclusion. Ranking in organic search does not prove a missing AI citation is a formatting problem. Structured data and llms.txt do not guarantee inclusion. Do not promise a percentage lift from historical GEO studies for this website.

## Output

Deliver a dated table of prompt, engine, status, mention evidence, citation URLs, competitor evidence and request id. Follow it with per-engine metrics, collection limitations, total billed credits and an ordered list of investigations. Each recommendation needs an observed gap, a supporting source and a practical next check.

A name-only mention is a different observation from a citation, not an automatic “quick win”. Do not claim that the brand is absent from an engine merely because it was absent from a small sample or an indexed-corpus query.

Use `llm-mention-tracking` to collect repeatable future samples and `ai-answer-gap` to develop a content backlog. Public-data collection does not authorize publishing or contacting third parties.
