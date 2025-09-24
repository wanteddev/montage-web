import { IconClose, IconCloseThick } from '@wanteddev/wds-icon';

import type {
  TopNavigationButtonProps,
  TopNavigationProps,
} from '../top-navigation/types';

export const getDefaultCloseIcon = (
  variant?: TopNavigationProps['variant'],
  background?: TopNavigationButtonProps['background'],
) => {
  switch (variant) {
    case 'floating':
      return background ? <IconCloseThick /> : <IconClose />;
    default:
      return <IconClose />;
  }
};

export const isTouchEvent = (
  value: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent,
): value is TouchEvent | React.TouchEvent => value.type.includes('touch');

export const calcOpacityRatio = (
  input: number,
  minPosition: number,
  maxPosition: number,
) => {
  if (input <= minPosition) return 1;
  if (input >= maxPosition) return 0;

  return 1 - (input - minPosition) / (maxPosition - minPosition);
};

export const isMouseDownOnPeek = (
  e: React.MouseEvent | React.TouchEvent,
  peekHeight: number,
) => {
  const { top } = e.currentTarget.getBoundingClientRect();

  const clientY = isTouchEvent(e) ? e.touches[0]!.clientY : e.clientY;

  return clientY >= top && clientY <= top + peekHeight;
};
