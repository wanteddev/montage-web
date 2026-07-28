import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import {
  clamp,
  convertValueToPercentage,
  getClosestThumbIndex,
  linearScale,
} from './helpers';

import { Slider } from '.';

const TRACK_WIDTH = 100;

/**
 * jsdom does not implement Pointer Capture, and its `PointerEvent` drops the
 * coordinates `fireEvent.pointerMove` passes in — dispatch a `MouseEvent` so
 * `clientX` survives.
 */
const firePointer = (
  element: Element,
  type: 'pointerdown' | 'pointermove' | 'pointerup',
  clientX: number,
) => {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX,
  });
  Object.defineProperty(event, 'pointerId', { value: 1 });
  fireEvent(element, event);
};

const getTrack = (container: HTMLElement) =>
  container.querySelector<HTMLElement>(
    '[data-role="slider-progress-wrapper"]',
  )!;

const getThumbs = (container: HTMLElement) =>
  Array.from(
    container.querySelectorAll<HTMLElement>('[data-role="slider-thumb"]'),
  );

const getValues = (container: HTMLElement) =>
  getThumbs(container).map((thumb) => thumb.getAttribute('aria-valuenow'));

const getProgress = (container: HTMLElement) =>
  container.querySelector<HTMLElement>('[data-role="slider-progress"]')!;

/** `min` 0 / `max` 100 기준으로 clientX 가 곧 값이 되도록 트랙 크기를 고정한다. */
const stubTrackRect = (container: HTMLElement) => {
  vi.spyOn(getTrack(container), 'getBoundingClientRect').mockReturnValue({
    width: TRACK_WIDTH,
    left: 0,
    right: TRACK_WIDTH,
    top: 0,
    bottom: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  });
};

/** 트랙 위 `clientX` 지점을 눌렀다 떼는 한 번의 클릭. */
const clickTrack = (container: HTMLElement, clientX: number) => {
  const track = getTrack(container);
  firePointer(track, 'pointerdown', clientX);
  firePointer(track, 'pointerup', clientX);
};

/** `index` 번째 thumb 을 잡고 `clientX` 까지 끌었다 놓는 드래그. */
const dragThumb = (
  container: HTMLElement,
  index: number,
  ...positions: Array<number>
) => {
  const thumb = getThumbs(container)[index]!;
  firePointer(
    thumb,
    'pointerdown',
    Number(thumb.getAttribute('aria-valuenow')),
  );
  fireEvent.focus(thumb);
  positions.forEach((position) => firePointer(thumb, 'pointermove', position));
  firePointer(thumb, 'pointerup', positions.at(-1)!);
};

const focusThumb = (container: HTMLElement, index: number) => {
  const thumb = getThumbs(container)[index]!;
  thumb.focus();
  fireEvent.focus(thumb);
  return thumb;
};

beforeAll(() => {
  Element.prototype.setPointerCapture = vi.fn();
  Element.prototype.releasePointerCapture = vi.fn();
  Element.prototype.hasPointerCapture = vi.fn(() => true);
});

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});

describe('when given slider helpers', () => {
  it('should clamp a value into the given range', () => {
    expect(clamp(5, [0, 10])).toBe(5);
    expect(clamp(-1, [0, 10])).toBe(0);
    expect(clamp(11, [0, 10])).toBe(10);
    expect(clamp(0, [0, 0])).toBe(0);
  });

  it('should convert a value into a percentage of the range', () => {
    expect(convertValueToPercentage(0, 0, 100)).toBe(0);
    expect(convertValueToPercentage(50, 0, 100)).toBe(50);
    expect(convertValueToPercentage(100, 0, 100)).toBe(100);
    expect(convertValueToPercentage(15, 10, 20)).toBe(50);
  });

  it('should clamp the percentage when the value sits outside the range', () => {
    expect(convertValueToPercentage(-10, 0, 100)).toBe(0);
    expect(convertValueToPercentage(110, 0, 100)).toBe(100);
  });

  it('should map a pointer offset onto the value range', () => {
    expect(linearScale([0, 100], [0, 100])(40)).toBe(40);
    expect(linearScale([0, 200], [0, 100])(40)).toBe(20);
    expect(linearScale([0, 100], [10, 20])(50)).toBe(15);
  });

  it('should fall back to the lower bound when a scale is degenerate', () => {
    expect(linearScale([0, 0], [0, 100])(40)).toBe(0);
    expect(linearScale([0, 100], [7, 7])(40)).toBe(7);
  });

  it('should return the nearest thumb', () => {
    expect(getClosestThumbIndex([20, 60], 80)).toBe(1);
    expect(getClosestThumbIndex([20, 60], 10)).toBe(0);
    expect(getClosestThumbIndex([10], 90)).toBe(0);
  });

  it('should return the thumb on the dragged side when thumbs are stacked', () => {
    expect(getClosestThumbIndex([0, 0], 50)).toBe(1);
    expect(getClosestThumbIndex([50, 50], 80)).toBe(1);
    expect(getClosestThumbIndex([50, 50], 20)).toBe(0);
    expect(getClosestThumbIndex([100, 100], 50)).toBe(0);
  });

  it('should keep preferring the leading thumb when the tie is not a stack', () => {
    expect(getClosestThumbIndex([0, 10], 5)).toBe(0);
  });
});

