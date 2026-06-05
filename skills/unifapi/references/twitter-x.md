# X/Twitter Reference

Use this when a workflow needs public X/Twitter data through UnifAPI. The current Twitter integration is backed by RapidAPI SocialLab, but the public contract uses X-style `/x/...` paths. Do not use old `/twitter/...` paths.

## Response Contract

Single-entity endpoints return the object in `data`:

```json
{
  "request_id": "unif_...",
  "data": {},
  "billing": {
    "credits_charged": 1,
    "records_charged": 1,
    "balance_remaining": 99,
    "truncated_due_to_balance": false
  }
}
```

List endpoints return an array in `data` plus `pagination`:

```json
{
  "request_id": "unif_...",
  "data": [],
  "pagination": { "has_more": false, "next_cursor": null },
  "billing": {
    "credits_charged": 1,
    "records_charged": 1,
    "balance_remaining": 98,
    "truncated_due_to_balance": false
  }
}
```

Use `pagination.next_cursor` as the next request's `pagination_token` when `has_more` is true. `next_token` is also accepted for compatibility. Keep `billing` when reporting cost.

## Core Operations

| Need                      | Operation                                                    |
| ------------------------- | ------------------------------------------------------------ |
| Profile by handle         | `GET /x/users/by/username/{username}`                        |
| Profiles by handles       | `GET /x/users/by?usernames=a,b`                              |
| Profile by id             | `GET /x/users/{id}`                                          |
| Profiles by ids           | `GET /x/users?ids=123,456`                                   |
| Recent authored posts     | `GET /x/users/{id}/tweets?max_results=10&exclude=replies`    |
| Search recent posts       | `GET /x/tweets/search/recent?query=...&max_results=10`       |
| Autocomplete users/topics | `GET /x/autocomplete?query=...`                              |
| Post by id                | `GET /x/tweets/{id}`                                         |
| Posts by ids              | `GET /x/tweets?ids=123,456`                                  |
| Followers/following       | `GET /x/users/{id}/followers`, `GET /x/users/{id}/following` |
| Trends                    | `GET /x/trends/by/woeid/{woeid}`                             |

## KOL Research Recipe

1. Strip the leading `@` from each handle.
2. Call `GET /x/users/by/username/{username}`.
3. Read `data.id` from the profile response.
4. Call `GET /x/users/{id}/tweets?max_results=10&exclude=replies`.
5. Use `data.public_metrics.followers_count` and tweet `public_metrics` for engagement.
6. For the next page of posts, call `GET /x/users/{id}/tweets?pagination_token={pagination.next_cursor}`.

For discovery from a topic, start with `GET /x/tweets/search/recent?query=...` for recent posts or `GET /x/autocomplete?query=...` for user/topic suggestions, then resolve handles with the profile operation above.

## Shape Notes

`XUser` metrics are nested under `public_metrics`: `followers_count`, `following_count`, `tweet_count`, and `listed_count`. Profile flags live at top level: `protected`, `verified`, and `verified_type`.

`XTweet` metrics are nested under `public_metrics`: `like_count`, `retweet_count`, `reply_count`, `quote_count`, `bookmark_count`, and `impression_count`. Tweets may include `author` and `media` when available.

## Old Path Migration

| Old path                              | Current path                                                                                  |
| ------------------------------------- | --------------------------------------------------------------------------------------------- |
| `/twitter/users/{screen_name}`        | `/x/users/by/username/{username}`                                                             |
| `/twitter/users/{screen_name}/tweets` | `/x/users/{id}/tweets` after resolving the handle to `data.id`                                |
| `/twitter/search`                     | `/x/tweets/search/recent?query=...`; use `/x/autocomplete?query=...` for user/topic discovery |
