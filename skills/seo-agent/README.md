<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# SEO Agent

> Role Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The SEO Agent runs live organic and AI SERP checks, keyword and competitor research, and backlink analysis as records you can rank, diff, and cite. Run it in Claude or Codex with UnifAPI MCP instead of opening a seat-based SEO suite.

## Who it's for

- SEO and growth teams that want rank data in an agent, not a dashboard
- Agencies running keyword and competitor research across many clients
- Founders auditing organic visibility before and after a launch

## Skills in this agent

- [`seo-audit`](seo-audit/) — Audit crawlability, on-page, and content against live SERP and ranking evidence — not a static checklist. _(enhanced)_
- [`seo-fix-plan`](seo-fix-plan/) — Convert live SEO audit evidence into prioritized fixes, owners, and acceptance checks. _(enhanced)_
- [`keyword-research`](keyword-research/) — Turn a seed list into ranked keyword opportunities and competitor gaps from live SERP and volume data. _(enhanced)_
- [`schema`](schema/) — Choose and implement the right schema.org types for a page, with valid JSON-LD the assistant can write. _(advice)_

## What you get

- Live organic and AI SERP positions for a keyword set
- Competitor domains and rich SERP features per query
- Keyword and backlink gap analysis vs named competitors
- Cited source records for every position and link claim

## Install & run

Connect in a couple of steps — prompt, web connector, or plugin, all read-only with OAuth sign-in (new workspaces get free trial credits):

**Paste one prompt** (Claude Code, Codex, Cursor, OpenClaw, Goose — any agent that manages its own MCP servers): ask it to add the UnifAPI MCP server at `https://mcp.unifapi.com` — a remote streamable-HTTP, read-only server — and run the OAuth sign-in. No API key to paste.

**Web connector — no terminal** (Claude, ChatGPT, Perplexity, Grok): add a custom connector pointed at `https://mcp.unifapi.com`, then authorize over OAuth.

**Add the skills** in any client with `npx skills add unifapi-agent/agents`. Claude-compatible hosts (Claude Code, Claude Desktop, OpenClaw) can instead install skills + MCP together as a plugin: `/plugin marketplace add unifapi-agent/agents` then `/plugin install unifapi@unifapi`.

Step-by-step for every client → https://unifapi.com/mcp

Then ask your assistant:

```text
Track these keywords for example.com in the US market: "unified api", "public data api", "mcp server". Return our organic and AI-overview positions, the competing domains, and the SERP features each query triggers. Then find 10 keyword gaps where competitor.com ranks and we don't, with evidence.
```

## Reads from

UnifAPI APIs: **seo, news, browser** — public data only.

## FAQ

### Does this replace an SEO suite like Ahrefs or Semrush?

For agent-run checks, often yes: you get the underlying SERP, keyword, and backlink records on demand without a per-seat dashboard. For a standing team workspace with crawls and projects, a suite still has a place — the SEO Agent is the on-demand, scriptable layer.

### Can it change my site or submit anything to Google?

No. In v1 the agent only reads public SERP and link data. It can describe on-page or technical fixes, but you or your own tools make the changes — UnifAPI never touches your site or Search Console.

### How is it billed?

Public-data reads are $0.001 per record with per-operation minimums generated from the OpenAPI contract. You reuse the Claude or Codex plan you already pay for; there is no separate LLM API key for the workflow.

## Links

- Agent page: https://unifapi.com/agents/seo
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: AI SEO tools · AI SEO audit · SEO tool for ChatGPT · AI keyword research tool · rank tracking tool · backlink checker · SEO for Claude · AI tools for SEO audit</sub>
