---
name: threads
description: When a workflow needs public Threads (Meta) data through UnifAPI — recent and top post search on a term, profiles, or a handle's posts, replies, and reposts. Also use on "what's being said on Threads about," "newest vs top Threads posts," "Threads profile for," or when another skill (social listening, content opportunity) needs the deterministic Threads read path. Connect via the `unifapi` skill first. Read-only research, never posts.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/agents/threads
  source: https://github.com/unifapi-agent/agents
---

# threads

The deterministic read path for public **Threads** (Meta) data through UnifAPI.
This is a **Data Skill**: it does not run a marketing job on its own — it names
the concrete `threads/...` operations, response shapes, and gotchas so any
text-first listening or content workflow reads from one known recipe instead of
rediscovering the surface each time.

Read-only — **eyes, not hands**. It researches public Threads data and returns
cited records; it never posts or replies, and UnifAPI never holds Threads
credentials.

## Use the `unifapi` skill for live evidence

Connect once through the shared **`unifapi`** skill (OAuth MCP), then call the
operations below. Profiles are keyed by **`{username}`**. Keep any `billing`
metadata so the output can state record cost.

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
request's `cursor`. Always preserve `billing` when reporting cost.

## Core operations

| Need                      | Operation                            |
| ------------------------- | ------------------------------------ |
| Newest posts on a term    | `threads/search/recent` (`?q=...`)   |
| Most-seen posts on a term | `threads/search/top` (`?q=...`)      |
| Profiles on a term        | `threads/search/profiles` (`?q=...`) |
| Profile by handle         | `threads/users/{username}`           |
| A handle's posts          | `threads/users/{username}/posts`     |
| A handle's replies        | `threads/users/{username}/replies`   |
| A handle's reposts        | `threads/users/{username}/reposts`   |

Need a field not listed here? Use the `unifapi` skill's `get_operation` to read
the exact schema before calling — but pick the operation from this table, don't
discover blind.

## Workflow

The deterministic recipes. Pick the one that matches the job; each names exactly
what to call.

1. **Set the term.** For brand or category listening, call
   `threads/search/recent?q=...` (newest) and `threads/search/top?q=...`
   (most-seen) together — recent catches the live conversation, top catches the
   takes that actually spread. Page via `next_cursor`.
2. **Find handles.** Call `threads/search/profiles?q=...` to surface accounts on
   the term, then `threads/users/{username}` for follower size and `biography`.
3. **Read a profile's activity.** Call `threads/users/{username}/posts`,
   `.../replies`, and `.../reposts` for what a handle says, answers, and
   amplifies.
4. **Cluster takes.** Group `text` across the recent and top results into
   questions and opinions; `like_count` ranks which takes resonate.
5. **Cite everything.** Every quote ties back to its post or profile; report
   `billing.records_charged` (or estimate when billing metadata is absent).

## Shape notes

- **`ThreadsUser`** — keyed by `{username}`. `full_name`, `biography`,
  `follower_count`, `is_verified`, `is_private`.
- **`ThreadsPost`** — `code` (the URL segment), `text`, `taken_at`,
  `like_count`, `image_url`, `video_url`, `user`.

## Gotchas

- `search/recent` is the newest and `search/top` is the most-seen — use both for
  a balanced read; either alone skews recency or popularity.
- Posts expose `like_count` only — there are no reply/repost counts on the post
  object. Gauge spread from the `search/top` ranking, not a repost number.
- A private handle (`is_private`) limits what you can read — surface it.
- A low balance can silently truncate list pages: check
  `billing.truncated_due_to_balance` — when true the page is partial.

## Output

Return the records the calling workflow needs, each cited to its post or
profile, plus a one-line cost note (`records_charged`). When this skill is used
directly, a compact listening brief is the default:

```markdown
**"{term}" on Threads** — {N} recent / {N} top posts. Takes: {themes}. Loudest: "{quote}" ({likes} likes, by @handle). Evidence: {post URLs}. Records: ~{N}.
```

## Related skills

- **social-listening-brief** (Social Listening), **content-opportunity-brief** (Content Strategy) — listening and content-idea work on top of this read path.
- **unifapi** — the shared data skill: connect MCP and look up exact schemas with `get_operation`.
