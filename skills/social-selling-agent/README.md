<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Social Selling Agent

> Role Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The Social Selling Agent watches public X and LinkedIn activity for buying intent — people asking for a tool you provide, switching vendors, or hiring for a relevant role — and prepares context-rich outreach so reps reach out at the right moment.

## Who it's for

- Founders and reps who sell from public intent signals
- SDR teams that want warm openings, not cold lists
- Anyone monitoring 'who is asking for what we sell' on X and LinkedIn

## Skills in this agent

- [`buying-signal-monitor`](buying-signal-monitor/) — Watch public X and LinkedIn for buying intent and return warm leads, each anchored to the post that proves it. _(enhanced)_
- [`linkedin-account-research`](../lead-company-research-agent/linkedin-account-research/) — Use public company, post, job, and profile signals for B2B research. _(enhanced · shared)_

## What you get

- People and companies showing public buying intent
- The post, comment, or job that signals the opening
- Public profile and company context for each lead
- A suggested outreach angle and follow-up checks

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
Monitor X and LinkedIn for people publicly asking for a YouTube data API or complaining about scraping rate limits this week. For each, return the post, their public profile and company context, why they're a fit for us, and a tailored outreach angle.
```

## Reads from

UnifAPI APIs: **twitter, linkedin, news** — public data only.

## FAQ

### Does it send connection requests or DMs?

No. It surfaces the intent signal and drafts the angle; you send outreach from your own accounts. UnifAPI reads public data and never holds your social credentials.

### How is it different from the Lead & Company Research Agent?

Social Selling is intent-first — it finds the moment someone signals a need. Lead & Company Research is account-first — deep B2B briefs on a target you already chose. They share LinkedIn data and work well as a pair.

### What counts as a buying signal?

Anything public you define: a tweet asking for a solution, a complaint about a competitor, a relevant job posting, or a leadership change. The agent matches your description against live X and LinkedIn records.

## Links

- Agent page: https://unifapi.com/agents/social-selling
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: social selling tools · LinkedIn AI tools · buying signals on LinkedIn · LinkedIn prospecting tool · buyer intent signals · warm lead finder · signal-based selling</sub>
