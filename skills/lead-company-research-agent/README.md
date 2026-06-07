<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Lead & Company Research Agent

> Role Agent · run inside Claude, Claude Code, ChatGPT (custom MCP), Codex, Cursor, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The Lead & Company Research Agent prepares account briefs from public LinkedIn company pages, posts, jobs, and visible profiles, plus news context. It bundles the LinkedIn Account Research Skill for B2B enrichment before outreach or a sales call.

## Who it's for

- B2B sales and recruiting teams prepping for outreach
- Account planners who need public company and hiring context
- Researchers building company briefs from one LinkedIn slug

## Skills in this agent

- [`linkedin-account-research`](linkedin-account-research/) — Use public company, post, job, and profile signals for B2B research. _(enhanced)_
- [`account-news-signals`](account-news-signals/) — Pull recent public news for a target account and convert each event into a dated, sourced outreach hook. _(enhanced)_

## What you get

- Company priorities and recent public posts
- Hiring signals and likely buying-committee roles
- Profile and company context from one LinkedIn slug
- Suggested discovery questions and source gaps

## Run it

Install once — one plugin gives your assistant the skills **and** the UnifAPI public-data MCP server (OAuth, read-only). Then ask:

```text
Research this target account from public LinkedIn and news signals. Summarize company priorities, hiring signals, recent posts, the likely buying committee, and outreach angles. Mark anything that needs human verification.
```

## Reads from

UnifAPI APIs: **linkedin, news** — public data only.

## FAQ

### Is this scraping LinkedIn?

It reads LinkedIn's public surface through the UnifAPI catalog — public profiles, company pages, posts, and jobs — under one contract with the URL slug as the path key. It does not log into your account or access private data.

### Does it handle B2B enrichment only?

Yes — this Role Agent is scoped to B2B account and company research. For intent-based prospecting on X and LinkedIn, use the Social Selling Agent; for creators, use Influencer Marketing.

### Can it find email addresses or phone numbers?

It surfaces what is publicly visible and flags gaps for human verification. It is a research brief, not a contact-database scraper.

## Links

- Agent page: https://unifapi.com/agents/lead-company-research
- Install — one plugin, skills + live data: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: AI lead generation tools · company research tool · AI lead research · B2B account research · AI prospecting tool · LinkedIn company research · B2B data enrichment</sub>
