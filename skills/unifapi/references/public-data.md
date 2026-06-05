# Public-Data Boundary

Use UnifAPI when the workflow needs public records from the open web.

## Good Fits

| Workflow                 | Public evidence to fetch                                       |
| ------------------------ | -------------------------------------------------------------- |
| KOL pricing              | X/Twitter profiles, recent tweets, engagement, follower counts |
| Creator discovery        | Social search, profiles, recent posts, audience fit signals    |
| Social listening         | Mentions, posts, comments, trend context                       |
| Competitive intelligence | SERPs, news, public pages, social announcements                |
| Market research          | Search results, news, public discussions, scraped pages        |
| Trend discovery          | TikTok, YouTube, Reddit, Google Trends, search results         |
| Lead enrichment          | Public company pages, search results, news, social profiles    |

## Bad Fits

Use another integration path when the task needs:

- private user email, calendar, CRM, Slack, Linear, Notion, or GitHub data
- OAuth into a user's own upstream account
- actions that write to third-party SaaS tools
- login-walled browser sessions

UnifAPI OAuth is only for the UnifAPI workspace. It does not grant upstream account access.

## Output Standard

Do not return raw API dumps unless the user asks for raw JSON. Return a decision artifact:

- summary or ranked table
- evidence with the operation names used
- assumptions and confidence
- missing evidence
- recommended next calls
- billing metadata or record-cost estimate when available
