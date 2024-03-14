import objectPath from 'object-path';

import type { Theme } from '@emotion/react';
import type { ThemeColorsToken } from '../types';

export const getColorByToken = (theme: Theme, token: ThemeColorsToken) =>
  objectPath.get(theme, token) as string;

export const addHexOpacity = (hex: string, value: number) =>
  hex.substring(0, 7) +
  Math.floor(value * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();

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

export const addOpacity = (color: string, value: number) =>
  `rgba(${
    color.startsWith('var(') ? color.replace(')', '-rgb)') : hexToRgb(color)
  }, ${value})`;

export const gradient = (
  color: string,
  variant: 'top' | 'right' | 'bottom' | 'left',
) =>
  `mask-image: linear-gradient(to ${variant}, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.86) 14.03%, rgba(0, 0, 0, 0.73) 26.24%, rgba(0, 0, 0, 0.62) 36.8%, rgba(0, 0, 0, 0.52) 45.9%, rgba(0, 0, 0, 0.43) 53.7%, rgba(0, 0, 0, 0.35) 60.4%, rgba(0, 0, 0, 0.29) 66.16%, rgba(0, 0, 0, 0.23) 71.17%, rgba(0, 0, 0, 0.18) 75.6%, rgba(0, 0, 0, 0.14) 79.63%, rgba(0, 0, 0, 0.1) 83.44%, rgba(0, 0, 0, 0.07) 87.2%, rgba(0, 0, 0, 0.04) 91.1%, rgba(0, 0, 0, 0.02) 95.3%, rgba(0, 0, 0, 0) 100%); background-color: ${color};`;
