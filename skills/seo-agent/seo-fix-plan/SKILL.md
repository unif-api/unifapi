---
name: seo-fix-plan
description: When the user has SEO audit evidence and wants a concrete, prioritized plan for what to fix next. Also use on "SEO fixes," "SEO fix plan," "technical SEO fixes," "on-page fix list," "prioritize SEO issues," "turn this SEO audit into tasks," "SEO remediation plan," or "what should I fix first for SEO." For diagnosing issues from scratch, run seo-audit first; for schema implementation details, see schema.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# SEO Fix Plan

Turn SEO findings into an execution-ready fix plan. The job is not to run another generic audit; it is to take live SERP, rendered-page, backlink, and keyword evidence and sequence the smallest set of fixes most likely to improve crawlability, rankings, and click-through.

This is an **enhanced** skill: it reads live public data through UnifAPI when evidence is missing or stale, but it remains **eyes, not hands**. It does not edit the site, submit to Search Console, disavow links, or open PRs. It returns a plan the operator's own assistant or team can execute.

## Use UnifAPI for live evidence

Start from an existing `seo-audit` report whenever possible. Re-pull only the evidence needed to confirm priority or fill a gap:

- **Rendered page reality** - `browser/markdown`, `browser/html`, and `browser/links` for titles, meta, headings, JSON-LD, internal links, canonicals, robots directives, and orphan/depth signals.
- **Rank and competitor reality** - `seo/serp`, `seo/competitors/domain`, `seo/competitors/relevant-pages`, and `seo/competitors/ranked-keywords` to see whether a fix targets a real ranking gap.
- **Keyword and intent fit** - `seo/keywords/overview` and `seo/keywords/intent` to avoid optimizing a page for a query with weak demand or mismatched intent.
- **Authority and links** - `seo/backlinks/summary`, `seo/backlinks/referring-domains`, `seo/backlinks/anchors`, `seo/backlinks/bulk-spam-score`, and `seo/backlinks/domain-intersection` when link risk or link gap changes priority.

Keep run dates and `billing` metadata in the output.

## Workflow

1. **Load the diagnosis.** Use the latest `seo-audit` output if present. If the user only provides a domain and asks for fixes, run the minimum live reads needed to identify the current blockers.
2. **Deduplicate issues into fix units.** Merge repeated symptoms into one action when they share the same root cause, template, or component. A title-tag problem across 40 pages is one template fix, not 40 tasks.
3. **Classify every fix by type.** Use: Crawl/indexation, Technical, On-page, Content quality, Internal links, Schema, Authority/links.
4. **Score priority.** Rank by impact, confidence, effort, and dependency:
   - Impact: blocked indexation or high-volume ranking gap beats cosmetic polish.
   - Confidence: live evidence and competitor contrast beat best-practice hunches.
   - Effort: template/sitewide fixes and striking-distance pages usually move first.
   - Dependency: crawl/indexation fixes come before content and schema polish.
5. **Write exact acceptance checks.** Every task needs a "done when" that can be verified with a live read, validator, or SERP re-check.
6. **Hand off cleanly.** Point implementation details to `schema`, the operator's code assistant, CMS, or site team. Do not pretend this skill made the change.

## Priority rubric

Score each fix from 1-5:

| Factor     | Meaning                                                                               |
| ---------- | ------------------------------------------------------------------------------------- |
| Impact     | Expected upside if fixed: indexation unlock, ranking lift, CTR gain, or reduced risk. |
| Confidence | Strength of evidence: rendered page, live SERP, competitor contrast, backlink data.   |
| Effort     | 5 = easy/template fix, 1 = heavy content or engineering project.                      |
| Dependency | 5 = unblocks other fixes, 1 = can wait.                                               |

```text
FixPriority = Impact * 0.4 + Confidence * 0.25 + Effort * 0.2 + Dependency * 0.15
```

Output tiers:

- **Now** - critical blockers and high-confidence quick wins.
- **Next** - material ranking or CTR fixes after blockers are cleared.
- **Later** - content expansion, authority campaigns, and lower-confidence bets.

## Output

Return a concise execution plan:

```markdown
# SEO Fix Plan - {domain} ({YYYY-MM-DD})

## Summary

- Highest-leverage fix: ...
- Main blocker: ...
- Quick wins: ...
- Evidence refreshed: ...

## Fix Plan

| Priority | Fix                                           | Type             | Evidence                                               | Action               | Acceptance check                                   | Owner     |
| -------- | --------------------------------------------- | ---------------- | ------------------------------------------------------ | -------------------- | -------------------------------------------------- | --------- |
| Now      | Add canonical self-reference on product pages | Crawl/indexation | browser/html 2026-06-05: missing canonical on /pricing | Update page template | browser/html shows canonical; sitemap contains URL | Site/code |

## Implementation Notes

- Schema handoff: ...
- Content handoff: ...
- Link/outreach handoff: ...

## Re-check Plan

- Re-render affected templates after deploy.
- Re-run SERP checks for the target queries after the next crawl window.
- Record UnifAPI cost from billing metadata.
```

## Guardrails

- Do not invent fixes that lack evidence. If evidence is missing, mark the task `needs-read` and name the operation to run.
- Do not promise rankings or timelines. A fix plan is a prioritized bet backed by live evidence.
- Do not mix implementation with diagnosis. This skill can produce exact copy, JSON-LD suggestions, or code-assistant instructions, but the operator's own tools make the change.
- Keep destructive SEO actions gated. Disavow, canonical consolidation, noindex, redirect changes, and URL removals need explicit human review.

## Related Skills

- **seo-audit**: diagnose the site and produce the findings this skill turns into an execution plan.
- **keyword-research**: expand or validate the keyword gaps behind a content or on-page fix.
- **schema**: generate and validate JSON-LD for structured-data fixes.
- **unifapi**: the shared data skill (connect MCP, discover the SEO and browser operations this skill reads).
