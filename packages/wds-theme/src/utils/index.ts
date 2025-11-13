import objectPath from 'object-path';

import type { Theme, ThemeColorsToken } from '../types';

export const getColorByToken = (theme: Theme, token: ThemeColorsToken) =>
  objectPath.get(theme, token) as string;

export const addHexOpacity = (hex: string, value: number) =>
  hex.substring(0, 7) +
  Math.round(value * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();
