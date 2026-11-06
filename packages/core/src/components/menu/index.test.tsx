import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { useRef } from 'react';
import { axe } from 'vitest-axe';

import { Button } from '../button';
import { IconButton } from '../icon-button';
import { Modal, ModalContainer, ModalContent, ModalNavigation } from '../modal';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { TextButton } from '../text-button';
import { TextField } from '../text-field';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';

import {
  Menu,
  MenuActionArea,
  MenuActionAreaContent,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuItemContent,
  MenuList,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
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

/**
 * jsdom's `PointerEvent` drops `pointerType` and coordinates; dispatch a
 * `MouseEvent` carrying them instead. React derives `onPointerLeave` from
 * `pointerout`, so leaving is fired as that with a `relatedTarget`.
 */
const firePointer = (
  element: Element,
  type: 'pointermove' | 'pointerout',
  {
    pointerType = 'mouse',
    clientX = 0,
    clientY = 0,
    relatedTarget = null,
  }: {
    pointerType?: string;
    clientX?: number;
    clientY?: number;
    relatedTarget?: Element | null;
  } = {},
) => {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX,
    clientY,
    relatedTarget,
  });
  Object.defineProperty(event, 'pointerType', { value: pointerType });
  fireEvent(element, event);
};

const mockRect = (element: Element, rect: Partial<DOMRect>) => {
  const { left = 0, top = 0, width = 0, height = 0 } = rect;
  element.getBoundingClientRect = () =>
    ({
      left,
      top,
      width,
      height,
      right: left + width,
      bottom: top + height,
      x: left,
      y: top,
    }) as DOMRect;
};

const SubmenuExample = ({
  onValueChange,
  disabled,
}: {
  onValueChange?: (value?: string | Array<string>) => void;
  disabled?: boolean;
}) => (
  <Menu defaultOpen onValueChange={onValueChange}>
    <MenuTrigger>
      <button type="button">Open</button>
    </MenuTrigger>
    <MenuContent>
      <MenuList>
        <MenuItem value="copy">Copy</MenuItem>
        <MenuSub>
          <MenuSubTrigger disabled={disabled}>Share</MenuSubTrigger>
          <MenuSubContent>
            <MenuList>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="link">Link</MenuItem>
            </MenuList>
          </MenuSubContent>
        </MenuSub>
        <MenuItem value="delete">Delete</MenuItem>
      </MenuList>
    </MenuContent>
  </Menu>
);

const getSubTrigger = () => screen.getByRole('menuitem', { name: 'Share' });
const querySubItem = () =>
  screen.queryByRole('menuitemradio', { name: 'Email' });

