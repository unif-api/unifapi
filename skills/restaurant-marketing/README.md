<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Restaurant Marketing Agent

> Vertical Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The Restaurant Marketing Agent recombines local SEO, social listening, content strategy, and AI visibility for restaurants. It audits map and local-pack presence, tracks social buzz and reviews, and checks AI-answer visibility for the cuisines and dishes a venue is known for.

**Powered by:** [Local SEO](../local-seo-agent/) · [Social listening](../social-listening-agent/) · [Content strategy](../content-strategy-agent/) · [AI visibility](../ai-visibility-agent/)

## Who it's for

- Restaurant owners and groups marketing one or many venues
- Hospitality marketers tracking local search and social buzz
- Agencies serving restaurant and food-service brands

## Skills in this agent

- [`restaurant-local-buzz`](restaurant-local-buzz/) — Audit a venue's local-pack rank, review themes, and recent TikTok buzz for its cuisine and category. _(enhanced)_
- [`menu-demand-radar`](menu-demand-radar/) — Map demand for a venue's cuisine and dishes across local search, AI answers, and TikTok to prioritize content and promos. _(enhanced)_

## What you get

- Local-pack and map rankings for cuisine + city queries
- Social buzz and review themes for the venue
- AI-answer visibility for 'restaurant near me'-style prompts
- Listing-accuracy and review gaps vs nearby venues

## Install & run

Connect in a couple of steps — prompt, web connector, or plugin, all read-only with OAuth sign-in (new workspaces get free trial credits):

**Paste one prompt** (Claude Code, Codex, Cursor, OpenClaw, Goose — any agent that manages its own MCP servers): ask it to add the UnifAPI MCP server at `https://mcp.unifapi.com` — a remote streamable-HTTP, read-only server — and run the OAuth sign-in. No API key to paste.

**Web connector — no terminal** (Claude, ChatGPT, Perplexity, Grok): add a custom connector pointed at `https://mcp.unifapi.com`, then authorize over OAuth.

**Add the skills** in any client with `npx skills add unifapi-agent/agents`. Claude-compatible hosts (Claude Code, Claude Desktop, OpenClaw) can instead install skills + MCP together as a plugin: `/plugin marketplace add unifapi-agent/agents` then `/plugin install unifapi@unifapi`.

Step-by-step for every client → https://unifapi.com/mcp

Then ask your assistant:

```text
Audit restaurant marketing visibility for my venue in Portland, OR. Check local-pack rankings for "best ramen" and "dinner near me", track recent social buzz and review themes, and check whether we're cited in AI answers for restaurant-search prompts.
```

## Reads from

UnifAPI APIs: **maps, local, seo, geo, tiktok** — public data only.

> This is a marketing agent — read-only research and visibility. It is not a licensed professional in this industry, it does not replace one, and it never posts, advertises, or changes anything on your behalf.

## FAQ

### Does it manage my listings or reservations?

No. It reads public local, review, and social data to audit your presence; you make any listing or platform changes it recommends.

### Can it cover multiple locations?

Yes. It loops the same audit per venue and compares them, which suits restaurant groups and franchises.

### What powers it under the hood?

Local SEO, Social Listening, Content Strategy, and AI Visibility Role Agents tuned for restaurant queries, on the same public-data APIs.

## Links

- Agent page: https://unifapi.com/agents/restaurant-marketing
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: restaurant marketing · restaurant marketing ideas · restaurant local SEO · restaurant SEO · restaurant social media marketing · restaurant reputation management · AI visibility for restaurants · hospitality marketing</sub>
