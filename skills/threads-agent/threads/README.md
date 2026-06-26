<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Threads Data Skill

> The deterministic guide to reading public Threads data through UnifAPI — recent and top post search, profiles, and replies.

The Threads Data Skill is the source-sliced data guide a Platform Agent owns: it names the concrete `threads/...` operations, response shapes, and gotchas for reading Meta's public Threads surface through UnifAPI MCP, so any text-first listening or content research runs from one deterministic workflow. Read-only — it never posts.

A source-sliced **data skill** you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — the deterministic, read-only path to one platform's public data. It names the operations and response shapes; the marketing skills in the same agent turn those records into briefs, prices, and signals. **Eyes not hands** — it never posts.

## What it's good for

- Any Threads-first research that needs post search, profiles, or replies
- Skills that listen for chatter or mine text-first content ideas
- Operators who want one deterministic Threads read path, not ad-hoc discovery

## What you get

- The concrete `threads/...` operations for each common listening read job
- Response-contract and shape notes for posts and profiles
- Deterministic recipes: recent vs. top search, profile, replies
- Platform gotchas (recent vs. top, like_count only, cursor pagination)

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **threads**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Using the Threads Data Skill, research our brand term: pull the recent and top post search for the term, plus relevant profiles and their replies. Return a cited listening brief. Read-only.
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

- Part of the **[Threads Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/threads
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: Threads research tool · Threads social listening · Threads data · Threads brand monitoring · Meta Threads search · track mentions on Threads · Threads MCP server</sub>
