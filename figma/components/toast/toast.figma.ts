// url=<FIGMA_TOAST>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/toast/index.tsx
// component=Toast

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (
  figma.selectedInstance.getPropertyValue('Variant') === 'Normal' &&
  figma.selectedInstance.getPropertyValue('Leading Icon') === true
) {
  const text = figma.selectedInstance.getString('Text');
  const icon = figma.properties.children(['Icon']);
  const __props: Record<string, unknown> = {};
  if (text && text.type !== 'ERROR') {
    __props['text'] = text;
  }
  if (icon && icon.type !== 'ERROR') {
    __props['icon'] = icon;
  }

  template = {
    id: 'Toast',
    imports: [
      "import { Toast, ToastContainer, ToastContent, ToastIcon } from '@montage-ui/core';",
    ],
    example: figma.code`<Toast variant="normal">
      <ToastContainer>
        <ToastIcon>${figma.helpers.react.renderChildren(icon)}</ToastIcon>
        <ToastContent>${figma.helpers.react.renderChildren(text)}</ToastContent>
      </ToastContainer>
    </Toast>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Variant') === 'Normal' &&
  figma.selectedInstance.getPropertyValue('Leading Icon') === false
) {
  const text = figma.selectedInstance.getString('Text');
  const __props: Record<string, unknown> = {};
  if (text && text.type !== 'ERROR') {
    __props['text'] = text;
  }

  template = {
    id: 'Toast',
    imports: [
      "import { Toast, ToastContainer, ToastContent } from '@montage-ui/core';",
    ],
    example: figma.code`<Toast variant="normal">
      <ToastContainer>
        <ToastContent>${figma.helpers.react.renderChildren(text)}</ToastContent>
      </ToastContainer>
    </Toast>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Positive') {
  const text = figma.selectedInstance.getString('Text');
  const icon = figma.selectedInstance.getBoolean('Leading Icon', {
    true: figma.helpers.react.jsxElement('<ToastIcon />'),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (text && text.type !== 'ERROR') {
    __props['text'] = text;
  }
  if (icon && icon.type !== 'ERROR') {
    __props['icon'] = icon;
  }

  template = {
    id: 'Toast',
    imports: [
      "import { Toast, ToastContainer, ToastContent, ToastIcon } from '@montage-ui/core';",
    ],
    example: figma.code`<Toast variant="positive">
      <ToastContainer>
        ${figma.helpers.react.renderChildren(icon)}
        <ToastContent>${figma.helpers.react.renderChildren(text)}</ToastContent>
      </ToastContainer>
    </Toast>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Variant') === 'Cautionary'
) {
  const text = figma.selectedInstance.getString('Text');
  const icon = figma.selectedInstance.getBoolean('Leading Icon', {
    true: figma.helpers.react.jsxElement('<ToastIcon />'),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (text && text.type !== 'ERROR') {
    __props['text'] = text;
  }
  if (icon && icon.type !== 'ERROR') {
    __props['icon'] = icon;
  }

  template = {
    id: 'Toast',
    imports: [
      "import { Toast, ToastContainer, ToastContent, ToastIcon } from '@montage-ui/core';",
    ],
    example: figma.code`<Toast variant="cautionary">
      <ToastContainer>
        ${figma.helpers.react.renderChildren(icon)}
        <ToastContent>${figma.helpers.react.renderChildren(text)}</ToastContent>
      </ToastContainer>
    </Toast>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Negative') {
  const text = figma.selectedInstance.getString('Text');
  const icon = figma.selectedInstance.getBoolean('Leading Icon', {
    true: figma.helpers.react.jsxElement('<ToastIcon />'),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (text && text.type !== 'ERROR') {
    __props['text'] = text;
  }
  if (icon && icon.type !== 'ERROR') {
    __props['icon'] = icon;
  }

  template = {
    id: 'Toast',
    imports: [
      "import { Toast, ToastContainer, ToastContent, ToastIcon } from '@montage-ui/core';",
    ],
    example: figma.code`<Toast variant="negative">
      <ToastContainer>
        ${figma.helpers.react.renderChildren(icon)}
        <ToastContent>${figma.helpers.react.renderChildren(text)}</ToastContent>
      </ToastContainer>
    </Toast>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'Toast',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
