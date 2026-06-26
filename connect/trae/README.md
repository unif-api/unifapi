<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Connect UnifAPI to Trae

> Add via config · read-only public-data MCP over OAuth — **eyes, not hands**.

Connect Trae to the UnifAPI public-data MCP server and run marketing research — SEO, AI-visibility (GEO), social, local, and competitive intelligence — from live public data without leaving Trae. Paste one prompt and the agent installs the MCP server over OAuth, or add the hosted endpoint by hand. One OAuth sign-in, no API key to paste; everything is read-only.

## Steps

### 1. Add the MCP server in Trae

Open Settings → MCP. On the Local tab, click + Add → Create Manually.

Paste this config and save:

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

Trae opens a browser sign-in for your UnifAPI workspace. Read-only — no API key to paste.

### 3. Try it with Trae

```text
Use UnifAPI to pull the current top Hacker News story and summarize it.
```

## Links

- All clients & full setup: https://unifapi.com/mcp
- Open-source agents & skills: https://github.com/unifapi-agent/agents
- MCP server: `https://mcp.unifapi.com`
- Docs: https://docs.unifapi.com/mcp

<sub>Topics: Trae MCP · connect UnifAPI to Trae · Trae MCP server · UnifAPI Trae setup · Trae public data API</sub>
