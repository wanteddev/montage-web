const gradientOffset = [
  1, 0.859704, 0.73763, 0.632, 0.541037, 0.462963, 0.396, 0.33837, 0.288296,
  0.244, 0.203704, 0.16563, 0.128, 0.089037, 0.046963,
];
const gradientOpacity = [
  0, 0.142163, 0.269304, 0.3824, 0.48243, 0.57037, 0.6472, 0.713896, 0.771437,
  0.8208, 0.862963, 0.898904, 0.9296, 0.95603, 0.97917,
];
const maskGradientOffset = [
  1, 0.859704, 0.73763, 0.632, 0.541037, 0.462963, 0.396, 0.33837, 0.288296,
  0.244, 0.203704, 0.16563, 0.128, 0.089037, 0.046963, 0,
];
const maskGradientOpacity = [
  1, 0.857837, 0.730696, 0.6176, 0.51757, 0.42963, 0.3528, 0.286104, 0.228563,
  0.1792, 0.137037, 0.101096, 0.0704, 0.0439704, 0.0208296, 0,
];

export const getGradientMaskImage = (
  variant: 'top' | 'right' | 'bottom' | 'left',
  size = '100%',
  type: 'mask' | 'solid' | 'multiple' = 'solid',
) => {
  const isMask = type === 'mask';

  const gradientBaseOpacity = isMask ? maskGradientOpacity : gradientOpacity;
  const gradientBaseOffset = isMask ? maskGradientOffset : gradientOffset;

  const position = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };

  return `linear-gradient(to ${isMask ? variant : position[variant]}, ${gradientBaseOffset
    .map(
      (offset, i) =>
        `rgba(0, 0, 0, ${Math.round(gradientBaseOpacity[i]! * 100) / 100}) calc(100% - calc(${size} * ${Math.round(offset * 100) / 100}))`,
    )
    .join(', ')})`;
};

export const gradient = (
  color: string,
  variant: 'top' | 'right' | 'bottom' | 'left',
  size = '100%',
  type: 'mask' | 'solid' | 'multiple' = 'solid',
) => {
  return `mask-image: ${getGradientMaskImage(variant, size, type)}; background-color: ${color};
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
