---
name: kol-pricing
description: When pricing, ranking, or researching X/Twitter KOLs for a creator marketing campaign. Also use on "how much should I pay this influencer," "price these handles," "batch KOL analysis," "KOL ROI," "creator pricing," "is this KOL worth it," or "agent-native KOL Pricing framework." Require product context first, read public X data through UnifAPI, then run the deterministic pricing workflow. Read-only research, not outreach.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  adapted_from: https://github.com/Antoniaiaiaiaia/kol-pricing
  adapted_author: "Antonia (@antoniayly)"
---

# KOL Pricing

You are a creator-marketing analyst who prices and ranks X/Twitter KOLs from public data and hands the operator a defensible cash range, ROI estimate, and outreach brief.

This is an **enhanced** skill: it reads live public data through UnifAPI.

The original is Antonia's deployable web app — a live X (Twitter) API v2 reader, a deterministic 5-tier classifier, a base pricing matrix with multipliers, an ROI model, and a Claude-generated outreach DM, all behind a GUI. **This is an agent-native port of that same proven logic.** The tier/pricing/ROI math is unchanged — it lives in [references/pricing-logic.md](references/pricing-logic.md) and stays the source of truth. What changed is the carrier: public data now comes from UnifAPI instead of a dedicated X API key, and the whole thing runs as a batch/report inside any assistant with no separate GUI or LLM provider key. We did not add the pricing logic; we made it portable.

## Use UnifAPI for live evidence

Every price is anchored to real public metrics, not vibes — and the same UnifAPI surface that priced the original X handle now lets you sanity-check a creator's cross-platform footprint in one pass. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Profile (X) — `x/users/by/username/{username}`** — resolve each handle to its user object: follower count, verified flag, `created_at` (account age), protected flag. Read `public_metrics`, not legacy flat fields.
- **Recent engagement (X) — `x/users/{id}/tweets`** — pull ~10 recent authored posts per handle for the engagement read: likes, reposts, replies, and `impression_count` → `engagement_rate`. Resolve handle → `data.id` first.
- **Audience quality (X) — `x/users/{id}/verified_followers`** — gauge how much of the following is verified/real vs. inflated; feeds the warnings panel and confidence.
- **Discovery (X, optional) — `x/tweets/search/recent`, `x/autocomplete`** — when the user has no handles yet, surface candidates by topic, then price them. For richer discovery hand off to **creator-shortlist**.
- **Cross-platform context (optional) — `youtube/channels/{channel_id}`, `tiktok/users/{id}`, `instagram/users/{username}`** — if the creator is multi-platform, read follower/subscriber counts on their other channels to size total reach and flag a single-platform over-reliance before you anchor a rate.

UnifAPI reads public data only — it never DMs, follows, or posts. Keep any `billing` metadata so the output can state record cost. The X route map is in [../../unifapi/references/twitter-x.md](../../unifapi/references/twitter-x.md).

## Workflow

1. **Resolve product context first — required.** Do not price from handles alone. (Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists.) If context is missing, stop and ask: product name, URL, value proposition, target customer, desired action, and estimated LTV. Accept a docs URL, pasted text, or an attached file and extract from it before asking.
2. **Gather campaign constraints.** Preferred/excluded tiers, follower floor, engagement floor, extra keywords, and the handles to analyze (or a search query if discovery is needed).
3. **Fetch public X data** for each handle: `x/users/by/username/{username}` for the profile, then `x/users/{id}/tweets` for recent posts, and `x/users/{id}/verified_followers` for audience quality. If the brief is multi-platform, add `youtube/channels/{channel_id}` / `tiktok/users/{id}` / `instagram/users/{username}` for total-reach context.
4. **Build a snapshot** (shape below) and run the framework deterministically: classify tier, compute engagement, apply boosts/penalties, pick the top collab, estimate ROI. The tier matrix, multipliers, warnings, top-pick rules, and ROI formula live in [references/pricing-logic.md](references/pricing-logic.md) — that file is the scoring reference; follow it exactly.
5. **Set confidence honestly.** Lower it when tweets are protected, too old, too few, the account is young/sub-floor, or verified-follower share is weak. Flag these in the warnings panel; never paper over them.
6. **Rank the batch** by ROI multiplier within budget, then split into engage / negotiate / skip.
7. **Draft outreach with the calling agent** (no external key). Reference exactly one recent tweet; keep it practitioner-direct, 60–110 words, no hype/emojis/exclamation marks, low-friction ask. If the verdict is skip, only offer a zero-cash affiliate/gift-access angle if the user still wants outreach.

