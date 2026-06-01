import type { Theme } from '@montage-ui/engine';

// WCAG 2.2 SC 2.5.8 Target Size (Minimum): interactive targets must be ≥ 24×24 CSS px.
export const MIN_INTERACTION_SIZE_PX = 24;

export type FixedSize = 'xlarge' | 'large' | 'medium' | 'small';
export type CompactSize = 'medium' | 'small';

// `box` (width/height) and `iconSize` are set directly from dimension tokens —
// the icon (svg) is sized explicitly and centered, no padding is applied.
export type NormalPreset = {
  box: keyof Theme['dimension'];
  iconSize: keyof Theme['dimension'];
  radius: keyof Theme['radius'];
};

export type BackgroundPreset = Omit<NormalPreset, 'radius'>;

export const NORMAL_PRESETS: Record<FixedSize, NormalPreset> = {
  xlarge: { box: 36, iconSize: 24, radius: 10 },
  large: { box: 32, iconSize: 20, radius: 10 },
  medium: { box: 28, iconSize: 18, radius: 8 },
  small: { box: 24, iconSize: 16, radius: 8 },
};

// background variant has a single fixed size (32×32). Any string size is
// ignored; only `number` allows customizing the box.
export const BACKGROUND_PRESET: BackgroundPreset = {
  box: 32,
  iconSize: 20,
};

// outlined / solid only support 'small' and 'medium' as string sizes; any
// other string falls back to 'medium'.
export const OUTLINED_SOLID_PRESETS: Record<CompactSize, BackgroundPreset> = {
  medium: { box: 40, iconSize: 18 },
  small: { box: 32, iconSize: 16 },
};
