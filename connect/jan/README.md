<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Connect UnifAPI to Jan

> Add a custom MCP server · read-only public-data MCP over OAuth — **eyes, not hands**.

Connect Jan to the UnifAPI public-data MCP server and run marketing research — SEO, AI-visibility (GEO), social, local, and competitive intelligence — from live public data without leaving Jan. Paste one prompt and the agent installs the MCP server over OAuth, or add the hosted endpoint by hand. One OAuth sign-in, no API key to paste; everything is read-only.

## Steps

### 1. Add the MCP server in Jan

Open Settings → MCP Servers, then click + Add MCP Server.

Set Transport to HTTP (Streamable HTTP), paste the URL below, then save and toggle the server on:

```text
https://mcp.unifapi.com
```

### 2. Sign in with OAuth

Jan opens a browser sign-in for your UnifAPI workspace. Read-only — no API key to paste.

### 3. Try it with Jan

```text
Use UnifAPI to pull the current top Hacker News story and summarize it.
```

## Links

- All clients & full setup: https://unifapi.com/mcp
- Open-source agents & skills: https://github.com/unifapi-agent/agents
- MCP server: `https://mcp.unifapi.com`
- Docs: https://docs.unifapi.com/mcp

<sub>Topics: Jan MCP · connect UnifAPI to Jan · Jan MCP server · UnifAPI Jan setup · Jan public data API</sub>
