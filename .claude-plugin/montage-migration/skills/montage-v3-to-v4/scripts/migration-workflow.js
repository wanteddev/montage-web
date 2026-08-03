export const meta = {
  name: 'montage-v3-to-v4-migration',
  description:
    'Run the 8 Montage v4 codemods strictly in sequence (never re-running a completed step), then scan for manual migration targets in parallel',
  whenToUse:
    'Invoked by the montage-v3-to-v4 skill to migrate a consumer repo from Montage (WDS) v3 to v4',
  phases: [
    { title: 'Codemods', detail: '8 v4 codemods, strictly sequential' },
    { title: 'Scan', detail: 'parallel read-only scans for manual migrations' },
  ],
}

// Required args (pass via Workflow tool `args`):
//   repoRoot:      absolute path of the repo being migrated
//   targets:       array of source directories to transform, e.g. ['src'] — plain paths,
//                  no globs (the codemod CLI takes one directory per invocation)
//   stateFile:     absolute path of the migration state file
//   referencesDir: absolute path of this skill's references/ directory
//   autoCommit:    boolean — commit after each completed step
//   codemodVersion: EXACT npm version (x.y.z) for @montage-ui/codemod, 4.x only, resolved
//                    at preflight (npm view '@montage-ui/codemod@^4' version --json → take
//                    the LAST array element) or read from the state file on resume. Dist-tags and ranges are rejected: the value
//                    is recorded in the state file, and anything non-exact would
//                    re-resolve on resume, breaking the same-build guarantee.
// Optional args:
//   completedSteps: step ids already marked "completed" in the state file (default []).
//                   Read the state file in preflight and pass the list so completed
//                   steps are skipped deterministically, without spawning an agent.
//   excludeFiles:   repo-relative paths of hand-migrated files the USER confirmed must be
//                   excluded from form-control-migration (default []). Populated on a
//                   re-run after step 6's (form-control-migration) precheck reported
//                   them; the step agent performs the move-out/move-back exclusion
//                   procedure around the codemod run.
//   allowOutOfOrderSteps: boolean (default false) — permit a completedSteps list that is
//                   not a prefix of the canonical order. Two paths produce one legitimately:
//                   the single-codemod path (explicit user confirmation), and a resume of an
//                   OLDER state file that predates a step inserted mid-order (the step's key
//                   was absent from the file — e.g. step ② semantic-token-migration — and
//                   resumes as pending behind later completed steps; SKILL.md preflight
//                   item 1 sanctions the flag for it). Any other gap means a STALE list,
//                   whose orchestrator-level skip would silently skip a step that never
//                   ran. Without this flag the run throws.
//   commitNoVerify: boolean (default false) — pass `--no-verify` on the per-step commits.
//                   The eight codemod commits are intentionally non-building, so pre-commit
//                   hooks (.husky/, core.hooksPath, lint-staged) fail on them. Preflight
//                   detects the hooks and agrees a policy with the user; this arg is how
//                   that agreement reaches the step agent. Only meaningful with
//                   autoCommit: true.

