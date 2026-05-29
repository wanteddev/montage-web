import type { Theme } from '@montage-ui/engine';

// WCAG 2.2 SC 2.5.8 Target Size (Minimum): interactive targets must be ≥ 24×24 CSS px.
export const MIN_INTERACTION_SIZE_PX = 24;

export type FixedSize = 'xlarge' | 'large' | 'medium' | 'small';
export type CompactSize = 'medium' | 'small';

// Padding falls back to a literal px string when no spacing token matches the
// preset value (e.g. 5px, 11px have no theme token). Icon visual is content-box
// (box − 2×padding); svg fills 100% so no font-size needed.
export type PaddingValue = keyof Theme['spacing'] | string;

export type NormalPreset = {
  box: keyof Theme['dimension'];
  padding: PaddingValue;
  radius: keyof Theme['radius'];
};

export type BackgroundPreset = Omit<NormalPreset, 'radius'>;

export const NORMAL_PRESETS: Record<FixedSize, NormalPreset> = {
  xlarge: { box: 36, padding: 6, radius: 10 },
  large: { box: 32, padding: 6, radius: 10 },
  medium: { box: 28, padding: '5px', radius: 8 },
  small: { box: 24, padding: 4, radius: 8 },
};

// background variant has a single fixed size (32×32). Any string size is
// ignored; only `number` allows customizing the box.
export const BACKGROUND_PRESET: BackgroundPreset = {
  box: 32,
  padding: 6,
};

// outlined / solid only support 'small' and 'medium' as string sizes; any
// other string falls back to 'medium'.
export const OUTLINED_SOLID_PRESETS: Record<CompactSize, BackgroundPreset> = {
  medium: { box: 40, padding: '11px' },
  small: { box: 32, padding: 8 },
};
