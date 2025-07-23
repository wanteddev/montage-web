import { ThemeProvider, theme } from '@wanteddev/wds-engine';
import { IconBlank } from '@wanteddev/wds-icon';
import { cleanup, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { ToggleIcon } from '.';

import type { RenderResult } from '@testing-library/react';

describe('when given toggle-icon component', () => {
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = render(
      <ToggleIcon data-testid="toggle-icon" aria-label="test">
        <IconBlank />
      </ToggleIcon>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should render toggle icon component with active state', () => {
    expect(screen.getByTestId('toggle-icon')).toBeInTheDocument();

    rendered.unmount();

    render(
      <ToggleIcon data-testid="toggle-icon" active>
        <IconBlank />
      </ToggleIcon>,
      {
        wrapper: ThemeProvider,
      },
    );

    expect(screen.getByTestId('toggle-icon')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-icon')).toHaveStyle({
      color: theme.light.semantic.primary.normal,
    });
  });

  it('should pass accessibility tests', async () => {
    expect(await axe(screen.getByTestId('toggle-icon'))).toHaveNoViolations();

    rendered.unmount();

    render(
      <ToggleIcon data-testid="toggle-icon" aria-label="test" active>
        <IconBlank />
      </ToggleIcon>,
    );

    expect(await axe(screen.getByTestId('toggle-icon'))).toHaveNoViolations();
  });
});