describe('when given a submenu', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('should expose the trigger as a menu popup button', async () => {
    const { container } = render(<SubmenuExample />);

    const trigger = getSubTrigger();
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(
      trigger.querySelector('[data-role="menu-sub-trigger-chevron"]'),
    ).toBeInTheDocument();

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('data-status', 'open');
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should open on ArrowRight and move focus to the first item', async () => {
    render(<SubmenuExample />);

    const trigger = getSubTrigger();
    act(() => trigger.focus());
    fireEvent.keyDown(trigger, { key: 'ArrowRight' });

    await waitFor(() => expect(querySubItem()).toHaveFocus());
  });

  it('should close on ArrowLeft and return focus to the trigger', async () => {
    render(<SubmenuExample />);

    const trigger = getSubTrigger();
    act(() => trigger.focus());
    fireEvent.keyDown(trigger, { key: 'Enter' });
    await waitFor(() => expect(querySubItem()).toHaveFocus());

    fireEvent.keyDown(querySubItem()!, { key: 'ArrowLeft' });

    await waitFor(() => expect(querySubItem()).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it('should close only the submenu on Escape', async () => {
    render(<SubmenuExample />);

    const trigger = getSubTrigger();
    act(() => trigger.focus());
    fireEvent.keyDown(trigger, { key: 'ArrowRight' });
    await waitFor(() => expect(querySubItem()).toHaveFocus());

    fireEvent.keyDown(document.activeElement!, { key: 'Escape' });

    await waitFor(() => expect(querySubItem()).not.toBeInTheDocument());
    expect(getSubTrigger()).toBeInTheDocument();
  });

  it('should keep focus on the trigger when opened by click', () => {
    render(<SubmenuExample />);

    const trigger = getSubTrigger();
    act(() => trigger.focus());
    fireEvent.click(trigger);

    expect(querySubItem()).toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('should share the value of the root menu', () => {
    const onValueChange = vi.fn();
    render(<SubmenuExample onValueChange={onValueChange} />);

    fireEvent.click(getSubTrigger());
    fireEvent.click(querySubItem()!);

    expect(onValueChange).toHaveBeenCalledWith('email');
  });

  it('should not open when the trigger is disabled', () => {
    render(<SubmenuExample disabled />);

    const trigger = getSubTrigger();
    fireEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: 'ArrowRight' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should open on mouse hover after the enter delay, but not on touch', () => {
    vi.useFakeTimers();
    render(<SubmenuExample />);

    const trigger = getSubTrigger();

    firePointer(trigger, 'pointermove', { pointerType: 'touch' });
    act(() => vi.advanceTimersByTime(200));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    firePointer(trigger, 'pointermove');
    act(() => vi.advanceTimersByTime(50));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    act(() => vi.advanceTimersByTime(50));
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('should close when another item of the parent menu is hovered', () => {
    render(<SubmenuExample />);

    const trigger = getSubTrigger();
    fireEvent.click(trigger);

    firePointer(
      screen.getByRole('menuitemradio', { name: 'Copy' }),
      'pointermove',
    );

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should stay open while the pointer crosses the grace area', () => {
    vi.useFakeTimers();
    render(<SubmenuExample />);

    const trigger = getSubTrigger();
    fireEvent.click(trigger);

    const content = querySubItem()!.closest('[role="dialog"]')!;
    const sibling = screen.getByRole('menuitemradio', { name: 'Delete' });

    // Trigger at x 0–100 / y 40–80, submenu to its right at x 104–304 / y 40–240.
    mockRect(trigger, { left: 0, top: 40, width: 100, height: 40 });
    mockRect(content, { left: 104, top: 40, width: 200, height: 200 });

    firePointer(trigger, 'pointerout', {
      clientX: 100,
      clientY: 70,
      relatedTarget: sibling,
    });
    // Heading down-right towards the submenu, over the sibling below.
    firePointer(sibling, 'pointermove', { clientX: 102, clientY: 85 });

    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Resting on the sibling instead of reaching the submenu.
    act(() => vi.advanceTimersByTime(300));

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should close the submenu when the pointer leaves the grace area', () => {
    render(<SubmenuExample />);

    const trigger = getSubTrigger();
    fireEvent.click(trigger);

    const content = querySubItem()!.closest('[role="dialog"]')!;
    const sibling = screen.getByRole('menuitemradio', { name: 'Delete' });

    mockRect(trigger, { left: 0, top: 40, width: 100, height: 40 });
    mockRect(content, { left: 104, top: 40, width: 200, height: 200 });

    firePointer(trigger, 'pointerout', {
      clientX: 100,
      clientY: 70,
      relatedTarget: sibling,
    });
    // Straight down, away from the submenu.
    firePointer(sibling, 'pointermove', { clientX: 40, clientY: 90 });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should keep the grace area when the submenu falls back below the trigger', () => {
    render(<SubmenuExample />);

    const trigger = getSubTrigger();
    fireEvent.click(trigger);

    const content = querySubItem()!.closest('[role="dialog"]')!;
    const sibling = screen.getByRole('menuitemradio', { name: 'Delete' });

    // A narrow viewport: the submenu sits below the trigger at y 84–284.
    mockRect(trigger, { left: 0, top: 40, width: 100, height: 40 });
    mockRect(content, { left: 20, top: 84, width: 200, height: 200 });

    firePointer(trigger, 'pointerout', {
      clientX: 50,
      clientY: 80,
      relatedTarget: sibling,
    });
    firePointer(sibling, 'pointermove', { clientX: 52, clientY: 82 });

    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Sideways, away from the submenu.
    firePointer(sibling, 'pointermove', { clientX: 0, clientY: 82 });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('when combining a submenu with other components', () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  const openSubByClick = (name: string) => {
    const trigger = screen.getByRole('menuitem', { name });
    fireEvent.click(trigger);
    return trigger;
  };

  const openSubByKeyboard = (name: string) => {
    const trigger = screen.getByRole('menuitem', { name });
    act(() => trigger.focus());
    fireEvent.keyDown(trigger, { key: 'ArrowRight' });
    return trigger;
  };

  describe('item variants inside the submenu', () => {
    it('should toggle checkbox items without closing the submenu', () => {
      const onValueChange = vi.fn();
      render(
        <Menu defaultOpen defaultValue={[]} onValueChange={onValueChange}>
          <MenuTrigger>
            <button type="button">Open</button>
          </MenuTrigger>
          <MenuContent>
            <MenuList>
              <MenuSub>
                <MenuSubTrigger>Filter</MenuSubTrigger>
                <MenuSubContent>
                  <MenuList>
                    <MenuItem variant="checkbox" value="a">
                      A
                    </MenuItem>
                    <MenuItem variant="checkbox" value="b">
                      B
                    </MenuItem>
                  </MenuList>
                </MenuSubContent>
              </MenuSub>
            </MenuList>
          </MenuContent>
        </Menu>,
      );

      const trigger = openSubByClick('Filter');
      const itemA = screen.getByRole('menuitemcheckbox', { name: 'A' });

      fireEvent.click(itemA);
      expect(onValueChange).toHaveBeenLastCalledWith(['a']);
      expect(itemA).toHaveAttribute('aria-checked', 'true');

      // Keyboard toggles through the same click path.
      const itemB = screen.getByRole('menuitemcheckbox', { name: 'B' });
      act(() => itemB.focus());
      fireEvent.keyDown(itemB, { key: ' ' });
      expect(onValueChange).toHaveBeenLastCalledWith(['a', 'b']);

      fireEvent.click(itemA);
      expect(onValueChange).toHaveBeenLastCalledWith(['b']);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should select radio items into the root value', () => {
      const onValueChange = vi.fn();
      render(
        <Menu defaultOpen onValueChange={onValueChange}>
          <MenuTrigger>
            <button type="button">Open</button>
          </MenuTrigger>
          <MenuContent>
            <MenuList>
              <MenuSub>
                <MenuSubTrigger>Sort</MenuSubTrigger>
                <MenuSubContent>
                  <MenuList>
                    <MenuItem variant="radio" value="new">
                      Newest
                    </MenuItem>
                    <MenuItem variant="radio" value="old">
                      Oldest
                    </MenuItem>
                  </MenuList>
                </MenuSubContent>
              </MenuSub>
            </MenuList>
          </MenuContent>
        </Menu>,
      );

      openSubByClick('Sort');
      fireEvent.click(screen.getByRole('menuitemradio', { name: 'Oldest' }));

      expect(onValueChange).toHaveBeenLastCalledWith('old');
      expect(
        screen.getByRole('menuitemradio', { name: 'Oldest' }),
      ).toHaveAttribute('aria-checked', 'true');
      expect(
        screen.getByRole('menuitemradio', { name: 'Newest' }),
      ).toHaveAttribute('aria-checked', 'false');
    });

    it('should focus the selected item when the submenu opens by keyboard', async () => {
      render(
        <Menu defaultOpen defaultValue="b">
          <MenuTrigger>
            <button type="button">Open</button>
          </MenuTrigger>
          <MenuContent>
            <MenuList>
              <MenuSub>
                <MenuSubTrigger>More</MenuSubTrigger>
                <MenuSubContent>
                  <MenuList>
                    <MenuItem value="a">A</MenuItem>
                    <MenuItem value="b">B</MenuItem>
                  </MenuList>
                </MenuSubContent>
              </MenuSub>
            </MenuList>
          </MenuContent>
        </Menu>,
      );

      openSubByKeyboard('More');

      await waitFor(() =>
        expect(screen.getByRole('menuitemradio', { name: 'B' })).toHaveFocus(),
      );
    });

    it('should skip disabled items and render group titles', async () => {
      render(
        <Menu defaultOpen>
          <MenuTrigger>
            <button type="button">Open</button>
          </MenuTrigger>
          <MenuContent>
            <MenuList>
              <MenuSub>
                <MenuSubTrigger>More</MenuSubTrigger>
                <MenuSubContent>
                  <MenuList>
                    <MenuGroup title="Group title">
                      <MenuItem value="a" disabled>
                        A
                      </MenuItem>
                      <MenuItem value="b">B</MenuItem>
                      <MenuItem value="c">C</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </MenuSubContent>
              </MenuSub>
            </MenuList>
          </MenuContent>
        </Menu>,
      );

      openSubByKeyboard('More');

      expect(screen.getByText('Group title')).toBeInTheDocument();
      await waitFor(() =>
        expect(screen.getByRole('menuitemradio', { name: 'B' })).toHaveFocus(),
      );

      fireEvent.keyDown(screen.getByRole('menuitemradio', { name: 'B' }), {
        key: 'ArrowDown',
      });
      await waitFor(() =>
        expect(screen.getByRole('menuitemradio', { name: 'C' })).toHaveFocus(),
      );
    });
  });

  describe('text field inside the submenu', () => {
    const renderWithField = () =>
      render(
        <Menu defaultOpen>
          <MenuTrigger>
            <button type="button">Open</button>
          </MenuTrigger>
          <MenuContent>
            <MenuList>
              <MenuSub>
                <MenuSubTrigger>Search</MenuSubTrigger>
                <MenuSubContent>
                  <TextField aria-label="Query" />
                  <MenuList>
                    <MenuItem value="a">A</MenuItem>
                  </MenuList>
                </MenuSubContent>
              </MenuSub>
            </MenuList>
          </MenuContent>
        </Menu>,
      );

    it('should keep the submenu open on caret and typing keys', () => {
      renderWithField();

      const trigger = openSubByClick('Search');
      const input = screen.getByRole('textbox', { name: 'Query' });
      act(() => input.focus());

      for (const key of ['ArrowLeft', 'ArrowRight', ' ', 'Enter', 'Home']) {
        fireEvent.keyDown(input, { key });
      }

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(input).toHaveFocus();
    });

    it('should close only the submenu on Escape from the field', async () => {
      renderWithField();

      openSubByClick('Search');
      const input = screen.getByRole('textbox', { name: 'Query' });
      act(() => input.focus());

      fireEvent.keyDown(input, { key: 'Escape' });

      await waitFor(() =>
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument(),
      );
      expect(screen.getByRole('menuitem', { name: 'Search' })).toHaveFocus();
    });

    it('should focus a field through onMountAutoFocus', async () => {
      // `autoFocus` focuses during commit, before this submenu's focus scope
      // pauses the parent's trap, so the parent pulls focus back. Focusing
      // from `onMountAutoFocus` runs once the submenu owns focus.
      const FieldExample = () => {
        const inputRef = useRef<HTMLInputElement>(null);

        return (
          <Menu defaultOpen>
            <MenuTrigger>
              <button type="button">Open</button>
            </MenuTrigger>
            <MenuContent>
              <MenuList>
                <MenuSub>
                  <MenuSubTrigger>Search</MenuSubTrigger>
                  <MenuSubContent
                    onMountAutoFocus={(e) => {
                      e.preventDefault();
                      inputRef.current?.focus();
                    }}
                  >
                    <TextField ref={inputRef} aria-label="Query" />
                    <MenuList>
                      <MenuItem value="a">A</MenuItem>
                    </MenuList>
                  </MenuSubContent>
                </MenuSub>
              </MenuList>
            </MenuContent>
          </Menu>
        );
      };
      render(<FieldExample />);

      openSubByKeyboard('Search');

      await waitFor(() =>
        expect(screen.getByRole('textbox', { name: 'Query' })).toHaveFocus(),
      );
    });
  });

  describe('tooltip inside the menu', () => {
    it('should close the tooltip before the submenu on Escape', async () => {
      render(
        <Menu defaultOpen>
          <MenuTrigger>
            <button type="button">Open</button>
          </MenuTrigger>
          <MenuContent>
            <MenuList>
              <MenuSub>
                <MenuSubTrigger>More</MenuSubTrigger>
                <MenuSubContent>
                  <MenuList>
                    <Tooltip enterDelay={0}>
                      <TooltipTrigger>
                        <MenuItem value="a">A</MenuItem>
                      </TooltipTrigger>
                      <TooltipContent>Tooltip text</TooltipContent>
                    </Tooltip>
                  </MenuList>
                </MenuSubContent>
              </MenuSub>
            </MenuList>
          </MenuContent>
        </Menu>,
      );

      const trigger = openSubByKeyboard('More');
      const item = screen.getByRole('menuitemradio', { name: 'A' });
      await waitFor(() => expect(item).toHaveFocus());
      fireEvent.focus(item);
      await screen.findByText('Tooltip text');

      fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
      await waitFor(() =>
        expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument(),
      );
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
      await waitFor(() =>
        expect(trigger).toHaveAttribute('aria-expanded', 'false'),
      );
    });

    it('should keep the sub trigger working inside a tooltip trigger', () => {
      render(
        <Menu defaultOpen>
          <MenuTrigger>
            <button type="button">Open</button>
          </MenuTrigger>
          <MenuContent>
            <MenuList>
              <MenuSub>
                <Tooltip>
                  <TooltipTrigger>
                    <MenuSubTrigger>More</MenuSubTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Tooltip text</TooltipContent>
                </Tooltip>
                <MenuSubContent>
                  <MenuList>
                    <MenuItem value="a">A</MenuItem>
                  </MenuList>
                </MenuSubContent>
              </MenuSub>
            </MenuList>
          </MenuContent>
        </Menu>,
      );

      const trigger = openSubByClick('More');

      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(
        screen.getByRole('menuitemradio', { name: 'A' }),
      ).toBeInTheDocument();
    });
  });

  describe('popover opened from the submenu', () => {
    const renderWithPopover = () =>
      render(
        <Menu defaultOpen>
          <MenuTrigger>
            <button type="button">Open</button>
          </MenuTrigger>
          <MenuContent>
            <MenuList>
              <MenuSub>
                <MenuSubTrigger>More</MenuSubTrigger>
                <MenuSubContent>
                  <MenuList>
                    <MenuItem value="a">A</MenuItem>
                  </MenuList>
                  <MenuActionArea
                    trailingContent={
                      <MenuActionAreaContent variant="custom">
                        <Popover>
                          <PopoverTrigger>
                            <button type="button">Info</button>
                          </PopoverTrigger>
                          <PopoverContent heading="Heading">
                            Popover body
                          </PopoverContent>
                        </Popover>
                      </MenuActionAreaContent>
                    }
                  />
                </MenuSubContent>
              </MenuSub>
            </MenuList>
          </MenuContent>
        </Menu>,
      );

    it('should keep the menus open while interacting with the popover', async () => {
      renderWithPopover();

      const trigger = openSubByClick('More');
      fireEvent.click(screen.getByRole('button', { name: 'Info' }));
      const body = await screen.findByText('Popover body');

      fireEvent.pointerDown(body);
      fireEvent.click(body);

      expect(screen.getByText('Popover body')).toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should close the popover, then the submenu, one Escape at a time', async () => {
      renderWithPopover();

      const trigger = openSubByClick('More');
      const info = screen.getByRole('button', { name: 'Info' });
      // A real click focuses the button before opening the popover.
      act(() => info.focus());
      fireEvent.click(info);
      await screen.findByText('Popover body');

      fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
      await waitFor(() =>
        expect(screen.queryByText('Popover body')).not.toBeInTheDocument(),
      );
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      await waitFor(() => expect(info).toHaveFocus());

      fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
      await waitFor(() =>
        expect(trigger).toHaveAttribute('aria-expanded', 'false'),
      );
      expect(
        screen.getByRole('menuitem', { name: 'More' }),
      ).toBeInTheDocument();
    });
  });

  describe('action area inside the submenu', () => {
    const renderWithActionArea = ({
      onApply = vi.fn(),
      onReset = vi.fn(),
      variant = 'checkbox',
    }: {
      onApply?: () => void;
      onReset?: () => void;
      variant?: 'normal' | 'checkbox';
    } = {}) =>
      render(
        <Menu defaultOpen defaultValue={[]}>
          <MenuTrigger>
            <button type="button">Open</button>
          </MenuTrigger>
          <MenuContent>
            <MenuList>
              <MenuItem value="root">Root item</MenuItem>
              <MenuSub>
                <MenuSubTrigger>Filter</MenuSubTrigger>
                <MenuSubContent>
                  <MenuList>
                    <MenuItem variant={variant} value="a">
                      A
                    </MenuItem>
                    <MenuItem variant={variant} value="b">
                      B
                    </MenuItem>
                  </MenuList>
                  <MenuActionArea
                    leadingContent={
                      <MenuActionAreaContent variant="text-button">
                        <TextButton onClick={onReset}>Reset</TextButton>
                      </MenuActionAreaContent>
                    }
                    trailingContent={
                      <MenuActionAreaContent variant="button">
                        <Button onClick={onApply}>Apply</Button>
                      </MenuActionAreaContent>
                    }
                  />
                </MenuSubContent>
              </MenuSub>
            </MenuList>
            <MenuActionArea
              trailingContent={
                <MenuActionAreaContent variant="button">
                  <Button>Root action</Button>
                </MenuActionAreaContent>
              }
            />
          </MenuContent>
        </Menu>,
      );

    it('should run the actions without closing the submenu', () => {
      const onApply = vi.fn();
      const onReset = vi.fn();
      renderWithActionArea({ onApply, onReset });

      const trigger = openSubByClick('Filter');
      fireEvent.click(screen.getByRole('menuitemcheckbox', { name: 'A' }));
      fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
      fireEvent.click(screen.getByRole('button', { name: 'Apply' }));

      expect(onReset).toHaveBeenCalledTimes(1);
      expect(onApply).toHaveBeenCalledTimes(1);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should keep the submenu while hovering its own action area', () => {
      renderWithActionArea();

      const trigger = openSubByClick('Filter');
      firePointer(screen.getByRole('button', { name: 'Apply' }), 'pointermove');

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should close the submenu when the parent action area is hovered', () => {
      renderWithActionArea();

      const trigger = openSubByClick('Filter');
      firePointer(
        screen.getByRole('button', { name: 'Root action' }),
        'pointermove',
      );

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should not move to the action area with the item arrow keys', async () => {
      renderWithActionArea();

      openSubByKeyboard('Filter');
      const itemB = screen.getByRole('menuitemcheckbox', { name: 'B' });
      await waitFor(() =>
        expect(
          screen.getByRole('menuitemcheckbox', { name: 'A' }),
        ).toHaveFocus(),
      );

      fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
      await waitFor(() => expect(itemB).toHaveFocus());
      // Roving focus stays within the items of the submenu.
      fireEvent.keyDown(itemB, { key: 'ArrowDown' });
      await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
      expect(itemB).toHaveFocus();
    });

    it('should close from an action area button with ArrowLeft and Escape', async () => {
      renderWithActionArea();

      const trigger = openSubByKeyboard('Filter');
      const apply = screen.getByRole('button', { name: 'Apply' });
      act(() => apply.focus());

      fireEvent.keyDown(apply, { key: 'ArrowLeft' });
      await waitFor(() =>
        expect(trigger).toHaveAttribute('aria-expanded', 'false'),
      );
      expect(trigger).toHaveFocus();

      fireEvent.keyDown(trigger, { key: 'ArrowRight' });
      const reset = await screen.findByRole('button', { name: 'Reset' });
      act(() => reset.focus());
      fireEvent.keyDown(reset, { key: 'Escape' });
      await waitFor(() =>
        expect(trigger).toHaveAttribute('aria-expanded', 'false'),
      );
      await waitFor(() => expect(trigger).toHaveFocus());
    });

    it('should have no accessibility violations', async () => {
      // Checkbox items are left out: their inner checkbox has no accessible
      // name, which fails axe with or without a submenu.
      renderWithActionArea({ variant: 'normal' });

      openSubByClick('Filter');

      expect(await axe(document.body)).toHaveNoViolations();
    });
  });

  describe('menu nested in other layers', () => {
    it('should close submenu, menu, then popover from a menu inside a popover', async () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger>
            <button type="button">Outer</button>
          </PopoverTrigger>
          <PopoverContent variant="custom">
            <Menu>
              <MenuTrigger>
                <button type="button">Open</button>
              </MenuTrigger>
              <MenuContent>
                <MenuList>
                  <MenuSub>
                    <MenuSubTrigger>More</MenuSubTrigger>
                    <MenuSubContent>
                      <MenuList>
                        <MenuItem value="a">A</MenuItem>
                      </MenuList>
                    </MenuSubContent>
                  </MenuSub>
                </MenuList>
              </MenuContent>
            </Menu>
          </PopoverContent>
        </Popover>,
      );

      fireEvent.keyDown(screen.getByRole('button', { name: 'Open' }), {
        key: 'ArrowDown',
      });
      openSubByKeyboard('More');
      await waitFor(() =>
        expect(screen.getByRole('menuitemradio', { name: 'A' })).toHaveFocus(),
      );

      fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
      await waitFor(() =>
        expect(
          screen.queryByRole('menuitemradio', { name: 'A' }),
        ).not.toBeInTheDocument(),
      );
      expect(
        screen.getByRole('menuitem', { name: 'More' }),
      ).toBeInTheDocument();

      fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
      await waitFor(() =>
        expect(
          screen.queryByRole('menuitem', { name: 'More' }),
        ).not.toBeInTheDocument(),
      );
      expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();

      fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
      await waitFor(() =>
        expect(
          screen.queryByRole('button', { name: 'Open' }),
        ).not.toBeInTheDocument(),
      );
    });

    it('should open and use the submenu inside a modal', async () => {
      const onValueChange = vi.fn();
      render(
        <Modal defaultOpen>
          <ModalContainer>
            <ModalNavigation>Title</ModalNavigation>
            <ModalContent>
              <Menu onValueChange={onValueChange}>
                <MenuTrigger>
                  <button type="button">Open</button>
                </MenuTrigger>
                <MenuContent>
                  <MenuList>
                    <MenuSub>
                      <MenuSubTrigger>More</MenuSubTrigger>
                      <MenuSubContent>
                        <MenuList>
                          <MenuItem value="a">A</MenuItem>
                        </MenuList>
                      </MenuSubContent>
                    </MenuSub>
                  </MenuList>
                </MenuContent>
              </Menu>
            </ModalContent>
          </ModalContainer>
        </Modal>,
      );

      // Opened after the modal, as in real use. A menu mounted together with
      // the modal would be hidden by the modal's `aria-hidden` on siblings.
      fireEvent.click(await screen.findByRole('button', { name: 'Open' }), {
        detail: 1,
      });
      await screen.findByRole('menuitem', { name: 'More' });
      openSubByClick('More');
      fireEvent.click(await screen.findByRole('menuitemradio', { name: 'A' }));

      expect(onValueChange).toHaveBeenCalledWith('a');
    });
  });

  describe('nesting and siblings', () => {
    const renderNested = () =>
      render(
        <Menu defaultOpen>
          <MenuTrigger>
            <button type="button">Open</button>
          </MenuTrigger>
          <MenuContent>
            <MenuList>
              <MenuSub>
                <MenuSubTrigger>Level 1</MenuSubTrigger>
                <MenuSubContent>
                  <MenuList>
                    <MenuSub>
                      <MenuSubTrigger>Level 2</MenuSubTrigger>
                      <MenuSubContent>
                        <MenuList>
                          <MenuItem value="leaf">Leaf</MenuItem>
                        </MenuList>
                      </MenuSubContent>
                    </MenuSub>
                  </MenuList>
                </MenuSubContent>
              </MenuSub>
              <MenuSub>
                <MenuSubTrigger>Sibling</MenuSubTrigger>
                <MenuSubContent>
                  <MenuList>
                    <MenuItem value="other">Other</MenuItem>
                  </MenuList>
                </MenuSubContent>
              </MenuSub>
            </MenuList>
          </MenuContent>
        </Menu>,
      );

    it('should walk three levels with the arrow keys', async () => {
      renderNested();

      openSubByKeyboard('Level 1');
      await waitFor(() =>
        expect(screen.getByRole('menuitem', { name: 'Level 2' })).toHaveFocus(),
      );
      fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Level 2' }), {
        key: 'ArrowRight',
      });
      await waitFor(() =>
        expect(
          screen.getByRole('menuitemradio', { name: 'Leaf' }),
        ).toHaveFocus(),
      );

      fireEvent.keyDown(screen.getByRole('menuitemradio', { name: 'Leaf' }), {
        key: 'ArrowLeft',
      });
      await waitFor(() =>
        expect(screen.getByRole('menuitem', { name: 'Level 2' })).toHaveFocus(),
      );
      expect(screen.getByRole('menuitem', { name: 'Level 1' })).toHaveAttribute(
        'aria-expanded',
        'true',
      );

      fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Level 2' }), {
        key: 'ArrowLeft',
      });
      await waitFor(() =>
        expect(screen.getByRole('menuitem', { name: 'Level 1' })).toHaveFocus(),
      );
      expect(screen.getByRole('menuitem', { name: 'Level 1' })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    });

    it('should close one level per Escape', async () => {
      renderNested();

      openSubByKeyboard('Level 1');
      await waitFor(() =>
        expect(screen.getByRole('menuitem', { name: 'Level 2' })).toHaveFocus(),
      );
      fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Level 2' }), {
        key: 'Enter',
      });
      await waitFor(() =>
        expect(
          screen.getByRole('menuitemradio', { name: 'Leaf' }),
        ).toHaveFocus(),
      );

      fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
      await waitFor(() =>
        expect(
          screen.queryByRole('menuitemradio', { name: 'Leaf' }),
        ).toBeNull(),
      );
      expect(
        screen.getByRole('menuitem', { name: 'Level 2' }),
      ).toBeInTheDocument();

      fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
      await waitFor(() =>
        expect(screen.queryByRole('menuitem', { name: 'Level 2' })).toBeNull(),
      );
      expect(
        screen.getByRole('menuitem', { name: 'Level 1' }),
      ).toBeInTheDocument();
    });

    it('should hand over from one sub trigger to its sibling on hover', () => {
      vi.useFakeTimers();
      renderNested();

      const level1 = openSubByClick('Level 1');
      const sibling = screen.getByRole('menuitem', { name: 'Sibling' });

      firePointer(sibling, 'pointermove');
      expect(level1).toHaveAttribute('aria-expanded', 'false');

      act(() => vi.advanceTimersByTime(100));
      expect(sibling).toHaveAttribute('aria-expanded', 'true');
    });

    it('should keep the submenu while the pointer is over a deeper submenu', () => {
      renderNested();

      const level1 = openSubByClick('Level 1');
      const level2 = openSubByClick('Level 2');
      const leaf = screen.getByRole('menuitemradio', { name: 'Leaf' });

      firePointer(leaf, 'pointermove');

      expect(level1).toHaveAttribute('aria-expanded', 'true');
      expect(level2).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('opening options', () => {
    it('should not open when the pointer leaves before the enter delay', () => {
      vi.useFakeTimers();
      render(<SubmenuExample />);

      const trigger = getSubTrigger();
      firePointer(trigger, 'pointermove');
      act(() => vi.advanceTimersByTime(50));
      firePointer(trigger, 'pointerout', {
        relatedTarget: screen.getByRole('menuitemradio', { name: 'Delete' }),
      });
      act(() => vi.advanceTimersByTime(200));

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should only open on click when openOnHover is false', () => {
      vi.useFakeTimers();
      render(
        <Menu defaultOpen>
          <MenuTrigger>
            <button type="button">Open</button>
          </MenuTrigger>
          <MenuContent>
            <MenuList>
              <MenuSub>
                <MenuSubTrigger openOnHover={false}>More</MenuSubTrigger>
                <MenuSubContent>
                  <MenuList>
                    <MenuItem value="a">A</MenuItem>
                  </MenuList>
                </MenuSubContent>
              </MenuSub>
            </MenuList>
          </MenuContent>
        </Menu>,
      );

      const trigger = screen.getByRole('menuitem', { name: 'More' });
      firePointer(trigger, 'pointermove');
      act(() => vi.advanceTimersByTime(500));
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should follow a controlled open state', () => {
      const onOpenChange = vi.fn();
      const ControlledExample = ({ open }: { open: boolean }) => (
        <Menu defaultOpen>
          <MenuTrigger>
            <button type="button">Open</button>
          </MenuTrigger>
          <MenuContent>
            <MenuList>
              <MenuSub open={open} onOpenChange={onOpenChange}>
                <MenuSubTrigger>More</MenuSubTrigger>
                <MenuSubContent>
                  <MenuList>
                    <MenuItem value="a">A</MenuItem>
                  </MenuList>
                </MenuSubContent>
              </MenuSub>
            </MenuList>
          </MenuContent>
        </Menu>
      );
      const { rerender } = render(<ControlledExample open={false} />);

      const trigger = screen.getByRole('menuitem', { name: 'More' });
      fireEvent.click(trigger);
      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      rerender(<ControlledExample open />);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      // Opened from outside: focus stays where it was.
      expect(
        screen.getByRole('menuitemradio', { name: 'A' }),
      ).not.toHaveFocus();
    });

    it('should replace the chevron with custom trailing content', () => {
      render(
        <Menu defaultOpen>
          <MenuTrigger>
            <button type="button">Open</button>
          </MenuTrigger>
          <MenuContent>
            <MenuList>
              <MenuSub>
                <MenuSubTrigger
                  trailingContent={
                    <MenuItemContent variant="value" chevron>
                      Korean
                    </MenuItemContent>
                  }
                >
                  Language
                </MenuSubTrigger>
                <MenuSubContent>
                  <MenuList>
                    <MenuItem value="ko">Korean</MenuItem>
                  </MenuList>
                </MenuSubContent>
              </MenuSub>
            </MenuList>
          </MenuContent>
        </Menu>,
      );

      const trigger = screen.getByRole('menuitem', { name: /Language/ });
      expect(
        trigger.querySelector('[data-role="menu-sub-trigger-chevron"]'),
      ).toBeNull();
      expect(
        trigger.querySelector('[data-role="list-cell-content-chevron"]'),
      ).toBeInTheDocument();
    });

    it('should ignore touch pointers moving over the parent menu', () => {
      render(<SubmenuExample />);

      const trigger = getSubTrigger();
      fireEvent.click(trigger);
      firePointer(
        screen.getByRole('menuitemradio', { name: 'Copy' }),
        'pointermove',
        {
          pointerType: 'touch',
        },
      );

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('dismissal and focus flow', () => {
    it('should close the menu and its submenu on an outside pointerdown', async () => {
      render(
        <>
          <button type="button">Outside</button>
          <SubmenuExample />
        </>,
      );

      fireEvent.click(getSubTrigger());
      expect(querySubItem()).toBeInTheDocument();

      // Radix registers the outside listener on the next tick.
      await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
      fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));

      await waitFor(() =>
        expect(screen.queryByRole('menuitem')).not.toBeInTheDocument(),
      );
    });

    it('should not dismiss the submenu when its trigger is pressed', async () => {
      render(<SubmenuExample />);

      const trigger = getSubTrigger();
      fireEvent.click(trigger);
      await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

      fireEvent.pointerDown(trigger);
      fireEvent.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should close a hover-opened submenu when keyboard focus moves on in the parent', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
      render(<FocusExampleWithSub />);

      fireEvent.click(screen.getByRole('button', { name: 'Open' }), {
        detail: 1,
      });
      const viewport = await waitFor(() => {
        const element = screen
          .getByRole('menuitemradio', { name: 'First' })
          .closest<HTMLElement>('[data-radix-scroll-area-viewport]')!;
        expect(element).toHaveFocus();
        return element;
      });

      const trigger = screen.getByRole('menuitem', { name: 'More' });
      firePointer(trigger, 'pointermove');
      act(() => vi.advanceTimersByTime(100));
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      // Opened by pointer: focus stays in the parent menu.
      expect(viewport).toHaveFocus();

      fireEvent.keyDown(viewport, { key: 'ArrowDown' });
      expect(
        screen.getByRole('menuitemradio', { name: 'First' }),
      ).toHaveFocus();
      await waitFor(() =>
        expect(trigger).toHaveAttribute('aria-expanded', 'false'),
      );
    });
  });
});

const FocusExampleWithSub = () => (
  <Menu>
    <MenuTrigger>
      <button type="button">Open</button>
    </MenuTrigger>
    <MenuContent>
      <MenuList>
        <MenuItem value="first">First</MenuItem>
        <MenuSub>
          <MenuSubTrigger>More</MenuSubTrigger>
          <MenuSubContent>
            <MenuList>
              <MenuItem value="a">A</MenuItem>
            </MenuList>
          </MenuSubContent>
        </MenuSub>
      </MenuList>
    </MenuContent>
  </Menu>
);
