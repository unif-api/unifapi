---
name: x-twitter
description: When a workflow needs public X/Twitter data through UnifAPI — profiles, posts, engagement, followers/following, recent search, autocomplete, or trends. Also use on "read this X handle," "pull tweets for," "X follower count," "search X for," "Twitter engagement," "X trends," or when another skill (KOL pricing, creator shortlist, buying signals, competitor/listening) needs the deterministic X read path. Connect via the `unifapi` skill first. Read-only research, never posts.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/agents/x-twitter
  source: https://github.com/unifapi-agent/agents
---

# x-twitter

The deterministic read path for public **X (Twitter)** data through UnifAPI. This
is a **Data Skill**: it does not run a marketing job on its own — it names the
concrete `x/...` operations, response shapes, and gotchas so any X-first
workflow (KOL pricing, creator vetting, buying signals, competitor and listening
work) reads from one known recipe instead of rediscovering the surface each time.

Read-only — **eyes, not hands**. It researches public X data and returns cited
records; it never posts, replies, follows, or DMs, and UnifAPI never holds X
credentials.

## Use the `unifapi` skill for live evidence

Connect once through the shared **`unifapi`** skill (OAuth MCP), then call the
operations below. The X integration is backed by RapidAPI SocialLab but the
public contract uses **X-style `/x/...` paths** — do **not** use legacy
`/twitter/...` paths. Keep any `billing` metadata so the output can state record
cost.

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
request's `pagination_token` (`next_token` is also accepted). Always preserve
`billing` when reporting cost.

## Core operations

| Need                      | Operation                                                   |
| ------------------------- | ----------------------------------------------------------- |
| Profile by handle         | `x/users/by/username/{username}`                            |
| Profiles by handles       | `x/users/by` (`?usernames=a,b`)                             |
| Profile by id             | `x/users/{id}`                                              |
| Profiles by ids           | `x/users` (`?ids=123,456`)                                  |
| Recent authored posts     | `x/users/{id}/tweets` (`?max_results=10&exclude=replies`)   |
| Search recent posts       | `x/tweets/search/recent` (`?query=...&max_results=10`)      |
| Autocomplete users/topics | `x/autocomplete` (`?query=...`)                             |
| Post by id / posts by ids | `x/tweets/{id}` · `x/tweets` (`?ids=123,456`)               |
| Who amplified a post      | `x/tweets/{id}/retweeted_by` · `x/tweets/{id}/quote_tweets` |
| Who liked a post          | `x/tweets/{id}/liking_users`                                |
| What a user likes         | `x/users/{id}/liked_tweets`                                 |
| Followers / following     | `x/users/{id}/followers` · `x/users/{id}/following`         |
| Verified followers        | `x/users/{id}/verified_followers`                           |
| Regional trends           | `x/trends/by/woeid/{woeid}`                                 |

Need a field not listed here? Use the `unifapi` skill's `get_operation` to read
the exact schema before calling — but pick the operation from this table, don't
discover blind.

## Workflow

The deterministic recipes. Pick the one that matches the job; each names exactly
what to call.

1. **Resolve a handle to a profile.** Strip the leading `@`, then call
   `x/users/by/username/{username}`. Read `data.id` (needed for every per-user
   call below) and `data.public_metrics.followers_count`.
2. **Read recent engagement.** With the id from step 1, call
   `x/users/{id}/tweets?max_results=10&exclude=replies`. Compute engagement from
   each tweet's `public_metrics` (`like_count`, `retweet_count`, `reply_count`,
   `quote_count`, `impression_count`). Page with
   `x/users/{id}/tweets?pagination_token={next_cursor}` when `has_more`.
3. **Trace who amplified a post.** With a tweet id from step 2, call
   `x/tweets/{id}/retweeted_by`, `x/tweets/{id}/quote_tweets`, or
   `x/tweets/{id}/liking_users` to see who reposted, quoted, or liked it — the
   amplification and intent signal behind buying-signal, listening, and
   competitor work. Use `x/users/{id}/liked_tweets` for what a user engages with.
   Page via `next_cursor`.
4. **Gauge audience quality.** Call `x/users/{id}/verified_followers`; it returns
   the verified followers as a paginated list, not a ready figure. Measure its
   size against `data.public_metrics.followers_count` from step 1 — that verified
   share is the real-vs-inflated signal that feeds confidence and warnings in
   downstream pricing/vetting skills. Page via `next_cursor` for a fuller count.
5. **Discover from a topic (no handles yet).** Call
   `x/tweets/search/recent?query=...` for recent matching posts, or
   `x/autocomplete?query=...` for user/topic suggestions, then resolve the
   surfaced handles with step 1.
6. **Map a network.** Call `x/users/{id}/followers` or `x/users/{id}/following`
   for audience-overlap or reach work; page via `next_cursor`.
7. **Read regional trends.** Call `x/trends/by/woeid/{woeid}` for what's trending
   in a location (WOEID), e.g. for listening or content-timing.
8. **Cite everything.** Every figure ties back to the post or profile it came
   from; report `billing.records_charged` (or estimate when billing metadata is
   absent).

## Shape notes

- **`XUser`** — metrics nested under `public_metrics`: `followers_count`,
  `following_count`, `tweet_count`, `listed_count`. Profile flags at top level:
  `protected`, `verified`, `verified_type`. Read `public_metrics`, not legacy
  flat fields.
- **`XTweet`** — metrics nested under `public_metrics`: `like_count`,
  `retweet_count`, `reply_count`, `quote_count`, `bookmark_count`,
  `impression_count`. May include `author` and `media` when available.

## Gotchas

- Use `/x/...` paths, never `/twitter/...` (legacy). Old `/twitter/users/{screen_name}`
  → `x/users/by/username/{username}`; old `/twitter/search` →
  `x/tweets/search/recent` (use `x/autocomplete` for user/topic discovery).
- A protected, too-old, or too-thin timeline lowers confidence — surface it,
  don't paper over it.
- Resolve the handle to `data.id` **before** any `x/users/{id}/...` call.
- A low balance can silently truncate list pages: check
  `billing.truncated_due_to_balance` — when true the page is partial, so top up
  before trusting any count or share computed from it.

## Output

Return the records the calling workflow needs, each cited to its post/profile,
plus a one-line cost note (`records_charged`). When this skill is used directly,
a compact profile + engagement summary per handle is the default:

```markdown
**@handle** — followers {N}, verified {yes/no}. Recent 10 posts: avg engagement {x}% ({likes}/{reposts}/{replies}). Evidence: {post URLs}. Records: ~{N}.
```

## Related skills

- **kol-pricing**, **creator-shortlist**, **audience-fit-check** (Influencer Marketing) — price and vet X creators on top of this read path.
- **buying-signal-monitor** (Social Selling), **competitor-profiling** (Competitive Intelligence), **social-listening-brief** (Social Listening) — X-first intent, competitor, and listening work.
- **unifapi** — the shared data skill: connect MCP and look up exact schemas with `get_operation`.
