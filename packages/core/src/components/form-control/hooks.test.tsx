import { renderHook } from '@testing-library/react';

import { useFormFieldSize } from './hooks';

import { FormControl } from '.';

import type { ReactNode } from 'react';

type FieldProps = { size?: 'large' | 'medium'; width?: string };

const renderFieldSize = (
  control: { size?: 'large' | 'medium'; xs?: { size?: 'large' | 'medium' } },
  size?: 'large' | 'medium',
  responsive: Parameters<typeof useFormFieldSize<FieldProps>>[1] = {},
) =>
  renderHook(() => useFormFieldSize<FieldProps>(size, responsive), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <FormControl {...control}>{children}</FormControl>
    ),
  }).result.current;

describe('useFormFieldSize', () => {
  it('should fall back to large outside of a form control', () => {
    expect(
      renderHook(() => useFormFieldSize<FieldProps>(undefined, {})).result
        .current,
    ).toEqual({ size: 'large' });
  });

  it('should inherit the form control base and responsive sizes', () => {
    expect(
      renderFieldSize({ size: 'large', xs: { size: 'medium' } }),
    ).toMatchObject({ size: 'large', xs: { size: 'medium' } });
  });

  it('should ignore form control sizes when the field sets its own size', () => {
    const result = renderFieldSize(
      { size: 'large', xs: { size: 'medium' } },
      'large',
    );

    expect(result.size).toBe('large');
    expect(result.xs?.size).toBeUndefined();
  });

  it('should keep field responsive values when only those are set', () => {
    expect(
      renderFieldSize({ size: 'medium' }, undefined, {
        xs: { width: '100%' },
      }),
    ).toMatchObject({ size: 'medium', xs: { width: '100%' } });
  });
});
