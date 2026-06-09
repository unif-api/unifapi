<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Med Spa Marketing Agent

> Vertical Agent · run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client. Read-only public-data research — **eyes, not hands**.

The Med Spa Marketing Agent recombines local SEO, social listening, content strategy, and AI visibility for medical spas and aesthetics clinics. It audits local search presence, mines demand around treatments, and checks AI-answer visibility for the procedures a clinic offers.

**Powered by:** [Local SEO](../local-seo-agent/) · [Social listening](../social-listening-agent/) · [Content strategy](../content-strategy-agent/) · [AI visibility](../ai-visibility-agent/)

## Who it's for

- Med spa and aesthetics clinic owners and marketers
- Agencies serving multi-location med spa brands
- Marketers planning treatment content from real demand

## Skills in this agent

- [`med-spa-reputation-benchmark`](med-spa-reputation-benchmark/) — Compare a clinic's review count, rating, and velocity against the nearest competitors — the #1 med-spa local lever. _(enhanced)_
- [`treatment-demand-radar`](treatment-demand-radar/) — Map treatment search demand and social trends to a clinic's service menu and content plan. _(enhanced)_

## What you get

- Local-pack rankings for treatment + city queries
- Content demand around treatments and procedures
- AI-answer visibility for 'med spa near me'-style prompts
- Review-presence and listing gaps vs local competitors

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
Audit med spa marketing visibility for my clinic in Miami, FL. Check local-pack rankings for treatments like "botox" and "laser hair removal", find content demand around those treatments, and check whether we're cited in AI answers for med-spa search prompts.
```

## Reads from

UnifAPI APIs: **maps, local, seo, geo, tiktok** — public data only.

> This is a marketing agent — read-only research and visibility. It is not a licensed professional in this industry, it does not replace one, and it never posts, advertises, or changes anything on your behalf.

## FAQ

### Does it give medical advice?

No. It is a marketing agent for med spas — it researches search and content visibility. It does not provide medical or treatment advice and is not a substitute for a licensed professional.

### Can it handle multiple locations?

Yes. It loops the same local and content audit across each location and compares them, which is useful for multi-clinic brands.

### What powers it under the hood?

Four Role Agents — Local SEO, Content Strategy, Social Listening, and AI Visibility — tuned for med spa and aesthetics queries, on the same public-data APIs.

## Links

- Agent page: https://unifapi.com/agents/med-spa-marketing
- Install & all clients: https://unifapi.com/mcp
- MCP server: `https://mcp.unifapi.com`
- All agents: https://unifapi.com/agents · Docs: https://docs.unifapi.com

<sub>Topics: med spa marketing · med spa marketing ideas · med spa SEO · med spa local SEO · marketing for medical spas · aesthetics marketing · AI SEO for med spas · med spa AI visibility</sub>
