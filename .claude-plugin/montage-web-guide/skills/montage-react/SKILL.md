---
name: montage-react
description: Guide for building UI with Montage (Wanted Design System) in React/Next.js projects. Triggers on component implementation, page/screen creation, styling (sx, theme, design tokens), icons, and utility functions. Active in projects using @wanteddev/wds packages.
---

# montage-react

Skill that is automatically applied when developing components based on Wanted Design System (Montage) in React projects.

## When to use

Apply this skill when any of the following conditions are met:

- Working in a project that uses Montage packages such as `@wanteddev/wds`, `@wanteddev/wds-icon`, `@wanteddev/wds-dummy`, `@wanteddev/wds-brand`
- Creating, modifying, or looking up UI components
- Implementing pages or screens
- Working on styling (sx prop, theme tokens, colors, typography)
- Finding or using icons
- Need a placeholder GNB / Footer / bottom tab bar for a demo or preview page
- Need to render the Wanted brand logo
- Implementing Figma designs as code
- Asking questions about Montage / design system

## Instructions

### 0. Verify MCP Server Connection (Required, Highest Priority)

Before using any MCP tools, **always** verify the `montage-mcp-server` connection first.

Call `mcp__montage-mcp-server__health_check` to check the connection status.

- **Tool not found** (MCP server not connected): Inform the user and suggest running `/mcp` to connect `montage-mcp-server`.
- **Authentication error**: Inform the user that login is required. Running `/mcp` will initiate the auth flow.
- **Other errors**: Inform the user that the MCP server is unreachable and suggest retrying later.

If the connection check fails, do not proceed. Wait for the user's response.

### 1. Gather Initial Information (Parallel Calls)

Gather required information **in parallel** at the start. Avoid unnecessary sequential calls.

When setting up React.js or Next.js from scratch, use:

- `mcp__montage-mcp-server__getting_started`

**Always call in parallel**:

- `mcp__montage-mcp-server__wds_coding_guidelines` — coding guidelines
- `mcp__montage-mcp-server__list_components` — available component list

**Add in parallel when needed**:

- `mcp__montage-mcp-server__list_tokens` — when custom styling is required
- `mcp__montage-mcp-server__get_color_usage` — when color application is needed
- `mcp__montage-mcp-server__list_icons` — when icons are needed
- `mcp__montage-mcp-server__list_dummy_components` — when a placeholder GNB / Footer / bottom tab bar is needed for a demo or preview
- `mcp__montage-mcp-server__list_brand_assets` — when the Wanted brand logo (or other brand mark) is needed

### 2. Component Usage Principles

#### 2.1 Always Look Up Specs Before Use

When using Montage components, **never guess** — always look up the detailed specs.

```
mcp__montage-mcp-server__get_component({ componentName: "ComponentName" })
```

**Important**: Looking up the **parent component** instead of a sub-component gives you the full composition pattern (Anatomy) and all APIs at once.

- For Modal: `get_component({ componentName: "Modal" })` — includes ModalContainer, ModalNavigation, etc.
- For Card: `get_component({ componentName: "Card" })` — includes CardThumbnail, CardContent, etc.
- For Tab: `get_component({ componentName: "Tab" })` — includes TabList, TabListItem, TabPanel, etc.

When unsure which Typography variant to use, call `get_component({ componentName: "Typography" })` to check the size table for each variant.

#### 2.2 Prefer Montage Components

1. **Check Montage before implementing**: Before creating a new component, check if an identical or similar one exists in Montage
2. **Extend based on Montage**: Even when customization is needed, extend from Montage components
3. **Props first, sx second**: Use props provided by the component (size, color, variant, etc.) first; only use sx when props are insufficient

### 3. Page/Screen Implementation Guide

Follow these patterns for vibe design or page implementation requests.

#### 3.1 Page Layout Structure

Basic page skeleton:

```tsx
import { Box, FlexBox, containerStyle } from '@wanteddev/wds';

<FlexBox flexDirection="column" sx={{ minHeight: '100vh' }}>
  <Box as="header" sx={containerStyle(true)}>
    ...
  </Box>
  <Box as="main" sx={containerStyle(true)}>
    ...
  </Box>
  <Box as="footer" sx={containerStyle(true)}>
    ...
  </Box>
</FlexBox>;
```

> For `containerStyle` details, use `get_utility_function("containerStyle")`.

#### 3.2 Layout Component Selection Guide

| Purpose                             | Component                  |
| ----------------------------------- | -------------------------- |
| One-directional layout (row/column) | `FlexBox`                  |
| 12-column grid layout               | `Grid` + `GridItem`        |
| Page container                      | `containerStyle()` utility |
| General wrapper/styling             | `Box`                      |

