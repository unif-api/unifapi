<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# YouTube Agent

> Platform Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The YouTube Agent turns public YouTube into channel and content research: channel and video metadata, view-count signal, related videos, search, and trending. It owns the YouTube Data Skill — the deterministic read path — and composes the Role-Agent Skills behind creator vetting, competitor demo reception, and content-demand work — and never uploads or comments.

**Powered by:** [Influencer marketing](../influencer-marketing-agent/) · [Competitive intel](../competitive-intelligence-agent/) · [Content strategy](../content-strategy-agent/)

## Who it's for

- Influencer teams vetting YouTube channels before spend
- Competitive teams reading demo and launch reception
- Content teams sizing video demand for a topic

## Skills in this agent

- [`youtube`](youtube/) — The deterministic guide to reading public YouTube data through UnifAPI — channels, videos, related content, search, and trending. _(data)_
- [`kol-pricing`](../influencer-marketing-agent/kol-pricing/) — Estimate Twitter/X KOL rates from public engagement, audience fit, and risk. _(enhanced · shared)_
- [`creator-shortlist`](../influencer-marketing-agent/creator-shortlist/) — Find creators by niche, audience language, recent momentum, and platform fit. _(enhanced · shared)_
- [`audience-fit-check`](../influencer-marketing-agent/audience-fit-check/) — Vet a single creator's audience fit and brand-safety from public posts and engagement before outreach. _(enhanced · shared)_
- [`competitor-profiling`](../competitive-intelligence-agent/competitor-profiling/) — Turn a competitor's public footprint into a structured, source-cited profile — positioning, product, pricing, and implications. _(enhanced · shared)_
- [`content-opportunity-brief`](../content-strategy-agent/content-opportunity-brief/) — Find repeated questions and formats across YouTube, TikTok, Reddit, and X. _(enhanced · shared)_

## What you get

- Channel and video metadata with view/like counts
- Related-video and trending signal for a niche
- Search-based demand for a topic or format
- Each figure cited to the public video or channel

## Install & run

Connect in a couple of steps — prompt, web connector, or plugin, all read-only with OAuth sign-in (new workspaces get free trial credits):

**Paste one prompt** (Claude Code, Codex, Cursor, OpenClaw, Goose — any agent that manages its own MCP servers): ask it to add the UnifAPI MCP server at `https://mcp.unifapi.com` — a remote streamable-HTTP, read-only server — and run the OAuth sign-in. No API key to paste.

**Web connector — no terminal** (Claude, ChatGPT, Perplexity, Grok): add a custom connector pointed at `https://mcp.unifapi.com`, then authorize over OAuth.

**Add the skills** in any client with `npx skills add unifapi-agent/agents`. Claude-compatible hosts (Claude Code, Claude Desktop, OpenClaw) can instead install skills + MCP together as a plugin: `/plugin marketplace add unifapi-agent/agents` then `/plugin install unifapi@unifapi`.

Step-by-step for every client → https://unifapi.com/mcp

Then ask your assistant:

```text
Research YouTube for my topic: pull the channels and videos that own it, their view and like counts, and related content. Return a cited brief on demand and the strongest channels — read-only, do not upload or comment.
```

## Reads from

UnifAPI APIs: **youtube** — public data only.

> This is a read-only research agent for one platform. It reads public data and returns evidence — it never logs into, posts to, comments on, or messages on the platform, and it never holds your account credentials.

## FAQ

### Can it read YouTube comments?

Not in this catalog — YouTube exposes channel and video metadata, view/like counts, related videos, search, and trending, but no comment listing. The agent uses titles, descriptions, and counts as the demand signal.

### Does it upload or comment?

No. The YouTube Agent is read-only research; you publish anything from your own account.

## Links

- Agent page: https://unifapi.com/agents/youtube
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: YouTube research tool · YouTube channel research · YouTube creator research · YouTube research agent · YouTube competitor research · YouTube MCP server</sub>
