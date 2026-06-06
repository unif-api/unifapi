---
name: reddit-thread-fit-check
description: When the user wants to decide which Reddit threads are worth replying to, citing, monitoring, or avoiding based on relevance, subreddit rules, conversation intent, and outreach risk. Also use on "Reddit thread fit," "is this Reddit thread safe to reply to," "find outreach-safe Reddit threads," "prioritize Reddit replies," "Reddit participation risk," or "which Reddit posts should we engage." For broader subreddit mapping, run reddit-community-research first.
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
---

# Reddit Thread Fit Check

Score candidate Reddit threads for whether a brand, founder, or operator should reply, cite, monitor, or avoid. The output is a decision brief, not an automated comment. A good result protects account trust and community norms as much as it finds opportunity.

This is an **enhanced** skill: it reads public Reddit data through UnifAPI. It never posts, comments, votes, DMs, or recommends undisclosed promotion.

## Use UnifAPI for live evidence

Start from candidate threads found by `reddit-community-research`, `social-listening-brief`, or the operator. Because the current Reddit surface has no keyword search and no per-subreddit post feed, be explicit about how candidates were sourced.

- **Subreddit profile and rules** - `reddit/subreddits/{name}` for subscribers, activity, tone, and the verbatim self-promotion/vendor rules.
- **Thread context** - `reddit/posts/{id}` for title, body, age, score, comment count, and URL.
- **Comment tree** - `reddit/posts/{id}/comments` for what people are actually asking, recommending, objecting to, or rejecting.
- **User credibility check** - `reddit/users/{username}/comments` when a recurring voice or original poster credibility affects the decision.
- **Candidate discovery limits** - `reddit/trending-searches` and `reddit/feed/popular` can widen the pool, but they do not make coverage exhaustive.

Keep source URLs, run dates, and billing metadata.

## Workflow

1. **Collect candidates.** Accept thread URLs/IDs from the user or from a prior Reddit research brief. If no candidates exist, ask for seed subreddits or run the bounded discovery path from `reddit-community-research`.
2. **Read the rules first.** Pull the subreddit profile and record the self-promotion/vendor rule verbatim before scoring the thread.
3. **Read the thread and comments.** Identify what the poster wants: recommendation, troubleshooting, comparison, complaint, market research, or debate.
4. **Score fit and risk.** Use the rubric below. A thread can be highly relevant and still be a `do not reply` if the rules or tone make participation unsafe.
5. **Choose the action.** One of: Reply draft, Monitor only, Cite for research, Ask human/moderator, Avoid.
6. **Write a reply angle only when safe.** If the action is Reply draft, provide an answer-first angle and required disclosure. Do not write promotional copy unless the user explicitly asks after seeing the risk.

## Scoring rubric

Score each axis 1-5:

| Axis             | 1                                  | 3                         | 5                                                  |
| ---------------- | ---------------------------------- | ------------------------- | -------------------------------------------------- |
| Relevance        | Tangential                         | Adjacent problem          | Directly asks about the exact problem/category     |
| Intent fit       | General debate                     | Mixed question/discussion | Clear ask for help, recommendation, or explanation |
| Timing           | Old or closed                      | Slowing down              | Fresh and active                                   |
| Community safety | Rules forbid vendor/self-promo     | Allowed only with care    | Helpful disclosed participation is accepted        |
| Account-risk     | Likely to be filtered or downvoted | Some skepticism           | Low risk if useful and disclosed                   |

```text
Opportunity = Relevance * 0.35 + IntentFit * 0.25 + Timing * 0.15 + CommunitySafety * 0.15 + AccountRisk * 0.10
```

Decision gates override the score:

- **Avoid** if rules forbid vendor participation, the thread is hostile to promotion, or the reply would require pretending to be a user.
- **Monitor only** if the thread is relevant but the conversation is emotional, political, or already resolved.
- **Ask human/moderator** if rules are ambiguous and the upside is high.
- **Reply draft** only when the ask is clear, the rule allows it, and the reply can be useful without pitching.

## Output

Return a thread-fit table plus only the safe next actions:

```markdown
# Reddit Thread Fit Check - {topic} ({YYYY-MM-DD})

## Recommendation

- Best thread to reply to: ...
- Threads to avoid: ...
- Main risk: ...

| Thread                  | Subreddit | Fit | Action      | Rule evidence                          | Why                                                 |
| ----------------------- | --------- | --- | ----------- | -------------------------------------- | --------------------------------------------------- |
| "Which tool handles X?" | r/example | 4.2 | Reply draft | Rule 3 allows disclosed vendor replies | Direct recommendation request, fresh, low hostility |

## Reply-Angle Briefs

### Thread: {title}

- Answer-first angle: ...
- Disclosure needed: ...
- What not to say: ...
- Evidence to cite: ...

## Coverage

- Candidate source: user-provided | prior brief | bounded discovery
- Subreddits checked: ...
- Reddit coverage limits: no keyword search; not an exhaustive sweep
- UnifAPI cost: ...
```

## Guardrails

- Never post, vote, DM, or automate Reddit participation.
- Never recommend undisclosed self-promotion, fake user stories, vote manipulation, or coordinated replies.
- Respect subreddit rules even when the thread is commercially attractive.
- Do not treat high upvotes as permission to enter. Rule fit and tone matter first.
- Keep the reply angle answer-first: solve the user's problem, disclose affiliation if relevant, and avoid links unless genuinely necessary.

## Related Skills

- **reddit-community-research**: discover and map the communities and candidate threads this skill scores.
- **social-listening-brief**: surface a Reddit thread as part of broader launch or brand monitoring.
- **customer-research**: turn threads that are not safe to reply to into voice-of-customer insight.
- **unifapi**: the shared data skill (connect MCP, discover the Reddit operations this skill reads).
