<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Agent Reputation Benchmark

> Benchmark an agent's public reviews and local-pack presence against the nearest competitors for realtor queries.

Reviews and Google Business Profile presence are the main levers for an agent's local-pack prominence, and the map pack for agent and neighborhood queries is winnable even when portals dominate broad search. This skill benchmarks an agent's reviews and local-pack standing against the nearest competitors and quantifies the gap. Read-only.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Independent agents and brokerages losing the map pack
- Real estate marketers tracking review velocity as a KPI
- Teams benchmarking reputation across neighborhoods

## What you get

- Benchmark table: agent vs competitors on reviews, rating, velocity, local-pack position
- The gap to the local-pack leader in concrete numbers
- A net-new-reviews-per-quarter target to catch the leader
- Every number cited to the public listing or local-pack record

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **maps, local, seo**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Benchmark my real estate brokerage in Austin against nearby agents for "realtor Austin": review count, rating, 90-day velocity, and local-pack position, and tell me the net-new-reviews target to catch the leader.
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

- Part of the **[Real Estate Marketing Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/agent-reputation-benchmark
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: realtor reviews benchmark · real estate local SEO · realtor reputation management · real estate map pack · realtor Google reviews · local pack for real estate</sub>
