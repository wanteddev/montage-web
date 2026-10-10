import { cleanup, render, screen } from '@testing-library/react';

import { FormControl, FormControlLabel } from '.';

// Emotion emits each rule into a <style> tag. Collect the `@media` rules that
// target the label's generated class — where the override used to happen.
const labelMediaCss = () => {
  const className = screen.getByText('Label').closest('label')!.classList[0]!;

  return Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent)
    .filter((css) => css.startsWith('@media') && css.includes(className))
    .join('\n');
};

describe('when given a variant to form control label with responsive props', () => {
  afterEach(() => {
    cleanup();
  });

  // A responsive value unrelated to typography used to re-emit the size
  // default (label1 / label2) at its breakpoint and override `variant`.
  it('should keep the variant at every breakpoint', () => {
    render(
      <FormControl xs={{ size: 'medium' }}>
        <FormControlLabel variant="heading1" md={{ align: 'center' }}>
          Label
        </FormControlLabel>
      </FormControl>,
    );

    const css = labelMediaCss();

    expect(css).toContain('--typography-heading1-fontSize');
    expect(css).not.toMatch(/--typography-label[12]-fontSize/);
  });

  it('should follow the size default when no variant is given', () => {
    render(
      <FormControl xs={{ size: 'medium' }}>
        <FormControlLabel>Label</FormControlLabel>
      </FormControl>,
    );

    expect(labelMediaCss()).toContain('--typography-label2-fontSize');
  });
});

describe('when given a responsive sx to form control', () => {
  afterEach(() => {
    cleanup();
  });

  // FormControl used to hand its whole responsive props (sx included) to the
  // label through the layout context, applying the sx twice.
  it('should not apply the sx to the label', () => {
    render(
      <FormControl sm={{ size: 'medium', sx: { marginTop: 20 } }}>
        <FormControlLabel>Label</FormControlLabel>
      </FormControl>,
    );

    const css = labelMediaCss();

    expect(css).toContain('--typography-label2-fontSize');
    expect(css).not.toContain('margin-top');
  });
});
