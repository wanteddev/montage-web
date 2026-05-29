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
