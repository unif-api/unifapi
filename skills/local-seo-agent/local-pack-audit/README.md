<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Local Pack Audit

> Pull the live local pack / map results for a business's queries and report exactly where it ranks vs competitors.

The local pack is where most 'near me' clicks go. This skill pulls live local-pack and map results for a business's target queries and reports its position against the businesses ranking above it — for one location, or the same queries across many — every position cited to the live result.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Local businesses checking where they rank in the map pack
- Multi-location brands comparing rank across locations
- Agencies auditing local-pack visibility for clients

## What you get

- Rank grid: query × location with the target's local-pack position
- The businesses ranking above the target, with rating, reviews, category
- For multi-location: where the business is missing from or buried in the pack
- Every position cited to the live local-pack result

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **maps, local, seo**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Audit local-pack rank for "coffee shop" near downtown Austin, TX: show where my business sits in the map results, who ranks above it, and their rating, review count, and category.
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

- Part of the **[Local SEO Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/local-pack-audit
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: Google Maps rank tracker · local pack audit · map pack tracking · local SEO audit · local pack ranking · rank tracking by location</sub>
