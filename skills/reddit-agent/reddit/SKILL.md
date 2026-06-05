---
name: reddit
description: When a workflow needs public Reddit data through UnifAPI — subreddit profiles and rules, thread comment trees, user activity and karma, the home/news/popular feeds, or trending searches. Also use on "research this subreddit," "what does r/... discuss," "pull this Reddit thread," "Reddit user activity," or when another skill (community research, social listening, customer research) needs the deterministic Reddit read path. Reddit has no keyword search — discovery is seed-driven. Connect via the `unifapi` skill first. Read-only research, never posts.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/agents/reddit
  source: https://github.com/unifapi-agent/agents
---

# reddit

The deterministic read path for public **Reddit** data through UnifAPI. This is a
**Data Skill**: it does not run a marketing job on its own — it names the
concrete `reddit/...` operations, response shapes, and the real coverage limits
so any community-first workflow (social listening, voice-of-customer) reads from
one known, honest recipe instead of rediscovering the surface each time.

Read-only — **eyes, not hands**. It researches public Reddit data and returns
cited records; it never posts, comments, or votes, and UnifAPI never holds
Reddit credentials.

## Use the `unifapi` skill for live evidence

Connect once through the shared **`unifapi`** skill (OAuth MCP), then call the
operations below. Reddit's public surface has **no keyword search**, so discovery
is seed-driven — say so in the output. Keep any `billing` metadata so the output
can state record cost.

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

| Need                      | Operation                                                       |
| ------------------------- | --------------------------------------------------------------- |
| Subreddit profile + rules | `reddit/subreddits/{name}`                                      |
| Discover threads          | `reddit/feed/popular` · `reddit/feed/news` · `reddit/feed/home` |
| Trending searches         | `reddit/trending-searches`                                      |
| Post by id                | `reddit/posts/{id}`                                             |
| Comment tree on a thread  | `reddit/posts/{id}/comments`                                    |
| User profile + karma      | `reddit/users/{username}`                                       |
| User posts / comments     | `reddit/users/{username}/posts` · `.../comments`                |

Need a field not listed here? Use the `unifapi` skill's `get_operation` to read
the exact schema before calling — but pick the operation from this table, don't
discover blind.

## Workflow

The deterministic recipes. Pick the one that matches the job; each names exactly
what to call.

1. **Seed the communities.** Reddit has no keyword search, so name the subreddits
   the audience lives in and call `reddit/subreddits/{name}` for
   `subscribers_count`, `active_count`, `is_nsfw`, and the rules in
   `description`.
2. **Discover threads.** Scan `reddit/feed/popular`, `reddit/feed/news`, and
   `reddit/feed/home`, plus `reddit/trending-searches`, and keep the posts whose
   `subreddit` field matches your seeds — that is how you find community threads
   without a per-subreddit feed.
3. **Mine a thread.** With a post id, call `reddit/posts/{id}` for the post and
   `reddit/posts/{id}/comments` for the comment tree; capture the upvoted
   (`score`) verbatim language. Page via `next_cursor`.
4. **Track power users.** Call `reddit/users/{username}` for karma, then
   `.../posts` and `.../comments` for what an active member contributes across
   the niche.
5. **Flag outreach safety.** Read each subreddit's rules from `description` and
   `is_nsfw` before suggesting any participation.
6. **Cite everything.** Every quote ties back to its thread or comment; state
   plainly that coverage is seed-driven, not exhaustive, and report
   `billing.records_charged`.

## Shape notes

- **`RedditSubreddit`** — keyed by `{name}`. `subscribers_count`,
  `active_count`, `is_nsfw`, `description` (carries rules), `prefixed_name`
  (`r/...`).
- **`RedditPost`** — `title`, `url`, `text`, `created_at`, `subreddit`,
  `is_stickied`, `is_locked`, `is_nsfw`. Use the `subreddit` field to filter
  feed results back to a community.
- **`RedditComment`** — `text`, `score` (upvotes), `author_name`, `is_locked`.
- **`RedditUser`** — `name`, `karma_total`, `karma_from_posts`,
  `karma_from_comments`, `is_verified`, `is_employee`.

## Gotchas

- **No keyword search.** You cannot query Reddit by term — discovery comes from
  the global `feed/*` endpoints, `trending-searches`, and the subreddits/users
  you already name. Say so in the brief.
- **No per-subreddit post feed.** `reddit/subreddits/{name}` returns the profile
  and rules only; to read a community's threads, filter the global feeds by the
  `subreddit` field, start from a known post id, or read active users' posts.
- A low balance can silently truncate list pages: check
  `billing.truncated_due_to_balance` — when true the page is partial.

## Output

Return the records the calling workflow needs, each cited to its thread or
comment, plus a one-line cost note (`records_charged`). When this skill is used
directly, a compact community brief is the default:

```markdown
**r/{subreddit}** — {subscribers} subscribers, {active} active. Recurring questions: {themes}. Verbatim: "{quote}" ({score} upvotes). Outreach rules: {note}. Coverage: seed-driven. Evidence: {URLs}. Records: ~{N}.
```

## Related skills

- **reddit-community-research** (Lead & Company Research) — turns this read path into a structured community map.
- **social-listening-brief** (Social Listening), **customer-research** — listening and voice-of-customer work on top of Reddit reads.
- **unifapi** — the shared data skill: connect MCP and look up exact schemas with `get_operation`.
