<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Connect UnifAPI to Any other client

> Works with any MCP client · read-only public-data MCP over OAuth — **eyes, not hands**.

Connect Any other client to the UnifAPI public-data MCP server and run marketing research — SEO, AI-visibility (GEO), social, local, and competitive intelligence — from live public data without leaving Any other client. A custom MCP server — add the hosted endpoint and sign in with OAuth. One OAuth sign-in, no API key to paste; everything is read-only.

## Steps

### 1. Add the MCP server

Point any MCP-compatible client at the hosted server:

```text
https://mcp.unifapi.com
```

```text
{
  "mcpServers": {
    "unifapi": {
      "url": "https://mcp.unifapi.com"
    }
  }
}
```

### 2. Sign in with OAuth

Sign in through the browser. No OAuth UI? Send an API key as a bearer token — see the MCP docs.

[MCP docs](https://docs.unifapi.com/mcp)

### 3. Add the skills (optional)

```text
npx skills add unifapi-agent/agents
```

Adds the marketing-agent SKILL.md run-prompts alongside the MCP server.

### 4. Try it with your agent

```text
Use UnifAPI to pull the current top Hacker News story and summarize it.
```

## Links

- All clients & full setup: https://unifapi.com/mcp
- Open-source agents & skills: https://github.com/unifapi-agent/agents
- MCP server: `https://mcp.unifapi.com`
- Docs: https://docs.unifapi.com/mcp

<sub>Topics: Any other client MCP · connect UnifAPI to Any other client · Any other client MCP server · UnifAPI Any other client setup · Any other client public data API</sub>
