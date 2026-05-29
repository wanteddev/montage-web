import type { CompactSize, PaddingValue } from './constants';
import type { IconButtonProps } from './types';
import type { Theme } from '@montage-ui/engine';

export const resolvePadding = (theme: Theme, padding: PaddingValue): string =>
  typeof padding === 'number' ? theme.spacing[padding] : padding;

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

export const nearestSpacingToken = (theme: Theme, value: number): string => {
  const snapped = nearestToken(value, numericTokenKeys(theme.spacing), 'down');
  return theme.spacing[snapped as keyof Theme['spacing']];
};

export const nearestRadiusToken = (theme: Theme, value: number): string => {
  const snapped = nearestToken(value, numericTokenKeys(theme.radius), 'down');
  return theme.radius[snapped as keyof Theme['radius']];
};
