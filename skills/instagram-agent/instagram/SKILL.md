---
name: instagram
description: When a workflow needs public Instagram data through UnifAPI — profiles and follower size, posts and reels with engagement, post comments, location pages, or search. Also use on "research these IG creators," "pull posts for," "Instagram follower count," "comments on this post," "is this a paid partnership," or when another skill (KOL pricing, creator shortlist, audience fit) needs the deterministic Instagram read path. Connect via the `unifapi` skill first. Read-only research, never posts or DMs.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/agents/instagram
  source: https://github.com/unifapi-agent/agents
---

# instagram

The deterministic read path for public **Instagram** data through UnifAPI. This
is a **Data Skill**: it does not run a marketing job on its own — it names the
concrete `instagram/...` operations, response shapes, and gotchas so any
creator-first workflow (shortlisting, audience-fit, pricing context) reads from
one known recipe instead of rediscovering the surface each time.

Read-only — **eyes, not hands**. It researches public Instagram data and returns
cited records; it never posts, comments, or DMs, and UnifAPI never holds
Instagram credentials.

## Use the `unifapi` skill for live evidence

Connect once through the shared **`unifapi`** skill (OAuth MCP), then call the
operations below. Profiles are keyed by **`{username}`** and posts by their
**`{shortcode}`** (the URL segment) — `instagram/resolve/*` maps between
username↔user-id and shortcode↔media-id when you need it. Keep any `billing`
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

| Need                     | Operation                                                     |
| ------------------------ | ------------------------------------------------------------- |
| Profile by handle        | `instagram/users/{username}`                                  |
| Posts / reels            | `instagram/users/{username}/posts` · `.../reels`              |
| Stories / highlights     | `instagram/users/{username}/stories` · `.../highlights`       |
| Followers / following    | `instagram/users/{username}/followers` · `.../following`      |
| Tagged posts             | `instagram/users/{username}/tagged-posts`                     |
| Post by shortcode        | `instagram/posts/{shortcode}`                                 |
| Post comments / replies  | `instagram/posts/{shortcode}/comments`                        |
| Discover                 | `instagram/search` (`?q=...`) · `instagram/explore`           |
| Location page + posts    | `instagram/locations/{id}` · `instagram/locations/{id}/posts` |
| Resolve handle/shortcode | `instagram/resolve/user-id` · `instagram/resolve/shortcode`   |

Need a field not listed here? Use the `unifapi` skill's `get_operation` to read
the exact schema before calling — but pick the operation from this table, don't
discover blind.

## Workflow

The deterministic recipes. Pick the one that matches the job; each names exactly
what to call.

1. **Resolve a profile.** Call `instagram/users/{username}` for `follower_count`,
   `media_count`, `is_private`, and `is_verified`.
2. **Read content and engagement.** Call `instagram/users/{username}/posts` and
   `.../reels`; each `InstagramPost` carries `like_count`, `comment_count`, and
   `play_count`/`view_count` for video — and `is_paid_partnership` to flag
   sponsored content. Page via `next_cursor`.
3. **Read reaction.** Call `instagram/posts/{shortcode}/comments` (and the
   replies endpoint) for sentiment on a top post.
4. **Discover new handles.** Call `instagram/search?q=...`,
   `instagram/explore`, or `instagram/locations/{id}/posts`, then resolve the
   surfaced handles and loop to step 1.
5. **Map a network or audience.** Call `instagram/users/{username}/followers`,
   `.../following`, or `.../tagged-posts` (who features them) for reach work.
6. **Cite everything.** Every figure ties back to the post or profile it came
   from; report `billing.records_charged` (or estimate when billing metadata is
   absent).

## Shape notes

- **`InstagramUser`** — keyed by `{username}`. `follower_count`,
  `following_count`, `media_count`, `is_verified`, `is_private`.
- **`InstagramPost`** — keyed by `{shortcode}`. `caption`, `like_count`,
  `comment_count`, `play_count`, `view_count`, `taken_at`, `media_type`,
  `is_paid_partnership`, `user`, `location`, `carousel`.
- **`InstagramComment`** — `text`, `like_count`, `child_comment_count`.
- **`InstagramLocation`** — `name`, `lat`, `lng`, `media_count`.

## Gotchas

- Profiles are keyed by `{username}`, posts by `{shortcode}` — both read from the
  public IG URL. Use `instagram/resolve/*` only when you need the numeric
  user-id or media-id.
- A private account (`is_private`) exposes the profile but limits media — surface
  it, don't paper over thin coverage.
- `is_paid_partnership` marks disclosed sponsored posts — useful evidence for
  pricing and brand-safety, report it.
- A low balance can silently truncate list pages: check
  `billing.truncated_due_to_balance` — when true the page is partial.

## Output

Return the records the calling workflow needs, each cited to its post or
profile, plus a one-line cost note (`records_charged`). When this skill is used
directly, a compact creator summary is the default:

```markdown
**@handle** — {followers} followers, {media} posts, verified {yes/no}. Recent posts: avg {likes} likes / {comments} comments. Paid partnerships: {N}. Evidence: {post URLs}. Records: ~{N}.
```

## Related skills

- **kol-pricing**, **creator-shortlist**, **audience-fit-check** (Influencer Marketing) — price and vet Instagram creators on top of this read path.
- **unifapi** — the shared data skill: connect MCP and look up exact schemas with `get_operation`.
