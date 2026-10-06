import { figma } from '@figma/code-connect';

import {
  ListCard,
  ListCardBody,
  ListCardCaption,
  ListCardThumbnail,
  ListCardTitle,
} from '@montage-ui/core';

figma.connect(ListCard, '<FIGMA_LIST_CARD>', {
  props: {
    platform: figma.enum('Platform', {
      Desktop: 'desktop',
      Mobile: 'mobile',
    }),
    title: figma.string('Title'),
    caption: figma.boolean('Caption', {
      true: figma.string('┗ Text᠎'),
      false: undefined,
    }),
    extraCaption: figma.boolean('Extra Caption', {
      true: figma.string('┗ Text'),
      false: undefined,
    }),
    leadingContent: figma.boolean('Show \bLeading Content', {
      true: figma.slot('Leading Content'),
      false: undefined,
    }),
    trailingContent: figma.boolean('Show Trailing Content', {
      true: figma.slot('Trailing Content'),
      false: undefined,
    }),
    topContent: figma.boolean('Show Top Content', {
      true: figma.slot('Top Content'),
      false: undefined,
    }),
    bottomContent: figma.boolean('Show Bottom Content', {
      true: figma.slot('Bottom Content'),
      false: undefined,
    }),
  },
  variant: {
    Skeleton: 'False',
  },
  example: ({
    platform,
    title,
    caption,
    extraCaption,
    leadingContent,
    trailingContent,
    topContent,
    bottomContent,
  }) => (
    <ListCard
      platform={platform}
      leadingContent={leadingContent}
      trailingContent={trailingContent}
    >
      <ListCardThumbnail src="" alt="" />
      <ListCardBody>
        {topContent}
        <ListCardTitle>{title}</ListCardTitle>
        <ListCardCaption>{caption}</ListCardCaption>
        <ListCardCaption>{extraCaption}</ListCardCaption>
        {bottomContent}
      </ListCardBody>
    </ListCard>
  ),
});
