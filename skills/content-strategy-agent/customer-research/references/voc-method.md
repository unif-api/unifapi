# Voice-of-Customer Method

The procedure for turning raw public posts and comments into ranked, confidence-labeled themes. Used by the `customer-research` skill. Adapted from the marketing-skills customer-research approach (MIT, Corey Haines), enhanced for public-community mining via UnifAPI.

## Principle

Customers describe problems in their own vocabulary, which is rarely the vocabulary a brand uses internally. The job is to capture that language _verbatim_, find what repeats, and weight it honestly — never to paraphrase a single hot take into a "finding."

## 1. Capture (one row per item)

For every post or comment worth keeping, record a structured row. Don't summarize yet — capture raw.

| Field         | Notes                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `source_url`  | exact permalink to the post/comment                                                            |
| `date`        | publish date; used for recency weighting                                                       |
| `platform`    | reddit / youtube / news / tiktok / search                                                      |
| `segment`     | which ICP segment the author appears to be (role, company size, consumer vs. pro) if inferable |
| `verbatim`    | the quote, exactly as written — including typos and slang                                      |
| `prompted_by` | what they were responding to (a question, a launch, a competitor)                              |
| `sentiment`   | positive / negative / neutral / mixed                                                          |
| `theme_tag`   | one of: pain / trigger / outcome / objection / alternative / language                          |

Search queries themselves count as items: a high-volume "how do I X" query is a verbatim signal that the pain is widespread.

## 2. Tag taxonomy

| Tag             | Captures                               | Example phrasing                                   |
| --------------- | -------------------------------------- | -------------------------------------------------- |
| **pain**        | the problem, friction, what hurts      | "I waste half my day reconciling exports"          |
| **trigger**     | the event that started the search      | "after we hit 50 employees, the spreadsheet broke" |
| **outcome**     | the result they actually want          | "I just want one number I can trust"               |
| **objection**   | why they hesitate or churn             | "looked great until I saw the per-seat price"      |
| **alternative** | tools/workarounds they compare or use  | "we just use a shared Google Sheet"                |
| **language**    | reusable vocabulary, metaphors, jargon | calls it "the close," not "month-end"              |

A single quote can carry two tags (e.g. an objection that also reveals an alternative). Split it into two rows so each tag is counted once.

## 3. Cluster

Group rows whose `verbatim` means the same thing even if worded differently. Merge near-duplicates ("setup is painful" / "took me a weekend to configure" / "onboarding is brutal") into one theme and keep every `source_url` attached. The cluster's strength comes from how many _independent_ sources it spans, not how many times one person repeated it.

## 4. Score: frequency × intensity

Score each theme on two 1–5 axes and multiply.

- **Frequency** — how often the theme recurs across independent items. 1 = once or twice; 3 = several threads; 5 = dominant, shows up across platforms.
- **Intensity** — how strongly it's expressed. 1 = neutral/matter-of-fact; 3 = clear frustration or enthusiasm; 5 = visceral ("I hate," "lifesaver," actively switching away).

`theme_score = frequency × intensity` (range 1–25). Rank themes by this score. A quiet-but-universal theme (5×2=10) and a loud-but-rare one (2×5=10) tie — which is correct; both deserve a look.

## 5. Confidence label (separate from score)

Score measures pull; confidence measures how much you can trust it. Keep them separate — a high-frequency theme confined to one segment is still Medium.

| Label      | Rule                                                                        |
| ---------- | --------------------------------------------------------------------------- |
| **High**   | 3+ independent sources, unprompted, consistent across more than one segment |
| **Medium** | 2 independent sources, or strong but within a single segment                |
| **Low**    | single source — present as "needs validation," never as established fact    |

Recency: weight items from the last 12 months more heavily; flag a theme built mostly on older items as possibly stale.

## 6. Sample-bias check before generalizing

- Reddit, YouTube, and review sites over-index on power users and people with strong opinions; satisfied silent majorities are invisible. State this.
- Don't build a persona from fewer than ~5 independent data points per segment.
- If every source is one subreddit, the finding is about that subreddit, not the market — say so and widen the pull.

## Worked tagging example

> Raw comment (r/accounting, 2026-02, 210 upvotes): _"Honestly the close still takes us 6 days every month and the tool we pay for doesn't talk to our bank feeds. About to go back to spreadsheets."_

Tagged rows:

| theme_tag   | verbatim fragment                                    | sentiment |
| ----------- | ---------------------------------------------------- | --------- |
| pain        | "the close still takes us 6 days every month"        | negative  |
| objection   | "the tool we pay for doesn't talk to our bank feeds" | negative  |
| alternative | "about to go back to spreadsheets"                   | negative  |
| language    | calls it "the close"                                 | neutral   |

If "the close takes too long" also appears in two other independent threads with frustrated tone → frequency 4, intensity 4, score 16, confidence **High** → lead messaging on close-time reduction.
