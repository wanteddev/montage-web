import { visit } from 'unist-util-visit';

import type { Root } from 'mdast';

export const remarkStyle = () => {
  return (tree: Root) => {
    visit(tree, 'mdxJsxFlowElement', (node: any) => {
      const styleAttr = node?.attributes.find(
        (attr: any) => attr.name === 'style',
      );

      if (!styleAttr) {
        return;
      }

      if (typeof styleAttr.value === 'string') {
        const styleObject = styleAttr.value
          .split(';')
          .filter(Boolean)
          .reduce((acc: Record<string, string>, style: string) => {
            const [key, value] = style.split(':').map((s: string) => s.trim());
            if (key && value) {
              const jsxKey = key.replace(
                /-([a-z])/g,
                (_: string, letter: string) => letter.toUpperCase(),
              );
              acc[jsxKey] = value;
            }
            return acc;
          }, {});

        styleAttr.value = {
          type: 'mdxJsxAttributeValueExpression',
          value: styleObject,
          data: {
            estree: {
              type: 'Program',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'ObjectExpression',
                    properties: Object.entries(styleObject).map(
                      ([key, value]) => ({
                        type: 'Property',
                        key: { type: 'Identifier', name: key },
                        value: { type: 'Literal', value: value },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        computed: false,
                      }),
                    ),
                  },
                },
              ],
              sourceType: 'module',
            },
          },
        };
      }
    });
  };
};
