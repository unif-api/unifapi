<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Competitive Intelligence Agent

> Role Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The Competitive Intelligence Agent collects public launch, hiring, content, and customer-language signals about a competitor and turns them into a brief: positioning, channels, reaction, and risks. It bundles the Competitor Launch Monitor Skill.

## Who it's for

- Founders, PMMs, and sales teams tracking competitor motion
- Strategy teams that need positioning evidence, not vibes
- Researchers building a defensible competitive landscape

## Skills in this agent

- [`competitor-launch-monitor`](competitor-launch-monitor/) — Collect public launch signals and turn them into a competitive brief. _(enhanced)_
- [`competitor-profiling`](competitor-profiling/) — Turn a competitor's public footprint into a structured, source-cited profile — positioning, product, pricing, and implications. _(enhanced)_

## What you get

- Competitor launch or account brief
- Positioning and message map from public claims
- Evidence from posts, videos, jobs, and threads
- Risks, opportunities, and the next monitoring queries

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
Analyze this competitor's public launch. Pull posts, reactions, videos, hiring signals, and community response across X, LinkedIn, YouTube, Reddit, and news. Summarize positioning, channels, customer language, and risks, and give me a watchlist to re-check weekly.
```

## Reads from

UnifAPI APIs: **seo, browser, twitter, linkedin, youtube, reddit, news, hacker-news** — public data only.

## FAQ

### Can it monitor competitors continuously?

It runs on demand and returns a re-runnable watchlist. Schedule it in your own assistant to get a fresh brief on a cadence; UnifAPI supplies the live records each run.

### Does it use anything but public data?

No. Everything is public: posts, public company pages, jobs, videos, and threads. There's no private or leaked data, and every claim links to its source.

### How does it relate to Social Listening?

Social Listening watches a topic or your own brand broadly; Competitive Intelligence is aimed at named competitors and their launches. They share several APIs and are often run together.

## Links

- Agent page: https://unifapi.com/agents/competitive-intelligence
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: AI competitor analysis tools · AI competitor research · competitor monitoring tool · competitive intelligence tool · how to use AI for competitor research · market research AI · competitor analysis tool</sub>
