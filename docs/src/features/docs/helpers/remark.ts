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

// export const remarkTable = () => {
//   return (tree: Root) => {
//     visit(tree, 'table', (node: any) => {
//       const tableHead = node.children.at(0);

//       if (!tableHead) {
//         return;
//       }

//       const tableHeadLabels = tableHead.children
//         .filter((child: any) => child.type === 'tableCell')
//         .map((child: any) => {
//           const label = child.children.at(0).value;

//           return label as string;
//         });

//       const PROPERTY_NAME = ['Name', '이름', '값'];

//       const TYPE_NAME = ['Type', '타입'];

//       if (
//         tableHeadLabels.some((label: string) => PROPERTY_NAME.includes(label))
//       ) {
//         const propertyIndex = tableHeadLabels.findIndex((label: string) =>
//           PROPERTY_NAME.includes(label),
//         );

//         if (propertyIndex !== -1) {
//           const [_, ...rows] = node.children;

//           rows.forEach((row: any) => {
//             // const [property, type, description] = row.children;
//             row.children.forEach((cell: any) => {
//               console.log(cell.children.at(0));
//               cell.children[0] = {
//                 type: 'mdxJsxFlowElement',
//                 value: 'span',
//               };
//             });
//             // console.log(property, type, description);
//           });
//         }
//       }

//       console.log(tableHeadLabels);
//       // const name = tableHead.children.at(0);
//     });
//   };
// };
