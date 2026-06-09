<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Local Competitor Scan

> Map the competitors ranking ahead in the local pack and surface what they have that you lack, in concrete numbers.

The businesses sitting ahead of you in the local pack are the clearest brief for what local Google rewards in your category and city. This skill maps those competitors, profiles them on the signals that move local rank, and surfaces the concrete gap — review volume, rating, category — between you and the leaders. Read-only.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Local businesses analyzing who outranks them and why
- Marketers sizing the review and rating gap to local leaders
- Agencies building local competitive briefs for clients

## What you get

- Competitor table: each rival with category, rating, review count, and ranked queries
- The signal gap to the local-pack leaders in concrete numbers
- A shortlist of what winning competitors share that the target lacks
- Every figure cited to the live local-pack and listing records

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **maps, local, seo**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Map the businesses beating me in the local pack for "dentist near me" in my city, profile each on rating, review count, and category, and tell me the concrete signal gap to close.
```

## Install

Ships in the **UnifAPI Agents** plugin — one install adds the skills and the public-data MCP server (OAuth, read-only). In Claude Code or OpenClaw:

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Web connector (Claude · ChatGPT · Perplexity), Codex, Cursor, and the `npx skills` path: https://unifapi.com/mcp

## Related

- Part of the **[Local SEO Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/local-competitor-scan
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: local SEO competitor analysis · local competitor research · map pack competitors · who's beating me in the map pack · local competitive gap · competitor review counts</sub>
