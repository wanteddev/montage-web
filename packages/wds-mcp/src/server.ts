import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import TurndownService from 'turndown';
import * as cheerio from 'cheerio';
import * as z from 'zod';

import { version } from '../package.json';

import {
  getComponentUrl,
  getUtilityFunctionUrl,
  listComponents,
  listIcons,
  listTokens,
  listUtilityFunctions,
} from './helpers';
import { DOCS_COLOR_USAGE_URL, DOCS_SELECTOR } from './constants';

const server = new McpServer({
  name: 'WDS, Wanted Design System',
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
          text: `The following components are available in the @wanteddev/wds in TypeScript projects:
				
${components
  .map((component) =>
    component.subComponents.length > 0
      ? `- ${component.name}
  - ${component.subComponents.join('\n  - ')}`
      : `- ${component.name}`,
  )
  .join('\n')}
				
				You can use the \`get_component\` tool to obtain more information about a specific component. For even more comprehensive details, try entering a parent component rather than a subcomponent. All of these components are available from the @wanteddev/wds package.`,
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

    const fetchUrl = await getComponentUrl(match.name);

    if (!fetchUrl) {
      return {
        content: [],
      };
    }

    const response = await fetch(fetchUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch - ${response.statusText}`);
    }

    const html = await response.text();

    if (!html) {
      return {
        content: [],
      };
    }

    const $ = cheerio.load(html);
    const source = $(DOCS_SELECTOR).html();

    if (!source) {
      return {
        content: [],
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
  { description: 'List all of the components available from WDS' },
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

- ${listTokens().join('\n')}

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
    const response = await fetch(DOCS_COLOR_USAGE_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch - ${response.statusText}`);
    }

    const html = await response.text();

    if (!html) {
      return {
        content: [],
      };
    }

    const $ = cheerio.load(html);
    const source = $('[data-algolia-page-scope="true"]').html();

    if (!source) {
      return {
        content: [],
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
    const utilityFunctions = await listUtilityFunctions();

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
        .describe('The name of the utility function to get documentation for'),
    }),
  },
  async ({ functionName }) => {
    const fetchUrl = await getUtilityFunctionUrl(functionName);

    if (!fetchUrl) {
      return {
        content: [],
      };
    }

    const response = await fetch(fetchUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch - ${response.statusText}`);
    }

    const html = await response.text();

    if (!html) {
      return {
        content: [],
      };
    }

    const $ = cheerio.load(html);
    const source = $(DOCS_SELECTOR).html();

    if (!source) {
      return {
        content: [],
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

export { server };
