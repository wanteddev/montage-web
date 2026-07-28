# Montage Web Migration

A plugin that migrates consumer projects between major versions of Montage (Wanted Design
System for Web).

[English](./README.md) | [한국어](./README.ko.md)

## Installation

```bash
/plugin marketplace add wanteddev/montage-web
```

```bash
/plugin install montage-web-migration@montage-web
```

## Skills

### montage-v3-to-v4

Migrates a project from Montage v3 (`@wanteddev/wds*` 3.x) to v4 (`@montage-ui/*` 4.x).

Trigger it by asking, for example:

- "montage v4로 마이그레이션해줘"
- "wds 4.0으로 업그레이드해줘"
- "Migrate this project to @montage-ui 4"

What it does:

1. **Preflight** — migration state file first (a resume must not be misread as a fresh
   project), then version check, clean git tree, and target selection.
2. **Codemod phase** — runs the 6 v4 codemods **strictly in sequence, each exactly once**
   (`package-name-migration` → `semantic-token-migration` → `css-variable-migration` →
   `dom-identifier-migration` → `list-card-migration` → `form-control-migration`),
   orchestrated with the Workflow tool: sequential codemod execution with per-step
   verification and optional per-step commits, then parallel scans for the
   manual-migration worklist.
3. **Manual migrations** — theme token `var(--...)` arithmetic, package.json/config
   renames, semantic token follow-ups (foreground/surface reclassification, deleted
   accent tokens), CSS variable and DOM identifier leftovers (dynamically built names, files
   outside the transformed directories), Card/ListCard and FormControl follow-ups,
   Modal/TextField/TextArea/SegmentedControl/Select behavioral changes, ThemeProvider
   cookie storage.
4. **Verification** — leftover greps, install/typecheck/lint/build/tests, summary.

The codemods are order-sensitive and must not run twice (re-running
`form-control-migration` corrupts migrated code), so progress is tracked in
`.claude/montage-migration-v4.local.md` — interrupted migrations resume from the first
incomplete step and never repeat a completed one.
