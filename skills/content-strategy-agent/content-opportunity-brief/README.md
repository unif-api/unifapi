<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Content Opportunity Brief Agent

> Find repeated questions and formats across YouTube, TikTok, Reddit, and X.

Have an agent turn public audience demand into a concise content brief with evidence.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Content planning
- SEO/AEO ideation
- Creator briefs

## What you get

- Topic map
- Evidence links
- Suggested formats

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **seo, youtube, tiktok, reddit, twitter, news, threads**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Find content opportunities around AI coding workflows. Compare YouTube, TikTok, Reddit, and X. Return topics, proof, format suggestions, and titles.
```

## Install

Ships in the **UnifAPI Agents** plugin — one install adds the skills and the public-data MCP server (OAuth, read-only). In Claude Code or OpenClaw:

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Web connector (Claude · ChatGPT · Perplexity), Codex, Cursor, and the `npx skills` path: https://unifapi.com/mcp

## Related

- Part of the **[Content Strategy Agent](../)**
- [`content-strategy`](../content-strategy/) — Turn real public demand into content pillars, a topic-cluster map, and a sequenced calendar — each topic backed by evidence.
- [`customer-research`](../customer-research/) — Mine authentic customer language, pains, and objections from public communities to inform messaging and content.
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/content-opportunity-brief
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: content opportunity · content brief generator · topic research tool · content gap analysis · content ideas from search · blog topic research</sub>
