import { elementType, getLiteralPropValue, getProp } from 'jsx-ast-utils';

import { WdsImportParser } from '../../helpers/ast';
import { isHidden, isPresentationRole } from '../../helpers/accessibility';

import type { Node } from 'estree';
import type { JSXOpeningElement } from 'estree-jsx';
import type { Rule } from 'eslint';

const TARGET_COMPONENTS = ['Avatar', 'Thumbnail', 'CardThumbnail', 'Box'];

export default {
  meta: {
    docs: {
      url: 'https://github.com/wanteddev/montage-web/tree/main/packages/eslint-plugin-wds/README.md#image-uses-alt',
      description: 'Required alt prop for wds image components',
    },
    messages: {
      error: 'For accessibility, please provide an alt attribute.',
    },
  },

  create: (context) => {
    const importParser = new WdsImportParser();

    return {
      ImportDeclaration(node) {
        importParser.saveImportDeclaration(node);
      },
      JSXOpeningElement: (node: Node) => {
        const name = importParser.getComponentName(node);

        if (
          !importParser.isWdsComponent(name) ||
          !TARGET_COMPONENTS.includes(
            importParser.resolveImportedName(name) ?? '',
          )
        ) {
          return;
        }

        const element = node as JSXOpeningElement;

        if (name.componentName === 'Box') {
          const asProp = getProp(element.attributes, 'as');
          const asValue = asProp ? getLiteralPropValue(asProp) : null;

          if (asValue !== 'img') {
            return;
          }
        }

        if (
          isHidden(elementType(element), element.attributes) ||
          isPresentationRole(element.attributes)
        ) {
          return;
        }

        const altProp = getProp(element.attributes, 'alt');

        if (Boolean(altProp)) {
          return;
        }

        context.report({
          node,
          messageId: 'error',
        });
      },
    };
  },
} satisfies Rule.RuleModule;
