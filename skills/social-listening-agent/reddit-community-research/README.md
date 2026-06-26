<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Reddit Community Research Agent

> Map subreddits, recurring questions, objections, and language for a niche.

Turn Reddit posts and comments into a community research brief an agent can keep refining.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Community research
- Messaging
- Organic distribution

## What you get

- Subreddit map
- Pain-point themes
- Example threads

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **reddit**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Find active Reddit communities for developer productivity tools. Summarize common pains, buying triggers, repeated objections, and outreach-safe threads.
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
- [`social-listening-brief`](../social-listening-brief/) — Track public mentions and return a concise brief instead of a dashboard.
- [`reddit-thread-fit-check`](../reddit-thread-fit-check/) — Score Reddit threads by relevance, intent, rules, timing, and account risk before anyone replies.
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/reddit-community-research
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: Reddit research tool · subreddit research · Reddit social listening · Reddit audience research · find subreddits for my niche · Reddit marketing research</sub>
