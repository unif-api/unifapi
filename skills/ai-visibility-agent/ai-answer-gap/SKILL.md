---
name: ai-answer-gap
description: When the user wants to find the prompts where their brand should be cited in AI answers but isn't — and who owns the answer instead — prioritized by AI search volume so content can attack the biggest gaps first. Also use on "AI answer gap," "AI content gap," "where am I missing from AI answers," "what prompts am I losing in AI," "GEO content gaps," "prompts I should own but don't," or "find my AI visibility gaps." For the full diagnostic audit, see ai-visibility-audit. For ongoing tracking, see llm-mention-tracking.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# AI Answer Gap

Find the prompts where the brand _should_ be cited in AI answers but isn't, name who owns each answer instead, and rank the gaps by AI search volume — so the content team attacks the biggest, most winnable misses first. This is the bridge from "we're not visible in AI" to a concrete, sequenced content backlog.

This is an **enhanced** skill: it reads live public data through UnifAPI. A "gap" is never a hunch — it is a real uncited AI answer with a named owner, weighted by real AI-search demand.

## Use UnifAPI for live evidence

This is an **enhanced** skill: it reads live public data through UnifAPI — a "gap" is never a hunch but a real uncited AI answer with a named owner, weighted by real AI-search demand. Use the `unifapi` skill to connect (OAuth MCP), then discover these GEO operations. All are `POST`; hold `engine` (`google` / `chatgpt`), `location`, and `language` constant across the run.

- **Find the gap** — `geo/serp` (`query` = candidate prompt, `target` = brand domain, `view: "full"`). A gap exists only when an answer renders, the brand is **not** a cited reference (`is_target` false), and the answer cites someone else. Capture the cited domains as the owner.
- **Confirm absence at scale** — `geo/mentions/search` (`target` = brand + competitors array) confirms the brand is genuinely absent across the LLM-mentions index, not just uncited on one pull.
- **Rank gaps by demand — the primary sort key** — `geo/keywords/search-volume` returns generative-AI demand per prompt. This drives the ranking; pull it for the whole candidate set first and drop near-zero prompts before spending on SERP calls.
- **Who owns each answer** — `geo/mentions/top-pages` and `geo/mentions/top-domains` rank the exact pages and domains winning citations for the set, so the backlog says _what content to beat_, not just that a gap exists.
- **Which competitor owns the most** — `geo/mentions/cross-aggregated-metrics` compares share across labeled groups (brand vs each named competitor), so you know whether one rival dominates the gaps (attack it directly) or they're spread across many third parties (a presence problem).
- **Quick-win cross-read** — `seo/serp` (`target` = brand). Where the brand already ranks organically but isn't cited, the fix is extractability, not new content — tag these `quick`.

UnifAPI reads public data only. Keep each `billing` block for the cost line.

## Workflow

(Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists — it carries the category, use cases, and competitor set the candidate prompts come from.)