// The precheck/verify prose below mirrors the per-step sections in
// references/codemod-steps.md — these strings are what the step agent obeys, the reference
// is what a human edits, and both carry the corruption warnings. Update them together.
// Full list of surfaces to update with a step or M-section: SKILL.md → "State file format"
// → Consistency surfaces (canonical; do not re-enumerate it here or it drifts).
const CODEMOD_STEPS = [
  {
    id: 'package-name-migration',
    title: 'Package name migration (@wanteddev/* → @montage-ui/*)',
    surface: 'import sources: @wanteddev/wds* → @montage-ui/* (and @wanteddev/montage-mcp)',
    precheck: 'None.',
    verify:
      'grep for "@wanteddev/" in .ts/.tsx/.js/.jsx AND .mjs/.cjs/.mts/.cts inside the targets. Import declarations in .ts/.tsx/.js/.jsx must have zero hits, EXCEPT `@wanteddev/montage-mcp` — that is the codemod\'s own post-migration name for wds-mcp; leave it alone. Import declarations in .mjs/.cjs/.mts/.cts are legitimate leftovers (the CLI runs jscodeshift with --extensions=tsx,ts,jsx,js only) — fix them by hand NOW, they are not codemod failures. Remaining hits in `export ... from`, require(), dynamic import(), jest.mock()/vi.mock(), or `declare module` lines are NOT covered by the codemod — fix those by hand NOW as part of this step (they are code, unlike the config-file work of manual step M1). Hits in package.json/configs belong to manual step M1; leave them.',
  },
  {
    id: 'semantic-token-migration',
    title: 'Semantic token migration (v3 semantic color tokens → v4 property/intent/variant structure)',
    surface:
      'semantic.<old path> dot paths in JS/TS and --semantic-<old-dashed> variables in JS/TS + stylesheets',
    precheck: 'None. (The transform is idempotent and safe on hand-migrated v4 token code — the rename map is prefix-free and no new path matches an old key.)',
    verify:
      'Run the two step-2 verification greps from codemod-steps.md: the old dot-path pattern (semantic.(label|status|fill|material|inverse), semantic.interaction, semantic.primary., semantic.accent., semantic.background.(normal|elevated|transparent|status), semantic.line.(normal|solid|primary|status)) over the targets, and the old CSS-variable pattern (--semantic-… equivalents) INCLUDING .css/.scss/.sass/.less. Neither pattern matches any v4 name. Remaining hits should only be group-level references (theme.semantic.label passed/iterated whole), dynamically built names (`--semantic-${x}`, \'semantic.\' + path), or computed access (semantic[\'label\']) — all owned by manual step M9; report them in verifyFindings, do not fix them here. Then skim the diff for false positives: the transform is NOT import-gated, so a non-Montage object accessed as <x>.semantic.<old-path> or an unrelated string containing semantic.<old-path>/--semantic-<old-dashed> was rewritten too — revert genuinely unrelated rewrites in this step and note them. Expect surface.brand.primary at former primary.normal sites (including text/icon-color usages) and foreground.* tokens at former deleted-accent sites — the reclassification decisions belong to manual step M9; do NOT re-map them here. Dot-path token strings inside stylesheets are NOT converted (the stylesheet pass renames only the --semantic-* variable form) — flag any such hit for M9.',
  },
  {
    id: 'css-variable-migration',
    title: 'CSS variable migration (--wds-* prefix removal)',
    surface:
      '--wds-* custom property names in JS/TS + stylesheets (prefix dropped; the two grid ones → --grid-*-spacing)',
    precheck: 'None.',
    verify:
      'grep for "--wds-" in the targets including .css/.scss/.sass/.less — remaining hits should only be dynamically-built names (template interpolation / string concat), which belong to manual step M3. Then skim the diff for false positives: the rename is a blind prefix substitution, so consumer-defined --wds-* variables were also renamed (declarations and usages stay consistent inside the targets). Handle them like step 2 does: REVERT rewrites of variables the consumer clearly owns rather than leaving them silently renamed, and list every revert in verifyFindings as a file+name PAIR (repo-relative path plus the variable name) so the final verification can tell a deliberate survival from a leftover — a bare name would excuse the same name everywhere, including files where it really is an unmigrated Montage reference. For anything AMBIGUOUS (a consumer namespace that may or may not be Montage-derived) you cannot ask — a step agent has no user channel — so do NOT decide it yourself and do NOT commit: report status "failed" with those names in verifyFindings and stop. The orchestrator confirms them with the user and re-runs this step. No later scan looks for them, and after a commit the original names are gone from the tree. Also grep the diff for partially-rewritten camelCase custom properties (the pattern is lowercase-only, so --wds-myVar comes out as --myVar; use git diff | grep -E "^\\+.*--[a-z0-9-]*[A-Z]" — digits included, --wds-my2Var breaks the same way) and REPAIR them in this step — rename the declaration and every usage consistently; this step owns that fix, M3 is only a safety net. Expect intermediate --card-content-item-* names in the output — they are handled later by manual step M4; do NOT revert them.',
  },
  {
    id: 'dom-identifier-migration',
    title: 'DOM identifier migration (wds-component → data-component, region manager ids)',
    surface:
      'wds-component / wds-ignore-* / wds-region-manager identifier strings and attribute names in JS/TS + stylesheets',
    precheck: 'None.',
    verify:
      'grep for "wds-component", "wds-ignore-", "wds-region-manager" in the targets including stylesheets — remaining hits should only be dynamically-built strings (manual step M3). Skim the diff for false positives: replacement is a blind substring pass over any string literal (analytics event names, doc strings). REVERT rewrites of strings that are not Montage DOM identifiers — a renamed analytics event name is a silent production-behavior change — and list every revert in verifyFindings as a file+name PAIR (repo-relative path plus the string), never a bare name. For anything AMBIGUOUS you cannot ask (a step agent has no user channel): do NOT decide it yourself and do NOT commit — report status "failed" with those strings in verifyFindings and stop, so the orchestrator can confirm them with the user and re-run this step. No later scan covers them. Attribute VALUES like data-component="card-content" are intentionally unchanged — manual step M4 handles them; do NOT rename values here.',
  },
  {
    id: 'list-card-migration',
    title: 'Card / ListCard naming migration (CardList → ListCard, CardContent → CardBody/ListCardBody)',
    surface:
      'CardList* / CardContent* identifiers and their Props/Skeleton forms → ListCard* / CardBody* / CardRow*',
    precheck:
      'grep the targets for files importing BOTH an old Card name AND a new counterpart from @montage-ui/core or @wanteddev/wds, using the subset of the rename surface that can produce a duplicate specifier: old = every \\bCard(List|Content)-prefixed value or Props type (CardContent, CardContentItem, CardListContent, *Skeleton and *Props forms, CardList, CardListSkeleton); new = ListCard*, CardBody*, CardRow* and their Props. (The CardThumbnail*/CardTitle*/CardCaption* family renames only when a CardList/CardListSkeleton import is present, which \\bCard(List|Content) already matches, so the subset covers it transitively.) The global renames hit all of these unconditionally, so any old/new pair in one file produces a duplicate import specifier. Before reporting, inspect each flagged file: confirm BOTH the old and the new name resolve to an import from @montage-ui/core or @wanteddev/wds. A locally defined or third-party CardBody/CardRow, or a hit in a .md/.snap/.css file, is NOT a mixed file — drop it from the list and note it in verifyFindings. Report "failed" for BOTH surviving classes — files with a genuine montage old/new pair AND files importing the same old montage name via two specifiers — since each needs its own cleanup before the codemod may run. Apply the same false-positive triage to both, so a locally defined / third-party name or a .md/.snap/.css hit can never deadlock the phase (the orchestrator would otherwise re-run into the same abort forever); if nothing survives triage, proceed. Also flag files importing the SAME old name via two specifiers (plain + alias, e.g. `CardContent` and `CardContent as CC`; also the list-context names CardThumbnail*/CardTitle*/CardCaption* and Skeleton forms, where the leftover fails silently as a wrong-family name): the lookup checks @montage-ui/core before @wanteddev/wds and keeps only the last specifier in file order within the winning source, leaving the other one and its usages untouched, and a re-run mis-renames the leftovers — such files must be simplified to a single specifier first.',
    verify:
      'grep -E "\\bCard(List|Content)" over the targets — expect zero hits (prefix pattern: \\bCardContent\\b would miss CardContentProps/CardContentItemSkeleton leftovers; the prefix form matches no new name, ListCard* included). Remaining hits live in gate-skipped files (namespace imports, re-exports, deep/subpath imports — the codemod only transforms files importing from exactly @montage-ui/core or @wanteddev/wds) or duplicate-specifier files the pre-check missed (see codemod-steps.md step 5) — no M-section covers these gate-skipped hits INSIDE the targets (M4/M5 own the out-of-target ones); fix them by hand NOW as part of this step, never by re-running the codemod, but first confirm each hit actually comes from a montage source: a same-named identifier defined locally or imported from another library is NOT a migration leftover, leave it alone. Also grep for non-JSX identifier references (e.g. component={CardBody}) in files that render ListCard; report them in verifyFindings for manual step M4 review.',
  },
  {
    id: 'form-control-migration',
    title: 'Form Control naming migration (FormField → FormControl → FormControlField swap)',
    surface:
      'FormField* / FormLabel / FormMessage / FormErrorMessage identifiers → FormControl* (and the old FormControl slot → FormControlField)',
    precheck:
      'THIS CODEMOD CORRUPTS ALREADY-MIGRATED CODE. Find files referencing FormControl or FormControlProps WITHOUT also referencing FormField/FormFieldProps — two file-level greps, `\\bFormControl(Props)?\\b` minus `\\bFormField(Props)?\\b`, and diff the file lists (a single-line import-statement grep misses multi-line imports; the (Props)? alternates matter — `\\bFormControl\\b` alone misses a type-only FormControlProps import, which the codemod still corrupts to FormControlFieldProps; see the "Step 6 — form-control-migration" pre-check in the codemod-steps.md reference next to manual-migrations.md). Then run the SECOND pre-check from the same section — intersect (comm -12) files matching the new sub-component names `\\bFormControl(Field|Label|Message|NegativeMessage|PositiveMessage|MessageAccessory)` with files matching `\\bFormField(Props)?\\b`: a pure v3 file never references the new names, so every hit is mixed — half-migrated code must be reconciled to one API first; FormField appearing only in comments/strings means the file is hand-migrated and needs exclusion. Inspect each: if the file already uses the NEW v4 API (root <FormControl> wrapping <FormControlField>, imports ANY FormControl* sub-component — FormControlField, FormControlLabel, FormControlMessage, FormControlNegativeMessage, FormControlPositiveMessage, FormControlMessageAccessory — or imports only the FormControlProps type with no JSX at all), it was hand-migrated and must be excluded via the move-out/move-back procedure (codemod-steps.md). For files already listed in the user-confirmed excluded-files list: reconcile rather than blanket-proceed — every file this precheck judges HAND-MIGRATED must appear in the supplied list, and every supplied path must exist on disk; report "failed" on either mismatch (a subset list silently under-excludes, a stale path silently un-excludes). A file the greps flagged but that you confirmed is still pure v3 (only the OLD inner \`FormControl\` slot, no new \`FormControl*\` sub-component, no type-only \`FormControlProps\`) is expected to be ABSENT from the list — that is not a mismatch; note it in verifyFindings and let the codemod transform it. Any hand-migrated file NOT in that list: report "failed" with the file list so the orchestrator can confirm the exclusions with the user and re-run the workflow with excludeFiles set. A v3 file importing only the old FormControl slot (no other Form* imports, <FormControl> used inside another file\'s FormField) is safe.',
    verify:
      'grep -E "\\bForm(Field|Label|Message|ErrorMessage)" over the targets — expect zero hits (prefix pattern: \\bFormField\\b would miss FormFieldProps leftovers; the prefix form matches no FormControl* name). Remaining hits live in gate-skipped files (namespace imports like M.FormField, re-exports, subpath imports) — no M-section covers these gate-skipped hits INSIDE the targets (M4/M5 own the out-of-target ones); fix them by hand NOW as part of this step, WITHOUT re-running the codemod, but first confirm each hit actually comes from a montage source: a same-named identifier defined locally or imported from another library is NOT a migration leftover, leave it alone. NOTE: this grep can never emit a FormControl hit (\\bForm has no word boundary inside FormControlMessage), so never treat "FormControl is expected" as a reason to dismiss something it reported. A FormControl occurrence you find by other means is either the correct new root or an old inner-slot usage in a gate-skipped file — see the namespace/subpath inspection below. NEVER re-run this codemod over either. Hits inside the user-confirmed excluded files are EXPECTED too — those files are hand-migrated, so their Form* mentions are comments, strings, or deliberate back-compat type aliases; report them in verifyFindings and NEVER edit an excluded file. Residual the grep cannot see: in gate-skipped files (namespace/subpath imports) an OLD inner-slot FormControl survives under the same literal name but means the v4 field slot — additionally inspect namespace imports of montage sources (import * as X from @montage-ui/core or @wanteddev/wds) and subpath imports for .FormControl member usages, and rename true inner-slot usages to FormControlField by hand.',
  },
  {
    id: 'push-badge-migration',
    title: 'PushBadge variant/count migration (variant="number"|"new" → "text", count → text)',
    surface:
      'PushBadge JSX props: variant="number"|"new" → variant="text", count → text (variant="new" also gains text="N")',
    precheck:
      'None. (Idempotent — the first run exhausts everything convertible, and the shapes it deliberately skips are skipped identically on a second run: an element carrying BOTH count and text keeps its count, and a non-literal variant={expr} keeps its value. So a re-run is a no-op, but NOT because count is gone from the tree — the verify grep can still legitimately report those leftovers. It is still run-once by the state file.)',
    verify:
      'Run `grep -rnE \'PushBadge[^>]*(count=|variant="(new|number)")\' <targets>` — SINGLE-quoted so the pattern\'s own double quotes reach grep; the double-quoted form would need \\" and a copied \\" is a literal backslash-quote in ERE, matching nothing. Expect zero hits. This is a LINE-based grep and the transform is AST-based, so a clean result is not proof of coverage: multi-line JSX props (`<PushBadge\\n  variant="number"\\n  count={n}\\n/>`) never match it, yet the transform DID migrate them — do not "fix" the diff to satisfy the grep. Real hits come from three places, none of which is a reason to re-run the codemod: (a) gate-skipped files (namespace imports like M.PushBadge, re-exports, deep/subpath imports — the codemod only transforms files importing from exactly @montage-ui/core or @wanteddev/wds); no M-section covers in-target hits of this class, so fix them by hand NOW against the rename table (variant="number" count={n} → variant="text" text={n}; variant="new" → variant="text" text="N"), but first confirm the identifier really comes from a montage source — a locally defined or third-party PushBadge is NOT a migration leftover; (b) elements carrying BOTH count and text (half-hand-migrated) — the transform skips these deliberately to avoid a duplicate attribute; report them in verifyFindings for manual step M13, do not guess which prop wins; (c) non-literal variant (variant={expr}) that the transform could not map — its count WAS renamed to text (always correct), but the variant value itself is M13\'s; report it. Also report any `{...spread}` on a PushBadge and any type extending PushBadgeProps that re-declares `count` — both are invisible to the transform and belong to M13. Do NOT map variant="number" to variant="max-count" anywhere: max-count clamps numeric text at maxCount (default 99), which "number" never did, so it changes what renders — that adoption is M13\'s decision.',
  },
  {
    id: 'status-migration',
    title: 'invalid/positive → status migration (TextField, TextArea, Select*, *Picker, Checkbox family, framedStyle)',
    surface:
      'invalid → status="negative" on TextField/TextArea/Select/SelectMultiple/DatePicker/DateRangePicker/TimePicker, plus positive → status="positive" on TextField ONLY; invalid → aria-invalid on Checkbox/Radio/CheckMark/RoundCheckbox; framedStyle({ invalid: true }) → framedStyle({ status: \'negative\' }), and the shorthand framedStyle({ invalid }) → framedStyle({ status: invalid ? \'negative\' : \'normal\' }) (NOT a bare rename — status takes a string)',
    precheck:
      'None. (Idempotent — the first run removes every invalid/positive it can see, and the transform never treats status as a rename source (it only checks whether one is already there so it never writes a duplicate attribute), so a re-run is a no-op. The one shape it skips, an element carrying BOTH status and invalid (half-hand-migrated), is skipped identically on a second run and belongs to M16. It is still run-once by the state file.)',
    verify:
      'Run `grep -rnE \'<([[:alnum:]_$]+\.)?(TextField|TextArea|Select|SelectMultiple|DatePicker|DateRangePicker|TimePicker|Checkbox|Radio|CheckMark|RoundCheckbox)[^>]*[[:space:]](invalid|positive)[=/ >]\' <targets>` — SINGLE-quoted so the pattern reaches grep intact, and the [[:space:]] before the alternation is REQUIRED: it forces ATTRIBUTE position, which is what keeps this transform\'s own `aria-invalid` output and its `status={invalid ? ...}` fold out of the results (a weaker [^-[:alnum:]_] guard does NOT, because `{` satisfies it). Expect zero hits EXCEPT class (b) below (the transform\'s own fold output) — this is not a plain zero criterion. This is a LINE-based grep and the transform is AST-based, so a clean result is not proof of coverage: multi-line JSX props never match it, yet the transform DID migrate them — do not "fix" the diff to satisfy the grep. Real hits come from three places, none of which is a reason to re-run the codemod: (a) gate-skipped files (namespace imports like M.TextField, re-exports, deep/subpath imports — the codemod only transforms files importing from exactly @montage-ui/core or @wanteddev/wds); no M-section covers in-target hits of this class, so fix them by hand NOW against the surface above, but first confirm the identifier really comes from a montage source; (b) the transform\'s OWN fold output, whenever the folded expression mentions a bare invalid/positive anywhere but immediately after `{` (status={hasError || invalid ? ...}, status={inv ? "negative" : positive ? ...}) — correct v4 code, NEVER edit it and never count it against the zero criterion; (c) elements carrying BOTH status and invalid as two separate attributes (half-hand-migrated) — report for M16, and check the shape first: a lone status= whose expression mentions invalid is class (b), not this. Also report every TextField the transform folded from BOTH invalid AND positive (whose output shape depends on which prop was literal — a literal invalid short-circuits to a bare status="negative" with no textual trace, invalid={inv} positive gives a single ternary, and only both-dynamic gives a nested one): v3 rendered the negative border AND the positive icon together, v4 cannot, so the icon is gone — a real behavior change for M16 to confirm, not a diff to revert. Also report any {...spread} onto one of these components and any type extending TextFieldProps that re-declares invalid/positive — both are invisible to the transform AND to this grep, and belong to M16 — the typecheck will not find them either, since a TextFieldProps & { invalid?: boolean } intersection is valid and JSX spreads are not excess-property-checked. framedStyle called with a variable instead of an inline object literal keeps its invalid key silently and is M16\'s too.',
  },
]

