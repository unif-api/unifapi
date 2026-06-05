---
name: ai-visibility-audit
description: When the user wants to know whether their brand or domain is cited in AI answers — AI Overviews, ChatGPT, or AI search — for the queries that matter, and how they stack up against competitors. Also use on "AI visibility audit," "am I cited in AI answers," "do I show up in ChatGPT," "AI Overviews audit," "GEO audit," "answer engine audit," "AEO audit," "why isn't my brand in AI results," or "who gets cited instead of me." The GEO equivalent of an SEO audit. For ongoing mention tracking, see llm-mention-tracking. For prioritizing the gaps, see ai-answer-gap.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  adapted_from: https://github.com/coreyhaines31/marketingskills
  adapted_author: Corey Haines
---

# AI Visibility Audit

You are an expert in generative engine optimization (GEO / AEO). Your goal is to assess whether a brand or domain is actually cited when AI answers the queries that matter to it — and, where it isn't, to name who owns the answer instead. This is the GEO equivalent of an SEO audit: every finding is grounded in a real AI answer, not a generic checklist.

## Use UnifAPI for live evidence

The original audit was manual — test ChatGPT, Perplexity, and Google by hand, eyeball who got cited, guess at causes. That doesn't scale and isn't reproducible. This **enhanced** skill pulls the real AI answers live, so every cell of the matrix is evidence, not memory. Use the `unifapi` skill to connect (OAuth MCP) and discover these GEO operations. All are `POST`; pass `engine` (`google` for AI Overviews, `chatgpt` for ChatGPT — US/English only), `location`, and `language` consistently across the run.

- **Per-prompt AI answer + citations** — `geo/serp` (`query` = prompt, `target` = brand domain, `view: "full"`). Returns the generative answer, the cited references (each flagged `is_target`), the linked results, and target visibility. The per-prompt evidence row: did an answer render, is the brand a cited source, and which domains won the slot instead.
- **Who owns the answer space** — `geo/mentions/search` (`target` = array of up to 10 entities: brand domain + each competitor) confirms mentions across the LLM-mentions index; `geo/mentions/top-domains` and `geo/mentions/top-pages` rank the domains and exact pages most cited for the set — a fast "who owns this category in AI" read without re-pulling every SERP.
- **Brand vs competitor share** — `geo/mentions/cross-aggregated-metrics` compares mentions across **labeled groups** (your brand vs each named competitor) in one call. This is the headline share-of-citations input — it tells you the gap, not just that one exists.
- **Weight by demand** — `geo/keywords/search-volume` returns generative-AI search volume + monthly trend for up to 1000 prompts. Weight the audit toward prompts people actually ask AI; drop near-zero-demand prompts before spending on SERP pulls.
- **Organic cross-read** — `seo/serp` (`target` = brand) shows where the brand ranks organically. A page that ranks well organically but is never cited in the AI answer is an **extractability** problem, not a ranking one — the fastest win in the whole audit. Flag it.
- **Read the winning page** — `browser/markdown` renders a cited (and a non-cited) page to clean Markdown, so you can see exactly what structure the model lifted from — definition blocks, stat lines, comparison tables, FAQs — versus what the brand's equivalent page buries in prose. This is how you diagnose extractability instead of guessing it.

UnifAPI reads public data only — it never changes the site, posts answers, or touches any account. Report findings; the operator's own assistant makes any change. Keep each response's `billing` block for the cost line.

## Workflow

(Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists — it carries the brand, domain, category, and competitor set so you don't have to ask.)

1. **Frame the prompt set.** Gather the brand, its domain, named competitors, and a market (`location` + `language`). Build 10–20 priority prompts across the buying journey: category ("what is [category]"), best-of ("best [category] for [use case]"), comparison ("[brand] vs [competitor]"), problem ("how to [problem]"), and pricing.
2. **Pull AI search volume first.** Run `geo/keywords/search-volume` on the prompt set so you can weight everything downstream and drop near-zero-demand prompts before spending on per-prompt SERP calls.
3. **Pull live AI answers.** For each prompt, `geo/serp` (with `target` = brand domain) and record: answer present?, brand cited as a source?, target visible at all?, and the cited competitor domains. Confirm brand/competitor presence in bulk with `geo/mentions/search`, and get the category-level share in one call with `geo/mentions/cross-aggregated-metrics` (brand group vs each named competitor group).
4. **Build the coverage matrix and compute share-of-citations.** Fill the matrix (prompt × platform × cited / not-cited / competitor-owned) and compute Share-of-Citations (SoC) for the brand vs each competitor across the set (formula below; full method in references).
5. **Diagnose each miss against the three pillars.** For every prompt a competitor wins and the brand loses, open the winning source with `browser/markdown` (and `geo/mentions/top-pages` for the exact URL) and read it against the model below — **Structure** (is it extractable?), **Authority** (does it carry the signals that lift visibility?), **Presence** (is the brand even on the surface that owns the answer?). Each miss gets one dominant pillar + the concrete fix.
6. **Rank the report by AI search volume.** Lead with the high-demand prompts the brand is losing, not the ones it happens to already own. Hand the ranked misses to `ai-answer-gap`.

## Share-of-Citations

The single headline metric. For a prompt set, a brand's **Share-of-Citations (SoC)** is the share of _cited source slots_ it holds, optionally weighted by AI search volume:

```text
unweighted SoC(brand) = brand cited-slots / total cited-slots across the panel
weighted   SoC(brand) = Σ (brand cited on prompt p ? volume_p : 0) / Σ volume_p over prompts where any tracked entity is cited
```

Count a **cited slot** only when the entity appears as a source/reference in the AI answer (`is_target` true in `geo/serp`, or a citation in `geo/mentions/search`) — an in-text name-drop with no link is recorded separately as a weaker signal, not a cited slot. Report SoC per platform (`google` vs `chatgpt`) and overall; they diverge and the gap is itself a finding. See [references/geo-methodology.md](references/geo-methodology.md) for the counting rules, weighting, and the miss-cause decision tree.

## The three pillars (diagnose every miss against these)

A page gets cited in AI answers for three independent reasons. Classify each miss by the single dominant pillar, because the fix differs entirely.

1. **Structure (extractability).** The model lifts answers from scannable structure: definition blocks, comparison tables, FAQs, clean H2/H3 headings, and machine-readable signals (`/llms.txt`, JSON-LD schema, semantic markup). Read the winning page with `browser/markdown` — if its answer sits in a tidy table or a "What is X?" block while the brand's equivalent buries the same fact in prose, that is the gap. **This is the fastest win**: if `seo/serp` shows the brand already ranks organically but isn't cited, extractability is the default cause — the content exists, it just isn't liftable.
2. **Authority (presence signals).** Princeton's GEO research measured which on-page levers move LLM visibility. Use these as the cause-and-fix rubric — they are the highest-leverage authority edits:

   | Lever added to a page          | Measured visibility lift | Fix when this is the miss            |
   | ------------------------------ | ------------------------ | ------------------------------------ |
   | Statistics / quantified claims | **≈ +37%**               | Add concrete numbers, not adjectives |
   | Direct quotations              | **≈ +30%**               | Quote experts, customers, primaries  |
   | Citations / cited sources      | **≈ +40%**               | Cite and link authoritative sources  |
   | Keyword stuffing               | **≈ −10%** (hurts)       | Remove it — it actively suppresses   |

   If the winning page is dense with stats, quotes, and citations and the brand's is thin, undated, or unattributed, the miss is authority. Fix = add original data, dates, named attribution, and real citations.

3. **Presence (third-party surfaces).** Some answers are owned by Reddit threads, Wikipedia, G2/Capterra listicles, or review sites the brand simply isn't on. No on-site edit wins these — `geo/mentions/top-domains` will show the same third-party domains owning slot after slot. Fix = earn a place on that surface (a listing, a review presence, a mention), not a blog post.

### What NOT to do

- **Don't write separate "AI content."** The same well-structured, authoritative page serves humans and LLMs. A parallel "for-AI" page splits authority and gets ignored.
- **Don't block AI crawlers.** Disallowing GPTBot/Google-Extended in `robots.txt` is self-sabotage — it guarantees zero citations. Verify the brand isn't doing this before blaming content.
- **Don't chase inauthentic mentions.** Bought reviews, spun listicles, and fake Reddit threads are the GEO equivalent of link spam — they don't earn durable citations and they read as manipulation. Earn presence honestly.
- **Don't keyword-stuff.** The Princeton data shows it _lowers_ visibility (≈ −10%). If a brand page reads as stuffed, that is itself a cause to flag.

## Output

Lead with the headline, then the matrix, then the prioritized misses.

**Headline:** "Brand holds X% weighted Share-of-Citations across N prompts (Google AI X%, ChatGPT Y%); top competitor [name] holds Z%." With run date.

**Citation-coverage matrix** — one row per prompt, columns per platform. Legend: ✅ brand cited as source · 〰️ brand named in text only · ❌ absent · → competitor that owns it.

| Prompt                       | AI vol | Google AI             | ChatGPT          | Owns the answer (if not us) | Pillar + fix                          |
| ---------------------------- | ------ | --------------------- | ---------------- | --------------------------- | ------------------------------------- |
| best [category] for startups | 1.9k   | ❌ → g2.com           | ❌ → competitorA | g2.com, competitorA         | Presence — get listed on g2           |
| what is [category]           | 3.2k   | ✅                    | 〰️               | —                           | Structure — add a definition block    |
| [brand] vs [competitorA]     | 540    | ✅                    | ✅               | —                           | —                                     |
| how to [problem]             | 2.7k   | ❌ → competitorB docs | ❌               | competitorB                 | Structure — ranks #6 but not liftable |

**Share-of-Citations table** — brand vs each competitor, per platform + overall (weighted and unweighted).

**Per high-value miss:** prompt, AI search volume, who owns it, the cited source URL (from `geo/serp` / `top-pages`, read with `browser/markdown`), the diagnosed pillar (Structure / Authority / Presence), and the concrete fix — for Authority misses, name the specific lever (add stats, add quotes, add citations).

**Prioritized "win next" list** — the misses sorted by AI search volume, ready to hand to `ai-answer-gap`.

**Cost:** UnifAPI records consumed, or best estimate.

### Worked example

Brand `acme.dev`, competitors `g2.com`, `rivalapp.com`, US/English, 12 prompts. `geo/keywords/search-volume` weights them; `geo/serp` runs per prompt and `geo/mentions/cross-aggregated-metrics` gives the category share in one call. Across 24 platform cells, Acme is a cited source in 5, name-dropped in 3, absent in 16. Weighted SoC: Acme 18%, g2.com 41%, rivalapp 22%. Biggest weighted miss: "best [category] for startups" (1.9k AI vol) — `browser/markdown` on the winning g2 listicle shows a clean ranked table Acme isn't in → pillar: **Presence** → top of the win-next list. Second miss "what is [category]": Acme ranks #2 organically (`seo/serp`) but the answer is buried in prose → pillar: **Structure**, a quick win.

## Guardrails

- Read-only: it measures and reports. It never rewrites content, edits the site, posts to Reddit/Wikipedia, or changes any account — the operator's own assistant executes any fix.
- AI answers are non-deterministic and vary by session, region, and time. Present a **dated snapshot**, not a permanent ranking; re-run to confirm a trend (hand that to `llm-mention-tracking`).
- Keep the cited-as-source vs named-in-text distinction explicit — conflating them inflates SoC. A name-drop is a quick-win signal, not a citation.
- AI search volume is a public-data estimate — present ranges, and never promise that fixing a miss guarantees a citation.
- ChatGPT engine coverage is US/English only; note this when the market is elsewhere and lean on `google` for those locales.

## References

- [references/geo-methodology.md](references/geo-methodology.md) — citation-slot counting rules, weighted/unweighted Share-of-Citations, and the three-pillar (Structure / Authority / Presence) miss-cause decision tree with the Princeton authority levers.

## Related Skills

- **llm-mention-tracking**: turn this one-time audit into an ongoing share-of-voice trend across ChatGPT and AI search
- **ai-answer-gap**: prioritize the misses this audit surfaces into a content backlist, ranked by AI search volume
- **unifapi**: the shared data skill — connect MCP and discover the GEO/SEO operations this audit reads
