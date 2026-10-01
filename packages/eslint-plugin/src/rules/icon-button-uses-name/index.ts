import { elementType, getLiteralPropValue, getProp } from 'jsx-ast-utils';

import { WdsImportParser } from '../../helpers/ast';
import { isHidden, isPresentationRole } from '../../helpers/accessibility';

import type { Node } from 'estree';
import type { JSXOpeningElement } from 'estree-jsx';
import type { Rule } from 'eslint';

const ICON_BUTTON_COMPONENTS = [
  'IconButton',
  'ToggleIcon',
  'ModalNavigationButton',
  'TopNavigationButton',
];

const ICON_ONLY_BUTTON_COMPONENTS = [
  'Button',
  'ActionAreaButton',
  'FallbackViewActionAreaButton',
];

const NAVIGATION_BUTTON_COMPONENTS = [
  'ModalNavigationButton',
  'TopNavigationButton',
];

/** Navigation button variants that render visible text or ship a default `aria-label`. */
const NAMED_NAVIGATION_BUTTON_VARIANTS = [
  'text-button',
  'back-button',
  'close-button',
];

const TARGET_COMPONENTS = [
  ...ICON_BUTTON_COMPONENTS,
  ...ICON_ONLY_BUTTON_COMPONENTS,
];

export default {
  meta: {
    docs: {
      url: 'https://github.com/wanteddev/montage-web/tree/main/packages/eslint-plugin/README.md#icon-button-uses-name',
      description:
        'Required aria-label prop for montage icon button components',
    },
    messages: {
      error: 'For accessibility, please provide an aria-label attribute.',
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

        if (NAVIGATION_BUTTON_COMPONENTS.includes(name.componentName)) {
          const variantProp = getProp(element.attributes, 'variant');
          const variantValue = variantProp
            ? getLiteralPropValue(variantProp)
            : 'icon-button';

          if (
            typeof variantValue !== 'string' ||
            NAMED_NAVIGATION_BUTTON_VARIANTS.includes(variantValue)
          ) {
            return;
          }
        }

        if (ICON_ONLY_BUTTON_COMPONENTS.includes(name.componentName)) {
          const iconOnlyProp = getProp(element.attributes, 'iconOnly');
          const iconOnlyValue = iconOnlyProp
            ? getLiteralPropValue(iconOnlyProp)
            : null;

          if (iconOnlyValue !== true) {
            return;
          }
        }

        if (
          isHidden(elementType(element), element.attributes) ||
          isPresentationRole(element.attributes)
        ) {
          return;
        }

        const ariaLabelProp = getProp(element.attributes, 'aria-label');

        if (Boolean(ariaLabelProp)) {
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
