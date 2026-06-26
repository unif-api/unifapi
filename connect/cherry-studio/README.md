<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Connect UnifAPI to Cherry Studio

> Import from JSON · read-only public-data MCP over OAuth — **eyes, not hands**.

Connect Cherry Studio to the UnifAPI public-data MCP server and run marketing research — SEO, AI-visibility (GEO), social, local, and competitive intelligence — from live public data without leaving Cherry Studio. Paste one prompt and the agent installs the MCP server over OAuth, or add the hosted endpoint by hand. One OAuth sign-in, no API key to paste; everything is read-only.

## Steps

### 1. Add the MCP server in Cherry Studio

Open Settings → MCP Servers, then click + Add → Import from JSON.

Paste this config and Save, then toggle the server on — Cherry Studio opens your browser to approve UnifAPI:

```text
{
  "mcpServers": {
    "unifapi": {
      "type": "streamableHttp",
      "url": "https://mcp.unifapi.com"
    }
  }
}
```

### 2. Try it with Cherry Studio

```text
Use UnifAPI to pull the current top Hacker News story and summarize it.
```

## Links

- All clients & full setup: https://unifapi.com/mcp
- Open-source agents & skills: https://github.com/unifapi-agent/agents
- MCP server: `https://mcp.unifapi.com`
- Docs: https://docs.unifapi.com/mcp

<sub>Topics: Cherry Studio MCP · connect UnifAPI to Cherry Studio · Cherry Studio MCP server · UnifAPI Cherry Studio setup · Cherry Studio public data API</sub>
