import { axe } from 'vitest-axe';
import { cleanup, render, screen } from '@testing-library/react';
import { Box, theme } from '@wanteddev/wds-engine';

import ThemeProvider from '../../theme-provider';

import { WithInteraction } from '.';

describe('when given with-interaction component', () => {
  beforeEach(() => {
    render(
      <WithInteraction>
        <Box data-testid="element">Test Content</Box>
      </WithInteraction>,
      {
        wrapper: ThemeProvider,
      },
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should render with-interaction component', () => {
    expect(
      screen
        .getByTestId('element')
        .querySelector('[wds-component="with-interaction"]'),
    ).toBeInTheDocument();
  });

  it('should pass accessibility tests', async () => {
    expect(
      await axe(
        screen
          .getByTestId('element')
          .querySelector('[wds-component="with-interaction"]') as Element,
      ),
    ).toHaveNoViolations();
  });

  it('should have correct initial styles', () => {
    const element = screen
      .getByTestId('element')
      .querySelector('[wds-component="with-interaction"]') as HTMLElement;

    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle({
      backgroundColor: theme.light.semantic.label.normal,
      opacity: '0',
    });
  });
});

describe('when given with-interaction component with multiple children', () => {
  afterEach(() => {
    cleanup();
  });

  it('should throw error for multiple children', () => {
    expect(() => {
      render(
        <WithInteraction>
          <Box>First</Box>
          <Box>Second</Box>
        </WithInteraction>,
        {
          wrapper: ThemeProvider,
        },
      );
    }).toThrow();
  });
});

describe('when given with-interaction component with color prop', () => {
  it('should handle custom color prop', () => {
    render(
      <WithInteraction color="semantic.primary.normal">
        <Box data-testid="color-element">Color Content</Box>
      </WithInteraction>,
      {
        wrapper: ThemeProvider,
      },
    );

    const colorElement = screen
      .getByTestId('color-element')
      .querySelector('[wds-component="with-interaction"]') as HTMLElement;

    expect(colorElement).toBeInTheDocument();
    expect(colorElement).toHaveStyle({
      backgroundColor: theme.light.semantic.primary.normal,
    });
  });
});
