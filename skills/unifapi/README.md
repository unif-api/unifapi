<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# UnifAPI (shared data skill)

> The connector every `enhanced` skill calls — OAuth MCP first, public data only, read-only.

This is the shared data skill the marketing agents read live public data through. It connects an MCP client to the UnifAPI server, discovers the right operation, and calls it for evidence — so every skill in this repo cites a real record instead of guessing.

## What it does

- Connects over OAuth to the hosted MCP server (no tokens pasted into chat).
- Discovers operations and schemas (`list_operations`, `get_operation`).
- Calls public-data APIs for evidence (`call_api`) and returns artifacts, not raw dumps.
- Falls back to direct HTTP / API key only when a client cannot do MCP OAuth.

## Public-data boundary

UnifAPI is for **public** data — social profiles and posts, search results and SERPs, trends, web scrape output, news, comments, communities, videos, and public company or creator signals. OAuth authorizes your UnifAPI workspace and credit balance; it never grants access to your private X, Google, CRM, or SaaS accounts.

## Run it

Connect once and every skill reads through it. Pick the path your client supports — all OAuth, read-only:

**Plugin — skills + live data in one install** (Claude Code, OpenClaw):

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Hermes: `hermes plugins install unifapi-agent/agents`. Codex ships a plugin manifest too.

**Web connector — no terminal** (Claude, ChatGPT, Perplexity): add a custom connector pointed at `https://mcp.unifapi.com`, then authorize over OAuth.

**Any other MCP client**: point it at `https://mcp.unifapi.com` (OAuth) and add the skills with `npx skills add unifapi-agent/agents`.

Step-by-step for every client → https://unifapi.com/mcp

## Links

- Install & all clients: https://unifapi.com/mcp
- The skill itself: [SKILL.md](./SKILL.md)
- Docs: https://docs.unifapi.com/mcp
- API catalog: https://unifapi.com/apis

<sub>Topics: UnifAPI MCP server · public-data API · MCP OAuth · social data API · SERP API · agent data layer</sub>
