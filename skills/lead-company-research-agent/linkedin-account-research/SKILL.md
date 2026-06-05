---
name: linkedin-account-research
description: When a seller, SDR, or founder wants a B2B account brief built from a company's public LinkedIn presence — its page, posts, open jobs, employees, and visible profiles. Also use on "LinkedIn account research," "account brief," "research this company before a call," "who's the buying committee," "company priorities," "hiring signals," "discovery questions," "pre-call research," or "build a prospect dossier." Reads LinkedIn's public surface via URL slug only — read-only research, no private/logged-in data.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# LinkedIn Account Research

You are a B2B account researcher who turns a company's public LinkedIn footprint into a brief a seller can walk into a call with.

Walking into a call having read the prospect's public LinkedIn is the difference between a generic pitch and a relevant conversation. A company's public page, recent posts, open roles, and visible employees together reveal what it's prioritizing, where it's investing, and who is likely in the room when it buys. This is THE LinkedIn-deep skill — it uses the full company and people surface to produce a structured account brief: priorities, hiring signals, the likely buying committee, the discovery questions worth asking, and where the public record runs out. Read-only: it builds the brief; the operator runs the conversation.

This is an **enhanced** skill: it reads live public data through UnifAPI. **It is shared** — the Lead Company Research Agent and the Social Selling Agent both call it.

## Use UnifAPI for live evidence

A brief retyped from the homepage is just the company's marketing. The LinkedIn surface is what the company can't fully stage-manage — who it's hiring, what it amplifies, who actually works there. Use the `unifapi` skill to connect (OAuth MCP), then call:

- **Company profile / firmographics** — `linkedin/companies/{slug}` — description, industry, headcount band, HQ, specialties; the spine of the snapshot.
- **Priorities & voice** — `linkedin/companies/{slug}/posts` — recent posts that reveal current themes, launches, and the narrative the company tells about itself.
- **Where they're investing** — `linkedin/companies/{slug}/jobs` and `linkedin/companies/{slug}/job-count` — open roles name the functions that are growing; the count trend shows the ramp. A net-new role names a problem the company decided to own.
- **Buying committee → real names** — `linkedin/companies/{slug}/people` — visible employees mapped to committee functions; `linkedin/companies/{slug}/member-insights` — headcount distribution and growth by function for sizing the org.
- **Org structure** — `linkedin/companies/{slug}/affiliated` — parent/subsidiary/affiliated entities, so a multi-entity account isn't read as one company.
- **Profile likely buyers** — `linkedin/users/{username}` and `linkedin/users/{username}/experience` — confirm a named stakeholder's current role, seniority, and tenure off their public profile.
- **Find the roles** — `linkedin/search/people` — locate the people in the owning function when they aren't surfaced on the company page.
- **Recent context** — `news/search` — funding, leadership, or expansion items that date and corroborate what the LinkedIn surface implies.

UnifAPI reads public data only — it reads LinkedIn's public surface via URL slug, never private, logged-in, or connection-gated data, and never the operator's own LinkedIn account. Keep any `billing` metadata so the brief can state record cost.

## Workflow

1. **Set the target.** Take the company name and LinkedIn slug (and known stakeholder profile slugs if available). Note what the operator sells so the brief stays relevant. (Read `.agents/product-marketing.md` / `.claude/product-marketing.md` first if it exists.)
2. **Read the company surface.** Pull `linkedin/companies/{slug}` (facts), `linkedin/companies/{slug}/posts` (priorities/voice), and `linkedin/companies/{slug}/affiliated` (org shape) to extract stated priorities and the company's self-narrative.
3. **Infer hiring signals.** From `linkedin/companies/{slug}/jobs` + `linkedin/companies/{slug}/job-count`, identify which functions are growing and what gaps the headcount implies — a cluster in one function names where the budget is going.
4. **Map the likely buying committee.** Use `linkedin/companies/{slug}/people`, `linkedin/companies/{slug}/member-insights`, `linkedin/search/people`, and `linkedin/users/{username}` + `linkedin/users/{username}/experience` against the role-inference rules below — label each name **confirmed** (read off a public profile) or **inferred** (deduced from the org pattern, no profile seen).
5. **Layer recent context.** Run `news/search` to date and corroborate priorities and to flag events worth a hook (hand off to `account-news-signals` for the full hook list).
6. **Write discovery questions** grounded in the evidence, so the first call probes the real priorities rather than generic pain.
7. **Note source gaps.** Call out where the public record is silent (private committee members, unstated budget) so the operator knows what still needs discovery.

