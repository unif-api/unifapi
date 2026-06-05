---
name: linkedin
description: When a workflow needs public LinkedIn data through UnifAPI — company pages, follower/employee counts, open jobs and job-count, member insights, people, posts, or engagement. Also use on "research this company on LinkedIn," "who works at," "open roles at," "LinkedIn profile for," "company posts," or when another skill (account research, news signal, buying signal, competitor profiling) needs the deterministic LinkedIn read path. Connect via the `unifapi` skill first. Read-only research, never connects or messages.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/agents/linkedin
  source: https://github.com/unifapi-agent/agents
---

# linkedin

The deterministic read path for public **LinkedIn** data through UnifAPI. This is
a **Data Skill**: it does not run a marketing job on its own — it names the
concrete `linkedin/...` operations, response shapes, and gotchas so any
B2B-first workflow (account research, news signals, buying signals, competitor
profiling) reads from one known recipe instead of rediscovering the surface each
time.

Read-only — **eyes, not hands**. It researches public LinkedIn data and returns
cited records; it never connects, messages, or applies, and UnifAPI never holds
LinkedIn credentials.

## Use the `unifapi` skill for live evidence

Connect once through the shared **`unifapi`** skill (OAuth MCP), then call the
operations below. Companies are keyed by their public **`{slug}`** (the vanity
segment of the company URL) and people by their public **`{username}`** — read
both from the LinkedIn URL, not a numeric id. Keep any `billing` metadata so the
output can state record cost.

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

| Need                         | Operation                                                       |
| ---------------------------- | --------------------------------------------------------------- |
| Company page                 | `linkedin/companies/{slug}`                                     |
| Company headcount signal     | `linkedin/companies/{slug}/job-count` · `.../jobs`              |
| Company people               | `linkedin/companies/{slug}/people`                              |
| Member insights              | `linkedin/companies/{slug}/member-insights`                     |
| Company posts                | `linkedin/companies/{slug}/posts`                               |
| Person profile               | `linkedin/users/{username}` · `.../about` · `.../experience`    |
| Person reach                 | `linkedin/users/{username}/follower-count`                      |
| Person posts / reactions     | `linkedin/users/{username}/posts` · `.../reactions`             |
| Search people                | `linkedin/search/people` (`?title=&current_company=&industry=`) |
| Search jobs / posts          | `linkedin/search/jobs` · `linkedin/search/posts`                |
| Job / post by id             | `linkedin/jobs/{id}` · `linkedin/posts/{id}` (`.../comments`)   |
| Resolve a geocode / industry | `linkedin/search/locations` · `linkedin/search/industries`      |

Need a field not listed here? Use the `unifapi` skill's `get_operation` to read
the exact schema before calling — but pick the operation from this table, don't
discover blind.

## Workflow

The deterministic recipes. Pick the one that matches the job; each names exactly
what to call.

1. **Resolve an account.** Take the company `{slug}` from its LinkedIn URL, then
   call `linkedin/companies/{slug}` for `follower_count`, `employee_count`,
   `industries`, and `headquarters`.
2. **Size hiring as an investment signal.** Call
   `linkedin/companies/{slug}/job-count` (returns a single `total`) and
   `linkedin/companies/{slug}/jobs` for the open roles — a rising count or a
   cluster of senior roles is a growth/priority signal.
3. **Map the buying committee.** Call `linkedin/companies/{slug}/people` and
   `linkedin/companies/{slug}/member-insights`, or narrow with
   `linkedin/search/people?current_company=...&title=...` for specific roles.
4. **Read a person.** Call `linkedin/users/{username}` plus `.../about` and
   `.../experience`; `.../follower-count` for reach (a separate
   `LinkedinFollowerStats` object); `.../posts` for what they publish.
5. **Read posts and engagement.** Call `linkedin/companies/{slug}/posts` or
   `linkedin/users/{username}/posts`; each `LinkedinPost` carries `like_count`,
   `comment_count`, and `share_count`. Page via `next_cursor`.
6. **Search the surface.** Use `linkedin/search/people|jobs|posts` with filters;
   resolve a `geocode_location` via `linkedin/search/locations` and an industry
   id via `linkedin/search/industries` first.
7. **Cite everything.** Every claim ties back to the company, person, or post it
   came from; report `billing.records_charged` (or estimate when billing
   metadata is absent).

## Shape notes

- **`LinkedinCompany`** — keyed by `{slug}`. `follower_count`, `employee_count`,
  `employee_count_range`, `industries`, `headquarters`, `is_verified`.
- **`LinkedinUser`** — keyed by `{username}`. Profile flags at top level:
  `is_open_to_work`, `is_hiring`, `is_top_voice`, `is_creator`, `is_premium`.
  Follower/connection counts are **not** here — read them from
  `.../follower-count` (`LinkedinFollowerStats`: `follower_count`,
  `connection_count`).
- **`LinkedinPost`** — `like_count`, `comment_count`, `share_count`, `reactions`,
  `author`, `post_type`.
- **`LinkedinJob`** — `title`, `location`, `salary`, `level`, `employment_type`,
  `listed_at`, `company`. **`LinkedinJobCount`** is just `{ total }`.

## Gotchas

- Companies are keyed by `{slug}`, people by `{username}` — both read from the
  public LinkedIn URL, never a numeric id.
- Follower and connection counts come from
  `linkedin/users/{username}/follower-count`, not the base profile object.
- `linkedin/search/people` needs at least one filter — there is no all-of-LinkedIn
  dump.
- A low balance can silently truncate list pages: check
  `billing.truncated_due_to_balance` — when true the page is partial, so top up
  before trusting any count computed from it.

## Output

Return the records the calling workflow needs, each cited to its company,
person, or post, plus a one-line cost note (`records_charged`). When this skill
is used directly, a compact account brief is the default:

```markdown
**{Company}** — {followers} followers, {employees} employees, {industry}. Open roles: {N} ({trend}). Recent posts: {engagement}. Likely buyers: {names/titles}. Evidence: {URLs}. Records: ~{N}.
```

## Related skills

- **linkedin-account-research**, **account-news-signals** (Lead & Company Research) — turn this read path into account briefs and news-tied signals.
- **buying-signal-monitor** (Social Selling), **competitor-profiling** (Competitive Intelligence) — B2B intent and competitor work on top of LinkedIn reads.
- **unifapi** — the shared data skill: connect MCP and look up exact schemas with `get_operation`.
