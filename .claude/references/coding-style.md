# Coding Style

> Branch naming, commit conventions, PR rules, visual regression workflow, and CI checks live in [workflow.md](./workflow.md). This document covers code itself.

## Code Conventions

- **Arrow functions only** for React components (`react/function-component-definition`)
- **Type imports**: Use `import type { ... }` consistently (`@typescript-eslint/consistent-type-imports`)
- **Array types**: Use `Array<T>` generic syntax, not `T[]` (`@typescript-eslint/array-type`)
- **Import ordering**: Groups separated by newlines — builtin, external, internal, parent, sibling, index, object, type. Type-only imports come last as their own group.
- **Naming**: PascalCase for interfaces/types, camelCase for variables/functions

## Component Folder Structure

Every component lives in its own kebab-case directory under `packages/wds/src/components/<component-name>/`. Files are added only when needed — start minimal.

```text
component-name/
├── index.tsx       # Required. Component implementation.
├── types.ts        # Required. Public Props types.
├── style.ts        # Required. Style functions (Emotion css helper).
├── constants.ts    # Optional. Component name strings, magic numbers.
├── contexts.ts     # Optional. Compound-component context (Radix createContext).
├── hooks.ts        # Optional. Component-local hooks.
├── helpers.ts      # Optional. Pure helper functions (date math, formatting, etc).
└── index.test.tsx  # Optional. Vitest + Testing Library unit tests.
```

The component is then re-exported from `packages/wds/src/components/index.ts` with `export * from './component-name';` — that one line is the entire registration step.

### When to add each optional file

- **`constants.ts`**: as soon as you have a compound component (Accordion, AccordionSummary, ...). Name strings are shared between `displayName` and the Radix context name to keep error messages consistent. Also a good home for non-styling magic numbers.
- **`contexts.ts`**: whenever a parent component needs to share state with descendants. Use `@radix-ui/react-context`'s `createContext` (returns `[Provider, useContext]` tuple) — never `React.createContext` directly, because the Radix version gives clearer "must be used within X" errors and accepts a name for the message.
- **`hooks.ts`**: when a hook is component-internal and not reused elsewhere. If it becomes reusable, lift it to `packages/wds/src/hooks/`.
- **`helpers.ts`**: pure functions (no React, no hooks). Keeps `index.tsx` readable.

## types.ts — Props Type Patterns

### Non-responsive component

```ts
import type { WithSxProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type ContentBadgeDefaultProps = WithSxProps<{
  /** The size of the content badge. */
  size?: 'xsmall' | 'small' | 'medium';
  /** The variant of the content badge. */
  variant?: 'solid' | 'outlined';
  /** The content of the content badge. */
  children?: ReactNode;
}>;
```

Key rules:

- **Always wrap with `WithSxProps<{...}>`** — this adds the public `sx` prop. The `Internal` types used inside `index.tsx` strip it back off.
- **JSDoc every public prop.** These comments surface in IDE tooltips and the docs site. Keep them short and start with a capital letter.
- **Use string-literal unions** for variants (`'solid' | 'outlined'`) instead of enums.

### Responsive component

When a component supports per-breakpoint overrides, split the type into three:

```ts
export type ButtonDefaultProps = WithSxProps<{
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  // ...
}>;

export type ButtonResponsiveProps = ResponsiveProps<
  Pick<ButtonDefaultProps, 'fullWidth' | 'size'>
>;

export type ButtonProps = Merge<ButtonDefaultProps, ButtonResponsiveProps>;
```

`Pick` only the props that actually make sense to override per-breakpoint (size, layout-affecting flags). Don't blanket-apply `ResponsiveProps` to every prop — `disabled`, callbacks, and content props should stay flat.

### Compound component types

Each subcomponent gets its own exported Props type. Reuse base component props via `Merge` when extending:

```ts
export type AccordionSummaryProps = Merge<
  { leadingContent?: ReactNode; trailingContent?: ReactNode },
  Omit<ListCellProps, 'selected' | 'divider'>
>;
```

Use `Omit` to hide props that don't apply in the new context.

## index.tsx — Component Implementation Patterns

