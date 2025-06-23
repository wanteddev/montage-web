export const toCssValue = (
  value: number | string | undefined,
): string | undefined => {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  return value;
};
