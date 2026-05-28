import { cleanup, render } from '@testing-library/react';

import { IconButton } from '.';

const getButton = (container: HTMLElement) =>
  container.querySelector('[wds-component="icon-button"]') as HTMLElement;

const computedStyle = (el: HTMLElement) => window.getComputedStyle(el);

describe('IconButton — normal variant size policy', () => {
  afterEach(() => {
    cleanup();
  });

  it.each([
    ['xlarge', { width: '36px', height: '36px', borderRadius: '10px' }],
    ['large', { width: '32px', height: '32px', borderRadius: '10px' }],
    ['medium', { width: '28px', height: '28px', borderRadius: '8px' }],
    ['small', { width: '24px', height: '24px', borderRadius: '8px' }],
  ] as const)(
    'applies nearest dimension token box (icon ×1.5, tie→up) and radius for size=%s',
    (size, expected) => {
      const { container } = render(
        <IconButton variant="normal" size={size}>
          <svg />
        </IconButton>,
      );

      const button = getButton(container);
      const style = computedStyle(button);

      expect(style.width).toBe(expected.width);
      expect(style.height).toBe(expected.height);
      expect(style.borderRadius).toBe(expected.borderRadius);
    },
  );

  it('applies the same formula to number size (e.g. 22 → 32 box, r10)', () => {
    const { container } = render(
      <IconButton variant="normal" size={22}>
        <svg />
      </IconButton>,
    );

    const style = computedStyle(getButton(container));

    expect(style.width).toBe('32px');
    expect(style.height).toBe('32px');
    expect(style.borderRadius).toBe('10px');
  });

  it('clamps interaction to 24×24 minimum (WCAG 2.2 target size) for small icons', () => {
    const { container } = render(
      <IconButton variant="normal" size={10}>
        <svg />
      </IconButton>,
    );

    const style = computedStyle(getButton(container));

    expect(style.width).toBe('24px');
    expect(style.height).toBe('24px');
    expect(style.borderRadius).toBe('8px');
    expect(style.padding).toBe('7px');
  });

  it.each([
    [24, { width: '36px', height: '36px', padding: '6px' }],
    [20, { width: '32px', height: '32px', padding: '6px' }],
    [18, { width: '28px', height: '28px', padding: '5px' }],
    [16, { width: '24px', height: '24px', padding: '4px' }],
  ])(
    'applies nearest dimension token box (icon ×1.5, tie→up) for background variant size=%i',
    (size, expected) => {
      const { container } = render(
        <IconButton variant="background" size={size}>
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));

      expect(style.width).toBe(expected.width);
      expect(style.height).toBe(expected.height);
      expect(style.padding).toBe(expected.padding);
    },
  );

  it.each([
    ['outlined', 'medium', { width: '40px', height: '40px', padding: '11px' }],
    ['outlined', 'small', { width: '32px', height: '32px', padding: '8px' }],
    ['solid', 'medium', { width: '40px', height: '40px', padding: '11px' }],
    ['solid', 'small', { width: '32px', height: '32px', padding: '8px' }],
  ] as const)(
    '%s variant size=%s renders %o (icon = box − 2×padding)',
    (variant, size, expected) => {
      const { container } = render(
        <IconButton variant={variant} size={size}>
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));

      expect(style.width).toBe(expected.width);
      expect(style.height).toBe(expected.height);
      expect(style.padding).toBe(expected.padding);
    },
  );

  it.each([
    ['outlined', 20, '24px'],
    ['outlined', 10, '24px'],
    ['solid', 20, '24px'],
    ['solid', 10, '24px'],
  ] as const)(
    '%s variant clamps number size=%i to ≥24×24 (WCAG 2.2)',
    (variant, size, expectedDim) => {
      const { container } = render(
        <IconButton variant={variant} size={size}>
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));

      expect(style.width).toBe(expectedDim);
      expect(style.height).toBe(expectedDim);
    },
  );

  it('defaults to xlarge when size is not provided', () => {
    const { container } = render(
      <IconButton variant="normal">
        <svg />
      </IconButton>,
    );

    const style = computedStyle(getButton(container));

    expect(style.width).toBe('36px');
    expect(style.height).toBe('36px');
    expect(style.borderRadius).toBe('10px');
  });
});