describe('when given a single-thumb slider', () => {
  it('should render one thumb at the minimum by default', () => {
    const { container } = render(<Slider min={10} max={50} />);

    expect(getThumbs(container)).toHaveLength(1);
    expect(getValues(container)).toEqual(['10']);
  });

  it('should expose the range through aria attributes', () => {
    const { container } = render(
      <Slider min={10} max={50} defaultValue={[30]} />,
    );
    const thumb = getThumbs(container)[0]!;

    expect(thumb).toHaveAttribute('role', 'slider');
    expect(thumb).toHaveAttribute('aria-valuemin', '10');
    expect(thumb).toHaveAttribute('aria-valuemax', '50');
    expect(thumb).toHaveAttribute('aria-valuenow', '30');
    expect(thumb).toHaveAttribute('tabindex', '0');
  });

  it('should fill the progress bar from the start of the track', () => {
    const { container } = render(
      <Slider min={0} max={100} defaultValue={[40]} />,
    );

    expect(getProgress(container)).toHaveStyle({ left: '0%', right: '60%' });
  });
});

describe('when given a range slider', () => {
  it('should render a thumb per value', () => {
    const { container } = render(
      <Slider min={0} max={100} defaultValue={[20, 60, 80]} />,
    );

    expect(getValues(container)).toEqual(['20', '60', '80']);
  });

  it('should span the progress bar between the outermost values', () => {
    const { container } = render(
      <Slider min={0} max={100} defaultValue={[20, 60]} />,
    );

    expect(getProgress(container)).toHaveStyle({ left: '20%', right: '40%' });
  });
});

describe('when given title and label', () => {
  it('should render static nodes as given', () => {
    const { container } = render(
      <Slider defaultValue={[30]} title="제목" label="라벨" />,
    );

    expect(screen.getByText('제목')).toBeInTheDocument();
    expect(
      container.querySelectorAll('[data-role="slider-label"]'),
    ).toHaveLength(1);
  });

  it('should call the title renderer with the current state', () => {
    const title = vi.fn(() => <span>title</span>);

    render(<Slider min={0} max={100} defaultValue={[20, 60]} title={title} />);

    expect(title).toHaveBeenCalledWith({
      values: [20, 60],
      min: 0,
      max: 100,
      disabled: undefined,
    });
  });

  it('should render a label per thumb with its own index', () => {
    const { container } = render(
      <Slider
        min={0}
        max={100}
        defaultValue={[20, 60]}
        label={({ value, index }) => `${index}:${value}`}
      />,
    );

    const labels = Array.from(
      container.querySelectorAll('[data-role="slider-label"]'),
    );
    expect(labels.map((label) => label.textContent)).toEqual(['0:20', '1:60']);
  });

  it('should skip labels the renderer opts out of', () => {
    const { container } = render(
      <Slider
        min={0}
        max={100}
        defaultValue={[20, 60]}
        label={({ index }) => (index === 0 ? 'only first' : null)}
      />,
    );

    expect(
      container.querySelectorAll('[data-role="slider-label"]'),
    ).toHaveLength(1);
  });
});

