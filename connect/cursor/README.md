<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Connect UnifAPI to Cursor

> One-click install · read-only public-data MCP over OAuth — **eyes, not hands**.

Connect Cursor to the UnifAPI public-data MCP server and run marketing research — SEO, AI-visibility (GEO), social, local, and competitive intelligence — from live public data without leaving Cursor. Paste one prompt and the agent installs the MCP server over OAuth, or add the hosted endpoint by hand. One OAuth sign-in, no API key to paste; everything is read-only.

## Steps

### 1. Add UnifAPI to Cursor

One click installs it into Cursor:

[Add to Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=unifapi&config=eyJ1cmwiOiJodHRwczovL21jcC51bmlmYXBpLmNvbSJ9)

Prefer a prompt? Paste this into Cursor and let it install the server and sign in:

```text
Please install the UnifAPI MCP server for me, then confirm it connected.

It's a remote (streamable HTTP) MCP server.
MCP Server URL: https://mcp.unifapi.com

UnifAPI uses OAuth — open the browser sign-in when prompted. It's read-only public data, so there's no API key to paste.
```

### 2. Prefer to edit the config yourself?

Add UnifAPI to Cursor's MCP config:

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

### 3. Try it with Cursor

```text
Use UnifAPI to pull the current top Hacker News story and summarize it.
```

## Links

- All clients & full setup: https://unifapi.com/mcp
- Open-source agents & skills: https://github.com/unifapi-agent/agents
- MCP server: `https://mcp.unifapi.com`
- Docs: https://docs.unifapi.com/mcp

<sub>Topics: Cursor MCP · connect UnifAPI to Cursor · Cursor MCP server · UnifAPI Cursor setup · Cursor public data API</sub>
