<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Audience Fit Check

> Vet a single creator's audience fit and brand-safety from public posts and engagement before outreach.

Given one creator and a brand/product, assess whether their audience actually matches the target customer and whether their public content carries brand-safety risk — before the operator spends budget or sends outreach. Evidence comes from public posts and engagement, not assumptions. Read-only research, not outreach.

An atomic marketing skill you run inside Claude, Claude Code, ChatGPT (custom MCP), Codex, Cursor, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Marketing teams vetting a creator before committing budget
- Founders running due diligence on a sponsorship target
- Agencies adding a brand-safety gate before outreach

## What you get

- Fit verdict (strong / partial / mismatch) with topic and audience evidence
- Brand-safety flags, each cited to a specific public post
- Engagement read: rate, comment quality, and inflation concerns
- Recommendation: proceed / proceed with conditions / pass

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **twitter, youtube, tiktok, instagram**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Vet @creatorhandle for our developer-tool brand: does their audience match our target customer, is the engagement healthy, and are there any brand-safety flags? Give me a proceed / conditions / pass call with evidence.
```

## Related

- Part of the **[Influencer Marketing Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/audience-fit-check
- The skill itself: [SKILL.md](./SKILL.md)
- Install — one plugin, skills + live data: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: creator vetting · influencer brand safety check · vet a creator · creator audience fit · influencer audience analysis · creator due diligence</sub>
