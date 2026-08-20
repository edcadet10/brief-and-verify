# Architecture

Brief & Verify is a static-first React application. All authored lessons, scenarios, scoring rules, and role adaptations ship with the site. The public version works without an account, server, API key, or network call after its assets load.

## Runtime shape

```text
Authored curriculum ──> React learning flows ──> browser state
         │                       │                    │
         └─ practice provider    ├─ storage adapter ──┘
                                └─ analytics adapter
```

The boundaries are deliberately small:

- `LearningAssistantProvider` starts a scenario, returns authored feedback, and advances a turn.
- `StorageAdapter<T>` reads, writes, and clears learner state.
- `LearningAnalyticsAdapter` records or lists learning events.

The built-in implementations are deterministic and local. A different implementation can be added without coupling curriculum pages to a specific vendor. Any networked implementation should add explicit consent, data minimization, retention rules, error handling, and an offline fallback.

## Adaptation rule

The initial six-question check-in produces one score per competency. The path sorts unfinished modules by status and current score; completed modules move to the end. Module checks and scenario choices update the relevant local signals. No demographic, personality, or ability inference is made.

## Measurement boundary

The product labels four evidence levels separately:

1. Comprehension in a short check.
2. Judgment in an authored simulation.
3. Self-reported transfer in a seven-day field test.
4. Durable behavior, which this application does not claim to measure.

This prevents completion or a quiz score from being presented as proof of workplace competence.
