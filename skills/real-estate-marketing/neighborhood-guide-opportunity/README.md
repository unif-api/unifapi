<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Neighborhood Guide Opportunity

> Find the neighborhood-level search and content opportunities agents can own where Zillow and the portals are weak.

National portals dominate broad searches but are thin at the neighborhood level — exactly where an independent agent or local brokerage can win with hyperlocal content. This skill finds the neighborhood-level queries and content gaps worth owning, ranked by demand and winnability, each with evidence. Marketing research, not real-estate advice.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Independent agents and local brokerages competing with portals
- Real estate marketers planning hyperlocal content
- Teams marketing across multiple neighborhoods

## What you get

- Ranked table of neighborhood content opportunities with working titles
- Demand evidence: query, volume range, and verbatim questions
- Why winnable: who owns the SERP today and where the gap is
- Suggested format, angle, and hyperlocal details to include

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **seo, geo, news, maps, local**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Find neighborhood-level content opportunities my brokerage can own in Austin, TX — guides and market reports where Zillow is weak and local intent is high — ranked by demand and winnability.
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

- Skill page: https://unifapi.com/skills/neighborhood-guide-opportunity
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: hyperlocal SEO for realtors · neighborhood guide ideas · real estate content opportunities · rank for neighborhood searches · where can I beat Zillow · real estate local content</sub>
