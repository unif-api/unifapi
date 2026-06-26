<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Connect UnifAPI to VS Code

> One-click install · read-only public-data MCP over OAuth — **eyes, not hands**.

Connect VS Code to the UnifAPI public-data MCP server and run marketing research — SEO, AI-visibility (GEO), social, local, and competitive intelligence — from live public data without leaving VS Code. Paste one prompt and the agent installs the MCP server over OAuth, or add the hosted endpoint by hand. One OAuth sign-in, no API key to paste; everything is read-only.

## Steps

### 1. Add UnifAPI to VS Code

One click installs it into VS Code (Copilot agent mode):

[Install in VS Code](https://vscode.dev/redirect/mcp/install?name=unifapi&config=%7B%22url%22%3A%22https%3A%2F%2Fmcp.unifapi.com%22%7D)

Prefer to edit the config? Add this to .vscode/mcp.json (or your user MCP config):

```text
{
  "servers": {
    "unifapi": {
      "type": "http",
      "url": "https://mcp.unifapi.com"
    }
  }
}
```

Your client opens a browser sign-in. No OAuth UI? Send an API key as a bearer token instead — see the MCP docs.

[MCP docs](https://docs.unifapi.com/mcp)

### 2. Try it with VS Code

```text
Use UnifAPI to pull the current top Hacker News story and summarize it.
```

## Links

- All clients & full setup: https://unifapi.com/mcp
- Open-source agents & skills: https://github.com/unifapi-agent/agents
- MCP server: `https://mcp.unifapi.com`
- Docs: https://docs.unifapi.com/mcp

<sub>Topics: VS Code MCP · connect UnifAPI to VS Code · VS Code MCP server · UnifAPI VS Code setup · VS Code public data API</sub>
