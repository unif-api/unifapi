<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Service Area Rank Audit

> Audit local-pack rank for a trade's service + location queries across every city and ZIP it serves.

Home-services businesses live or die by the local pack, and local rank is computed per location — a contractor can dominate its home city and be invisible two towns over. This skill audits local-pack rank for the trade's service + location queries across every service area, benchmarks against the competitors there, and surfaces which areas are weak. Read-only.

An atomic marketing skill you run inside Claude, Claude Code, ChatGPT (custom MCP), Codex, Cursor, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Contractors and home-service businesses serving many areas
- HVAC, plumbing, roofing, and electrical companies
- Agencies auditing multi-area local rank for clients

## What you get

- Service-area × service rank grid: business vs the pack holders
- Areas ranked strong / contested / weak, with core-service losses called out
- Per weak area: the competitors holding the pack and their review/rating gap
- Every rank and number cited to the live map/SERP record

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **maps, local, seo**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Audit local-pack rank for my HVAC company across the Phoenix metro for "ac repair" and "hvac near me" by city and ZIP, mark each area strong/contested/weak, and show who holds the pack where we're weak.
```

## Related

- Part of the **[Home Services Marketing Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/service-area-rank-audit
- The skill itself: [SKILL.md](./SKILL.md)
- Install — one plugin, skills + live data: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: service area ranking · home services local SEO · multi-area local SEO · contractor map pack · HVAC local SEO · near me ranking by location</sub>