## Inferring the buying committee from public roles

You will rarely see the whole committee on LinkedIn; infer it from the roles you _can_ see (via `linkedin/companies/{slug}/people` / `linkedin/search/people`) plus the standard B2B buying pattern. Map each public title to a committee function:

| Committee role          | Read it from                                       | Typical public titles                                                   |
| ----------------------- | -------------------------------------------------- | ----------------------------------------------------------------------- |
| **Economic buyer**      | Who owns the budget line your product hits         | VP / Director / Head of the owning function; C-level at smaller co's    |
| **Champion**            | Who feels the pain daily and would push internally | Manager / Senior IC in the function; the person the new role reports to |
| **Technical evaluator** | Who must approve fit/security/integration          | Eng lead, IT, Security, RevOps, Data                                    |
| **End user**            | Who uses it after purchase                         | ICs in the function; the open-role title itself                         |
| **Blocker**             | Whose status quo or budget it threatens            | Owner of the incumbent tool/process; Procurement, Finance               |

Inference rules:

- Company size sets committee size — under ~50 employees, one person often holds buyer + champion; at enterprise scale, expect a named procurement and security gate.
- An open req **is** a committee clue: the role's reporting line names the likely champion, and its mandate names the economic buyer's priority.
- Tenure matters — a new exec (under ~6 months, read from `linkedin/users/{username}/experience`) is more likely to fund change; a long-tenured incumbent may defend the status quo (potential blocker).
- Never assert a committee role from a title alone as fact. **Confirmed** = a public profile actually shows the person and role; everything reasoned from org patterns is **inferred**.

## Output: account brief

A one-page account brief, with the date generated:

```markdown
# Account Brief — [Company] (generated YYYY-MM-DD)

## Snapshot

Industry · Headcount band · HQ · Specialties · Affiliated entities — each sourced to the public page.

## Current priorities & narrative

3–5 priorities, each tied to a recent post or page claim (link + date).

## Hiring signals

| Function | Open roles | Count trend | Gap implied | Source (job post) |
| -------- | ---------- | ----------- | ----------- | ----------------- |

## Likely buying committee

| Name / title                                              | Committee role | Confidence | Source |
| --------------------------------------------------------- | -------------- | ---------- | ------ |
| (or "unfilled — likely held by [function]" when inferred) |

## Discovery questions

5–8 questions, each tied to a specific piece of evidence above.

## Source gaps

What the public record doesn't show and the operator must confirm in discovery.

## Sources & record cost

Every URL + date pulled; UnifAPI billing metadata or estimate.
```

- Every claim is cited to the public record it came from; inferred items are clearly flagged.
- Discovery questions probe the evidenced priority, e.g. _"You posted about consolidating tooling this quarter — where does [category] sit in that?"_ not generic pain-finding.

## Guardrails

- Read-only research. It builds the brief; it never sends connection requests, InMail, DMs, or any message — the operator owns all outreach from their own account.
- Public data only. Reads LinkedIn's **public** surface via URL slug, never private, logged-in, or connection-gated data; never scrapes behind auth.
- Confirmed vs inferred: headcount bands, committee roles, and priorities inferred from public signals are hypotheses — label inferred items so they are verified before they drive a pitch.
- Profile data is for legitimate B2B research; respect each platform's rules and applicable privacy law.
- Dated snapshots: profiles and pages age — note when a key signal (a role, a post) is more than a few months old, and re-pull to refresh.

## Related Skills

- **account-news-signals** (Lead Company Research Agent): layer recent news/funding/leadership events onto the brief for timing and hooks.
- **buying-signal-monitor** (Social Selling Agent): catch real-time public intent that makes an account worth briefing in the first place.
- **unifapi**: the shared data skill — connect MCP and discover the LinkedIn/news operations above.
