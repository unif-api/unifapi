<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Real Estate Marketing Agent

> Vertical Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The Real Estate Marketing Agent recombines local SEO, social listening, content strategy, and AI visibility for real estate marketing. It audits how a brokerage or agent shows up in local search, map listings, AI answers, and content for the neighborhoods they serve.

**Powered by:** [Local SEO](../local-seo-agent/) · [Social listening](../social-listening-agent/) · [Content strategy](../content-strategy-agent/) · [AI visibility](../ai-visibility-agent/)

## Who it's for

- Brokerages and teams marketing across multiple neighborhoods
- Individual agents auditing their local search presence
- Real estate marketers planning content from buyer demand

## Skills in this agent

- [`neighborhood-guide-opportunity`](neighborhood-guide-opportunity/) — Find the neighborhood-level search and content opportunities agents can own where Zillow and the portals are weak. _(enhanced)_
- [`agent-reputation-benchmark`](agent-reputation-benchmark/) — Benchmark an agent's public reviews and local-pack presence against the nearest competitors for realtor queries. _(enhanced)_

## What you get

- Local-pack and map rankings for target neighborhoods
- Content topics from real buyer and seller questions
- AI-answer visibility for 'realtor near me'-style prompts
- Listing-accuracy and review-presence gaps to fix

## Install & run

Connect in a couple of steps — prompt, web connector, or plugin, all read-only with OAuth sign-in (new workspaces get free trial credits):

**Paste one prompt** (Claude Code, Codex, Cursor, OpenClaw, Goose — any agent that manages its own MCP servers): ask it to add the UnifAPI MCP server at `https://mcp.unifapi.com` — a remote streamable-HTTP, read-only server — and run the OAuth sign-in. No API key to paste.

**Web connector — no terminal** (Claude, ChatGPT, Perplexity, Grok): add a custom connector pointed at `https://mcp.unifapi.com`, then authorize over OAuth.

**Add the skills** in any client with `npx skills add unifapi-agent/agents`. Claude-compatible hosts (Claude Code, Claude Desktop, OpenClaw) can instead install skills + MCP together as a plugin: `/plugin marketplace add unifapi-agent/agents` then `/plugin install unifapi@unifapi`.

Step-by-step for every client → https://unifapi.com/mcp

Then ask your assistant:

```text
Audit real estate marketing visibility for my brokerage in Austin, TX. Check local-pack rankings for "realtor" and "homes for sale" by neighborhood, find content topics from what local buyers are asking, and check whether we're cited in AI answers for agent-search prompts.
```

## Reads from

UnifAPI APIs: **maps, local, seo, geo, news** — public data only.

> This is a marketing agent — read-only research and visibility. It is not a licensed professional in this industry, it does not replace one, and it never posts, advertises, or changes anything on your behalf.

## FAQ

### Is this a real estate agent or a marketing tool?

It is a marketing agent — it researches and audits how your real estate business shows up online. It is not a licensed real estate agent and does not represent buyers or sellers.

### Does it include MLS or property/listing data?

No. v1 is the marketing vertical only — local search, content, and AI visibility. Property and listing data would need separate APIs and is a future direction, not part of this agent.

### What powers it under the hood?

It recombines four Role Agents — Local SEO, Social Listening, Content Strategy, and AI Visibility — tuned for real estate queries. The same public-data APIs, packaged for the industry.

## Links

- Agent page: https://unifapi.com/agents/real-estate-marketing
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: real estate marketing · real estate marketing ideas · AI marketing for realtors · real estate SEO · realtor local SEO · marketing for real estate agents · AI tools for real estate agents · real estate AI visibility</sub>
