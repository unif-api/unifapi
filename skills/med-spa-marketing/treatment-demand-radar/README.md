<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Treatment Demand Radar

> Map treatment search demand and social trends to a clinic's service menu and content plan.

Cross local search volume, AI-answer prompts, and TikTok trends for the treatments a clinic offers, then surface the content and offers worth prioritizing — backed by real demand evidence.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Med spa marketers planning treatment content from real demand
- Clinics deciding which treatments to promote this quarter

## What you get

- Treatments ranked by local search and social demand
- Content topics and offers per high-demand treatment
- AI-answer prompts the clinic should be cited in

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **seo, geo, tiktok**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
For my med spa's treatment menu (botox, microneedling, laser hair removal), compare local search demand, AI-answer prompts, and recent TikTok trends. Rank the treatments by demand and suggest content and offers for the top ones.
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

- Part of the **[Med Spa Marketing Agent](../)**
- [`med-spa-reputation-benchmark`](../med-spa-reputation-benchmark/) — Compare a clinic's review count, rating, and velocity against the nearest competitors — the #1 med-spa local lever.
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/treatment-demand-radar
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: med spa treatment trends · med spa content marketing · trending treatments · treatment search demand · aesthetics marketing demand · med spa SEO content</sub>
