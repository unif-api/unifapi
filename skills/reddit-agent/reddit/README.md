<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Reddit Data Skill

> The deterministic guide to reading public Reddit data through UnifAPI — subreddits, threads, comments, users, and trending searches.

The Reddit Data Skill is the source-sliced data guide a Platform Agent owns: it names the concrete `reddit/...` operations, response shapes, and the real coverage limits (no keyword search, no subreddit post feed) for reading public Reddit data through UnifAPI MCP, so any community research (social-listening, voice-of-customer) runs from one deterministic, honest workflow. Read-only — it never posts.

A source-sliced **data skill** you run inside Claude, Claude Code, ChatGPT (custom MCP), Codex, Cursor, OpenClaw, Hermes, or any MCP client — the deterministic, read-only path to one platform's public data. It names the operations and response shapes; the marketing skills in the same agent turn those records into briefs, prices, and signals. **Eyes not hands** — it never posts.

## What it's good for

- Any Reddit-first community research that needs subreddits, threads, or comments
- Skills that mine community language, questions, and sentiment
- Operators who want one deterministic Reddit read path, with honest coverage limits

## What you get

- The concrete `reddit/...` operations for each common community read job
- Response-contract and shape notes for subreddits, posts, comments, users
- Deterministic recipes: seed communities, mine threads, track power users
- Platform gotchas (no keyword search, no subreddit feed, cursor pagination)

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **reddit**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Using the Reddit Data Skill, research the r/SaaS community: pull the subreddit profile and rules, scan the popular and news feeds plus trending searches for matching threads, then read the comment tree on the strongest thread for verbatim language. Return a sourced brief. Read-only.
```

## Related

- Part of the **[Reddit Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/reddit
- The skill itself: [SKILL.md](./SKILL.md)
- Install — one plugin, skills + live data: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: Reddit research tool · subreddit research · Reddit data · Reddit social listening · Reddit comment analysis · mine subreddit conversations · Reddit MCP server</sub>
