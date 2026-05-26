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
    expect(dialog).toHaveAttribute('data-snap', 'full');

    const dimmer = document.querySelector('[data-role="modal-dimmer"]');
    expect(dimmer).toBeTruthy();
    if (dimmer) fireEvent.click(dimmer);

    // should still exist but be at the peek snap
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAttribute('data-snap', 'peek');
  });
});

describe('when given flexible bottom sheet', () => {
  afterEach(() => {
    cleanup();
  });

  it('seeds the half snap by default when flexible', () => {
    render(
      <Modal>
        <ModalTrigger>
          <Button data-testid="trigger">Open</Button>
        </ModalTrigger>
        <ModalContainer variant="bottom" resize="flexible" handle>
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
    expect(screen.getByRole('dialog')).toHaveAttribute('data-snap', 'half');
  });

  it('seeds the snap given by defaultSnap', () => {
    render(
      <Modal>
        <ModalTrigger>
          <Button data-testid="trigger">Open</Button>
        </ModalTrigger>
        <ModalContainer
          variant="bottom"
          resize="flexible"
          handle
          defaultSnap="full"
        >
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
    expect(screen.getByRole('dialog')).toHaveAttribute('data-snap', 'full');
  });

  it('collapses to peek on dimmer click when peekHeight is set', () => {
    render(
      <Modal>
        <ModalTrigger>
          <Button data-testid="trigger">Open</Button>
        </ModalTrigger>
        <ModalContainer
          variant="bottom"
          resize="flexible"
          handle
          peekHeight={64}
          defaultSnap="full"
        >
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
    const dimmer = document.querySelector('[data-role="modal-dimmer"]');
    if (dimmer) fireEvent.click(dimmer);
    expect(screen.getByRole('dialog')).toHaveAttribute('data-snap', 'peek');
  });

  it('closes on dimmer click when peekHeight is not set', () => {
    render(
      <Modal>
        <ModalTrigger>
          <Button data-testid="trigger">Open</Button>
        </ModalTrigger>
        <ModalContainer variant="bottom" resize="flexible" handle>
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
    if (dimmer) fireEvent.click(dimmer);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('fires onSnapChange when the snap transitions', () => {
    const onSnapChange = vi.fn();
    render(
      <Modal>
        <ModalTrigger>
          <Button data-testid="trigger">Open</Button>
        </ModalTrigger>
        <ModalContainer
          variant="bottom"
          resize="flexible"
          handle
          peekHeight={64}
          defaultSnap="full"
          onSnapChange={onSnapChange}
        >
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
    onSnapChange.mockClear();

    const dimmer = document.querySelector('[data-role="modal-dimmer"]');
    if (dimmer) fireEvent.click(dimmer);

    expect(onSnapChange).toHaveBeenCalledWith('peek');
  });

  it('renders the grabber and accepts mousedown without throwing', () => {
    render(
      <Modal>
        <ModalTrigger>
          <Button data-testid="trigger">Open</Button>
        </ModalTrigger>
        <ModalContainer variant="bottom" resize="flexible" handle>
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
    const grabber = document.querySelector(
      '[data-role="modal-container-grabber"]',
    );
    expect(grabber).toBeInTheDocument();
    // Smoke check only — release resolution depends on computed height /
    // bounding rect, which jsdom returns as 0 / empty, so we can't drive a
    // full gesture here. The release math is covered in helpers.test.tsx.
    if (grabber) {
      expect(() =>
        fireEvent.mouseDown(grabber, { clientY: 200 }),
      ).not.toThrow();
    }
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
