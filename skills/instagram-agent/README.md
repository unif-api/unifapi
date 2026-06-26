<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Instagram Agent

> Platform Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The Instagram Agent turns the public Instagram surface into creator research: profiles and follower size, posts and reels, post comments, location pages, and search. It owns the Instagram Data Skill — the deterministic read path — and composes the Role-Agent Skills behind creator shortlisting, audience-fit, and pricing context — and never posts or DMs.

**Powered by:** [Influencer marketing](../influencer-marketing-agent/)

## Who it's for

- Influencer teams sizing Instagram creators before outreach
- Marketers vetting audience fit and engagement on IG
- Brand teams researching creators across IG, TikTok, and X

## Skills in this agent

- [`instagram`](instagram/) — The deterministic guide to reading public Instagram data through UnifAPI — profiles, posts, reels, comments, locations, and search. _(data)_
- [`kol-pricing`](../influencer-marketing-agent/kol-pricing/) — Estimate Twitter/X KOL rates from public engagement, audience fit, and risk. _(enhanced · shared)_
- [`creator-shortlist`](../influencer-marketing-agent/creator-shortlist/) — Find creators by niche, audience language, recent momentum, and platform fit. _(enhanced · shared)_
- [`audience-fit-check`](../influencer-marketing-agent/audience-fit-check/) — Vet a single creator's audience fit and brand-safety from public posts and engagement before outreach. _(enhanced · shared)_

## What you get

- Profile + follower records for handles you name
- Posts, reels, and post-comment signal
- Location-page and search context for discovery
- Each figure cited to the public post

## Install & run

Connect in a couple of steps — prompt, web connector, or plugin, all read-only with OAuth sign-in (new workspaces get free trial credits):

**Paste one prompt** (Claude Code, Codex, Cursor, OpenClaw, Goose — any agent that manages its own MCP servers): ask it to add the UnifAPI MCP server at `https://mcp.unifapi.com` — a remote streamable-HTTP, read-only server — and run the OAuth sign-in. No API key to paste.

**Web connector — no terminal** (Claude, ChatGPT, Perplexity, Grok): add a custom connector pointed at `https://mcp.unifapi.com`, then authorize over OAuth.

**Add the skills** in any client with `npx skills add unifapi-agent/agents`. Claude-compatible hosts (Claude Code, Claude Desktop, OpenClaw) can instead install skills + MCP together as a plugin: `/plugin marketplace add unifapi-agent/agents` then `/plugin install unifapi@unifapi`.

Step-by-step for every client → https://unifapi.com/mcp

Then ask your assistant:

```text
Research these Instagram creators: pull profiles and follower size, recent posts and reels with engagement, and the comments on their top posts. Return a cited audience-fit brief — read-only, do not post or DM.
```

## Reads from

UnifAPI APIs: **instagram** — public data only.

> This is a read-only research agent for one platform. It reads public data and returns evidence — it never logs into, posts to, comments on, or messages on the platform, and it never holds your account credentials.

## FAQ

### Does it post or DM on Instagram?

No. The Instagram Agent is read-only research. You send anything from your own account; UnifAPI never holds Instagram credentials.

### Which creator agents use it?

It's the Instagram data layer under the Influencer Marketing Agent's Skills — KOL pricing, creator shortlist, and audience-fit checks.

## Links

- Agent page: https://unifapi.com/agents/instagram
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: Instagram research tool · Instagram creator research · Instagram influencer research · Instagram research agent · Instagram audience research · Instagram MCP server</sub>
