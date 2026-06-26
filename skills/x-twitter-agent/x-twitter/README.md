<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# X (Twitter) Data Skill

> The deterministic guide to reading public X/Twitter data through UnifAPI — profiles, posts, engagement, followers, search, and trends.

The X (Twitter) Data Skill is the source-sliced data guide a Platform Agent owns: it names the concrete `x/...` operations, response shapes, and gotchas for reading public X/Twitter data through UnifAPI MCP, so any X-first research (KOL pricing, creator vetting, buying signals, competitor and listening work) runs from one deterministic workflow. Read-only — it never posts.

A source-sliced **data skill** you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — the deterministic, read-only path to one platform's public data. It names the operations and response shapes; the marketing skills in the same agent turn those records into briefs, prices, and signals. **Eyes not hands** — it never posts.

## What it's good for

- Any X-first research workflow that needs profiles, posts, or engagement
- Skills that price, vet, or monitor creators and accounts on X
- Operators who want one deterministic X read path, not ad-hoc discovery

## What you get

- The concrete `x/...` operations for each common X read job
- Response-contract and `public_metrics` shape notes for users and tweets
- Deterministic recipes: profile, engagement, discovery, followers, trends
- Platform gotchas (RapidAPI-backed `/x/...` paths, pagination, billing)

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **twitter**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Using the X (Twitter) Data Skill, pull the public profile and recent engagement for @vercel and @shadcn: resolve each handle, read follower count and recent-tweet public_metrics, and return a cited summary. Read-only.
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

- Part of the **[X (Twitter) Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/x-twitter
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: Twitter research tool · X research tool · Twitter data · Twitter profile analytics · Twitter engagement tracking · Twitter follower analysis · X MCP server</sub>
