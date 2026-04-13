---
name: montage-react
description: Guide for building UI with Montage (Wanted Design System) in React/Next.js projects. Triggers on component implementation, page/screen creation, styling (sx, theme, design tokens), icons, and utility functions. Active in projects using @wanteddev/wds packages.
---

# montage-react

Skill that is automatically applied when developing components based on Wanted Design System (Montage) in React projects.

## When to use

Apply this skill when any of the following conditions are met:

- Working in a project that uses Montage packages such as `@wanteddev/wds`, `@wanteddev/wds-icon`
- Creating, modifying, or looking up UI components
- Implementing pages or screens
- Working on styling (sx prop, theme tokens, colors, typography)
- Finding or using icons
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

### 2. Component Usage Principles

#### 2.1 Always Look Up Specs Before Use

When using Montage components, **never guess** — always look up the detailed specs.

```
mcp__montage-mcp-server__get_component({ componentName: "ComponentName" })
```

**Important**: Looking up the **parent component** instead of a sub-component gives you the full composition pattern (Anatomy) and all APIs at once.

- For Modal: `get_component("Modal")` — includes ModalContainer, ModalNavigation, etc.
- For Card: `get_component("Card")` — includes CardThumbnail, CardContent, etc.
- For Tab: `get_component("Tab")` — includes TabList, TabListItem, TabPanel, etc.

When unsure which Typography variant to use, call `get_component("Typography")` to check the size table for each variant.

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
- Typography: use the Typography component or `typographyStyle` utility. Use `get_component("Typography")` to look up the variant/size table.
- Shadows: use `theme.semantic.elevation.shadow.normal.*`
- Opacity: **must** use `addOpacity` utility + `theme.opacity[N]`. Theme color values are CSS variables (e.g. `var(--semantic-primary-normal)`), so appending hex alpha strings directly will **NOT** work. Available opacity keys: `0, 5, 8, 12, 16, 22, 28, 35, 43, 52, 61, 74, 88, 97, 100`.

  ```tsx
  // WRONG - never do this. The result is broken CSS like "var(--semantic-primary-normal)0A"
  backgroundColor: theme.semantic.primary.normal + '0A';
  border: `1px solid ${theme.semantic.primary.normal}33`;

  // CORRECT - use addOpacity utility
  import { addOpacity } from '@wanteddev/wds';

  backgroundColor: addOpacity(theme.semantic.primary.normal, theme.opacity[5]);
  border: `1px solid ${addOpacity(theme.semantic.primary.normal, theme.opacity[22])}`;
  ```

- Do not use spacing tokens. Use px values directly.

## Checklist

Verify the following after completing a component/page:

- [ ] Maximized use of Montage components? (checked Montage before custom implementation)
- [ ] Looked up exact specs via `get_component` before using components? (no guessing)
- [ ] Did not replace component props with custom styles?
- [ ] Used semantic design tokens instead of hardcoded colors?
- [ ] Used FlexBox/Grid/containerStyle appropriately for layout?
- [ ] Used Montage icons? (when applicable)
- [ ] Used appropriate responsive method when needed?