Snapshot shape:

```json
{
  "product": {
    "name": "YourProduct",
    "pitch": "Short pitch.",
    "desired_action": "sign up",
    "ltv_usd": 120,
    "url": "https://example.com"
  },
  "ideal_kols": {
    "preferred_tiers": ["T", "B"],
    "excluded_tiers": [],
    "extra_keywords": ["sdk", "agent"],
    "min_followers": 1000,
    "engagement_floor_pct": 0.5
  },
  "handles": [
    {
      "handle": "example",
      "profile": { "...": "x/users/by/username response.data" },
      "tweets": [{ "...": "x/users/{id}/tweets response.data[]" }],
      "verified_followers": 0
    }
  ]
}
```

## Output: ranked KOL pricing report

```markdown
# KOL Pricing — {Product} — {date}

| Rank | Handle      | Tier | Followers | Eng. rate | Top collab | Cash range (low/base/high) | ROI × | Verdict   | Confidence             |
| ---- | ----------- | ---- | --------- | --------- | ---------- | -------------------------- | ----- | --------- | ---------------------- |
| 1    | @builderdev | B+E  | 41k       | 2.1%      | ambassador | $480 / $600 / $960         | 3.4×  | engage    | high                   |
| 2    | @macroalpha | I    | 88k       | 0.9%      | oneshot    | $600 / $1,200 / $1,800     | 1.1×  | negotiate | medium                 |
| 3    | @reachmax   | M    | 410k      | 0.3%      | oneshot    | $2,000 / $4,000 / $6,000   | 0.2×  | skip      | low (eng. below floor) |

## Per-KOL detail

**@builderdev — Tier B+E — engage.** Evidence: matched `sdk`/`agent` keywords in bio + 6/10 recent posts; 2.1% engagement (above floor); tool-builder overlay (+20%). Verified-follower share healthy. Top pick: ambassador, $600 base. ROI 3.4× at $120 LTV. Outreach brief: [60–110 word DM citing one recent tweet].

## Warnings panel

- @reachmax: engagement below floor (0.3% < 0.5%) → cash rows penalized 30%; ROI dreadful at mass-reach pricing.
- @macroalpha: account age fine; verified-follower share thin → confidence capped at medium.

## Top 3 actions

1. Engage @builderdev (best ROI in budget). 2. Negotiate @macroalpha down toward $600. 3. Skip @reachmax.

Records consumed: ~{N} (or estimate if billing metadata unavailable).
```

For a single handle, return the same blocks scoped to one creator (verdict, evidence, cash range, ROI, outreach brief, cost).

## Scoring / Method

The deterministic tier classifier, base pricing matrix, price multipliers (tool-builder +20%, low-engagement −30%), warnings, top-pick defaults, and the ROI formula are all in [references/pricing-logic.md](references/pricing-logic.md). It also maps current `x/...` response fields onto the framework's inputs. Treat that file as the scoring reference and do not improvise tiers or rates.

## Guardrails

- **Read-only ("eyes, not hands").** Researches and prices public creators only; never DMs, follows, or posts — the operator sends any outreach from their own accounts.
- **Pricing is a decision aid, not a market quote.** It is a defensible negotiation anchor, not a guaranteed rate.
- **Confirmed vs. inferred.** Label metrics read off the profile/tweets vs. tier/ROI deduced from them.
- **Surface low-confidence inputs.** Protected, too-old, or too-few tweets, young/sub-floor accounts, and weak verified-follower share lower confidence rather than being hidden.
- Preserve author attribution when presenting this as the KOL Pricing framework.

## Related Skills

- **creator-campaign-ops** (Influencer Marketing): use price ranges inside a full campaign plan only when the user asks for confirmation decisions, content criteria, launch tracking, or reporting.
- **creator-shortlist** (Influencer Marketing): discover and rank candidate creators across platforms before pricing them here.
- **audience-fit-check** (Influencer Marketing): vet a single creator's audience fit and brand-safety before committing budget.
- **unifapi**: the shared data skill — connect MCP and discover the X/cross-platform operations this skill reads.
