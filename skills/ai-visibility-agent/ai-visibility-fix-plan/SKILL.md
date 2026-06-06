---
name: ai-visibility-fix-plan
description: When the user has AI visibility, GEO, AI answer gap, or AI citation evidence and wants a prioritized plan to improve where the brand is cited or mentioned in AI answers. Also use on "AI visibility fixes," "AI visibility fix plan," "generative engine optimization fixes," "AI citation fixes," "answer engine optimization fixes," "fix AI answer gaps," or "how do we get cited in ChatGPT/AI Overviews." For finding gaps from scratch, run ai-visibility-audit or ai-answer-gap first.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# AI Visibility Fix Plan

Turn AI visibility evidence into an execution-ready fix plan for generative engine optimization. The plan should say which prompt gaps to attack, why the current cited source wins, and whether the fix is **Structure**, **Authority**, or **Presence**.

This is an **enhanced** skill: it reads live public data through UnifAPI when needed, but it remains **eyes, not hands**. It does not edit pages, post on third-party sites, buy reviews, or manipulate mentions.

## Use UnifAPI for live evidence

Start from `ai-visibility-audit` or `ai-answer-gap` output. Re-pull only what is stale or missing:

- **Per-prompt answer and citations** - `geo/serp` with `target` set to the brand domain. Confirm whether the brand is cited, merely named, or absent.
- **Demand weighting** - `geo/keywords/search-volume` so the fix plan attacks prompts people actually ask.
- **Answer owners** - `geo/mentions/top-domains`, `geo/mentions/top-pages`, and `geo/mentions/cross-aggregated-metrics` to identify the source or competitor winning the answer.
- **Organic cross-read** - `seo/serp` to identify quick wins where the brand ranks organically but is not cited in the AI answer.
- **Page structure read** - `browser/markdown` on the brand page and winning source to compare extractability: definition blocks, comparison tables, FAQ sections, cited stats, and clear headings.

Keep the run date, platform, market, prompt set, and billing metadata in the output.

## Workflow

1. **Load the gap set.** Prefer an existing audit or answer-gap table. If absent, run a small prompt set first; do not create a fix plan from vibes.
2. **Group misses by root cause.**
   - **Structure** - the brand has the answer, but it is not extractable.
   - **Authority** - the winning source has stronger stats, quotes, citations, freshness, or topical depth.
   - **Presence** - the answer is owned by third-party surfaces where the brand is missing: directories, review sites, listicles, Wikipedia-style pages, communities, or partner pages.
3. **Choose the build path.**
   - **Update existing page** when the brand ranks organically, is name-dropped, or has a near-equivalent page.
   - **Create net-new page** when no credible page exists for a high-demand prompt.
   - **Earn third-party presence** when the cited source is a list, review surface, community thread, or external authority page.
4. **Score the fix.** Use AI search volume as the spine, then adjust for winnability, right-to-win, effort, and risk.
5. **Write acceptance checks.** Each fix must say how to verify it after shipping: re-run `geo/serp`, read the page with `browser/markdown`, validate schema, or check the third-party listing.
6. **Separate content from distribution.** On-site structure fixes, authority edits, and third-party presence work should not be lumped into one content task.

## Fix patterns

Use these as the default remediation menu:

| Cause               | Fix pattern                                                                                                    | Acceptance check                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Structure           | Add concise definition, comparison table, FAQ, summary bullets, internal anchors, and clean headings.          | `browser/markdown` shows extractable answer blocks.                                       |
| Authority           | Add original stats, dated claims, expert/customer quotes, primary-source citations, and author/review signals. | Page visibly cites sources and contains current, attributable evidence.                   |
| Presence            | Get listed or genuinely mentioned on the surface AI already cites.                                             | The third-party surface contains the brand with accurate positioning.                     |
| Organic-but-uncited | Reformat the ranking page instead of creating a new one.                                                       | `seo/serp` still ranks; `geo/serp` re-check shows citation movement or better source fit. |

## Output

Return a prioritized plan:

```markdown
# AI Visibility Fix Plan - {brand/domain} ({YYYY-MM-DD})

## Summary

- Highest-value prompt gap: ...
- Fastest win: ...
- Dominant miss cause: Structure | Authority | Presence

## Fix Plan

| Priority | Prompt                       | AI vol | Current owner | Cause    | Build path  | Action                                                   | Acceptance check                       |
| -------- | ---------------------------- | ------ | ------------- | -------- | ----------- | -------------------------------------------------------- | -------------------------------------- |
| Now      | best {category} for startups | 1.9k   | g2.com        | Presence | Third-party | Earn accurate listing/reviews on the cited category page | Re-check top-pages and listing content |

## Page-Level Tasks

- Existing page updates: ...
- Net-new pages: ...
- Third-party presence targets: ...

## Re-check Plan

- Re-run the same prompt set and market after shipping.
- Compare cited-source slots, name-drops, and absences separately.
- Record UnifAPI cost from billing metadata.
```

## Guardrails

- Do not equate name-drops with citations. A name-drop is a quick-win signal, not a solved gap.
- Do not recommend fake reviews, spammy listicles, astroturfed communities, or manipulative third-party mentions.
- Do not create "AI-only" doorway pages. Fix the human page so it is clear, cited, and extractable.
- Do not overfit to one stochastic answer. Treat each result as a dated snapshot and re-check before large work.

## Related Skills

- **ai-visibility-audit**: diagnose citation coverage and classify misses.
- **ai-answer-gap**: find and rank the prompt gaps this skill turns into fixes.
- **llm-mention-tracking**: monitor whether shipped fixes improve AI share of voice over time.
- **seo-audit**: cross-check organic ranking and page quality when a GEO miss is also an SEO issue.
- **unifapi**: the shared data skill (connect MCP, discover the GEO, SEO, and browser operations this skill reads).
