import { axe } from 'vitest-axe';
import { cleanup, render } from '@testing-library/react';
import { theme } from '@montage-ui/engine';

import { NORMAL_PRESETS } from './constants';
import { legacyBoxForIcon, nearestRadiusToken } from './helpers';

import { IconButton } from '.';

const getButton = (container: HTMLElement) =>
  container.querySelector('[data-component="icon-button"]') as HTMLElement;

const getInteractionLayer = (container: HTMLElement) =>
  container.querySelector('[data-component="with-interaction"]') as HTMLElement;

const getSvg = (container: HTMLElement) =>
  container.querySelector('svg') as unknown as HTMLElement;

const computedStyle = (el: HTMLElement) => window.getComputedStyle(el);

// Largest dimension token (px), derived from the theme so the cap test stays
// correct if the token set changes.
const MAX_DIMENSION = Math.max(
  ...Object.keys(theme.light.dimension).map(Number).filter(Number.isFinite),
);

describe('IconButton — size policy', () => {
  afterEach(() => {
    cleanup();
  });

  it.each([
    [
      'xlarge',
      {
        width: 'var(--dimension-36)',
        height: 'var(--dimension-36)',
        iconSize: 'var(--dimension-24)',
        borderRadius: 'var(--radius-10)',
      },
    ],
    [
      'large',
      {
        width: 'var(--dimension-32)',
        height: 'var(--dimension-32)',
        iconSize: 'var(--dimension-20)',
        borderRadius: 'var(--radius-10)',
      },
    ],
    [
      'medium',
      {
        width: 'var(--dimension-28)',
        height: 'var(--dimension-28)',
        iconSize: 'var(--dimension-18)',
        borderRadius: 'var(--radius-8)',
      },
    ],
    [
      'small',
      {
        width: 'var(--dimension-24)',
        height: 'var(--dimension-24)',
        iconSize: 'var(--dimension-16)',
        borderRadius: 'var(--radius-8)',
      },
    ],
  ] as const)(
    'normal variant size=%s renders preset tokens',
    (size, expected) => {
      const { container } = render(
        <IconButton variant="normal" size={size}>
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));
      const svgStyle = computedStyle(getSvg(container));

      expect(style.width).toBe(expected.width);
      expect(style.height).toBe(expected.height);
      expect(style.borderRadius).toBe(expected.borderRadius);
      expect(svgStyle.fontSize).toBe(expected.iconSize);
    },
  );

  it('normal default size is xlarge (preset)', () => {
    const { container } = render(
      <IconButton variant="normal">
        <svg />
      </IconButton>,
    );

    const style = computedStyle(getButton(container));
    const svgStyle = computedStyle(getSvg(container));

    expect(style.width).toBe('var(--dimension-36)');
    expect(style.height).toBe('var(--dimension-36)');
    expect(style.borderRadius).toBe('var(--radius-10)');
    expect(svgStyle.fontSize).toBe('var(--dimension-24)');
  });

  // background has a single fixed size (32×32 box, 20 icon); string sizes are ignored.
  it.each(['xlarge', 'large', 'medium', 'small', undefined] as const)(
    'background variant always renders 32x32 regardless of size=%s',
    (size) => {
      const { container } = render(
        <IconButton variant="background" size={size}>
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));
      const svgStyle = computedStyle(getSvg(container));

      expect(style.width).toBe('var(--dimension-32)');
      expect(style.height).toBe('var(--dimension-32)');
      expect(svgStyle.fontSize).toBe('var(--dimension-20)');
    },
  );

  it.each([
    [
      'outlined',
      'medium',
      {
        width: 'var(--dimension-40)',
        height: 'var(--dimension-40)',
        iconSize: 'var(--dimension-18)',
      },
    ],
    [
      'outlined',
      'small',
      {
        width: 'var(--dimension-32)',
        height: 'var(--dimension-32)',
        iconSize: 'var(--dimension-16)',
      },
    ],
    [
      'solid',
      'medium',
      {
        width: 'var(--dimension-40)',
        height: 'var(--dimension-40)',
        iconSize: 'var(--dimension-18)',
      },
    ],
    [
      'solid',
      'small',
      {
        width: 'var(--dimension-32)',
        height: 'var(--dimension-32)',
        iconSize: 'var(--dimension-16)',
      },
    ],
  ] as const)(
    '%s variant size=%s renders preset tokens',
    (variant, size, expected) => {
      const { container } = render(
        <IconButton variant={variant} size={size}>
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));
      const svgStyle = computedStyle(getSvg(container));

      expect(style.width).toBe(expected.width);
      expect(style.height).toBe(expected.height);
      expect(svgStyle.fontSize).toBe(expected.iconSize);
    },
  );

  it.each(['outlined', 'solid'] as const)(
    '%s variant falls back to medium when size is xlarge/large',
    (variant) => {
      const { container } = render(
        <IconButton variant={variant} size="xlarge">
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));
      const svgStyle = computedStyle(getSvg(container));

      expect(style.width).toBe('var(--dimension-40)');
      expect(svgStyle.fontSize).toBe('var(--dimension-18)');
    },
  );

  // size={number}: box = max(24, N) literal px. iconSize snaps to the nearest
  // dimension token (normal/background = box * 2/3, outlined/solid = box * 0.47),
  // and normal radius snaps to the nearest radius token (box * 0.3).
  it.each([
    [
      'normal',
      36,
      {
        width: '36px',
        iconSize: 'var(--dimension-24)',
        borderRadius: 'var(--radius-10)',
      },
    ],
    [
      'background',
      24,
      { width: '24px', iconSize: 'var(--dimension-16)', borderRadius: '' },
    ],
    [
      'outlined',
      32,
      { width: '32px', iconSize: 'var(--dimension-16)', borderRadius: '' },
    ],
  ] as const)(
    '%s variant size=%i snaps icon size/radius to nearest tokens',
    (variant, size, expected) => {
      const { container } = render(
        <IconButton variant={variant} size={size}>
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));
      const svgStyle = computedStyle(getSvg(container));

      expect(style.width).toBe(expected.width);
      expect(style.height).toBe(expected.width);
      expect(svgStyle.fontSize).toBe(expected.iconSize);
      if (variant === 'normal') {
        expect(style.borderRadius).toBe(expected.borderRadius);
      }
    },
  );

  it.each([
    ['normal', 'var(--dimension-16)'],
    ['background', 'var(--dimension-16)'],
    ['outlined', 'var(--dimension-12)'],
    ['solid', 'var(--dimension-12)'],
  ] as const)(
    '%s variant size=10 (number) clamps box to 24px (WCAG 2.2)',
    (variant, iconSize) => {
      const { container } = render(
        <IconButton variant={variant} size={10}>
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));
      const svgStyle = computedStyle(getSvg(container));

      expect(style.width).toBe('24px');
      expect(style.height).toBe('24px');
      expect(svgStyle.fontSize).toBe(iconSize);
    },
  );

  // box is capped at the largest dimension token (derived from the theme, not
  // hard-coded — adding/removing a dimension token must not break this test).
  it.each(['normal', 'background', 'outlined', 'solid'] as const)(
    '%s variant clamps the box to the max dimension token for oversized number sizes',
    (variant) => {
      const renderAt = (size: number) => {
        const { container } = render(
          <IconButton variant={variant} size={size}>
            <svg />
          </IconButton>,
        );
        return {
          box: computedStyle(getButton(container)).width,
          icon: computedStyle(getSvg(container)).fontSize,
        };
      };

      // Anything at/above the max dimension token collapses to the same box.
      const atMax = renderAt(MAX_DIMENSION);
      const beyondMax = renderAt(MAX_DIMENSION * 100);

      expect(atMax.box).toBe(`${MAX_DIMENSION}px`);
      expect(beyondMax.box).toBe(`${MAX_DIMENSION}px`);
      expect(beyondMax.icon).toBe(atMax.icon);
    },
  );
});

