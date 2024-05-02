export const gradient = (
  color: string,
  variant: 'top' | 'right' | 'bottom' | 'left',
  size = '100%',
) => {
  const gradientBase = [
    0, 0.1403, 0.2624, 0.368, 0.459, 0.537, 0.604, 0.6616, 0.7117, 0.756,
    0.7963, 0.8344, 0.872, 0.911, 0.953, 1,
  ] as const;

  const getGradientSize = (base: string, idx: number) => {
    return `calc(100% - (${base} * (1 - ${gradientBase[idx]})))`;
  };

  return `mask-image: linear-gradient(to ${variant}, rgb(0, 0, 0) ${getGradientSize(size, 0)}, rgba(0, 0, 0, 0.86) ${getGradientSize(size, 1)}, rgba(0, 0, 0, 0.73) ${getGradientSize(size, 2)}, rgba(0, 0, 0, 0.62) ${getGradientSize(size, 3)}, rgba(0, 0, 0, 0.52) ${getGradientSize(size, 4)}, rgba(0, 0, 0, 0.43) ${getGradientSize(size, 5)}, rgba(0, 0, 0, 0.35) ${getGradientSize(size, 6)}, rgba(0, 0, 0, 0.29) ${getGradientSize(size, 7)}, rgba(0, 0, 0, 0.23) ${getGradientSize(size, 8)}, rgba(0, 0, 0, 0.18) ${getGradientSize(size, 9)}, rgba(0, 0, 0, 0.14) ${getGradientSize(size, 10)}, rgba(0, 0, 0, 0.1) ${getGradientSize(size, 11)}, rgba(0, 0, 0, 0.07) ${getGradientSize(size, 12)}, rgba(0, 0, 0, 0.04) ${getGradientSize(size, 13)}, rgba(0, 0, 0, 0.02) ${getGradientSize(size, 14)}, rgba(0, 0, 0, 0) ${getGradientSize(size, 15)}); background-color: ${color};
  `;
};

export const addOpacity = (color: string, value: number) =>
  `rgba(${
    color.startsWith('var(') ? color.replace(')', '-rgb)') : hexToRgb(color)
  }, ${value})`;

const hexToRgb = (hexColor: string) => {
  const parsedColor = hexColor.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_, r: string, g: string, b: string) => r + r + g + g + b + b,
  );

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(parsedColor);

  if (result && result.length > 2) {
    return `${parseInt(result[1] || '', 16)}, ${parseInt(
      result[2] || '',
      16,
    )}, ${parseInt(result[3] || '', 16)}`;
  }

  return null;
};
