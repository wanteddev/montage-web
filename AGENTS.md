# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Common Commands

```bash
# Build all packages (respects dependency graph via Nx)
pnpm build

# Run unit tests (Vitest + jsdom)
pnpm test:unit

# Run a single test file
pnpm vitest run packages/wds/src/components/button/index.test.tsx

# Watch mode for tests
pnpm test:unit:watch

# Visual regression tests (Playwright + Chromium)
pnpm test:visual

# Lint all packages
pnpm lint

# Format code
pnpm format

# Run docs site locally
pnpm -F docs dev
```

## References

- [Architecture](.claude/references/architecture.md) — Project overview, package dependency graph, where to make changes (and where not to), component type system, theme system, responsive props, build system
- [Coding Style](.claude/references/coding-style.md) — Code conventions, component folder structure, types/index/style patterns, contexts, unit testing
- [Workflow](.claude/references/workflow.md) — Branch naming, base branch rules, commit conventions, PR rules, visual regression workflow, CI checks
