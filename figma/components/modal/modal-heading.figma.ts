// url=<FIGMA_MODAL_HEADING>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalHeading

import figma from 'figma';

import { joinParts } from './modal-helpers';

// `Modal/Resource/Heading` renders the heading part of a `ModalContentItem`
// (the Contents resources wrap it). The Figma "Description" is the small
// secondary text under the title, which is `ModalSummary` in code.
const instance = figma.selectedInstance;
const type = instance.getPropertyValue('Type');

let template;
if (type === 'Heading-Leading' || type === 'Heading-Center') {
  const align = type === 'Heading-Center' ? ' align="center"' : '';
  const heading =
    instance.getBoolean('Heading') === true
      ? instance.getString('┗ Text')
      : undefined;
  // The description text property name ends with two spaces.
  const summary =
    instance.getBoolean('Description') === true
      ? instance.getString('┗ Text  ')
      : undefined;

  // Heading-Leading only: a large icon above, and an info icon before the text.
  const showLarge =
    type === 'Heading-Leading' && instance.getBoolean('Large Icon') === true;
  const showInfo =
    type === 'Heading-Leading' && instance.getBoolean('Info Icon') === true;
  const icons = instance
    .findConnectedInstances((layer) => layer.name === 'Icons/Icons')
    .filter((icon) => icon.type !== 'ERROR');
  const inFrame = (icon: (typeof icons)[number], frame: string) =>
    (icon.path ?? []).includes(frame);
  const hasPaths = icons.some((icon) => (icon.path ?? []).length > 0);
  // Without parent paths, rely on the layer order (Large Icon comes first).
  const largeIcon = hasPaths
    ? icons.find((icon) => inFrame(icon, 'Large Icon'))
    : icons.length > 1 || !showInfo
      ? icons[0]
      : undefined;
  const infoIcon = hasPaths
    ? icons.find((icon) => inFrame(icon, 'Icon'))
    : icons.length > 1
      ? icons[1]
      : showInfo
        ? icons[0]
        : undefined;

  const texts = joinParts([
    heading
      ? figma.tsx`<ModalHeading${align}>${heading}</ModalHeading>`
      : undefined,
    summary
      ? figma.tsx`<ModalSummary${align}>${summary}</ModalSummary>`
      : undefined,
  ]);
  const body =
    showInfo && infoIcon
      ? figma.tsx`<FlexBox gap="8px">
  ${infoIcon.executeTemplate().example}
  <FlexBox flexDirection="column" gap="8px">
${texts ?? ''}
  </FlexBox>
</FlexBox>`
      : texts;

  const names = [
    ...(heading ? ['ModalHeading'] : []),
    ...(summary ? ['ModalSummary'] : []),
    ...(showInfo && infoIcon ? ['FlexBox'] : []),
  ];

  template = {
    id: 'ModalHeading',
    imports: names.length
      ? [`import { ${names.sort().join(', ')} } from '@montage-ui/core';`]
      : [],
    example:
      joinParts([
        showLarge && largeIcon
          ? largeIcon.executeTemplate().example
          : undefined,
        body,
      ]) ?? figma.code``,
    metadata: { nestable: true },
  };
} else {
  // Type=Slot is a free area for custom content.
  template = {
    id: 'ModalHeading',
    imports: [],
    example: figma.code`{/* 콘텐츠 */}`,
    metadata: { nestable: true },
  };
}

export default template;
