// url=<FIGMA_AVATAR_GROUP>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/avatar-group/index.tsx
// component=AvatarGroup

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  XSmall: 'xsmall',
  Small: 'small',
});
// Group members render as plain `Avatar`s with the group size (docs: Avatar group),
// even though the Figma avatars carry the interaction layer.
const avatarSize = size ?? 'small';
const avatarElements = figma.selectedInstance
  .findLayers((layer) => layer.type === 'INSTANCE' && layer.name === 'Avatar')
  .map((layer) => {
    const variant =
      layer.type === 'INSTANCE'
        ? layer.getEnum('Variant', {
            Person: 'person',
            Company: 'company',
            Academy: 'academy',
          })
        : undefined;
    return `<Avatar${variant ? ` variant="${variant}"` : ''} size="${avatarSize}" />`;
  });
const avatars = avatarElements.join('\n  ');

// Trailing content is an instance swap of `Avatar/Resource/Avatar Group/Trailing Content/*`
// (Text Button | Text | Custom). Detect the resource by its layers and wrap it
// with `AvatarGroupContent` as documented.
const trailingLayer = figma.selectedInstance.findInstance('Trailing Content');
const renderTrailingContent = () => {
  if (
    figma.selectedInstance.getBoolean('Trailing Content') !== true ||
    trailingLayer.type === 'ERROR'
  ) {
    return undefined;
  }

  const textButton = trailingLayer.findInstance('Text Button/Text Button');
  if (textButton.type !== 'ERROR') {
    return figma.tsx`<AvatarGroupContent variant="text-button">${textButton.executeTemplate().example}</AvatarGroupContent>`;
  }

  const text = trailingLayer.findText('텍스트');
  if (text.type !== 'ERROR') {
    return figma.tsx`<AvatarGroupContent variant="text">${text.textContent}</AvatarGroupContent>`;
  }

  return figma.tsx`<AvatarGroupContent />`;
};
const trailingContent = renderTrailingContent();

export default {
  id: 'AvatarGroup',
  imports: [
    trailingContent
      ? "import { Avatar, AvatarGroup, AvatarGroupContent } from '@montage-ui/core';"
      : "import { Avatar, AvatarGroup } from '@montage-ui/core';",
  ],
  example: figma.tsx`<AvatarGroup${size ? ` size="${size}"` : ''}${
    trailingContent ? figma.tsx` trailingContent={${trailingContent}}` : ''
  }>
  ${avatars}
</AvatarGroup>`,
  metadata: { nestable: true },
};
