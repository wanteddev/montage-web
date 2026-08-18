# Known issues — accepted trade-offs (montage-v3-to-v4)

Deliberate decisions, not oversights. The validation Workflow reads this file and refuses to
re-report anything listed here, which is what keeps successive runs comparable. Remove an entry
when the underlying decision changes.

Every path below is relative to the **montage-web source repo**, not to a repo being migrated —
this file ships with the plugin but is maintainer-facing, and none of these paths exist in a
consumer checkout.

## Version bumps deferred

`.claude-plugin/montage-migration/.claude-plugin/plugin.json` (1.0.0) and
`.claude-plugin/marketplace.json` (1.1.0) are intentionally NOT bumped during the 4.0.0
work — the maintainer stacks these changes on `feature/4.0.0` and bumps once, when 4.0.0
merges to `main`. Both must be bumped then (plugin minor for the new
M12/M13/M14/M15/M16/M17 and step ⑨ `list-cell-variant-migration` content,
marketplace alongside it) before the plugin ships.

## SKILL.md exceeds the lean-entry-point budget

`SKILL.md` runs several times the conventions' 1,000–1,500-word guidance for a lean entry point
(check the current figure with `wc -lw`; it grows with every M-section and abort cause rather than
shrinking). The overrun is concentrated in preflight (resume, mismatch reconciliation, target lock, version pin,
exclusions) and the abort-cause catalogue. Both are consumed BEFORE any reference is read: a
fresh instance that skips them can corrupt a consumer repo, so they stay in the entry point until
someone designs a split that keeps them on the first-load path. The frontmatter description is
likewise over the usual length because it carries Korean and English triggers for the full
migration, the resume, and each of the nine single-codemod phrasings.

## Scan patterns are line-based heuristics

Every M-section scan misses multi-line JSX props and non-literal forms (`variant={'bottom'}`,
responsive objects, computed names). This is documented in `manual-migrations.md`'s preamble and
accepted: a clean scan is "nothing obvious", not proof of absence. Findings that only widen a
regex against another edge case are refinement, not defects.

Scope note: this entry covers the **M-section** scans only. The preflight scans in SKILL.md (the
legacy-cast scan, the stylesheet-target discovery) are not covered — a miss there changes which
directories get migrated or lets a file fail mid-run, so a demonstrated miss in those is a defect.
