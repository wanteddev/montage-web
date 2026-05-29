import { cleanup, render } from '@testing-library/react';

import { IconButton } from '.';

const getButton = (container: HTMLElement) =>
  container.querySelector('[wds-component="icon-button"]') as HTMLElement;

const computedStyle = (el: HTMLElement) => window.getComputedStyle(el);

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
        padding: 'var(--spacing-6)',
        borderRadius: 'var(--radius-10)',
      },
    ],
    [
      'large',
      {
        width: 'var(--dimension-32)',
        height: 'var(--dimension-32)',
        padding: 'var(--spacing-6)',
        borderRadius: 'var(--radius-10)',
      },
    ],
    [
      'medium',
      {
        width: 'var(--dimension-28)',
        height: 'var(--dimension-28)',
        padding: '5px',
        borderRadius: 'var(--radius-8)',
      },
    ],
    [
      'small',
      {
        width: 'var(--dimension-24)',
        height: 'var(--dimension-24)',
        padding: 'var(--spacing-4)',
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

      expect(style.width).toBe(expected.width);
      expect(style.height).toBe(expected.height);
      expect(style.padding).toBe(expected.padding);
      expect(style.borderRadius).toBe(expected.borderRadius);
    },
  );

  it('normal default size is xlarge (preset)', () => {
    const { container } = render(
      <IconButton variant="normal">
        <svg />
      </IconButton>,
    );

    const style = computedStyle(getButton(container));

    expect(style.width).toBe('var(--dimension-36)');
    expect(style.height).toBe('var(--dimension-36)');
    expect(style.borderRadius).toBe('var(--radius-10)');
  });

  // background has a single fixed size (32×32); string sizes are ignored.
  it.each(['xlarge', 'large', 'medium', 'small', undefined] as const)(
    'background variant always renders 32x32 regardless of size=%s',
    (size) => {
      const { container } = render(
        <IconButton variant="background" size={size}>
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));

      expect(style.width).toBe('var(--dimension-32)');
      expect(style.height).toBe('var(--dimension-32)');
      expect(style.padding).toBe('var(--spacing-6)');
    },
  );

  it.each([
    [
      'outlined',
      'medium',
      {
        width: 'var(--dimension-40)',
        height: 'var(--dimension-40)',
        padding: '11px',
      },
    ],
    [
      'outlined',
      'small',
      {
        width: 'var(--dimension-32)',
        height: 'var(--dimension-32)',
        padding: 'var(--spacing-8)',
      },
    ],
    [
      'solid',
      'medium',
      {
        width: 'var(--dimension-40)',
        height: 'var(--dimension-40)',
        padding: '11px',
      },
    ],
    [
      'solid',
      'small',
      {
        width: 'var(--dimension-32)',
        height: 'var(--dimension-32)',
        padding: 'var(--spacing-8)',
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

      expect(style.width).toBe(expected.width);
      expect(style.height).toBe(expected.height);
      expect(style.padding).toBe(expected.padding);
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

      expect(style.width).toBe('var(--dimension-40)');
      expect(style.padding).toBe('11px');
    },
  );

  // size={number}: box = max(24, N) literal px. padding and radius (normal)
  // snap to the nearest theme tokens. Icon visual is content-box (no font-size).
  it.each([
    [
      'normal',
      36,
      {
        width: '36px',
        padding: 'var(--spacing-6)',
        borderRadius: 'var(--radius-10)',
      },
    ],
    [
      'background',
      24,
      { width: '24px', padding: 'var(--spacing-4)', borderRadius: '' },
    ],
    [
      'outlined',
      32,
      { width: '32px', padding: 'var(--spacing-6)', borderRadius: '' },
    ],
  ] as const)(
    '%s variant size=%i snaps padding/radius to nearest tokens',
    (variant, size, expected) => {
      const { container } = render(
        <IconButton variant={variant} size={size}>
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));

      expect(style.width).toBe(expected.width);
      expect(style.height).toBe(expected.width);
      expect(style.padding).toBe(expected.padding);
      if (variant === 'normal') {
        expect(style.borderRadius).toBe(expected.borderRadius);
      }
    },
  );

  it.each(['normal', 'background', 'outlined', 'solid'] as const)(
    '%s variant size=10 (number) clamps box to 24px (WCAG 2.2)',
    (variant) => {
      const { container } = render(
        <IconButton variant={variant} size={10}>
          <svg />
        </IconButton>,
      );

      const style = computedStyle(getButton(container));

      expect(style.width).toBe('24px');
      expect(style.height).toBe('24px');
      expect(style.padding).toBe('var(--spacing-4)');
    },
  );
});
