# Workflow

How work flows from a fresh branch to a merged PR. Read this once; the per-step skills (`create-pr`, `sync-icons`) handle the actual mechanics.

## Branch naming

The ideal pattern is **`feature/<git-username>/<JIRA-ID>`** — short, traceable, and the commit-msg hook can auto-stamp the Jira ID into every commit.

| Situation                                 | Pattern                                  | Example                          |
| ----------------------------------------- | ---------------------------------------- | -------------------------------- |
| Standard work with a Jira ticket          | `feature/<git-username>/<JIRA-ID>`       | `feature/sh031224/PI-82494`      |
| Standard work, no Jira (rare — see below) | `feature/<git-username>/<short-summary>` | `feature/sh031224/gradient-icon` |
| Major version (breaking changes)          | `feature/<x.y.z>`                        | `feature/4.0.0`                  |
| Documentation-only                        | `docs/<short-summary>`                   | `docs/v2`                        |

The `<short-summary>` is kebab-case, focused on the _what_, not the _how_.

### Recognized Jira project keys

The repo's commit-msg hook (`scripts/commit-msg.mjs`) detects these prefixes case-insensitively and auto-stamps the ID into commit subjects:

```
pi-… | fe-… | dp-… | def-… | live-… | wrp-…
```

If your ticket lives in another project, the hook won't auto-stamp it — but you can still put the ID in the branch and reference it in the PR body manually.

### No Jira ticket? Create one first.

When work starts without a ticket — a designer ad-hoc fix, a polish task, a refactor that wasn't planned — **the right move is to create a Jira ticket _before_ opening the branch**, not to skip Jira and use a summary slug.

Why:

- The commit-msg hook prints a warning on every commit when a `feature/*` branch has no Jira ID. That noise compounds.
- Release notes and changelog generation pull context from Jira links. PRs without tickets are harder to triage at release time.
- A 60-second ticket creation now is much cheaper than reconstructing context for a reviewer who asks "왜 이거 하는 거예요?" days later.

Use the `atlassian:triage-issue` skill (or just create the ticket in Jira directly) **before** branching. Then use the standard `feature/<git-username>/<JIRA-ID>` pattern.

The summary-only fallback (`feature/sh031224/gradient-icon`) is for genuinely throwaway work where ticket overhead exceeds the change cost — e.g. a typo fix, a one-line docs nudge. If you find yourself reaching for it on anything bigger, stop and create a ticket.

## Base branch rules

- **Default — `main`.** Patch and minor work targets `main`.
- **Major (breaking) — `feature/<x.y.z>`.** When the work introduces breaking changes (`feat!:` / `BREAKING CHANGE:`), the base must be the long-running major-version branch. Breaking changes must not land directly on `main` because there's no way to stage them — they'd ship to every consumer on the next patch.

The `create-pr` skill enforces this: a major bump with `main` as base or a missing `feature/<x.y.z>` branch will halt and ask for confirmation. See [the create-pr skill](../skills/create-pr/SKILL.md) for the full guard logic.

## Commit conventions

Conventional Commits are mandatory: `<type>(<scope>): <description>`. `commitlint` enforces this on every commit.

- **Allowed types** (matching repo history): `feat`, `fix`, `chore`, `docs`, `refactor`, `perf`, `test`, `style`, `build`, `ci`
- **Common scopes**: package names — `wds`, `wds-engine`, `wds-icon`, `wds-mcp`, `ci`. Match what `git log --oneline -20` shows.
- **Breaking changes**: append `!` after the type/scope (`feat!:`, `feat(wds)!:`) or include a `BREAKING CHANGE:` footer. Either form bumps the major version.
- **Body**: focus on the _why_, not the _what_ — the diff already shows the what.

The commit-msg hook (`scripts/commit-msg.mjs`) does extra work for you:

- If the branch name contains a Jira ID, it gets auto-prepended to the commit subject.
- A Jira link gets auto-added to the commit body.
- The author's git name is added to the body.

Don't fight the hook — let it run.

## PR conventions

Every PR must have:

1. **Conventional Commits title** — squash merge means the PR title becomes the merged commit, which lerna parses for version bumps and changelog. Non-conventional titles silently break release tooling.
2. **Self-assignment** (`--assignee @me`) — review queues filter by assignee.
3. **Release milestone** (`<major>.<minor>.<patch>`, computed from `lerna.json`) — release notes group merged PRs by milestone. No milestone → invisible to release.
4. **Jira link in the body** when a ticket exists — saves reviewers a context switch.

Mechanics (creating the PR, computing the milestone, auto-creating it if missing, validating the major-branch base) live in [the create-pr skill](../skills/create-pr/SKILL.md). Don't replicate them in your head — invoke the skill.

## Visual regression tests

Visual tests run with Playwright + Chromium and compare PNG snapshots committed to the repo. **Snapshots are taken in GitHub Actions, not on developer machines** — font rendering, sub-pixel anti-aliasing, and headless-browser quirks all differ between macOS/Linux/Windows, so a snapshot that looks fine locally will almost always diff against the CI baseline.

Consequence: **don't update visual snapshots locally and commit them.** Local diffs are noise. The CI environment is the source of truth.

When a PR's visual test fails:

1. Confirm the diff is intentional (the failing job uploads actual vs. expected images as artifacts — open them and verify the new rendering is what you want).
2. Trigger the **`visual-test-update.yml`** workflow against your PR branch:

   ```bash
   gh workflow run visual-test-update.yml --ref <your-branch>
   # or via the UI: Actions → "visual-test-update" → Run workflow → pick the branch
   ```

3. The workflow reruns the visual tests, regenerates the snapshots in the CI environment, and commits them back to your branch. Pull the new commit locally before continuing.
4. Re-run CI on the PR — visual tests should now pass.

If the diff is **not** intentional, don't update the snapshots — fix the underlying style/component regression instead.

## CI checks on PRs

The following run automatically on every pull request:

- Size-limit analysis (bundle size budgets)
- Unit tests (Vitest + jsdom)
- Visual regression tests (Playwright + Chromium)
- CommonJS compatibility checks
- Tree-shaking validation
- Lint and format
- commitlint on commit messages

A red CI is a real signal — investigate before requesting review.
