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
