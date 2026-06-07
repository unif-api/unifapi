<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Med Spa Reputation Benchmark

> Compare a clinic's review count, rating, and velocity against the nearest competitors — the #1 med-spa local lever.

Reviews drive both med-spa local-pack rank (prominence) and conversion. This skill reads public listing data through UnifAPI to benchmark a clinic's review volume, rating, and 90-day velocity against the nearest competitors and quantify the gap to close.

An atomic marketing skill you run inside Claude, Claude Code, ChatGPT (custom MCP), Codex, Cursor, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Med spa owners losing the local pack to nearby clinics
- Aesthetics marketers tracking review velocity as a KPI
- Agencies benchmarking multi-location med spa brands

## What you get

- Review count, rating, and 90-day velocity vs the nearest competitors
- Gap to the local-pack leader, quantified
- Net-new reviews/quarter needed to close it

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **maps, local, seo**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Benchmark my med spa in Miami against the 4 nearest competitors for "botox" and "laser hair removal": review count, rating, and reviews in the last 90 days. Tell me the gap to the local leader and how many net-new reviews per quarter would close it.
```

## FAQ

### Does it solicit or post reviews for me?

No. It is read-only marketing research — it benchmarks public review data and tells you the gap. Your own team runs any review-generation; UnifAPI never posts on your behalf.

### Is this medical advice?

No. It is a marketing audit for med spas and does not provide medical or treatment advice.

## Related

- Part of the **[Med Spa Marketing Agent](../)**
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/med-spa-reputation-benchmark
- The skill itself: [SKILL.md](./SKILL.md)
- Install — one plugin, skills + live data: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: med spa reputation management · med spa Google reviews · med spa review benchmark · med spa local SEO · med spa map pack · review velocity</sub>
