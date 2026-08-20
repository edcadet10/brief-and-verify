# Contributing to Brief & Verify

Thank you for helping people practice sound AI judgment. Contributions to code, curriculum, research, accessibility, and documentation are welcome.

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md). For a question or early idea, start a [Discussion](https://github.com/edcadet10/brief-and-verify/discussions). For a defined change, use the [issue chooser](https://github.com/edcadet10/brief-and-verify/issues/new/choose) or open a pull request.

## Good first contributions

Choose a change small enough to explain and review in one sitting:

- **Curriculum:** clarify one explanation or improve one choice and its consequence in `src/data/modules.ts` or `src/data/scenarios.ts`.
- **Accessibility:** add a focused regression test in `src/test/accessibility.test.tsx` or `e2e/app.spec.ts` for a documented problem.
- **Research:** verify one claim against a primary source and update its `usedFor` note in `src/data/sources.ts`.
- **Documentation:** improve a setup instruction, architecture explanation, printable guide, or useful code comment.
- **Engineering:** strengthen import validation, a local adapter, responsive behavior, or deterministic test coverage.

Issues labeled [`good first issue`](https://github.com/edcadet10/brief-and-verify/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) include a bounded outcome and file pointers.

## Before a larger change

Open a curriculum proposal or feature request before changing the learning sequence, adding an audience, altering an adapter contract, or introducing a dependency. Early agreement on the learner need and evidence standard prevents avoidable rework.

The public build must remain:

- free to use without an account or paid API;
- deterministic and useful without a networked AI provider;
- model-neutral in its concepts and examples;
- safe for static deployment on GitHub Pages; and
- honest about what its learning signals can establish.

## Local setup

Use Node.js 22.12 or newer and npm 10 or newer.

```bash
git clone https://github.com/edcadet10/brief-and-verify.git
cd brief-and-verify
npm ci
npm run test:e2e:install
npm run dev
```

On a fresh Debian or Ubuntu environment, use `npx playwright install --with-deps chromium` instead of `npm run test:e2e:install` so required system libraries are installed too. The command may request administrator access.

Create a focused branch from an up-to-date `main` branch. Prefer names such as `fix/import-message` or `content/teacher-verification-example`.

## Make and verify the change

Run the local quality gate:

```bash
npm run check
npm run test:e2e
```

`npm run check` covers linting, unit/component tests, TypeScript compilation, and the production build. The browser suite covers the core journey, repeatable scenario behavior, responsive routes, landmarks, accessibility, and plain-language guardrails.

Add the smallest test that would fail without your change. For a visual change, check a narrow mobile viewport and a desktop viewport, keyboard navigation, visible focus, reduced motion, and zoom. Automated accessibility tests do not replace manual or assistive-technology review.

## Curriculum quality bar

New or revised learning material should:

1. Name the learner and the real decision they need to make.
2. Teach a durable principle rather than a tool-specific trick.
3. Include at least one strong response, one plausible partial response, and a repair opportunity.
4. Explain the consequence of each choice instead of only marking it right or wrong.
5. Keep scoring deterministic and use the existing `0`, `1`, and `2` choice scale.
6. Cite a primary or scholarly source when a factual claim or framework materially depends on it.
7. Use original language; do not paste restricted course, article, or product copy.
8. Use fictional, minimal examples with no real personal, health, student, customer, or confidential data.
9. Use everyday words and direct verbs in learner-facing text. Explain a necessary specialist term the first time it appears.
10. Keep sentences short enough to scan. As a practical check, consider splitting sentences longer than 25 words.
11. Counterbalance strongest answer positions. A learner should not be able to score well by repeatedly choosing the same letter.

When adding a source, describe exactly what it informed in `src/data/sources.ts`. A source can support a design choice without endorsing this project.

The plain-language standard follows [GOV.UK clear-language guidance](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/) and the [CDC Clear Communication Index](https://www.cdc.gov/ccindex/pdf/full-index-score-sheet.pdf). Exact source titles, licence names, and code terms may stay technical where accuracy requires it.

## Where things live

| Area | Primary files |
| --- | --- |
| Roles and check-in | `src/data/roles.ts`, `src/data/diagnostic.ts` |
| Modules and checks | `src/data/modules.ts` |
| Scenarios and scoring | `src/data/scenarios.ts`, `src/lib/providers/` |
| Guides and resources | `src/data/resourceGuides.ts`, `src/data/resources.ts` |
| Research map | `src/data/sources.ts` |
| Learner state | `src/context/LearnerContext.tsx`, `src/lib/storage/` |
| Measurement events | `src/lib/analytics/` |
| Browser journeys | `e2e/app.spec.ts` |
| Architecture | `docs/ARCHITECTURE.md` |

The adapter contracts are intentionally small. Read the [architecture note](docs/ARCHITECTURE.md) before changing them.

## Pull request checklist

A reviewer should be able to understand the learner or technical problem, inspect the change, and reproduce its verification. In the pull request:

- explain what changed and why;
- link the issue or discussion when one exists;
- list the commands and manual checks you ran;
- include before/after screenshots for a visible interface change;
- identify new claims and their sources;
- call out privacy, accessibility, or measurement implications; and
- keep unrelated cleanup out of the same change.

Maintainers review for scope, correctness, learner usefulness, evidence quality, accessibility, privacy, determinism, tests, and maintainability. A requested revision is part of collaborative review, not a rejection of the contributor.

## Licenses

By submitting a contribution, you agree that code contributions may be distributed under the [MIT License](LICENSE) and original curriculum contributions under [CC BY 4.0](CONTENT_LICENSE.md). You must have the right to submit the material and must identify content governed by a different compatible license.
