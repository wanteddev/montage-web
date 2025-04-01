import { findImportDeclaration } from '../helpers';

import type { API, FileInfo, JSXAttribute, Options } from 'jscodeshift';

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);
  let hasChanges = false;

  const wdsImport = root.find(j.ImportDeclaration, {
    source: { value: '@wanteddev/wds' },
  });

  if (wdsImport.length < 0) {
    return file.source;
  }

  // text-field -> text-input
  const textfieldImport = findImportDeclaration(
    'TextField',
    '@wanteddev/wds',
    j,
    root,
  );

  if (textfieldImport) {
    root
      .find(j.Identifier, { name: textfieldImport.imported.name })
      .forEach((textfield) => {
        textfield.value.name = 'TextInput';
      });
    textfieldImport.imported = j.identifier('TextInput');
    hasChanges = true;

    root
      .find(j.JSXOpeningElement, {
        name: { name: textfieldImport.imported.name },
      })
      .forEach((textfield) => {
        const leftIcon = textfield.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'leftIcon',
        ) as JSXAttribute | undefined;

        const rightIcon = textfield.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'rightIcon',
        ) as JSXAttribute | undefined;

        if (Boolean(leftIcon)) {
          leftIcon!.name.name = 'leftContent';
        }
        if (Boolean(rightIcon)) {
          rightIcon!.name.name = 'rightContent';
        }
      });

    hasChanges = true;
  }

  // alert -> section-message
  const alertImport = findImportDeclaration('Alert', '@wanteddev/wds', j, root);

  if (alertImport) {
    root
      .find(j.Identifier, { name: alertImport.imported.name })
      .forEach((alert) => {
        alert.value.name = 'SectionMessage';
      });
    alertImport.imported = j.identifier('SectionMessage');
    hasChanges = true;
  }

  // action-area priority=single -> priority=cancel
  const actionAreaImport = findImportDeclaration(
    'ActionArea',
    '@wanteddev/wds',
    j,
    root,
  );

  if (actionAreaImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: actionAreaImport.imported.name },
      })
      .forEach((actionArea) => {
        const priority = actionArea.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'priority',
        ) as JSXAttribute | undefined;

        if (
          Boolean(priority) &&
          priority!.value?.type === 'JSXExpressionContainer' &&
          priority!.value.expression.type === 'ConditionalExpression'
        ) {
          if (
            (priority!.value.expression.consequent.type === 'Literal' ||
              priority!.value.expression.consequent.type === 'StringLiteral') &&
            priority!.value.expression.consequent.value === 'single'
          ) {
            hasChanges = true;
            priority!.value.expression.consequent.value = 'cancel';
          }

          if (
            (priority!.value.expression.alternate.type === 'Literal' ||
              priority!.value.expression.alternate.type === 'StringLiteral') &&
            priority!.value.expression.alternate.value === 'single'
          ) {
            hasChanges = true;
            priority!.value.expression.alternate.value = 'cancel';
          }
        }

        if (
          Boolean(priority) &&
          (priority!.value?.type === 'Literal' ||
            priority!.value?.type === 'StringLiteral') &&
          priority!.value.value === 'single'
        ) {
          hasChanges = true;
          priority!.value.value = 'cancel';
        }
      });
  }

  // text-area leftIcon,rightIcon -> leftContent,rightContent
  const textAreaImport = findImportDeclaration(
    'ContentBadge',
    '@wanteddev/wds',
    j,
    root,
  );

  if (textAreaImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: textAreaImport.imported.name },
      })
      .forEach((textArea) => {
        const leftIcon = textArea.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'leftIcon',
        ) as JSXAttribute | undefined;

        const rightIcon = textArea.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'rightIcon',
        ) as JSXAttribute | undefined;

        if (Boolean(leftIcon)) {
          hasChanges = true;
          leftIcon!.name.name = 'leftContent';
        }
        if (Boolean(rightIcon)) {
          hasChanges = true;
          rightIcon!.name.name = 'rightContent';
        }
      });
  }

  // content-badge leftIcon,rightIcon -> leftContent,rightContent
  const contentBadgeImport = findImportDeclaration(
    'ContentBadge',
    '@wanteddev/wds',
    j,
    root,
  );

  if (contentBadgeImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: contentBadgeImport.imported.name },
      })
      .forEach((contentBadge) => {
        const leftIcon = contentBadge.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'leftIcon',
        ) as JSXAttribute | undefined;

        const rightIcon = contentBadge.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'rightIcon',
        ) as JSXAttribute | undefined;

        if (Boolean(leftIcon)) {
          hasChanges = true;
          leftIcon!.name.name = 'leftContent';
        }
        if (Boolean(rightIcon)) {
          hasChanges = true;
          rightIcon!.name.name = 'rightContent';
        }
      });
  }

  // action-area-button leftIcon,rightIcon -> leftContent,rightContent
  const actionAreaButtonImport = findImportDeclaration(
    'ActionAreaButton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (actionAreaButtonImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: actionAreaButtonImport.imported.name },
      })
      .forEach((actionAreaButton) => {
        const leftIcon = actionAreaButton.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'leftIcon',
        ) as JSXAttribute | undefined;

        const rightIcon = actionAreaButton.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'rightIcon',
        ) as JSXAttribute | undefined;

        if (Boolean(leftIcon)) {
          hasChanges = true;
          leftIcon!.name.name = 'leftContent';
        }
        if (Boolean(rightIcon)) {
          hasChanges = true;
          rightIcon!.name.name = 'rightContent';
        }
      });
  }

  // text-button leftIcon,rightIcon -> leftContent,rightContent
  const textButtonImport = findImportDeclaration(
    'TextButton',
    '@wanteddev/wds',
    j,
    root,
  );

  if (textButtonImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: textButtonImport.imported.name },
      })
      .forEach((textButton) => {
        const leftIcon = textButton.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'leftIcon',
        ) as JSXAttribute | undefined;

        const rightIcon = textButton.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'rightIcon',
        ) as JSXAttribute | undefined;

        if (Boolean(leftIcon)) {
          hasChanges = true;
          leftIcon!.name.name = 'leftContent';
        }
        if (Boolean(rightIcon)) {
          hasChanges = true;
          rightIcon!.name.name = 'rightContent';
        }
      });
  }

  // button leftIcon,rightIcon -> leftContent,rightContent
  const buttonImport = findImportDeclaration(
    'Button',
    '@wanteddev/wds',
    j,
    root,
  );

  if (buttonImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: buttonImport.imported.name },
      })
      .forEach((button) => {
        const leftIcon = button.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'leftIcon',
        ) as JSXAttribute | undefined;

        const rightIcon = button.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'rightIcon',
        ) as JSXAttribute | undefined;

        if (Boolean(leftIcon)) {
          hasChanges = true;
          leftIcon!.name.name = 'leftContent';
        }
        if (Boolean(rightIcon)) {
          hasChanges = true;
          rightIcon!.name.name = 'rightContent';
        }
      });
  }

  // chipAction leftIcon,rightIcon -> leftContent,rightContent
  const chipActionImport = findImportDeclaration(
    'ChipAction',
    '@wanteddev/wds',
    j,
    root,
  );

  if (chipActionImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: chipActionImport.imported.name },
      })
      .forEach((chipAction) => {
        const leftIcon = chipAction.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'leftIcon',
        ) as JSXAttribute | undefined;

        const rightIcon = chipAction.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'rightIcon',
        ) as JSXAttribute | undefined;

        if (Boolean(leftIcon)) {
          hasChanges = true;
          leftIcon!.name.name = 'leftContent';
        }
        if (Boolean(rightIcon)) {
          hasChanges = true;
          rightIcon!.name.name = 'rightContent';
        }
      });
  }

  // TabList rightIcon -> rightContent
  const tabListImport = findImportDeclaration(
    'TabList',
    '@wanteddev/wds',
    j,
    root,
  );

  if (tabListImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: tabListImport.imported.name },
      })
      .forEach((tabList) => {
        const rightIcon = tabList.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'rightIcon',
        ) as JSXAttribute | undefined;

        if (Boolean(rightIcon)) {
          hasChanges = true;
          rightIcon!.name.name = 'rightContent';
        }
      });
  }

  // ModalNavigation leftButton,rightButton -> leftContent,rightContent
  const modalNavigationImport = findImportDeclaration(
    'ModalNavigation',
    '@wanteddev/wds',
    j,
    root,
  );

  if (modalNavigationImport) {
    root
      .find(j.JSXOpeningElement, {
        name: { name: modalNavigationImport.imported.name },
      })
      .forEach((modalNavigation) => {
        const leftButton = modalNavigation.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'leftButton',
        ) as JSXAttribute | undefined;

        const rightButton = modalNavigation.value.attributes?.find(
          (v) => v.type === 'JSXAttribute' && v.name.name === 'rightButton',
        ) as JSXAttribute | undefined;

        if (Boolean(leftButton)) {
          hasChanges = true;
          leftButton!.name.name = 'leftContent';
        }

        if (Boolean(rightButton)) {
          hasChanges = true;
          rightButton!.name.name = 'rightContent';
        }
      });
  }

  // ModalNavigationAction -> ModalNavigationButton
  const modalNavigationActionImport = findImportDeclaration(
    'ModalNavigationAction',
    '@wanteddev/wds',
    j,
    root,
  );

  if (modalNavigationActionImport) {
    root
      .find(j.Identifier, { name: modalNavigationActionImport.imported.name })
      .forEach((modalNavigationAction) => {
        modalNavigationAction.value.name = 'ModalNavigationButton';
      });
    modalNavigationActionImport.imported = j.identifier(
      'ModalNavigationButton',
    );
    hasChanges = true;
  }

  // modal-navigation -> top-navigation 스타일
  root.find(j.TemplateElement).forEach((path) => {
    if (path.node.value.raw.includes('[wds-component="modal-navigation"]')) {
      hasChanges = true;
      path.node.value.raw = path.node.value.raw.replace(
        '[wds-component="modal-navigation"]',
        '[wds-component="top-navigation"]',
      );
    }
  });

  // modal-navigation -> top-navigation 스타일
  root.find(j.ObjectProperty).forEach((path) => {
    if (
      path.value.key.type === 'StringLiteral' &&
      path.value.key.value.includes('wds-component="modal-navigation"')
    ) {
      hasChanges = true;
      path.value.key.value = path.value.key.value.replace(
        'wds-component="modal-navigation"',
        'wds-component="top-navigation"',
      );
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
