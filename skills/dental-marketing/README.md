<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Dental Marketing Agent

> Vertical Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The Dental Marketing Agent recombines local SEO, social listening, content strategy, and AI visibility for dental practices. It audits local search and map presence, mines patient questions for content, and checks AI-answer visibility for the services a practice offers.

**Powered by:** [Local SEO](../local-seo-agent/) · [Social listening](../social-listening-agent/) · [Content strategy](../content-strategy-agent/) · [AI visibility](../ai-visibility-agent/)

## Who it's for

- Dental practice owners and office managers
- Agencies marketing single- and multi-location dental groups
- Marketers planning content from real patient questions

## Skills in this agent

- [`dental-reputation-benchmark`](dental-reputation-benchmark/) — Benchmark a dental practice's reviews, rating, and velocity against nearby practices to explain the map-pack gap. _(enhanced)_
- [`patient-question-content`](patient-question-content/) — Mine the real questions patients ask about a practice's services and rank them into a content plan. _(enhanced)_

## What you get

- Local-pack rankings for service + city queries
- Content demand from real patient questions
- AI-answer visibility for 'dentist near me'-style prompts
- Review-presence and listing gaps vs nearby practices

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
Audit dental marketing visibility for my practice in Denver, CO. Check local-pack rankings for "dentist" and "teeth whitening", find content topics from common patient questions, and check whether we're cited in AI answers for dental-search prompts.
```

## Reads from

UnifAPI APIs: **maps, local, seo, geo, news** — public data only.

> This is a marketing agent — read-only research and visibility. It is not a licensed professional in this industry, it does not replace one, and it never posts, advertises, or changes anything on your behalf.

## FAQ

### Does it give dental or clinical advice?

No. It is a marketing agent for dental practices and researches online visibility only. It does not provide clinical advice or replace a licensed dentist.

### Does it manage my Google Business Profile?

No. It reads public local and map data to audit your presence; you make any listing changes it recommends.

### What powers it under the hood?

Local SEO, Content Strategy, Social Listening, and AI Visibility Role Agents tuned for dental queries, on the same public-data APIs.

## Links

- Agent page: https://unifapi.com/agents/dental-marketing
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: dental marketing · dental marketing ideas · marketing for dentists · dental SEO · SEO for dentists · dental practice marketing · dental local SEO · dental AI visibility</sub>
