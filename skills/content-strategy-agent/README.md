<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Content Strategy Agent

> Role Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The Content Strategy Agent mines real audience demand across search keywords, Reddit, YouTube, and news to propose topics, formats, and titles you can defend. It bundles the Content Opportunity Brief Skill so every recommendation comes with the post or thread that proves it.

## Who it's for

- Content and growth teams planning from real demand, not guesses
- SEO/AEO writers who need evidence behind every brief
- Founders turning audience questions into a publishing calendar

## Skills in this agent

- [`content-opportunity-brief`](content-opportunity-brief/) — Find repeated questions and formats across YouTube, TikTok, Reddit, and X. _(enhanced)_
- [`content-strategy`](content-strategy/) — Turn real public demand into content pillars, a topic-cluster map, and a sequenced calendar — each topic backed by evidence. _(enhanced)_
- [`customer-research`](customer-research/) — Mine authentic customer language, pains, and objections from public communities to inform messaging and content. _(enhanced)_

## What you get

- Ranked topic opportunities with demand evidence
- Repeated questions and language from real threads and videos
- Suggested formats, angles, and titles per topic
- Source links and follow-up searches for each idea

## Install & run

One install, three paths — all read-only with OAuth sign-in (new workspaces get free trial credits):

**Plugin — skills + live data in one install** (Claude Code, OpenClaw):

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Hermes: `hermes plugins install unifapi-agent/agents`. Codex ships a plugin manifest too.

**Web connector — no terminal** (Claude, ChatGPT, Perplexity): add a custom connector pointed at `https://mcp.unifapi.com`, then authorize over OAuth.

**Any other MCP client**: point it at `https://mcp.unifapi.com` (OAuth) and add the skills with `npx skills add unifapi-agent/agents`.

Step-by-step for every client → https://unifapi.com/mcp

Then ask your assistant:

```text
Find content opportunities around AI coding workflows. Compare search keywords, Reddit, YouTube, and news. Return ranked topics with the repeated questions behind them, suggested formats and titles, and a source link for each idea.
```

## Reads from

UnifAPI APIs: **seo, reddit, youtube, news, tiktok, twitter, threads** — public data only.

## FAQ

### Does it write the content?

It plans and briefs. Your own assistant can draft from the plan, but UnifAPI's role is the evidence: what to write, why there's demand, and which sources prove it.

### How is this different from the SEO Agent?

The SEO Agent tracks rankings and SERP/keyword data; the Content Strategy Agent turns demand signals — including social and community threads — into a topic and format plan. They share the SEO API and pair well.

### Where does the demand evidence come from?

From live records: search keyword data, Reddit threads, YouTube videos, and news articles. Every recommendation links back to the public source it came from.

## Links

- Agent page: https://unifapi.com/agents/content-strategy
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: AI content strategy · content idea generator · content gap analysis · AI topic research tool · blog topic ideas · content brief generator · topical authority</sub>
