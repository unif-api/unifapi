<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# AI Answer Gap

> Find the prompts you should own in AI answers but don't, name who owns each, and rank the gaps by AI search volume.

The bridge from 'we're not visible in AI' to a concrete backlist: find the prompts where the brand should be cited but isn't, name the competitor or domain that owns each answer, and rank the gaps by AI search demand so the content team attacks the biggest, most winnable misses first.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Content teams planning what to write to win AI citations
- GEO specialists turning visibility gaps into a backlist
- Founders prioritizing the highest-traffic AI prompts they're losing

## What you get

- Prioritized gap backlist: prompt, AI search volume, the owner, and the cited source
- Per gap: the winning angle to beat and a quick/net-new tag
- Fast wins where the brand ranks organically but isn't cited
- Every gap cited to the AI answer and dated

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **geo, seo**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Find the AI-answer prompts we should own but don't for our category, name who owns each answer instead, and rank them by AI search volume into a content backlist with quick wins flagged.
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

- Part of the **[AI Visibility Agent](../)**
- [`ai-visibility-audit`](../ai-visibility-audit/) — The GEO equivalent of an SEO audit — check whether you're cited in AI answers and who owns the answer instead.
- [`ai-visibility-fix-plan`](../ai-visibility-fix-plan/) — Prioritize Structure, Authority, and Presence fixes for prompts where AI answers do not cite you.
- [`llm-mention-tracking`](../llm-mention-tracking/) — Track how often you're mentioned across ChatGPT and AI search over a fixed prompt set, and how share of voice moves vs competitors.
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/ai-answer-gap
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: AI answer gap · how to show up in ChatGPT answers · AI content gap · answer engine optimization · find AI visibility gaps · GEO content opportunities</sub>