// Kept in sync with the M-sections in references/manual-migrations.md and STATE_FILE_TEMPLATE
// below — see SKILL.md → "State file format" → Consistency surfaces for the canonical list.
const MANUAL_SCAN_SECTIONS = [
  { id: 'M1', title: 'Package references outside import declarations' },
  { id: 'M2', title: 'Theme tokens now return var(--...) strings (JS arithmetic breakage)' },
  { id: 'M3', title: 'CSS variable / DOM identifier leftovers (dynamic names, out-of-target files such as E2E specs and snapshots, camelCase safety net)' },
  { id: 'M4', title: 'Card / ListCard follow-ups (non-JSX refs, cross-file context, data-component values, old Card names outside the targets)' },
  { id: 'M5', title: 'FormControl follow-ups (message typography variant/weight, old Form names outside the targets)' },
  { id: 'M6', title: 'Modal bottom sheet behavior change (onVisibilityChange removal, peekHeight)' },
  {
    id: 'M7',
    title:
      'TextField changes (size, TextFieldButton variant removed, TextFieldContent text-button variant removed, wrapper DOM moved to the root)',
  },
  {
    id: 'M8',
    title:
      'TextArea changes (TextAreaContent variants, characterCounter → FormControlMessageAccessory, size)',
  },
  {
    id: 'M9',
    title:
      'Semantic token follow-ups (primary.normal foreground usage, deleted accent tokens, group refs/root aliases, dynamic names, stylesheet dot-path strings, old tokens outside the transformed directories — run the step-2 greps repo-wide)',
  },
  {
    id: 'M10',
    title:
      'ThemeProvider cookie storage (storageKey → cookie.key, direct next-themes usage, cookie.domain for subdomain sharing)',
  },
  {
    id: 'M11',
    title:
      'SegmentedControl changes (variant removed incl. outlined, leadingContent → leadingIcon, trailingContent removed, iconOnly for icon-only usages)',
  },
  {
    id: 'M12',
    title:
      'Select / SelectMultiple changes (size, SelectContent variants removed + default text → icon, SelectRenderChip for render chips, invalid icon removed, field DOM restructured)',
  },
  {
    id: 'M13',
    title:
      'PushBadge changes (non-literal variant left by step ⑦, count via spread/PushBadgeProps, count+text on one element, max-count adoption, push-badge-text role removed, invisible keeps text in the DOM, dot/line-height sizing)',
  },
  {
    id: 'M14',
    title:
      'SearchField changes (size values shifted medium→large / small→medium — order-sensitive hand rename, old medium stays type-valid; variant added; readOnly visual state removed — attribute stays type-valid; DOM depth +1 via search-field-wrapper)',
  },
  {
    id: 'M15',
    title:
      'FallbackView changes (FallbackViewButton → FallbackViewActionAreaButton wrapped in FallbackViewActionArea with a layout variant — the rename alone compiles and only breaks the layout at 2+ buttons; FallbackViewImage deprecated — stays type-valid; FallbackViewContent lost its unconditional vertical padding; fallback-view-button data-component renamed)',
  },
  {
    id: 'M16',
    title:
      'invalid/positive → status leftovers (props reaching a field via spread or a props object, TextField that set BOTH — v4 status is exclusive so the positive icon is lost, picker auto-promotion to negative in uncontrolled mode that status="normal" cannot suppress, wrapper types re-declaring invalid, framedStyle called with a variable)',
  },
]

