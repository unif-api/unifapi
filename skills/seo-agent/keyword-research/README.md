<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Keyword Research

> Turn a seed list into ranked keyword opportunities and competitor gaps from live SERP and volume data.

Expand a seed keyword set, pull live volume and SERP data through UnifAPI, and surface the gaps where competitors rank and you don't — each with the evidence and intent behind it.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- SEO and content teams planning what to target next
- Founders sizing organic opportunity before investing
- Agencies running keyword gap analysis across clients

## What you get

- Ranked keyword opportunities with volume and intent
- Competitor gap list with the page that ranks
- Topic clusters to inform the content plan

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **seo**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
For competitor.com vs example.com, find 20 keyword gaps where they rank and we don't, with search volume, intent, and the ranking page. Group by topic and rank by opportunity.
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

- Part of the **[SEO Agent](../)**
- [`seo-audit`](../seo-audit/) — Audit crawlability, on-page, and content against live SERP and ranking evidence — not a static checklist.
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/keyword-research
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: AI keyword research tool · keyword research · keyword gap analysis · find keywords · competitor keyword research · keyword difficulty · search intent analysis</sub>
