# Agents

Every agent is a folder of atomic skills you compose inside your own assistant. `enhanced` skills read live public data via the `unifapi` skill; `advice` skills are framework-only.

## Role agents

### [SEO Agent](skills/seo-agent/)

Track rankings, audit SERPs, and research keywords, competitors, and backlinks as live records — inside your assistant.

- `seo-audit` (enhanced) — APIs: seo, browser
- `keyword-research` (enhanced) — APIs: seo
- `schema` (advice) — APIs: —

### [AI Visibility Agent](skills/ai-visibility-agent/)

Measure whether your brand and domain get cited in AI answers across ChatGPT and AI search — and where competitors win the answer.

- `ai-visibility-audit` (enhanced) — APIs: geo, seo, browser
- `llm-mention-tracking` (enhanced) — APIs: geo
- `ai-answer-gap` (enhanced) — APIs: geo, seo

### [Local SEO Agent](skills/local-seo-agent/)

Audit local-pack rankings, map listings, and review presence for one location or hundreds.

- `local-pack-audit` (enhanced) — APIs: maps, local, seo
- `listing-accuracy-audit` (enhanced) — APIs: maps, local, seo
- `local-competitor-scan` (enhanced) — APIs: maps, local, seo

### [Influencer Marketing Agent](skills/influencer-marketing-agent/)

Find, vet, and price creators across X, YouTube, TikTok, and Instagram from public engagement evidence.

- `kol-pricing` (enhanced) — APIs: twitter, youtube, instagram, tiktok, reddit
- `creator-shortlist` (enhanced) — APIs: tiktok, youtube, instagram, twitter
- `audience-fit-check` (enhanced) — APIs: twitter, youtube, tiktok, instagram

### [Content Strategy Agent](skills/content-strategy-agent/)

Turn public demand — keywords, Reddit threads, YouTube, and news — into a content plan with evidence.

- `content-opportunity-brief` (enhanced) — APIs: seo, youtube, tiktok, reddit, twitter, news, threads
- `content-strategy` (enhanced) — APIs: seo, reddit, youtube, news, tiktok
- `customer-research` (enhanced) — APIs: reddit, youtube, news, tiktok, seo

### [Social Listening Agent](skills/social-listening-agent/)

Monitor public mentions across X, Reddit, TikTok, and news, and get a brief when something meaningfully changes.

- `social-listening-brief` (enhanced) — APIs: twitter, reddit, youtube, tiktok, threads, hacker-news
- `reddit-community-research` (enhanced) — APIs: reddit

### [Social Selling Agent](skills/social-selling-agent/)

Spot buying signals and warm openings across X and LinkedIn, then prep evidence-backed outreach.

- `buying-signal-monitor` (enhanced) — APIs: twitter, linkedin, news
- `linkedin-account-research` (enhanced) — APIs: linkedin, news

### [Competitive Intelligence Agent](skills/competitive-intelligence-agent/)

Track what competitors ship and say across X, LinkedIn, YouTube, Reddit, and news — and explain what changed.

- `competitor-launch-monitor` (enhanced) — APIs: twitter, linkedin, youtube, reddit, news, hacker-news
- `competitor-profiling` (enhanced) — APIs: seo, browser, twitter, linkedin, youtube, reddit, news

### [Lead & Company Research Agent](skills/lead-company-research-agent/)

Build B2B account and company briefs from public LinkedIn and news signals.

- `linkedin-account-research` (enhanced) — APIs: linkedin, news
- `account-news-signals` (enhanced) — APIs: news, linkedin

## Vertical agents

### [Real Estate Marketing Agent](skills/real-estate-marketing/)

Local visibility, listing presence, content, and AI-answer citations for brokerages and agents.

- `neighborhood-guide-opportunity` (enhanced) — APIs: seo, geo, news, maps, local
- `agent-reputation-benchmark` (enhanced) — APIs: maps, local, seo

### [Med Spa Marketing Agent](skills/med-spa-marketing/)

Local rankings, treatment-content demand, reviews, and AI visibility for med spas and aesthetics clinics.

- `med-spa-reputation-benchmark` (enhanced) — APIs: maps, local, seo
- `treatment-demand-radar` (enhanced) — APIs: seo, geo, tiktok

### [Dental Marketing Agent](skills/dental-marketing/)

Local rankings, patient-question content, reviews, and AI visibility for dental practices.

- `dental-reputation-benchmark` (enhanced) — APIs: maps, local, seo
- `patient-question-content` (enhanced) — APIs: seo, geo, reddit, news

### [Law Firm Marketing Agent](skills/law-firm-marketing/)

Local rankings, practice-area content, reputation, and AI visibility for law firms and attorneys.

- `practice-area-rank-audit` (enhanced) — APIs: seo, maps, local, geo
- `attorney-reputation-benchmark` (enhanced) — APIs: maps, local, seo

### [Restaurant Marketing Agent](skills/restaurant-marketing/)

Local rankings, social buzz, reviews, and AI visibility for restaurants and hospitality.

