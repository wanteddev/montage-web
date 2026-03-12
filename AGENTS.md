# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

Montage (formerly WDS) is Wanted Lab's design system for web. It's a Lerna + Nx monorepo. Public packages are published under `@montage-ui/*` to npm registry, while internal packages (e.g., `@wanteddev/montage-mcp`) are published to GitHub Package Registry.

## Common Commands

```bash
# Build all packages (respects dependency graph via Nx)
pnpm build

# Run unit tests (Vitest + jsdom)
pnpm test:unit

# Run a single test file
pnpm vitest run packages/core/src/components/button/index.test.tsx

# Watch mode for tests
pnpm test:unit:watch

# Visual regression tests (Playwright + Chromium)
pnpm test:visual

# Lint all packages
pnpm lint

# Format code
pnpm format

# Dev mode (all packages)
pnpm dev

# Run docs site locally
pnpm -F docs dev
```

## Package Dependency Graph

```text
@montage-ui/theme (design tokens, no React dependency)
    ↓
@montage-ui/engine (Box, ThemeProvider, polymorphic types — depends on theme + Emotion)
    ↓
@montage-ui/core, @montage-ui/icon, @montage-ui/lottie (UI components — depend on engine)
    ↓
@montage-ui/nextjs (Next.js integration — depends on engine)
```

Tooling packages (`@montage-ui/codemod`, `@montage-ui/eslint-plugin`) are standalone. `@wanteddev/montage-mcp` is an internal package under `internal/montage-mcp`.

## Architecture

### Polymorphic Component Pattern

Components use a two-tier type system for the `as` prop:

- **Public API**: `PolymorphicProps<P, C>` / `PolymorphicComponent<P, E>` — includes `sx` prop
- **Internal API**: `PolymorphicPropsInternal<P, C>` / `PolymorphicComponentInternal<P, E>` — excludes `sx` (handled separately via `Box`)

Component implementation pattern:

```tsx
const MyComponent = forwardRef(
  <T extends ElementType = 'div'>(
    { as, ...props }: PolymorphicPropsInternal<MyComponentProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <Box
        as={(as || 'div') as T}
        ref={ref}
        sx={[myStyle, props.sx]}
        {...props}
      />
    );
  },
) as PolymorphicComponentInternal<MyComponentProps, 'div'>;
```

**Critical TypeScript caveat**: When using `PolymorphicPropsInternal`, event handlers (`onClick`, `onKeyDown`, etc.) accessed via `...props` spread may cause TypeScript errors because `Omit` types don't resolve properly. Fix by destructuring event handlers explicitly: `{ onClick, onKeyDown, ...rest }`.

### Component File Structure

Each component follows this layout:

```text
component-name/
├── index.tsx       # Implementation (uses Box from @montage-ui/engine)
├── types.ts        # Props defined with WithSxProps<{...}> + ResponsiveProps
├── style.ts        # Style functions using theme tokens
├── constants.ts    # Optional constants
└── index.test.tsx  # Unit tests
```

### Theme System

Three-layer architecture:

1. **@montage-ui/theme**: Raw atomic tokens + semantic tokens (light/dark) + design tokens (spacing, opacity, breakpoint, zIndex)
2. **@montage-ui/engine**: Emotion-based runtime (ThemeProvider, Box with `sx` prop, `useSxProps` hook)
3. **@montage-ui/core**: Components compose styles using theme tokens via style functions

### Responsive Props

Components support per-breakpoint prop overrides:

```tsx
type ButtonProps = Merge<
  ButtonDefaultProps,
  ResponsiveProps<Pick<ButtonDefaultProps, 'fullWidth' | 'size'>>
>;
// Usage: <Button xs={{ size: 'small' }} md={{ size: 'large' }} />
```

### Build System

- **tsdown** bundles each package to CJS + ESM with DTS generation
- Post-build hook injects `'use client'` directive for RSC-compatible files
- External: `react`, `react-dom`, `next`

## Code Conventions

- **Conventional Commits**: `<type>(<scope>): <description>` — enforced by commitlint
- **Arrow functions only** for React components (`react/function-component-definition`)
- **Type imports**: Use `import type { ... }` consistently (`@typescript-eslint/consistent-type-imports`)
- **Array types**: Use `Array<T>` generic syntax, not `T[]` (`@typescript-eslint/array-type`)
- **Import ordering**: Groups separated by newlines — builtin, external, internal, parent, sibling, index, object, type
- **Naming**: PascalCase for interfaces/types, camelCase for variables/functions

## Testing

- Unit tests use **Vitest** with **@testing-library/react** and **vitest-axe** for accessibility
- Test globals are enabled (`describe`, `it`, `expect`, `vi` available without imports)
- Setup mocks: `matchMedia`, `ResizeObserver`, `HTMLCanvasElement`
- Bundle size limits enforced via **size-limit** (e.g., core: 5KB gzipped)

## CI Checks on PRs

Size-limit analysis, unit tests, visual regression tests, CommonJS compatibility, and tree-shaking validation all run on pull requests.
