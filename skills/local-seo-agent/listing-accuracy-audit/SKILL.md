---
name: listing-accuracy-audit
description: When a local business wants to check that its public map/local listing is accurate and complete — name, address, category, phone, rating, and review presence. Also use on "is my Google listing correct," "NAP consistency," "listing audit," "check my business profile," "wrong address on Google," "missing phone number," "listing accuracy," or "why does my listing look wrong." Reads public listing data only — read-only research.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Listing Accuracy Audit

You are a local-listing auditor. A wrong category, a stale phone number, or a missing address quietly suppresses local-pack rank and sends ready-to-buy customers to a competitor. This skill reads a business's public map/local listing field by field and flags where the details are inconsistent, incomplete, or off from what they should be — read-only.

This is an **enhanced** skill: it reads live public data through UnifAPI.

## Use UnifAPI for live evidence

You cannot audit a listing from memory — you have to read the live record exactly as a customer sees it, field by field, and confirm it actually surfaces. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **The listing record** — `maps/search`, `local/search` — read the public listing field by field: `name`, `address`, `category` (primary + secondary), `phone`, `website`, `hours`, `rating`, `review_count`, and `place_id`. Resolve to a single `place_id` first so the audit targets one canonical record. **Loop the query** (the business name from a few nearby search points) to catch **duplicate pins** — more than one distinct `place_id` for the same real business is itself a Critical finding.
- **Discoverability check** — `seo/serp` — run the business's own `name + city` query and confirm the listing/site actually surfaces. A wrong, suppressed, or missing listing won't appear for its own name — and that outranks every field-level finding, because no field is worth fixing on a record customers can't find. `seo/serp` also exposes competing pins occupying the brand query.

UnifAPI reads public data only — it never edits or claims the listing. Keep any `billing` metadata so the output can state record cost.

## Workflow

1. **Establish the source of truth — required.** Get the business's correct `name`, `address`, primary + secondary `category`, `phone`, `website`, and `hours` from the operator (or its website). Without a source of truth there is nothing to audit against; ask before pulling data. (Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists.)
2. **Pull the public listing** via `maps/search` / `local/search` as it appears on the map/local result. Capture `place_id`; loop the business name across a couple of nearby search points — if more than one `place_id` resolves to the business, that duplication is a high-impact finding.
3. **Compare field by field** against the checklist below, assigning each field a **status** (pass / fix / gap) and an **impact rating** (critical / high / medium / low) using the rubric.
4. **Confirm discoverability** with `seo/serp`: does the listing surface for the business's own `name + city`? If it doesn't, that finding leads the report — it outranks every field-level issue.
5. **Order by impact.** Sort findings by impact rating so the operator fixes the rank-and-trust killers first, not the cosmetics.

### Field checklist + impact rubric

Each field is rated by how much it moves local rank and customer trust:

| Field                | Pass condition                              | Common failure                                   | Impact if wrong                                            |
| -------------------- | ------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------- |
| Name                 | Exact real name, no stuffed keywords        | "Joe's Plumbing - Best Emergency Plumber Austin" | Critical (guideline violation → suspension risk)           |
| Address              | Single canonical address, no duplicate pins | Two pins, old suite number                       | Critical (splits rank, misroutes customers)                |
| Primary category     | Most specific accurate category             | Generic "Contractor" vs. "Plumber"               | Critical (gates which queries the listing is eligible for) |
| Secondary categories | Relevant additional categories present      | None set                                         | High (lost query eligibility)                              |
| Phone                | Correct local number matching the website   | Tracking/stale number, mismatched NAP            | High (NAP inconsistency, lost calls)                       |
| Website              | Resolves, matches the business              | Missing or wrong domain                          | High                                                       |
| Hours                | Present and current                         | Blank or "permanently closed" in error           | High (false "closed" suppresses clicks)                    |
| Reviews present      | Has reviews; rating reflects them           | Zero reviews                                     | High (prominence + trust)                                  |
| Rating               | Consistent with review body                 | —                                                | Medium                                                     |

