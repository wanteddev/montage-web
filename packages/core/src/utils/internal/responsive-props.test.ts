import { resolveInheritedResponsive } from './responsive-props';

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

  it('drops inherited breakpoints overridden by own higher breakpoints', () => {
    expect(
      resolveInheritedResponsive<SizeProps, 'size'>(
        { base: undefined, responsive: { md: { size: 'small' } } },
        { base: 'small', responsive: { sm: { size: 'xsmall' } } },
        'size',
      ),
    ).toEqual({ base: 'small', responsive: { md: { size: 'small' } } });
  });
});
