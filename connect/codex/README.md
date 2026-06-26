<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Connect UnifAPI to Codex

> Paste one prompt · read-only public-data MCP over OAuth — **eyes, not hands**.

Connect Codex to the UnifAPI public-data MCP server and run marketing research — SEO, AI-visibility (GEO), social, local, and competitive intelligence — from live public data without leaving Codex. Paste one prompt and the agent installs the MCP server over OAuth, or add the hosted endpoint by hand. One OAuth sign-in, no API key to paste; everything is read-only.

## Steps

### 1. Paste one prompt into Codex

Drop this into Codex and let it run — it adds the server and starts the OAuth sign-in for you:

```text
Please install the UnifAPI MCP server for me, then confirm it connected.

It's a remote (streamable HTTP) MCP server.
MCP Server URL: https://mcp.unifapi.com

UnifAPI uses OAuth — open the browser sign-in when prompted. It's read-only public data, so there's no API key to paste.
```

### 2. Prefer to set it up by hand?

Add UnifAPI to ~/.codex/config.toml:

```text
[mcp_servers.unifapi]
url = "https://mcp.unifapi.com"
```

Then sign in over OAuth:

```text
codex mcp login unifapi
```

### 3. Try it with Codex

```text
Use UnifAPI to pull the current top Hacker News story and summarize it.
```

## Links

- All clients & full setup: https://unifapi.com/mcp
- Open-source agents & skills: https://github.com/unifapi-agent/agents
- MCP server: `https://mcp.unifapi.com`
- Docs: https://docs.unifapi.com/mcp

<sub>Topics: Codex MCP · connect UnifAPI to Codex · Codex MCP server · UnifAPI Codex setup · Codex public data API</sub>
