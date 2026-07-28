import { describe, expect, it } from 'vitest';
import { lightOriginTheme } from '@montage-ui/engine';

import { getWeightMap, variantMap } from './style';

import type { TypographyVariant } from './types';

const VARIANTS: Array<TypographyVariant> = [
  'display1',
  'display2',
  'display3',
  'title1',
  'title2',
  'title3',
  'heading1',
  'heading2',
  'headline1',
  'headline2',
  'body1',
  'body1-reading',
  'body2',
  'body2-reading',
  'label1',
  'label1-reading',
  'label2',
  'caption1',
  'caption2',
];

/** Variants whose `bold` weight is 700 rather than 600. */
const HEAVY_BOLD_VARIANTS: Array<TypographyVariant> = [
  'display1',
  'display2',
  'display3',
  'title1',
  'title2',
  'title3',
];

/** `body1-reading` (public variant name) -> `body1Reading` (theme token key) */
const toTokenKey = (variant: TypographyVariant) =>
  variant.replace(/-(\w)/g, (_match: string, char: string) =>
    char.toUpperCase(),
  ) as keyof typeof lightOriginTheme.typography;

describe('variantMap', () => {
  it('is keyed by the kebab-case public variant name, not the camelCase token key', () => {
    expect(Object.keys(variantMap).sort()).toEqual([...VARIANTS].sort());
  });

  it('references the css variables of the matching camelCase token', () => {
    expect(variantMap['body2-reading'].styles).toContain(
      'font-size: var(--typography-body2Reading-fontSize)',
    );
    expect(variantMap['body2-reading'].styles).toContain(
      'line-height: var(--typography-body2Reading-lineHeight)',
    );
    expect(variantMap['body2-reading'].styles).toContain(
      'letter-spacing: var(--typography-body2Reading-letterSpacing)',
    );
  });

  it('keeps digits attached to the variant name', () => {
    expect(variantMap.display1.styles).toContain(
      'var(--typography-display1-fontSize)',
    );
  });
});

describe('getWeightMap', () => {
  it.each(VARIANTS)(
    'resolves every weight of %s to its own token',
    (variant) => {
      const tokenKey = toTokenKey(variant);
      const weightMap = getWeightMap(variant);

      expect(weightMap.regular.styles).toContain(
        `var(--typography-${tokenKey}-weight-regular)`,
      );
      expect(weightMap.medium.styles).toContain(
        `var(--typography-${tokenKey}-weight-medium)`,
      );
      expect(weightMap.bold.styles).toContain(
        `var(--typography-${tokenKey}-weight-bold)`,
      );
    },
  );
});

describe('bold weight tokens', () => {
  it.each(HEAVY_BOLD_VARIANTS)('resolves %s bold to 700', (variant) => {
    expect(lightOriginTheme.typography[toTokenKey(variant)].weight.bold).toBe(
      700,
    );
  });

  it.each(VARIANTS.filter((v) => !HEAVY_BOLD_VARIANTS.includes(v)))(
    'resolves %s bold to 600',
    (variant) => {
      expect(lightOriginTheme.typography[toTokenKey(variant)].weight.bold).toBe(
        600,
      );
    },
  );
});
