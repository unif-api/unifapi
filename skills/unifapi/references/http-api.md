# Direct HTTP Reference

Prefer MCP for agent workflows. Use direct HTTP when building application code, scripts, tests, or fallback integrations.

## Base URLs

| Surface                  | URL                                        |
| ------------------------ | ------------------------------------------ |
| API                      | `https://api.unifapi.com`                  |
| OpenAPI                  | `https://api.unifapi.com/openapi.json`     |
| OpenAPI API-route mirror | `https://api.unifapi.com/api/openapi.json` |
| Docs OpenAPI mirror      | `https://unifapi.com/openapi.json`         |
| Docs                     | `https://docs.unifapi.com`                 |

## Auth

Direct HTTP calls use a workspace API key:

```txt
Authorization: Bearer YOUR_UNIFAPI_KEY
```

When looking for a key, prefer already configured secure sources:

1. A bearer header already configured by the client.
2. `UNIFAPI_API_KEY` in the process environment.
3. `UNIFAPI_KEY` in the process environment.
4. A local `.env` file the user explicitly tells you to read.
5. A secret manager configured for the runtime.

If none exists, do not ask the user to paste a key into chat. Ask them to configure it out of band.

## Calling Pattern

1. Inspect the OpenAPI schema or MCP operation metadata.
2. Use normalized UnifAPI paths such as `/x/users/by/username/{username}` rather than upstream vendor paths.
3. Preserve the response envelope and `billing` metadata when present.
4. Handle `unauthorized` and `insufficient_credits` explicitly.

For X/Twitter, read [twitter-x.md](twitter-x.md) first. The current public surface uses `/x/...` paths; old `/twitter/...` paths are stale.

## Curl Shape

```bash
curl "https://api.unifapi.com/x/users/by/username/openai" \
  -H "Authorization: Bearer $UNIFAPI_API_KEY"
```
