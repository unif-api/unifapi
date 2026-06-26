<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Connect UnifAPI to Any other client

> Works with any MCP client · read-only public-data MCP over OAuth — **eyes, not hands**.

Connect Any other client to the UnifAPI public-data MCP server and run marketing research — SEO, AI-visibility (GEO), social, local, and competitive intelligence — from live public data without leaving Any other client. Paste one prompt and the agent installs the MCP server over OAuth, or add the hosted endpoint by hand. One OAuth sign-in, no API key to paste; everything is read-only.

## Steps

### 1. Paste one prompt into your agent

Drop this into your agent and let it run — it adds the server and starts the OAuth sign-in for you:

```text
Please install the UnifAPI MCP server for me, then confirm it connected.

It's a remote (streamable HTTP) MCP server.
MCP Server URL: https://mcp.unifapi.com

UnifAPI uses OAuth — open the browser sign-in when prompted. It's read-only public data, so there's no API key to paste.
```

### 2. Prefer to set it up by hand?

Or point any MCP-compatible client at the hosted server:

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

Your client opens a browser sign-in. No OAuth UI? Send an API key as a bearer token instead — see the MCP docs.

[MCP docs](https://docs.unifapi.com/mcp)

### 3. Try it with your agent

```text
Use UnifAPI to pull the current top Hacker News story and summarize it.
```

## Links

- All clients & full setup: https://unifapi.com/mcp
- Open-source agents & skills: https://github.com/unifapi-agent/agents
- MCP server: `https://mcp.unifapi.com`
- Docs: https://docs.unifapi.com/mcp

<sub>Topics: Any other client MCP · connect UnifAPI to Any other client · Any other client MCP server · UnifAPI Any other client setup · Any other client public data API</sub>