Set impact as: **Critical** = suspension risk or rank-blocking (name stuffing, duplicate address, wrong primary category); **High** = lost eligibility, NAP inconsistency, or trust gap; **Medium/Low** = polish. Full per-field detail and the NAP-consistency method are in [references/listing-checklist.md](references/listing-checklist.md).

## Output: field table + prioritized fixes

```markdown
# Listing Accuracy Audit — <business> — <date>

Resolved place_id: <…> · duplicate pins: <none / list>

## Field table

| Field            | Listing value                        | Expected (source of truth) | Status | Impact   | Note                                 |
| ---------------- | ------------------------------------ | -------------------------- | ------ | -------- | ------------------------------------ |
| Name             | Joe's Plumbing - Best Austin Plumber | Joe's Plumbing             | Fix    | Critical | Keyword-stuffed; guideline violation |
| Primary category | Contractor                           | Plumber                    | Fix    | Critical | Blocks "plumber" query eligibility   |
| Phone            | (512) 555-0148                       | (512) 555-0190             | Fix    | High     | Mismatch vs. website footer          |
| Reviews          | 0 reviews                            | —                          | Gap    | High     | No reviews → low prominence + trust  |
| Address          | 12 Main St                           | 12 Main St                 | Pass   | —        | —                                    |

## Prioritized fixes (Critical → High → Medium → Low)

- One line per Fix/Gap row with the corrective action the operator's team would take.

## Discoverability

- Surfaces for "<name> <city>" on seo/serp? yes/no · duplicate-pin flag if found.

Every value cited to the public listing record it came from. Record cost consumed (or best estimate).
```

### Worked example

Source of truth: "Joe's Plumbing", 12 Main St Austin, primary category Plumber, phone (512) 555-0190.

- `local/search` name reads "Joe's Plumbing - Best Austin Plumber" → **Fix / Critical** (keyword stuffing risks suspension, adds no rank).
- Primary `category` is "Contractor" → **Fix / Critical** (the single biggest lever; it gates eligibility for "plumber" queries — pairs directly with a relevance gap from `local-pack-audit`).
- `phone` on the listing is (512) 555-0148, website footer says (512) 555-0190 → **Fix / High** (NAP inconsistency).
- Zero `review_count` → **Gap / High**.
- `seo/serp` for "Joe's Plumbing Austin" surfaces the listing #1, no duplicate pin → discoverability OK.

Verdict: two Critical fixes (de-stuff name, set primary category to Plumber) before anything else; the category fix likely resolves a missing-from-pack cell. Reads: 1 listing + 1 SERP.

## Guardrails

- **Read-only ("eyes, not hands").** Public data only. It identifies what to fix; it never edits, claims, or verifies a Google Business Profile or submits a change. The operator's own team makes any corrections.
- **Confirmed vs inferred.** Public listing data can lag the dashboard view — report observed fields as the public snapshot, label anything without a source-of-truth value "unverified" rather than asserting it wrong, and have the operator confirm against their own profile before acting.
- **Dated snapshots.** Stamp the audit with the date and search points; re-running is the only way to confirm a fix landed.
- **Don't recommend manipulation.** Flag name stuffing and duplicate/keyword tactics as risks to _remove_, never as fixes to add. Recommendations align with platform guidelines.

## References

- [references/listing-checklist.md](references/listing-checklist.md) — full per-field pass conditions, the NAP-consistency method, duplicate-pin detection, and the impact rubric.

## Related Skills

- **local-pack-audit** (Local SEO): shows where the business ranks in the local pack for its target queries — a wrong listing is often the cause behind a missing-from-pack cell.
- **local-competitor-scan** (Local SEO): profiles the competitors the listing is up against.
- **unifapi**: the shared data skill — connect MCP and discover the operations above.
