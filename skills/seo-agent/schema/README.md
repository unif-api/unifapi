<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Schema Markup

> Choose and implement the right schema.org types for a page, with valid JSON-LD the assistant can write.

A framework skill: pick the correct structured-data types for a page, generate valid JSON-LD, and avoid the markup mistakes that suppress rich results. Advice-only — your own assistant writes the markup into your site.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Teams adding structured data to product, article, or local pages
- Developers who want valid JSON-LD without guesswork

## What you get

- Recommended schema.org types for the page
- Valid JSON-LD ready to paste
- Validation steps and common-mistake checks

## How it works

A framework-and-judgment skill — it brings the playbook and the structure; your assistant applies it to your own context. Pair it with the live-data skills in the same agent for evidence.

## Example prompt

```text
Recommend and generate the JSON-LD schema for this product page, then explain which rich results it can earn and how to validate it.
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

- Skill page: https://unifapi.com/skills/schema
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

## Credits

Adapted from [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) (MIT, Corey Haines).

<sub>Topics: schema markup generator · JSON-LD generator · structured data for SEO · schema markup tool · rich results schema · FAQ schema</sub>
