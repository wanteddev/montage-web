import { BOTTOM_SHEET_SHADOW } from './constants';

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

export const applyPeekState = (
  container: HTMLDivElement,
  dimmer: HTMLDivElement | null,
  peek: number,
) => {
  container.style.setProperty(
    '--wds-modal-translate',
    `calc(100% - ${peek}px)`,
  );
  container.style.setProperty('box-shadow', BOTTOM_SHEET_SHADOW);
  dimmer?.style.setProperty('opacity', '0');
};

export const applyVisibleState = (
  container: HTMLDivElement,
  dimmer: HTMLDivElement | null,
) => {
  container.style.setProperty('--wds-modal-translate', '0px');
  container.style.removeProperty('box-shadow');
  dimmer?.style.setProperty('opacity', '1');
};

export const resetDragStyles = (
  container: HTMLDivElement,
  dimmer: HTMLDivElement | null,
) => {
  container.style.removeProperty('transition');
  container.style.removeProperty('--wds-modal-translate');
  container.style.removeProperty('box-shadow');
  dimmer?.style.removeProperty('transition');
  dimmer?.style.removeProperty('opacity');
};
