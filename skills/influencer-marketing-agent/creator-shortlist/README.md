<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Creator Shortlist Agent

> Find creators by niche, audience language, recent momentum, and platform fit.

Turn a market brief into a ranked creator shortlist across social platforms, with evidence and outreach angles.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Creator discovery
- Campaign planning
- Market-specific outreach

## What you get

- Ranked shortlist
- Evidence links
- Suggested outreach angle

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **tiktok, youtube, instagram, twitter**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Find 30 creators for a cross-border ecommerce campaign. Prioritize recent momentum, audience fit, and reachable public profiles. Return a shortlist with evidence and outreach angles.
```

## Install

Ships in the **UnifAPI Agents** plugin — one install adds the skills and the public-data MCP server (OAuth, read-only). In Claude Code or OpenClaw:

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Web connector (Claude · ChatGPT · Perplexity), Codex, Cursor, and the `npx skills` path: https://unifapi.com/mcp

## Related

- Part of the **[Influencer Marketing Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/creator-shortlist
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: find influencers · creator discovery · find influencers by niche · influencer shortlist · influencer search tool · build an influencer list</sub>
