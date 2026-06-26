<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# AI Visibility Audit

> The GEO equivalent of an SEO audit — check whether you're cited in AI answers and who owns the answer instead.

Assess whether a brand or domain is actually cited when AI answers the prompts that matter, grounded in real AI Mode answers, LLM mentions, and AI search volume from UnifAPI. Every miss is tied to the winning source and labeled by likely cause — extractability, authority, or third-party presence.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Brand and SEO teams measuring how they show up in AI answers
- GEO specialists auditing citation share across ChatGPT and AI search
- Founders who want to know who wins the AI answer instead of them

## What you get

- Coverage matrix: priority prompt × platform, cited vs not, with competitors cited instead
- Share-of-citations headline vs each named competitor
- Per high-value miss: who owns the answer and the likely cause
- Prioritized list of prompts to win next, weighted by AI search volume

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **geo, seo, browser**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
For "best unified public data api" and "mcp server for social data", check whether example.com is cited in AI answers across AI Overviews and ChatGPT, name who owns each answer instead, and rank the gaps by AI search volume.
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
- [`ai-visibility-fix-plan`](../ai-visibility-fix-plan/) — Prioritize Structure, Authority, and Presence fixes for prompts where AI answers do not cite you.
- [`llm-mention-tracking`](../llm-mention-tracking/) — Track how often you're mentioned across ChatGPT and AI search over a fixed prompt set, and how share of voice moves vs competitors.
- [`ai-answer-gap`](../ai-answer-gap/) — Find the prompts you should own in AI answers but don't, name who owns each, and rank the gaps by AI search volume.
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/ai-visibility-audit
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

## Credits

Adapted from [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) (MIT, Corey Haines), enhanced with live public-data evidence via UnifAPI.

<sub>Topics: AI visibility checker · AI visibility audit · does ChatGPT cite my brand · generative engine optimization audit · AI Overviews audit · ChatGPT citation check · GEO audit</sub>
