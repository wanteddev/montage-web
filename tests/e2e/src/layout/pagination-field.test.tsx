import { cleanup } from '@testing-library/react';
import { Pagination, PaginationField } from '@montage-ui/core';

import { renderWithProvider } from '../helpers';

afterEach(() => cleanup());

// Layout needs a real browser: jsdom computes no box sizes.
describe('PaginationField', () => {
  it('keeps the fixed 32px field and enough room for a two-digit page', () => {
    renderWithProvider(
      <Pagination
        variant="extended"
        totalPages={99}
        trailingContent={<PaginationField defaultValue="20" />}
      />,
    );

    const input = document.querySelector(
      '[data-component="text-field"] input',
    ) as HTMLInputElement;
    const field = input.closest('[data-component="text-field"]')!;
    const wrapper = field.querySelector('[data-role="text-field-wrapper"]')!;

    expect(field.getBoundingClientRect().height).toBe(32);
    // The wrapper fits inside the field (no vertical overflow) and the input
    // spans it — 3.x gave ~41px for the digits.
    expect(wrapper.getBoundingClientRect().height).toBeLessThanOrEqual(20);
    expect(input.clientWidth).toBeGreaterThanOrEqual(35);
    expect(input.scrollWidth).toBeLessThanOrEqual(input.clientWidth);
  });
});
