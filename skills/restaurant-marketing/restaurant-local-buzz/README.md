<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Restaurant Local Buzz

> Audit a venue's local-pack rank, review themes, and recent TikTok buzz for its cuisine and category.

Restaurants win discovery on three signals: local-pack rank for 'best [cuisine] near me', reviews, and social buzz from TikTok and Instagram food trends. This skill audits all three for one venue — read-only — so the operator knows exactly where they stand before changing anything.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Restaurant owners auditing local discovery
- Hospitality marketers tracking rank, reviews, and social buzz
- Agencies serving restaurant and food-service brands

## What you get

- Local-pack rank table: venue vs nearest competitors across diner queries
- Review snapshot: count, rating, velocity, and recurring themes vs leader
- Social-buzz brief: recent TikTok mentions and trending dishes/sounds
- A 'where we stand' summary tying rank, reviews, and buzz together

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **maps, local, seo, tiktok**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Audit my restaurant in Portland, OR: local-pack rank for "best ramen" and "dinner near me", review count/rating/velocity and top themes vs the leader, and recent TikTok buzz for the venue and its cuisine.
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

- Part of the **[Restaurant Marketing Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/restaurant-local-buzz
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: restaurant local SEO · restaurant map pack · restaurant reviews · restaurant TikTok buzz · dinner near me ranking · restaurant social buzz</sub>
