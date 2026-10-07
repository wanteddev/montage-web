import { theme } from '@montage-ui/engine';

import { typographyStyle } from '../../utils/typography';

import { formLabelStyle } from './style';

const stylesOf = (props: Parameters<typeof formLabelStyle>[0]) =>
  formLabelStyle(props)(theme.light as never).styles;

describe('formLabelStyle', () => {
  it('should keep an explicit variant at responsive breakpoints', () => {
    // `xs` only changes alignment, yet its media block used to re-emit the
    // size default (label1) and override `heading1` at every width.
    const styles = stylesOf({
      size: 'large',
      variant: 'heading1',
      xs: { align: 'center' },
    });

    expect(styles).not.toContain(typographyStyle('label1', 'bold').styles);
    expect(styles).toContain(typographyStyle('heading1', 'bold').styles);
  });

  it('should keep an explicit variant when the form control size is responsive', () => {
    const styles = stylesOf({
      size: 'large',
      variant: 'heading1',
      responsive: { xs: { size: 'medium' } },
    });

    expect(styles).not.toContain(typographyStyle('label2', 'bold').styles);
  });

  it('should follow the size default when no variant is given', () => {
    const styles = stylesOf({
      size: 'large',
      responsive: { xs: { size: 'medium' } },
    });

    expect(styles).toContain(typographyStyle('label2', 'bold').styles);
  });
});
