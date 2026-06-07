<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Competitive Intelligence Agent

> Role Agent · run inside Claude, Claude Code, ChatGPT (custom MCP), Codex, Cursor, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

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

## Run it

Install once — one plugin gives your assistant the skills **and** the UnifAPI public-data MCP server (OAuth, read-only). Then ask:

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
- Install — one plugin, skills + live data: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: AI competitor analysis tools · AI competitor research · competitor monitoring tool · competitive intelligence tool · how to use AI for competitor research · market research AI · competitor analysis tool</sub>
