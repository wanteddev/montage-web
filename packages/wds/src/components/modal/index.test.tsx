import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { Button } from '../button';
import { ActionArea, ActionAreaButton } from '../action-area';

import {
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalDescription,
  ModalHeading,
  ModalNavigation,
  ModalSummary,
  ModalTrigger,
} from '.';

vi.mock('../animation-presence', () => ({
  useAnimationPresence: (open: boolean) => ({ isPresent: open, ref: vi.fn() }),
}));

describe('when given modal component', () => {
  beforeEach(() => {
    render(
      <Modal>
        <ModalTrigger>
          <Button data-testid="modal-trigger">Open modal</Button>
        </ModalTrigger>
        <ModalContainer>
          <ModalNavigation data-testid="modal-navigation">
            Title
          </ModalNavigation>
          <ModalContent data-testid="modal-content">
            <ModalContentItem>
              <ModalHeading>Heading</ModalHeading>
              <ModalSummary>Summary</ModalSummary>
              <ModalDescription>Description</ModalDescription>
            </ModalContentItem>
          </ModalContent>
          <ActionArea>
            <ActionAreaButton>Main action</ActionAreaButton>
          </ActionArea>
        </ModalContainer>
      </Modal>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should pass accessibility tests', async () => {
    expect(await axe(screen.getByTestId('modal-trigger'))).toHaveNoViolations();

    fireEvent.click(screen.getByTestId('modal-trigger'));

    expect(await axe(screen.getByTestId('modal-content'))).toHaveNoViolations();
  });

  it('should open and close via dimmer click (popup variant)', () => {
    render(
      <Modal>
        <ModalTrigger>
          <Button data-testid="trigger">Open</Button>
        </ModalTrigger>
        <ModalContainer variant="popup">
          <ModalNavigation>Title</ModalNavigation>
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Heading</ModalHeading>
              <ModalSummary>Summary</ModalSummary>
              <ModalDescription>Description</ModalDescription>
            </ModalContentItem>
          </ModalContent>
          <ActionArea>
            <ActionAreaButton>Action</ActionAreaButton>
          </ActionArea>
        </ModalContainer>
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('trigger'));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const dimmer = document.querySelector('[data-role="modal-dimmer"]');
    expect(dimmer).toBeTruthy();
    if (dimmer) fireEvent.click(dimmer);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('when given bottom sheet variant', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render handle and hide to peek height when dimmer is clicked (not fully close)', () => {
    render(
      <Modal>
        <ModalTrigger>
          <Button data-testid="trigger">Open</Button>
        </ModalTrigger>
        <ModalContainer variant="bottom" handle peekHeight={64}>
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Heading</ModalHeading>
              <ModalSummary>Summary</ModalSummary>
              <ModalDescription>Description</ModalDescription>
            </ModalContentItem>
          </ModalContent>
          <ActionArea>
            <ActionAreaButton>Action</ActionAreaButton>
          </ActionArea>
        </ModalContainer>
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('trigger'));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(
      document.querySelector('[data-role="modal-container-grabber"]'),
    ).toBeInTheDocument();
    expect(dialog).toHaveAttribute('data-visibility', 'visible');

    const dimmer = document.querySelector('[data-role="modal-dimmer"]');
    expect(dimmer).toBeTruthy();
    if (dimmer) fireEvent.click(dimmer);

    // should still exist but be hidden (peek state)
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAttribute(
      'data-visibility',
      'hidden',
    );
  });
});

describe('when given full variant', () => {
  afterEach(() => {
    cleanup();
  });

  it('should open and close via close button', () => {
    render(
      <Modal>
        <ModalTrigger>
          <Button data-testid="trigger">Open</Button>
        </ModalTrigger>
        <ModalContainer variant="full">
          <ModalNavigation>Title</ModalNavigation>
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Heading</ModalHeading>
              <ModalSummary>Summary</ModalSummary>
              <ModalDescription>Description</ModalDescription>
            </ModalContentItem>
          </ModalContent>
          <ActionArea>
            <ActionAreaButton>Action</ActionAreaButton>
          </ActionArea>
        </ModalContainer>
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('trigger'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // default trailingContent has a close button with aria-label
    const close = screen.getByLabelText('Close dialog');
    fireEvent.click(close);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('when two modals are open simultaneously', () => {
  afterEach(() => {
    cleanup();
  });

  it('should close only the topmost modal on Escape, leaving the previous one open', () => {
    render(
      <>
        <Modal>
          <ModalTrigger>
            <Button data-testid="modal-trigger-1">Open modal 1</Button>
          </ModalTrigger>
          <ModalContainer variant="popup">
            <ModalContent>
              <ModalContentItem>
                <ModalHeading>Heading 1</ModalHeading>
                <ModalSummary>Summary 1</ModalSummary>
                <ModalDescription>Description 1</ModalDescription>
              </ModalContentItem>
            </ModalContent>
          </ModalContainer>
        </Modal>

        <Modal>
          <ModalTrigger>
            <Button data-testid="modal-trigger-2">Open modal 2</Button>
          </ModalTrigger>
          <ModalContainer variant="popup">
            <ModalContent>
              <ModalContentItem>
                <ModalHeading>Heading 2</ModalHeading>
                <ModalSummary>Summary 2</ModalSummary>
                <ModalDescription>Description 2</ModalDescription>
              </ModalContentItem>
            </ModalContent>
          </ModalContainer>
        </Modal>
      </>,
    );

    fireEvent.click(screen.getByTestId('modal-trigger-1'));
    fireEvent.click(screen.getByTestId('modal-trigger-2'));

    // Both dialogs exist in DOM
    expect(document.querySelectorAll('[role="dialog"]').length).toBe(2);
    // But only the topmost is accessible due to aria-hidden applied to others
    expect(screen.getAllByRole('dialog').length).toBe(1);
    expect(screen.getByText('Heading 2')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.getAllByRole('dialog').length).toBe(1);
    expect(screen.getByText('Heading 1')).toBeInTheDocument();
    expect(screen.queryByText('Heading 2')).not.toBeInTheDocument();
  });
});

describe('when dismiss is disabled', () => {
  afterEach(() => {
    cleanup();
  });

  it('should not close when dimmer is clicked if disableOutsideClickClose is true', () => {
    render(
      <Modal>
        <ModalTrigger>
          <Button data-testid="trigger">Open</Button>
        </ModalTrigger>
        <ModalContainer variant="popup" disableOutsideClickClose>
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Heading</ModalHeading>
              <ModalSummary>Summary</ModalSummary>
              <ModalDescription>Description</ModalDescription>
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('trigger'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const dimmer = document.querySelector('[data-role="modal-dimmer"]');
    expect(dimmer).toBeTruthy();
    if (dimmer) fireEvent.click(dimmer);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should not close on Escape if disableEscapeKeyDownClose is true', () => {
    render(
      <Modal>
        <ModalTrigger>
          <Button data-testid="trigger">Open</Button>
        </ModalTrigger>
        <ModalContainer variant="popup" disableEscapeKeyDownClose>
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Heading</ModalHeading>
              <ModalSummary>Summary</ModalSummary>
              <ModalDescription>Description</ModalDescription>
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('trigger'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
