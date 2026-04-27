---
name: sync-icons
description: Sync icons from the Figma file into `wds-icon` and open a PR by dispatching the `figma-icon-sync-code-connect.yml` GitHub Actions workflow. The workflow pulls the latest icon set from Figma, generates Code Connect bindings, and opens a PR against the branch you dispatched from. Use this skill whenever the user says "아이콘 업데이트해줘", "아이콘 싱크해줘", "Figma에서 아이콘 가져와줘", "sync icons", "update icons from Figma", "code connect publish", or otherwise indicates they want the icon set refreshed from the Figma source of truth.
---

# sync-icons

Triggers the `figma-icon-sync-code-connect.yml` workflow that does all the actual work — pulls icons from Figma, regenerates `wds-icon`, wires up Code Connect, and opens a PR. This skill just dispatches the workflow with the right inputs against the right branch.

## When to trigger

- "아이콘 업데이트해줘" / "아이콘 싱크해줘" / "Figma 아이콘 가져와줘"
- "code connect publish 해줘" / "code connect 갱신"
- "sync icons" / "update icons from figma"
- User mentions new icons added to the Figma library and wants them in the codebase

## What the workflow does (so you know what's about to happen)

You don't run any of this yourself — it's all in the workflow. But knowing the steps helps you set expectations for the user:

1. Pulls the icon set from the Figma file (uses `FIGMA_TOKEN` secret).
2. Runs `scripts/figma-icon.mjs` to regenerate `packages/wds-icon`.
3. Creates a branch named `feature/code-connect/<run_id>`, commits, pushes.
4. Opens a PR with that branch as the **head** and the **branch you dispatched from** as the **base**.
5. If `publish=true`, also publishes Code Connect mappings to Figma (so designers see the codebase ↔ Figma binding).

The PR title is auto-set to `feat(wds,wds-icon): icon figma sync and new code connect publish`.

## Workflow inputs

| Input     | Type   | Default  | Meaning                                                              |
| --------- | ------ | -------- | -------------------------------------------------------------------- |
| `publish` | choice | `'true'` | Whether to push Code Connect mappings up to Figma after the PR opens |

That's the only input. **If the user doesn't mention publishing, default to `true`** — that's the documented behavior. Only set `publish=false` if the user explicitly asks to skip the Code Connect publish step ("publish 빼고", "publish 하지마", "code connect는 다음에" etc).

## Workflow

### 1. Pick the dispatch branch (the future PR base)

**Almost always `main`.** Routine icon syncs are run from `main` so the resulting PR targets `main` and ships in the next regular release. Default to `main` and only deviate when the user explicitly says otherwise.

The exception is when icon work is bundled with other in-progress changes — e.g. dispatching from a major version branch like `feature/4.0.0` if breaking icon renames are part of the next major. This is rare; assume `main` unless told.

Confirm with the user before dispatching: **"`main` 기준으로 아이콘 싱크 PR 만들면 될까요? (대부분 main에서 실행합니다. 다른 브랜치 필요하면 알려주세요)"**

The branch must exist on the remote — verify with:

```bash
git ls-remote --exit-code --heads origin "<branch>" >/dev/null
```

If it doesn't exist, surface the error and stop.

### 2. Confirm the `publish` input

If the user explicitly opted out (`publish=false`), use that. Otherwise default to `publish=true` without re-asking — the user shouldn't have to confirm the default every time.

If you're unsure (e.g. user said "먼저 코드 변화만 보고 싶어"), ask once: **"Figma에 Code Connect 매핑도 publish 할까요? (기본값: 예)"**

### 3. Dispatch the workflow

```bash
gh workflow run figma-icon-sync-code-connect.yml \
  --ref <dispatch-branch> \
  -f publish=true
```

That's it. The workflow is responsible for the branch creation, commit, push, and PR. Don't try to do any of it yourself.

### 4. Surface progress

Print the latest run URL so the user can watch:

```bash
# Wait a couple seconds for the run to register, then:
gh run list --workflow=figma-icon-sync-code-connect.yml --limit 1 \
  --json databaseId,url,status,createdAt
```

Tell the user:

- The workflow is running.
- The PR will be opened **against `<dispatch-branch>`** when it finishes (~few minutes).
- If `publish=true`, Code Connect will be pushed to Figma after the PR is created.
- They can watch progress at the run URL.

Don't poll for completion unless the user asks — the workflow takes minutes, and the user can refresh the run page themselves.

## Release classification: icon adds are minor

When the auto-generated PR shows up, it should be milestoned as a **minor** version bump — adding icons is a non-breaking feature add, so it falls under `feat` in Conventional Commits and bumps the minor version.

The workflow titles the PR `feat(wds,wds-icon): icon figma sync and new code connect publish`, which `create-pr`'s bump-type detection will already classify as minor. But the workflow opens the PR via the `github-actions[bot]` and doesn't attach a milestone, so:

- After the workflow finishes, attach the next minor milestone (e.g. current `3.5.0` → `3.6.0`) to the PR. The `create-pr` skill's milestone logic explains how to compute and ensure the milestone exists.
- The only situation where it's _not_ minor: if the sync also removes or renames existing icons in a way that breaks consumers (i.e. the diff has icon deletions). That's a `feat!:` and bumps major — but it should also be on a major branch, not `main`. Surface the deletion to the user and confirm before touching the milestone.

## Edge cases

| Situation                                                 | Behavior                                                                                                                 |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| User on a non-`main` branch with uncommitted changes      | Doesn't matter — the workflow runs on the remote, not the local working tree. No need to commit/stash first.             |
| User asks "main이 아니라 내 브랜치 기준으로"              | Use the user's current branch as `--ref`. Verify it's pushed to origin first.                                            |
| User says "publish 하지 마" / "Figma에 안 올려도 돼"      | Pass `-f publish=false`. Mention that Code Connect bindings won't be reflected in Figma until a future publish.          |
| Workflow run fails to register / `gh workflow run` errors | Surface the error and stop — common cause is the branch not being pushed to origin yet, or the user lacking permissions. |
| Recent run already in progress                            | Mention it and ask if they want to wait or dispatch another. Multiple concurrent runs will produce duplicate PRs.        |

## Why these defaults

- **`publish=true` by default**: this is the documented default in the workflow itself — the whole point of running the sync is to keep Figma's Code Connect bindings in step with what the codebase advertises. Skipping publish is the unusual case (typically only when you want to inspect generated code first).
- **Default to dispatching from `main`**: routine icon adds are non-breaking and ship in the next minor release on `main`. Dispatching elsewhere is the exception, not the norm.
- **Icon adds are minor bumps**: adding icons is a `feat` in Conventional Commits → minor version bump. Only icon removals/renames promote it to `feat!:` / major, and those don't belong on `main` anyway.
- **Don't hand-do any of the git work**: the workflow's branch / commit / PR sequence is deliberately atomic and uses a bot identity. Replicating it locally just creates noise and parallel branches.