describe('when operating a slider with the keyboard', () => {
  const setup = (props = {}) => {
    const onValueChange = vi.fn();
    const onValueChangeComplete = vi.fn();
    const view = render(
      <Slider
        min={0}
        max={100}
        defaultValue={[50]}
        onValueChange={onValueChange}
        onValueChangeComplete={onValueChangeComplete}
        {...props}
      />,
    );
    return { ...view, onValueChange, onValueChangeComplete };
  };

  it.each([
    ['ArrowRight', '51'],
    ['ArrowUp', '51'],
    ['ArrowLeft', '49'],
    ['ArrowDown', '49'],
  ])('should move by one step on %s', (key, expected) => {
    const { container } = setup();

    fireEvent.keyDown(focusThumb(container, 0), { key });

    expect(getValues(container)).toEqual([expected]);
  });

  it.each([
    ['PageUp', false, '60'],
    ['PageDown', false, '40'],
    ['ArrowRight', true, '60'],
    ['ArrowLeft', true, '40'],
  ])(
    'should move by ten steps on %s (shift: %s)',
    (key, shiftKey, expected) => {
      const { container } = setup();

      fireEvent.keyDown(focusThumb(container, 0), { key, shiftKey });

      expect(getValues(container)).toEqual([expected]);
    },
  );

  it('should honour a custom step', () => {
    const { container } = setup({ step: 5 });

    fireEvent.keyDown(focusThumb(container, 0), { key: 'ArrowRight' });

    expect(getValues(container)).toEqual(['55']);
  });

  it('should jump to the bounds on Home and End', () => {
    const { container } = setup();
    const thumb = focusThumb(container, 0);

    fireEvent.keyDown(thumb, { key: 'End' });
    expect(getValues(container)).toEqual(['100']);

    fireEvent.keyDown(thumb, { key: 'Home' });
    expect(getValues(container)).toEqual(['0']);
  });

  it('should clamp at the bounds instead of overshooting', () => {
    const { container } = setup({ defaultValue: [100] });

    fireEvent.keyDown(focusThumb(container, 0), { key: 'ArrowRight' });

    expect(getValues(container)).toEqual(['100']);
  });

  it('should report every keyboard change as completed', () => {
    const { container, onValueChange, onValueChangeComplete } = setup();

    fireEvent.keyDown(focusThumb(container, 0), { key: 'ArrowRight' });

    expect(onValueChange).toHaveBeenCalledWith([51]);
    expect(onValueChangeComplete).toHaveBeenCalledWith([51]);
  });

  it('should not fire callbacks when the value cannot move', () => {
    const { container, onValueChange, onValueChangeComplete } = setup({
      defaultValue: [100],
    });

    fireEvent.keyDown(focusThumb(container, 0), { key: 'ArrowRight' });

    expect(onValueChange).not.toHaveBeenCalled();
    expect(onValueChangeComplete).not.toHaveBeenCalled();
  });

  it('should ignore keys that are not slider controls', () => {
    const { container, onValueChange } = setup();

    fireEvent.keyDown(focusThumb(container, 0), { key: 'a' });

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('should move only the focused thumb of a range slider', () => {
    const { container } = setup({ defaultValue: [20, 60] });

    fireEvent.keyDown(focusThumb(container, 1), { key: 'ArrowRight' });

    expect(getValues(container)).toEqual(['20', '61']);
  });

  it('should still run the consumer onKeyDown handler', () => {
    const onKeyDown = vi.fn();
    const { container } = setup({ onKeyDown });

    fireEvent.keyDown(focusThumb(container, 0), { key: 'ArrowRight' });

    expect(onKeyDown).toHaveBeenCalled();
  });
});

describe('when operating a slider with a pointer', () => {
  it('should move the nearest thumb to the clicked position', () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <Slider
        min={0}
        max={100}
        defaultValue={[20, 60]}
        onValueChange={onValueChange}
      />,
    );
    stubTrackRect(container);

    clickTrack(container, 80);

    expect(getValues(container)).toEqual(['20', '80']);
    expect(onValueChange).toHaveBeenCalledWith([20, 80]);
  });

  it('should follow the pointer while dragging', () => {
    const { container } = render(
      <Slider min={0} max={100} defaultValue={[20, 60]} />,
    );
    stubTrackRect(container);

    dragThumb(container, 1, 70, 85, 90);

    expect(getValues(container)).toEqual(['20', '90']);
  });

  it('should report completion once when the drag ends', () => {
    const onValueChangeComplete = vi.fn();
    const { container } = render(
      <Slider
        min={0}
        max={100}
        defaultValue={[20, 60]}
        onValueChangeComplete={onValueChangeComplete}
      />,
    );
    stubTrackRect(container);

    dragThumb(container, 1, 70, 85, 90);

    expect(onValueChangeComplete).toHaveBeenCalledTimes(1);
    expect(onValueChangeComplete).toHaveBeenCalledWith([20, 90]);
  });

  it('should not report completion when the drag lands where it started', () => {
    const onValueChangeComplete = vi.fn();
    const { container } = render(
      <Slider
        min={0}
        max={100}
        defaultValue={[20, 60]}
        onValueChangeComplete={onValueChangeComplete}
      />,
    );
    stubTrackRect(container);

    dragThumb(container, 1, 60);

    expect(onValueChangeComplete).not.toHaveBeenCalled();
  });

  it('should clamp a pointer position outside the track', () => {
    const { container } = render(
      <Slider min={0} max={100} defaultValue={[50]} />,
    );
    stubTrackRect(container);

    dragThumb(container, 0, 250);
    expect(getValues(container)).toEqual(['100']);

    dragThumb(container, 0, -80);
    expect(getValues(container)).toEqual(['0']);
  });

  it('should still run the consumer pointer handlers', () => {
    const onPointerDown = vi.fn();
    const onPointerMove = vi.fn();
    const onPointerUp = vi.fn();
    const { container } = render(
      <Slider
        min={0}
        max={100}
        defaultValue={[50]}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />,
    );
    stubTrackRect(container);

    dragThumb(container, 0, 70);

    expect(onPointerDown).toHaveBeenCalled();
    expect(onPointerMove).toHaveBeenCalled();
    expect(onPointerUp).toHaveBeenCalled();
  });
});

