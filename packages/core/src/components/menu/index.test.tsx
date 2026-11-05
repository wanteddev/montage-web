import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import { Button } from '../button';
import { IconButton } from '../icon-button';
import { TextButton } from '../text-button';

import {
  Menu,
  MenuActionAreaContent,
  MenuContent,
  MenuItem,
  MenuList,
  MenuTrigger,
} from '.';

import type { ReactElement } from 'react';

// Emotion class names are derived from the generated styles, so equal class
// names mean the slot default renders exactly like an explicit `size`.
const classNamesOf = (element: ReactElement) => {
  const { container, unmount } = render(element);
  const classNames = Array.from(
    container.querySelectorAll(
      '[data-testid="child"], [data-testid="child"] *',
    ),
  ).map((node) => node.getAttribute('class') ?? '');
  unmount();
  return classNames;
};

const textButton = (size?: 'small') => (
  <TextButton data-testid="child" size={size}>
    Text
  </TextButton>
);

describe('when given buttons inside menu action area content', () => {
  afterEach(() => {
    cleanup();
  });

  it.each([
    [
      'button',
      (size?: 'small') => (
        <Button data-testid="child" size={size}>
          Button
        </Button>
      ),
    ],
    ['text-button', textButton],
  ] as const)('should apply the small size in %s content', (variant, child) => {
    expect(
      classNamesOf(
        <MenuActionAreaContent variant={variant}>
          {child()}
        </MenuActionAreaContent>,
      ),
    ).toEqual(classNamesOf(child('small')));
  });
});

describe('when given icon button inside menu action area content', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render solid icon buttons at small size', () => {
    render(
      <MenuActionAreaContent variant="icon-button">
        <IconButton variant="solid" aria-label="Send">
          <svg />
        </IconButton>
      </MenuActionAreaContent>,
    );

    expect(window.getComputedStyle(screen.getByLabelText('Send')).width).toBe(
      'var(--dimension-32)',
    );
  });
});

// jsdom has no Web Animations API; AnimationPresence reads it on exit.
Object.defineProperty(window.Element.prototype, 'getAnimations', {
  value: () => [],
  writable: true,
});

const FocusExample = ({
  value,
  open,
  onOpenChange,
}: {
  value?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => (
  <Menu defaultValue={value} open={open} onOpenChange={onOpenChange}>
    <MenuTrigger>
      <button type="button">Open</button>
    </MenuTrigger>
    <MenuContent>
      <MenuList>
        <MenuItem value="first">First</MenuItem>
        <MenuItem value="second">Second</MenuItem>
        <MenuItem value="third">Third</MenuItem>
      </MenuList>
    </MenuContent>
  </Menu>
);

const getItem = (name: string) => screen.getByRole('menuitemradio', { name });
const getViewport = () =>
  getItem('First').closest<HTMLElement>('[data-radix-scroll-area-viewport]')!;

describe('when the menu opens', () => {
  afterEach(() => {
    cleanup();
  });

  it('should focus no item when opened by pointer with nothing selected', async () => {
    render(<FocusExample />);

    fireEvent.click(screen.getByRole('button', { name: 'Open' }), {
      detail: 1,
    });

    await waitFor(() => expect(getViewport()).toHaveFocus());

    fireEvent.keyDown(getViewport(), { key: 'ArrowDown' });
    expect(getItem('First')).toHaveFocus();
  });

  it('should move to the last item on ArrowUp from the popup', async () => {
    render(<FocusExample />);

    fireEvent.click(screen.getByRole('button', { name: 'Open' }), {
      detail: 1,
    });
    await waitFor(() => expect(getViewport()).toHaveFocus());

    fireEvent.keyDown(getViewport(), { key: 'ArrowUp' });
    expect(getItem('Third')).toHaveFocus();
  });

  it('should focus the first item when opened by keyboard', async () => {
    render(<FocusExample />);

    // Enter / Space on a button dispatches a click without detail.
    fireEvent.click(screen.getByRole('button', { name: 'Open' }), {
      detail: 0,
    });

    await waitFor(() => expect(getItem('First')).toHaveFocus());
  });

  it('should focus the first item when opened by ArrowDown', async () => {
    render(<FocusExample />);

    fireEvent.keyDown(screen.getByRole('button', { name: 'Open' }), {
      key: 'ArrowDown',
    });

    await waitFor(() => expect(getItem('First')).toHaveFocus());
  });

  it('should focus the selected item when opened by pointer', async () => {
    render(<FocusExample value="second" />);

    fireEvent.click(screen.getByRole('button', { name: 'Open' }), {
      detail: 1,
    });

    await waitFor(() => expect(getItem('Second')).toHaveFocus());
  });

  it('should have no accessibility violations when open', async () => {
    render(<FocusExample />);

    fireEvent.click(screen.getByRole('button', { name: 'Open' }), {
      detail: 1,
    });
    await waitFor(() => expect(getViewport()).toHaveFocus());

    // The popup is portaled to the body.
    expect(await axe(document.body)).toHaveNoViolations();
  });

  it('should not reuse a keyboard open when reopened through `open`', async () => {
    const { rerender } = render(<FocusExample open={false} />);

    // Opened by keyboard, then closed.
    fireEvent.click(screen.getByRole('button', { name: 'Open' }), {
      detail: 0,
    });
    rerender(<FocusExample open />);
    await waitFor(() => expect(getItem('First')).toHaveFocus());
    rerender(<FocusExample open={false} />);
    await waitFor(() =>
      expect(screen.queryByRole('menuitemradio')).not.toBeInTheDocument(),
    );

    // Reopened from outside, without the trigger.
    rerender(<FocusExample open />);

    await waitFor(() => expect(getViewport()).toHaveFocus());
  });
});
