<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# SEO Audit

> Audit crawlability, on-page, and content against live SERP and ranking evidence — not a static checklist.

A technical and on-page SEO audit that pulls live SERP positions, competitor results, and rich-feature data from UnifAPI so every finding is backed by what's actually ranking, then prioritizes fixes by impact.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Founders diagnosing why a page isn't ranking
- SEO teams that want findings backed by live SERP evidence
- Agencies running repeatable audits across many sites

## What you get

- Prioritized issue list (crawl, on-page, content) with impact
- Live organic positions and the competing pages for each query
- Quick wins vs long-term fixes, each with the evidence behind it

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **seo, browser**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Audit example.com for the keyword set ["unified api", "public data api"]. Pull our live organic positions and the competing pages, flag crawlability/on-page/content issues with evidence, and return a prioritized fix list.
```

## Install

Ships in the **UnifAPI Agents** plugin — one install adds the skills and the public-data MCP server (OAuth, read-only). In Claude Code or OpenClaw:

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Web connector (Claude · ChatGPT · Perplexity), Codex, Cursor, and the `npx skills` path: https://unifapi.com/mcp

## FAQ

### Does it change my site?

No. It reads public SERP and page data and tells you what to fix; you or your own assistant make the changes. UnifAPI never touches your site or Search Console.

### How is it different from a checklist audit?

Every finding is tied to live ranking evidence — what's actually ranking for your queries and who's beating you — instead of a generic best-practice list.

## Related

- Part of the **[SEO Agent](../)**
- [`seo-fix-plan`](../seo-fix-plan/) — Convert live SEO audit evidence into prioritized fixes, owners, and acceptance checks.
- [`keyword-research`](../keyword-research/) — Turn a seed list into ranked keyword opportunities and competitor gaps from live SERP and volume data.
- [`schema`](../schema/) — Choose and implement the right schema.org types for a page, with valid JSON-LD the assistant can write.
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/seo-audit
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

## Credits

Adapted from [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) (MIT, Corey Haines), enhanced with live public-data evidence via UnifAPI.

<sub>Topics: AI SEO audit · SEO audit tool · technical SEO audit · on-page SEO audit · website SEO checker · SEO tool for ChatGPT · site audit for Claude · backlink audit</sub>
