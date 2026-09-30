import { cleanup, render, renderHook, screen } from '@testing-library/react';

import { Button } from '../../components/button';
import { ContentBadge } from '../../components/content-badge';
import { FormFieldLayoutProvider } from '../../components/form-control/contexts';
import { useFormFieldSlotDefaults } from '../../components/form-control/hooks';

import { SlotDefaultsProvider, useInheritedSize } from './use-slot-defaults';

import type { ReactNode } from 'react';
import type { SlotDefaults } from './use-slot-defaults';

type BadgeSize = { size?: 'xsmall' | 'small' | 'medium' };

const renderInheritedBadgeSize = (
  wrapper: (props: { children: ReactNode }) => ReactNode,
  size?: BadgeSize['size'],
  responsive: Parameters<
    typeof useInheritedSize<'ContentBadge', BadgeSize>
  >[2] = {},
) =>
  renderHook(
    () =>
      useInheritedSize<'ContentBadge', BadgeSize>(
        'ContentBadge',
        size,
        responsive,
      ),
    { wrapper },
  ).result.current;

describe('SlotDefaultsProvider', () => {
  afterEach(() => {
    cleanup();
  });

  it('returns own values without a provider', () => {
    expect(renderInheritedBadgeSize(({ children }) => <>{children}</>)).toEqual(
      { size: undefined, responsive: {} },
    );
  });

  it('merges nested providers per component', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <SlotDefaultsProvider value={{ ContentBadge: { size: 'small' } }}>
        <SlotDefaultsProvider value={{ Button: { size: 'xsmall' } }}>
          {children}
        </SlotDefaultsProvider>
      </SlotDefaultsProvider>
    );

    expect(renderInheritedBadgeSize(wrapper).size).toBe('small');
  });

  it('passes the parent value through when value is undefined', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <SlotDefaultsProvider value={{ ContentBadge: { size: 'small' } }}>
        <SlotDefaultsProvider value={undefined}>
          {children}
        </SlotDefaultsProvider>
      </SlotDefaultsProvider>
    );

    expect(renderInheritedBadgeSize(wrapper).size).toBe('small');
  });

  it('keeps component defaults outside of a slot', () => {
    render(
      <>
        <Button data-testid="button">Button</Button>
        <ContentBadge data-testid="badge">Badge</ContentBadge>
      </>,
    );

    expect(
      window.getComputedStyle(screen.getByTestId('button')).minHeight,
    ).toBe('var(--dimension-40)');
    expect(
      window.getComputedStyle(screen.getByTestId('badge')).paddingTop,
    ).toBe('3px');
  });
});

describe('useInheritedSize', () => {
  const slot: SlotDefaults = {
    ContentBadge: { size: 'small', responsive: { sm: { size: 'xsmall' } } },
  };
  const wrapper = ({ children }: { children: ReactNode }) => (
    <SlotDefaultsProvider value={slot}>{children}</SlotDefaultsProvider>
  );

  it('inherits base and responsive sizes', () => {
    expect(renderInheritedBadgeSize(wrapper)).toEqual({
      size: 'small',
      responsive: { sm: { size: 'xsmall' } },
    });
  });

  it('ignores inherited sizes when own base size is set', () => {
    expect(renderInheritedBadgeSize(wrapper, 'medium')).toEqual({
      size: 'medium',
      responsive: {},
    });
  });

  // Breakpoints below own per-breakpoint sizes keep following the slot.
  it('keeps inherited breakpoints below own responsive sizes', () => {
    expect(
      renderInheritedBadgeSize(wrapper, undefined, { md: { size: 'medium' } }),
    ).toEqual({
      size: 'small',
      responsive: { sm: { size: 'xsmall' }, md: { size: 'medium' } },
    });
  });

  it('drops inherited breakpoints above own lower responsive sizes', () => {
    expect(
      renderInheritedBadgeSize(wrapper, undefined, { xs: { size: 'medium' } }),
    ).toEqual({ size: 'small', responsive: { xs: { size: 'medium' } } });
  });
});

describe('useFormFieldSlotDefaults', () => {
  it('maps base and responsive field sizes through the table', () => {
    const { result } = renderHook(
      () =>
        useFormFieldSlotDefaults({
          ContentBadge: { large: 'small', medium: 'xsmall' },
        }),
      {
        wrapper: ({ children }) => (
          <FormFieldLayoutProvider
            size="large"
            responsive={{ md: { size: 'medium' } }}
          >
            {children}
          </FormFieldLayoutProvider>
        ),
      },
    );

    expect(result.current).toEqual({
      ContentBadge: { size: 'small', responsive: { md: { size: 'xsmall' } } },
    });
  });

  it('returns undefined outside of a form field', () => {
    const { result } = renderHook(() =>
      useFormFieldSlotDefaults({
        ContentBadge: { large: 'small', medium: 'xsmall' },
      }),
    );

    expect(result.current).toBeUndefined();
  });
});
