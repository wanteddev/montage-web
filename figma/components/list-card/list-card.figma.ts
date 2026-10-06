// url=<FIGMA_LIST_CARD>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/list-card/index.tsx
// component=ListCard

import figma from 'figma';

import {
  buildImports,
  renderListCardContent,
  renderRow,
} from '../card/card-content';

const instance = figma.selectedInstance;
const text = (show: string, propName: string) =>
  instance.getBoolean(show) === true ? instance.getString(propName) : undefined;

let template;
if (instance.getPropertyValue('Skeleton') === 'False') {
  const platform = instance.getEnum('Platform', {
    // `desktop` is the core default.
    Desktop: undefined,
    Mobile: 'mobile',
  });
  const title = instance.getString('Title');
  const caption = text('Caption', '┗ Text᠎');
  const extraCaption = text('Extra Caption', '┗ Text');

  const leading =
    instance.getBoolean('Show \bLeading Content') === true
      ? renderListCardContent(instance.findInstance('Leading Content'))
      : undefined;
  const trailing =
    instance.getBoolean('Show Trailing Content') === true
      ? renderListCardContent(instance.findInstance('Trailing Content'))
      : undefined;
  const top =
    instance.getBoolean('Show Top Content') === true
      ? renderRow(instance.findInstance('Top Content'), 'ListCardRow', 'top')
      : undefined;
  const bottom =
    instance.getBoolean('Show Bottom Content') === true
      ? renderRow(
          instance.findInstance('Bottom Content'),
          'ListCardRow',
          'bottom',
        )
      : undefined;

  const parts = [leading, trailing, top, bottom];
  const coreNames = [
    'ListCard',
    'ListCardBody',
    'ListCardCaption',
    'ListCardThumbnail',
    'ListCardTitle',
    ...parts.flatMap((part) => part?.coreNames ?? []),
  ];
  const iconNames = parts.flatMap((part) => part?.iconNames ?? []);

  template = {
    id: 'ListCard',
    imports: buildImports(coreNames, iconNames),
    example: figma.tsx`<ListCard${platform ? ` platform="${platform}"` : ''}${
      leading ? figma.tsx` leadingContent={${leading.code}}` : ''
    }${trailing ? figma.tsx` trailingContent={${trailing.code}}` : ''}>
  <ListCardThumbnail src="" alt="" />
  <ListCardBody>${
    top
      ? figma.tsx`
    ${top.code}`
      : ''
  }
    <ListCardTitle>${title}</ListCardTitle>${
      caption
        ? `
    <ListCardCaption>${caption}</ListCardCaption>`
        : ''
    }${
      extraCaption
        ? `
    <ListCardCaption>${extraCaption}</ListCardCaption>`
        : ''
    }${
      bottom
        ? figma.tsx`
    ${bottom.code}`
        : ''
    }
  </ListCardBody>
</ListCard>`,
    metadata: { nestable: true },
  };
} else if (instance.getPropertyValue('Skeleton') === 'True') {
  // Loading state: compose the documented skeleton parts from the visible rows.
  const show = (name: string) => instance.getBoolean(name) === true;
  const rows = [
    show('Show Top Content') ? '<ListCardRowSkeleton />' : '',
    '<ListCardTitleSkeleton />',
    '<ListCardCaptionSkeleton type="normal" />',
    show('Extra Caption') ? '<ListCardCaptionSkeleton type="extra" />' : '',
    show('Show Bottom Content') ? '<ListCardRowSkeleton />' : '',
  ].filter(Boolean);

  template = {
    id: 'ListCardSkeleton',
    imports: [
      `import { ${[
        'ListCardBody',
        'ListCardSkeleton',
        'ListCardThumbnailSkeleton',
        'ListCardTitleSkeleton',
        ...(rows.some((row) => row.includes('ListCardCaptionSkeleton'))
          ? ['ListCardCaptionSkeleton']
          : []),
        ...(rows.some((row) => row.includes('ListCardRowSkeleton'))
          ? ['ListCardRowSkeleton']
          : []),
      ]
        .sort()
        .join(', ')} } from '@montage-ui/core';`,
    ],
    example: figma.tsx`<ListCardSkeleton>
  <ListCardThumbnailSkeleton />
  <ListCardBody>
    ${rows.join('\n    ')}
  </ListCardBody>
</ListCardSkeleton>`,
    metadata: { nestable: true },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'ListCard',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
