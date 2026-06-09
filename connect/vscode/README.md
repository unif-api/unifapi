<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Connect UnifAPI to VS Code

> One-click install · read-only public-data MCP over OAuth — **eyes, not hands**.

Connect VS Code to the UnifAPI public-data MCP server and run marketing research — SEO, AI-visibility (GEO), social, local, and competitive intelligence — from live public data without leaving VS Code. A custom MCP server — add the hosted endpoint and sign in with OAuth. One OAuth sign-in, no API key to paste; everything is read-only.

## Steps

### 1. Add the MCP server

One-click install into VS Code:

[Install in VS Code](https://vscode.dev/redirect/mcp/install?name=unifapi&config=%7B%22url%22%3A%22https%3A%2F%2Fmcp.unifapi.com%22%7D)

Or add it to your MCP config by hand:

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

Your client opens a browser sign-in. No OAuth UI? Send an API key as a bearer token instead.

[MCP docs](https://docs.unifapi.com/mcp)

### 3. Add the skills (optional)

```text
npx skills add unifapi-agent/agents
```

Adds the marketing-agent SKILL.md run-prompts for clients that support skills.

### 4. Try it with VS Code

```text
Use UnifAPI to pull the current top Hacker News story and summarize it.
```

## Links

- All clients & full setup: https://unifapi.com/mcp
- Open-source agents & skills: https://github.com/unifapi-agent/agents
- MCP server: `https://mcp.unifapi.com`
- Docs: https://docs.unifapi.com/mcp

<sub>Topics: VS Code MCP · connect UnifAPI to VS Code · VS Code MCP server · UnifAPI VS Code setup · VS Code public data API</sub>
