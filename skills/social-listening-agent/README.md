<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Social Listening Agent

> Role Agent · run inside Claude, Claude Code, ChatGPT (custom MCP), Codex, Cursor, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The Social Listening Agent watches public posts, comments, threads, and news for a brand, category, or launch, then returns a concise brief instead of a dashboard. It bundles the Social Listening Brief and Reddit Community Research Skills.

## Who it's for

- Brand, product, and founder teams tracking public sentiment
- Launch teams listening for reaction in real time
- Researchers mining customer language across communities

## Skills in this agent

- [`social-listening-brief`](social-listening-brief/) — Track public mentions and return a concise brief instead of a dashboard. _(enhanced)_
- [`reddit-community-research`](reddit-community-research/) — Map subreddits, recurring questions, objections, and language for a niche. _(enhanced)_
- [`reddit-thread-fit-check`](reddit-thread-fit-check/) — Score Reddit threads by relevance, intent, rules, timing, and account risk before anyone replies. _(enhanced)_

## What you get

- Theme map with repeated user language
- Representative posts, comments, and videos
- Complaint and feature-request clusters
- What changed since the last brief, with follow-up searches

## Run it

Install once — one plugin gives your assistant the skills **and** the UnifAPI public-data MCP server (OAuth, read-only). Then ask:

```text
Monitor public chatter about AI coding tools this week across X, Reddit, TikTok, and news. Group repeated phrases, complaints, feature requests, and active communities. Return a brief with example posts and what changed vs last week.
```

## Reads from

UnifAPI APIs: **twitter, reddit, tiktok, news, hacker-news** — public data only.

## FAQ

### Is this real-time monitoring?

It runs on demand: you (or a scheduled job in your own assistant) re-run the brief on whatever cadence you want. UnifAPI provides the live public records each time; it doesn't hold a standing stream.

### Which sources does it read?

Public X, Reddit, TikTok, and news by default — all live in the catalog. You can add other social platforms the agent has access to for a specific brief.

### Does it access private or owned-account data?

No. It reads public posts only. For your own authenticated account analytics, use your platform's native tools — UnifAPI is public-data, eyes-not-hands.

## Links

- Agent page: https://unifapi.com/agents/social-listening
- Install — one plugin, skills + live data: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: social listening tools · AI social listening tool · brand monitoring tool · Reddit social listening · social media monitoring · subreddit research tool · audience intelligence</sub>
