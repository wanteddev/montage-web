---
name: create-pr
description: Create a GitHub pull request from the current branch. Handles uncommitted/unpushed changes by asking the user before committing, always self-assigns, attaches a semver release milestone derived from `lerna.json` (creating it if missing) for release-relevant PRs and skips the milestone for release-irrelevant PRs (docs-only / `.claude/` / root-meta changes), and enriches the PR description with Jira issue details when the branch name contains an issue ID like PROJ-123. Use this skill whenever the user says "PR 만들어줘", "PR 생성해줘", "PR 올려줘", "open a PR", "create a pull request", or signals they're ready to ship the current branch — even if they don't explicitly say "PR".
---

# create-pr

A workflow for opening a GitHub pull request from the current branch with sensible defaults: confirm-before-commit, push if needed, self-assign, and Jira-enriched description.

## When to trigger

- User says "PR 만들어줘", "PR 생성", "PR 올려줘", "open a PR", "create PR", "send it up for review", etc.
- User finishes implementation and asks "이제 뭐 하면 돼?" / "이제 올리면 돼?" — interpret as PR creation intent

## Core invariants

These are non-negotiable. Build the workflow around them.

1. **Self-assign is mandatory** — every PR must include `--assignee @me`. Unassigned PRs sit in review queues invisibly because reviewers filter by assignee.
2. **A release milestone is mandatory — _unless_ the PR has no release impact.** PRs that change shipped package code must be attached to a semver milestone (`<major>.<minor>.<patch>`) computed from `lerna.json`; the milestone is what release tooling and the changelog generator key off, and an unmilestoned package PR is invisible to the release. **Exception**: PRs whose entire diff is release-irrelevant (docs-only, `.claude/` environment files, root-level meta files like `AGENTS.md` / `CLAUDE.md`) do not produce a published package version and **must not** carry a milestone — attaching one would pollute the release notes with non-shipping changes. See step 8 for the classifier.
3. **Never commit without explicit user approval** — uncommitted changes might be intentional WIP, debug code, or someone else's work in progress.
4. **Never push to `main`/`master`** — abort and ask the user to switch to a feature branch.
5. **Never use `--no-verify`** to skip hooks. If a hook fails, surface the error and let the user decide.
6. **Never use `git add -A` / `git add .`** — stage files by name. Wildcards routinely sweep up `.env`, credentials, and stray build artifacts.
7. **Every commit you author must end with a `Co-Authored-By: Claude ...` trailer.** This is required by the top-level system instructions and is easy to forget when copying the heredoc template — surface it explicitly here. See step 3 for the exact format.

## Workflow

### 1. Probe the environment

Run these in parallel — they're independent:

```bash
git rev-parse --git-dir                                # confirm git repo
gh auth status                                         # confirm gh CLI auth
git rev-parse --abbrev-ref HEAD                        # current branch
git status --porcelain                                  # uncommitted changes
git log --oneline -10                                   # recent commit style
git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null  # upstream
```

If any precondition fails (not a repo, not authed, on `main`/`master`, branch has zero commits ahead of base), stop and explain — don't try to recover silently.

### 2. Check for an existing PR for this branch

```bash
gh pr view --json url,state,title 2>/dev/null
```

If one exists and is open, show the URL and ask whether the user wants to update its description, leave a comment, or push more commits. Don't create a duplicate.

### 3. Handle uncommitted changes

If `git status --porcelain` is non-empty:

