// url=<FIGMA_SECTION_MESSAGE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/section-message/index.tsx
// component=SectionMessage

import figma from 'figma';

const instance = figma.selectedInstance;

const variant = instance.getEnum('Variant', {
  Custom: 'custom',
  Info: 'info',
  Positive: 'positive',
  Cautionary: 'cautionary',
  Negative: 'negative',
});
const heading = instance.getString('Heading');
const description =
  instance.getBoolean('Description') === true
    ? instance.getString('┗ Label')
    : undefined;
const closeButton = instance.getBoolean('Close Button') === true;
// The Figma property name starts with a backspace character (U+0008).
const leadingContent =
  instance.getBoolean('\u0008Leading Icon') === true
    ? figma.properties.children(['Icon'])
    : undefined;

// Both button areas hold the same `Text Button/Text Button` layers (Primary +
// Assistive), so they are told apart by their parent frame:
// `Action Area` → `bottomButton`, `\u0008Trailing Content` → `trailingButton`.
const showTrailing = instance.getBoolean('Trailing Button') === true;
const showBottom = instance.getBoolean('Bottom Button') === true;
const buttons = instance.findConnectedInstances(
  (layer) => layer.name === 'Text Button/Text Button',
);
const inFrame = (button: (typeof buttons)[number], frame: string) =>
  button.type !== 'ERROR' &&
  (button.path ?? []).some((name) => name.includes(frame));
const hasPaths = buttons.some(
  (button) => button.type !== 'ERROR' && (button.path ?? []).length > 0,
);

// Without parent paths, fall back to the visibility toggles and the layer
// order (Action Area comes before Trailing Content in the component).
let bottomButtons = buttons.filter((button) => inFrame(button, 'Action Area'));
let trailingButtons = buttons.filter((button) =>
  inFrame(button, 'Trailing Content'),
);
if (!hasPaths) {
  const half = Math.ceil(buttons.length / 2);
  bottomButtons = showBottom
    ? showTrailing && buttons.length > 2
      ? buttons.slice(0, half)
      : buttons
    : [];
  trailingButtons = showTrailing
    ? showBottom && buttons.length > 2
      ? buttons.slice(half)
      : buttons
    : [];
}

const renderButtons = (list: typeof buttons) => {
  const rendered = list
    .filter((button) => button.type !== 'ERROR')
    .map((button) => button.executeTemplate().example);
  if (rendered.length === 0) {
    return undefined;
  }
  return rendered.length === 1
    ? figma.tsx`${rendered[0]}`
    : figma.tsx`<>
    ${rendered.reduce(
      (joined, example) => figma.tsx`${joined}
    ${example}`,
    )}
  </>`;
};

const trailingButton = showTrailing
  ? renderButtons(trailingButtons)
  : undefined;
const bottomButton = showBottom ? renderButtons(bottomButtons) : undefined;

const prop = (name: string, value: unknown) =>
  value
    ? figma.tsx`
  ${name}={${value}}`
    : '';

export default {
  id: 'SectionMessage',
  imports: ["import { SectionMessage } from '@montage-ui/core';"],
  example: figma.tsx`<SectionMessage${variant ? ` variant="${variant}"` : ''}${
    description ? ` description=${JSON.stringify(description)}` : ''
  }${closeButton ? ' closeButton' : ''}${figma.helpers.react.renderProp(
    'leadingContent',
    leadingContent,
  )}${prop('trailingButton', trailingButton)}${prop(
    'bottomButton',
    bottomButton,
  )}>
  ${heading}
</SectionMessage>`,
  metadata: { nestable: true },
};