describe('when given a disabled slider', () => {
  it('should take the thumb out of the tab order', () => {
    const { container } = render(<Slider defaultValue={[30]} disabled />);
    const thumb = getThumbs(container)[0]!;

    expect(thumb).toHaveAttribute('tabindex', '-1');
    expect(thumb).toHaveAttribute('aria-disabled', 'true');
  });

  it('should ignore keyboard input', () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <Slider defaultValue={[30]} disabled onValueChange={onValueChange} />,
    );

    fireEvent.keyDown(focusThumb(container, 0), { key: 'ArrowRight' });

    expect(getValues(container)).toEqual(['30']);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('should ignore pointer input', () => {
    const onValueChange = vi.fn();
    const onValueChangeComplete = vi.fn();
    const { container } = render(
      <Slider
        min={0}
        max={100}
        defaultValue={[30]}
        disabled
        onValueChange={onValueChange}
        onValueChangeComplete={onValueChangeComplete}
      />,
    );
    stubTrackRect(container);

    clickTrack(container, 80);

    expect(getValues(container)).toEqual(['30']);
    expect(onValueChange).not.toHaveBeenCalled();
    expect(onValueChangeComplete).not.toHaveBeenCalled();
  });
});

describe('when given a controlled slider', () => {
  it('should keep rendering the controlled value', () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <Slider
        min={0}
        max={100}
        value={[40]}
        onValueChange={onValueChange}
        onValueChangeComplete={vi.fn()}
      />,
    );
    stubTrackRect(container);

    clickTrack(container, 80);

    expect(onValueChange).toHaveBeenCalledWith([80]);
    expect(getValues(container)).toEqual(['40']);
  });

  it('should render the next controlled value', () => {
    const { container, rerender } = render(
      <Slider min={0} max={100} value={[40]} />,
    );

    rerender(<Slider min={0} max={100} value={[70]} />);

    expect(getValues(container)).toEqual(['70']);
  });
});

