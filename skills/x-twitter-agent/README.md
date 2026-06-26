<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# X (Twitter) Agent

> Platform Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The X Agent turns the public X / Twitter surface into agent-callable research: profiles and engagement, recent posts, quote-tweet and like sentiment, communities, lists, and regional trends. It owns the X (Twitter) Data Skill — the deterministic read path — and composes the Role-Agent Skills that back KOL pricing, creator vetting, buying-signal, and competitor work, all without browser automation, and never posts.

**Powered by:** [Influencer marketing](../influencer-marketing-agent/) · [Social selling](../social-selling-agent/) · [Competitive intel](../competitive-intelligence-agent/) · [Social listening](../social-listening-agent/)

## Who it's for

- Marketers researching creators, audiences, and pricing from public X data
- Sales teams reading public buying intent on X
- Competitive and brand teams sizing reaction and trends on X

## Skills in this agent

- [`x-twitter`](x-twitter/) — The deterministic guide to reading public X/Twitter data through UnifAPI — profiles, posts, engagement, followers, search, and trends. _(data)_
- [`kol-pricing`](../influencer-marketing-agent/kol-pricing/) — Estimate Twitter/X KOL rates from public engagement, audience fit, and risk. _(enhanced · shared)_
- [`creator-shortlist`](../influencer-marketing-agent/creator-shortlist/) — Find creators by niche, audience language, recent momentum, and platform fit. _(enhanced · shared)_
- [`audience-fit-check`](../influencer-marketing-agent/audience-fit-check/) — Vet a single creator's audience fit and brand-safety from public posts and engagement before outreach. _(enhanced · shared)_
- [`buying-signal-monitor`](../social-selling-agent/buying-signal-monitor/) — Watch public X and LinkedIn for buying intent and return warm leads, each anchored to the post that proves it. _(enhanced · shared)_
- [`competitor-profiling`](../competitive-intelligence-agent/competitor-profiling/) — Turn a competitor's public footprint into a structured, source-cited profile — positioning, product, pricing, and implications. _(enhanced · shared)_
- [`social-listening-brief`](../social-listening-agent/social-listening-brief/) — Track public mentions and return a concise brief instead of a dashboard. _(enhanced · shared)_

## What you get

- Profile + engagement records for handles you name
- Post, quote-tweet, like, and repost evidence with sentiment
- Community, list, and regional-trend signal
- Every figure cited to the public post

## Install & run

Connect in a couple of steps — prompt, web connector, or plugin, all read-only with OAuth sign-in (new workspaces get free trial credits):

**Paste one prompt** (Claude Code, Codex, Cursor, OpenClaw, Goose — any agent that manages its own MCP servers): ask it to add the UnifAPI MCP server at `https://mcp.unifapi.com` — a remote streamable-HTTP, read-only server — and run the OAuth sign-in. No API key to paste.

**Web connector — no terminal** (Claude, ChatGPT, Perplexity, Grok): add a custom connector pointed at `https://mcp.unifapi.com`, then authorize over OAuth.

**Add the skills** in any client with `npx skills add unifapi-agent/agents`. Claude-compatible hosts (Claude Code, Claude Desktop, OpenClaw) can instead install skills + MCP together as a plugin: `/plugin marketplace add unifapi-agent/agents` then `/plugin install unifapi@unifapi`.

Step-by-step for every client → https://unifapi.com/mcp

Then ask your assistant:

```text
Research these X accounts and the conversation around our category: pull profiles and recent engagement, the quote-tweet and like sentiment on their top posts, and any related trend. Return a cited brief — read-only, do not draft or post anything.
```

## Reads from

UnifAPI APIs: **twitter** — public data only.

> This is a read-only research agent for one platform. It reads public data and returns evidence — it never logs into, posts to, comments on, or messages on the platform, and it never holds your account credentials.

## FAQ

### Does it post or reply on X?

No. The X Agent is read-only — it researches public X data and returns evidence. You or your own assistant send anything from your own account; UnifAPI never holds X credentials.

### How is it different from the Influencer or Social Selling Agents?

Those Role Agents organize by job (pricing creators, finding warm leads). The X Agent organizes by source — it's the X data layer they share, useful when your research is X-first.

## Links

- Agent page: https://unifapi.com/agents/x-twitter
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: X research tool · Twitter research tool · X research agent · Twitter audience research · X MCP server · Twitter data for Claude</sub>
