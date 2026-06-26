<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Connect UnifAPI to Genspark

> Add a custom MCP server · read-only public-data MCP over OAuth — **eyes, not hands**.

Connect Genspark to the UnifAPI public-data MCP server and run marketing research — SEO, AI-visibility (GEO), social, local, and competitive intelligence — from live public data without leaving Genspark. Paste one prompt and the agent installs the MCP server over OAuth, or add the hosted endpoint by hand. One OAuth sign-in, no API key to paste; everything is read-only.

## Steps

### 1. Add the MCP server in Genspark

Open Genspark and click Connectors in the chat box.

In the Connectors dialog, scroll to MCP Connectors (or search "mcp") and click Add new MCP server.

Set Server Name "UnifAPI" and Server Type "StreamableHttp", paste the Server URL below, then Add Server:

[Open Genspark](https://www.genspark.ai/)

```text
https://mcp.unifapi.com
```

### 2. Sign in with OAuth

Genspark opens a browser sign-in for your UnifAPI workspace. Read-only — no API key to paste.

### 3. Try it with Genspark

```text
Use UnifAPI to pull the current top Hacker News story and summarize it.
```

## Links

- All clients & full setup: https://unifapi.com/mcp
- Open-source agents & skills: https://github.com/unifapi-agent/agents
- MCP server: `https://mcp.unifapi.com`
- Docs: https://docs.unifapi.com/mcp

<sub>Topics: Genspark MCP · connect UnifAPI to Genspark · Genspark MCP server · UnifAPI Genspark setup · Genspark public data API</sub>
