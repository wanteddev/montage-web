import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { Button } from '../button';

import {
  Alert,
  AlertContainer,
  AlertContent,
  AlertDescription,
  AlertHeading,
  AlertTrigger,
} from '.';

describe('when given alert component', () => {
  beforeEach(() => {
    render(
      <Alert>
        <AlertTrigger>
          <Button data-testid="alert-trigger">Open alert</Button>
        </AlertTrigger>
        <AlertContainer>
          <AlertContent data-testid="alert-content">
            <AlertHeading>Heading</AlertHeading>
            <AlertDescription>Description</AlertDescription>
          </AlertContent>
        </AlertContainer>
      </Alert>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should pass accessibility tests', async () => {
    expect(await axe(screen.getByTestId('alert-trigger'))).toHaveNoViolations();

    fireEvent.click(screen.getByTestId('alert-trigger'));

    expect(await axe(screen.getByTestId('alert-content'))).toHaveNoViolations();
  });
});
