import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { SegmentedControl, SegmentedControlItem } from '.';

describe('when given segmented control component', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  function getItem(container: HTMLElement, value: string) {
    return container.querySelector(
      `[wds-component="segmented-control-item"][data-value="${value}"]`,
    );
  }

  it('should render items and set the default selected value', () => {
    const { container } = render(
      <SegmentedControl defaultValue="a">
        <SegmentedControlItem value="a">A</SegmentedControlItem>
        <SegmentedControlItem value="b">B</SegmentedControlItem>
        <SegmentedControlItem value="c">C</SegmentedControlItem>
      </SegmentedControl>,
    );

    const group = screen.getByRole('radiogroup');
    expect(group).toBeInTheDocument();

    expect(getItem(container, 'a')).toHaveAttribute('aria-checked', 'true');
    expect(getItem(container, 'b')).toHaveAttribute('aria-checked', 'false');
    expect(getItem(container, 'c')).toHaveAttribute('aria-checked', 'false');

    // motion thumb exists
    expect(
      container.querySelector('[data-role="segmented-control-motion"]'),
    ).toBeInTheDocument();
  });

  it('should change value when item is clicked', () => {
    const { container } = render(
      <SegmentedControl defaultValue="a">
        <SegmentedControlItem value="a">A</SegmentedControlItem>
        <SegmentedControlItem value="b">B</SegmentedControlItem>
        <SegmentedControlItem value="c">C</SegmentedControlItem>
      </SegmentedControl>,
    );

    fireEvent.click(getItem(container, 'c')!);

    expect(getItem(container, 'a')).toHaveAttribute('aria-checked', 'false');
    expect(getItem(container, 'c')).toHaveAttribute('aria-checked', 'true');
  });

  it('should select focused item when arrow key is pressed (roving focus behavior)', async () => {
    const { container } = render(
      <SegmentedControl defaultValue="a">
        <SegmentedControlItem value="a">A</SegmentedControlItem>
        <SegmentedControlItem value="b">B</SegmentedControlItem>
        <SegmentedControlItem value="c">C</SegmentedControlItem>
      </SegmentedControl>,
    );

    fireEvent.focus(getItem(container, 'a')!);
    fireEvent.keyDown(getItem(container, 'a')!, { key: 'ArrowRight' });

    await waitFor(() => {
      expect(getItem(container, 'b')).toHaveAttribute('aria-checked', 'true');
      expect(getItem(container, 'a')).toHaveAttribute('aria-checked', 'false');
    });
  });

  it('should reset to initial value when parent form is reset', async () => {
    const { container } = render(
      <form>
        <SegmentedControl defaultValue="b" name="grp">
          <SegmentedControlItem value="a">A</SegmentedControlItem>
          <SegmentedControlItem value="b">B</SegmentedControlItem>
          <SegmentedControlItem value="c">C</SegmentedControlItem>
        </SegmentedControl>
      </form>,
    );

    fireEvent.click(getItem(container, 'c')!);
    expect(getItem(container, 'c')).toHaveAttribute('aria-checked', 'true');

    const form = container.querySelector('form')!;
    form.reset();

    await waitFor(() => {
      expect(getItem(container, 'b')).toHaveAttribute('aria-checked', 'true');
      expect(getItem(container, 'c')).toHaveAttribute('aria-checked', 'false');
    });
  });
});
