# KOL Pricing Logic Reference

This summarizes the deterministic logic in the app code so an agent can explain or preserve behavior while using the Skill.

Adapted from [Antoniaiaiaiaia/kol-pricing](https://github.com/Antoniaiaiaiaia/kol-pricing), originally by Antonia (@antoniayly), under the MIT License.

Source files:

- `src/lib/classifier.ts`
- `src/lib/pricing.ts`
- `config/product.ts`
- `config/ideal-kols.ts`

## Data Inputs

The pricing report needs:

- Profile: username, display name, bio, follower count, following count, verified flags, protected flag, account creation date.
- Recent tweets: text, created date, likes, retweets, replies, quotes, impressions/views.
- Product config: name, pitch, desired action, URL, estimated LTV.
- Ideal KOL config: preferred tiers, excluded tiers, extra keywords, follower floor, engagement floor.

When using UnifAPI X/Twitter, use the current `/x/...` response shape. Map `profile.public_metrics.followers_count` to `followers_count`, `profile.public_metrics.following_count` to `following_count`, `profile.public_metrics.tweet_count` to `tweet_count`, `profile.protected` to `protected`, `profile.verified` or `profile.verified_type` to verification signals, and `tweet.public_metrics.impression_count` to impressions. Legacy flat fields such as `follower_count` and `view_count` are acceptable fallback inputs only.

## Tiers

The classifier chooses one primary tier:

| Tier | Meaning               | Signals                                                                |
| ---- | --------------------- | ---------------------------------------------------------------------- |
| T    | Trader                | trading, perps, leverage, TA, DEX, PnL, prediction markets             |
| N    | NFT / Creator         | NFT, collections, minting, art, drops, PFPs                            |
| B    | Builder               | developer, engineer, founder, OSS, GitHub, SDK, infra, smart contracts |
| I    | Influencer / Research | research, alpha, thesis, macro, on-chain analysis, venture             |
| M    | Mass-reach            | fallback when no tier-specific signal is found                         |

There is also a `+E` tool-builder overlay when the bio or tweets include signals such as GitHub, open source, dev tool, shipped, or shipping.

Extra keywords in `idealKOLs.extra_keywords` boost the first preferred tier.

## Engagement

Engagement is computed from recent tweets:

```text
avg_likes = total likes / tweet count
avg_retweets = total retweets / tweet count
avg_replies = total replies / tweet count
avg_impressions = total impressions / tweet count
engagement_rate = ((likes + retweets + replies) / tweet count / followers) * 100
```

If there are no tweets or no followers, engagement is zero.

## Warnings

Warnings are added when:

- The account is protected: danger, skip.
- Followers are below `idealKOLs.min_followers` and the account is not a tool builder.
- Account age is below 6 months and followers are below 5k.
- Engagement is below `idealKOLs.engagement_floor_pct`: danger.
- Engagement is above 8 percent: info, can pay 10-20 percent above base.
- The chosen tier is excluded by the ideal KOL config: danger, skip.

## Base Pricing Matrix

All cash values are USD.

### T: Trader

| Collab     | Recommended | Cash     | Term      | Note                                         |
| ---------- | ----------- | -------- | --------- | -------------------------------------------- |
| oneshot    | yes         | 400-1000 | 1 tweet   | Volume / on-chain product launch             |
| activity   | yes         | 700-1500 | 2-6 weeks | Trading contest / PnL leaderboard. Top pick  |
| ambassador | yes         | 700-1800 | 3-6 mo    | High-frequency content fits this tier        |
| affiliate  | yes         | 200-400  | ongoing   | Base + 20-30 percent trading-fee / LTV share |
| launch     | yes         | 500-1500 | 7-14 days | Product / feature launches                   |

### N: NFT / Creator

| Collab     | Recommended | Cash     | Term      | Note                                             |
| ---------- | ----------- | -------- | --------- | ------------------------------------------------ |
| oneshot    | yes         | 300-800  | 1 tweet   | Drop announcements / curated picks               |
| activity   | maybe       | 500-1200 | 2-4 weeks | Only if activity has visual / creator hook       |
| ambassador | yes         | 500-1500 | 3-6 mo    | Curator voice converts steadily                  |
| affiliate  | maybe       | 200-400  | ongoing   | NFT audience converts slower to non-NFT products |
| launch     | yes         | 400-1200 | 7-14 days | Drop / collection launches                       |

### B: Builder

| Collab     | Recommended | Cash     | Term      | Note                                   |
| ---------- | ----------- | -------- | --------- | -------------------------------------- |
| oneshot    | maybe       | 200-600  | 1 tweet   | Builders rarely run pure paid posts    |
| activity   | yes         | 400-1000 | 2-6 weeks | Hackathon / dev contest cohort         |
| ambassador | yes         | 500-1500 | 6+ mo     | Long-term tutorial / education content |
| affiliate  | yes         | 200-400  | ongoing   | Base + 20-30 percent LTV               |
| launch     | yes         | 400-1200 | 7-14 days | Dev-tool / SDK launches                |

### I: Influencer / Research

| Collab     | Recommended | Cash     | Term      | Note                                       |
| ---------- | ----------- | -------- | --------- | ------------------------------------------ |
| oneshot    | yes         | 600-1800 | 1 tweet   | Research thread / framing piece            |
| activity   | maybe       | 800-1800 | 2-6 weeks | Activity only if it has a research angle   |
| ambassador | yes         | 800-2000 | 3-12 mo   | Ongoing thesis / research content          |
| affiliate  | maybe       | 300-500  | ongoing   | Mixed conversion; research audience varies |
| launch     | yes         | 800-1800 | 7-14 days | Narrative-setting launches                 |

### M: Mass-reach

| Collab     | Recommended | Cash      | Term      | Note                                           |
| ---------- | ----------- | --------- | --------- | ---------------------------------------------- |
| oneshot    | yes         | 2000-6000 | 1 tweet   | Brand-reach play. Pin 24h                      |
| activity   | no          | 0         | none      | Top-tier KOLs do not actually sign up and play |
| ambassador | no          | 0         | none      | ROI is dreadful at this price                  |
| affiliate  | no          | 0         | none      | Top influencers do not accept rev share        |
| launch     | yes         | 3000-8000 | 7-14 days | Major launch volume anchor                     |

## Price Adjustments

Two multipliers are applied to non-zero rows:

```text
tool_builder_boost = 1.20 if classification.is_tool_builder else 1.0
engagement_boost = 0.70 if engagement_rate < 0.5 else 1.0
adjusted_cash = round(base_cash * tool_builder_boost * engagement_boost)
```

If any danger warning exists and the tier is not `M`, recommendations marked `yes` are downgraded to `maybe`.

## Top Pick

The framework skips if:

- the chosen tier is excluded, or
- the tier is not `M` and engagement is below 0.1 percent.

Otherwise the default top picks are:

| Tier | Default top pick |
| ---- | ---------------- |
| T    | activity         |
| N    | oneshot          |
| B    | ambassador       |
| I    | oneshot          |
| M    | oneshot          |

If the default row is not available, choose the first `yes` row. If none exists, skip.

## ROI

Conversion assumptions:

| Tier | Impression rate | Effective view rate | Registration rate | Subscription rate |
| ---- | --------------- | ------------------- | ----------------- | ----------------- |
| T    | 0.06            | 0.30                | 0.20              | 0.10              |
| N    | 0.05            | 0.28                | 0.10              | 0.08              |
| B    | 0.07            | 0.30                | 0.15              | 0.12              |
| I    | 0.06            | 0.30                | 0.12              | 0.10              |
| M    | 0.08            | 0.30                | 0.05              | 0.08              |

Touch points:

| Collab     | Touch points |
| ---------- | ------------ |
| oneshot    | 1            |
| activity   | 6            |
| ambassador | 5            |
| affiliate  | 2.5          |
| launch     | 4            |

Formula:

```text
effective_impressions = touch_points * followers * impression_rate * effective_view_rate
if engagement_rate < 0.5: effective_impressions *= 0.3

registrations = effective_impressions * registration_rate
subscriptions = registrations * subscription_rate
ltv_revenue = subscriptions * product.ltv_usd
roi_multiplier = (ltv_revenue - avg_cash_cost) / avg_cash_cost
```

When cash cost is zero, ROI multiplier is reported as 0.

## Outreach Boundary

The original app uses an LLM only for DM copy. The Skill should keep analysis deterministic and let the calling agent draft the DM from:

- profile summary,
- tier and top pick,
- offer,
- product config,
- one specific recent tweet.

Core DM constraints:

- 60-110 words.
- No hype, no emojis, no exclamation marks.
- Reference exactly one recent tweet when possible.
- End with a low-friction ask.
