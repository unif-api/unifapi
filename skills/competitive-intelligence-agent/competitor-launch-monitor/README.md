<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Competitor Launch Monitor

> Collect public launch signals and turn them into a competitive brief.

Have an agent watch competitor posts, founder accounts, videos, hiring posts, and community response.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Launch analysis
- Positioning research
- Sales enablement

## What you get

- Competitor brief
- Message map
- Risk and opportunity list

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **twitter, linkedin, youtube, reddit, news, hacker-news**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Analyze the public launch of this competitor. Pull posts, reactions, videos, and hiring signals. Summarize positioning, channels, customer language, and risks.
```

## Install

Run it in any MCP client. **Paste one prompt** (Claude Code, Codex, Cursor, OpenClaw, …) to add the UnifAPI public-data MCP server at `https://mcp.unifapi.com` over OAuth — read-only, no API key — then add the marketing skills with `npx skills add unifapi-agent/agents`.

Prefer a **web connector** (Claude · ChatGPT · Perplexity · Grok), or the one-shot **plugin** for Claude-compatible hosts:

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Every client, step by step: https://unifapi.com/mcp

## Related

- Part of the **[Competitive Intelligence Agent](../)**
- [`competitor-profiling`](../competitor-profiling/) — Turn a competitor's public footprint into a structured, source-cited profile — positioning, product, pricing, and implications.
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/competitor-launch-monitor
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: competitor launch tracking · track competitor product launches · competitor monitoring tool · competitor launch analysis · competitive intelligence tool · monitor competitor announcements</sub>
