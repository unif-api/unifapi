<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# TikTok Agent

> Platform Agent · run inside Claude, Claude Code, ChatGPT (custom MCP), Codex, Cursor, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The TikTok Agent turns public TikTok into creator and trend research: creator profiles and engagement, videos and comments, hashtag and music feeds, and search. It owns the TikTok Data Skill — the deterministic read path — and composes the Role-Agent Skills behind creator shortlisting, audience-fit, demand-radar, and local-buzz work — and never posts.

**Powered by:** [Influencer marketing](../influencer-marketing-agent/) · [Social listening](../social-listening-agent/) · [Content strategy](../content-strategy-agent/)

## Who it's for

- Influencer teams discovering and vetting TikTok creators
- Marketers tracking rising dishes, treatments, or formats
- Local brands reading TikTok buzz for their category

## Skills in this agent

- [`tiktok`](tiktok/) — The deterministic guide to reading public TikTok data through UnifAPI — creators, videos, comments, hashtags, music, and search. _(data)_
- [`creator-shortlist`](../influencer-marketing-agent/creator-shortlist/) — Find creators by niche, audience language, recent momentum, and platform fit. _(enhanced · shared)_
- [`audience-fit-check`](../influencer-marketing-agent/audience-fit-check/) — Vet a single creator's audience fit and brand-safety from public posts and engagement before outreach. _(enhanced · shared)_
- [`social-listening-brief`](../social-listening-agent/social-listening-brief/) — Track public mentions and return a concise brief instead of a dashboard. _(enhanced · shared)_
- [`treatment-demand-radar`](../med-spa-marketing/treatment-demand-radar/) — Map treatment search demand and social trends to a clinic's service menu and content plan. _(enhanced · shared)_
- [`menu-demand-radar`](../restaurant-marketing/menu-demand-radar/) — Map demand for a venue's cuisine and dishes across local search, AI answers, and TikTok to prioritize content and promos. _(enhanced · shared)_
- [`restaurant-local-buzz`](../restaurant-marketing/restaurant-local-buzz/) — Audit a venue's local-pack rank, review themes, and recent TikTok buzz for its cuisine and category. _(enhanced · shared)_

## What you get

- Creator profiles with follower and engagement records
- Video, comment, hashtag, and music-trend signal
- Rising formats and topics for the niche, dated
- Each figure cited to the public video

## Run it

Install once — one plugin gives your assistant the skills **and** the UnifAPI public-data MCP server (OAuth, read-only). Then ask:

```text
Research TikTok for my niche: find relevant creators and their engagement, pull the videos and comments that are spreading, and surface rising hashtags and trends. Return a cited brief — read-only, do not post.
```

## Reads from

UnifAPI APIs: **tiktok** — public data only.

> This is a read-only research agent for one platform. It reads public data and returns evidence — it never logs into, posts to, comments on, or messages on the platform, and it never holds your account credentials.

## FAQ

### Does it post or comment on TikTok?

No. The TikTok Agent is read-only research. Any posting is done by you from your own account; UnifAPI never holds TikTok credentials.

### How does it relate to the Influencer Marketing Agent?

Influencer Marketing organizes by job (shortlist, vet, price); the TikTok Agent is the TikTok data layer it shares, useful when the research is TikTok-first.

## Links

- Agent page: https://unifapi.com/agents/tiktok
- Install — one plugin, skills + live data: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: TikTok research tool · TikTok creator research · TikTok trend research · TikTok research agent · TikTok hashtag research · TikTok MCP server</sub>
