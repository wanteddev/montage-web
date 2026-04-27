# Architecture

## Project Overview

Montage (formerly WDS) is Wanted Lab's design system for web. It's a Lerna + Nx monorepo containing 9 packages, all published under `@wanteddev/*` to GitHub Package Registry.

## Package Dependency Graph

```text
wds-theme (design tokens, no React dependency)
    ↓
wds-engine (Box, ThemeProvider, polymorphic types — depends on wds-theme + Emotion)
    ↓
wds, wds-icon, wds-lottie (UI components — depend on wds-engine)
    ↓
wds-nextjs (Next.js integration — depends on wds-engine)
```

Tooling packages (`wds-codemod`, `wds-mcp`, `eslint-plugin-wds`) are standalone.

## Where to make changes (and where not to)

Day-to-day work — adding components, updating styles, reflecting design changes from Figma — happens in **`wds`** (and occasionally `wds-icon` / `wds-lottie`). The foundation packages should be treated as nearly read-only:

| Package      | Modify?                                        | Why                                                                                                                                                                                                     |
| ------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wds`        | **Yes** — primary work surface                 | Component implementations, styles, types live here.                                                                                                                                                     |
| `wds-icon`   | Via `sync-icons` skill, not by hand            | Icon set is generated from Figma. Manual edits get overwritten on the next sync.                                                                                                                        |
| `wds-lottie` | Yes (rare)                                     | Only when adding/updating Lottie assets.                                                                                                                                                                |
| `wds-theme`  | **Almost never** — token additions only        | Adding a new semantic token is OK when one is genuinely missing. Renaming/removing tokens, or changing the token shape, is a breaking change for every consumer of `wds`. Coordinate before touching.   |
| `wds-engine` | **Almost never** — `Box`/types/`sx` are stable | Box, ThemeProvider, polymorphic types, the `sx` prop runtime, `useSxProps`. These are the primitives every component depends on; bugs here ripple through the entire library. Defer to the maintainers. |
| `wds-nextjs` | **Almost never** — Next.js integration only    | RSC boundaries, `'use client'` injection. Touch only when a Next.js compatibility issue is the actual root cause.                                                                                       |

**Rule of thumb**: if a task can be solved by editing files under `packages/wds/src/components/<name>/`, do it there. If it seems to require touching `wds-engine` / `wds-theme` / `wds-nextjs`, stop and confirm with the user — usually the right fix is in `wds` (compose `Box`/tokens/types differently), not in the foundation. Foundation changes are breaking-change territory and belong on a `feature/<major>.<minor>.<patch>` branch with explicit intent.

The token exception worth knowing: if a designer asks for a color/spacing/typography value that doesn't exist as a `theme.semantic.*` token, the right move is to **add** the token in `wds-theme` (small, additive, non-breaking) rather than inline a hex/px literal in the component. This is the one routine reason to touch `wds-theme`.

## Component Type System

`wds-engine` exposes two parallel type families. Both have a public variant (with `sx`) and an `Internal` variant (without `sx`, used inside implementations because `Box` consumes `sx` separately).

### Choosing the right pattern

- **Default — use `DefaultComponent*`** for components that always render a fixed element. This is the right choice for the vast majority of components.
- **Use `PolymorphicComponent*` only when the component genuinely needs an `as` prop** to swap its root element/component. The polymorphic generics add type complexity (and the event-handler caveat below), so don't reach for them by default.

### Public vs Internal

- **Public API** (consumed by users): `DefaultComponentProps<P, E>` / `PolymorphicProps<P, C>` and the matching component interfaces — include `sx`.
- **Internal API** (used inside the implementation): `DefaultComponentPropsInternal<P, E>` / `PolymorphicPropsInternal<P, C>` — exclude `sx`, which is composed manually onto `Box`.

### Default (non-polymorphic) pattern

```tsx
const ContentBadge = forwardRef<
  HTMLSpanElement,
  DefaultComponentPropsInternal<ContentBadgeProps, 'span'>
>(({ variant = 'solid', ...props }, ref) => {
  return (
    <Box
      as="span"
      ref={ref}
      {...props}
      sx={[contentBadgeStyle({ variant }), props.sx]}
    />
  );
});
```

### Polymorphic (`as`-prop) pattern

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

**Critical TypeScript caveat (polymorphic only)**: When using `PolymorphicPropsInternal`, event handlers (`onClick`, `onKeyDown`, etc.) accessed via `...props` spread may cause TypeScript errors because `Omit` types don't resolve properly. Fix by destructuring event handlers explicitly: `{ onClick, onKeyDown, ...rest }`. This is one more reason to prefer `DefaultComponent*` when `as` isn't needed.

## Component File Structure

Each component follows this layout:

```text
component-name/
├── index.tsx       # Implementation (uses Box from wds-engine)
├── types.ts        # Props defined with WithSxProps<{...}> + ResponsiveProps
├── style.ts        # Style functions using theme tokens
├── constants.ts    # Optional constants
└── index.test.tsx  # Unit tests
```

## Theme System

Three-layer architecture:

1. **wds-theme**: Raw atomic tokens + semantic tokens (light/dark) + design tokens (spacing, opacity, breakpoint, zIndex)
2. **wds-engine**: Emotion-based runtime (ThemeProvider, Box with `sx` prop, `useSxProps` hook)
3. **wds**: Components compose styles using theme tokens via style functions

## Responsive Props

Components support per-breakpoint prop overrides:

```tsx
type ButtonProps = Merge<
  ButtonDefaultProps,
  ResponsiveProps<Pick<ButtonDefaultProps, 'fullWidth' | 'size'>>
>;
// Usage: <Button xs={{ size: 'small' }} md={{ size: 'large' }} />
```

## Build System

- **tsdown** bundles each package to CJS + ESM with DTS generation
- Post-build hook injects `'use client'` directive for RSC-compatible files
- External: `react`, `react-dom`, `next`
