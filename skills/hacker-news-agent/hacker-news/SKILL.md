---
name: hacker-news
description: When a workflow needs public Hacker News data through UnifAPI — the top/new/best/ask/show/jobs story feeds, item metadata, comment trees, or user karma. Also use on "did our launch land on HN," "scan Show HN for," "read this HN thread," "Hacker News sentiment," or when another skill (launch monitor, social listening) needs the deterministic HN read path. No keyword search — scan the feeds. Connect via the `unifapi` skill first. Read-only research, never posts.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/agents/hacker-news
  source: https://github.com/unifapi-agent/agents
---

# hacker-news

The deterministic read path for public **Hacker News** data through UnifAPI. This
is a **Data Skill**: it does not run a marketing job on its own — it names the
concrete `hacker-news/...` operations, response shapes, and gotchas so any
launch-reception or listening workflow for dev/infra/startup categories reads
from one known recipe instead of rediscovering the surface each time.

Read-only — **eyes, not hands**. It researches public HN data and returns cited
records; it never posts stories or comments, and UnifAPI never holds HN
credentials.

## Use the `unifapi` skill for live evidence

Connect once through the shared **`unifapi`** skill (OAuth MCP), then call the
operations below. Story feeds take a **`{feed}`** of `top`, `new`, `best`,
`ask`, `show`, or `jobs`. Keep any `billing` metadata so the output can state
record cost.

## Response contract

Single-entity endpoints return the object in `data`:

```json
{
  "request_id": "unif_...",
  "data": {},
  "billing": { "records_charged": 1, "balance_remaining": 99 }
}
```

List endpoints return an array in `data` plus `pagination`:

```json
{
  "request_id": "unif_...",
  "data": [],
  "pagination": { "has_more": false, "next_cursor": null },
  "billing": { "records_charged": 1 }
}
```

When `pagination.has_more` is true, pass `pagination.next_cursor` as the next
request's `cursor` (`limit` sets page size). Always preserve `billing`.

## Core operations

| Need                         | Operation                          |
| ---------------------------- | ---------------------------------- |
| Story feed (hydrated)        | `hacker-news/stories/{feed}/items` |
| Story feed (ids only)        | `hacker-news/stories/{feed}`       |
| Item (story / comment)       | `hacker-news/items/{id}`           |
| User profile + karma         | `hacker-news/users/{id}`           |
| Recently changed             | `hacker-news/updates`              |
| Highest item id (scan bound) | `hacker-news/max-item`             |

`{feed}` ∈ `top` · `new` · `best` · `ask` · `show` · `jobs`.

Need a field not listed here? Use the `unifapi` skill's `get_operation` to read
the exact schema before calling — but pick the operation from this table, don't
discover blind.

## Workflow

The deterministic recipes. Pick the one that matches the job; each names exactly
what to call.

1. **Frame the watch.** Pick the feeds: `show` and `ask` for launches and
   questions, `top` and `best` for what's landing, `new` for the freshest.
2. **Scan a feed.** Call `hacker-news/stories/{feed}/items` (hydrated items in
   one call — cheaper than ids-then-fetch) and match stories by `title` or `url`
   to your product or category. Page via `next_cursor`.
3. **Read the thread.** On a matching item, read `score` (points) and
   `descendants` (comment count), then walk the `kids` ids with
   `hacker-news/items/{id}` to read the candid critique in the comment tree.
4. **Weight a critic.** Call `hacker-news/users/{id}` for `karma` and
   `submitted` to judge how much a commenter's take carries.
5. **Watch for change.** Call `hacker-news/updates` for recently changed items
   and profiles, or `hacker-news/max-item` to bound a fresh scan.
6. **Cite everything.** Every figure ties back to the HN item it came from;
   report `billing.records_charged` (or estimate when billing metadata is
   absent).

## Shape notes

- **`HackerNewsItem`** — `type` (`story` · `comment` · `job` · `poll` ·
  `pollopt`), `by`, `time`, `title`, `url`, `text`, `score` (points),
  `descendants` (comment count), `kids` (child comment **ids**, not objects),
  `parent`.
- **`HackerNewsUser`** — `id`, `created`, `karma`, `about`, `submitted` (item
  ids).
- **`HackerNewsUpdates`** — `items` and `profiles` that recently changed.

## Gotchas

- **No keyword search.** Discovery is feed-driven — scan `top/new/best/ask/show/
jobs` and match by `title`/`url`. Say so in the brief.
- `kids` are child comment **ids**, not embedded objects — recurse with
  `hacker-news/items/{id}` to read the comment tree.
- `descendants` is the comment count and `score` is the points — don't confuse
  them.
- Prefer `hacker-news/stories/{feed}/items` over `hacker-news/stories/{feed}`
  when you want the hydrated stories, not a list of ids.
- A low balance can silently truncate list pages: check
  `billing.truncated_due_to_balance` — when true the page is partial.

## Output

Return the records the calling workflow needs, each cited to its HN item, plus a
one-line cost note (`records_charged`). When this skill is used directly, a
compact reception brief is the default:

```markdown
**{Story title}** ({feed}) — {score} points, {descendants} comments. Landed: {yes/no}. Candid takes: "{quote}" (by {user}, {karma} karma). Evidence: {item URLs}. Records: ~{N}.
```

## Related skills

- **competitor-launch-monitor** (Competitive Intelligence), **social-listening-brief** (Social Listening) — launch-reception and listening work on top of this read path.
- **unifapi** — the shared data skill: connect MCP and look up exact schemas with `get_operation`.
