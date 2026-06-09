<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Connect UnifAPI to Codex

> Add via config file · read-only public-data MCP over OAuth — **eyes, not hands**.

Connect Codex to the UnifAPI public-data MCP server and run marketing research — SEO, AI-visibility (GEO), social, local, and competitive intelligence — from live public data without leaving Codex. A custom MCP server — add the hosted endpoint and sign in with OAuth. One OAuth sign-in, no API key to paste; everything is read-only.

## Steps

### 1. Add the MCP server

Add UnifAPI to ~/.codex/config.toml:

```text
[mcp_servers.unifapi]
url = "https://mcp.unifapi.com"
```

### 2. Sign in with OAuth

```text
codex mcp login unifapi
```

Read-only — no API key to paste.

### 3. Add the skills (optional)

```text
npx skills add unifapi-agent/agents
```

Adds the marketing-agent SKILL.md run-prompts alongside the MCP server.

### 4. Try it with Codex

```text
Use UnifAPI to pull the current top Hacker News story and summarize it.
```

## Links

- All clients & full setup: https://unifapi.com/mcp
- Open-source agents & skills: https://github.com/unifapi-agent/agents
- MCP server: `https://mcp.unifapi.com`
- Docs: https://docs.unifapi.com/mcp

<sub>Topics: Codex MCP · connect UnifAPI to Codex · Codex MCP server · UnifAPI Codex setup · Codex public data API</sub>
