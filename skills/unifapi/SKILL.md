---
name: unifapi
description: "Use when working with UnifAPI public-data APIs or the UnifAPI MCP server: connecting OAuth MCP clients, discovering operations, calling social/search/scrape/news APIs, troubleshooting UnifAPI auth, or deciding between MCP OAuth and API-key fallback. Always use before asking for UnifAPI credentials or calling UnifAPI tools."
license: MIT
metadata:
  author: UnifAPI
  version: "1.0.0"
  homepage: https://unifapi.com/skills
  source: https://github.com/unifapi-agent/agents
  openclaw:
    links:
      repository: https://github.com/unifapi-agent/agents
      documentation: https://docs.unifapi.com/mcp
---

# UnifAPI

## Default Path: OAuth MCP

Use the hosted MCP server first:

```text
https://mcp.unifapi.com
```

Let the MCP client complete browser OAuth when it asks. Do not ask the user to paste OAuth tokens into chat. Do not ask for an API key unless the client cannot complete OAuth and the task genuinely needs live UnifAPI calls.

Read [references/mcp.md](references/mcp.md) for OAuth protected-resource metadata, client setup, and the API-key fallback.

## References

- [references/mcp.md](references/mcp.md) - OAuth protected-resource metadata, client setup, and API-key fallback.
- [references/public-data.md](references/public-data.md) - when UnifAPI is the right data boundary.
- [references/http-api.md](references/http-api.md) - direct HTTP integration guidance.
- [references/twitter-x.md](references/twitter-x.md) - current X/Twitter route map and response shapes.

## Agent Workflow

1. Name the artifact the user wants: ranked table, creator brief, social listening report, market scan, SERP summary, scrape summary, or another decision output.
2. Use MCP tools such as `list_operations` and `get_operation` to find exact public-data operations and schemas.
3. Call live APIs through `call_api` only for evidence you need.
4. Return an artifact, not a raw dump. Include evidence, assumptions, confidence, operations used, and billing metadata when available.
5. If a live call fails with `401 unauthorized`, restart OAuth or use the documented API-key fallback if OAuth is unavailable.

## Public-Data Boundary

UnifAPI is for public data: social profiles and posts, search results, trends, web scrape outputs, news, comments, communities, videos, and public company or creator signals.

OAuth authorizes the UnifAPI workspace and credit balance. It does not grant access to a user's private Twitter/X, Google, CRM, email, or SaaS accounts. Use a connector platform when the workflow needs private user-authorized SaaS data.

Read [references/public-data.md](references/public-data.md) when choosing whether UnifAPI is the right data path.

## Direct HTTP

Prefer MCP for agent workflows. Use direct HTTP only when the user is building an integration, running scripts, or using a client that cannot call MCP tools.

Read [references/http-api.md](references/http-api.md) before writing direct HTTP calls.
