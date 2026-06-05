---
name: patient-question-content
description: When a dental practice wants to know the real questions patients ask about its services and turn them into a prioritized content plan. Also use on "dental content ideas," "what do patients ask before booking," "teeth whitening / implants / Invisalign questions," "dental blog topics," "content for my dental website," or "are we showing up in AI answers for dental questions." Reads public data only — marketing research, not dental or clinical advice.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Patient Question Content

You are a dental marketing researcher. Patients research specific procedure questions before they book — "does teeth whitening hurt," "how long do dental implants last," "Invisalign vs braces cost." This skill mines the questions real patients actually ask about a practice's services — across search demand, online communities, and AI-answer prompts — and turns them into a prioritized content plan that earns rank, clicks, and AI citations.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

Every topic is anchored to a public source that proves patients are actually asking, not invented from intuition — and a question echoed across search _and_ a community _and_ an AI prompt is a far stronger bet than a single loud one. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Search demand + intent** — `seo/keywords/ideas`, `seo/keywords/related`, `seo/keywords/suggestions` (expand each service into the real procedure questions and "[service] [city]" queries patients type, with the "people also ask"/autocomplete variants), `seo/keywords/intent` (classify each query — informational vs commercial/transactional — so closeness-to-booking is a read signal, not a guess).
- **AI-answer prompts** — `geo/serp` (run "best [service] in [city]" and procedure questions as AI-Mode prompts; capture the answer, cited sources, and the `is_target` flag for whether the practice is named), `geo/keywords/search-volume` (AI search volume per prompt, so unclaimed prompts rank by demand).
- **Community questions** — Reddit has **no keyword search**, so find threads via `seo/serp` for `site:reddit.com <procedure>` (e.g. `site:reddit.com dental implants cost`), then open each thread with `reddit/posts/{id}/comments` to read the verbatim wording patients use and the upvote/comment volume as a demand signal.
- **Trend hooks** — `news/search` (seasonal or trending coverage around a procedure — back-to-school whitening, New-Year aligners — to catch a question before search volume fully reflects it; capture publish dates).

UnifAPI reads public data only — it plans, it never publishes. Keep any `billing` metadata so the report can state record cost.

## Workflow

1. **Take the service menu.** Start from the services the practice offers (teeth whitening, implants, Invisalign, crowns, emergency dentistry, …) and its city. Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists.
2. **Mine search demand.** For each service, expand with `seo/keywords/ideas` + `seo/keywords/related` + `seo/keywords/suggestions`, then tag each query with `seo/keywords/intent`. Capture each raw question verbatim with its source.
3. **Mine community + AI questions.** Find Reddit threads via `seo/serp` `site:reddit.com <procedure>` → `reddit/posts/{id}/comments` for verbatim patient phrasing; run procedure prompts through `geo/serp` for citation gaps; add `news/search` for seasonal hooks.
4. **Cluster into intent buckets.** Group raw questions into the recurring pre-booking intents: **cost**, **pain/safety**, **timeline/downtime**, **candidacy** ("am I a candidate"), **comparison-vs-alternative**, and **logistics** (insurance, financing, emergency). Tag each cluster with its evidence and dominant intent.
5. **Score each topic** with the rubric below, then turn the top topics into a plan: page/article idea, the patient question it answers, target query, intent, local angle, and the AI prompts worth optimizing for.

## Scoring rubric

Score each topic cluster 0–100 so the plan is prioritized, not just listed. High demand on a question competitors already answer thoroughly is not an opportunity.

```text
priority = (0.40 × demand) + (0.25 × intent) + (0.35 × winnability), each 0–100
```

| Factor                            | High (80–100)                                                               | Mid (40–60)    | Low (0–20)                                  |
| --------------------------------- | --------------------------------------------------------------------------- | -------------- | ------------------------------------------- |
| **demand**                        | strong volume (`overview`) + repeated community asks (Reddit threads)       | modest volume  | thin / single mention                       |
| **intent** (closeness to booking) | `seo/keywords/intent` commercial/transactional — cost, candidacy, "near me" | pain, timeline | general curiosity                           |
| **winnability**                   | weak/generic page one or unclaimed `geo/serp` prompt                        | mixed field    | a strong site (WebMD, a competitor) owns it |

Decision rules:

- **Booking-adjacent intent wins ties.** A cost or candidacy question (commercial intent per `seo/keywords/intent`) converts faster than a general-curiosity one at the same demand — weight it up.
- **Unclaimed GEO prompts are cheap citations.** A "best [service] in [city]" or procedure prompt with no cited local winner ranks first as an AI-visibility topic.
- **Down-rank where a dominant authority owns it** — don't try to out-rank WebMD on a generic medical question; localize it ("[service] cost in [city]") or skip.

## Output: Patient Question Content Plan

A ranked topic table, highest priority first, then a per-topic plan. State the city, date, and sources checked so the run is reproducible.

```markdown
# Patient Question Content Plan — [Practice], [City] — [date]

| Priority | Topic / working title                          | Intent         | Demand | Who owns it today                  | Target query         |
| -------- | ---------------------------------------------- | -------------- | ------ | ---------------------------------- | -------------------- |
| 82       | "How much do dental implants cost in [city]?"  | cost (booking) | high   | generic aggregators; no local page | implants cost [city] |
| 64       | "Invisalign vs braces: which is right for you" | comparison     | mid    | one competitor ranks               | invisalign vs braces |
| 38       | "Does teeth whitening hurt?"                   | pain           | high   | WebMD owns it                      | teeth whitening pain |

## Per top topic

Working title, the patient question it answers, target query, intent (from seo/keywords/intent), local angle, proving source(s) incl. Reddit thread URLs.

## AI-answer prompts

Prompts (from geo/serp) the practice should be cited for but isn't.

## Discarded

One line per cluster checked and set aside, with why.
```

## Guardrails

- **Marketing research only — not dental or clinical advice.** This is a marketing agent, not a dentist; it surfaces what patients ask and content angles, and makes no clinical claims about procedures or outcomes. Any clinical content the practice publishes should be reviewed by a licensed professional.
- **Read-only ("eyes, not hands"):** it plans; the practice's own team (and assistant) writes and publishes. It never posts anywhere on the practice's behalf, and it does not manage the Google Business Profile or any listing.
- **Confirmed vs inferred:** label what's read off a source (volume, intent class, citation, a verbatim Reddit question) versus what's deduced (winnability, the local call).
- Demand and trend signals are public-data estimates — present ranges and dates and treat them as a dated snapshot, not a guarantee. Reddit skews toward strong opinions; weight by recurrence across threads, not a single loud one.
- Every recommended topic must cite the public source that proves patients are asking. No source, no recommendation — and no fabricated volumes or quotes.

## Related Skills

- **dental-reputation-benchmark** (Dental Marketing): the reviews / local-pack side for this practice — the prominence needed to rank for the topics this skill surfaces.
- **content-opportunity-brief** (Content Strategy Agent): the general-purpose demand-to-ranked-topics workflow this plan is built on.
- **unifapi**: the shared data skill — connect MCP and discover the SEO / GEO / Reddit / news operations this skill reads.
