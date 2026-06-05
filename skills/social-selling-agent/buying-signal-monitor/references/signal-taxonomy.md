# Buying-Signal Taxonomy & Phrase Library

The watch phrases and classification rules behind the Buying Signal Monitor skill. Use this to build the signal set (workflow step 1), classify matches (step 3), and anchor the strength score (step 4). Every signal is read from a public post; nothing here justifies reading private or logged-in data.

## Signal types

Five types, ordered by how directly they predict a near-term purchase. The **strength anchor** is the score this type earns on the rubric's signal-strength axis before fit and recency are applied.

| Type                    | What it is                                                              | Strength anchor | Where it shows up                                         |
| ----------------------- | ----------------------------------------------------------------------- | --------------- | --------------------------------------------------------- |
| **Active demand**       | Explicitly asking for a tool/category you sell                          | 3               | X/Twitter posts and replies; LinkedIn posts               |
| **Vendor switch**       | Leaving, unhappy with, or comparing away from a competitor              | 3               | X complaints/threads; LinkedIn posts; review-site chatter |
| **Hiring trigger**      | An open role that only exists because of the gap you fill               | 2 (inferred)    | LinkedIn public jobs; company page                        |
| **Expansion / funding** | New market, office, raise, or leadership that implies budget + projects | 2               | News; LinkedIn company posts; X exec posts                |
| **Pain vent**           | Naming the problem you solve without naming a tool                      | 1–2             | X posts; LinkedIn posts                                   |

A match that fits two types at once (e.g. a vendor-switch complaint _and_ an open backfill role) is stronger evidence — note both and let the corroboration break ties.

## Phrase library by type

Build watch phrases by slotting your category and competitors into these patterns. Quote multi-word phrases so search matches the intent, not the loose keywords.

### Active demand

- `"anyone recommend a [category]"`, `"looking for a [category] tool"`, `"what do people use for [job-to-be-done]"`
- `"need a [category] that [must-have feature]"`, `"best [category] for [segment]"`
- `"is there a tool that [outcome]"`, `"how do you all handle [workflow]"`

### Vendor switch

- `"alternative to [competitor]"`, `"migrating off [competitor]"`, `"moving away from [competitor]"`
- `"[competitor] is too expensive / too slow / broken"`, `"cancelling [competitor]"`, `"[competitor] vs"`
- `"anyone else fed up with [competitor]"`, `"[competitor] keeps [failure]"`

### Hiring trigger

- LinkedIn jobs for the role that _owns_ your category (e.g. "Marketing Ops Manager" for a martech tool) — a net-new role is a stronger signal than a backfill.
- Job descriptions naming the exact stack gap ("stand up our first [system]", "own [process] from scratch").

### Expansion / funding

- `"excited to announce our Series _"`, `"we raised"`, `"expanding to [market]"`, `"opening our [city] office"`
- New-exec announcements in the function that buys your category ("thrilled to join [account] as VP of \_").

### Pain vent

- `"why is [task] still so painful"`, `"spent all day on [manual process]"`, `"there has to be a better way to [job]"`
- These are softer — score 1 unless the vent names a quantified pain or a deadline, which earns a 2.

## Noise filters (discard before scoring)

- **Off-segment:** author/company outside the named industry, size band, or geography.
- **Wrong intent:** job-seekers, students, competitors' employees, vendors pitching, or people answering someone else's question.
- **Stale:** older than the recency window (default 30-day hard cap; ≤14 days preferred).
- **Sarcasm / rhetorical:** a "recommendation" post that's actually a joke or a hot take. When unsure, mark `inferred` and lower the strength score rather than discarding outright.
- **Already-customer / already-shortlisted:** if the post says they just bought a competitor, it's a switch _later_, not demand _now_ — downgrade to Watch.

## Confirmed vs inferred

Tag every kept lead so the operator knows what still needs checking before outreach:

- **Confirmed** — role, company, and the intent itself are all stated in public data (the post and the linked public profile).
- **Inferred** — any one of those is a guess: role read from a thin bio, company assumed from context, or intent read from a hiring post rather than a stated ask. Hiring-trigger and expansion signals are inferred by default. Never let an inferred lead sit in the Hot band; cap it at Warm until a human verifies.
