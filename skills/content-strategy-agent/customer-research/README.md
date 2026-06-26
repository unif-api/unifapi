<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Customer Research

> Mine authentic customer language, pains, and objections from public communities to inform messaging and content.

Research customers from public communities and synthesize their language, pains, and objections. This skill pulls authentic voice-of-customer evidence — Reddit threads, reviews, videos, news — through UnifAPI, then builds a research synthesis, a verbatim quote bank, and data-grounded personas, leaving fields blank rather than inventing them.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Marketers building messaging from real customer language
- Product and content teams synthesizing voice-of-customer evidence
- Founders validating personas against actual community data

## What you get

- Research synthesis: top themes by frequency × intensity, with verbatim quotes
- VOC quote bank organized by theme, ready for copy
- Data-grounded persona(s): JTBD, triggers, pains, objections, vocabulary
- Competitive intelligence: what the community says about competitors vs the brand

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **reddit, youtube, news, tiktok, seo**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Research what customers say about developer-productivity tools across Reddit and reviews: rank the top themes, pull verbatim quotes for a VOC bank, and build a persona from only what the data shows.
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
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/customer-research
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

## Credits

Adapted from [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) (MIT, Corey Haines), enhanced with live public-data evidence via UnifAPI.

<sub>Topics: customer research tool · voice of customer · audience research · review mining · ICP research · jobs to be done</sub>
