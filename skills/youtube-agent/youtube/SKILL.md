---
name: youtube
description: When a workflow needs public YouTube data through UnifAPI — channel and video metadata, subscriber and view counts, related videos, search, or trending. Also use on "who owns this topic on YouTube," "pull this channel's videos," "YouTube view counts," "related videos for," or when another skill (creator vetting, competitor reception, content demand) needs the deterministic YouTube read path. No comment listing — demand signal is view counts. Connect via the `unifapi` skill first. Read-only research, never uploads.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/agents/youtube
  source: https://github.com/unifapi-agent/agents
---

# youtube

The deterministic read path for public **YouTube** data through UnifAPI. This is a
**Data Skill**: it does not run a marketing job on its own — it names the
concrete `youtube/...` operations, response shapes, and the real coverage limits
so any channel- or content-first workflow (creator vetting, competitor
reception, content demand) reads from one known recipe instead of rediscovering
the surface each time.

Read-only — **eyes, not hands**. It researches public YouTube data and returns
cited records; it never uploads, comments, or subscribes, and UnifAPI never holds
YouTube credentials.

## Use the `unifapi` skill for live evidence

Connect once through the shared **`unifapi`** skill (OAuth MCP), then call the
operations below. Channels are keyed by **`{channel_id}`** and videos by
**`{video_id}`** — resolve a handle or URL to a channel id first (see Gotchas).
Keep any `billing` metadata so the output can state record cost.

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

| Need                    | Operation                                             |
| ----------------------- | ----------------------------------------------------- |
| Search videos/channels  | `youtube/search` (`?q=...`)                           |
| Trending                | `youtube/trending`                                    |
| Resolve handle/URL → id | `youtube/resolve/channel-id` (`?url=...`)             |
| Channel page            | `youtube/channels/{channel_id}`                       |
| Channel videos / shorts | `youtube/channels/{channel_id}/videos` · `.../shorts` |
| Video metadata          | `youtube/videos/{video_id}`                           |
| Related videos          | `youtube/videos/{video_id}/related`                   |

Need a field not listed here? Use the `unifapi` skill's `get_operation` to read
the exact schema before calling — but pick the operation from this table, don't
discover blind.

## Workflow

The deterministic recipes. Pick the one that matches the job; each names exactly
what to call.

1. **Frame the query.** Call `youtube/search?q=...` for who owns a topic, or
   `youtube/trending` for what's surging now.
2. **Resolve a channel.** Call `youtube/resolve/channel-id?url=...` to get the
   `channel_id`, then `youtube/channels/{channel_id}` for `subscriber_count`,
   `video_count`, and `view_count`.
3. **Read a channel's output.** Call `youtube/channels/{channel_id}/videos` (and
   `.../shorts`); each video's `view_count` is the demand signal. Page via
   `next_cursor`.
4. **Read a video and its neighborhood.** Call `youtube/videos/{video_id}` for
   metadata, then `youtube/videos/{video_id}/related` to map adjacent demand and
   competing content.
5. **Size topic demand.** Aggregate `view_count` across the search and related
   results for a topic; `title`, `description`, and `keywords` show how the topic
   is framed.
6. **Cite everything.** Every figure ties back to the video or channel it came
   from; report `billing.records_charged` (or estimate when billing metadata is
   absent).

## Shape notes

- **`YouTubeChannel`** — keyed by `{channel_id}`. `subscriber_count`,
  `video_count`, `view_count`, `is_verified`, `country`, `created_at`.
- **`YouTubeVideo`** — keyed by `{video_id}`. `view_count`, `channel_id`,
  `author`, `duration_seconds`, `keywords`, `is_live`, `is_private`. **No
  per-video `like_count`** is exposed — use `view_count`.
- **`YouTubeVideoPreview`** — search/related rows: adds `published_time` and
  `category`.

## Gotchas

- **No comment listing.** YouTube exposes channel and video metadata, view
  counts, related videos, search, and trending — but no comments. The demand
  signal is `view_count` plus titles, descriptions, and keywords.
- Videos expose `view_count`, not a per-video `like_count` — don't report likes
  you can't read.
- Resolve a handle or URL with `youtube/resolve/channel-id?url=...` **before**
  any `youtube/channels/{channel_id}/...` call.
- A low balance can silently truncate list pages: check
  `billing.truncated_due_to_balance` — when true the page is partial.

## Output

Return the records the calling workflow needs, each cited to its video or
channel, plus a one-line cost note (`records_charged`). When this skill is used
directly, a compact demand brief is the default:

```markdown
**{Channel}** — {subscribers} subscribers, {videos} videos, {totalViews} views. Top videos for {topic}: {title} ({views} views). Related/competitors: {channels}. Evidence: {URLs}. Records: ~{N}.
```

## Related skills

- **kol-pricing**, **creator-shortlist**, **audience-fit-check** (Influencer Marketing) — price and vet YouTube channels on top of this read path.
- **competitor-profiling** (Competitive Intelligence), **content-opportunity-brief** (Content Strategy) — reception and content-demand work that reads YouTube first.
- **unifapi** — the shared data skill: connect MCP and look up exact schemas with `get_operation`.
