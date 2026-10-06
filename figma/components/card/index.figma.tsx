import { figma } from '@figma/code-connect';

import {
  Card,
  CardBody,
  CardCaption,
  CardThumbnail,
  CardThumbnailContent,
  CardTitle,
  ToggleIcon,
} from '@montage-ui/core';
import { IconBookmark } from '@montage-ui/icon';

figma.connect(Card, '<FIGMA_CARD>', {
  props: {
    platform: figma.enum('Platform', {
      Desktop: 'desktop',
      Mobile: 'mobile',
    }),
    title: figma.string('Title'),
    caption: figma.boolean('Caption', {
      true: figma.string('┗ Text'),
      false: undefined,
    }),
    subCaption: figma.boolean('Sub Caption', {
      true: figma.string('┗ Text᠎᠎᠎'),
      false: undefined,
    }),
    extraCaption: figma.boolean('Extra Caption', {
      true: figma.string('┗ Text᠎᠎'),
      false: undefined,
    }),
    overlayCaption: figma.boolean('Thumbnail Overlay', {
      true: figma.boolean('┗ Overlay Caption', {
        true: figma.string('ㅤ┗ Text'),
        false: undefined,
      }),
      false: undefined,
    }),
    toggleIcon: figma.boolean('Thumbnail Overlay', {
      true: figma.boolean('Toggle Icon', {
        true: (
          <CardThumbnailContent variant="toggle-icon">
            <ToggleIcon>
              <IconBookmark />
            </ToggleIcon>
          </CardThumbnailContent>
        ),
        false: undefined,
      }),
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
    subCaption,
    extraCaption,
    overlayCaption,
    toggleIcon,
    topContent,
    bottomContent,
  }) => (
    <Card platform={platform}>
      <CardThumbnail
        src=""
        alt=""
        leadingContent={
          <CardThumbnailContent variant="text">
            {overlayCaption}
          </CardThumbnailContent>
        }
        trailingContent={toggleIcon}
      />
      <CardBody>
        {topContent}
        <CardTitle>{title}</CardTitle>
        <CardCaption>{caption}</CardCaption>
        <CardCaption>{subCaption}</CardCaption>
        <CardCaption>{extraCaption}</CardCaption>
        {bottomContent}
      </CardBody>
    </Card>
  ),
});
