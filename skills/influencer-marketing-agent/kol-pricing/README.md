<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# KOL Pricing Agent

> Estimate Twitter/X KOL rates from public engagement, audience fit, and risk.

Ask Claude, ChatGPT custom MCP apps, OpenClaw, Hermes, Codex, Claude Code, Cursor, VS Code, or another MCP-capable agent to price public Twitter/X creators with UnifAPI MCP, recent engagement, audience fit, and confidence notes.

An atomic marketing skill you run inside Claude, Claude Code, ChatGPT (custom MCP), Codex, Cursor, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Marketing teams planning creator sponsorship budgets
- Founders comparing influencer outreach targets before a launch
- Agencies that want repeatable pricing evidence instead of spreadsheet guesswork

## What you get

- Ranked creator table with suggested low/base/high rate range
- Evidence summary from recent public posts and engagement metrics
- Audience-fit and brand-safety notes
- Follow-up searches the agent should run before outreach

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **twitter, youtube, instagram, tiktok, reddit**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Analyze these Twitter/X KOLs for an AI developer-tool campaign: @vercel, @shadcn, @rauchg. Use UnifAPI public data, compare recent engagement, audience fit, posting cadence, and collaboration risk. Return a ranked table with estimated sponsored-post price ranges, confidence, evidence, and follow-up questions.
```

## FAQ

### Does this replace a creator marketplace or agency quote?

No. It gives an evidence-backed starting range from public data so a marketer can negotiate with more context. Final pricing still depends on creator terms, package, exclusivity, usage rights, and campaign scope.

### Why use an agent instead of a GUI app?

KOL pricing is rarely a single click. The useful work is follow-up: search adjacent creators, compare historical posts, ask why one account is risky, and rerun the brief for a new niche. Codex or Claude Code can keep that loop in one thread.

### Do I need to configure an LLM API key?

No. Bring the agent product you already use, such as Codex or Claude Code. UnifAPI provides the MCP public-data tools; the agent plan handles model execution.

### How is this priced against the official Twitter/X API?

UnifAPI standard public-data records are one $0.001 credit, with operation minimums published from OpenAPI. X's current public pay-per-use docs list public read operations such as posts at $0.005 per resource and users or trends at $0.010 per resource, while X owned-read pricing is a separate case for your own authenticated data.

## Related

- Part of the **[Influencer Marketing Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/kol-pricing
- The skill itself: [SKILL.md](./SKILL.md)
- Install — one plugin, skills + live data: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

## Credits

Adapted from [Antoniaiaiaiaia/kol-pricing](https://github.com/Antoniaiaiaiaia/kol-pricing) (MIT, Antonia (@antoniayly)), enhanced with live public-data evidence via UnifAPI. See [references/original-license.md](./references/original-license.md) for the original license.

<sub>Topics: influencer rate calculator · how much to pay an influencer · influencer pricing calculator · sponsored post rate · creator pricing · influencer cost estimation · Twitter influencer rates · KOL pricing</sub>
