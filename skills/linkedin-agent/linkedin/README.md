<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# LinkedIn Data Skill

> The deterministic guide to reading public LinkedIn data through UnifAPI — companies, people, jobs, posts, and member insights.

The LinkedIn Data Skill is the source-sliced data guide a Platform Agent owns: it names the concrete `linkedin/...` operations, response shapes, and gotchas for reading public LinkedIn data through UnifAPI MCP, so any B2B research (account research, news-signal, buying-signal, competitor work) runs from one deterministic workflow. Read-only — it never connects or messages.

A source-sliced **data skill** you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — the deterministic, read-only path to one platform's public data. It names the operations and response shapes; the marketing skills in the same agent turn those records into briefs, prices, and signals. **Eyes not hands** — it never posts.

## What it's good for

- Any LinkedIn-first B2B research that needs companies, people, jobs, or posts
- Skills that research accounts, news signals, or buying committees
- Operators who want one deterministic LinkedIn read path, not ad-hoc discovery

## What you get

- The concrete `linkedin/...` operations for each common B2B read job
- Response-contract and shape notes for companies, users, jobs, and posts
- Deterministic recipes: account research, hiring signal, people, posts
- Platform gotchas (slug vs. username keys, cursor pagination, billing)

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **linkedin**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Using the LinkedIn Data Skill, research stripe on public LinkedIn: pull the company page, follower and employee counts, open-job count, member insights, and recent posts, then infer the likely buying committee. Return a sourced brief. Read-only.
```

## Install

Ships in the **UnifAPI Agents** plugin — one install adds the skills and the public-data MCP server (OAuth, read-only). In Claude Code or OpenClaw:

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Web connector (Claude · ChatGPT · Perplexity), Codex, Cursor, and the `npx skills` path: https://unifapi.com/mcp

## Related

- Part of the **[LinkedIn Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/linkedin
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: LinkedIn research tool · LinkedIn company research · LinkedIn data · LinkedIn company lookup · LinkedIn hiring signals · B2B company research · LinkedIn MCP server</sub>
