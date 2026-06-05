---
name: tiktok
description: When a workflow needs public TikTok data through UnifAPI — creator profiles and engagement, videos and comments, hashtag and music feeds, or search. Also use on "find TikTok creators for," "pull videos for," "TikTok follower count," "search TikTok for," "rising hashtags," or when another skill (creator shortlist, audience fit, demand radar, local buzz) needs the deterministic TikTok read path. Connect via the `unifapi` skill first. Read-only research, never posts.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/agents/tiktok
  source: https://github.com/unifapi-agent/agents
---

# tiktok

The deterministic read path for public **TikTok** data through UnifAPI. This is a
**Data Skill**: it does not run a marketing job on its own — it names the
concrete `tiktok/...` operations, response shapes, and gotchas so any creator- or
trend-first workflow (shortlisting, audience-fit, demand radar, local buzz) reads
from one known recipe instead of rediscovering the surface each time.

Read-only — **eyes, not hands**. It researches public TikTok data and returns
cited records; it never posts, comments, or follows, and UnifAPI never holds
TikTok credentials.

## Use the `unifapi` skill for live evidence

Connect once through the shared **`unifapi`** skill (OAuth MCP), then call the
operations below. TikTok users and videos are keyed by **numeric id** — resolve a
`@handle` or a video URL to its id first (see Gotchas). Keep any `billing`
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
request's `cursor` (`limit` sets page size). Always preserve `billing`.

## Core operations

| Need                          | Operation                                                     |
| ----------------------------- | ------------------------------------------------------------- |
| Resolve handle → id           | `tiktok/users/resolve` (`?username=...`)                      |
| Resolve video URL → id        | `tiktok/videos/resolve` (`?url=...`)                          |
| Search videos / users         | `tiktok/search/videos` · `tiktok/search/users` (`?q=...`)     |
| Search hashtags / mixed       | `tiktok/search/hashtags` · `tiktok/search` (`?q=...`)         |
| Creator profile               | `tiktok/users/{id}`                                           |
| Creator videos                | `tiktok/users/{id}/videos`                                    |
| Followers / following / likes | `tiktok/users/{id}/followers` · `.../following` · `.../likes` |
| Video + reaction              | `tiktok/videos/{id}` · `tiktok/videos/{id}/comments`          |
| Hashtag feed                  | `tiktok/hashtags/{id}` · `tiktok/hashtags/{id}/videos`        |
| Music feed                    | `tiktok/music/{id}` · `tiktok/music/{id}/videos`              |

Need a field not listed here? Use the `unifapi` skill's `get_operation` to read
the exact schema before calling — but pick the operation from this table, don't
discover blind.

## Workflow

The deterministic recipes. Pick the one that matches the job; each names exactly
what to call.

1. **Discover by topic.** Call `tiktok/search/videos?q=...`,
   `tiktok/search/users?q=...`, or `tiktok/search/hashtags?q=...` for the niche;
   use `tiktok/search?q=...` for a mixed result.
2. **Resolve a creator.** Call `tiktok/users/resolve?username=...` to get the
   numeric id, then `tiktok/users/{id}` for `follower_count`, `like_count`, and
   `video_count`.
3. **Read engagement.** Call `tiktok/users/{id}/videos`; each `Video` carries
   `view_count`, `like_count`, `comment_count`, and `share_count` — compute
   engagement per video. Page via `next_cursor`.
4. **Read a video and its reaction.** Call `tiktok/videos/{id}` (resolve a URL
   with `tiktok/videos/resolve?url=...` first), then `tiktok/videos/{id}/comments`
   for sentiment.
5. **Track trends.** Call `tiktok/hashtags/{id}` for `video_count`/`view_count`
   and `tiktok/hashtags/{id}/videos` (or `tiktok/music/{id}/videos`) for what's
   spreading on a tag or sound.
6. **Map a network.** Call `tiktok/users/{id}/followers`, `.../following`, or
   `.../likes` for reach and affinity work.
7. **Cite everything.** Every figure ties back to the video or profile it came
   from; report `billing.records_charged` (or estimate when billing metadata is
   absent).

## Shape notes

- **`User`** — `username`, `display_name`, `follower_count`, `following_count`,
  `like_count`, `video_count`, `is_verified`, `is_private`, `region`.
- **`Video`** — `video_description`, `view_count`, `like_count`,
  `comment_count`, `share_count`, `duration`, `author`, `music`, `hashtags`,
  `create_time`.
- **`Hashtag`** — `name`, `video_count`, `view_count`, `is_commerce`.
- **`Music`** — `title`, `author`, `is_original`.

## Gotchas

- TikTok users and videos are keyed by **numeric id**. Resolve a `@handle` with
  `tiktok/users/resolve?username=...` and a video URL with
  `tiktok/videos/resolve?url=...` **before** any `tiktok/users/{id}/...` or
  `tiktok/videos/{id}/...` call.
- `tiktok/videos/batch` is a **POST** (ids in the body), not a GET — use it to
  hydrate many video ids at once.
- A private creator (`is_private`) limits what you can read — surface it.
- A low balance can silently truncate list pages: check
  `billing.truncated_due_to_balance` — when true the page is partial, so top up
  before trusting any count.

## Output

Return the records the calling workflow needs, each cited to its video or
profile, plus a one-line cost note (`records_charged`). When this skill is used
directly, a compact creator summary is the default:

```markdown
**@handle** — {followers} followers, {videos} videos. Recent videos: avg {views} views / {likes} likes / {comments} comments. Rising tags: {#hashtags}. Evidence: {video URLs}. Records: ~{N}.
```

## Related skills

- **creator-shortlist**, **audience-fit-check** (Influencer Marketing) — shortlist and vet TikTok creators on top of this read path.
- **social-listening-brief** (Social Listening), **treatment-demand-radar**, **menu-demand-radar**, **restaurant-local-buzz** (verticals) — trend and demand work that reads TikTok first.
- **unifapi** — the shared data skill: connect MCP and look up exact schemas with `get_operation`.
