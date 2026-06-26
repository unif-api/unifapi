<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Local SEO Agent

> Role Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The Local SEO Agent reads Maps and Local Finder listings and local SERPs to audit how a business shows up near its customers — names, addresses, ratings, categories, and local-pack position. Run it per location or across a multi-location brand.

## Who it's for

- Local businesses and multi-location brands tracking map visibility
- Agencies auditing local pack rankings across client locations
- Marketers checking listing accuracy and review presence at scale

## Skills in this agent

- [`local-pack-audit`](local-pack-audit/) — Pull the live local pack / map results for a business's queries and report exactly where it ranks vs competitors. _(enhanced)_
- [`listing-accuracy-audit`](listing-accuracy-audit/) — Read a business's public map/local listing and flag where the details are inconsistent, incomplete, or wrong. _(enhanced)_
- [`local-competitor-scan`](local-competitor-scan/) — Map the competitors ranking ahead in the local pack and surface what they have that you lack, in concrete numbers. _(enhanced)_

## What you get

- Local-pack and map rankings for a query and location
- Business listing details: name, address, category, rating, phone
- Competitor listings ranking for the same local queries
- Listing-accuracy and visibility gaps to fix

## Install & run

Connect in a couple of steps — prompt, web connector, or plugin, all read-only with OAuth sign-in (new workspaces get free trial credits):

**Paste one prompt** (Claude Code, Codex, Cursor, OpenClaw, Goose — any agent that manages its own MCP servers): ask it to add the UnifAPI MCP server at `https://mcp.unifapi.com` — a remote streamable-HTTP, read-only server — and run the OAuth sign-in. No API key to paste.

**Web connector — no terminal** (Claude, ChatGPT, Perplexity, Grok): add a custom connector pointed at `https://mcp.unifapi.com`, then authorize over OAuth.

**Add the skills** in any client with `npx skills add unifapi-agent/agents`. Claude-compatible hosts (Claude Code, Claude Desktop, OpenClaw) can instead install skills + MCP together as a plugin: `/plugin marketplace add unifapi-agent/agents` then `/plugin install unifapi@unifapi`.

Step-by-step for every client → https://unifapi.com/mcp

Then ask your assistant:

```text
Audit local visibility for "coffee shop" near downtown Austin, TX. Return the local-pack and map results, each listing's rating, category, and contact details, and where my business ranks vs the top competitors. Flag any listing details that look inconsistent.
```

## Reads from

UnifAPI APIs: **maps, local, seo** — public data only.

## FAQ

### Does it manage my Google Business Profile?

No. It reads public map and local-pack data to audit how you appear. It does not log into or edit your Business Profile — you make the listing changes it recommends.

### Can it handle many locations?

Yes. Because every check is an on-demand record rather than a standing project, you can loop the same audit across dozens of locations in one agent run and compare them.

### How does it relate to the SEO Agent?

The SEO Agent covers organic and AI SERPs broadly; the Local SEO Agent focuses on the map pack and local listings. They share the SEO API and are often run together for a business with physical locations.

## Links

- Agent page: https://unifapi.com/agents/local-seo
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: AI local SEO tool · local SEO tools for small business · Google Business Profile optimization · Google Maps rank tracker · local SEO audit · map pack tracking · multi-location local SEO · local SEO for Claude</sub>
