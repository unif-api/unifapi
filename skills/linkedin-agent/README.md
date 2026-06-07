<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# LinkedIn Agent

> Platform Agent · run inside Claude, Claude Code, ChatGPT (custom MCP), Codex, Cursor, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The LinkedIn Agent turns LinkedIn's public surface into B2B research: company pages, employees and member insights, open jobs, posts and engagement, and people search. It owns the LinkedIn Data Skill — the deterministic read path — and composes the Role-Agent Skills behind account research, news-signal, buying-signal, and competitor work, all from one URL slug — and never connects or messages on your behalf.

**Powered by:** [Lead research](../lead-company-research-agent/) · [Social selling](../social-selling-agent/) · [Competitive intel](../competitive-intelligence-agent/)

## Who it's for

- B2B sales and recruiting teams researching accounts before outreach
- Account planners reading public company, hiring, and post signal
- Competitive teams profiling a rival from its LinkedIn footprint

## Skills in this agent

- [`linkedin`](linkedin/) — The deterministic guide to reading public LinkedIn data through UnifAPI — companies, people, jobs, posts, and member insights. _(data)_
- [`linkedin-account-research`](../lead-company-research-agent/linkedin-account-research/) — Use public company, post, job, and profile signals for B2B research. _(enhanced · shared)_
- [`account-news-signals`](../lead-company-research-agent/account-news-signals/) — Pull recent public news for a target account and convert each event into a dated, sourced outreach hook. _(enhanced · shared)_
- [`buying-signal-monitor`](../social-selling-agent/buying-signal-monitor/) — Watch public X and LinkedIn for buying intent and return warm leads, each anchored to the post that proves it. _(enhanced · shared)_
- [`competitor-profiling`](../competitive-intelligence-agent/competitor-profiling/) — Turn a competitor's public footprint into a structured, source-cited profile — positioning, product, pricing, and implications. _(enhanced · shared)_

## What you get

- Company profile, employees, and member insights
- Open jobs and job-count trend as an investment signal
- Company posts and the likely buying committee
- Each claim sourced to the public LinkedIn record

## Run it

Install once — one plugin gives your assistant the skills **and** the UnifAPI public-data MCP server (OAuth, read-only). Then ask:

```text
Research this company on public LinkedIn: pull the company page, headcount and member insights, open jobs, and recent posts, and infer the likely buying committee. Return a sourced brief — read-only, no connections or messages.
```

## Reads from

UnifAPI APIs: **linkedin** — public data only.

> This is a read-only research agent for one platform. It reads public data and returns evidence — it never logs into, posts to, comments on, or messages on the platform, and it never holds your account credentials.

## FAQ

### Is this scraping LinkedIn?

It reads LinkedIn's public surface through the UnifAPI catalog — public profiles, company pages, posts, and jobs, keyed by the URL slug. It does not log into your account or read private data.

### Does it send connection requests or messages?

No. The LinkedIn Agent is read-only research. You send any outreach from your own account; UnifAPI never holds LinkedIn credentials.

## Links

- Agent page: https://unifapi.com/agents/linkedin
- Install — one plugin, skills + live data: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: LinkedIn research tool · LinkedIn company research · LinkedIn research agent · LinkedIn data enrichment · LinkedIn MCP server · LinkedIn data for Claude</sub>
