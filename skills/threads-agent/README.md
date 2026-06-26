<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Threads Agent

> Platform Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The Threads Agent turns Meta's public Threads surface into text-first research: recent and top posts on a term, profiles, and replies. It owns the Threads Data Skill — the deterministic read path — and composes the Role-Agent Skills behind social-listening and content-opportunity work where Threads carries the conversation — and never posts.

**Powered by:** [Social listening](../social-listening-agent/) · [Content strategy](../content-strategy-agent/)

## Who it's for

- Brand teams listening to Threads chatter on a term
- Content teams catching text-first questions and takes
- Marketers joining Threads with X, Reddit, and news signal

## Skills in this agent

- [`threads`](threads/) — The deterministic guide to reading public Threads data through UnifAPI — recent and top post search, profiles, and replies. _(data)_
- [`social-listening-brief`](../social-listening-agent/social-listening-brief/) — Track public mentions and return a concise brief instead of a dashboard. _(enhanced · shared)_
- [`content-opportunity-brief`](../content-strategy-agent/content-opportunity-brief/) — Find repeated questions and formats across YouTube, TikTok, Reddit, and X. _(enhanced · shared)_

## What you get

- Recent and top posts on a term, with engagement
- Profile and reply context for a handle
- Text-first questions and takes for content ideas
- Each post cited and dated

## Install & run

Connect in a couple of steps — prompt, web connector, or plugin, all read-only with OAuth sign-in (new workspaces get free trial credits):

**Paste one prompt** (Claude Code, Codex, Cursor, OpenClaw, Goose — any agent that manages its own MCP servers): ask it to add the UnifAPI MCP server at `https://mcp.unifapi.com` — a remote streamable-HTTP, read-only server — and run the OAuth sign-in. No API key to paste.

**Web connector — no terminal** (Claude, ChatGPT, Perplexity, Grok): add a custom connector pointed at `https://mcp.unifapi.com`, then authorize over OAuth.

**Add the skills** in any client with `npx skills add unifapi-agent/agents`. Claude-compatible hosts (Claude Code, Claude Desktop, OpenClaw) can instead install skills + MCP together as a plugin: `/plugin marketplace add unifapi-agent/agents` then `/plugin install unifapi@unifapi`.

Step-by-step for every client → https://unifapi.com/mcp

Then ask your assistant:

```text
Research Threads for our brand and category: pull the newest and highest-engagement posts on the term, plus relevant profiles and replies. Return a cited brief — read-only, do not post.
```

## Reads from

UnifAPI APIs: **threads** — public data only.

> This is a read-only research agent for one platform. It reads public data and returns evidence — it never logs into, posts to, comments on, or messages on the platform, and it never holds your account credentials.

## FAQ

### Does it post on Threads?

No. The Threads Agent is read-only research. You post anything from your own account; UnifAPI never holds Threads credentials.

### How does it relate to the Social Listening Agent?

Social Listening organizes by job (a brief across surfaces); the Threads Agent is the Threads data layer it shares, useful when the conversation you want is Threads-first.

## Links

- Agent page: https://unifapi.com/agents/threads
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: Threads research tool · Threads social listening · Meta Threads research · Threads brand monitoring · Threads research agent · Threads MCP server</sub>
