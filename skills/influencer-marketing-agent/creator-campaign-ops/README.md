<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Creator Campaign Ops

> Plan, match, price, confirm, track, and report an influencer campaign from public creator evidence.

Turn an influencer campaign brief into a full-funnel operating pack: matching plan, ranked shortlist, pricing forecast, confirm / negotiate / pass calls, content-review criteria, launch watchlist, and public-results readout. The Skill stays read-only: it drafts the handoff and tracks public posts, while the operator handles outreach, contracts, scheduling, payments, and private conversion data.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Marketing teams that want a full creator-campaign workflow, not only a shortlist
- Founders planning launch sponsorships with budget, content, and reporting checkpoints
- Agencies turning public creator evidence into repeatable campaign operating packs

## What you get

- Campaign spec with platform mix, markets, timeline, budget assumptions, and constraints
- Matching and budget model with ranked creators, price bands, predicted CPM/CPC, and confidence
- Confirmation table with confirm / negotiate / pass calls and unresolved outreach questions
- Content-review checklist, launch watchlist, public-results readout, and explicit operator handoffs

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **twitter, youtube, instagram, tiktok**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Plan a full-funnel influencer campaign for our product launch. Build the campaign spec, discover and rank creators, estimate pricing and predicted CPM/CPC, make confirm / negotiate / pass calls, draft content-review criteria, define the launch watchlist, and list operator handoffs for external systems.
```

## Install

Ships in the **UnifAPI Agents** plugin — one install adds the skills and the public-data MCP server (OAuth, read-only). In Claude Code or OpenClaw:

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Web connector (Claude · ChatGPT · Perplexity), Codex, Cursor, and the `npx skills` path: https://unifapi.com/mcp

## FAQ

### Does this replace a creator marketplace?

No. It gives an agent-native campaign operating pack from public evidence. Marketplace actions such as applications, negotiation, contracts, scheduling, payments, and private creator data still need external tools or operator work.

### Can it compare predicted and actual performance?

Yes for public post metrics after you provide live URLs or IDs. Private clicks, promo-code sales, checkout events, and UTM conversions require user-provided exports or an analytics API.

### What still needs external systems?

Marketplace-style execution still needs external systems for indexed creator search at massive scale, contactability/application status, outreach and follow-up, contracts and rights, scheduling, and private attribution.

## Related

- Part of the **[Influencer Marketing Agent](../)**
- [`creator-shortlist`](../creator-shortlist/) — Find creators by niche, audience language, recent momentum, and platform fit.
- [`audience-fit-check`](../audience-fit-check/) — Vet a single creator's audience fit and brand-safety from public posts and engagement before outreach.
- [`kol-pricing`](../kol-pricing/) — Estimate Twitter/X KOL rates from public engagement, audience fit, and risk.
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/creator-campaign-ops
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: influencer campaign management · creator campaign planning · influencer campaign tracking · influencer marketing workflow · creator campaign report · influencer matching · creator content review · how to run an influencer campaign</sub>
