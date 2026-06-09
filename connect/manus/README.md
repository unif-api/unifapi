<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Connect UnifAPI to Manus

> Custom connector — skills too · read-only public-data MCP over OAuth — **eyes, not hands**.

Connect Manus to the UnifAPI public-data MCP server and run marketing research — SEO, AI-visibility (GEO), social, local, and competitive intelligence — from live public data without leaving Manus. A custom MCP server — add the hosted endpoint and sign in with OAuth. One OAuth sign-in, no API key to paste; everything is read-only.

## Steps

### 1. Open Manus plugins

In Manus, open Plugins and click Create → Connectors → Custom MCP (or "Import MCP by JSON" to paste the config below).

[Open Manus plugins](https://manus.im/app/plugins)

### 2. Add UnifAPI

Name it "UnifAPI" and paste the MCP server URL:

```text
https://mcp.unifapi.com
```

Or use Import MCP by JSON with this config:

```text
{
  "mcpServers": {
    "unifapi": {
      "url": "https://mcp.unifapi.com"
    }
  }
}
```

### 3. Sign in with OAuth

Manus opens a browser sign-in for your UnifAPI workspace. Read-only — no API key to paste.

### 4. Add the skills (optional)

Manus can also import the marketing-agent skills: Create → Skills → Import Skill from GitHub, pointed at the agents repo.

[Skills on GitHub](https://github.com/unifapi-agent/agents)

### 5. Try it with Manus

```text
Use UnifAPI to pull the current top Hacker News story and summarize it.
```

## Links

- All clients & full setup: https://unifapi.com/mcp
- Open-source agents & skills: https://github.com/unifapi-agent/agents
- MCP server: `https://mcp.unifapi.com`
- Docs: https://docs.unifapi.com/mcp

<sub>Topics: Manus MCP · connect UnifAPI to Manus · Manus MCP server · UnifAPI Manus setup · Manus public data API</sub>
