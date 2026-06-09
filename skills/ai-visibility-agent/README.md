<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# AI Visibility Agent

> Role Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The AI Visibility Agent (GEO) tracks generative-engine optimization signal: AI Mode answers with cited sources, LLM-mention tracking across ChatGPT and AI search engines, and AI keyword search volume. It shows where you are cited, where you are missing, and which prompts to optimize next.

## Who it's for

- Brand and SEO teams measuring how they show up in AI answers
- GEO specialists tracking citations across ChatGPT and AI search
- Founders who want to know why a competitor owns the AI answer

## Skills in this agent

- [`ai-visibility-audit`](ai-visibility-audit/) — The GEO equivalent of an SEO audit — check whether you're cited in AI answers and who owns the answer instead. _(enhanced)_
- [`ai-visibility-fix-plan`](ai-visibility-fix-plan/) — Prioritize Structure, Authority, and Presence fixes for prompts where AI answers do not cite you. _(enhanced)_
- [`llm-mention-tracking`](llm-mention-tracking/) — Track how often you're mentioned across ChatGPT and AI search over a fixed prompt set, and how share of voice moves vs competitors. _(enhanced)_
- [`ai-answer-gap`](ai-answer-gap/) — Find the prompts you should own in AI answers but don't, name who owns each, and rank the gaps by AI search volume. _(enhanced)_

## What you get

- AI Mode answers with the sources they cite
- LLM-mention tracking for your brand and domain
- AI keyword search volume for target prompts
- Visibility gaps and the prompts to optimize next

## Install & run

One install, three paths — all read-only with OAuth sign-in (new workspaces get free trial credits):

**Plugin — skills + live data in one install** (Claude Code, OpenClaw):

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Hermes: `hermes plugins install unifapi-agent/agents`. Codex ships a plugin manifest too.

**Web connector — no terminal** (Claude, ChatGPT, Perplexity): add a custom connector pointed at `https://mcp.unifapi.com`, then authorize over OAuth.

**Any other MCP client**: point it at `https://mcp.unifapi.com` (OAuth) and add the skills with `npx skills add unifapi-agent/agents`.

Step-by-step for every client → https://unifapi.com/mcp

Then ask your assistant:

```text
For these prompts — "best unified public data api", "mcp server for social data" — check whether example.com and our brand are cited in AI answers across AI search. Return the cited sources, our mentions vs competitors, AI search volume, and the prompts where we are missing entirely.
```

## Reads from

UnifAPI APIs: **geo, seo, browser** — public data only.

## FAQ

### What is GEO and how is it different from SEO?

GEO — generative engine optimization — is about being cited inside AI answers (ChatGPT, AI overviews, AI search) rather than ranking a blue link. The AI Visibility Agent measures that citation layer; the SEO Agent measures classic organic rank. Most teams run both.

### Which AI engines does it cover?

It tracks AI Mode answers with cited sources and LLM mentions across ChatGPT and AI search engines via the GEO API. Coverage follows the live GEO endpoints in the catalog.

### Can it rewrite my content to win the answer?

No — it reads and measures. It will tell you which prompts you lose and why, but the content changes are made by you or your own assistant. Pair it with the Content Strategy Agent to plan the rewrite.

## Links

- Agent page: https://unifapi.com/agents/ai-visibility
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: AI visibility checker · AI visibility tracker · generative engine optimization · answer engine optimization · how to show up in ChatGPT answers · track brand mentions in ChatGPT · AI search visibility · LLM mention tracking · GEO</sub>
