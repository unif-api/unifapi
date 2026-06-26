<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Patient Question Content

> Mine the real questions patients ask about a practice's services and rank them into a content plan.

Patients research specific procedure questions before they book. This skill mines the questions real patients ask about a practice's services — across search demand, online communities, and AI-answer prompts — and turns them into a prioritized content plan that earns rank, clicks, and AI citations. Read-only marketing research, not clinical advice.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Dental practices planning content from real patient questions
- Dental marketers building a procedure-question content plan
- Practices wanting AI-answer citations for service questions

## What you get

- Patient questions clustered into topics, ranked by combined demand
- Per topic: working title, the question it answers, target query, intent
- AI-answer prompts where the practice should be cited but isn't

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **seo, geo, reddit, news**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Find the real questions patients ask about teeth whitening, implants, and Invisalign across search, communities, and AI prompts, and rank them into a content plan with titles and target queries.
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

- Part of the **[Dental Marketing Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/patient-question-content
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: dental content ideas · patient questions content · dental blog topics · dental SEO content · AI answers for dental questions · dental AEO content</sub>
