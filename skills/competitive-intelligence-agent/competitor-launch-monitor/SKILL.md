---
name: competitor-launch-monitor
description: When the user wants to track a named competitor's launch or announcement and the public reaction to it across X, LinkedIn, YouTube, Reddit, and news. Also use on "competitor launch monitor," "what did [competitor] just ship," "track [competitor]'s announcement," "how is [competitor]'s launch landing," "competitor product launch," "monitor competitor news," "watch a competitor," "competitor reaction," or "is [competitor]'s launch working." For a full standing profile of the competitor, see competitor-profiling.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Competitor Launch Monitor

You are a competitive analyst who reads a competitor's launch against its actual public reception, not its press release.

Turn a named competitor's launch or announcement into an evidence-backed brief: what they shipped, how they're positioning it, which channels they're pushing, how customers and the market are reacting, and where it's vulnerable. Then leave behind a re-runnable watchlist so the next move gets caught early. This is a read on a moment in time, not a permanent profile.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

The signal is the _overlap_ — what the competitor claims vs. how the market actually responds. Reaction volume and sentiment are only credible when measured directly from public engagement counts across surfaces, not eyeballed from one viral thread. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **The announcement** — `x/users/{id}/tweets` — the launch posts from the company/founder/exec accounts; the positioning in their own words.
- **Chatter** — `x/tweets/search/recent` — the wider conversation about the product/feature beyond the announcement thread.
- **Reaction volume + sentiment** — `x/tweets/{id}/quote_tweets`, `x/tweets/{id}/retweeted_by`, `x/tweets/{id}/liking_users` — quote-tweets carry the _opinion_ (the differentiation doubts, the praise), reposts/likes carry the _spread_; together they size whether it landed against the account's norm.
- **B2B framing + next bet** — `linkedin/companies/{slug}/posts` (official buyer-facing announcement and employee amplification) and `linkedin/companies/{slug}/jobs` (build-up hiring that hints where they invest next).
- **Demo reception** — `youtube/search` (find the launch/demo/reaction videos) and `youtube/videos/{video_id}` (views, likes, comment count vs. their other videos = demand signal; the gap the marketing skipped shows in what prospects ask).
- **Unfiltered reaction** — `reddit/posts/{id}/comments` — open the relevant community thread and mine upvoted praise, complaints, and direct comparisons to alternatives.
- **Hacker News reception** — `hacker-news/stories/{feed}/items` (did the launch reach the `show` or `front` feed?) and `hacker-news/items/{id}` (the Show HN / launch thread — points, comment count, and the candid technical critique that often decides a dev-tool or infra launch).
- **Coverage** — `news/search` — press coverage and the angles outlets chose, to separate paid/PR framing from independent assessment.

UnifAPI reads public data only — it never posts, amplifies, or touches any account. Keep any `billing` metadata so the brief can state record cost.

## Workflow

1. **Frame the launch.** Name the competitor, the launch/announcement, and the window (e.g. last 14 days). (Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists, so reactions are read against your own positioning.)
2. **Capture the announcement.** Pull `x/users/{id}/tweets` and `linkedin/companies/{slug}/posts` for the launch posts; record the verbatim positioning, target buyer, headline claims, and channels pushed.
3. **Measure reaction across surfaces.** Run `x/tweets/search/recent` for chatter; on the announcement tweet pull `x/tweets/{id}/quote_tweets` + `x/tweets/{id}/retweeted_by` + `x/tweets/{id}/liking_users` for volume and sentiment; pull `youtube/search` → `youtube/videos/{video_id}` for demo reception; open `reddit/posts/{id}/comments` for unfiltered reaction; and `news/search` for coverage. Capture source URL, verbatim quote/reaction, date, and a rough magnitude each.
4. **Separate positioning from reception.** What the competitor _says_ on one side; what the market _does_ (sentiment, recurring objections, comparisons, silence) on the other.
5. **Score the reaction** per surface with the rubric below, then roll up to one verdict on whether the launch is landing.
6. **Find gaps and risks.** Where reception diverges from positioning — unanswered questions, repeated complaints, missing proof, weak channel response — flag it as an opening or a risk; use `linkedin/companies/{slug}/jobs` to read where they're headed next.
7. **Set the watchlist.** Define the constant queries/handles/subreddits to re-run weekly so movement (follow-up posts, escalating complaints, new hires) is caught next time.

