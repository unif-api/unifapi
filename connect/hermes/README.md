<!-- Generated file — do not edit by hand. Propose changes via an issue or PR; see CONTRIBUTING.md. -->

# Connect UnifAPI to Hermes

> Paste one prompt · read-only public-data MCP over OAuth — **eyes, not hands**.

Connect Hermes to the UnifAPI public-data MCP server and run marketing research — SEO, AI-visibility (GEO), social, local, and competitive intelligence — from live public data without leaving Hermes. Paste one prompt and the agent installs the MCP server over OAuth, or add the hosted endpoint by hand. One OAuth sign-in, no API key to paste; everything is read-only.

## Steps

### 1. Paste one prompt into Hermes

Requires Hermes v0.13.0 (2026.5.7) or newer. Paste this into a new Hermes conversation and follow its instructions:

```text
Add UnifAPI as an MCP server using OAuth.

Open ~/.hermes/config.yaml and add this entry under `mcp_servers:` (create the section if it doesn't exist). DO NOT change any other existing entries:
  unifapi:
    url: https://mcp.unifapi.com
    auth: oauth
    headers:
      Accept: application/json, text/event-stream

After saving, print the exact commands I need to run on the machine where Hermes is installed — one to reload the gateway, one to trigger the OAuth browser sign-in. Don't run them for me by default; I'll execute them myself.
```

### 2. Try it with Hermes

```text
Use UnifAPI to pull the current top Hacker News story and summarize it.
```

## Links

- All clients & full setup: https://unifapi.com/mcp
- Open-source agents & skills: https://github.com/unifapi-agent/agents
- MCP server: `https://mcp.unifapi.com`
- Docs: https://docs.unifapi.com/mcp

<sub>Topics: Hermes MCP · connect UnifAPI to Hermes · Hermes MCP server · UnifAPI Hermes setup · Hermes public data API</sub>
