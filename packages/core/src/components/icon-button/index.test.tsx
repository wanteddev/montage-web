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
    ['large', { width: '30px', height: '30px', borderRadius: '8px' }],
    ['medium', { width: '28px', height: '28px', borderRadius: '8px' }],
    ['small', { width: '24px', height: '24px', borderRadius: '8px' }],
  ] as const)(
    'applies interaction box (icon ×1.5, even-ceiled) and radius for size=%s',
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

  it('applies the same formula to number size (e.g. 22 → 34 box, r10)', () => {
    const { container } = render(
      <IconButton variant="normal" size={22}>
        <svg />
      </IconButton>,
    );

    const style = computedStyle(getButton(container));

    expect(style.width).toBe('34px');
    expect(style.height).toBe('34px');
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
