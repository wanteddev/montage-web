const toPX = (value: number): string => `${value}px`;

export const calculateAnimationStyle = (
  targetElement: HTMLDivElement | HTMLElement,
  parentElement: HTMLDivElement | HTMLElement,
) => {
  const clientRect = targetElement.getBoundingClientRect();
  const parentClientRect = parentElement.getBoundingClientRect();

  const style = {
    left: toPX(clientRect.left - parentClientRect.left),
    right: toPX(parentClientRect.right - clientRect.right),
    width: toPX(clientRect.width),
    top: toPX(clientRect.top - parentClientRect.top),
    bottom: toPX(parentClientRect.bottom - clientRect.bottom),
    height: toPX(clientRect.height),
    borderRadius: window.getComputedStyle(targetElement).borderRadius,
  };

  return style;
};
