# UnifAPI Agents

Open-source **marketing agents** for Claude, ChatGPT, Codex, OpenClaw, Hermes, and any MCP client. Install one plugin and your assistant runs **SEO audits, generative engine optimization (GEO) / AI-visibility checks, local SEO, KOL pricing, social listening, competitive intelligence, and industry marketing** from **live public data**. Each agent is a folder of `SKILL.md` skills over UnifAPI's public-data APIs. Read-only — **eyes, not hands** — they research and price; they never post.

[![Website](https://img.shields.io/badge/web-unifapi.com%2Fagents-1f6feb)](https://unifapi.com/agents)
[![Docs](https://img.shields.io/badge/docs-docs.unifapi.com-1f6feb)](https://docs.unifapi.com)
[![Plugin](https://img.shields.io/badge/plugin-Claude%20%C2%B7%20OpenClaw%20%C2%B7%20Hermes-8957e5)](#install--one-plugin-skills--live-data)
[![skills.sh](https://skills.sh/b/unifapi-agent/agents)](https://skills.sh/unifapi-agent/agents)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

**[Agents](https://unifapi.com/agents)** · **[Skills](https://unifapi.com/skills)** · **[Install](https://unifapi.com/mcp)** · **[Connect a client](./connect/)** · **[API catalog](https://unifapi.com/apis)** · **[Docs](https://docs.unifapi.com)**

These skills are generated and versioned — to suggest a change, open an issue or PR (see [CONTRIBUTING.md](./CONTRIBUTING.md)).

## Install — one plugin: skills + live data

One install gives your agent **both** the marketing-agent skills **and** the public-data MCP server — no manual server config, no API key to paste. Sign in once with OAuth (new workspaces get free trial credits); everything is read-only.

**Claude Code · Claude Desktop · OpenClaw** — recommended (Claude-compatible plugin):

```bash
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi      # that's plugin@marketplace
```

**Hermes:**

```bash
hermes plugins install unifapi-agent/agents
```

**Codex** — this repo ships a `.codex-plugin/plugin.json` (the same skills **and** the OAuth MCP server) for Codex's plugin system, so one install gives you both. To wire it up manually instead, add the server to `~/.codex/config.toml` and run `codex mcp login unifapi`:

```toml
[mcp_servers.unifapi]
url = "https://mcp.unifapi.com"
```

**ChatGPT** (Developer Mode — Plus/Pro/Team/Enterprise): Settings → Connectors → Advanced → enable Developer Mode → **Create**, set the MCP server URL to `https://mcp.unifapi.com` with OAuth.

**Any other agent-skills client (`npx skills`)** — the universal fallback when you're not on a plugin host above. The [skills.sh](https://skills.sh/unifapi-agent/agents) CLI installs the skills into any supported agent:

```bash
npx skills add unifapi-agent/agents
```

This installs the skills only; add `https://mcp.unifapi.com` as an MCP server in your client (OAuth) for live data.

Setting up a specific client? Step-by-step pages for every supported client live in [`connect/`](./connect/).

After installing, sign in when prompted and ask your assistant:

```text
Audit example.com for "unified api" and "public data api": pull our live organic and
AI-answer positions, the competing pages, and a prioritized fix list — cite every finding.
```

## Agents

Role Agents own the skills; Vertical and Platform Agents recombine them by industry and by source. Full agent → skill → API map in [AGENTS.md](./AGENTS.md).

### Role agents
- **[SEO Agent](skills/seo-agent/)** — Track rankings, audit SERPs, and research keywords, competitors, and backlinks as live records — inside your assistant.
- **[AI Visibility Agent](skills/ai-visibility-agent/)** — Measure whether your brand and domain get cited in AI answers across ChatGPT and AI search — and where competitors win the answer.
- **[Local SEO Agent](skills/local-seo-agent/)** — Audit local-pack rankings, map listings, and review presence for one location or hundreds.
- **[Influencer Marketing Agent](skills/influencer-marketing-agent/)** — Plan, match, price, confirm, track, and report creator campaigns from public engagement evidence.
- **[Content Strategy Agent](skills/content-strategy-agent/)** — Turn public demand — keywords, Reddit threads, YouTube, and news — into a content plan with evidence.
- **[Social Listening Agent](skills/social-listening-agent/)** — Monitor public mentions across X, Reddit, TikTok, and news, and get a brief when something meaningfully changes.
- **[Social Selling Agent](skills/social-selling-agent/)** — Spot buying signals and warm openings across X and LinkedIn, then prep evidence-backed outreach.
- **[Competitive Intelligence Agent](skills/competitive-intelligence-agent/)** — Track what competitors ship and say across X, LinkedIn, YouTube, Reddit, and news — and explain what changed.
- **[Lead & Company Research Agent](skills/lead-company-research-agent/)** — Build B2B account and company briefs from public LinkedIn and news signals.

### Vertical agents
- **[Real Estate Marketing Agent](skills/real-estate-marketing/)** — Local visibility, listing presence, content, and AI-answer citations for brokerages and agents.
- **[Med Spa Marketing Agent](skills/med-spa-marketing/)** — Local rankings, treatment-content demand, reviews, and AI visibility for med spas and aesthetics clinics.
- **[Dental Marketing Agent](skills/dental-marketing/)** — Local rankings, patient-question content, reviews, and AI visibility for dental practices.
- **[Law Firm Marketing Agent](skills/law-firm-marketing/)** — Local rankings, practice-area content, reputation, and AI visibility for law firms and attorneys.
- **[Restaurant Marketing Agent](skills/restaurant-marketing/)** — Local rankings, social buzz, reviews, and AI visibility for restaurants and hospitality.
- **[Home Services Marketing Agent](skills/home-services-marketing/)** — Local rankings, service-area content, reviews, and AI visibility for home services and contractors.

### Platform agents
- **[X (Twitter) Agent](skills/x-twitter-agent/)** — Research public X / Twitter profiles, posts, communities, and trends — read-only, inside your assistant.
- **[LinkedIn Agent](skills/linkedin-agent/)** — Research public LinkedIn companies, people, jobs, and posts for B2B — read-only, inside your assistant.
- **[Reddit Agent](skills/reddit-agent/)** — Research public subreddits, threads, and community language — read-only, inside your assistant.
- **[TikTok Agent](skills/tiktok-agent/)** — Research public TikTok creators, videos, hashtags, and trends — read-only, inside your assistant.
- **[YouTube Agent](skills/youtube-agent/)** — Research public YouTube channels, videos, and trends — read-only, inside your assistant.
- **[Instagram Agent](skills/instagram-agent/)** — Research public Instagram profiles, posts, reels, and comments — read-only, inside your assistant.
- **[Hacker News Agent](skills/hacker-news-agent/)** — Research public Hacker News launches, threads, and sentiment — read-only, inside your assistant.
- **[Threads Agent](skills/threads-agent/)** — Research public Threads posts, profiles, and conversation — read-only, inside your assistant.

## Skills

<!-- SKILLS:START -->
| Skill | Agent | Type | What it does |
|-------|-------|------|--------------|
| [seo-audit](skills/seo-agent/seo-audit/) | SEO Agent | enhanced | Audit crawlability, on-page, and content against live SERP and ranking evidence — not a static checklist. |
| [seo-fix-plan](skills/seo-agent/seo-fix-plan/) | SEO Agent | enhanced | Convert live SEO audit evidence into prioritized fixes, owners, and acceptance checks. |
| [keyword-research](skills/seo-agent/keyword-research/) | SEO Agent | enhanced | Turn a seed list into ranked keyword opportunities and competitor gaps from live SERP and volume data. |
| [schema](skills/seo-agent/schema/) | SEO Agent | advice | Choose and implement the right schema.org types for a page, with valid JSON-LD the assistant can write. |
| [ai-visibility-audit](skills/ai-visibility-agent/ai-visibility-audit/) | AI Visibility Agent | enhanced | The GEO equivalent of an SEO audit — check whether you're cited in AI answers and who owns the answer instead. |
| [ai-visibility-fix-plan](skills/ai-visibility-agent/ai-visibility-fix-plan/) | AI Visibility Agent | enhanced | Prioritize Structure, Authority, and Presence fixes for prompts where AI answers do not cite you. |
| [llm-mention-tracking](skills/ai-visibility-agent/llm-mention-tracking/) | AI Visibility Agent | enhanced | Track how often you're mentioned across ChatGPT and AI search over a fixed prompt set, and how share of voice moves vs competitors. |
| [ai-answer-gap](skills/ai-visibility-agent/ai-answer-gap/) | AI Visibility Agent | enhanced | Find the prompts you should own in AI answers but don't, name who owns each, and rank the gaps by AI search volume. |
| [local-pack-audit](skills/local-seo-agent/local-pack-audit/) | Local SEO Agent | enhanced | Pull the live local pack / map results for a business's queries and report exactly where it ranks vs competitors. |
| [listing-accuracy-audit](skills/local-seo-agent/listing-accuracy-audit/) | Local SEO Agent | enhanced | Read a business's public map/local listing and flag where the details are inconsistent, incomplete, or wrong. |
| [local-competitor-scan](skills/local-seo-agent/local-competitor-scan/) | Local SEO Agent | enhanced | Map the competitors ranking ahead in the local pack and surface what they have that you lack, in concrete numbers. |
| [creator-campaign-ops](skills/influencer-marketing-agent/creator-campaign-ops/) | Influencer Marketing Agent | enhanced | Plan, match, price, confirm, track, and report an influencer campaign from public creator evidence. |
| [creator-shortlist](skills/influencer-marketing-agent/creator-shortlist/) | Influencer Marketing Agent | enhanced | Find creators by niche, audience language, recent momentum, and platform fit. |
| [audience-fit-check](skills/influencer-marketing-agent/audience-fit-check/) | Influencer Marketing Agent | enhanced | Vet a single creator's audience fit and brand-safety from public posts and engagement before outreach. |
| [kol-pricing](skills/influencer-marketing-agent/kol-pricing/) | Influencer Marketing Agent | enhanced | Estimate Twitter/X KOL rates from public engagement, audience fit, and risk. |
| [content-opportunity-brief](skills/content-strategy-agent/content-opportunity-brief/) | Content Strategy Agent | enhanced | Find repeated questions and formats across YouTube, TikTok, Reddit, and X. |
| [content-strategy](skills/content-strategy-agent/content-strategy/) | Content Strategy Agent | enhanced | Turn real public demand into content pillars, a topic-cluster map, and a sequenced calendar — each topic backed by evidence. |
| [customer-research](skills/content-strategy-agent/customer-research/) | Content Strategy Agent | enhanced | Mine authentic customer language, pains, and objections from public communities to inform messaging and content. |
| [social-listening-brief](skills/social-listening-agent/social-listening-brief/) | Social Listening Agent | enhanced | Track public mentions and return a concise brief instead of a dashboard. |
| [reddit-community-research](skills/social-listening-agent/reddit-community-research/) | Social Listening Agent | enhanced | Map subreddits, recurring questions, objections, and language for a niche. |
| [reddit-thread-fit-check](skills/social-listening-agent/reddit-thread-fit-check/) | Social Listening Agent | enhanced | Score Reddit threads by relevance, intent, rules, timing, and account risk before anyone replies. |
| [buying-signal-monitor](skills/social-selling-agent/buying-signal-monitor/) | Social Selling Agent | enhanced | Watch public X and LinkedIn for buying intent and return warm leads, each anchored to the post that proves it. |
| [linkedin-account-research](skills/lead-company-research-agent/linkedin-account-research/) | Lead & Company Research Agent | enhanced | Use public company, post, job, and profile signals for B2B research. |
| [competitor-launch-monitor](skills/competitive-intelligence-agent/competitor-launch-monitor/) | Competitive Intelligence Agent | enhanced | Collect public launch signals and turn them into a competitive brief. |
| [competitor-profiling](skills/competitive-intelligence-agent/competitor-profiling/) | Competitive Intelligence Agent | enhanced | Turn a competitor's public footprint into a structured, source-cited profile — positioning, product, pricing, and implications. |
| [account-news-signals](skills/lead-company-research-agent/account-news-signals/) | Lead & Company Research Agent | enhanced | Pull recent public news for a target account and convert each event into a dated, sourced outreach hook. |
| [neighborhood-guide-opportunity](skills/real-estate-marketing/neighborhood-guide-opportunity/) | Real Estate Marketing Agent | enhanced | Find the neighborhood-level search and content opportunities agents can own where Zillow and the portals are weak. |
| [agent-reputation-benchmark](skills/real-estate-marketing/agent-reputation-benchmark/) | Real Estate Marketing Agent | enhanced | Benchmark an agent's public reviews and local-pack presence against the nearest competitors for realtor queries. |
| [med-spa-reputation-benchmark](skills/med-spa-marketing/med-spa-reputation-benchmark/) | Med Spa Marketing Agent | enhanced | Compare a clinic's review count, rating, and velocity against the nearest competitors — the #1 med-spa local lever. |
| [treatment-demand-radar](skills/med-spa-marketing/treatment-demand-radar/) | Med Spa Marketing Agent | enhanced | Map treatment search demand and social trends to a clinic's service menu and content plan. |
| [dental-reputation-benchmark](skills/dental-marketing/dental-reputation-benchmark/) | Dental Marketing Agent | enhanced | Benchmark a dental practice's reviews, rating, and velocity against nearby practices to explain the map-pack gap. |
| [patient-question-content](skills/dental-marketing/patient-question-content/) | Dental Marketing Agent | enhanced | Mine the real questions patients ask about a practice's services and rank them into a content plan. |
| [practice-area-rank-audit](skills/law-firm-marketing/practice-area-rank-audit/) | Law Firm Marketing Agent | enhanced | Audit a firm's rank for every practice-area + city query and flag where thin content is the reason it's losing. |
| [attorney-reputation-benchmark](skills/law-firm-marketing/attorney-reputation-benchmark/) | Law Firm Marketing Agent | enhanced | Benchmark a firm's public reviews and local-pack presence against competing firms and quantify the gap. |
| [restaurant-local-buzz](skills/restaurant-marketing/restaurant-local-buzz/) | Restaurant Marketing Agent | enhanced | Audit a venue's local-pack rank, review themes, and recent TikTok buzz for its cuisine and category. |
| [menu-demand-radar](skills/restaurant-marketing/menu-demand-radar/) | Restaurant Marketing Agent | enhanced | Map demand for a venue's cuisine and dishes across local search, AI answers, and TikTok to prioritize content and promos. |
| [service-area-rank-audit](skills/home-services-marketing/service-area-rank-audit/) | Home Services Marketing Agent | enhanced | Audit local-pack rank for a trade's service + location queries across every city and ZIP it serves. |
| [homeowner-question-content](skills/home-services-marketing/homeowner-question-content/) | Home Services Marketing Agent | enhanced | Mine the real problem and cost questions homeowners ask about a trade's services and rank them into a content plan. |
| [x-twitter](skills/x-twitter-agent/x-twitter/) | X (Twitter) Agent | data | The deterministic guide to reading public X/Twitter data through UnifAPI — profiles, posts, engagement, followers, search, and trends. |
| [linkedin](skills/linkedin-agent/linkedin/) | LinkedIn Agent | data | The deterministic guide to reading public LinkedIn data through UnifAPI — companies, people, jobs, posts, and member insights. |
| [reddit](skills/reddit-agent/reddit/) | Reddit Agent | data | The deterministic guide to reading public Reddit data through UnifAPI — subreddits, threads, comments, users, and trending searches. |
| [tiktok](skills/tiktok-agent/tiktok/) | TikTok Agent | data | The deterministic guide to reading public TikTok data through UnifAPI — creators, videos, comments, hashtags, music, and search. |
| [youtube](skills/youtube-agent/youtube/) | YouTube Agent | data | The deterministic guide to reading public YouTube data through UnifAPI — channels, videos, related content, search, and trending. |
| [instagram](skills/instagram-agent/instagram/) | Instagram Agent | data | The deterministic guide to reading public Instagram data through UnifAPI — profiles, posts, reels, comments, locations, and search. |
| [hacker-news](skills/hacker-news-agent/hacker-news/) | Hacker News Agent | data | The deterministic guide to reading public Hacker News data through UnifAPI — story feeds, items, comment trees, and users. |
| [threads](skills/threads-agent/threads/) | Threads Agent | data | The deterministic guide to reading public Threads data through UnifAPI — recent and top post search, profiles, and replies. |
<!-- SKILLS:END -->

## License

MIT. Skills adapted from other open-source projects keep their attribution in the SKILL.md frontmatter and a credit in the skill's README.