1. Show the user a concise summary (file list with M/A/D/?? markers).
2. Ask explicitly: **"다음 변경사항을 모두 커밋하고 PR을 생성할까요?"** — list the files. Wait for an answer.
3. If the user says yes:
   - Run `git diff` and `git diff --cached` to understand what's changing.
   - Read recent commits (`git log --oneline -10`) to match the repo's style — this codebase uses Conventional Commits (`feat(scope): ...`, `fix(scope): ...`, `chore: ...`).
   - Draft a commit message that focuses on **why**, not **what**. One subject line, optional body.
   - Stage files **by name** (never `-A` / `.`). Skip anything that looks like a secret (`.env*`, `credentials*`, `*.pem`).
   - Commit with a heredoc to preserve formatting. **The trailing `Co-Authored-By:` trailer is mandatory** — it's required by the top-level system instructions and is easy to forget when copying this template. Put it as the last line, separated by a blank line so git's trailer parser picks it up. **Use the model you actually are right now** — read your own model name/version from the runtime environment (the system prompt surfaces it) and substitute it into `<your-model-name>` below. Do not copy a hardcoded model from this example.

     ```bash
     git commit -m "$(cat <<'EOF'
     feat(scope): short subject

     Optional body explaining why.

     Co-Authored-By: <your-model-name> <noreply@anthropic.com>
     EOF
     )"
     ```

   - If a pre-commit hook fails, fix the underlying issue and create a **new** commit. Never `--amend` to dodge the failure (the failed commit didn't happen, so amend would rewrite the previous one).

4. If the user says no, ask: "이미 커밋된 변경사항만으로 PR을 생성할까요, 아니면 중단할까요?"

### 4. Push if needed

- No upstream → `git push -u origin <branch>`
- Upstream exists but local is ahead → `git push`
- Local is behind upstream → surface the divergence and ask before doing anything; never `--force` without explicit user confirmation.

### 5. Extract Jira issue ID from branch name

Apply this regex to the current branch: `[A-Z][A-Z0-9]+-\d+`

The ideal branch pattern in this repo is `feature/<git-username>/<JIRA-ID>` (e.g. `feature/sh031224/PI-82494`). Other shapes still match: `feat/PROJ-123-add-thing`, `PROJ-123_fix_bug`, `bugfix/PROJ-123`. The recognized Jira project keys are `PI`, `FE`, `DP`, `DEF`, `LIVE`, `WRP` — see [workflow.md](../../references/workflow.md#recognized-jira-project-keys).

#### If a match is found

- **If the Atlassian MCP is available** (look for `mcp__plugin_atlassian_atlassian__getJiraIssue` in available tools), fetch the issue. Extract: summary, status, issue type, assignee, and the first paragraph of the description (skip if the description is empty or noisy).
- **If the MCP is unavailable or the fetch fails**, fall back to including just the bare ticket reference. Don't block the PR on Jira lookup failure.

#### If no match is found

Don't silently proceed. The repo's commit-msg hook warns on every commit when a `feature/*` branch lacks a Jira ID, and release notes lose context without a ticket link. Before opening the PR, surface this and recommend creating a Jira ticket first:

> "현재 브랜치(`<branch>`)에 Jira 이슈 ID가 없습니다. 이 repo는 `feature/<username>/<JIRA-ID>` 패턴이 표준이라, PR 열기 전에 Jira 티켓을 먼저 만드는 걸 추천드려요.
>
> 1. `atlassian:triage-issue` 스킬로 티켓을 만들거나, 직접 Jira에서 만든 뒤
> 2. 새 브랜치 `feature/<username>/<JIRA-ID>` 로 cherry-pick / rebase 해서 다시 시도
>
> 그래도 지금 PR을 그대로 진행할까요? (typo fix 같은 throwaway 변경이면 OK)"

Wait for the user's answer:

- **They want to create a ticket first** → stop, hand off to `atlassian:triage-issue` or let them do it manually. Don't try to rename the branch yourself; cherry-picking onto a freshly named branch is their call.
- **They confirm it's throwaway** → proceed without a Jira section in the body. Note in the body something like "_No Jira ticket — minor/throwaway change._" so reviewers understand the omission was deliberate.
- **They're on a non-`feature/*` branch shape** (e.g. `fix/...`, `docs/...`) where the hook doesn't warn → the recommendation is softer; mention it once but don't block.

### 6. Build the PR title

**The PR title must be Conventional Commits format** — `<type>(<scope>): <subject>` (or `<type>: <subject>` if no scope, `<type>!:` for breaking). This is non-negotiable: PRs are squash-merged here, so the PR title becomes the merged commit message, which lerna parses to compute the version bump and generate the changelog. A non-conventional title silently breaks both. `commitlint` enforces it on commits but **not** on PR titles, so this skill is the gate.

Allowed types (matching the existing repo history): `feat`, `fix`, `chore`, `docs`, `refactor`, `perf`, `test`, `style`, `build`, `ci`. Common scopes are package names (`wds`, `wds-engine`, `wds-icon`, `wds-mcp`, `ci`) — check `git log --oneline -20` to match what's in use.

How to derive the title:

1. **If the branch has a single commit** with a valid Conventional Commits subject, use that subject verbatim.
2. **If the branch has multiple commits**, summarize them into one Conventional Commits line. Type follows the same rules as the milestone bump: any `!` / `BREAKING CHANGE` → `<type>!:`, any `feat` → `feat:`, otherwise pick the dominant type.
3. **If the latest commit isn't conventional** (e.g. "wip", "fix typo"), derive from the branch name: `feat/PROJ-123-add-modal` → `feat: add modal`. Don't copy a non-conventional commit subject into the PR title — fix it.
4. Keep under 70 characters. Details belong in the body, not the title.

Validate the final title against the regex roughly as `^(feat|fix|chore|docs|refactor|perf|test|style|build|ci)(\([a-z0-9-]+\))?!?: .+$` before passing it to `gh`. If it doesn't match, fix it — don't ship a malformed title.

The Jira ID does **not** belong in the title (Conventional Commits has no slot for it and prefixing breaks the regex). Keep it in the body.

### 7. Build the PR body

Template:

```markdown
## Summary

- <bullet derived from commits / diff>
- <one bullet per logical change>

## Jira

[PROJ-123](https://your-domain.atlassian.net/browse/PROJ-123) — <issue summary>

- Status: <status>
- Type: <type>

<first paragraph of issue description, if useful>

## Test plan

- [ ] <derived from what changed — UI changes get a manual check, logic gets test coverage notes>
```

Drop the **Jira** section entirely if no ticket was found. Drop **Test plan** items if the change is trivial (typo fix, dep bump) — don't pad with filler checkboxes.

For the Summary, look at `git log <base>..HEAD --oneline` and the cumulative diff — not just the latest commit. Multi-commit branches need a unified summary.

### 8. Determine and ensure the release milestone

The PR **must** be attached to a semver milestone (`<major>.<minor>.<patch>`) — **unless** it has zero release impact, in which case it must _not_ carry one. Run the classifier first.

#### 8.0. Classify: release-relevant or not?

Inspect the cumulative diff on this branch:

```bash
BASE=$(gh pr view --json baseRefName -q .baseRefName 2>/dev/null \
  || gh repo view --json defaultBranchRef -q .defaultBranchRef.name)
git diff --name-only "origin/$BASE...HEAD"
```

The PR is **release-irrelevant** (skip the milestone entirely — do not run 8a–8e, and omit `--milestone` in step 9) when **every** changed path matches one of:

- `docs/**` (the docs site package — not published)
- `.claude/**` (Claude Code environment: settings, hooks, skills, references, scripts)
- Root meta files: `AGENTS.md`, `CLAUDE.md`, `README.md`, `.gitignore`, `.editorconfig`, `.prettierrc*`, `.eslintrc*` (and similar tooling configs that don't ship inside any package)

If **any** changed path falls outside that set — especially anything under `packages/<pkg>/src/**`, `packages/<pkg>/package.json`, or `lerna.json` — the PR _is_ release-relevant and must follow the normal milestone flow (8a–8e).

When you classify a PR as release-irrelevant, briefly say so to the user before creating it: "이 PR은 docs/.claude 변경만 있어서 배포 영향이 없으므로 마일스톤 없이 생성할게요." This lets them correct you if they actually wanted a release.

When in doubt — mixed diff, or a single suspicious file in `packages/**` — treat it as release-relevant and ask if it should be split.

If release-irrelevant, skip to step 9. Otherwise continue with 8a.

#### 8a. Read the current version

```bash
node -p "require('./lerna.json').version"   # or: cat lerna.json | jq -r .version
```

This returns something like `3.5.0`. If `lerna.json` is missing or the version is malformed, abort and tell the user — don't guess.

#### 8b. Decide the bump type

Inspect the commits on this branch (`git log <base>..HEAD --pretty=%s`) and apply Conventional Commits rules:

| Highest-impact commit on branch                           | Bump  |
| --------------------------------------------------------- | ----- |
| Any commit with `!` (e.g. `feat!:`) or `BREAKING CHANGE:` | major |
| Any `feat:` / `feat(scope):`                              | minor |
| Otherwise (`fix`, `perf`, `refactor`, `docs`, `chore`, …) | patch |

Use the **highest** bump any single commit triggers — one breaking change wins over ten fix commits.

If the bump type is genuinely ambiguous (mixed commit types where the impact isn't clear, or non-conventional messages), ask the user: **"이 PR을 patch / minor / major 중 어디로 릴리즈할까요? (현재 버전: 3.5.0 → patch=3.5.1, minor=3.6.0, major=4.0.0)"**

#### 8c. Compute the target version

From `<major>.<minor>.<patch>`:

- **patch** → `<major>.<minor>.<patch + 1>`
- **minor** → `<major>.<minor + 1>.0`
- **major** → `<major + 1>.0.0`

Examples (current version `3.5.0`): patch → `3.5.1`, minor → `3.6.0`, major → `4.0.0`.

#### 8d. Ensure the milestone exists on GitHub

```bash
OWNER_REPO=$(gh repo view --json owner,name -q '.owner.login + "/" + .name')

# List existing open milestones
gh api "repos/$OWNER_REPO/milestones?state=open" --jq '.[].title'
```

If the target version is **not** in that list, create it:

```bash
gh api -X POST "repos/$OWNER_REPO/milestones" -f title="3.6.0"
```

Don't create milestones speculatively for the other bump types — only the one this PR ships under.

#### 8e. Major bump → require the `feature/<version>` base branch

**This sub-step only runs when the bump type is `major`.** Skip it for patch/minor.

Major releases never merge straight into `main`. They live on a long-running branch named `feature/<major>.<minor>.<patch>` (e.g. `feature/4.0.0`) so breaking changes can pile up safely while `main` keeps shipping the current major. The PR's base branch must be that major branch.

Run these checks:

```bash
TARGET_VERSION="4.0.0"                                 # from step 8c
MAJOR_BRANCH="feature/$TARGET_VERSION"
CURRENT_BASE=$(gh pr view --json baseRefName -q .baseRefName 2>/dev/null \
  || gh repo view --json defaultBranchRef -q .defaultBranchRef.name)

# Does the major branch exist on the remote?
git ls-remote --exit-code --heads origin "$MAJOR_BRANCH" >/dev/null 2>&1
```

Then branch on the result:

1. **Major branch doesn't exist on the remote** → **stop and warn**:

   > "이 PR은 major 버전 bump (4.0.0) 으로 판단됐는데 `feature/4.0.0` 브랜치가 원격에 없습니다. 정말 major 작업이 맞나요?
   >
   > - 정말 major면: 먼저 `git checkout main && git pull && git checkout -b feature/4.0.0 && git push -u origin feature/4.0.0` 으로 major 브랜치를 만든 다음, 현재 브랜치를 `git rebase feature/4.0.0` 로 그 위에 다시 올리고 PR을 다시 시도해주세요.
   > - major가 아니라면 (실수로 `feat!:`/`BREAKING CHANGE:` 가 들어간 거면) 커밋 메시지를 정정해서 minor/patch 로 다시 판정되게 해주세요."

   Wait for the user — never auto-create the major branch yourself, since that's a release-management decision the user owns.

2. **Major branch exists, but the PR's base is `main`/default branch** → **stop and warn**:

   > "major bump (4.0.0) 인데 base 브랜치가 `main` 입니다. major 작업은 `feature/4.0.0` 위로 올라가야 합니다. 다음 둘 중 하나로 진행해주세요:
   >
   > - 정말 major: `git fetch origin && git rebase origin/feature/4.0.0` 후 다시 PR (또는 `gh pr create --base feature/4.0.0 ...`)
   > - 사실 major 아님: 커밋 메시지에서 `!` / `BREAKING CHANGE:` 를 제거해 minor/patch 로 다시 판정"

   Wait for confirmation. If the user confirms it's really major, prefer rebasing locally onto the major branch over just changing `--base` — rebasing surfaces conflicts with the in-progress major work _now_ instead of at merge time.

3. **Major branch exists AND base is already `feature/<version>`** → proceed to step 9, passing `--base feature/<version>` to `gh pr create`.

The point of this gate is to prevent breaking changes from leaking into the current major's release line. Don't skip it just because the user is in a hurry — a misrouted major PR is much more expensive to clean up after merge than the 30 seconds of friction here.

### 9. Create the PR

```bash
gh pr create \
  --title "..." \
  --body "$(cat <<'EOF'
...body here...
EOF
)" \
  --assignee @me \
  --milestone "3.6.0" \
  # for major bumps only — base must be the major branch:
  # --base "feature/4.0.0"
```

`--assignee @me` is always mandatory. `--milestone <version>` is mandatory for release-relevant PRs and **must be omitted** for release-irrelevant ones (the docs-only / `.claude/` / root-meta classification from step 8.0). For **major** bumps, also pass `--base feature/<version>` (the major branch you validated in step 8e); for patch/minor or release-irrelevant PRs, omit `--base` and let `gh` use the default.

If the branch is clearly still in progress (commit messages like "wip", "fixup", or the user mentioned it's not ready), pass `--draft` as well.

### 10. Report

Print the PR URL the gh command returned. That's it — no summary recap.

## Edge cases

| Situation                                                                                                               | Behavior                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Detached HEAD                                                                                                           | Abort. Ask the user to checkout a branch.                                                                                                             |
| On `main`/`master`                                                                                                      | Abort. Tell user to create a feature branch.                                                                                                          |
| Zero commits ahead of base                                                                                              | Abort. Nothing to PR.                                                                                                                                 |
| PR already open for branch                                                                                              | Show URL, ask what they want to do. Don't duplicate.                                                                                                  |
| Push rejected (non-fast-forward)                                                                                        | Surface error, ask before resolving. Never auto `--force`.                                                                                            |
| Pre-commit hook fails                                                                                                   | Fix root cause, create new commit. Never `--no-verify`.                                                                                               |
| Jira ticket inaccessible / MCP unavailable                                                                              | Include bare `[PROJ-123]` reference in body, don't block.                                                                                             |
| Branch has Jira-looking string but it's not really a ticket (e.g. `RFC-2119`)                                           | Try fetching; if 404, fall back gracefully.                                                                                                           |
| Multiple Jira IDs in branch                                                                                             | Use the first match; mention others in the body if relevant.                                                                                          |
| `lerna.json` missing or version unparseable                                                                             | Abort _only if the PR is release-relevant_. If the diff is docs-only / `.claude/` / root-meta, no milestone is needed so `lerna.json` doesn't matter. |
| Diff is entirely under `docs/`, `.claude/`, or root meta files (`AGENTS.md`, `CLAUDE.md`, `README.md`, tooling configs) | Skip the milestone (steps 8a–8e and `--milestone` in step 9). Tell the user "배포 영향이 없어 마일스톤 없이 생성합니다." before opening.              |
| Mixed diff — some release-relevant files plus some docs/`.claude/` files                                                | Treat as release-relevant (the package files determine the bump). Optionally suggest splitting into two PRs if the docs/.claude portion is unrelated. |
| Bump type ambiguous (mixed commit types, non-conventional messages)                                                     | Ask the user explicitly; don't guess.                                                                                                                 |
| Target milestone already exists                                                                                         | Reuse it. Don't create a duplicate.                                                                                                                   |
| Milestone create fails (permissions / race)                                                                             | Surface the error and stop — don't open the PR unmilestoned.                                                                                          |
| Major bump but `feature/<version>` branch missing on remote                                                             | Stop. Warn user, confirm "정말 major 작업?", recommend creating the major branch from `main` and rebasing. Never auto-create the major branch.        |
| Major bump but PR base is `main`/default                                                                                | Stop. Warn, confirm intent, recommend `git rebase origin/feature/<version>` (or fix commit messages if it's actually not major).                      |
| Major bump confirmed and base is correct                                                                                | Pass `--base feature/<version>` to `gh pr create`.                                                                                                    |

## After the PR is open: visual test failures

Visual regression snapshots are taken in GitHub Actions — local environments produce different pixels (font rendering, anti-aliasing) so you can't update them from your machine. If CI's visual test job fails on the PR:

1. Open the failing job's artifacts and confirm the rendering diff is intentional.
2. If it is, run the snapshot-update workflow against the PR branch:

   ```bash
   gh workflow run visual-test-update.yml --ref <branch-name>
   ```

   This regenerates snapshots inside CI and commits them back to the branch. Pull the new commit before pushing more changes.

3. If the diff is **not** intentional, don't update the snapshots — fix the underlying regression in the component/style.

See [workflow.md › Visual regression tests](../../references/workflow.md#visual-regression-tests) for the longer explanation.

## Why these defaults

- **Self-assign**: review queues filter by assignee — unassigned PRs are invisible.
- **Release milestone (when release-relevant)**: this repo's release/changelog tooling groups merged PRs by milestone. A release-relevant PR without one is silently excluded from the release notes, even if it lands on `main`. Conversely, attaching a milestone to a PR that ships nothing (docs-only, `.claude/` env changes, root meta) inflates the changelog with non-shipping entries — so those PRs intentionally _omit_ the milestone.
- **Major bumps require `feature/<version>` base branch**: breaking changes that land on `main` immediately go out to every consumer on the next patch — there's no way to stage them. The `feature/<version>` branch is the staging area where breaking changes accumulate until the major release is intentional. Letting one major PR slip onto `main` corrupts the entire current major's release line.
- **Confirm-before-commit**: working trees often hold WIP, debug logs, or local-only config the user doesn't want shipped.
- **Conventional Commits**: this monorepo uses them for changelog generation and release automation. Matching the existing style keeps tooling working — and is also what the milestone bump-type decision keys off.
- **Jira enrichment**: reviewers shouldn't have to context-switch to Jira to understand the "why". Inline summaries cut review time.
- **No `--force`, no `--no-verify`, no `git add -A`**: each shortcut has a real way to lose work or leak secrets. The friction is the feature.
