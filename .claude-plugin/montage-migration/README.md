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
2. **Codemod phase** — runs the 9 v4 codemods **strictly in sequence, each exactly once**
   (`package-name-migration` → `semantic-token-migration` → `css-variable-migration` →
   `dom-identifier-migration` → `list-card-migration` → `form-control-migration` →
   `push-badge-migration` → `status-migration` → `list-cell-variant-migration`),
   orchestrated with the Workflow tool: sequential codemod execution with per-step
   verification and optional per-step commits, then parallel scans for the
   manual-migration worklist.
3. **Manual migrations** — theme token `var(--...)` arithmetic, package.json/config
   renames, semantic token follow-ups (foreground/surface reclassification, deleted
   accent tokens), CSS variable and DOM identifier leftovers (dynamically built names, files
   outside the transformed directories), Card/ListCard and FormControl follow-ups,
   Modal/TextField/TextArea/SegmentedControl/Select/PushBadge/SearchField/FallbackView
   behavioral changes, `invalid`/`positive` → `status` leftovers, ListCell rework follow-ups
   (MenuItem/Option `fillWidth`, the default selected check icon, typography/DOM changes),
   ThemeProvider cookie storage, IconButton `disableInteraction` → `interactionEffect`
   (TopNavigation icon buttons now dim instead of drawing the interaction layer) and
   `interactionOverflow` for standalone icon buttons (icon buttons inside component slots,
   incl. the TabList / CategoryList `iconButton`, inherit the slot's `interactionOverflow`:
   keeping a numeric v3 `size` there reproduces v3, while deleting it — or a v3 icon button
   that never had a `size` (24px in v3) — adopts the slot preset (usually smaller); a per-screen choice,
   adding `size={24}` to keep v3 pixels), and TopNavigation /
   ModalNavigation changes (`ModalClose` → `ModalNavigationButton variant="close-button"`,
   `icon` / `text` → `icon-button` / `text-button` variants, ModalNavigation `display` →
   `emphasized`, modal navigation DOM identifiers), and Modal layout/spacing changes
   (ModalContainer `size="small"` → `medium`, ModalNavigation default variant by container,
   ModalContent `horizontalPadding` / `verticalPadding`, `--modal-content-margin` → `-x` / `-y`),
   the ContentBadge `outlined` background becoming transparent, overlay dismissal on the Radix
   layer stack (only the top layer closes, `<body>` `pointer-events: none` while a Modal / Alert /
   Picker is open, new `aria-modal` condition), and other DOM changes (ActionArea caption / compact
   wrappers, Avatar a11y and fallback, AvatarGroup capped at five, SectionMessage
   `leadingContent={null}`, Picker icons inside the trailing wrapper).
4. **Verification** — leftover greps, install/typecheck/lint/build/tests, summary.

The codemods are order-sensitive and every one of them is treated as run-once. Re-running
is not merely wasteful: `form-control-migration` always corrupts already-migrated code (its
FormField → FormControl → FormControlField swap renames the new root again),
`list-cell-variant-migration` silently renames hand-written v4 `variant="button"` to
`text-button`, and `list-card-migration` / `css-variable-migration` can corrupt code under
specific conditions (half-migrated or duplicate-specifier files; consumer-defined
`--wds-wds-*` variables). Progress is therefore tracked in
`.claude/montage-migration-v4.local.md` — interrupted migrations resume from the first
incomplete step and never repeat a completed one.
