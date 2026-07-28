import { elementType, getLiteralPropValue, getProp } from 'jsx-ast-utils';

import { WdsImportParser } from '../../helpers/ast';
import { isHidden, isPresentationRole } from '../../helpers/accessibility';

import type { Node } from 'estree';
import type { JSXElement, JSXOpeningElement } from 'estree-jsx';
import type { Rule } from 'eslint';

const ROOT_COMPONENT = 'SegmentedControl';
const ITEM_COMPONENT = 'SegmentedControlItem';

export default {
  meta: {
    docs: {
      url: 'https://github.com/wanteddev/montage-web/tree/main/packages/eslint-plugin/README.md#segmented-control-item-uses-name',
      description:
        'Required aria-label prop for SegmentedControlItem inside an iconOnly SegmentedControl',
    },
    messages: {
      error:
        'For accessibility, please provide an aria-label attribute — the item text is not rendered when the SegmentedControl is iconOnly.',
    },
  },

  create: (context) => {
    const importParser = new WdsImportParser();
    // Tracks nesting inside iconOnly <SegmentedControl> elements. A stack (not a
    // flag) so items inside a nested non-iconOnly control are judged against the
    // NEAREST root, and map-rendered items are still covered (AST traversal keeps
    // the stack alive through arbitrary expression nesting).
    const iconOnlyStack: Array<boolean> = [];

    const isSegmentedControlRoot = (node: JSXElement) => {
      const name = importParser.getComponentName(node.openingElement as Node);

      return (
        importParser.isWdsComponent(name) &&
        importParser.resolveImportedName(name) === ROOT_COMPONENT
      );
    };

    return {
      ImportDeclaration(node) {
        importParser.saveImportDeclaration(node);
      },
      JSXElement: (estreeNode: Node) => {
        const node = estreeNode as unknown as JSXElement;

        if (!isSegmentedControlRoot(node)) {
          return;
        }

        const iconOnlyProp = getProp(
          node.openingElement.attributes,
          'iconOnly',
        );
        const iconOnlyValue = iconOnlyProp
          ? getLiteralPropValue(iconOnlyProp)
          : null;

        iconOnlyStack.push(iconOnlyValue === true);
      },
      'JSXElement:exit': (estreeNode: Node) => {
        const node = estreeNode as unknown as JSXElement;

        if (isSegmentedControlRoot(node)) {
          iconOnlyStack.pop();
        }
      },
      JSXOpeningElement: (node: Node) => {
        if (iconOnlyStack[iconOnlyStack.length - 1] !== true) {
          return;
        }

        const name = importParser.getComponentName(node);

        if (
          !importParser.isWdsComponent(name) ||
          importParser.resolveImportedName(name) !== ITEM_COMPONENT
        ) {
          return;
        }

        const element = node as JSXOpeningElement;

        if (
          isHidden(elementType(element), element.attributes) ||
          isPresentationRole(element.attributes)
        ) {
          return;
        }

        const ariaLabelProp = getProp(element.attributes, 'aria-label');
        const ariaLabelledByProp = getProp(
          element.attributes,
          'aria-labelledby',
        );

        if (Boolean(ariaLabelProp) || Boolean(ariaLabelledByProp)) {
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
