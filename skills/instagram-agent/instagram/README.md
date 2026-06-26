<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Instagram Data Skill

> The deterministic guide to reading public Instagram data through UnifAPI — profiles, posts, reels, comments, locations, and search.

The Instagram Data Skill is the source-sliced data guide a Platform Agent owns: it names the concrete `instagram/...` operations, response shapes, and gotchas for reading public Instagram data through UnifAPI MCP, so any creator research (shortlisting, audience-fit, pricing context) runs from one deterministic workflow. Read-only — it never posts or DMs.

A source-sliced **data skill** you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — the deterministic, read-only path to one platform's public data. It names the operations and response shapes; the marketing skills in the same agent turn those records into briefs, prices, and signals. **Eyes not hands** — it never posts.

## What it's good for

- Any Instagram-first research that needs profiles, posts, reels, or comments
- Skills that shortlist, vet, or price creators on Instagram
- Operators who want one deterministic Instagram read path, not ad-hoc discovery

## What you get

- The concrete `instagram/...` operations for each common creator read job
- Response-contract and shape notes for users, posts, reels, comments
- Deterministic recipes: profile, engagement, comments, discovery
- Platform gotchas (username vs. shortcode keys, private accounts, pagination)

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **instagram**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Using the Instagram Data Skill, research these IG creators: pull profiles and follower size, recent posts and reels with engagement, and the comments on their top posts; flag paid-partnership posts. Return a cited audience-fit brief. Read-only.
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

- Part of the **[Instagram Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/instagram
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: Instagram research tool · Instagram creator research · Instagram data · find Instagram influencers · Instagram engagement data · Instagram profile analytics · Instagram MCP server</sub>
