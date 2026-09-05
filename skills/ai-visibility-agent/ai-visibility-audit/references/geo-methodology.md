# GEO measurement reference

A measurement belongs to a specific surface, prompt, locale, search mode, sample and observation time. Store that context with its answer and request id.

| Data source                      | Meaning                                             | Boundary                                                                                  |
| -------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `/geo/answers`, chatgpt          | Live ChatGPT web answer                             | Natural and forced-search samples differ; model can be unknown                            |
| `/geo/answers`, gemini           | Live Gemini web answer                              | No force_web_search option                                                                |
| `/geo/serp`                      | Live Google AI Mode                                 | Result position is not brand rank; target links are broader than answer references        |
| `/seo/serp`, include_ai_overview | Google Search with AI Overview data                 | A valid search may have no AI Overview                                                    |
| `/geo/mentions/*`                | Indexed-corpus search and aggregate/history metrics | Does not execute or replay a fixed custom prompt panel; ChatGPT corpus is US/English only |

## Evidence and counting

- A citation comes from answer sources/references. Retrieved but unused search results are not citations.
- Match citation domains exactly, with explicit subdomain handling. Deduplicate tracking variants of URLs. Count each tracked brand at most once per sampled answer for panel metrics.
- A mention comes from visible answer text and explicit aliases. Do not infer it from a link destination, an unrelated substring, or a domain match. Text matching can still be ambiguous; retain the answer for review.
- A valid no-answer response is an observed absence of an answer and stays in coverage denominators. Collection failures and unknown outcomes have no observation; report them separately.
- Do not fabricate sentiment, recommendation order, causal explanations or traffic from these signals.

## Metrics

For successful sampled cells i, tracked brands b, fixed weights w_i, and indicator functions M (mentioned) and C (cited):

```text
mention coverage(b) = sum_i M(b,i) / number of successful cells
citation coverage(b) = sum_i C(b,i) / number of successful cells
mention share(b) = sum_i M(b,i) / sum_b sum_i M(b,i)
citation share(b) = sum_i C(b,i) / sum_b sum_i C(b,i)
weighted citation coverage(b) = sum_i w_i C(b,i) / sum_i w_i
weighted citation share(b) = sum_i w_i C(b,i) / sum_b sum_i w_i C(b,i)
```

Coverage can sum above 100% across brands because multiple brands may appear in one answer. Shares sum to 100% when their denominator is nonzero. Empty denominators are N/A. A denominator counting “any tracked brand” measures conditional coverage, not share.

Example: two answers cite A; one also cites B. A's citation coverage is 100%; B's is 50%. Their citation shares are 2/3 and 1/3. With prompt weights 2 and 1, and B only in the first answer, weighted shares are 3/5 and 2/5.

Use per-engine unweighted coverage as the primary descriptive measure. Demand-weighted figures are optional estimates, not observed traffic. Do not silently pool engine coverage, weights, search modes or different panels.

## Comparison and interpretation

Freeze panel text, brand definitions, engines, locale, sampling rules and weights. Compare only cells successfully observed in both runs, and report that paired denominator along with full-run completion rates. More failures must not appear as lost visibility. Engine/model changes, answer variability and corpus changes can explain movements; one before/after run does not establish causality.

A missing citation may justify investigating content, evidence or third-party sources. It does not prove an extractability defect. JSON-LD, llms.txt, adding quotations, and other changes cannot guarantee a citation or a transferable percentage lift.
