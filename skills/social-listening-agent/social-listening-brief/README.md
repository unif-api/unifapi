<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Social Listening Brief Agent

> Track public mentions and return a concise brief instead of a dashboard.

Ask an agent to monitor public posts, comments, and threads for a brand, category, or launch.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Brand monitoring
- Launch listening
- Customer-language mining

## What you get

- Weekly brief
- Repeated themes
- Example posts

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **twitter, reddit, youtube, tiktok, threads, hacker-news**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Monitor public social chatter about AI coding tools this week. Group repeated user language, complaints, feature requests, and surprising posts.
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

- Part of the **[Social Listening Agent](../)**
- [`reddit-community-research`](../reddit-community-research/) — Map subreddits, recurring questions, objections, and language for a niche.
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/social-listening-brief
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: social listening tool · brand monitoring · social media monitoring · track brand mentions · online mention tracking · social listening report</sub>
