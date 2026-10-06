// url=<FIGMA_SNACKBAR>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/snackbar/index.tsx
// component=Snackbar

import figma from 'figma';

const showHeading = figma.selectedInstance.getBoolean('Heading') === true;

// Branch per variant; unmatched combinations render no snippet.

let template;
if (
  figma.selectedInstance.getPropertyValue('Leading Icon') === true &&
  figma.selectedInstance.getPropertyValue('Description') === true
) {
  const heading = figma.selectedInstance.getString('┗ Text');
  const description = figma.selectedInstance.getString('┗ Text​');
  const action = (function () {
    const nestedLayer15 = figma.selectedInstance.findInstance('Button');
    return {
      label:
        nestedLayer15.type !== 'ERROR'
          ? nestedLayer15.getString('Label')
          : undefined,
    };
  })();
  const closeButton = figma.selectedInstance.getBoolean('Close Button', {
    true: figma.helpers.react.jsxElement('<SnackbarCloseButton />'),
    false: undefined,
  });
  const icon = figma.properties.children(['Icon']);
  const __props: Record<string, unknown> = {};
  if (heading && heading.type !== 'ERROR') {
    __props['heading'] = heading;
  }
  if (description && description.type !== 'ERROR') {
    __props['description'] = description;
  }
  if (action && action.type !== 'ERROR') {
    __props['action'] = action;
  }
  if (closeButton && closeButton.type !== 'ERROR') {
    __props['closeButton'] = closeButton;
  }
  if (icon && icon.type !== 'ERROR') {
    __props['icon'] = icon;
  }

  template = {
    id: 'Snackbar',
    imports: [
      "import { Snackbar, SnackbarAction, SnackbarCloseButton, SnackbarContent, SnackbarDescription, SnackbarExtraContent, SnackbarHeading } from '@montage-ui/core';",
    ],
    example: figma.code`<Snackbar>
      <SnackbarContent extraContent={<SnackbarExtraContent>${figma.helpers.react.renderChildren(
        icon,
      )}</SnackbarExtraContent>}>
        ${
          showHeading
            ? figma.code`<SnackbarHeading>${figma.helpers.react.renderChildren(
                heading,
              )}</SnackbarHeading>`
            : ''
        }
        <SnackbarDescription>${figma.helpers.react.renderChildren(
          description,
        )}</SnackbarDescription>
      </SnackbarContent>
      <SnackbarAction>${figma.helpers.react.renderChildren(
        action.label,
      )}</SnackbarAction>
      ${figma.helpers.react.renderChildren(closeButton)}
    </Snackbar>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Leading Icon') === true &&
  figma.selectedInstance.getPropertyValue('Description') === false
) {
  const heading = figma.selectedInstance.getString('┗ Text');
  const action = (function () {
    const nestedLayer16 = figma.selectedInstance.findInstance('Button');
    return {
      label:
        nestedLayer16.type !== 'ERROR'
          ? nestedLayer16.getString('Label')
          : undefined,
    };
  })();
  const closeButton = figma.selectedInstance.getBoolean('Close Button', {
    true: figma.helpers.react.jsxElement('<SnackbarCloseButton />'),
    false: undefined,
  });
  const icon = figma.properties.children(['Icon']);
  const __props: Record<string, unknown> = {};
  if (heading && heading.type !== 'ERROR') {
    __props['heading'] = heading;
  }
  if (action && action.type !== 'ERROR') {
    __props['action'] = action;
  }
  if (closeButton && closeButton.type !== 'ERROR') {
    __props['closeButton'] = closeButton;
  }
  if (icon && icon.type !== 'ERROR') {
    __props['icon'] = icon;
  }

  template = {
    id: 'Snackbar',
    imports: [
      "import { Snackbar, SnackbarAction, SnackbarCloseButton, SnackbarContent, SnackbarExtraContent, SnackbarHeading } from '@montage-ui/core';",
    ],
    example: figma.code`<Snackbar>
      <SnackbarContent extraContent={<SnackbarExtraContent>${figma.helpers.react.renderChildren(
        icon,
      )}</SnackbarExtraContent>}>
        ${
          showHeading
            ? figma.code`<SnackbarHeading>${figma.helpers.react.renderChildren(
                heading,
              )}</SnackbarHeading>`
            : ''
        }
      </SnackbarContent>
      <SnackbarAction>${figma.helpers.react.renderChildren(
        action.label,
      )}</SnackbarAction>
      ${figma.helpers.react.renderChildren(closeButton)}
    </Snackbar>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Leading Icon') === false &&
  figma.selectedInstance.getPropertyValue('Description') === true
) {
  const heading = figma.selectedInstance.getString('┗ Text');
  const description = figma.selectedInstance.getString('┗ Text​');
  const action = (function () {
    const nestedLayer17 = figma.selectedInstance.findInstance('Button');
    return {
      label:
        nestedLayer17.type !== 'ERROR'
          ? nestedLayer17.getString('Label')
          : undefined,
    };
  })();
  const closeButton = figma.selectedInstance.getBoolean('Close Button', {
    true: figma.helpers.react.jsxElement('<SnackbarCloseButton />'),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (heading && heading.type !== 'ERROR') {
    __props['heading'] = heading;
  }
  if (description && description.type !== 'ERROR') {
    __props['description'] = description;
  }
  if (action && action.type !== 'ERROR') {
    __props['action'] = action;
  }
  if (closeButton && closeButton.type !== 'ERROR') {
    __props['closeButton'] = closeButton;
  }

  template = {
    id: 'Snackbar',
    imports: [
      "import { Snackbar, SnackbarAction, SnackbarCloseButton, SnackbarContent, SnackbarDescription, SnackbarHeading } from '@montage-ui/core';",
    ],
    example: figma.code`<Snackbar>
      <SnackbarContent>
        ${
          showHeading
            ? figma.code`<SnackbarHeading>${figma.helpers.react.renderChildren(
                heading,
              )}</SnackbarHeading>`
            : ''
        }
        <SnackbarDescription>${figma.helpers.react.renderChildren(
          description,
        )}</SnackbarDescription>
      </SnackbarContent>
      <SnackbarAction>${figma.helpers.react.renderChildren(
        action.label,
      )}</SnackbarAction>
      ${figma.helpers.react.renderChildren(closeButton)}
    </Snackbar>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Leading Icon') === false &&
  figma.selectedInstance.getPropertyValue('Description') === false
) {
  const heading = figma.selectedInstance.getString('┗ Text');
  const action = (function () {
    const nestedLayer18 = figma.selectedInstance.findInstance('Button');
    return {
      label:
        nestedLayer18.type !== 'ERROR'
          ? nestedLayer18.getString('Label')
          : undefined,
    };
  })();
  const closeButton = figma.selectedInstance.getBoolean('Close Button', {
    true: figma.helpers.react.jsxElement('<SnackbarCloseButton />'),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (heading && heading.type !== 'ERROR') {
    __props['heading'] = heading;
  }
  if (action && action.type !== 'ERROR') {
    __props['action'] = action;
  }
  if (closeButton && closeButton.type !== 'ERROR') {
    __props['closeButton'] = closeButton;
  }

  template = {
    id: 'Snackbar',
    imports: [
      "import { Snackbar, SnackbarAction, SnackbarCloseButton, SnackbarContent, SnackbarHeading } from '@montage-ui/core';",
    ],
    example: figma.code`<Snackbar>
      <SnackbarContent>
        ${
          showHeading
            ? figma.code`<SnackbarHeading>${figma.helpers.react.renderChildren(
                heading,
              )}</SnackbarHeading>`
            : ''
        }
      </SnackbarContent>
      <SnackbarAction>${figma.helpers.react.renderChildren(
        action.label,
      )}</SnackbarAction>
      ${figma.helpers.react.renderChildren(closeButton)}
    </Snackbar>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'Snackbar',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
