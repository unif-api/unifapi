<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# YouTube Data Skill

> The deterministic guide to reading public YouTube data through UnifAPI — channels, videos, related content, search, and trending.

The YouTube Data Skill is the source-sliced data guide a Platform Agent owns: it names the concrete `youtube/...` operations, response shapes, and the real coverage limits (no comment listing) for reading public YouTube data through UnifAPI MCP, so any channel or content research (creator vetting, competitor reception, content demand) runs from one deterministic workflow. Read-only — it never uploads or comments.

A source-sliced **data skill** you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — the deterministic, read-only path to one platform's public data. It names the operations and response shapes; the marketing skills in the same agent turn those records into briefs, prices, and signals. **Eyes not hands** — it never posts.

## What it's good for

- Any YouTube-first research that needs channels, videos, or related content
- Skills that vet creators, read competitor reception, or size content demand
- Operators who want one deterministic YouTube read path, not ad-hoc discovery

## What you get

- The concrete `youtube/...` operations for each common channel/video read job
- Response-contract and shape notes for channels and videos (view counts)
- Deterministic recipes: resolve channels, read demand, find related content
- Platform gotchas (no comment listing, view_count signal, cursor pagination)

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **youtube**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Using the YouTube Data Skill, research who owns the topic "AI coding tools": search videos and channels, read their subscriber and view counts, and pull related videos for demand. Return a cited brief on the strongest channels. Read-only.
```

## Install

Ships in the **UnifAPI Agents** plugin — one install adds the skills and the public-data MCP server (OAuth, read-only). In Claude Code or OpenClaw:

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Web connector (Claude · ChatGPT · Perplexity), Codex, Cursor, and the `npx skills` path: https://unifapi.com/mcp

## Related

- Part of the **[YouTube Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/youtube
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: YouTube research tool · YouTube channel research · YouTube data · find YouTube creators · YouTube competitor analysis · YouTube trending videos · YouTube MCP server</sub>
