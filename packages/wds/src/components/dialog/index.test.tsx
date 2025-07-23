import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { Button } from '../button';

import {
  Dialog,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogHeading,
  DialogTrigger,
} from '.';

describe('when given dialog component', () => {
  beforeEach(() => {
    render(
      <Dialog>
        <DialogTrigger>
          <Button data-testid="dialog-trigger">Open dialog</Button>
        </DialogTrigger>
        <DialogContainer>
          <DialogContent data-testid="dialog-content">
            <DialogHeading>Heading</DialogHeading>
            <DialogDescription>Description</DialogDescription>
          </DialogContent>
        </DialogContainer>
      </Dialog>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should pass accessibility tests', async () => {
    expect(
      await axe(screen.getByTestId('dialog-trigger')),
    ).toHaveNoViolations();

    fireEvent.click(screen.getByTestId('dialog-trigger'));

    expect(
      await axe(screen.getByTestId('dialog-content')),
    ).toHaveNoViolations();
  });
});