1. **Build the candidate set.** Start from the brand's category, use cases, and competitor names; generate prompts the brand has a legitimate right to be cited for. Reuse the prompt set and diagnosed misses from an `ai-visibility-audit` run when one exists rather than regenerating.
2. **Price demand first.** Run `geo/keywords/search-volume` across all candidates and drop near-zero-demand prompts before spending on per-prompt SERP calls.
3. **Confirm each gap.** For each surviving candidate, `geo/serp` (target = brand) + `geo/mentions/search`. Keep only prompts where an answer exists, the brand is absent, and the brand could _credibly_ answer it (don't backlog gaps the product has no right to own).
4. **Identify owner and angle.** Record the cited domain (`geo/mentions/top-pages` / `geo/mentions/top-domains`) and run `geo/mentions/cross-aggregated-metrics` to see which competitor owns the most gaps. Classify what makes each source win against the three pillars — **Structure** (extractability), **Authority** (presence signals), or **Third-party presence**. The full decision tree and the Princeton-measured authority levers live in [`ai-visibility-audit/references/geo-methodology.md`](../ai-visibility-audit/references/geo-methodology.md) (in the sibling audit folder).
5. **Score and sequence.** Apply the gap-priority rubric below: AI search volume is the spine, winnability adjusts it, and a quick/net-new tag sets the build path. Output the ranked backlog.

## Gap-priority scoring

Each confirmed gap gets a **Gap Priority Score**. AI search volume is the dominant factor; winnability and effort modulate it.

| Factor                 | Weight | How to read it                                                                                                                                                                                           |
| ---------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI search volume**   | 0.55   | Log-banded `geo/keywords/search-volume`: ≤50 → 1; 51–200 → 3; 201–1k → 5; 1k–5k → 7; 5k–20k → 9; >20k → 10.                                                                                              |
| **Winnability**        | 0.30   | How beatable the current owner is. Owner is a thin/forum/outdated page or the brand already ranks organically → 8–10; mid-authority owner → 4–7; locked by Wikipedia/official docs/dominant brand → 1–3. |
| **Brand right-to-win** | 0.15   | How credibly the product answers this prompt. Core use case → 9–10; adjacent → 5–7; tangential → 1–3 (consider dropping).                                                                                |

```text
GapPriority = (Volume×0.55 + Winnability×0.30 + RightToWin×0.15) × 10   (0–100)
```

Then tag the **build path**:

- **`quick`** — brand already ranks organically (`seo/serp`) or is name-dropped but uncited: fix structure/extractability, no net-new page. These jump the queue regardless of score because effort is low.
- **`net-new`** — no page or no organic presence: full content build.
- **`third-party`** — owner is a listicle/review/Reddit surface the brand isn't on: outreach/placement, not on-site content.

## Output

Lead with the quick wins (cheap), then the volume-ranked net-new backlog.

| #   | Prompt                       | AI vol | Owns the answer  | Cited source URL       | Pillar    | Winnability | Right-to-win | Priority | Build path  |
| --- | ---------------------------- | ------ | ---------------- | ---------------------- | --------- | ----------- | ------------ | -------- | ----------- |
| 1   | how to [problem]             | 2.7k   | competitorB docs | competitorb.com/docs/x | Structure | 9           | 10           | 88       | quick       |
| 2   | best [category] for startups | 1.9k   | g2.com listicle  | g2.com/categories/y    | Presence  | 4           | 9            | 71       | third-party |
| 3   | [category] pricing guide     | 1.2k   | rivalapp blog    | rivalapp.com/pricing   | Authority | 6           | 8            | 68       | net-new     |

Follow the table with:

- **Quick-wins block** — the `quick` rows pulled to the top with the one structural fix each needs (add an FAQ block, a comparison table, a definition header).
- **Per gap:** the winning angle to beat (Structure / Authority / Presence) restated as an action — for Authority, name the specific lever (add stats, quotes, or citations).
- **Evidence:** each gap cited to the `geo/serp` answer that shows it, with the run date.
- **Cost:** UnifAPI records consumed, or best estimate.

### Worked example

Brand `acme.dev`, US/English, 18 candidate prompts from a prior audit. `geo/keywords/search-volume` drops 4 near-zero prompts. `geo/serp` confirms 11 real gaps; `geo/mentions/cross-aggregated-metrics` shows competitorB owns 6 of them (a single beatable rival, not scattered third parties). "how to [problem]" (2.7k AI vol) is owned by competitorB's docs, but `seo/serp` shows Acme ranks #6 organically and is merely uncited → pillar Structure, tagged `quick`, Priority (9×0.55 + 9×0.30 + 10×0.15) × 10 = 88 → #1. "best [category] for startups" (1.9k) is a g2 listicle Acme isn't on → `third-party`, lower winnability, Priority 71.

## Guardrails

- Read-only: it identifies and prioritizes gaps. It does not write content, edit the site, or post anywhere — it hands the ranked backlog to the operator's own assistant and content team.
- AI answers are non-deterministic and vary by session and time. A confirmed gap is a **dated snapshot**; re-check before committing a large content build.
- Only backlog gaps the brand has a credible right to win (the right-to-win factor exists to filter these out) — don't pad the list with prompts the product can't honestly answer.
- AI search volume is a public-data estimate — present ranges and never promise that filling a gap guarantees a citation.
- Keep the cited-vs-name-drop distinction: a name-drop is a `quick` extractability win, not a closed gap.

## Related Skills

- **ai-visibility-audit**: the upstream diagnostic that surfaces and explains the misses this skill prioritizes. Its [references/geo-methodology.md](../ai-visibility-audit/references/geo-methodology.md) supplies the three-pillar miss-cause decision tree and the Princeton authority levers used in step 4.
- **llm-mention-tracking**: re-run after content ships to confirm gaps are closing over time
- **unifapi**: the shared data skill (connect MCP, discover the GEO/SEO operations this skill reads)
