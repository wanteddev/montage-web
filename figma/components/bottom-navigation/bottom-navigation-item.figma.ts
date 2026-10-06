// url=<FIGMA_BOTTOM_NAVIGATION_ITEM>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/bottom-navigation/index.tsx
// component=BottomNavigationItem

import figma from 'figma';

import { renderIcon } from '../../helpers/icon';
import { renderNested } from '../top-navigation/top-navigation-shared';

const instance = figma.selectedInstance;
const text = instance.findText('Value');
const label = text.type === 'ERROR' ? '' : text.textContent;

// The icon sits in an `Icons` wrapper; render the swapped icon directly so its
// import can be re-declared (Code Connect forwards imports one level only).
// Some tabs (e.g. the logged-in profile tab) show an `Avatar` instead.
const wrapper = instance.findInstance('Icon');
const avatar = instance.findInstance('Avatar/Avatar');
const renderedAvatar =
  avatar.type === 'ERROR' ? undefined : renderNested(avatar);
const icon =
  wrapper.type !== 'ERROR'
    ? renderIcon(wrapper.getInstanceSwap('Icon'))
    : renderedAvatar
      ? {
          code: renderedAvatar.code,
          imports: [
            "import { Avatar } from '@montage-ui/core';",
            ...renderedAvatar.imports,
          ],
        }
      : undefined;

const imports = [
  "import { BottomNavigationItem } from '@montage-ui/core';",
  ...(icon?.imports ?? []),
];

export default {
  id: 'BottomNavigationItem',
  imports,
  example: figma.tsx`<BottomNavigationItem value=${JSON.stringify(label)} label=${JSON.stringify(
    label,
  )}${icon ? figma.tsx` icon={${icon.code}}` : ''} />`,
  metadata: { nestable: true, props: { imports } },
};
