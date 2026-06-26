<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# LLM Mention Tracking

> Track how often you're mentioned across ChatGPT and AI search over a fixed prompt set, and how share of voice moves vs competitors.

The recurring read where the audit is a snapshot: track brand and domain mentions across ChatGPT and AI search engines over a fixed prompt set, compute share of voice against named competitors, and report what moved run-over-run — every figure cited to the AI answer and dated.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Brand teams tracking AI share of voice as a recurring KPI
- GEO specialists monitoring competitor movement in AI answers
- Marketers reporting AI-visibility trends to stakeholders

## What you get

- Share-of-voice table: brand vs each competitor, per platform and overall
- Trend vs prior run: prompts gained/lost and net share change
- Mentioned-but-not-cited prompts as quick-win extractability signals
- Each figure cited to the AI answer and the run date

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **geo**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Track our AI share of voice for our fixed prompt set this week across ChatGPT and AI search, compare it to last run, and flag the prompts where we're mentioned but not cited as a source.
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
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/llm-mention-tracking
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: track brand mentions in ChatGPT · AI mention monitoring · LLM mention tracking · ChatGPT brand monitoring · AI share of voice · AI visibility tracking · monitor AI citations</sub>