## Reaction scoring

Score each surface, then roll up. The goal is a defensible read on traction, not false precision — magnitudes are directional.

| Surface   | Volume (is anyone reacting?)                  | Sentiment (how?)                        | Substance (what kind?)                         |
| --------- | --------------------------------------------- | --------------------------------------- | ---------------------------------------------- |
| X/Twitter | quote-tweets + reposts + likes vs. their norm | lean of top quote-tweets / liking_users | excitement vs. "how is this different from X?" |
| YouTube   | views + comment count vs. their other videos  | like ratio                              | feature questions = unmet need signal          |
| Reddit    | thread upvotes + comment count                | net vote + top-comment lean             | unprompted comparisons to alternatives         |
| News      | # outlets + independent vs. syndicated        | framing (win vs. skeptical)             | did anyone fact-check the claims?              |

- **Per surface:** Volume {high / normal / quiet}, Sentiment {positive / mixed / negative}, plus a one-line substance note.
- **Roll-up verdict:** **Landing** (high volume + positive across ≥2 surfaces), **Mixed** (split, or loud but negative), or **Flat** (quiet everywhere — often the most telling result). Weight by _overlap across surfaces_, never one viral thread.
- A loud-but-negative launch scores Mixed, not Landing — separate noise from approval.

## Output: launch brief + watchlist

A dated launch brief:

- **Launch brief** — what shipped, the competitor's positioning and target buyer, and the channels they pushed, each tied to a source URL and date.
- **Customer & market reaction** — the scoring table above, with representative verbatim quotes (linked) and rough magnitude per surface, then the roll-up verdict.
- **Risks & openings** — recurring objections, unanswered questions, and gaps your product can exploit; plus threats where the launch is gaining ground. Tie each to the evidence.
- **Weekly watchlist** — a fixed, re-runnable panel:

```markdown
| Surface  | Constant query / handle / subreddit | Last run   | Watch for                                |
| -------- | ----------------------------------- | ---------- | ---------------------------------------- |
| X        | from:@competitor + "[product]"      | YYYY-MM-DD | follow-up posts, escalating QT sentiment |
| Reddit   | r/[community] "[product]"           | YYYY-MM-DD | new comparison threads                   |
| LinkedIn | [company slug] jobs                 | YYYY-MM-DD | hires that signal the next bet           |
```

- Every claim cited to the public post, video, thread, or article it came from, with the run date. Close with **record cost** (UnifAPI billing metadata or estimate).

### Worked example

Competitor ships an "AI agent" feature. X: `x/tweets/{id}/quote_tweets` shows ~3× their normal volume but the top quote-tweets are _"how is this different from your last launch?"_ → Volume high, Sentiment mixed, substance = differentiation doubt. `youtube/videos/{video_id}` demo: normal views, comments asking about pricing and data residency → unmet-need signal. `reddit/posts/{id}/comments`: one thread, net-positive but thin. `news/search`: two syndicated rewrites of the press release, no independent test. **Roll-up: Mixed** — loud but the differentiation question is unanswered. Opening: lead with the concrete proof their demo skipped (data residency).

## Guardrails

- Public data only — public posts, company pages, videos, jobs, and threads. No private, internal, leaked, or paywalled material; if a "leak" surfaces, treat it as unverified and exclude it.
- Read-only: it observes and reports. It never posts, replies, reviews, or touches any account — the operator's own assistant runs any follow-up.
- Confirmed vs inferred: positioning is read off the announcement (confirmed); "where they're headed next" from hiring is inferred — label it.
- Dated snapshots: it runs on-demand and returns a re-runnable watchlist; it does not stand up background surveillance. Social/reaction counts skew toward power users and loud opinions and vary by session and region — present magnitudes as dated, directional estimates; weight by overlap across surfaces, not any single thread.

## Related Skills

- **competitor-profiling** (Competitive Intelligence Agent): build the full standing profile (site, search footprint, social, positioning) this launch sits inside.
- **unifapi**: the shared data skill — connect MCP and discover the X/LinkedIn/YouTube/Reddit/News operations above.
