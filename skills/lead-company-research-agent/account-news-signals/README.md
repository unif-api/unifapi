<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Account News Signals

> Pull recent public news for a target account and convert each event into a dated, sourced outreach hook.

A relevant reason to reach out beats a clever subject line. Funding rounds, new executives, expansion, launches, and partnerships are public trigger events. This skill pulls recent public news for a target account and converts each item into a dated outreach hook tied to its source. Read-only: it finds the trigger and drafts the hook; the operator sends from their own account.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- SDRs and sellers prospecting with timely, relevant openers
- Account planners tracking trigger events on target accounts
- Founders finding a reason to reach out now

## What you get

- Dated event list: type, date, source link, and who it affects
- A one-line outreach hook per event, tied to its source
- A freshness note flagging current vs aging events
- Flags on events needing a second-source verification

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **news, linkedin**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Pull recent public news for this target account — funding, leadership changes, expansion, launches — and turn each into a dated, sourced one-line outreach hook, flagging what's still fresh.
```

## Install

Ships in the **UnifAPI Agents** plugin — one install adds the skills and the public-data MCP server (OAuth, read-only). In Claude Code or OpenClaw:

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Web connector (Claude · ChatGPT · Perplexity), Codex, Cursor, and the `npx skills` path: https://unifapi.com/mcp

## Related

- Part of the **[Lead & Company Research Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/account-news-signals
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: company news monitoring · sales trigger events · account research · funding announcements for sales · news-based outreach · timely outreach hook</sub>
