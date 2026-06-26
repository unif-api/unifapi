<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Hacker News Data Skill

> The deterministic guide to reading public Hacker News data through UnifAPI — story feeds, items, comment trees, and users.

The Hacker News Data Skill is the source-sliced data guide a Platform Agent owns: it names the concrete `hacker-news/...` operations, response shapes, and gotchas for reading HN's public feeds through UnifAPI MCP, so any launch-reception or social-listening research for dev/infra/startup categories runs from one deterministic workflow. Read-only — it never posts.

A source-sliced **data skill** you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — the deterministic, read-only path to one platform's public data. It names the operations and response shapes; the marketing skills in the same agent turn those records into briefs, prices, and signals. **Eyes not hands** — it never posts.

## What it's good for

- Any HN-first research that needs story feeds, items, or comment trees
- Skills that read launch reception or candid technical sentiment
- Operators who want one deterministic HN read path, not ad-hoc discovery

## What you get

- The concrete `hacker-news/...` operations for each common feed/thread read job
- Response-contract and shape notes for items, feeds, and users
- Deterministic recipes: scan feeds, match a launch, read the comment tree
- Platform gotchas (kids are comment ids, descendants/score fields, no search)

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **hacker-news**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Using the Hacker News Data Skill, check how our launch is landing: scan the top, show, and ask feeds for matching stories, then read the comment tree (kids) on any matching item for points, volume, and candid critique. Return a cited brief. Read-only.
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

- Part of the **[Hacker News Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/hacker-news
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: Hacker News research tool · Hacker News monitoring · Hacker News data · Show HN tracking · Hacker News comment analysis · track launch reception on HN · Hacker News MCP server</sub>