#### 3.3 Spacing Guide

When implementing a Figma design directly, **ignore this guide and use the exact spacing values defined in Figma**.

Otherwise (vibe design or freeform composition), do not use spacing tokens. Use px values directly instead.

- Default gap between components: `gap="12px"` or `gap="16px"`
- Gap between sections: `gap="24px"` ~ `gap="32px"`
- Page-level section gap: `gap="40px"` ~ `gap="48px"`
- Use FlexBox's `gap` prop or specify `padding`, `margin` in px via sx

#### 3.4 Responsive Implementation Strategy

Three methods are available. Pick based on what's changing:

- **Only component props change** → responsive props (`sm={{ size: "large" }}`)
- **Custom CSS changes** → `respondTo` / `respondDown` utilities
- **Rendering itself changes** → `useMediaQuery` hook

Use mobile-first sizing, then override with `sm`, `md`, `lg`, `xl`. Typically only `sm` breakpoint is used.

#### 3.5 UI Implementation Notes

- `TextButton`, `IconButton` (variant background, normal), `ListCell`, `RadioGroupItem`, `Checkbox`, `AvatarButton`, `ToggleIcon` have interaction areas larger than their visual bounds — give slightly more spacing room.
- When using `ScrollArea` with border-radius, add `[data-role='scroll-area-bar-wrapper'] { padding-block: ${radius}; }` to avoid unnatural scrollbar.
- Don't render too much UI in a single file. Split into smaller components appropriately.

### 4. Styling Rules

#### 4.1 When to Separate style.ts

- **Inline (1-3 lines)**: Write directly in `sx` prop
- **Separate style.ts (4+ lines)**: Extract to a separate file

> When using a theme function in the sx prop, the theme is injected automatically. No need to pass it manually like `wrapperStyle(theme)`.

#### 4.2 Conditional Styles

```tsx
// style.ts
export const buttonStyle = (isActive: boolean) => (theme: Theme) => css`
  color: ${isActive
    ? theme.semantic.primary.normal
    : theme.semantic.label.alternative};
`;

// index.tsx
<Box sx={buttonStyle(isActive)} />;
```

### 5. Icons

When icons are needed, check the Montage icon library first via `mcp__montage-mcp-server__list_icons`. Always prefer Montage icons over creating new ones.

### 6. Utility Functions

Use utility functions provided by Montage. Look up available utilities via `mcp__montage-mcp-server__list_utility_functions`, and get detailed usage with `mcp__montage-mcp-server__get_utility_function`.

### 7. Design Token Usage

Use Montage design tokens instead of hardcoded values. Look up available tokens via `mcp__montage-mcp-server__list_tokens`.

- **Never use CSS variable (`var(--semantic-...)`) directly.** Always access colors through the `theme` callback (e.g., `sx={theme => ({ color: theme.semantic.label.normal })}`). CSS variable names are internal implementation details and may change without notice.
- Colors: use semantic color tokens instead of `#RRGGBB` (fall back to atomic colors if not possible). Use `get_color_usage` to look up which token to use for a given purpose.
- Typography: use the Typography component or `typographyStyle` utility. Use `get_component({ componentName: "Typography" })` to look up the variant/size table.
- Shadows: use `theme.semantic.elevation.shadow.normal.*`
- Opacity: **must** use `addOpacity` utility + `theme.opacity[N]`. Theme color values are CSS variables (e.g. `var(--semantic-primary-normal)`), so appending hex alpha strings directly will **NOT** work. Available opacity keys: `0, 5, 8, 12, 16, 22, 28, 35, 43, 52, 61, 74, 88, 97, 100`.

  ```ts
  // use addOpacity utility
  import { addOpacity } from '@wanteddev/wds';

  import type { Theme } from '@wanteddev/wds';

  const wrapperStyle = (theme: Theme) => css`
    background-color: addOpacity(
      theme.semantic.primary.normal,
      theme.opacity[5]
    );
    border: 1px solid
      ${addOpacity(theme.semantic.primary.normal, theme.opacity[22])};
  `;
  ```

  **When implementing a Figma design:**
  - If Figma specifies an opacity value that does not match any `theme.opacity[N]` key, use the raw number directly (e.g., `opacity: 0.07`) instead of a token.
  - If the Figma design renders the opacity as a **colored overlay layer** (not fading the element itself), implement it via `::before` / `::after` pseudo-element so child content stays fully opaque. When the parent has `border-radius`, the pseudo-element **must** also set `borderRadius: 'inherit'`, otherwise the overlay will overflow the rounded corners.

    ```ts
    // style.ts
    import { css } from '@wanteddev/wds';

    import type { Theme } from '@wanteddev/wds';

    export const overlayStyle = (theme: Theme) => css`
      position: relative;
      border-radius: 12px;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background-color: ${theme.semantic.fill.normal};
        opacity: ${theme.opacity[8]};
      }
    `;
    ```

    ```tsx
    // index.tsx
    import { overlayStyle } from './style';

    <Box sx={overlayStyle} />;
    ```

