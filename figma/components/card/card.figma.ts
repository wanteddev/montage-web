// url=<FIGMA_CARD>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/card/index.tsx
// component=Card

import figma from 'figma';

import { buildImports, renderRow, renderSaveToggle } from './card-content';

const instance = figma.selectedInstance;
const text = (show: string, propName: string) =>
  instance.getBoolean(show) === true ? instance.getString(propName) : undefined;

let template;
if (instance.getPropertyValue('Skeleton') === 'False') {
  const platform = instance.getEnum('Platform', {
    Desktop: 'desktop',
    Mobile: 'mobile',
  });
  const title = instance.getString('Title');
  const caption = text('Caption', '┗ Text');
  const subCaption = text('Sub Caption', '┗ Text᠎᠎᠎');
  const extraCaption = text('Extra Caption', '┗ Text᠎᠎');

  const overlay = instance.getBoolean('Thumbnail Overlay') === true;
  const overlayCaption =
    overlay && instance.getBoolean('┗ Overlay Caption') === true
      ? instance.getString('ㅤ┗ Text')
      : undefined;
  const toggle =
    overlay && instance.getBoolean('Toggle Icon') === true
      ? renderSaveToggle(instance.findInstance('Toggle Icon'))
      : undefined;

  const top =
    instance.getBoolean('Show Top Content') === true
      ? renderRow(instance.findInstance('Top Content'), 'CardRow', 'top')
      : undefined;
  const bottom =
    instance.getBoolean('Show Bottom Content') === true
      ? renderRow(instance.findInstance('Bottom Content'), 'CardRow', 'bottom')
      : undefined;

  const coreNames = [
    'Card',
    'CardBody',
    'CardCaption',
    'CardThumbnail',
    'CardTitle',
    ...(overlayCaption || toggle ? ['CardThumbnailContent'] : []),
    ...(toggle?.coreNames ?? []),
    ...(top?.coreNames ?? []),
    ...(bottom?.coreNames ?? []),
  ];
  const iconNames = [...(toggle?.iconNames ?? [])];

  template = {
    id: 'Card',
    imports: buildImports(coreNames, iconNames),
    example: figma.tsx`<Card${platform ? ` platform="${platform}"` : ''}>
  <CardThumbnail src="" alt=""${
    overlayCaption
      ? ` leadingContent={<CardThumbnailContent variant="text">${overlayCaption}</CardThumbnailContent>}`
      : ''
  }${
    toggle
      ? figma.tsx` trailingContent={<CardThumbnailContent variant="toggle-icon">${toggle.code}</CardThumbnailContent>}`
      : ''
  } />
  <CardBody>${
    top
      ? figma.tsx`
    ${top.code}`
      : ''
  }
    <CardTitle>${title}</CardTitle>${
      caption
        ? `
    <CardCaption>${caption}</CardCaption>`
        : ''
    }${
      subCaption
        ? `
    <CardCaption>${subCaption}</CardCaption>`
        : ''
    }${
      extraCaption
        ? `
    <CardCaption>${extraCaption}</CardCaption>`
        : ''
    }${
      bottom
        ? figma.tsx`
    ${bottom.code}`
        : ''
    }
  </CardBody>
</Card>`,
    metadata: { nestable: true },
  };
} else if (instance.getPropertyValue('Skeleton') === 'True') {
  // Loading state: compose the documented skeleton parts from the visible rows.
  const show = (name: string) => instance.getBoolean(name) === true;
  const rows = [
    show('Show Top Content') ? '<CardRowSkeleton />' : '',
    '<CardTitleSkeleton />',
    show('Caption') ? '<CardCaptionSkeleton type="normal" />' : '',
    show('Sub Caption') ? '<CardCaptionSkeleton type="sub" />' : '',
    show('Extra Caption') ? '<CardCaptionSkeleton type="extra" />' : '',
    show('Show Bottom Content') ? '<CardRowSkeleton />' : '',
  ].filter(Boolean);

  template = {
    id: 'CardSkeleton',
    imports: [
      "import { CardBody, CardCaptionSkeleton, CardRowSkeleton, CardSkeleton, CardThumbnailSkeleton, CardTitleSkeleton } from '@montage-ui/core';",
    ],
    example: figma.tsx`<CardSkeleton>
  <CardThumbnailSkeleton />
  <CardBody>
    ${rows.join('\n    ')}
  </CardBody>
</CardSkeleton>`,
    metadata: { nestable: true },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'Card',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
