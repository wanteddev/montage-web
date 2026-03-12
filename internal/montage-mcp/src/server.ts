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

const getServer = () => {
  const server = new McpServer({
    name: 'Montage, Wanted Design System',
    version,
  });

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
All these components are available in the @montage-ui/core package.

The following components are available in the @montage-ui/core in TypeScript projects:

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
    'montage_coding_guidelines',
    {
      description:
        'Get the guidelines when writing code that uses Montage ui or for UI code that you are creating',
    },
    async () => {
      return {
        content: [
          {
            type: 'text',
            text: `When writing code that uses Montage ui, follow these guidelines:

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

You can import \`css\` , \`Theme\` from \`@montage-ui/core\`

For example

\`\`\`ts
// style.ts
import { css } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

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
import { css } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

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
- When opacity needs to be applied, import and use the \`addOpacity\` utility from \`@montage-ui/core\`.
- Do not use spacing tokens.

## Authoring & Using Components

- Prefer re-using a component from Montage ui when possible over writing a new component.
- Prefer using existing props for a component for styling instead of adding styling to a component
- Prefer using icons from Montage ui instead of creating new icons. Use the \`list_icons\` tool to find the icon you need.
- When using a component from Montage ui, make sure to follow the component's usage and accessibility guidelines

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
        'Retrieve documentation and usage details for a specific React component from the @montage-ui/core package by its name. This tool provides the official Montage ui documentation for any listed component, making it easy to inspect, reuse, or integrate components in your project.',
      inputSchema: z.object({
        name: z
          .string()
          .describe('The name of the component to get documentation for'),
      }),
    },
    async ({ name }) => {
      const components = listComponents();
      const lowerCaseComponentName = name.toLowerCase();
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
              text: `There is no component named \`${name}\` in the @montage-ui/core package. For a full list of components, use the \`list_components\` tool.`,
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
              text: `Failed to fetch the documentation for ${name} usage guide Montage ui.`,
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
              text: `Failed to parse the documentation for ${name} usage guide Montage ui.`,
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
              text: `Failed to parse the documentation for ${name} usage guide Montage ui.`,
            },
          ],
        };
      }

      const text = turndownService.turndown(source);

      return {
        content: [
          {
            type: 'text',
            text: `Here is the documentation for ${name} usage guide Montage ui:

${text}

- If the component supports the \`xs\`, \`sm\`, \`md\`, \`lg\`, and \`xl\` props, you can override its props starting from each corresponding breakpoint and above.
- For information about ThemeColorsToken types, you can use the \`list_tokens\` tool. The token values are strings like \`'semantic.label.normal'\`.
- The \`sx\` prop works the same as Emotion's \`css\` prop.
- For detailed coding guidelines, please use the \`montage_coding_guidelines\` tool.`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'list_icons',
    { description: 'List all of the icons available from Montage ui' },
    async () => {
      return {
        content: [
          {
            type: 'text',
            text: `The following icons are available in the @montage-ui/icon in TypeScript projects:

- ${listIcons().join('\n- ')}

You can use these components from the @montage-ui/icon package.
If you want to change icon size, you can use the \`sx\` prop.
For example, you can use them like this: 

\`\`\`tsx
import { IconBlank } from '@montage-ui/icon';

<IconBlank sx={{ fontSize: '24px' }} />
\`\`\`

And if you want to change icon color, also you can use the \`sx\` prop.
For example, you can use them like this: 

\`\`\`tsx
import { IconBlankColor } from '@montage-ui/icon';

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
    { description: 'List all of the tokens available from Montage ui' },
    async () => {
      return {
        content: [
          {
            type: 'text',
            text: `The following tokens are available in the @montage-ui/core:

${listTokens().join('\n')}

Do not use spacing tokens.

If you want to know more about how to use colors, you can use the \`get_color_usage\` tool for detailed guidance.

You can use these tokens from the @montage-ui/core package.
For example, you can use them like this: 
\`\`\`tsx
import { css } from '@montage-ui/core';
import type { Theme } from '@montage-ui/core';

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
              text: `Failed to fetch the documentation for color usage guide Montage ui.`,
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
              text: `Failed to parse the documentation for color usage guide Montage ui.`,
            },
          ],
        };
      }

      const text = turndownService.turndown(source);

      return {
        content: [
          {
            type: 'text',
            text: `Here is the documentation for color usage guide Montage ui:\n${text}`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'list_utility_functions',
    {
      description:
        'List all of the utility functions available from Montage ui',
    },
    async () => {
      const utilityFunctions = await listUtilityFunctions(version);

      return {
        content: [
          {
            type: 'text',
            text: `The following utility functions are available in the @montage-ui/core:\n- ${utilityFunctions.join('\n- ')}`,
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
              text: `There is no utility function named \`${functionName}\` in the @montage-ui/core package. For a full list of utility functions, use the \`list_utility_functions\` tool.`,
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
              text: `Failed to fetch the documentation for ${functionName} usage guide Montage ui.`,
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
              text: `Failed to parse the documentation for ${functionName} usage guide Montage ui.`,
            },
          ],
        };
      }

      const text = turndownService.turndown(source);

      return {
        content: [
          {
            type: 'text',
            text: `Here is the documentation for ${functionName} usage guide Montage ui:\n${text}`,
          },
        ],
      };
    },
  );

  server.registerTool(
    'getting_started',
    {
      description:
        'Installation steps, and initial configuration guides to help you quickly start using Montage ui in your codebase.',
    },
    () => {
      const content = getGettingStarted();

      return {
        content: [
          {
            type: 'text',
            text: `Here is the documentation for getting started with Montage ui:\n${content}`,
          },
        ],
      };
    },
  );

  return server;
};

export { getServer };