- Do not use spacing tokens. Use px values directly.

### 8. Dummy Layout Components (`@wanteddev/wds-dummy`)

The `@wanteddev/wds-dummy` package provides presentational-only reference scaffolds (`NavBar`, `Footer`, `BottomTabBar`) that mirror the wanted.co.kr layout.

- **Use for**: demo pages, sandboxes, storybook entries, visual previews — anywhere a realistic-looking GNB / Footer / mobile tab bar is needed without wiring real behavior.
- **Do NOT use as-is in production.** They take no behavior props (no `onClick`, no routing, no state). For real product code, copy the structure and rebuild it against your own data, links, and handlers using primitives from `@wanteddev/wds`.
- All three are `forwardRef` components and accept a standard `sx` prop. `BottomTabBar` is intended for viewports below the `sm` breakpoint — wrap it accordingly if you also render `NavBar` on the same page.
- Look up the full list and usage via `mcp__montage-mcp-server__list_dummy_components`. To see the exact JSX (e.g. to copy and adapt), read the source from `packages/wds-dummy/src/components/<component>/index.tsx`.

```tsx
import { NavBar, Footer, BottomTabBar } from '@wanteddev/wds-dummy';

<>
  <NavBar />
  <main>{/* page content */}</main>
  <Footer />
  <BottomTabBar />
</>;
```

### 9. Brand Assets

Official Wanted brand marks. **Use as-is** — do not recolor, restyle, redraw, or crop.

#### 9.1 Full wordmark — `LogoWanted` (`@wanteddev/wds-brand`)

Use when you need the **"[symbol] wanted" wordmark** (symbol + text together) — e.g. GNB, footer, splash, marketing surfaces.

- Props: `width` (default `112`), `height` (default `32`), plus standard `sx` and any `<svg>` attributes. Forwards ref to `SVGSVGElement`.
- Pass `aria-label` (e.g. `"Wanted Logo"`) when the logo stands alone in an interactive or landmark element.
- Keep the default `112:32` (≈ 3.5:1) aspect ratio when resizing.

```tsx
import { LogoWanted } from '@wanteddev/wds-brand';

<LogoWanted aria-label="Wanted Logo" />
<LogoWanted width={168} height={48} aria-label="Wanted Logo" />;
```

#### 9.2 Symbol only — `IconSymbol` (`@wanteddev/wds-icon`)

Use when you need **just the Wanted symbol mark** (no wordmark) — e.g. favicons, app icons, compact headers, loading indicators, badges. Renders as a 1:1 square.

- Sized via `fontSize` (defaults to `1em`). Built-in `<title>` provides accessible name "원티드 심벌".
- Do **not** crop or extract the symbol portion of `LogoWanted` to fake a symbol-only mark — always use `IconSymbol`.

```tsx
import { IconSymbol } from '@wanteddev/wds-icon';

<IconSymbol sx={{ fontSize: '32px' }} />;
```

Look up the full list of brand assets via `mcp__montage-mcp-server__list_brand_assets`. Prefer these over importing or recreating any other Wanted logo SVG.

## Checklist

Verify the following after completing a component/page:

- [ ] Maximized use of Montage components? (checked Montage before custom implementation)
- [ ] Looked up exact specs via `get_component` before using components? (no guessing)
- [ ] Did not replace component props with custom styles?
- [ ] Used semantic design tokens instead of hardcoded colors?
- [ ] Used FlexBox/Grid/containerStyle appropriately for layout?
- [ ] Used Montage icons? (when applicable)
- [ ] Used appropriate responsive method when needed?
- [ ] For demo/preview pages, used `@wanteddev/wds-dummy` scaffolds instead of hand-rolling a fake GNB/Footer/tab bar?
- [ ] For the Wanted wordmark, used `LogoWanted` from `@wanteddev/wds-brand` (not a custom SVG)?
- [ ] For the symbol-only mark, used `IconSymbol` from `@wanteddev/wds-icon` (not a cropped `LogoWanted`)?
