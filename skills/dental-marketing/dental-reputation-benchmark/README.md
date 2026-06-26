<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Dental Reputation Benchmark

> Benchmark a dental practice's reviews, rating, and velocity against nearby practices to explain the map-pack gap.

Dental practices live or die in the local pack, and the biggest prominence lever they control is reviews — quantity, rating, and especially velocity. This skill benchmarks a practice's review standing and local-pack presence against the nearest competitors and quantifies the net-new reviews needed to catch the leader. Read-only marketing research, not clinical advice.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Dental practice owners losing the local pack
- Dental marketers tracking review velocity as a KPI
- Agencies benchmarking multi-location dental groups

## What you get

- Benchmark table: practice vs competitors on reviews, rating, 90-day velocity
- The gap to the local-pack leader in concrete numbers
- A net-new-reviews-per-quarter target, plus missing service-query pack presence
- Every number cited to the public listing record

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **maps, local, seo**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Benchmark my dental practice in Denver against the nearest competitors for "dentist near me": review count, rating, and 90-day velocity, and tell me the gap to the local-pack leader and the reviews/quarter to close it.
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

- Part of the **[Dental Marketing Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/dental-reputation-benchmark
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: dental reviews benchmark · dental local SEO · dentist map pack · dental reputation management · Google reviews for dentists · dental review velocity</sub>
