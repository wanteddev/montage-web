import fs from 'node:fs';
import path from 'node:path';

import { visit } from 'unist-util-visit';

import type { ComponentInfo } from '../types';
import type {
  MdxJsxAttribute,
  MdxJsxAttributeValueExpression,
} from 'mdast-util-mdx-jsx';
import type {
  InlineCode,
  Paragraph,
  PhrasingContent,
  Root,
  Table,
  TableCell,
  Text,
} from 'mdast';

/**
 * @description jsx 구문으로 작성되지 않은 style을 객체 형태로 변환한다.
 */
export const remarkStyle = () => {
  return (tree: Root) => {
    visit(tree, 'mdxJsxFlowElement', (node) => {
      const styleAttr = node.attributes.find(
        (attr) => attr.type === 'mdxJsxAttribute' && attr.name === 'style',
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
          value: JSON.stringify(styleObject),
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

const getLabel = (
  children: Array<PhrasingContent> | PhrasingContent,
): string => {
  if (!Array.isArray(children)) {
    if (!children.type.includes('mdxJsx')) {
      return (children as Text).value;
    }
  }

  if (Array.isArray(children) && children.length === 1) {
    if (!children.at(0)?.type.includes('mdxJsx')) {
      return (children.at(0) as Text).value;
    }

    return getLabel((children.at(0) as unknown as Paragraph).children);
  }

  return (children as Array<PhrasingContent>)
    .map((child) => `${getLabel(child)}`)
    .join('');
};

const makeSpanWithProperty = (
  cell: TableCell,
  properties: Record<string, Record<string, string> | string> = {},
): PhrasingContent => {
  return {
    type: 'mdxJsxTextElement',
    name: 'span',
    children: [
      {
        type: 'text',
        value: getLabel(cell.children),
      },
    ],
    attributes: Object.entries(properties).map(([key, value]) => {
      return typeof value === 'string'
        ? ({
            type: 'mdxJsxAttribute',
            name: key,
            value,
          } as MdxJsxAttribute)
        : {
            type: 'mdxJsxAttribute',
            name: key,
            value: {
              type: 'mdxJsxAttributeValueExpression',
              value: JSON.stringify(value),
              data: {
                estree: {
                  type: 'Program',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'ObjectExpression',
                        properties: Object.entries(value).map(
                          ([propertyKey, propertyValue]) => ({
                            type: 'Property',
                            key: { type: 'Identifier', name: propertyKey },
                            value: { type: 'Literal', value: propertyValue },
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
            } as MdxJsxAttributeValueExpression,
          };
    }),
  };
};

const makeInlineCode = (cell: TableCell) => {
  return {
    type: 'inlineCode',
    value: getLabel(cell.children),
  } as InlineCode;
};

const PROPERTY_NAME = ['name', '이름', '값', 'value', 'parameter', '파라미터'];
const TYPE_NAME = ['type', 'types', '타입'];

/**
 * @description 테이블 헤더에서 속성과 타입을 추출하여 속성 타입 컬럼을 생성한다.
 */
export const remarkTable = () => {
  return (tree: Root) => {
    visit(tree, 'table', (node: Table) => {
      const tableHead = node.children.at(0);

      if (!tableHead) {
        return;
      }

      const tableHeadLabels = tableHead.children
        .filter((child: any) => child.type === 'tableCell')
        .map((child: any) => getLabel(child.children));

      const isProperty = (label: string) =>
        PROPERTY_NAME.includes(label.toLowerCase());
      const isType = (label: string) => TYPE_NAME.includes(label.toLowerCase());

      const apiTableHeadLabels = tableHeadLabels.find(
        (label: string) => isProperty(label) || isType(label),
      );

      if (Boolean(apiTableHeadLabels)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, ...rows] = node.children;

        const propertyIndex = tableHeadLabels.findIndex((label) =>
          isProperty(label),
        );
        const typeIndex = tableHeadLabels.findIndex((label) => isType(label));

        rows.forEach((row) => {
          row.children.map((cell, index) => {
            if (index === propertyIndex) {
              cell.children = [makeInlineCode(cell)];
            }

            if (index === typeIndex) {
              cell.children = [
                makeSpanWithProperty(cell, {
                  'data-role': 'property-type',
                }),
              ];
            }
          });
        });
      }
    });
  };
};

const makeProperty = (name: string, value: string | boolean | undefined) => {
  return {
    type: 'Property',
    key: { type: 'Identifier', name },
    value: { type: 'Literal', value },
    kind: 'init',
    method: false,
    shorthand: false,
    computed: false,
  };
};

/**
 * @description PropsTable 컴포넌트에서 fallback 속성을 추출하여 속성 테이블에 적용한다.
 */
export const remarkPropsTable = () => {
  return (tree: Root) => {
    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (node.name !== 'PropsTable') {
        return;
      }

      const fallback = node.attributes.find(
        (attr) => attr.type === 'mdxJsxAttribute' && attr.name === 'fallback',
      );
      const name = node.attributes.find(
        (attr) => attr.type === 'mdxJsxAttribute' && attr.name === 'component',
      ) as MdxJsxAttribute | undefined;

      if (Boolean(fallback) || !name) {
        return;
      }

      const apiFilePath = path.join(process.cwd(), '/generated/api.json');

      if (!fs.existsSync(apiFilePath)) {
        console.warn('API file not found. Run pnpm run build:api first.');
        return;
      }

      const components = JSON.parse(
        fs.readFileSync(apiFilePath, 'utf8'),
      ) as Array<ComponentInfo>;

      const api = components.find((component) => component.name === name.value);

      if (Boolean(api)) {
        node.attributes.push({
          type: 'mdxJsxAttribute',
          name: 'fallback',
          value: {
            type: 'mdxJsxAttributeValueExpression',
            value: JSON.stringify(api!.props),
            data: {
              estree: {
                type: 'Program',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'ArrayExpression',
                      elements: api!.props.map((prop) => ({
                        type: 'ObjectExpression',
                        properties: [
                          makeProperty('name', prop.name),
                          makeProperty('type', prop.type),
                          makeProperty('description', prop.description),
                          makeProperty('defaultValue', prop.defaultValue),
                          makeProperty('isOptional', prop.isOptional),
                        ],
                      })),
                    },
                  },
                ],
              },
            },
          },
        } as unknown as MdxJsxAttribute);
      }
    });
  };
};
