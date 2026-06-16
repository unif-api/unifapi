---
name: youtube
description: When a workflow needs public YouTube data through UnifAPI — channel, video, and playlist metadata, subscriber/view/like counts, video comments, caption tracks, channel community posts, related and trending videos, hashtag videos, and search across videos, channels, and playlists. Also use on "who owns this topic on YouTube," "pull this channel's videos," "YouTube view counts," "what are commenters saying," "get this video's captions/transcript," "this channel's playlists," or when another skill (creator vetting, competitor reception, content demand) needs the deterministic YouTube read path. Connect via the `unifapi` skill first. Read-only research, never uploads.
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

| Need                        | Operation                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| Search videos               | `youtube/search` (`?q=...`, optional `sort_by`/`upload_date`/`duration`/`region`/`language`) |
| Search channels / playlists | `youtube/search/channels` · `youtube/search/playlists` (`?q=...`)                            |
| Trending                    | `youtube/trending` (optional `type` = now/music/gaming/movies)                               |
| Hashtag videos              | `youtube/hashtags/{tag}/videos`                                                              |
| Resolve handle/URL → id     | `youtube/resolve/channel-id` (`?url=...`)                                                    |
| Channel page                | `youtube/channels/{channel_id}`                                                              |
| Channel videos / shorts     | `youtube/channels/{channel_id}/videos` · `.../shorts`                                        |
| Channel playlists           | `youtube/channels/{channel_id}/playlists`                                                    |
| Channel community posts     | `youtube/channels/{channel_id}/community`                                                    |
| Search within a channel     | `youtube/channels/{channel_id}/search` (`?q=...`)                                            |
| Video metadata              | `youtube/videos/{video_id}`                                                                  |
| Related videos              | `youtube/videos/{video_id}/related`                                                          |
| Video comments              | `youtube/videos/{video_id}/comments` (optional `sort_by` = top/newest)                       |
| Video captions / transcript | `youtube/videos/{video_id}/captions`                                                         |
| Playlist page / videos      | `youtube/playlists/{playlist_id}` · `.../videos`                                             |

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
   `next_cursor`. `youtube/channels/{channel_id}/playlists` maps how the catalog
   is organized; `youtube/channels/{channel_id}/community` reads announcements and
   engagement outside videos; `youtube/channels/{channel_id}/search?q=...` finds a
   creator's coverage of one topic without scanning the whole catalog.
4. **Read a video and its neighborhood.** Call `youtube/videos/{video_id}` for
   metadata (now including `like_count`, `category`, `published_at`,
   `has_captions`), then `youtube/videos/{video_id}/related` to map adjacent
   demand and competing content.
5. **Read audience and transcript.** Call `youtube/videos/{video_id}/comments`
   (`sort_by` top/newest) for what the audience says — raw comment text, like and
   reply counts; any sentiment or FAQ grouping is yours to compute, the API
   returns text only. Call `youtube/videos/{video_id}/captions` for caption tracks
   (timed-text url per language) to read or analyze the transcript.
6. **Walk a playlist or hashtag.** Call `youtube/playlists/{playlist_id}` then
   `.../videos` to ingest a curated series in order; `youtube/hashtags/{tag}/videos`
   tracks a campaign or trend across creators.
7. **Size topic demand.** Aggregate `view_count` across the search and related
   results for a topic; `title`, `description`, and `keywords` show how the topic
   is framed.
8. **Cite everything.** Every figure ties back to the video or channel it came
   from; report `billing.records_charged` (or estimate when billing metadata is
   absent).

## Shape notes

- **`YouTubeChannel`** — keyed by `{channel_id}`. `subscriber_count`,
  `video_count`, `view_count`, `handle`, `keywords`, `links`, `country`,
  `created_at`. `is_verified` is **not populated by the upstream and is always
  `false`** — don't report verification you can't read.
- **`YouTubeVideo`** — keyed by `{video_id}`. `view_count`, `like_count`
  (best-effort; `0` when the creator hides it), `category`, `channel_id`,
  `author`, `duration_seconds`, `keywords`, `published_at`, `has_captions`,
  `is_live`, `is_private`.
- **`YouTubeVideoPreview`** — search/related/list rows: adds `published_time`.
  `category` is part of the shape but empty on list rows (only `YouTubeVideo`
  detail carries it).
- **`YouTubeComment`** — `text`, `author`, `author_channel_id`, `like_count`,
  `reply_count`, `published_time`, `is_verified`, `is_creator`. Text only — no
  sentiment field.
- **`YouTubeCaptions`** — `video_id`, `tracks[]` (`language_code`, timed-text
  `url`, `is_translatable`), `translation_languages[]`. Single object, billed as
  one record. Track urls are time-limited.
- **`YouTubePlaylist`** / **`YouTubePlaylistPreview`** — playlist `title`,
  `channel_id`, `author`, `video_count` (detail adds `view_count`,
  `last_updated`; preview adds `first_video_id`).
- **`YouTubeChannelPreview`** — search-channels rows: `title`, `handle`,
  `description`, `subscriber_count`, `video_count`.
- **`YouTubeCommunityPost`** — `text`, `author`, `vote_count`, `reply_count`,
  `attachment_type`, `image_url`.

## Gotchas

- **Resolve only goes to channel ids.** `youtube/resolve/channel-id?url=...`
  resolves a handle or URL to a `{channel_id}` — call it **before** any
  `youtube/channels/{channel_id}/...` call. There is no video- or playlist-id
  resolver; pass a known `{video_id}` / `{playlist_id}` (parse it from the URL
  yourself).
- **Comments are raw text.** `youtube/videos/{video_id}/comments` returns comment
  text plus like/reply counts — no sentiment, no FAQ grouping. Compute those
  yourself from the text; don't claim a sentiment field the API doesn't return.
- **`like_count` is best-effort.** `YouTubeVideo.like_count` is `0` when the
  creator hides likes — treat `0` as "hidden or none," not authoritative.
- **`is_verified` is always `false`** for channels (upstream doesn't expose it) —
  don't report channel verification.
- **Captions can be empty.** A video with captions disabled returns
  `tracks: []`; check before promising a transcript. Track urls are time-limited.
- **Hashtags** take the tag with or without a leading `#`
  (`youtube/hashtags/lofi/videos`).
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