const STEP_RESULT_SCHEMA = {
  type: 'object',
  required: ['step', 'status', 'filesChanged', 'committed', 'verifyFindings'],
  properties: {
    step: { type: 'string' },
    status: { type: 'string', enum: ['completed', 'skipped', 'failed'] },
    filesChanged: { type: 'number' },
    committed: { type: 'boolean' },
    commitHash: { type: 'string' },
    verifyFindings: {
      type: 'array',
      items: { type: 'string' },
      description: 'Leftover patterns or anomalies found by the post-step verification greps',
    },
    error: { type: 'string' },
  },
}

const SCAN_RESULT_SCHEMA = {
  type: 'object',
  required: ['section', 'hits', 'summary'],
  properties: {
    section: { type: 'string' },
    summary: { type: 'string' },
    hits: {
      type: 'array',
      items: {
        type: 'object',
        required: ['file', 'line', 'snippet', 'note'],
        properties: {
          file: { type: 'string' },
          line: { type: 'number' },
          snippet: { type: 'string' },
          note: {
            type: 'string',
            description:
              'Assessment: what fix this occurrence needs, or why it is a false positive',
          },
        },
      },
    },
  },
}

const codemodVersion = args.codemodVersion
if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(String(codemodVersion))) {
  throw new Error(
    `codemodVersion must be an exact x.y.z version (got ${JSON.stringify(codemodVersion)}) — resolve at preflight with \`npm view '@montage-ui/codemod@^4' version --json\` and take the LAST element of the returned array — the unscoped \`npm view @montage-ui/codemod version\` returns the \`latest\` dist-tag (wrong major once 5.x ships) and the un-jsonned range form prints one \`pkg@x.y.z 'x.y.z'\` line PER matching version — or read the state file's recorded value on resume`,
  )
}
if (Number(String(codemodVersion).split('.')[0]) !== 4) {
  throw new Error(
    `codemodVersion ${codemodVersion} is outside the 4.x line this skill covers — the v3→v4 transforms ship in @montage-ui/codemod 4.x (a 3.x CLI rejects every transform name with "Invalid transform choice"; a 5.x CLI carries no guarantee these transform names still exist or behave identically). Resolve with \`npm view '@montage-ui/codemod@^4' version --json\` at preflight and take the LAST array element — the un-jsonned range form prints one line PER matching 4.x version`,
  )
}
if (args.commitNoVerify !== undefined && typeof args.commitNoVerify !== 'boolean') {
  throw new Error(
    `commitNoVerify must be a boolean (got ${JSON.stringify(args.commitNoVerify)}) — it carries the preflight agreement on pre-commit hooks into the per-step commits`,
  )
}
const commitNoVerify = args.commitNoVerify === true
if (!Array.isArray(args.targets) || args.targets.length === 0) {
  throw new Error('targets must be a non-empty array of directory paths')
}
for (const t of args.targets) {
  if (/[*?{}[\]]/.test(String(t))) {
    throw new Error(
      `target ${JSON.stringify(t)} contains glob metacharacters — the codemod CLI does not expand globs (it silently uses only the first path); pass plain directory paths`,
    )
  }
}
// Canonicalize targets BEFORE the disjointness check: 'src', './src', 'src/', and
// '<repoRoot>/src' are the same tree, and a duplicate spelling would run every codemod
// twice over it — the same run-once corruption path as a nested target. Workflow scripts
// have no path module, so normalize by string.
const canonicalTargets = (() => {
  const repoRootNormalized = String(args.repoRoot || '').replace(/\/+$/, '')
  const seen = new Map()

  for (const raw of args.targets) {
    let t = String(raw).replace(/\/{2,}/g, '/').replace(/\/+$/, '')

    if (t.split('/').includes('..')) {
      throw new Error(
        `target ${JSON.stringify(raw)} contains a ".." segment — it may point outside the migrated tree; pass a plain path inside the repo`,
      )
    }

    // Collapse interior '/./' segments and repeated './' prefixes BEFORE the duplicate
    // check — 'src', './src', '././src', and 'src/./sub' vs 'src/sub' must all land on
    // one spelling, or a duplicate pair slips past and every codemod runs twice over it.
    while (t.includes('/./')) t = t.replace(/\/\.\//g, '/')
    t = t.replace(/\/\.$/, '')
    while (t.startsWith('./')) t = t.slice(2)

    if (repoRootNormalized && (t === repoRootNormalized || t.startsWith(repoRootNormalized + '/'))) {
      t = t.slice(repoRootNormalized.length + 1)
    }

    if (t === '' || t === '.') {
      throw new Error(
        `target ${JSON.stringify(raw)} resolves to the repo root ('.') — SKILL.md preflight item 4 forbids '.' as a target: it would run every codemod over the ENTIRE repo, build output and fixtures included; pass the specific source/stylesheet directories (or the root-level stylesheet's own path) instead`,
      )
    }

    // Build output / dependency directories, at ANY segment. This is the second layer:
    // preflight's discovery filter is the first, and it has failed before — written as
    // `/(node_modules|dist|…)/` it required a slash BEFORE the name, so under the ugrep that
    // Claude Code shadows `grep` with (prefix-less paths) every repo-root-level `dist/`,
    // `build/`, `node_modules/` … passed straight through into the target list. The CLI does
    // not save you either: cli.ts's collectStyleFiles consults IGNORED_DIRECTORIES only for
    // directories met while RECURSING, never for the path handed to it, and that set is just
    // {node_modules, .next, dist} — so a `dist/assets` target's generated CSS gets rewritten.
    const BUILD_OUTPUT_SEGMENTS = new Set([
      'node_modules',
      'dist',
      'build',
      'out',
      'coverage',
      '.next',
      '.nuxt',
      '.output',
      '.turbo',
      '.svelte-kit',
      'storybook-static',
    ])
    const offendingSegment = t.split('/').find((seg) => BUILD_OUTPUT_SEGMENTS.has(seg))
    if (offendingSegment !== undefined) {
      throw new Error(
        `target ${JSON.stringify(raw)} contains the build-output/dependency segment ${JSON.stringify(offendingSegment)} — SKILL.md preflight item 4 forbids these ("Never make build output a target"). The codemod CLI's ignore list is consulted only for directories met while recursing, never for the path you pass, so this target's generated stylesheets WOULD be rewritten. If preflight's stylesheet-discovery command produced this path, its exclusion filter did not fire — re-run that command with the --exclude-dir flags and the anchored (^|\\./|/) filter, and pass only real source directories`,
      )
    }

    if (t.startsWith('/') || /^[A-Za-z]:[\\/]/.test(t)) {
      throw new Error(
        `target ${JSON.stringify(raw)} resolves outside repoRoot ${JSON.stringify(args.repoRoot)} — every codemod must run inside the migrated repo, or a failed step cannot be restored with \`git -C <repoRoot> checkout\` and the tree is left half-transformed (the corruption path)`,
      )
    }

    const previous = seen.get(t)
    if (previous !== undefined) {
      throw new Error(
        `duplicate targets point at the same tree — ${JSON.stringify(previous)} and ${JSON.stringify(raw)} both resolve to ${JSON.stringify(t)}, so each codemod would run twice over it (the run-once corruption path); list each directory exactly once`,
      )
    }
    seen.set(t, raw)
  }

  return [...seen.keys()]
})()

for (const a of canonicalTargets) {
  for (const b of canonicalTargets) {
    // Nested targets make every codemod run twice over the nested subtree — the exact
    // run-once corruption path (form-control-migration would double-swap there).
    if (a !== b && (b + '/').startsWith(a === '.' ? '' : a + '/')) {
      throw new Error(
        `targets must be disjoint directories — ${JSON.stringify(b)} is nested inside ${JSON.stringify(a)}, so each codemod would run twice over the nested subtree (the run-once corruption path); keep only the outer directory`,
      )
    }
  }
}
if (typeof args.autoCommit !== 'boolean') {
  throw new Error('autoCommit must be a boolean')
}
for (const key of ['repoRoot', 'stateFile', 'referencesDir']) {
  if (typeof args[key] !== 'string' || !/^(\/|[A-Za-z]:[\\/])/.test(args[key])) {
    throw new Error(`${key} must be an absolute path (got ${JSON.stringify(args[key])})`)
  }
}
const excludeFilesInput = args.excludeFiles || []
if (!Array.isArray(excludeFilesInput)) {
  throw new Error('excludeFiles must be an array of repo-relative paths')
}
for (const f of excludeFilesInput) {
  if (typeof f !== 'string' || f.startsWith('/') || /^[A-Za-z]:[\\/]/.test(f)) {
    throw new Error(
      `excludeFiles entry ${JSON.stringify(f)} must be a repo-relative path — the move-out/move-back procedure runs from the repo root, and an absolute path would be restored to the wrong location`,
    )
  }
  if (String(f).split('/').includes('..')) {
    throw new Error(
      `excludeFiles entry ${JSON.stringify(f)} contains a ".." segment — it points outside the migrated tree, and the move-out/move-back procedure would restore it to the wrong location`,
    )
  }
}

// Canonical targets, never args.targets: the raw list may carry duplicate spellings of one
// tree, and the step agents must receive the same list the disjointness check validated.
const targets = JSON.stringify(canonicalTargets)
const excludeFilesJson = JSON.stringify(excludeFilesInput)

// Every `git -C <repoRoot>` in the step prompts is a command the agent copies verbatim —
// a repo path containing a space (or any shell metacharacter) breaks all of them unless
// the interpolation ships pre-quoted. Single-quote POSIX-style; embedded quotes escaped.
const shq = (p) => `'${String(p).replace(/'/g, `'\\''`)}'`
const repoRootSh = shq(args.repoRoot)
// Same treatment for the targets: the step agent pastes these into npx/checkout/pathspec
// positions, and a double-quoted interpolation would still let `$()`/backticks expand.
// One token per line, NEVER JSON.stringify — JSON re-escapes `"` and `\`, so a pasted
// token would no longer be the shell-quoted path. No list-marker prefix either: a `- `
// pasted along with the token becomes a separate argument.
const targetsSh = canonicalTargets.map(shq).join('\n')

// Kept in sync with the template in SKILL.md ("State file format") and MANUAL_SCAN_SECTIONS
// above — see that section's Consistency surfaces list for every surface to update.
const STATE_FILE_TEMPLATE = `---
migration: montage-v3-to-v4
targets:
${canonicalTargets.map((t) => '  - ' + t).join('\n')}
autoCommit: ${args.autoCommit}
codemodVersion: ${codemodVersion}
excludeFiles:${excludeFilesInput.length ? '\n' + excludeFilesInput.map((f) => '  - ' + f).join('\n') : ' []'}
revertedNames: [] # filled in by steps ③/④ as \`- file: <repo-relative path>\` / \`  name: <reverted name>\` pairs
steps:
  package-name-migration: pending
  semantic-token-migration: pending
  css-variable-migration: pending
  dom-identifier-migration: pending
  list-card-migration: pending
  form-control-migration: pending
  push-badge-migration: pending
  status-migration: pending
manual:
  M1: pending
  M2: pending
  M3: pending
  M4: pending
  M5: pending
  M6: pending
  M7: pending
  M8: pending
  M9: pending
  M10: pending
  M11: pending
  M12: pending
  M13: pending
  M14: pending
  M15: pending
  M16: pending
---`

if (args.completedSteps !== undefined && !Array.isArray(args.completedSteps)) {
  throw new Error(
    'completedSteps must be an array of step ids — a string would substring-match through .includes() and skip steps that were never completed',
  )
}
// Deduplicated on read: the all-completed gate below compares LENGTH against
// CODEMOD_STEPS, so a list with repeats would satisfy it without covering every step.
const completedSteps = [...new Set(args.completedSteps || [])]
{
  const knownStepIds = new Set(CODEMOD_STEPS.map((s) => s.id))
  for (const id of completedSteps) {
    if (!knownStepIds.has(id)) {
      throw new Error(
        `completedSteps contains unknown step id ${JSON.stringify(id)} — a typo silently skips nothing and lets a completed step re-run (the corruption path); use the exact ids: ${[...knownStepIds].join(', ')}`,
      )
    }
  }
  // A gap in the canonical order is legal but exceptional: only the single-codemod path can
  // produce one (SKILL.md sanctions an out-of-order run with explicit user confirmation).
  // Surface it rather than proceeding silently — later steps and every M-section assume
  // post-codemod names, so a gap usually means a stale completedSteps list instead.
  const gaps = CODEMOD_STEPS.filter(
    (s, i) =>
      !completedSteps.includes(s.id) &&
      CODEMOD_STEPS.slice(i + 1).some((later) => completedSteps.includes(later.id)),
  ).map((s) => s.id)
  if (gaps.length > 0 && args.allowOutOfOrderSteps !== true) {
    throw new Error(
      `completedSteps is not a prefix of the canonical order — ${JSON.stringify(gaps)} are pending while later steps are marked completed. Three causes, and the script cannot tell them apart: (a) a STALE list, in which case the orchestrator-level skip would silently skip a step that never ran (under-migration with no later scan to catch it), (b) a genuine out-of-order state produced by the single-codemod path with explicit user confirmation, or (c) a resume of an OLDER state file that predates a step inserted mid-order (the gap step's key was ABSENT from the file and was added as pending per SKILL.md preflight item 1 — e.g. semantic-token-migration). Refresh the list from the state file; if the gap is the confirmed single-codemod one or the verified missing-key one, re-run with allowOutOfOrderSteps: true.`,
    )
  }
  if (gaps.length > 0) {
    log(
      `Proceeding with a non-prefix completedSteps list (allowOutOfOrderSteps) — ${JSON.stringify(gaps)} are pending while later steps are marked completed.`,
    )
  }
}

const stepResults = []
let aborted = null
let stateCheckReport = null
let stateCheckError = null

// Every step being skipped means no step agent runs, so nothing would verify the state
// file or the targets it records — the scan-only re-run path in SKILL.md Step 2 lands here.
// Spend one cheap agent on that verification instead of proceeding blind.
if (completedSteps.length === CODEMOD_STEPS.length) {
  const stateCheck = await agent(
    `Read-only verification (do not edit any file, do not run any codemod).

1. Read the migration state file at ${args.stateFile}. If it does not exist, report exists: false and stop.
2. Compare its \`targets:\` list with this invocation's targets ${targets} (already canonicalized: no trailing slashes, no './' prefix, repo-relative to ${args.repoRoot}). Report targetsMatch and both lists.
3. Report the recorded \`autoCommit\`, \`codemodVersion\`, \`excludeFiles\`, \`revertedNames\`, every \`steps:\` mark, and every \`manual:\` mark verbatim.

Report structured data only, no prose.`,
    {
      label: 'verify:state-file',
      phase: 'Codemods',
      schema: {
        type: 'object',
        required: ['exists', 'targetsMatch', 'notes'],
        properties: {
          exists: { type: 'boolean' },
          targetsMatch: { type: 'boolean' },
          stateTargets: { type: 'array', items: { type: 'string' } },
          autoCommit: { type: ['boolean', 'string'] },
          codemodVersion: { type: 'string' },
          excludeFiles: { type: 'array', items: { type: 'string' } },
          revertedNames: {
            type: 'array',
            items: {
              type: 'object',
              required: ['file', 'name'],
              properties: { file: { type: 'string' }, name: { type: 'string' } },
            },
          },
          stepMarks: { type: 'object', additionalProperties: { type: 'string' } },
          manualMarks: { type: 'object', additionalProperties: { type: 'string' } },
          notes: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  )

  // scan-only is legitimate ONLY when the state file itself marks every codemod step
  // completed — a stale completedSteps arg alone must not skip a pending codemod.
  const notCompleted = stateCheck?.stepMarks
    ? CODEMOD_STEPS.map((s) => s.id).filter(
        (id) => stateCheck.stepMarks[id] !== 'completed',
      )
    : null

  // targets are not the only locked field: running with a different codemodVersion changes
  // the transform BUILD mid-migration, and a flipped autoCommit changes the failure handling
  // every later step branches on. Both are recorded, so both are comparable — compare them.
  const versionMismatch =
    stateCheck?.codemodVersion && String(stateCheck.codemodVersion) !== String(codemodVersion)
      ? `state file records codemodVersion ${stateCheck.codemodVersion} but this run passed ${codemodVersion} — the same-build guarantee is broken; re-run with the recorded version, or reconcile with the user before changing the pin`
      : null
  const autoCommitMismatch =
    stateCheck?.autoCommit !== undefined &&
    String(stateCheck.autoCommit) !== String(args.autoCommit)
      ? `state file records autoCommit ${stateCheck.autoCommit} but this run passed ${args.autoCommit} — every step's failure handling and clean-tree expectation branches on it; re-run with the recorded value`
      : null
  // The recorded exclusions outlive the run that created them: the final verification uses
  // them to tell a ring-fenced hand-migrated file from a leftover, and a resume that drops
  // the arg would un-exclude those files for any later step ⑥ work.
  const recordedExclusions = stateCheck?.excludeFiles || []
  const exclusionsMismatch =
    JSON.stringify([...recordedExclusions].sort()) !==
    JSON.stringify([...excludeFilesInput].sort())
      ? `state file records excludeFiles ${JSON.stringify(recordedExclusions)} but this run passed ${JSON.stringify(excludeFilesInput)} — pass the recorded list back on every invocation; omitting it un-excludes the files the user ring-fenced and makes the final verification treat their Form* mentions as leftovers`
      : null

  if (
    !stateCheck ||
    !stateCheck.exists ||
    !stateCheck.targetsMatch ||
    versionMismatch ||
    autoCommitMismatch ||
    exclusionsMismatch ||
    (notCompleted && notCompleted.length > 0)
  ) {
    stateCheckError = !stateCheck
      ? 'state-file verification agent returned nothing'
      : !stateCheck.exists
        ? `state file missing at ${args.stateFile} — reconcile with the user before recreating it; the recorded targets/autoCommit/codemodVersion cannot be recovered from args`
        : !stateCheck.targetsMatch
          ? `state file targets ${JSON.stringify(stateCheck.stateTargets)} disagree with the invocation targets ${targets} — surface both lists to the user and follow the target-lock/addition path in SKILL.md preflight item 1`
          : versionMismatch ||
            autoCommitMismatch ||
            exclusionsMismatch ||
            `completedSteps claims all ${CODEMOD_STEPS.length} steps are done, but the state file marks ${JSON.stringify(notCompleted)} as not completed — a stale completedSteps list would silently skip pending codemods; refresh it from the state file and re-run`
    aborted = 'state-file-verification'
    log(`Aborting before the scans — ${stateCheckError}`)
  } else {
    stateCheckReport = stateCheck
    log(
      `state file verified (targets match, all ${CODEMOD_STEPS.length} steps completed) — running scans only`,
    )
  }
}

for (const step of CODEMOD_STEPS) {
  // A failed state-file verification must never be followed by a codemod invocation.
  if (aborted) break

  if (completedSteps.includes(step.id)) {
    // Deterministic orchestrator-level skip. The step agent's own state-file check
    // (procedure step 1) stays as the second layer, guarding runs launched with a
    // stale completedSteps list.
    log(`${step.id}: skipped (state file marks it completed)`)
    stepResults.push({
      step: step.id,
      status: 'skipped',
      filesChanged: 0,
      committed: false,
      verifyFindings: [],
    })
    continue
  }

  // On state-file recreation the agent must mark every step that already ran in THIS
  // invocation (sequential + abort-on-failure ⇒ all prior steps ran or were skipped as
  // completed) plus the preflight-time completedSteps — an all-pending recreation would
  // trigger corrupting re-runs on a later resume.
  const stepsDoneByNow = JSON.stringify([
    ...new Set([
      ...completedSteps,
      ...CODEMOD_STEPS.slice(0, CODEMOD_STEPS.indexOf(step) + 1).map((s) => s.id),
    ]),
  ])

  // Structural gate: only the form-control-migration agent ever receives a MOVE-OUT list —
  // any other step moving files out would silently skip their transformation. Every step
  // still receives the full invocation list for the state-file comparison in procedure
  // step 1 (a resume that drops the arg must fail loudly at the FIRST step, not only at ⑥
  // or on the scan-only path).
  const stepExcludeFiles =
    step.id === 'form-control-migration' ? excludeFilesJson : '[]'

  const result = await agent(
    `You are executing ONE step of the Montage v3 → v4 migration in the repo at ${args.repoRoot}.
Work only on this step. Do not run any other codemod.

Step: ${step.id} — ${step.title}
Targets (JSON array; one codemod invocation per element): ${targets}
Targets, shell-quoted (same order, one token per line — each line IS the complete token; paste it VERBATIM wherever a command below takes a target, never re-quote or unquote it):
${targetsSh}
State file: ${args.stateFile}
Auto-commit: ${args.autoCommit}
Codemod version: ${codemodVersion}
References: ${args.referencesDir}/codemod-steps.md — read this step's section before the pre-check; it holds the full pre-check commands, hazards, and (for form-control-migration) the exclusion procedure.
Invocation excludeFiles (every step compares these against the state file in procedure step 1; repo-relative): ${excludeFilesJson}
Files THIS step moves out in procedure step 4 (non-empty only for form-control-migration): ${stepExcludeFiles}

Paths may contain spaces or shell metacharacters. The \`git -C\` commands below already ship with the repo root quoted, and the shell-quoted targets list above is pre-quoted — use those tokens verbatim wherever a command takes a <shell-quoted target>. For every OTHER path you interpolate yourself (mv/hash-object arguments, the state file and recovery-record paths in check-ignore, checkout pathspecs beyond the targets), single-quote it the same way; double quotes are NOT enough — they still let \`$()\` and backticks expand.

Procedure (follow exactly, in order):

0. Check for \`.claude/montage-migration-v4.exclusions.json\` (relative to ${args.repoRoot}). If it EXISTS, a previous step-⑥ run died between its move-out and move-back: the user's hand-migrated files are sitting in the recorded \`excl\` temp directory and the working tree shows them as DELETED. Restore every recorded path from \`excl\`, verify each file's \`git hash-object\` against the recorded \`hash\`, delete the record, and report status "failed" with the recovery outcome in verifyFindings. Do NOT run any codemod in that run, and never let the deletions reach a commit — the generic dirty-tree handling in step 2 would otherwise commit away files the user explicitly ring-fenced.
1. Read the state file. If it does NOT exist, report status "failed" with reason "state file missing at step start" — do not assume pending; SKILL.md preflight creates the file before step 1, so a missing file means lost migration state that the orchestrator must reconcile with the user. If it marks steps.${step.id} as "completed", do NOTHING and report status "skipped". This is critical: running a codemod twice corrupts code (e.g. the form-control codemod renames FormControl → FormControlField on a second run). A step key that is ABSENT from the file (an older migration started before this step existed) counts as "pending" — add it and run it. Also compare the state file's \`targets\`, \`codemodVersion\` and \`autoCommit\` with the values above: on any mismatch, report status "failed" with BOTH values — all three are locked for the migration. A different targets list means completed steps never ran on the new directories (silent under-migration) or would re-run on migrated ones (corruption); a different codemodVersion silently switches the transform build mid-migration; a flipped autoCommit changes the failure handling and clean-tree expectation this procedure branches on. Compare the recorded \`excludeFiles\` with the "Invocation excludeFiles" list given above too: if the state file records paths that list does not contain, report status "failed" with both lists — running with a shorter list un-excludes files the user ring-fenced (for form-control-migration that means transforming hand-migrated code) and makes the final verification read their Form* mentions as leftovers. The state file recording FEWER paths than the invocation is NOT a mismatch — that is the normal shape of the first exclusion re-run, before step 10 of form-control-migration writes the list.
2. If autoCommit is true, run \`git -C ${repoRootSh} status --porcelain\` and confirm the working tree is clean apart from the state file. If it is dirty, report status "failed" with the reason — do not run the codemod on top of unrelated changes. If autoCommit is false, still record \`git status --porcelain\` now: the dirty set should consist of earlier completed steps' transform output (plus the state file). Judge that against the rename surfaces below, matching each dirty path only against the surfaces of steps the state file marks "completed" (you cannot see the other steps' sections):
${CODEMOD_STEPS.map((s) => `   - ${s.id}: ${s.surface}`).join('\n')}
If ANY dirty path is not explainable by a completed step's rename surface, report status "failed" with those paths and do NOT run the codemod — the decision belongs to the user (SKILL.md preflight item 3), and running would transform unrelated edits and entangle them with migration changes beyond what the snapshot restore can separate.
3. Pre-check: ${step.precheck}
4. If the "Files THIS step moves out" list above is non-empty (only ever populated for form-control-migration), move those files out of the tree NOW — after step 2 has run (the clean-tree check when autoCommit is true, the status recording otherwise) — following the exclusion procedure in codemod-steps.md: record each file's path + content hash first into a temp file (\`echo "$f $(git hash-object "$f")"\` per file, per the procedure's step 1), then \`EXCL=$(mktemp -d)\`, run from the repo root with the repo-relative paths as listed, verify $EXCL is empty first. Before touching anything, verify EVERY listed path exists (\`[ -f "$f" ]\`) — a stale entry (renamed file, wrong-relative path, typo) makes \`git hash-object\` and \`mv\` fail while the codemod still runs over a hand-migrated file, the corruption path; report status "failed" with the missing paths instead. After the move-out, \`find "$EXCL" -type f | wc -l\` must equal the list length, or report "failed". ALSO persist a recovery record at \`${args.repoRoot}/.claude/montage-migration-v4.exclusions.json\` (create the directory first) holding the \`EXCL\` directory and each path with its hash — BEFORE the first \`mv\`, serialized with the jq command in codemod-steps.md's exclusion procedure — or, if \`command -v jq\` fails (many consumer repos have no jq), with the \`node -e\` equivalent given right beside it in that procedure; NEVER by interpolating paths into printf/echo: a quote or backslash in a filename corrupts the record exactly when it is needed for recovery: if this agent is killed or times out mid-procedure, that file is the only way to find the user's hand-migrated files again (\`EXCL\` is a shell local pointing into a temp dir nobody recorded). Delete it after the verified move-back in step 8. They are moved back in step 8 — before the state update and commit.
5. If autoCommit is false, record a pre-step snapshot: \`git -C ${repoRootSh} stash create\` and note the printed hash (it captures the tree including earlier steps' uncommitted changes; if it prints nothing the tree is clean).
6. For each element of the targets array, run:
   \`npx -y @montage-ui/codemod@${codemodVersion} ${step.id} <shell-quoted target>\`
   from ${repoRootSh} — take each <shell-quoted target> verbatim from the shell-quoted targets list above. The command is non-interactive when both the transform name and the path are passed. Capture the output; jscodeshift prints per-file errors — treat any "ERR" as a failure.
7. If the codemod failed partway, NEVER leave a half-transformed tree (re-running a codemod over one is the documented corruption path for steps 5–6 — list-card-migration and form-control-migration — and excluding the partially-transformed files later is the WRONG fix): when autoCommit is true (tree was clean at step start), restore with \`git -C ${repoRootSh} checkout -- <each shell-quoted target>\`; when autoCommit is false, restore the targets from the snapshot recorded in step 5 (\`git -C ${repoRootSh} checkout <snapshot-hash> -- <each shell-quoted target>\` — this reverts only this step's changes; earlier steps' uncommitted work is inside the snapshot; if no hash was printed the tree was clean, so plain \`git checkout -- <each shell-quoted target>\` is equivalent). Move any excluded files back per step 8, then report status "failed" with the error.
8. If files were moved out in step 4: move each back to its exact original path, re-run the path+hash command and diff against the recording from step 4 — must be empty (do NOT rely on a plain \`git status\` no-diff check — it is only meaningful when autoCommit is true; with autoCommit false the excluded files legitimately carry earlier steps' uncommitted changes and show as modified), and confirm the temp dir is empty. If the hash diff is NON-empty, or \`find "$EXCL" -type f\` still lists files, STOP: report status "failed" with the unrestored paths, KEEP the recovery record, do NOT update the state file and do NOT commit — the orchestrator must surface this to the user. Only on a clean move-back, delete the \`.claude/montage-migration-v4.exclusions.json\` recovery record from step 4. Do this BEFORE the state update and commit — a commit must never contain their deletions.
9. Post-step verification: ${step.verify} Record findings in verifyFindings; apply only the fixes the verification instructions explicitly assign to this step — leave everything marked M1–M16 to the manual phase.
10. Update the state file: set steps.${step.id} to "completed", and — for form-control-migration with a non-empty move-out list — write that list to the state file\'s \`excludeFiles:\` key, so later sessions can tell a ring-fenced file from a migration leftover (the final verification depends on it). For css-variable-migration and dom-identifier-migration, append every revert from step 9 to the \`revertedNames:\` key as a file-scoped entry — \`- file: <repo-relative path>\` on one line, \`  name: <reverted name>\` on the next, one entry per (file, name) occurrence — for the same reason — the final verification cannot otherwise tell your deliberate revert from an unmigrated leftover. If the file is missing, recreate it from the template below FIRST — but set every step in this list to "completed" before writing (they all ran, either in earlier sessions or earlier in THIS run; an all-pending file would trigger corrupting re-runs on a later resume): ${stepsDoneByNow}. Report the recreation in verifyFindings together with the recreated \`targets\`, \`autoCommit\`, \`codemodVersion\` AND the fact that every \`manual:\` mark was reset to "pending". Report the two carried-over lists precisely, because they behave differently: \`revertedNames:\` ALWAYS comes back empty (the template cannot recover it, so steps ③/④'s deliberate reverts are no longer distinguishable from leftovers at final verification), while \`excludeFiles:\` is rebuilt from THIS invocation's \`excludeFiles\` arg — currently ${excludeFilesInput.length ? JSON.stringify(excludeFilesInput) : 'EMPTY, so an earlier session\'s ring-fenced list is lost and must be re-established with the user before the final verification'} — all of it comes from this invocation's args and the template, not the lost original, so the orchestrator must confirm each with the user (a finished M-section silently reset to pending is as damaging as a wrong targets list). Ensure the file's path is ignored so it never enters commits: resolve the exclude file with \`git -C ${repoRootSh} rev-parse --git-path info/exclude\` (in a linked worktree or submodule \`.git\` is a FILE, so a literal .git/info/exclude path fails), append the entry only if missing — do the same for \`.claude/montage-migration-v4.exclusions.json\`, the step-⑥ recovery record, which must never enter a commit either — then confirm both with \`git -C ${repoRootSh} check-ignore -q <shell-quoted path>\`. Template:
${STATE_FILE_TEMPLATE}
11. Refuse to commit while \`${args.repoRoot}/.claude/montage-migration-v4.exclusions.json\` exists — its presence means excluded files are still moved out, and \`git add -A\` would commit their deletion. If autoCommit is true: \`git -C ${repoRootSh} add -A && git -C ${repoRootSh} commit${commitNoVerify ? ' --no-verify' : ''} -m "chore(montage): v4 codemod — ${step.id}"\` and record the commit hash. ${
      commitNoVerify
        ? 'The `--no-verify` flag is deliberate: preflight confirmed with the user that this repo\'s pre-commit hooks would reject the intentionally non-building codemod commits.'
        : 'No `--no-verify` was agreed at preflight, so run the commit as written. If a pre-commit hook (.husky/, core.hooksPath, lint-staged) rejects it, do NOT retry with --no-verify on your own and do NOT amend the hook config: report status "failed" with the hook output, so the orchestrator can settle the policy with the user and re-run with commitNoVerify: true.'
    } The state file is ignored via the resolved \`info/exclude\` path from step 10, so it must not appear in the commit — if \`git check-ignore\` there reported it as NOT ignored, fix the ignore entry before committing rather than committing the state file.

Report filesChanged for THIS step only: with autoCommit true, use the commit stat; with autoCommit false, diff against the step-5 snapshot (\`git -C ${repoRootSh} diff --stat <snapshot-hash> -- <each shell-quoted target>\`) — a plain \`git diff --stat\` there also counts every earlier step's uncommitted output and would report an inflated, cumulative number. Your final output is structured data for the orchestrator, not prose.`,
    { label: `codemod:${step.id}`, phase: 'Codemods', schema: STEP_RESULT_SCHEMA },
  )

  stepResults.push(result)

  if (!result || result.status === 'failed') {
    aborted = step.id
    log(`Aborting migration at step ${step.id} — fix the reported error, then resume; completed steps will be skipped.`)
    break
  }
  log(`${step.id}: ${result.status} (${result.filesChanged} files)`)
}

let scanResults = []

if (!aborted) {
  scanResults = await parallel(
    MANUAL_SCAN_SECTIONS.map((section) => () =>
      agent(
        `You are scanning (READ-ONLY — do not edit any file) the repo at ${args.repoRoot} for Montage v3 → v4 manual-migration targets.

Section: ${section.id} — ${section.title}
State file: ${args.stateFile} — read its \`excludeFiles:\` and \`revertedNames:\` lists BEFORE assessing hits. A hit inside an \`excludeFiles\` path is a file the user ring-fenced from step ⑥ (M5's pattern reaches them, and they must never be edited). A \`revertedNames\` entry excuses a hit only when BOTH its \`file\` and \`name\` match the hit — the same name in another file is still a work item, since steps ③/④ judged it per file. Mark matching hits as expected survivors, not work items.

1. Read the file preamble (everything before the first "## M" heading) AND the section "${section.id}" in ${args.referencesDir}/manual-migrations.md — the preamble holds operational caveats (patterns starting with "-" must be passed via \`--\` or -e, portability notes) without which some scans silently fail. If the section defines a pattern BY REFERENCE to another file (M9's [zero] scan cites the two step-2 verification greps; M3's camelCase note points at step 3's diff review, and M4/M5 reuse step ⑤/⑥'s verify patterns for their out-of-target scans), also read the referenced step section in ${args.referencesDir}/codemod-steps.md and use the verbatim patterns from there — a by-reference pattern you do not fetch is a scan silently not run.
2. Run the section's scan patterns over the repo. Scan the WHOLE repo (configs, E2E tests, stylesheets), not just source targets, but skip .git, node_modules, .next, dist, build output, and lockfiles.
3. For each hit, assess it against the fix rules: does it actually need the manual migration, or is it a false positive (e.g. theme token used inside a CSS template literal is fine)? Record file, line, a one-line snippet, and your assessment.
4. Do not fix anything. Your final output is structured data for the orchestrator.`,
        { label: `scan:${section.id}`, phase: 'Scan', schema: SCAN_RESULT_SCHEMA },
      ),
    ),
  )
}

return {
  aborted,
  stateCheck: stateCheckReport,
  stateCheckError,
  steps: stepResults.filter(Boolean),
  manualScan: scanResults.filter(Boolean),
}
