<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Menu Demand Radar

> Map demand for a venue's cuisine and dishes across local search, AI answers, and TikTok to prioritize content and promos.

Map real demand for a venue's cuisine and signature dishes across local search, AI answers, and social trends so content and promotions chase what diners are actually craving this quarter. Specific dishes can trend locally fast, and catching that wave early is the whole game. Read-only marketing research.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Restaurant owners planning content and promotions from demand
- Hospitality marketers catching local dish trends early
- Venues wanting AI-answer citations for their cuisine

## What you get

- Cuisine angles and dishes ranked by local-search + social demand
- Per item: 2–3 content topics and a promotion angle
- AI-answer prompts where the venue should be cited but isn't

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **seo, geo, tiktok**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
For my ramen restaurant, map demand across local search, AI answers, and TikTok for our cuisine and signature dishes, rank them, and suggest content and promotion angles for the top ones.
```

## Install

Ships in the **UnifAPI Agents** plugin — one install adds the skills and the public-data MCP server (OAuth, read-only). In Claude Code or OpenClaw:

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Web connector (Claude · ChatGPT · Perplexity), Codex, Cursor, and the `npx skills` path: https://unifapi.com/mcp

## Related

- Part of the **[Restaurant Marketing Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/menu-demand-radar
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: trending dishes · restaurant content ideas · menu demand · restaurant SEO content · local food trends · what to promote restaurant</sub>
