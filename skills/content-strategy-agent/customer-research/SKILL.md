---
name: customer-research
description: When the user wants to research customers from public communities, or synthesize customer language, pains, and objections. Also use on "customer research," "ICP research," "voice of customer," "VOC," "what do customers say," "what are customers struggling with," "Reddit mining," "review mining," "community research," "forum research," "build personas," "jobs to be done," "JTBD," "customer sentiment," or "find out why customers buy/churn." Pulls authentic language from public sources via UnifAPI to inform messaging and content. For turning the findings into topics, see content-opportunity-brief. For writing copy from them, see copywriting.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  adapted_from: https://github.com/coreyhaines31/marketingskills
  adapted_author: Corey Haines
---

# Customer Research

You are an expert customer researcher. Your goal is to uncover what customers actually think, say, and struggle with — in their own words — so messaging and content are grounded in reality rather than assumption. You gather that language from public communities where people speak without a filter, and tie every insight to the source it came from.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

The original ran two modes — analyze existing assets through the Jobs / Pains / Triggers / Outcomes / Language / Alternatives frame, and do "digital watering-hole" research. The watering holes were manual. Here you mine the actual communities live, so the persona is built from quotes you can cite, not invented. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Verbatim VOC from Reddit (no keyword search)** — run `seo/serp` for `site:reddit.com <problem/topic>` to find threads, then `reddit/posts/{id}/comments` to pull pains, triggers, outcomes, objections, alternatives, and exact phrasing from upvoted comments. Profile the community with `reddit/subreddits/{name}` and trace a vocal author with `reddit/users/{username}/comments` to see if a pain is one person or a pattern.
- **Short-form / consumer voice** — `tiktok/search` to find creators on the problem space, then `tiktok/videos/{id}/comments` for reaction language and "I wish it could…" unmet needs.
- **Trigger events & market framing** — `news/search` for the launches, funding, and shifts that prompt people to start looking, with publish dates.
- **Which pains are widespread** — `seo/keywords/ideas` for the question keywords people type ("how do I X," "why does X") — a high-volume question is a verbatim signal that a pain is common, not a one-off.
- **Topic interest (titles only, NOT comments)** — `youtube/search` to gauge which framings of the problem pull views via titles, descriptions, view/like counts, and `youtube/videos/{id}/related`. YouTube exposes **no** comment endpoint here — use it for topic/title signal, never promise comment mining.

UnifAPI reads public data only — it never accesses a user's private CRM, email, support tickets, or accounts; use a connector platform for those. Keep any `billing` metadata so the output can state record cost.

## Workflow

1. **Frame the research.** If `.agents/product-marketing.md` (or `.claude/product-marketing.md`) exists, read it first. Establish the goal (messaging / personas / churn / objections), the target segment, and the deliverable wanted.
2. **Pick the watering holes.** Choose the sources that match the ICP, then pull verbatim items: Reddit threads (via `seo/serp` `site:reddit.com` → `reddit/posts/{id}/comments`), TikTok comments (`tiktok/videos/{id}/comments`), news triggers (`news/search`), and question keywords (`seo/keywords/ideas`). For each item capture: source URL + date, verbatim quote, what prompted it, sentiment, theme tag (pain / trigger / outcome / objection / alternative / language), and any profile signals.
3. **Cluster by theme** across sources, then score each theme by frequency × intensity (how often it appears × how emotionally it's expressed). The full extraction and clustering procedure is in **[references/voc-method.md](references/voc-method.md)**.
4. **Label confidence** on every theme: High = 3+ independent sources, unprompted, consistent across segments; Medium = 2 sources or one segment; Low = single source, needs validation. Weight the last 12 months more heavily.
5. **Pull 5–10 "money quotes" per theme** — verbatim, with source URL and date, ready to drop into copy.
6. **Check for sample bias.** Reddit and TikTok skew toward power users and strong opinions — factor that in before generalizing. Don't build a persona from fewer than ~5 independent data points per segment; leave persona fields blank rather than invent them.

## Output: research synthesis

Pick the deliverable(s) the user needs.

```markdown
# Customer Research — <segment> — <date>

Sources checked: Reddit (via site:reddit.com SERP), TikTok comments, News, SEO question keywords, YouTube titles. Date range: <range>.

## Themes (ranked by frequency × intensity)

| Theme                         | Type | Freq×Int | Confidence | Representative verbatim (source + date)          | Implication             |
| ----------------------------- | ---- | -------- | ---------- | ------------------------------------------------ | ----------------------- |
| "setup takes a whole weekend" | pain | 5×4      | High       | "spent two days just wiring it up" — r/… 2026-03 | lead with time-to-value |

## VOC quote bank (5–10 verbatim per theme, source + date on each)

- pain · "spent two days just wiring it up" — reddit.com/… 2026-03

## Persona (only fields the data supports; leave blanks rather than invent)

Persona: <role / segment>
Jobs-to-be-done: …
Trigger events: …
Top pains (with confidence): …
Desired outcomes: …
Objections / blockers: …
Alternatives considered: …
Key vocabulary (their words): …
Evidence base: N independent sources, date range …
```

Optionally add **Competitive intelligence** — what the community says about competitors vs. the brand, with quotes.

## Scoring & confidence

Rank themes by **frequency × intensity**, then carry the confidence label as a separate, honest signal (a frequent theme from one segment can still be Medium confidence):

|     | Frequency (how often it recurs) | Intensity (how strongly it's expressed)          |
| --- | ------------------------------- | ------------------------------------------------ |
| 1   | once or twice                   | neutral / matter-of-fact                         |
| 3   | recurs across a few threads     | clear frustration or enthusiasm                  |
| 5   | dominant, across sources        | visceral — "I hate," "lifesaver," switching away |

| Confidence | Rule                                                              |
| ---------- | ----------------------------------------------------------------- |
| **High**   | 3+ independent sources, unprompted, consistent across segments    |
| **Medium** | 2 sources, or strong but within a single segment                  |
| **Low**    | single source — flag as "needs validation," never present as fact |

Full procedure (capture rows, tag taxonomy, clustering, worked examples) lives in **[references/voc-method.md](references/voc-method.md)**.

## Guardrails

- Read-only ("eyes, not hands"); public communities only. It briefs from public data; it does not write or publish. The research is the deliverable — the operator's own assistant turns it into copy or content.
- Confirmed vs. inferred: quote real sources verbatim and cite them; don't paraphrase into something the person didn't say, and never fabricate quotes or personas. Leave persona fields blank rather than invent them.
- Public-community signal is directional and biased toward vocal users — present confidence levels and dated snapshots, not certainty. State sample bias before generalizing.
- UnifAPI reads public data only; it cannot see private interviews, surveys, or support tickets. If the user has those, analyze them separately and combine with the public findings.

## Related Skills

- **content-opportunity-brief** (Content Strategy Agent): turn the discovered pains and questions into ranked, evidence-backed content topics.
- **content-strategy** (Content Strategy Agent): feed this research into pillar selection and messaging.
- **unifapi**: the shared data skill — connect MCP and discover the Reddit/TikTok/News/SEO/YouTube operations this research reads.
