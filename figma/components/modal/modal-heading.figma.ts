// url=<FIGMA_MODAL_HEADING>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalHeading

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import { joinParts } from './modal-helpers';

// `Modal/Resource/Heading` renders the heading part of a `ModalContentItem`
// (the Contents resources wrap it). The Figma "Description" is the small
// secondary text under the title, which is `ModalSummary` in code.
const instance = figma.selectedInstance;
const type = instance.getPropertyValue('Type');

let template;
if (type === 'Heading-Leading' || type === 'Heading-Center') {
  const align = type === 'Heading-Center' ? ' align="center"' : '';
  // The title (`┗ Text`) and description (`┗ Text  `) properties collide once the
  // runtime trims property names, so both texts are read from their layers.
  const headingLayer = instance.findText('제목 영역입니다.');
  const summaryLayer = instance.findText(
    '현재 상황에 대한 추가 설명을 덧붙여 사용자에게 정보를 명확히 전달합니다.',
  );
  const heading =
    instance.getBoolean('Heading') === true && headingLayer.type !== 'ERROR'
      ? headingLayer.textContent
      : undefined;
  const summary =
    instance.getBoolean('Description') === true && summaryLayer.type !== 'ERROR'
      ? summaryLayer.textContent
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

  const textParts = [
    heading
      ? figma.tsx`<ModalHeading${align}>${heading}</ModalHeading>`
      : undefined,
    summary
      ? figma.tsx`<ModalSummary${align}>${summary}</ModalSummary>`
      : undefined,
  ].filter(Boolean);
  const texts = joinParts(textParts);
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
    example: (() => {
      // Several top-level siblings are wrapped in a fragment to stay valid JSX.
      const parts = [
        showLarge && largeIcon
          ? largeIcon.executeTemplate().example
          : undefined,
        ...(showInfo && infoIcon ? [body] : textParts),
      ].filter(Boolean);
      if (parts.length === 0) {
        return figma.code``;
      }
      return parts.length === 1
        ? parts[0]
        : figma.tsx`<>
${joinParts(parts)}
</>`;
    })(),
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

export default finalizeTemplate(template);
