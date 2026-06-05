# UnifAPI MCP Reference

## Default Setup

Register the hosted MCP server:

```text
https://mcp.unifapi.com
```

Compatible clients should discover OAuth from:

```text
https://mcp.unifapi.com/.well-known/oauth-protected-resource
```

Do not add custom scope fields unless the client explicitly supports them. Let the client discover required OAuth details from protected-resource metadata.

## OAuth Details

| Field                       | Value                                                          |
| --------------------------- | -------------------------------------------------------------- |
| MCP server URL              | `https://mcp.unifapi.com`                                      |
| Protected resource metadata | `https://mcp.unifapi.com/.well-known/oauth-protected-resource` |
| Authorization server        | `https://api.unifapi.com/api/auth`                             |
| Required MCP scope          | `unifapi:mcp`                                                  |
| Transport                   | Streamable HTTP                                                |

OAuth authorizes the UnifAPI workspace and credit balance. It does not authorize private upstream social, Google, CRM, email, or SaaS accounts.

## Agent Behavior

- Add the MCP server URL.
- Let the client complete browser OAuth.
- Never ask the user to paste OAuth tokens into chat.
- Use `list_operations` to discover available public-data operations.
- Use `get_operation` before calling an unfamiliar operation.
- Use `call_api` for live evidence.
- Treat a `401 unauthorized` from a previously working OAuth session as expiry, revocation, or wrong audience; restart OAuth.

## Client Examples

Claude Code:

```bash
claude mcp add --transport http unifapi https://mcp.unifapi.com
```

Codex:

```bash
codex mcp add unifapi --url https://mcp.unifapi.com
```

Cursor-style JSON:

```json
{
  "mcpServers": {
    "unifapi": {
      "url": "https://mcp.unifapi.com"
    }
  }
}
```

## API-Key Fallback

Use this only when a client cannot complete OAuth or explicitly requires static headers.

```json
{
  "mcpServers": {
    "unifapi": {
      "url": "https://mcp.unifapi.com",
      "headers": {
        "Authorization": "Bearer YOUR_UNIFAPI_KEY"
      }
    }
  }
}
```

If a key is needed, prefer secrets outside chat: environment variables, a local `.env` file the user explicitly tells you to read, or a secret manager. Do not ask the user to paste secrets into the conversation.

## Billing

Connecting to the MCP server is free. Calls that fetch public data spend UnifAPI workspace credits and may return billing metadata in the tool result.

Common credit errors:

| Error                  | Meaning                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| `unauthorized`         | Missing, expired, revoked, malformed, or wrong-audience credential |
| `insufficient_credits` | The connected workspace does not have enough credits               |