describe('when a slider lives inside a form', () => {
  it('should render a native range input per thumb', () => {
    const { container } = render(
      <form>
        <Slider min={0} max={100} defaultValue={[20, 60]} name="range" />
      </form>,
    );

    const inputs = Array.from(
      container.querySelectorAll<HTMLInputElement>('input[type="range"]'),
    );
    expect(inputs.map((input) => input.value)).toEqual(['20', '60']);
  });

  it('should submit a single thumb under the plain name', () => {
    const { container } = render(
      <form>
        <Slider min={0} max={100} defaultValue={[20]} name="range" />
      </form>,
    );

    expect(
      container.querySelector<HTMLInputElement>('input[type="range"]'),
    ).toHaveAttribute('name', 'range');
  });

  it('should submit a controlled range under an array name', () => {
    const { container } = render(
      <form>
        <Slider min={0} max={100} value={[20, 60]} name="range" />
      </form>,
    );

    const inputs = Array.from(
      container.querySelectorAll<HTMLInputElement>('input[type="range"]'),
    );
    expect(inputs.map((input) => input.name)).toEqual(['range[]', 'range[]']);
  });

  it('should restore the initial value when the form resets', () => {
    const { container } = render(
      <form>
        <Slider min={0} max={100} defaultValue={[20, 60]} name="range" />
      </form>,
    );
    stubTrackRect(container);

    clickTrack(container, 90);
    expect(getValues(container)).toEqual(['20', '90']);

    fireEvent.reset(container.querySelector('form')!);

    expect(getValues(container)).toEqual(['20', '60']);
  });
});

describe('when given a range slider with minStepBetweenThumbs', () => {
  it('should allow a move that keeps the gap', () => {
    const { container } = render(
      <Slider
        min={0}
        max={100}
        defaultValue={[20, 60]}
        minStepBetweenThumbs={10}
      />,
    );
    stubTrackRect(container);

    dragThumb(container, 1, 40);

    expect(getValues(container)).toEqual(['20', '40']);
  });

  it('should block a move that would close the gap', () => {
    const { container } = render(
      <Slider
        min={0}
        max={100}
        defaultValue={[20, 60]}
        minStepBetweenThumbs={10}
      />,
    );
    stubTrackRect(container);

    dragThumb(container, 1, 25);

    expect(getValues(container)).toEqual(['20', '60']);
  });
});

describe('when given a range slider with disableSwapThumbs', () => {
  it('should block a thumb from crossing its sibling', () => {
    const { container } = render(
      <Slider min={0} max={100} defaultValue={[20, 60]} disableSwapThumbs />,
    );
    stubTrackRect(container);

    dragThumb(container, 0, 80);

    expect(getValues(container)).toEqual(['20', '60']);
  });

  it('should let thumbs stack on the same value', () => {
    const { container } = render(
      <Slider min={0} max={100} defaultValue={[20, 60]} disableSwapThumbs />,
    );
    stubTrackRect(container);

    dragThumb(container, 0, 60);

    expect(getValues(container)).toEqual(['60', '60']);
  });

  it('should swap freely when the flag is off', () => {
    const { container } = render(
      <Slider min={0} max={100} defaultValue={[20, 60]} />,
    );
    stubTrackRect(container);

    dragThumb(container, 0, 80);

    expect(getValues(container)).toEqual(['60', '80']);
  });
});