// useLegacyInteractionLayer restores the pre-4.0 layout of the normal variant:
// the box is the icon itself, and the interaction layer floats over it at the
// size / radius the current policy would give that icon.
describe('IconButton — useLegacyInteractionLayer', () => {
  afterEach(() => {
    cleanup();
  });

  it('should pass accessibility tests', async () => {
    const { container } = render(
      <IconButton size={24} useLegacyInteractionLayer aria-label="Close">
        <svg />
      </IconButton>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  // Tokens contribute only their icon size (default xlarge = 24), which then
  // goes through the same pairing formula as a number — so everything renders
  // as literal px, and the results match the preset's box / radius.
  it.each([
    [
      'xlarge',
      {
        iconSize: '24px',
        layer: '36px',
        borderRadius: 'var(--radius-10)',
      },
    ],
    [
      'large',
      {
        iconSize: '20px',
        layer: '32px',
        borderRadius: 'var(--radius-10)',
      },
    ],
    [
      'medium',
      {
        iconSize: '18px',
        layer: '28px',
        borderRadius: 'var(--radius-8)',
      },
    ],
    [
      'small',
      {
        iconSize: '16px',
        layer: '24px',
        borderRadius: 'var(--radius-8)',
      },
    ],
    [
      undefined,
      {
        iconSize: '24px',
        layer: '36px',
        borderRadius: 'var(--radius-10)',
      },
    ],
  ] as const)(
    'normal variant size=%s boxes the preset icon with the paired layer',
    (size, expected) => {
      const { container } = render(
        <IconButton variant="normal" size={size} useLegacyInteractionLayer>
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));
      const svgStyle = computedStyle(getSvg(container));
      const layerStyle = computedStyle(getInteractionLayer(container));

      expect(style.width).toBe(expected.iconSize);
      expect(style.height).toBe(expected.iconSize);
      expect(style.borderRadius).toBe(expected.borderRadius);
      expect(svgStyle.fontSize).toBe(expected.iconSize);
      expect(layerStyle.width).toBe(expected.layer);
      expect(layerStyle.height).toBe(expected.layer);
    },
  );

  // size={number}: the icon is N literal px (as in 3.x). The layer is the box
  // the current policy pairs with it — N ÷ (2/3) snapped to a dimension token
  // (ties round up), never below 24 or the icon — and the radius snaps from it.
  it.each([
    [24, { layer: '36px', borderRadius: 'var(--radius-10)' }],
    // 30 is equidistant from 28 / 32 — rounds up, matching the `large` preset.
    [20, { layer: '32px', borderRadius: 'var(--radius-10)' }],
    [18, { layer: '28px', borderRadius: 'var(--radius-8)' }],
    [16, { layer: '24px', borderRadius: 'var(--radius-8)' }],
    // 18 would be the paired box — clamped to 24 (WCAG 2.2).
    [12, { layer: '24px', borderRadius: 'var(--radius-8)' }],
    [32, { layer: '48px', borderRadius: 'var(--radius-14)' }],
    // 192 exceeds the token set — the layer never shrinks below the icon.
    [128, { layer: '128px', borderRadius: 'var(--radius-24)' }],
  ] as const)(
    'normal variant size=%i renders the icon at that size with the paired layer',
    (size, expected) => {
      const { container } = render(
        <IconButton variant="normal" size={size} useLegacyInteractionLayer>
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));
      const svgStyle = computedStyle(getSvg(container));
      const layerStyle = computedStyle(getInteractionLayer(container));

      expect(style.width).toBe(`${size}px`);
      expect(style.height).toBe(`${size}px`);
      expect(style.borderRadius).toBe(expected.borderRadius);
      expect(svgStyle.fontSize).toBe(`${size}px`);
      expect(layerStyle.width).toBe(expected.layer);
      expect(layerStyle.height).toBe(expected.layer);
    },
  );

  // Guards the inverse mapping against preset drift: a number equal to a
  // preset's icon must land on that preset's box and radius.
  it('legacyBoxForIcon reproduces every normal preset from its icon size', () => {
    Object.values(NORMAL_PRESETS).forEach((preset) => {
      const box = legacyBoxForIcon(theme.light, preset.iconSize);

      expect(box).toBe(preset.box);
      expect(nearestRadiusToken(theme.light, box * 0.3)).toBe(
        theme.light.radius[preset.radius],
      );
    });
  });

  // Other variants never changed what `size` means (always the box), so the
  // flag is a no-op there.
  it.each([
    ['background', 32, 'var(--dimension-20)'],
    ['outlined', 32, 'var(--dimension-16)'],
    ['solid', 40, 'var(--dimension-18)'],
  ] as const)(
    '%s variant size=%i ignores useLegacyInteractionLayer',
    (variant, size, iconSize) => {
      const { container } = render(
        <IconButton variant={variant} size={size} useLegacyInteractionLayer>
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));
      const svgStyle = computedStyle(getSvg(container));

      expect(style.width).toBe(`${size}px`);
      expect(style.height).toBe(`${size}px`);
      expect(svgStyle.fontSize).toBe(iconSize);
    },
  );
});
