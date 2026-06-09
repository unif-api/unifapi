<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Hacker News Agent

> Platform Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The Hacker News Agent turns HN's public feeds into developer-audience research: front-page, new, Show HN, and Ask HN stories, plus the comment trees that carry candid technical sentiment. It owns the Hacker News Data Skill — the deterministic read path — and composes the Role-Agent Skills behind launch-reception and social-listening work for dev, infra, and startup categories — and never posts.

**Powered by:** [Competitive intel](../competitive-intelligence-agent/) · [Social listening](../social-listening-agent/)

## Who it's for

- Dev-tool and infra teams reading launch reception on HN
- Founders gauging Show HN / Ask HN technical sentiment
- Competitive teams tracking a rival's HN footprint

## Skills in this agent

- [`hacker-news`](hacker-news/) — The deterministic guide to reading public Hacker News data through UnifAPI — story feeds, items, comment trees, and users. _(data)_
- [`competitor-launch-monitor`](../competitive-intelligence-agent/competitor-launch-monitor/) — Collect public launch signals and turn them into a competitive brief. _(enhanced · shared)_
- [`social-listening-brief`](../social-listening-agent/social-listening-brief/) — Track public mentions and return a concise brief instead of a dashboard. _(enhanced · shared)_

## What you get

- Front-page, new, Show HN, and Ask HN story signal
- Thread points, comment count, and candid critique
- Launch-reception read for dev/infra/startup categories
- Each figure cited to the public HN item

## Install & run

One install, three paths — all read-only with OAuth sign-in (new workspaces get free trial credits):

**Plugin — skills + live data in one install** (Claude Code, OpenClaw):

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Hermes: `hermes plugins install unifapi-agent/agents`. Codex ships a plugin manifest too.

**Web connector — no terminal** (Claude, ChatGPT, Perplexity): add a custom connector pointed at `https://mcp.unifapi.com`, then authorize over OAuth.

**Any other MCP client**: point it at `https://mcp.unifapi.com` (OAuth) and add the skills with `npx skills add unifapi-agent/agents`.

Step-by-step for every client → https://unifapi.com/mcp

Then ask your assistant:

```text
Research how our launch (or category) is landing on Hacker News: scan the front-page, Show HN, and Ask HN feeds, then read the comment tree on any matching thread for points, volume, and candid technical critique. Return a cited brief — read-only, do not post.
```

## Reads from

UnifAPI APIs: **hacker-news** — public data only.

> This is a read-only research agent for one platform. It reads public data and returns evidence — it never logs into, posts to, comments on, or messages on the platform, and it never holds your account credentials.

## FAQ

### Why a Hacker News agent?

For dev tools, infra, and startups, HN is where launch reception and candid technical sentiment show up first. The agent reads the public feeds and threads so you can gauge it without scrolling.

### Does it post Show HN or comment?

No. It is read-only research; you post anything from your own account.

## Links

- Agent page: https://unifapi.com/agents/hacker-news
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: Hacker News research tool · Hacker News research · Show HN research · Hacker News sentiment · Hacker News agent · Hacker News MCP server</sub>