See [architecture.md](./architecture.md#component-type-system) for `DefaultComponent*` vs `PolymorphicComponent*` selection. The TL;DR: default to `DefaultComponent*`; reach for `PolymorphicComponent*` only when `as` is genuinely needed.

### Default (fixed-element) pattern

```tsx
import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { contentBadgeStyle } from './style';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { ContentBadgeProps } from './types';

const ContentBadge = forwardRef<
  HTMLSpanElement,
  DefaultComponentPropsInternal<ContentBadgeProps, 'span'>
>(
  (
    {
      variant = 'solid',
      size = 'xsmall',
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    return (
      <Box
        as="span"
        ref={ref}
        {...props}
        sx={[
          contentBadgeStyle({ variant, size, xs, sm, md, lg, xl }),
          props.sx,
        ]}
      >
        {children}
      </Box>
    );
  },
);

ContentBadge.displayName = 'ContentBadge';

export { ContentBadge };
export type { ContentBadgeProps };
```

### Polymorphic (`as`-prop) pattern

```tsx
const Button = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      variant = 'solid',
      children,
      ...props
    }: PolymorphicPropsInternal<ButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <Box
        as={(as || 'button') as T}
        ref={ref}
        {...props}
        sx={[buttonStyle({ variant }), props.sx]}
      >
        {children}
      </Box>
    );
  },
) as PolymorphicComponentInternal<ButtonProps, 'button'>;

Button.displayName = 'Button';
```

Note the trailing `as PolymorphicComponentInternal<...>` cast — it's required so the generic call signature survives `forwardRef`'s type erasure.

### Conventions that apply to both

- **Always `forwardRef`.** Even seemingly leaf components get refs from consumers (focus management, animations, third-party integrations).
- **Render through `Box`** from `wds-engine` — never a raw `div`/`span`/etc. `Box` handles the `sx` prop, theme access, and the polymorphic `as` plumbing.
- **Spread `{...props}` _before_ `sx`** so the merged-with-defaults `sx` wins over any incoming `sx` from `props`. Do the same for any prop you intentionally override (`onClick` composed via `composeEventHandlers`, etc).
- **Compose event handlers, don't replace them.** When you need to add behavior to `onClick` / `onKeyDown`, use `composeEventHandlers(internalHandler, props.onClick)` from `@radix-ui/primitive` so the consumer's handler still runs.
- **Provide controllable state via `useControllableState`** (`@radix-ui/react-use-controllable-state`) — it gives you the `value`/`defaultValue`/`onChange` triple for free, matching native form-element semantics.
- **Set `displayName` from a `constants.ts` constant** when the component is part of a compound — the same string is reused as the context name, so a single source of truth keeps debug output consistent.
- **Re-export the Props type** at the bottom: `export type { ButtonProps };`. Tooling (docs site, codemods) relies on this.

### Import ordering inside `index.tsx`

Three groups, blank line between each:

```tsx
// 1) Value imports — external (react first), then internal (parent → sibling)
import { forwardRef, useId } from 'react';
import { Box } from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';

import { WithInteraction } from '../with-interaction';
import { Loading } from '../loading';

import { buttonStyle } from './style';

// 2) Type-only imports — same ordering, but as a separate group
import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef, SyntheticEvent } from 'react';
import type { ButtonProps } from './types';
```

ESLint's `import/order` enforces the value-import ordering; the type-only block is a project convention.

## style.ts — Style Function Patterns

### Curried theme-aware style

When the style needs theme tokens, use the curried form:

```ts
import { css } from '@wanteddev/wds-engine';
import type { Theme } from '@wanteddev/wds-engine';
import type { ButtonProps } from './types';

export const buttonStyle =
  ({ loading, xs, sm, md, lg, xl, ...props }: ButtonProps) =>
  (theme: Theme) => css`
    display: inline-flex;
    color: ${theme.semantic.label.normal};
    background-color: ${theme.semantic.primary.normal};
    /* ... */
  `;
```

The outer call captures props; the inner function receives `theme` from `Box`. This lets the same function be passed directly into `sx={[buttonStyle({...}), props.sx]}`.

### Theme-free style

When no theme tokens are needed, drop the curry:

```ts
export const accordionContentStyle = css`
  display: flex;
  flex-direction: column;
`;
```

### Splitting variants into sub-functions

Once a style has more than one switchable axis (variant × color × size), extract sub-functions to keep the main one readable:

```ts
export const buttonStyle = ({ ... }: ButtonProps) => (theme: Theme) => css`
  /* base styles */
  ${buttonColorStyle({ variant, color }, theme)}
  ${buttonSizeStyle({ size, iconOnly, color })}
`;

const buttonColorStyle = ({ variant, color }: ButtonProps, theme: Theme) => {
  switch (true) {
    case variant === 'solid' && color === 'primary':
      return css`/* ... */`;
    // ...
  }
};
```

`switch (true)` with boolean cases reads cleanly when discriminating on multiple props.

### Responsive styles

Use `createResponsiveStyle` from `utils/internal/responsive-props` — never write media queries by hand:

```ts
${createResponsiveStyle({ xs, sm, md, lg, xl }, theme)(
  (params) => css`
    ${buttonSizeStyle({ ...params, color: props.color })}
    ${params?.fullWidth && 'width: 100%;'}
  `,
)}
```

This expands to the project's breakpoint media queries and applies styles only to the props that were overridden at each breakpoint.

### Always use theme tokens

Reference `theme.semantic.*` (semantic tokens — light/dark aware) over `theme.color.*` (raw atomic tokens). Never hardcode hex values. If a token doesn't exist, the right move is to add one in `wds-theme`, not to inline a literal.

## contexts.ts — Compound Component Context

```ts
import { createContext } from '@radix-ui/react-context';

import { ACCORDION_NAME } from './constants';

type AccordionContextType = {
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  // ...
};

export const [AccordionProvider, useAccordionContext] =
  createContext<AccordionContextType>(ACCORDION_NAME);
```

Usage in `index.tsx`:

```tsx
const { expanded, onExpandedChange } = useAccordionContext(
  ACCORDION_SUMMARY_NAME,
);
```

The argument to `useAccordionContext` is the _consumer_ name (used in error messages like `AccordionSummary must be used within Accordion`), so pass the displayName of the component that's calling it — not the provider's name.

## Unit testing

- Unit tests use **Vitest** with **@testing-library/react** and **vitest-axe** for accessibility
- Test globals are enabled (`describe`, `it`, `expect`, `vi` available without imports)
- Setup mocks: `matchMedia`, `ResizeObserver`, `HTMLCanvasElement`
- Bundle size limits enforced via **size-limit** (e.g., wds: 5KB gzipped)
- Test file lives next to the component as `index.test.tsx` — no separate `__tests__/` directory
- Always include at least one `vitest-axe` accessibility assertion for interactive components

For visual regression tests, snapshot updates, and CI specifics, see [workflow.md](./workflow.md).
