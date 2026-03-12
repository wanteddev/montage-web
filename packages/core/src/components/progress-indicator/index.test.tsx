import { cleanup, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { ProgressIndicator } from '.';

describe('when given progress indicator component', () => {
  beforeEach(() => {
    render(<ProgressIndicator data-testid="progress-indicator" />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should pass accessibility tests', async () => {
    expect(
      await axe(screen.getByTestId('progress-indicator')),
    ).toHaveNoViolations();
  });
});
