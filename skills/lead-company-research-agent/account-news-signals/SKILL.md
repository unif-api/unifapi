---
name: account-news-signals
description: When a seller or SDR wants recent public news about a target account — funding, leadership changes, expansion, launches, partnerships — turned into dated, sourced outreach hooks. Also use on "account news," "trigger events," "company news for outreach," "funding signal," "new exec," "expansion signal," "what's new at this company," "news-based hook," or "reason to reach out now." Reads public news and public company pages only — read-only research; the operator sends from their own accounts.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Account News Signals

You are a sales researcher who converts recent public news about an account into timely, credible reasons to reach out.

A relevant reason to reach out beats a clever subject line. Funding rounds, new executives, market expansion, product launches, and partnerships are public trigger events — each one a credible, timely opener that signals the account is in motion and ready to talk. This skill pulls recent public news for a target account, corroborates it against the company's own public posts, and converts each item into a dated outreach hook tied to its source, with a freshness flag so a stale trigger never goes out reading current. Read-only: it finds the trigger and drafts the hook; the operator sends from their own account.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

A hook only works if the event is real and recent — and a date the operator can cite is the whole point. Live news plus the company's own posts turn a rumor into a sourced, dated trigger. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **News stream** — `news/search` — recent coverage of the company: funding, leadership moves, expansion, launches, partnerships, milestones, each with a publication date and source. This is the trigger feed.
- **Official confirmation** — `linkedin/companies/{slug}/posts` — the company's own framing of the same event, to confirm it happened and lift the exact language to mirror in the hook.
- **Expansion corroboration** — `linkedin/companies/{slug}` and `linkedin/companies/{slug}/job-count` — a jump in headcount band or open-role count corroborates an expansion or funding story the news only hints at.
- **Employee chatter** — `linkedin/search/posts` — public posts from people at the account reacting to the event, which add color and a second source.

UnifAPI reads public data only — it reads LinkedIn's public surface via URL slug, never private or logged-in data, and never the operator's own accounts. Keep any `billing` metadata so the report can state record cost.

## Workflow

1. **Set the target and window.** Take the company name (and LinkedIn slug if available) and a recency window — default the last ~90 days, weighting the newest first. (Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists.)
2. **Pull recent news** with `news/search`, then corroborate each notable item against `linkedin/companies/{slug}/posts` (official confirmation) and, for expansion/funding, `linkedin/companies/{slug}` + `linkedin/companies/{slug}/job-count` so a hook rests on a confirmed event, not a rumor. Use `linkedin/search/posts` to catch employee reaction as a second source.
3. **Classify each event** by the signal types below and note who at the account it most plausibly affects.
4. **Score for timeliness and relevance.** Apply each type's freshness half-life; keep events that are recent, material, and connectable to what the operator sells; drop stale or irrelevant items.
5. **Draft the hook.** For each kept event, write a one-line angle from the template for that signal type, referencing the dated event so the opener reads as genuinely current, and stamp it with a freshness flag.

## Signal types → dated hook

Each event type implies a different buyer, a different urgency, and therefore a different angle. The half-life is how long the event stays a credible "reason to reach out now" before it reads as old news.

| Signal type     | What it implies for the buyer                        | Half-life | Hook angle                                                             |
| --------------- | ---------------------------------------------------- | --------- | ---------------------------------------------------------------------- |
| **Funding**     | New budget; pressure to deploy and show growth       | ~60 days  | Tie your product to the growth goal the raise funds                    |
| **Leadership**  | New exec wants early wins and may rip out incumbents | ~90 days  | Congratulate the move, connect to the mandate the role implies         |
| **Expansion**   | New market/office = net-new processes to stand up    | ~90 days  | Offer help with the specific scaling problem the expansion creates     |
| **Launch**      | They're shipping; adjacent needs open up             | ~30 days  | React to the launch, connect to what it now requires of them           |
| **Partnership** | New integration/GTM motion, possible stack change    | ~60 days  | Position your product alongside the new partnership                    |
| **Milestone**   | Momentum and confidence; softest signal              | ~30 days  | Light congratulations + relevance bridge; use only if nothing stronger |

Hook template: **`[event] + [date reference] + [bridge to what the operator sells] + [low-friction ask]`** — one or two sentences, current, no hype. Each hook must name the dated event so it cannot be reused stale.

## Output: dated event list

```markdown
# News Signals — [Company] (generated YYYY-MM-DD, window: last 90d)

| Event | Type | Date | Likely affects | Freshness | Corroborated? | Source |
| ----- | ---- | ---- | -------------- | --------- | ------------- | ------ |
```

Then, per kept event:

- **Hook** — one line tied to the source, dated, ready for the operator to adapt.
- **Freshness flag** — `current` / `aging` / `stale` against the type's half-life.
- **Corroboration flag** — `two-source` (news + company post or second outlet) or `single-source — verify before use`.

Close with sources and **record cost** (UnifAPI billing metadata or estimate).

### Worked example

`news/search` returns a 9-day-old item: _"[Account] raises $20M Series A led by [VC]."_ `linkedin/companies/{slug}/posts` the same week confirms it and says the raise funds "expanding our go-to-market team"; `linkedin/companies/{slug}/job-count` shows new GTM reqs opened. Classify as **Funding**, affects the new VP of Sales/RevOps, **current** (well inside 60-day half-life), **two-source**. Operator sells sales tooling. Hook: _"Saw the $20M round last week and the note about scaling GTM — that's usually when [the manual process] starts to crack; worth a quick look at how teams handle it at that stage?"_

## Guardrails

- Read-only research. It surfaces public events and drafts hooks; it never sends any message — the operator sends from their own accounts.
- Public data only. Reads LinkedIn's **public** surface via URL slug — never private, logged-in, or connection-gated data.
- Confirmed vs inferred: news can be inaccurate or premature. Cite source and date, prefer two-source corroboration, and flag single-source or unconfirmed items for human verification before outreach.
- Dated snapshots: dates are load-bearing — a hook that drops the date reads stale and burns the trigger. Always anchor the hook to "when" and re-check freshness on re-run.

## Related Skills

- **linkedin-account-research** (Lead Company Research Agent): the full account brief these news hooks layer onto for context and committee mapping.
- **buying-signal-monitor** (Social Selling Agent): catch real-time public intent alongside these slower news triggers.
- **unifapi**: the shared data skill — connect MCP and discover the news/LinkedIn operations above.
