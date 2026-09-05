---
name: ai-answer-gap
description: When the user wants to find the prompts where their brand should be cited in AI answers but isn't — and who owns the answer instead — prioritized by AI search volume so content can attack the biggest gaps first. Also use on "AI answer gap," "AI content gap," "where am I missing from AI answers," "what prompts am I losing in AI," "GEO content gaps," "prompts I should own but don't," or "find my AI visibility gaps." For the full diagnostic audit, see ai-visibility-audit. For ongoing tracking, see llm-mention-tracking.
license: MIT
metadata:
  author: UnifAPI
  version: "1.1.0"
---

# AI Answer Gap

Turn observed AI-answer gaps into a prioritized research and content backlog. Use an existing `ai-visibility-audit` or collect a dated panel first. Read available product context so proposed topics match what the product can credibly help with.

## Use UnifAPI for live evidence

Connect with the `unifapi` skill to discover current schemas, prices and authentication before collecting data.

## Workflow

1. **Select relevant prompts.** Group them by use case and search intent. `/geo/keywords/search-volume` supplies optional demand estimates; an absent estimate is unknown, not evidence that a useful niche prompt has no value.
2. **Check current answers.** Use `/geo/answers` for ChatGPT/Gemini, `/geo/serp` for Google AI Mode, and `/seo/serp` with `include_ai_overview` for Google Search AI Overviews. Keep engines, markets and natural/forced-search settings separate. Preserve exact answers and cited source URLs.
3. **Describe the observed gap.** Distinguish no answer, unsuccessful collection, brand absent from this answer, name-only mention, and cited brand. A sample is not proof of universal absence. Inspect references; top-level `is_target` and unused search results do not by themselves establish a citation.
4. **Research sources.** Open the actual cited pages. `/geo/mentions/top-pages`, `/top-domains`, and `/search` add separate indexed-corpus context. They do not supply the winning URL for a particular live prompt. `/cross-aggregated-metrics` gives group counts, not ownership of your prompt-panel gaps.
5. **Propose a response.** Identify the missing information, evidence or third-party representation. Choose an existing-page update, a new useful page, or an external research lead. Each proposed change needs a concrete source and a plausible benefit to readers. Name-only mentions and existing organic rankings are clues, not proof that formatting is the cause.
6. **Prioritize.** Consider product relevance, evidence of demand, gap quality, available expertise, and effort. Show the inputs and uncertainty. Optional scoring is a planning aid, not a predicted citation lift.
7. **Validate later.** Use the same panel and multiple dated runs after changes. Compare paired successful samples, show completion/answer rates, and avoid attributing every change to the edit.

## Output

For each priority, give the exact prompt, engine/configuration, observed brand status, cited competitors or sources, suggested page/action, evidence, effort estimate and a validation plan. Preserve request ids and billed credits. An API failure should appear as missing evidence and never as a content gap.

See [the audit methodology](../ai-visibility-audit/references/geo-methodology.md) for coverage/share definitions, citation counting and evidence boundaries. Use `llm-mention-tracking` for budgeted snapshots and changes over time. This skill researches and drafts; it does not publish content or send outreach without authorization.
