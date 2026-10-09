import {
  mergeResponsiveProps,
  resolveInheritedResponsive,
} from './responsive-props';

type SizeProps = { size?: 'small' | 'xsmall'; width?: string };

describe('resolveInheritedResponsive', () => {
  it('returns own values when nothing is inherited', () => {
    expect(
      resolveInheritedResponsive<SizeProps, 'size'>(
        { base: undefined, responsive: { md: { size: 'xsmall' } } },
        undefined,
        'size',
      ),
    ).toEqual({ base: undefined, responsive: { md: { size: 'xsmall' } } });
  });

  it('ignores inherited base and responsive values when own base is set', () => {
    expect(
      resolveInheritedResponsive<SizeProps, 'size'>(
        { base: 'small', responsive: { xs: { width: '100%' } } },
        { base: 'xsmall', responsive: { xs: { size: 'xsmall' } } },
        'size',
      ),
    ).toEqual({ base: 'small', responsive: { xs: { width: '100%' } } });
  });

  it('inherits base and merges responsive values when own base is not set', () => {
    expect(
      resolveInheritedResponsive<SizeProps, 'size'>(
        { base: undefined, responsive: { xs: { width: '100%' } } },
        { base: 'small', responsive: { sm: { size: 'xsmall' } } },
        'size',
      ),
    ).toEqual({
      base: 'small',
      responsive: { xs: { width: '100%' }, sm: { size: 'xsmall' } },
    });
  });

  it('keeps inherited breakpoints below own responsive sizes', () => {
    expect(
      resolveInheritedResponsive<SizeProps, 'size'>(
        { base: undefined, responsive: { md: { size: 'small' } } },
        { base: 'small', responsive: { sm: { size: 'xsmall' } } },
        'size',
      ),
    ).toEqual({
      base: 'small',
      responsive: { sm: { size: 'xsmall' }, md: { size: 'small' } },
    });
  });

  it('drops inherited breakpoints overridden by own lower breakpoints', () => {
    expect(
      resolveInheritedResponsive<SizeProps, 'size'>(
        { base: undefined, responsive: { xs: { size: 'small' } } },
        { base: 'small', responsive: { sm: { size: 'xsmall' } } },
        'size',
      ),
    ).toEqual({ base: 'small', responsive: { xs: { size: 'small' } } });
  });
});

describe('mergeResponsiveProps', () => {
  type FieldProps = { size?: 'large' | 'medium'; width?: string };

  it('keeps fallback breakpoints below the user override', () => {
    expect(
      mergeResponsiveProps<FieldProps, 'size'>(
        { md: { size: 'large' } },
        { sm: { size: 'medium' } },
        'size',
      ),
    ).toEqual({ sm: { size: 'medium' }, md: { size: 'large' } });
  });

  it('drops fallback breakpoints the user override cascades over', () => {
    expect(
      mergeResponsiveProps<FieldProps, 'size'>(
        { xs: { size: 'large' } },
        { sm: { size: 'medium' } },
        'size',
      ),
    ).toEqual({ xs: { size: 'large' } });
  });

  it('merges fallback into breakpoints without the key', () => {
    expect(
      mergeResponsiveProps<FieldProps, 'size'>(
        { xs: { width: '100%' } },
        { sm: { size: 'medium' } },
        'size',
      ),
    ).toEqual({ xs: { width: '100%' }, sm: { size: 'medium' } });
  });

  it('takes only the key from the fallback', () => {
    expect(
      mergeResponsiveProps<FieldProps, 'size'>(
        {},
        { sm: { size: 'medium', sx: { marginTop: 20 } } },
        'size',
      ),
    ).toEqual({ sm: { size: 'medium' } });
  });
});
