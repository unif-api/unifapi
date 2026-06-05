# GEO Audit Methodology Reference

The deterministic method behind the citation-coverage matrix and the Share-of-Citations headline in `SKILL.md`. Every count comes from a real UnifAPI response — no slot is inferred.

## Per-prompt evidence record

For each prompt, run `POST /geo/serp` with `query` = the prompt and `target` = the brand domain (`view: "full"`). Record one row per platform you audit (`google`, `chatgpt`):

| Field                    | From `geo/serp`                                         | Meaning                                            |
| ------------------------ | ------------------------------------------------------- | -------------------------------------------------- |
| `answer_present`         | answer section non-empty                                | Did an AI answer render at all?                    |
| `brand_cited`            | a reference where `is_target` is true                   | Brand domain is a **cited source** (a link).       |
| `brand_in_text`          | brand named in answer body but no `is_target` reference | **Name-drop only** — weaker signal.                |
| `competitor_citations[]` | cited reference domains that match a tracked competitor | Who won the slot instead.                          |
| `other_citations[]`      | remaining cited domains                                 | Third-party owners (Reddit, Wikipedia, listicles). |

Cross-confirm brand and competitor presence in bulk with `POST /geo/mentions/search` (`target` = array of the brand + each competitor). Use `POST /geo/mentions/top-pages` to get the exact winning URL for a miss without re-running the SERP.

## Counting cited slots

A **cited slot** = one (prompt × platform × entity) cell where the entity appears as a source/reference in the AI answer. Rules:

1. Count an entity **once per platform per prompt**, even if it is cited by multiple references in the same answer (avoids over-weighting verbose answers).
2. A **name-drop** (`brand_in_text` true, `brand_cited` false) is **not** a cited slot. Tally it in a separate "named-in-text" column — it is a quick-win extractability signal (the model knows you but didn't link you).
3. If `answer_present` is false for a prompt+platform, that cell counts toward no one's denominator — drop it from both numerator and denominator.
4. Only count entities you are tracking (brand + named competitors). `other_citations` (third parties) are reported for diagnosis but excluded from the SoC denominator unless the user explicitly wants total-market share.

## Share-of-Citations (SoC)

Unweighted, per platform and overall:

```text
SoC(entity) = cited-slots(entity) / Σ cited-slots(all tracked entities)
```

Weighted by AI search volume (preferred for the headline) — pull `volume_p` per prompt from `POST /geo/keywords/search-volume`:

```text
weighted SoC(entity) = Σ_p [ entity cited on prompt p ? volume_p : 0 ]
                       ─────────────────────────────────────────────
                       Σ_p [ any tracked entity cited on prompt p ? volume_p : 0 ]
```

Compute SoC three ways and report all: **Google AI only**, **ChatGPT only**, **overall**. Divergence between platforms is a finding — a brand can own Google AI Overviews and be invisible in ChatGPT.

### Worked SoC

12 prompts, 2 platforms = up to 24 cells. After dropping 0 empty cells:

- Acme cited slots: 5 · g2.com: 11 · rivalapp: 6 · (third parties excluded).
- Total tracked cited slots: 22.
- Unweighted SoC: Acme 5/22 = **23%**, g2 50%, rivalapp 27%.
- Weighting by AI volume (Acme's 5 slots are lower-volume prompts) pulls Acme to **18%**, g2 to 41%, rivalapp 22% — the weighted view is the honest headline.

## Miss-cause decision tree (the three pillars)

For each prompt a competitor wins and the brand loses, open the winning source (URL from `geo/serp` references or `geo/mentions/top-pages`) with `browser/markdown` and classify it against the three pillars in `SKILL.md`:

1. **Structure (extractability)** — the winning page has clear definition blocks, a comparison table, an FAQ, scannable H2/H3 headers, or machine-readable signals (`/llms.txt`, JSON-LD) that the model lifted; the brand's equivalent is prose-heavy or buried. _Fix: restructure existing content._ If the brand already ranks organically (`seo/serp`) but isn't cited, this is the default cause and a fast win.
2. **Authority (presence signals)** — the winner is dense with the levers Princeton's GEO study measured as visibility drivers: statistics (≈ +37%), direct quotations (≈ +30%), and cited sources (≈ +40%); it is dated, attributed, or a recognized reference. The brand's content is thinner, undated, or unattributed (and must avoid keyword stuffing, ≈ −10%). _Fix: name the specific missing lever — add original data, add quotes, add citations._
3. **Third-party presence** — the winner is a listicle / review site / Reddit thread / directory the brand simply isn't on; `geo/mentions/top-domains` shows the same third-party domains owning slot after slot. No on-site editing wins it. _Fix: earn an honest place on that surface — never buy or spin mentions._

Pick the single dominant pillar per miss; note a secondary if close. Tag each miss `quick` (Structure, brand already ranks) or `net-new` (Authority / Third-party, no presence) so `ai-answer-gap` can sequence the backlog.

## Snapshot discipline

- Stamp every matrix and SoC figure with the run date and engine(s).
- AI answers vary by session/region/time — never present SoC as a fixed ranking. A trend needs ≥3 runs (`llm-mention-tracking`).
- ChatGPT engine is US/English only; for other markets report Google-AI SoC and mark ChatGPT N/A rather than zero.
