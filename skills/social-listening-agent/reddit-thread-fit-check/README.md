<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Reddit Thread Fit Check

> Score Reddit threads by relevance, intent, rules, timing, and account risk before anyone replies.

Evaluate candidate Reddit threads for whether a brand, founder, or operator should reply, cite, monitor, ask a human, or avoid. It reads subreddit rules and comment context first, then returns an outreach-safety decision and answer-first reply angle only when participation is appropriate.

An atomic marketing skill you run inside Claude, ChatGPT, Claude Code, Cursor, Codex, OpenClaw, Hermes, or any MCP client — read-only public-data research, **eyes not hands**. It diagnoses, prices, and drafts evidence; your own assistant and accounts take any action.

## What it's good for

- Founders deciding whether a Reddit thread is safe to enter
- Community marketers prioritizing answer-first participation
- Teams protecting account trust while mining Reddit demand

## What you get

- Thread-fit table with action: reply draft, monitor, cite, ask human, or avoid
- Verbatim subreddit-rule evidence for every engagement decision
- Risk notes for self-promotion, tone, timing, and likely filtering/downvotes
- Answer-first reply angle only for threads that pass the safety gates

## What it reads

Live public data through the shared [`unifapi`](../../unifapi/) data skill — UnifAPI APIs: **reddit**. Connect once over OAuth; no scraping to maintain and no keys to rotate. Every figure in the output is cited to the record it came from.

## Example prompt

```text
Check these Reddit thread URLs for whether we should reply, monitor, cite, or avoid. Read each subreddit's rules and comments, score fit and account risk, and only draft a reply angle for safe threads.
```

## Install

Run it in any MCP client. **Paste one prompt** (Claude Code, Codex, Cursor, OpenClaw, …) to add the UnifAPI public-data MCP server at `https://mcp.unifapi.com` over OAuth — read-only, no API key — then add the marketing skills with `npx skills add unifapi-agent/agents`.

Prefer a **web connector** (Claude · ChatGPT · Perplexity · Grok), or the one-shot **plugin** for Claude-compatible hosts:

```text
/plugin marketplace add unifapi-agent/agents
/plugin install unifapi@unifapi
```

Every client, step by step: https://unifapi.com/mcp

## FAQ

### Does it post replies?

No. It scores public Reddit threads and may suggest an answer-first reply angle. A human or the operator's own account decides whether to post.

### Can it find every relevant Reddit thread?

No. The current Reddit surface is seed-bounded and has no keyword search, so the skill is honest about candidate-source coverage.

## Related

- Part of the **[Social Listening Agent](../)**
- [`reddit-community-research`](../reddit-community-research/) — Map subreddits, recurring questions, objections, and language for a niche.
- [`social-listening-brief`](../social-listening-brief/) — Track public mentions and return a concise brief instead of a dashboard.
- [`customer-research`](../../content-strategy-agent/customer-research/) — Mine authentic customer language, pains, and objections from public communities to inform messaging and content.
- Shared data skill: [`unifapi`](../../unifapi/)

## Links

- Skill page: https://unifapi.com/skills/reddit-thread-fit-check
- The skill itself: [SKILL.md](./SKILL.md)
- Install & all clients: https://unifapi.com/mcp
- Docs: https://docs.unifapi.com

<sub>Topics: Reddit marketing · Reddit self-promotion rules · is my brand a fit for this subreddit · Reddit reply safety · safe Reddit engagement · Reddit promotion without getting banned · prioritize Reddit replies</sub>
