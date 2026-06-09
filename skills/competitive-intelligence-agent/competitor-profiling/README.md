<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Competitor Profiling

> Turn a competitor's public footprint into a structured, source-cited profile — positioning, product, pricing, and implications.

Research a competitor from its public footprint and produce a structured, source-cited dossier: positioning and messaging, product and features, pricing, customers and social proof, strengths and weaknesses, and the implications for your product. Every claim links to the public page or post it came from, dated. Input is a name or URL.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Founders and PMMs building a competitive landscape
- Sales teams needing a sourced competitor dossier
- Strategy teams that want positioning evidence, not vibes

## What you get

- Structured profile: at-a-glance, positioning, product, pricing, customers
- Strengths and weaknesses, each with an evidence source
- Implications for your product: openings and threats
- Sources: every URL with the date pulled

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **seo, browser, twitter, linkedin, youtube, reddit, news**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Profile competitor.com from its public footprint: positioning, product and pricing, customers and sentiment, strengths and weaknesses, and what it all means for us — every claim sourced.
```

## Install

Ships in the **UnifAPI Agents** plugin — one install adds the skills and the public-data MCP server (OAuth, read-only). In Claude Code or OpenClaw:

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Web connector (Claude · ChatGPT · Perplexity), Codex, Cursor, and the `npx skills` path: https://unifapi.com/mcp

## Related

- Part of the **[Competitive Intelligence Agent](../)**
- [`competitor-launch-monitor`](../competitor-launch-monitor/) — Collect public launch signals and turn them into a competitive brief.
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/competitor-profiling
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

## Credits

Adapted from [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) (MIT, Corey Haines), enhanced with live public-data evidence via UnifAPI.

<sub>Topics: AI competitor analysis · competitor research · competitor profile · competitive analysis · competitor dossier · competitor deep dive</sub>