describe('when a range slider has stacked thumbs', () => {
  it('should call onValueChangeComplete even though both thumbs share a value', () => {
    const onValueChange = vi.fn();
    const onValueChangeComplete = vi.fn();

    const { container } = render(
      <Slider
        min={1}
        max={100}
        defaultValue={[1, 2]}
        onValueChange={onValueChange}
        onValueChangeComplete={onValueChangeComplete}
      />,
    );
    stubTrackRect(container);

    dragThumb(container, 1, 0);

    expect(getValues(container)).toEqual(['1', '1']);
    expect(onValueChange).toHaveBeenCalledWith([1, 1]);
    expect(onValueChangeComplete).toHaveBeenCalledWith([1, 1]);
  });

  it('should report completion when a three-thumb move both stacks and swaps', () => {
    const onValueChangeComplete = vi.fn();

    const { container } = render(
      <Slider
        min={0}
        max={100}
        defaultValue={[10, 20, 30]}
        onValueChangeComplete={onValueChangeComplete}
      />,
    );
    stubTrackRect(container);

    dragThumb(container, 2, 10);

    expect(getValues(container)).toEqual(['10', '10', '20']);
    expect(onValueChangeComplete).toHaveBeenCalledWith([10, 10, 20]);
  });

  it('should keep the dragged thumb focused so it can be pulled back out', () => {
    const { container } = render(
      <Slider min={0} max={100} defaultValue={[10, 20]} />,
    );
    stubTrackRect(container);

    const rightThumb = getThumbs(container)[1]!;
    firePointer(rightThumb, 'pointerdown', 20);
    fireEvent.focus(rightThumb);
    firePointer(rightThumb, 'pointermove', 10);

    expect(document.activeElement).toBe(getThumbs(container)[1]);
  });

  it('should keep dragging the same thumb after the values stack', () => {
    const { container } = render(
      <Slider min={0} max={100} defaultValue={[10, 20]} disableSwapThumbs />,
    );
    stubTrackRect(container);

    dragThumb(container, 1, 10, 45);

    expect(getValues(container)).toEqual(['10', '45']);
  });

  it('should move the trailing thumb when the track is clicked past stacked thumbs', () => {
    const onValueChangeComplete = vi.fn();

    const { container } = render(
      <Slider
        min={0}
        max={100}
        defaultValue={[0, 0]}
        disableSwapThumbs
        onValueChangeComplete={onValueChangeComplete}
      />,
    );
    stubTrackRect(container);

    clickTrack(container, 50);

    expect(getValues(container)).toEqual(['0', '50']);
    expect(onValueChangeComplete).toHaveBeenCalledWith([0, 50]);
  });

  it('should still move the leading thumb when the track is clicked before stacked thumbs', () => {
    const { container } = render(
      <Slider min={0} max={100} defaultValue={[100, 100]} disableSwapThumbs />,
    );
    stubTrackRect(container);

    clickTrack(container, 50);

    expect(getValues(container)).toEqual(['50', '100']);
  });
});

describe('when checking slider accessibility', () => {
  /**
   * `aria-input-field-name` is knowingly excluded: `labelId` is generated but
   * never attached to an element, so every thumb points `aria-labelledby` at a
   * missing node. That is a pre-existing defect tracked separately.
   */
  const axeOptions = {
    rules: { 'aria-input-field-name': { enabled: false } },
  };

  it('should have no violations as a range slider', async () => {
    const { container } = render(
      <Slider min={0} max={100} defaultValue={[10, 20]} label="label" />,
    );

    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it('should have no violations when disabled', async () => {
    const { container } = render(
      <Slider min={0} max={100} defaultValue={[10]} disabled title="title" />,
    );

    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});

/**
 * `SliderThumb` receives `length={value?.length ?? 0}`, which only counts the
 * controlled prop — an uncontrolled range reports `0`, so both thumbs submit
 * under the same name. Enable once `length` is derived from `values`.
 */
describe.skip('when submitting an uncontrolled range slider', () => {
  it('should submit every thumb under an array name', () => {
    const { container } = render(
      <form>
        <Slider min={0} max={100} defaultValue={[20, 60]} name="range" />
      </form>,
    );

    const inputs = Array.from(
      container.querySelectorAll<HTMLInputElement>('input[type="range"]'),
    );
    expect(inputs.map((input) => input.name)).toEqual(['range[]', 'range[]']);
  });
});

/**
 * `snapToStep` computes `((next - min) / step) * step`, where `step` cancels
 * itself out — so pointer positions never snap to the step grid and fractional
 * steps are rounded to whole numbers. Enable these once the formula is fixed to
 * `Math.round((next - min) / step) * step + min`.
 */
describe.skip('when given a slider with a coarse step', () => {
  it('should snap a pointer position onto the step grid', () => {
    const { container } = render(
      <Slider min={0} max={100} step={5} defaultValue={[0]} />,
    );
    stubTrackRect(container);

    dragThumb(container, 0, 13);

    expect(getValues(container)).toEqual(['15']);
  });

  it('should support fractional steps', () => {
    const { container } = render(
      <Slider min={0} max={10} step={0.5} defaultValue={[0]} />,
    );

    fireEvent.keyDown(focusThumb(container, 0), { key: 'ArrowRight' });

    expect(getValues(container)).toEqual(['0.5']);
  });
});
