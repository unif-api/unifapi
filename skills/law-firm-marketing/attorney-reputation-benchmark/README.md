<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Attorney Reputation Benchmark

> Benchmark a firm's public reviews and local-pack presence against competing firms and quantify the gap.

For law firms, reviews and a complete Google Business Profile are the biggest levers on local prominence and on conversion — prospects read reviews before they call. This skill benchmarks a firm's review standing and local-pack presence against the firms ranking for its attorney-search queries and quantifies the gap. Read-only marketing research, not legal advice.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Law firms and attorneys losing the map pack
- Legal marketers tracking review velocity as a KPI
- Agencies benchmarking firm reputation against competitors

## What you get

- Benchmark table: firm vs competitors on reviews, rating, velocity, profile completeness
- The gap to the local-pack leader in concrete numbers
- A net-new-reviews-per-quarter target plus inconsistent listing details
- Every number cited to the public listing record

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **maps, local, seo**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Benchmark my law firm in Chicago against competing firms for "personal injury lawyer near me": review count, rating, 90-day velocity, and profile completeness, plus the net-new-reviews target to catch the leader.
```

## Install

Ships in the **UnifAPI Agents** plugin — one install adds the skills and the public-data MCP server (OAuth, read-only). In Claude Code or OpenClaw:

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Web connector (Claude · ChatGPT · Perplexity), Codex, Cursor, and the `npx skills` path: https://unifapi.com/mcp

## Related

- Part of the **[Law Firm Marketing Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/attorney-reputation-benchmark
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: law firm reviews benchmark · attorney review benchmark · law firm local SEO · attorney map pack · law firm reputation management · Google reviews for lawyers</sub>