- `restaurant-local-buzz` (enhanced) — APIs: maps, local, seo, tiktok
- `menu-demand-radar` (enhanced) — APIs: seo, geo, tiktok

### [Home Services Marketing Agent](skills/home-services-marketing/)

Local rankings, service-area content, reviews, and AI visibility for home services and contractors.

- `service-area-rank-audit` (enhanced) — APIs: maps, local, seo
- `homeowner-question-content` (enhanced) — APIs: seo, geo, reddit, news

## Platform agents

### [X (Twitter) Agent](skills/x-twitter-agent/)

Research public X / Twitter profiles, posts, communities, and trends — read-only, inside your assistant.

- `x-twitter` (data) — APIs: twitter
- `kol-pricing` (enhanced) — APIs: twitter, youtube, instagram, tiktok, reddit
- `creator-shortlist` (enhanced) — APIs: tiktok, youtube, instagram, twitter
- `audience-fit-check` (enhanced) — APIs: twitter, youtube, tiktok, instagram
- `buying-signal-monitor` (enhanced) — APIs: twitter, linkedin, news
- `competitor-profiling` (enhanced) — APIs: seo, browser, twitter, linkedin, youtube, reddit, news
- `social-listening-brief` (enhanced) — APIs: twitter, reddit, youtube, tiktok, threads, hacker-news

### [LinkedIn Agent](skills/linkedin-agent/)

Research public LinkedIn companies, people, jobs, and posts for B2B — read-only, inside your assistant.

- `linkedin` (data) — APIs: linkedin
- `linkedin-account-research` (enhanced) — APIs: linkedin, news
- `account-news-signals` (enhanced) — APIs: news, linkedin
- `buying-signal-monitor` (enhanced) — APIs: twitter, linkedin, news
- `competitor-profiling` (enhanced) — APIs: seo, browser, twitter, linkedin, youtube, reddit, news

### [Reddit Agent](skills/reddit-agent/)

Research public subreddits, threads, and community language — read-only, inside your assistant.

- `reddit` (data) — APIs: reddit
- `reddit-community-research` (enhanced) — APIs: reddit
- `social-listening-brief` (enhanced) — APIs: twitter, reddit, youtube, tiktok, threads, hacker-news
- `customer-research` (enhanced) — APIs: reddit, youtube, news, tiktok, seo

### [TikTok Agent](skills/tiktok-agent/)

Research public TikTok creators, videos, hashtags, and trends — read-only, inside your assistant.

- `tiktok` (data) — APIs: tiktok
- `creator-shortlist` (enhanced) — APIs: tiktok, youtube, instagram, twitter
- `audience-fit-check` (enhanced) — APIs: twitter, youtube, tiktok, instagram
- `social-listening-brief` (enhanced) — APIs: twitter, reddit, youtube, tiktok, threads, hacker-news
- `treatment-demand-radar` (enhanced) — APIs: seo, geo, tiktok
- `menu-demand-radar` (enhanced) — APIs: seo, geo, tiktok
- `restaurant-local-buzz` (enhanced) — APIs: maps, local, seo, tiktok

### [YouTube Agent](skills/youtube-agent/)

Research public YouTube channels, videos, and trends — read-only, inside your assistant.

- `youtube` (data) — APIs: youtube
- `kol-pricing` (enhanced) — APIs: twitter, youtube, instagram, tiktok, reddit
- `creator-shortlist` (enhanced) — APIs: tiktok, youtube, instagram, twitter
- `audience-fit-check` (enhanced) — APIs: twitter, youtube, tiktok, instagram
- `competitor-profiling` (enhanced) — APIs: seo, browser, twitter, linkedin, youtube, reddit, news
- `content-opportunity-brief` (enhanced) — APIs: seo, youtube, tiktok, reddit, twitter, news, threads

### [Instagram Agent](skills/instagram-agent/)

Research public Instagram profiles, posts, reels, and comments — read-only, inside your assistant.

- `instagram` (data) — APIs: instagram
- `kol-pricing` (enhanced) — APIs: twitter, youtube, instagram, tiktok, reddit
- `creator-shortlist` (enhanced) — APIs: tiktok, youtube, instagram, twitter
- `audience-fit-check` (enhanced) — APIs: twitter, youtube, tiktok, instagram

### [Hacker News Agent](skills/hacker-news-agent/)

Research public Hacker News launches, threads, and sentiment — read-only, inside your assistant.

- `hacker-news` (data) — APIs: hacker-news
- `competitor-launch-monitor` (enhanced) — APIs: twitter, linkedin, youtube, reddit, news, hacker-news
- `social-listening-brief` (enhanced) — APIs: twitter, reddit, youtube, tiktok, threads, hacker-news

### [Threads Agent](skills/threads-agent/)

Research public Threads posts, profiles, and conversation — read-only, inside your assistant.

- `threads` (data) — APIs: threads
- `social-listening-brief` (enhanced) — APIs: twitter, reddit, youtube, tiktok, threads, hacker-news
- `content-opportunity-brief` (enhanced) — APIs: seo, youtube, tiktok, reddit, twitter, news, threads
