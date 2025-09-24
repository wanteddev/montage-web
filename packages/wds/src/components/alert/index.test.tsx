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

vi.mock('../animation-presence', () => ({
  useAnimationPresence: (open: boolean) => ({ isPresent: open, ref: vi.fn() }),
}));

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

  it('should open on trigger click and close by pressing Escape', () => {
    fireEvent.click(screen.getByTestId('alert-trigger'));
    expect(screen.getByTestId('alert-content')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByTestId('alert-content')).not.toBeInTheDocument();
  });

  it('should close when dimmer is clicked', () => {
    fireEvent.click(screen.getByTestId('alert-trigger'));
    expect(screen.getByTestId('alert-content')).toBeInTheDocument();

    const dimmer = document.querySelector('[data-role="alert-dimmer"]');
    expect(dimmer).toBeTruthy();
    if (dimmer) fireEvent.click(dimmer);

    expect(screen.queryByTestId('alert-content')).not.toBeInTheDocument();
  });
});

describe('when two alerts are open simultaneously', () => {
  afterEach(() => {
    cleanup();
  });

  it('should close only the topmost alert on Escape, leaving the previous one open', () => {
    render(
      <>
        <Alert>
          <AlertTrigger>
            <Button data-testid="alert-trigger-1">Open alert 1</Button>
          </AlertTrigger>
          <AlertContainer>
            <AlertContent data-testid="alert-content-1">
              <AlertHeading>Alert 1</AlertHeading>
              <AlertDescription>First</AlertDescription>
            </AlertContent>
          </AlertContainer>
        </Alert>

        <Alert>
          <AlertTrigger>
            <Button data-testid="alert-trigger-2">Open alert 2</Button>
          </AlertTrigger>
          <AlertContainer>
            <AlertContent data-testid="alert-content-2">
              <AlertHeading>Alert 2</AlertHeading>
              <AlertDescription>Second</AlertDescription>
            </AlertContent>
          </AlertContainer>
        </Alert>
      </>,
    );

    fireEvent.click(screen.getByTestId('alert-trigger-1'));
    fireEvent.click(screen.getByTestId('alert-trigger-2'));

    expect(screen.getByTestId('alert-content-1')).toBeInTheDocument();
    expect(screen.getByTestId('alert-content-2')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.getByTestId('alert-content-1')).toBeInTheDocument();
    expect(screen.queryByTestId('alert-content-2')).not.toBeInTheDocument();
  });

  it('should close only the topmost alert when clicking the top dimmer', () => {
    render(
      <>
        <Alert>
          <AlertTrigger>
            <Button data-testid="alert-trigger-1">Open alert 1</Button>
          </AlertTrigger>
          <AlertContainer>
            <AlertContent data-testid="alert-content-1">
              <AlertHeading>Alert 1</AlertHeading>
              <AlertDescription>First</AlertDescription>
            </AlertContent>
          </AlertContainer>
        </Alert>

        <Alert>
          <AlertTrigger>
            <Button data-testid="alert-trigger-2">Open alert 2</Button>
          </AlertTrigger>
          <AlertContainer>
            <AlertContent data-testid="alert-content-2">
              <AlertHeading>Alert 2</AlertHeading>
              <AlertDescription>Second</AlertDescription>
            </AlertContent>
          </AlertContainer>
        </Alert>
      </>,
    );

    fireEvent.click(screen.getByTestId('alert-trigger-1'));
    fireEvent.click(screen.getByTestId('alert-trigger-2'));

    expect(screen.getByTestId('alert-content-1')).toBeInTheDocument();
    expect(screen.getByTestId('alert-content-2')).toBeInTheDocument();

    const dimmers = Array.from(
      document.querySelectorAll('[data-role="alert-dimmer"]'),
    );
    expect(dimmers.length).toBeGreaterThanOrEqual(2);

    const topmost = dimmers.at(-1);
    if (topmost) fireEvent.click(topmost);

    expect(screen.getByTestId('alert-content-1')).toBeInTheDocument();
    expect(screen.queryByTestId('alert-content-2')).not.toBeInTheDocument();
  });
});

describe('when dismiss is disabled', () => {
  afterEach(() => {
    cleanup();
  });

  it('should not close when dimmer is clicked if disableOutsideClickClose is true', () => {
    render(
      <Alert>
        <AlertTrigger>
          <Button data-testid="alert-trigger">Open alert</Button>
        </AlertTrigger>
        <AlertContainer disableOutsideClickClose>
          <AlertContent data-testid="alert-content">
            <AlertHeading>Heading</AlertHeading>
            <AlertDescription>Description</AlertDescription>
          </AlertContent>
        </AlertContainer>
      </Alert>,
    );

    fireEvent.click(screen.getByTestId('alert-trigger'));
    expect(screen.getByTestId('alert-content')).toBeInTheDocument();

    const dimmer = document.querySelector('[data-role="alert-dimmer"]');
    expect(dimmer).toBeTruthy();
    if (dimmer) fireEvent.click(dimmer);

    expect(screen.getByTestId('alert-content')).toBeInTheDocument();
  });

  it('should not close on Escape if disableEscapeKeyDownClose is true', () => {
    render(
      <Alert>
        <AlertTrigger>
          <Button data-testid="alert-trigger">Open alert</Button>
        </AlertTrigger>
        <AlertContainer disableEscapeKeyDownClose>
          <AlertContent data-testid="alert-content">
            <AlertHeading>Heading</AlertHeading>
            <AlertDescription>Description</AlertDescription>
          </AlertContent>
        </AlertContainer>
      </Alert>,
    );

    fireEvent.click(screen.getByTestId('alert-trigger'));
    expect(screen.getByTestId('alert-content')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByTestId('alert-content')).toBeInTheDocument();
  });
});
