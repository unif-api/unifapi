<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Practice Area Rank Audit

> Audit a firm's rank for every practice-area + city query and flag where thin content is the reason it's losing.

Law firms compete query by query, and each practice area is its own race won by firms that rank in both the local pack and organic results with a deep page behind each. This skill audits the firm's rank for every practice-area + city query, benchmarks it against competing firms, and flags where thin content is the cause. Read-only marketing research, not legal advice.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Law firms and attorneys auditing rank by practice area
- Legal marketing agencies serving multiple firms
- Firms diagnosing where thin content costs them rank

## What you get

- Rank grid: practice area × city with local-pack, organic, and AI-answer status
- Content-depth column: firm's page vs the winning page
- Prioritized gap list where rank is weak and content is thin
- Every position and metric cited to the live SERP/map record

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **seo, maps, local, geo**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Audit my firm's rank in Chicago for "personal injury lawyer" and "family law attorney" — local-pack and organic positions, the AI-answer status, who outranks us, and where thin content is the reason.
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

- Part of the **[Law Firm Marketing Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/practice-area-rank-audit
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: law firm SEO audit · practice area ranking · attorney local pack · lawyer SEO by practice area · law firm rank tracking · attorney content gaps</sub>
