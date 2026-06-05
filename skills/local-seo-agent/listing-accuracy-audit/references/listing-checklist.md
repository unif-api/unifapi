# Listing Accuracy Checklist

Full per-field method for auditing a public map/local listing against the operator's source of truth, with the impact rubric the SKILL.md summarizes. Everything here is read-only diagnosis — corrections are made by the operator inside their own profile.

## Prerequisite: source of truth

Before reading any listing, collect the operator's confirmed values:

- Exact legal/trading **name** (as it appears on signage and the door)
- Single canonical **address** (street, suite, city, postal)
- **Primary category** and intended **secondary categories**
- Primary **phone** (the one a customer should reach)
- **Website** URL
- **Hours**, including special/holiday hours if relevant

Any field without a confirmed truth value is audited as "unverified" — observed and reported, but not asserted wrong.

## Per-field detail

### Name — impact: Critical

- **Pass:** matches the real-world name exactly. No appended keywords, locations, or taglines.
- **Fail patterns:** "Joe's Plumbing - Emergency 24/7 Austin Plumber", ALL CAPS branding that isn't the real name, descriptors bolted on.
- **Why critical:** keyword stuffing in the name is a direct guideline violation and a common cause of listing suspension. It is a risk to _remove_, never a tactic to add.

### Address — impact: Critical

- **Pass:** one canonical address; the pin is at the real location; no duplicate listings for the same business.
- **Fail patterns:** outdated suite number, two or more pins (often from a move or a franchise mistake), virtual-office address for a service-area business.
- **Why critical:** duplicates split ranking signals and reviews across records and misroute customers. Detect via the duplicate-pin method below.

### Primary category — impact: Critical

- **Pass:** the most specific category that describes the core business (e.g. "Plumber", not "Contractor"; "Furnace repair service" when furnaces are the core).
- **Why critical:** the primary category is the strongest relevance lever in local — it gates which queries the listing is even eligible to rank for. A too-generic primary category is the single most common silent rank suppressor and frequently explains a "missing from pack" cell in `local-pack-audit`.

### Secondary categories — impact: High

- **Pass:** all genuinely relevant additional categories are set (e.g. a plumber that also does "Drainage service", "Water heater repair service").
- **Fail pattern:** none set, leaving query eligibility on the table; or irrelevant categories added to game reach (also a guideline risk).

### Phone — impact: High

- **Pass:** correct local number that matches the website and other citations (NAP consistency, below).
- **Fail patterns:** mismatched number vs. website footer, a call-tracking number that breaks NAP consistency, a non-local number.

### Website — impact: High

- **Pass:** resolves, is the business's real site, ideally the most relevant page (location page for multi-location).

### Hours — impact: High

- **Pass:** present and current.
- **Fail patterns:** blank hours, or an erroneous "permanently closed" / "temporarily closed" state — these actively suppress clicks and calls.

### Reviews present — impact: High

- **Pass:** the listing has reviews and the rating reflects them.
- **Finding:** zero reviews is itself a result — it caps prominence and customer trust regardless of every other field being perfect.

### Rating — impact: Medium

- **Pass:** the displayed rating is consistent with the body of reviews. Large divergence or a rating with no reviews behind it is worth noting.

## NAP-consistency method

NAP = **N**ame, **A**ddress, **P**hone. The listing's NAP must match the website and any other public citations exactly — formatting included where it matters (suite notation, phone format). Procedure:

1. Take the source-of-truth NAP.
2. Compare the public listing's NAP field by field.
3. Compare against the website (the operator's own canonical surface).
4. Flag any divergence as a NAP-consistency issue (High impact). Inconsistent NAP across sources dilutes the prominence/trust signals that feed local rank.

## Duplicate-pin detection

1. Run the business's `name + city` query on `seo/serp` (the live local SERP) and on `maps/search` / `local/search` from a couple of nearby search points.
2. Resolve each result to a `place_id`.
3. More than one distinct `place_id` for the same real business = a **duplicate listing** (Critical). Note both records; the operator resolves duplicates inside their profile / via the platform's process — this skill only surfaces them.

## Discoverability check (does it surface at all?)

Before grading individual fields, confirm the record exists where customers look:

1. Run the business's own `name + city` on `seo/serp`.
2. If the listing/site does **not** surface, that is the lead finding — it outranks every field-level issue, because a wrong, suppressed, or missing listing won't appear for its own name and no field fix matters until it does.
3. If a _competing_ pin occupies the brand query instead, flag it (possible duplicate, hijack, or stale record) and tie it to the duplicate-pin check above.

## Impact rubric (ordering output)

| Impact   | Definition                                           | Examples                                                                |
| -------- | ---------------------------------------------------- | ----------------------------------------------------------------------- |
| Critical | Suspension risk or rank-blocking                     | Name stuffing, duplicate address/pin, wrong primary category            |
| High     | Lost query eligibility, NAP inconsistency, trust gap | Missing secondary categories, phone mismatch, zero reviews, wrong hours |
| Medium   | Quality/consistency polish                           | Rating/review divergence, suboptimal website target                     |
| Low      | Cosmetic                                             | Minor formatting that doesn't break NAP                                 |

Sort the fix list Critical → High → Medium → Low. The Critical and High rows are where local rank and conversions are actually being lost.

## Reporting discipline

- Cite every observed value to the public record it came from.
- State the public-vs-dashboard caveat: what's public can lag the owner's view; the operator confirms before acting.
- Never present a manipulation (keyword stuffing, fake categories) as a fix — only as a risk to remove.
