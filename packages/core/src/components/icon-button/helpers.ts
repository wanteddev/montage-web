import { ICON_SIZE_RATIO, MIN_INTERACTION_SIZE_PX } from './constants';

import type { CompactSize } from './constants';
import type { IconButtonProps } from './types';
import type { Theme } from '@montage-ui/engine';

export const resolveCompactSize = (
  size: IconButtonProps['size'],
): CompactSize => (size === 'small' ? 'small' : 'medium');

const numericTokenKeys = (obj: Record<string, unknown>): Array<number> =>
  Object.keys(obj)
    .map(Number)
    .filter((n) => Number.isFinite(n));

const nearestToken = (
  value: number,
  tokens: ReadonlyArray<number>,
  tie: 'up' | 'down' = 'down',
): number => {
  return tokens.reduce((best, token) => {
    const bestDist = Math.abs(value - best);
    const dist = Math.abs(value - token);
    if (dist < bestDist) return token;
    if (dist === bestDist) {
      if (tie === 'up' && token > best) return token;
      if (tie === 'down' && token < best) return token;
    }
    return best;
  }, tokens[0] ?? value);
};

// Dimension token keys are their px value, so the snapped key doubles as the
// resolved icon size in px.
export const nearestDimensionToken = (theme: Theme, value: number): number =>
  nearestToken(value, numericTokenKeys(theme.dimension), 'down');

// The largest dimension token (px) — used to cap the custom `number` box size.
export const maxDimensionToken = (theme: Theme): number =>
  Math.max(...numericTokenKeys(theme.dimension));

export const nearestRadiusToken = (theme: Theme, value: number): string => {
  const snapped = nearestToken(value, numericTokenKeys(theme.radius), 'down');
  return theme.radius[snapped as keyof Theme['radius']];
};

// Inverse of the `number` size policy, for the legacy layout where `size` is
// the icon: the box (px) the current policy pairs with that icon — icon ÷ ratio
// snapped to a dimension token. Ties round up so the hit area never shrinks,
// the WCAG minimum still applies, and an icon larger than the biggest token
// keeps a box at least its own size. Reproduces NORMAL_PRESETS exactly
// (16→24, 18→28, 20→32, 24→36).
export const legacyBoxForIcon = (theme: Theme, iconSize: number): number =>
  Math.max(
    MIN_INTERACTION_SIZE_PX,
    iconSize,
    nearestToken(
      iconSize / ICON_SIZE_RATIO.normal,
      numericTokenKeys(theme.dimension),
      'up',
    ),
  );
