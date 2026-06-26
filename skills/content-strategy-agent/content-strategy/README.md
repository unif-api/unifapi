<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Content Strategy

> Turn real public demand into content pillars, a topic-cluster map, and a sequenced calendar — each topic backed by evidence.

Decide what content to produce, grounded in real public demand rather than guesswork. This skill mines search keywords, Reddit, YouTube, news, and TikTok to build content pillars, a topic-cluster map tagged by buyer stage, and a prioritized calendar — every recommendation tied to the source question that justifies it.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Content and growth teams planning a roadmap from real demand
- SEO/AEO leads structuring pillars and clusters
- Founders turning audience questions into a publishing calendar

## What you get

- 3–5 content pillars, each with demand evidence and product link
- Topic-cluster map tagged by buyer stage and channel
- Prioritized calendar with format, angle, and evidence per piece

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **seo, reddit, youtube, news, tiktok**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Build a content strategy for our AI coding tool: define 3–5 pillars from real demand, map topic clusters under each by buyer stage, and sequence a prioritized calendar with the evidence behind every piece.
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

- Part of the **[Content Strategy Agent](../)**
- [`content-opportunity-brief`](../content-opportunity-brief/) — Find repeated questions and formats across YouTube, TikTok, Reddit, and X.
- [`customer-research`](../customer-research/) — Mine authentic customer language, pains, and objections from public communities to inform messaging and content.
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/content-strategy
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

## Credits

Adapted from [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) (MIT, Corey Haines), enhanced with live public-data evidence via UnifAPI.

<sub>Topics: AI content strategy · content idea generator · content gap analysis · blog topic ideas · content pillars · editorial calendar · content roadmap</sub>
