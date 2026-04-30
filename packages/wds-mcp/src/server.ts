import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import TurndownService from 'turndown';
import * as cheerio from 'cheerio';
import * as z from 'zod';

import { version } from '../package.json';

import {
  getComponentUrl,
  getDocsBaseUrl,
  getGettingStarted,
  getUtilityFunctionUrl,
  listComponents,
  listIcons,
  listTokens,
  listUtilityFunctions,
} from './helpers';
import { DOCS_COLOR_USAGE_URL, DOCS_SELECTOR } from './constants';
import { type Platform, trackEvent } from './track';

export type TrackContext = {
  clientId: string;
  deviceId?: string | null;
};

export type GetServerOptions = {
  transport: 'http' | 'stdio';
  platform: Platform;
  trackContext: TrackContext;
};

const getServer = ({ transport, platform, trackContext }: GetServerOptions) => {
  const server = new McpServer({
    name: 'WDS, Wanted Design System',
    version,
  });

  const original = server.registerTool.bind(server);

  server.registerTool = ((
    toolName: Parameters<typeof original>[0],
    toolConfig: Parameters<typeof original>[1],
    toolHandler: Parameters<typeof original>[2],
  ) => {
    const hasInputSchema = Boolean(
      (toolConfig as { inputSchema?: unknown }).inputSchema,
    );

    const wrapped = (async (toolArgs: unknown, extra: unknown) => {
      const start = Date.now();
      let status = 'success';

      try {
        return await (
          toolHandler as (...args: Array<unknown>) => Promise<unknown>
        )(toolArgs, extra);
      } catch (error) {
        status = 'failure';
        throw error;
      } finally {
        const params: Record<string, unknown> =
          hasInputSchema && toolArgs && typeof toolArgs === 'object'
            ? (toolArgs as Record<string, unknown>)
            : {};

        void trackEvent({
          name: 'tool_call',
          toolName,
          transport,
          platform,
          clientId: trackContext.clientId,
          deviceId: trackContext.deviceId,
          params,
          metadata: {
            durationMs: Date.now() - start,
            status,
            version,
          },
        }).catch(() => {
          // 텔레메트리 실패는 tool 결과에 영향 주지 않음
        });
      }
    }) as Parameters<typeof original>[2];

    return original(toolName, toolConfig, wrapped);
  }) as typeof server.registerTool;

  const turndownService = new TurndownService({
    headingStyle: 'atx',
  })
    .remove((node) => {
      return [
        'heading-link-area',
        'demo-viewport',
        'demo-toolbar',
        'route-tab',
      ].includes(node.getAttribute('data-role') ?? '');
    })
    .remove('style')
    .remove('footer');

  server.registerTool(
    'list_components',
    {
      description: 'List all components in the Wanted Design System',
    },
    async () => {
      const components = listComponents();

      return {
        content: [
          {
            type: 'text',
            text: `When using components, if you are unsure how to use them, **must** use the \`get_component\` tool.
To obtain detailed information about a specific component, you can use the \`get_component\` tool. For more comprehensive details, try entering the parent component instead of a child component.
All these components are available in the @wanteddev/wds package.

The following components are available in the @wanteddev/wds in TypeScript projects:

${components
  .map((component) =>
    component.subComponents.length > 0
      ? `- ${component.name}\n  Sub-components: ${component.subComponents.join(', ')}`
      : `- ${component.name}`,
  )
  .join('\n')}`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'wds_coding_guidelines',
    {
      description:
        'Get the guidelines when writing code that uses WDS or for UI code that you are creating',
    },
    async () => {
      return {
        content: [
          {
            type: 'text',
            text: `When writing code that uses WDS, follow these guidelines:

## Form

When using form-related components (e.g., Checkbox, RadioGroup, TextField, Select, Switch, etc.), you should:

1. **Always look up the usage** of the component using the \`get_component\` tool before implementing
2. **Strongly consider using them with the Form component** for better form state management, validation, and accessibility
3. Form components provide built-in support for labels, error messages, and form control states


## Styling

**If you need custom style, create a style.ts file and import that.**
**If your custom style is very short (about 1-3 lines), you may write it inline instead.**

for example
\`\`\`tsx
import { wrapperStyle } from './style';

<Box sx={wrapperStyle} />
\`\`\`

\`\`\`tsx
<Box sx={theme => ({
  padding: '20px',
	backgroundColor: theme.semantic.background.normal.normal,
})} />
\`\`\`

You can import \`css\` , \`Theme\` from \`@wanteddev/wds\`

For example

\`\`\`ts
// style.ts
import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const wrapperStyle = css\`
  padding: 20px;
\`;

// use design system theme
export const buttonStyle = (theme: Theme) => css\`
  color: \${theme.semantic.label.normal};
\`;
\`\`\`


// Note: You don't need to explicitly pass the theme to the style function when using the \`sx\` prop. The theme is automatically provided by the system.

\`\`\`tsx
<Button sx={buttonStyle} /> // this is sufficient; you don't have to call buttonStyle(theme)
\`\`\`


Conditional styling

\`\`\`tsx
import { buttonStyle } from './style';

<Button sx={buttonStyle(true)} />

// style.ts
import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const buttonStyle = (flag: boolean) => (theme: Theme) => css\`
  color: \${flag ? theme.semantic.label.normal : theme.semantic.label.assistive};
\`;
\`\`\`

**Prefer using component props over custom styles whenever possible.**

When a component provides props to control layout, spacing, or appearance, use them instead of writing custom Style.

\`\`\`tsx
// ✅ Good - using component props
<FlexBox flexDirection="column" gap="12px" alignItems="center">
  <Typography>Content</Typography>
</FlexBox>

// ❌ Avoid - using custom styles when props are available
<FlexBox sx={{ flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
  <Typography>Content</Typography>
</FlexBox>
\`\`\`

## Theme

- Prefer design tokens over hard-coded values. For example, use \`theme.semantic.label.normal\` instead of \`#171717\`. Use the \`list_tokens\` tool to find the design token you need.
- Prefer using semantic theme colors. If not possible, use atomic colors as a fallback.
- When opacity needs to be applied, import and use the \`addOpacity\` utility from \`@wanteddev/wds\`.
- Do not use spacing tokens.

## Authoring & Using Components

- Prefer re-using a component from WDS when possible over writing a new component.
- Prefer using existing props for a component for styling instead of adding styling to a component
- Prefer using icons from WDS instead of creating new icons. Use the \`list_icons\` tool to find the icon you need.
- When using a component from WDS, make sure to follow the component's usage and accessibility guidelines

## Coding guidelines

The following list of coding guidelines must be followed:

- Use the sx prop for styling components.
- Use the Box component for styling components.`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'get_component',
    {
      description:
        'Retrieve documentation and usage details for a specific React component from the @wanteddev/wds package by its name. This tool provides the official WDS documentation for any listed component, making it easy to inspect, reuse, or integrate components in your project.',
      inputSchema: z.object({
        componentName: z
          .string()
          .describe('The name of the component to get documentation for'),
      }),
    },
    async ({ componentName }) => {
      const components = listComponents();
      const lowerCaseComponentName = componentName.toLowerCase();
      const match = components.find((component) => {
        return (
          component.name.toLowerCase() === lowerCaseComponentName ||
          component.subComponents.some(
            (subComponent) =>
              subComponent.toLowerCase() === lowerCaseComponentName,
          )
        );
      });

      if (!match) {
        return {
          content: [
            {
              type: 'text',
              text: `There is no component named \`${componentName}\` in the @wanteddev/wds package. For a full list of components, use the \`list_components\` tool.`,
            },
          ],
        };
      }

      const fetchUrl = await getComponentUrl(match.name, version);

      if (!fetchUrl) {
        return {
          content: [
            {
              type: 'text',
              text: `Failed to fetch the documentation for ${componentName} usage guide WDS.`,
            },
          ],
        };
      }

      const response = await fetch(fetchUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch - ${response.statusText}`);
      }

      const html = await response.text();

      if (!html) {
        return {
          content: [
            {
              type: 'text',
              text: `Failed to parse the documentation for ${componentName} usage guide WDS.`,
            },
          ],
        };
      }

      const $ = cheerio.load(html);
      const source = $(DOCS_SELECTOR).html();

      if (!source) {
        return {
          content: [
            {
              type: 'text',
              text: `Failed to parse the documentation for ${componentName} usage guide WDS.`,
            },
          ],
        };
      }

      const text = turndownService.turndown(source);

      return {
        content: [
          {
            type: 'text',
            text: `Here is the documentation for ${componentName} usage guide WDS:

${text}

- If the component supports the \`xs\`, \`sm\`, \`md\`, \`lg\`, and \`xl\` props, you can override its props starting from each corresponding breakpoint and above.
- For information about ThemeColorsToken types, you can use the \`list_tokens\` tool. The token values are strings like \`'semantic.label.normal'\`.
- The \`sx\` prop works the same as Emotion's \`css\` prop.
- For detailed coding guidelines, please use the \`wds_coding_guidelines\` tool.`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'list_icons',
    { description: 'List all of the icons available from WDS' },
    async () => {
      return {
        content: [
          {
            type: 'text',
            text: `The following icons are available in the @wanteddev/wds-icon in TypeScript projects:

- ${listIcons().join('\n- ')}

You can use these components from the @wanteddev/wds-icon package.
If you want to change icon size, you can use the \`sx\` prop.
For example, you can use them like this: 

\`\`\`tsx
import { IconBlank } from '@wanteddev/wds-icon';

<IconBlank sx={{ fontSize: '24px' }} />
\`\`\`

And if you want to change icon color, also you can use the \`sx\` prop.
For example, you can use them like this: 

\`\`\`tsx
import { IconBlankColor } from '@wanteddev/wds-icon';

<IconBlankColor sx={theme => ({ color: theme.semantic.label.normal })} />
\`\`\`
`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'list_tokens',
    { description: 'List all of the tokens available from WDS' },
    async () => {
      return {
        content: [
          {
            type: 'text',
            text: `The following tokens are available in the @wanteddev/wds:

${listTokens().join('\n')}

Do not use spacing tokens.

If you want to know more about how to use colors, you can use the \`get_color_usage\` tool for detailed guidance.

You can use these tokens from the @wanteddev/wds package.
For example, you can use them like this: 
\`\`\`tsx
import { css } from '@wanteddev/wds';
import type { Theme } from '@wanteddev/wds';

const buttonStyle = (theme: Theme) => css\`
  color: \${theme.semantic.label.normal};
\`;
\`\`\`

or with the Typography component like:

\`\`\`tsx
<Typography color="semantic.label.normal" />
\`\`\`
`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'get_color_usage',
    { description: 'Get the guidelines for how to apply color' },
    async () => {
      const response = await fetch(
        `${getDocsBaseUrl(version)}/${DOCS_COLOR_USAGE_URL}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch - ${response.statusText}`);
      }

      const html = await response.text();

      if (!html) {
        return {
          content: [
            {
              type: 'text',
              text: `Failed to fetch the documentation for color usage guide WDS.`,
            },
          ],
        };
      }

      const $ = cheerio.load(html);
      const source = $(DOCS_SELECTOR).html();

      if (!source) {
        return {
          content: [
            {
              type: 'text',
              text: `Failed to parse the documentation for color usage guide WDS.`,
            },
          ],
        };
      }

      const text = turndownService.turndown(source);

      return {
        content: [
          {
            type: 'text',
            text: `Here is the documentation for color usage guide WDS:\n${text}`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'list_utility_functions',
    {
      description: 'List all of the utility functions available from WDS',
    },
    async () => {
      const utilityFunctions = await listUtilityFunctions(version);

      return {
        content: [
          {
            type: 'text',
            text: `The following utility functions are available in the @wanteddev/wds:\n- ${utilityFunctions.join('\n- ')}`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'get_utility_function',
    {
      description: 'Get the guidelines for how to apply a utility function',
      inputSchema: z.object({
        functionName: z
          .string()
          .describe(
            'The name of the utility function to get documentation for',
          ),
      }),
    },
    async ({ functionName }) => {
      const fetchUrl = await getUtilityFunctionUrl(functionName, version);

      if (!fetchUrl) {
        return {
          content: [
            {
              type: 'text',
              text: `There is no utility function named \`${functionName}\` in the @wanteddev/wds package. For a full list of utility functions, use the \`list_utility_functions\` tool.`,
            },
          ],
        };
      }

      const response = await fetch(fetchUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch - ${response.statusText}`);
      }

      const html = await response.text();

      if (!html) {
        return {
          content: [
            {
              type: 'text',
              text: `Failed to fetch the documentation for ${functionName} usage guide WDS.`,
            },
          ],
        };
      }

      const $ = cheerio.load(html);
      const source = $(DOCS_SELECTOR).html();

      if (!source) {
        return {
          content: [
            {
              type: 'text',
              text: `Failed to parse the documentation for ${functionName} usage guide WDS.`,
            },
          ],
        };
      }

      const text = turndownService.turndown(source);

      return {
        content: [
          {
            type: 'text',
            text: `Here is the documentation for ${functionName} usage guide WDS:\n${text}`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'getting_started',
    {
      description:
        'Installation steps, and initial configuration guides to help you quickly start using WDS in your codebase.',
    },
    () => {
      const content = getGettingStarted();

      return {
        content: [
          {
            type: 'text',
            text: `Here is the documentation for getting started with WDS:\n${content}`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'list_dummy_components',
    {
      description:
        'List presentational dummy layout components (NavBar, Footer, BottomTabBar) provided by the @wanteddev/wds-dummy package. These are reference scaffolds for demos and previews — render UI only, expose no behavior props, and should NOT be reused as-is in production code.',
    },
    async () => {
      return {
        content: [
          {
            type: 'text',
            text: `The following dummy components are available in the @wanteddev/wds-dummy package.

## Intent

These are **presentational-only reference scaffolds** that mirror the wanted.co.kr layout. Use them when you need a realistic-looking GNB / Footer / mobile tab bar for a demo, sandbox, storybook page, or visual preview.

**Do NOT use them as-is in production.** They take no behavior props (no \`onClick\`, no routing, no state). For real product code, copy the structure and rebuild it against your own data, links, and handlers using primitives from \`@wanteddev/wds\`.

## Components

- **NavBar** — Top global navigation bar (logo + main menu + sign-up / enterprise / search / menu buttons). Becomes sticky on scroll.
- **Footer** — Site footer (logo, link list, company info, social icon buttons, copyright).
- **BottomTabBar** — Mobile-only bottom tab bar. Rendered only below the \`sm\` breakpoint; the component itself does not hide on larger screens, so wrap it accordingly if needed.

All three are \`forwardRef\` components, accept a standard \`sx\` prop, and render as a \`div\` (or semantic equivalent).

## Usage

\`\`\`tsx
import { NavBar, Footer, BottomTabBar } from '@wanteddev/wds-dummy';

export default function DemoPage() {
  return (
    <>
      <NavBar />
      <main>{/* page content */}</main>
      <Footer />
      <BottomTabBar />
    </>
  );
}
\`\`\`

If you need to know the exact JSX of a dummy component (to copy and adapt it for production), read the source from \`packages/wds-dummy/src/components/<component>/index.tsx\` directly — there is no separate docs page for these.`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'list_brand_assets',
    {
      description:
        'List Wanted brand assets (e.g. LogoWanted) provided by the @wanteddev/wds-brand package. These are official brand marks — use them as-is, do not recolor or restyle.',
    },
    async () => {
      return {
        content: [
          {
            type: 'text',
            text: `The following brand assets are available in the @wanteddev/wds-brand package.

## Intent

These are **official Wanted brand marks**. Use them whenever you need the Wanted logo in any UI. Do not recolor, restyle, or redraw them — they ship with the correct gradient and proportions baked in.

## Assets

- **LogoWanted** (\`@wanteddev/wds-brand\`) — The full **"[symbol] wanted" wordmark** (symbol + text), rendered as an inline SVG with the official brand gradient.
  - Props: \`width\` (default \`112\`), \`height\` (default \`32\`), plus standard \`sx\` and any \`<svg>\` attributes.
  - Forwards ref to the underlying \`SVGSVGElement\`.
  - Pass \`aria-label\` (e.g. \`"Wanted Logo"\`) when the logo is the only content of an interactive or landmark element.

- **IconSymbol** (\`@wanteddev/wds-icon\`) — The **symbol mark only** (no wordmark), rendered as a 1:1 square icon. Use this when you need just the Wanted symbol — e.g. favicons, app icons, compact headers, loading indicators, badges.
  - Sized via \`fontSize\` (defaults to \`1em\`); built-in \`<title>\` provides accessible name "원티드 심벌".
  - Do **not** crop or extract the symbol portion of \`LogoWanted\` to fake a symbol-only mark — always use \`IconSymbol\`.

## Usage

\`\`\`tsx
// Full wordmark
import { LogoWanted } from '@wanteddev/wds-brand';

<LogoWanted aria-label="Wanted Logo" />

// Custom size — keep the 112:32 (≈ 3.5:1) aspect ratio
<LogoWanted width={168} height={48} aria-label="Wanted Logo" />

// Symbol only
import { IconSymbol } from '@wanteddev/wds-icon';

<IconSymbol sx={{ fontSize: '32px' }} />
\`\`\`

Prefer these over importing or recreating any other Wanted logo SVG.`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'health_check',
    {
      description:
        'Check the health status of the Montage MCP server. Returns server name, version, and status.',
    },
    () => {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                status: 'ok',
                name: 'Montage, Wanted Design System',
                version,
                timestamp: new Date().toISOString(),
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  return server;
};

export { getServer };
