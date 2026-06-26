<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Homeowner Question Content

> Mine the real problem and cost questions homeowners ask about a trade's services and rank them into a content plan.

Homeowners search the problem ('why is my ac freezing up') and the money question ('cost to replace a furnace') — the highest-intent, lowest-cost content a contractor can own, feeding both Google and AI assistants. This skill mines those questions across search demand, communities, and AI prompts and ranks them into a content plan tied to the services the business offers. Read-only.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Contractors planning content from real homeowner questions
- HVAC, plumbing, roofing, and electrical marketers
- Businesses wanting AI-answer citations for repair questions

## What you get

- Questions clustered into problem and cost/decision topics, ranked by demand
- Per top topic: real homeowner phrasing, the service it maps to, localize/evergreen guidance
- AI-answer prompts where the business should be cited but isn't
- Every topic tied to the public source that proves homeowners are asking

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **seo, geo, reddit, news**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Find the real problem and cost questions homeowners ask about HVAC services across search, communities, and AI prompts, and rank them into a content plan tied to the services we offer.
```

## Install

Run it in any MCP client. **Paste one prompt** (Claude Code, Codex, Cursor, OpenClaw, …) to add the UnifAPI public-data MCP server at `https://mcp.unifapi.com` over OAuth — read-only, no API key — then add the marketing skills with `npx skills add unifapi-agent/agents`.

Prefer a **web connector** (Claude · ChatGPT · Perplexity · Grok), or the one-shot **plugin** for Claude-compatible hosts:

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Every client, step by step: https://unifapi.com/mcp

## Related

- Part of the **[Home Services Marketing Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/homeowner-question-content
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: home services content ideas · homeowner questions · cost to replace content · trade SEO content · AI answers for repair questions · HVAC content marketing</sub>
