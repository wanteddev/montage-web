import {
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalDescription,
  ModalHeading,
} from '@montage-ui/core';
import { cleanup } from '@testing-library/react';
import { useState } from 'react';
import { page } from 'vitest/browser';

import { byTestId, click, renderWithProvider } from '../helpers';

import type { CSSProperties, ComponentProps } from 'react';

type Snap = 'peek' | 'half' | 'full';
type ContainerProps = ComponentProps<typeof ModalContainer>;

const VIEWPORT_WIDTH = 1280;
const VIEWPORT_HEIGHT = 720;
const PEEK = 72;
// Top inset the default `--modal-default-max-height` reserves above the sheet.
const TOP_INSET = 40;
// Top-edge rubber-band ceiling — how far past `full` a held pointer can pull.
const RUBBER_BAND_MAX = 40;

afterEach(async () => {
  cleanup();
  await page.viewport(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
});

/* ------------------------------------------------------------------ */
/* DOM readers                                                         */
/* ------------------------------------------------------------------ */

const sheet = () => {
  const element = document.querySelector<HTMLElement>('[role="dialog"]');
  if (!element) throw new Error('no dialog');
  return element;
};

const grabber = () => {
  const element = document.querySelector<HTMLElement>(
    '[data-role="modal-container-grabber"]',
  );
  if (!element) throw new Error('no grabber');
  return element;
};

/** The sheet's scrollable body — where content swipes start. */
const scrollViewport = () => {
  const element = [...sheet().querySelectorAll<HTMLElement>('*')].find((node) =>
    ['auto', 'scroll'].includes(getComputedStyle(node).overflowY),
  );
  if (!element) throw new Error('no scroll viewport');
  return element;
};

/**
 * How many px of the sheet are showing (translate-aware), measured from the
 * bottom of its wrapper's content box — the edge the sheet is anchored to.
 */
const visibleHeight = () => {
  const wrapper = sheet().parentElement;
  if (!wrapper) throw new Error('no wrapper');
  const anchor =
    wrapper.getBoundingClientRect().bottom -
    parseFloat(getComputedStyle(wrapper).paddingBottom);
  return anchor - sheet().getBoundingClientRect().top;
};

const dragHeight = () => sheet().style.getPropertyValue('--modal-drag-height');

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const nextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(resolve));

const animationsDone = () =>
  Promise.all(
    sheet()
      .getAnimations()
      .map((animation) => animation.finished.catch(() => undefined)),
  );

/* ------------------------------------------------------------------ */
/* Motion recorder                                                     */
/* ------------------------------------------------------------------ */

/**
 * Samples the sheet every frame while a gesture and its settle run.
 *
 * - `tallest`: the largest visible height seen — must stay within the full
 *   height plus the rubber-band ceiling.
 * - `handoffJump`: how far the sheet moved on the frame the drag's inline
 *   `--modal-drag-height` was dropped, i.e. when the settle handed back to
 *   CSS. The spring rests on the snap's height, so this must be ~0; a jump
 *   means JS and CSS disagree about where that snap is.
 */
const record = () => {
  let running = true;
  let tallest = 0;
  let handoffJump = 0;
  let previousHeight = visibleHeight();
  let previousDragging = dragHeight() !== '';

  const tick = () => {
    if (!running || !document.querySelector('[role="dialog"]')) return;
    const height = visibleHeight();
    const dragging = dragHeight() !== '';
    tallest = Math.max(tallest, height);
    if (previousDragging && !dragging) {
      handoffJump = Math.max(handoffJump, Math.abs(height - previousHeight));
    }
    previousHeight = height;
    previousDragging = dragging;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  return {
    stop: () => {
      running = false;
      return { tallest, handoffJump };
    },
  };
};

/* ------------------------------------------------------------------ */
/* Pointer drivers                                                     */
/* ------------------------------------------------------------------ */

type Pointer = {
  /** Move by `dy` px (positive = down) over `steps` events. */
  moveBy: (dy: number, steps?: number, interval?: number) => Promise<void>;
  /** Drag until the sheet's visible height reaches `target`. */
  moveToHeight: (target: number, steps?: number) => Promise<void>;
  /** Rest the pointer in place so the release carries no velocity. */
  hold: () => Promise<void>;
  release: () => void;
};

const createPointer = (
  startY: number,
  move: (y: number) => void,
  release: (y: number) => void,
): Pointer => {
  let y = startY;

  const moveBy: Pointer['moveBy'] = async (dy, steps = 6, interval = 16) => {
    for (let i = 0; i < steps; i++) {
      y += dy / steps;
      move(y);
      await sleep(interval);
    }
  };

  return {
    moveBy,
    // Closed loop: every step re-reads the sheet, so the rubber band and a
    // viewport swipe's rebased origin don't have to be modelled here.
    moveToHeight: async (target, steps = 8) => {
      for (let i = steps; i > 0; i--) {
        y += (visibleHeight() - target) / i;
        move(y);
        await sleep(16);
      }
    },
    hold: async () => {
      for (let i = 0; i < 3; i++) {
        move(y);
        await sleep(60);
      }
    },
    release: () => release(y),
  };
};

const centerOf = (element: Element) => {
  const { left, top, width, height } = element.getBoundingClientRect();
  return { x: left + width / 2, y: top + height / 2 };
};

/** Mouse drag starting on the grabber. */
const grab = (): Pointer => {
  const { x, y } = centerOf(grabber());
  grabber().dispatchEvent(
    new MouseEvent('mousedown', { bubbles: true, clientX: x, clientY: y }),
  );
  return createPointer(
    y,
    (clientY) =>
      window.dispatchEvent(
        new MouseEvent('mousemove', { bubbles: true, clientX: x, clientY }),
      ),
    (clientY) =>
      window.dispatchEvent(
        new MouseEvent('mouseup', { bubbles: true, clientX: x, clientY }),
      ),
  );
};

/** Touch swipe starting on the sheet's scrollable body. */
const touchBody = (): Pointer => {
  const target = scrollViewport();
  const rect = target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const startY = rect.top + Math.min(40, rect.height / 2);
  const touchAt = (clientY: number) =>
    new Touch({ identifier: 1, target, clientX: x, clientY });
  const dispatch = (type: string, clientY: number, active: boolean) => {
    const touch = touchAt(clientY);
    target.dispatchEvent(
      new TouchEvent(type, {
        bubbles: true,
        cancelable: true,
        touches: active ? [touch] : [],
        targetTouches: active ? [touch] : [],
        changedTouches: [touch],
      }),
    );
  };

  dispatch('touchstart', startY, true);
  return createPointer(
    startY,
    (clientY) => dispatch('touchmove', clientY, true),
    (clientY) => dispatch('touchend', clientY, false),
  );
};

/* ------------------------------------------------------------------ */
/* Outcomes                                                            */
/* ------------------------------------------------------------------ */

type Recorder = ReturnType<typeof record>;

/**
 * Where the sheet ended up and how it got there. Tests compare this against
 * `landed(...)`, so a failure prints the offending numbers.
 */
type Outcome = {
  snap: string | undefined;
  /** Visible height at rest, rounded. */
  height: number;
  /** Whether the peek offset (`--modal-translate`) is applied. */
  translated: boolean;
  /** Px the sheet rose above full + rubber band at any point (0 = never). */
  overshoot: number;
  /** Px the sheet jumped when the settle handed back to CSS (0 = none). */
  handoffJump: number;
};

const restState = () => ({
  status: sheet().dataset.status,
  dragHeight: dragHeight(),
  transition: sheet().style.getPropertyValue('transition'),
});

/** Wait for the sheet to come to rest, then report where and how. */
const settle = async (full: number, recorder?: Recorder): Promise<Outcome> => {
  await expect
    .poll(restState)
    .toEqual({ status: 'open', dragHeight: '', transition: '' });
  await animationsDone();
  await nextFrame();

  const motion = recorder?.stop() ?? { tallest: 0, handoffJump: 0 };
  const overshoot = motion.tallest - (full + RUBBER_BAND_MAX);
  return {
    snap: sheet().dataset.snap,
    height: Math.round(visibleHeight()),
    translated: sheet().style.getPropertyValue('--modal-translate') !== '',
    overshoot: overshoot > 1 ? Math.round(overshoot) : 0,
    handoffJump: motion.handoffJump > 2 ? Math.round(motion.handoffJump) : 0,
  };
};

/** The outcome of a clean landing on `snap` at `height`. */
const landed = (snap: Snap, height: number): Outcome => ({
  snap,
  height: Math.round(height),
  translated: snap === 'peek',
  overshoot: 0,
  handoffJump: 0,
});

/* ------------------------------------------------------------------ */
/* Fixtures                                                            */
/* ------------------------------------------------------------------ */

const Lines = ({ count }: { count: number }) => (
  <ModalDescription>
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ display: 'block' }}>
        Scrollable line #{i + 1}
      </span>
    ))}
  </ModalDescription>
);

const Sheet = ({
  lines = 30,
  ...props
}: Partial<ContainerProps> & { lines?: number }) => (
  <Modal defaultOpen>
    <ModalContainer variant="bottom" handle {...props}>
      <ModalContent>
        <ModalContentItem>
          <ModalHeading>Sheet</ModalHeading>
          <Lines count={lines} />
        </ModalContentItem>
      </ModalContent>
    </ModalContainer>
  </Modal>
);

const mount = async (props: ComponentProps<typeof Sheet>) => {
  renderWithProvider(<Sheet {...props} />);
  await expect.poll(() => sheet().dataset.status).toBe('open');
  await animationsDone();
  await nextFrame();
};

/**
 * Ways to set the full height. `full` gives the expected full-snap height for
 * a viewport height; half is always half of it.
 */
const HEIGHT_CONFIGS: Array<{
  name: string;
  sx?: ContainerProps['sx'];
  full: (viewportHeight: number) => number;
}> = [
  { name: 'default max-height', full: (vh) => vh - TOP_INSET },
  {
    name: '--modal-max-height: 400px',
    sx: { '--modal-max-height': '400px' },
    full: () => 400,
  },
];

/* ------------------------------------------------------------------ */
/* flexible                                                            */
/* ------------------------------------------------------------------ */

describe.each(HEIGHT_CONFIGS)(
  'flexible sheet — $name',
  ({ sx, full: fullFor }) => {
    const FULL = fullFor(VIEWPORT_HEIGHT);
    const HALF = FULL / 2;
    const heightOf = (snap: Snap) =>
      snap === 'full' ? FULL : snap === 'half' ? HALF : PEEK;
    const at = (snap: Snap) => landed(snap, heightOf(snap));
    /** A point 10px inside `snap`, on the side the other snaps are on. */
    const near = (snap: Snap) => heightOf(snap) + (snap === 'full' ? -10 : 10);

    const flexible = (props: Partial<ContainerProps> = {}) =>
      mount({ resize: 'flexible', peekHeight: PEEK, sx, ...props });

    /** Slow drag from the grabber to `target`px, released at rest. */
    const dragTo = async (target: number, full = FULL) => {
      const recorder = record();
      const pointer = grab();
      await pointer.moveToHeight(target);
      await pointer.hold();
      pointer.release();
      return settle(full, recorder);
    };

    // Covers every slow transition between two snaps, in both directions.
    it('slow drags land on each snap in turn', async () => {
      await flexible({ defaultSnap: 'half' });
      expect(await settle(FULL)).toEqual(at('half'));

      const route = ['full', 'half', 'peek', 'full', 'peek', 'half'] as const;
      const outcomes: Array<Outcome> = [];
      for (const snap of route) outcomes.push(await dragTo(near(snap)));
      expect(outcomes).toEqual(route.map(at));
    });

    it('pulling far past the top rubber-bands and settles at full', async () => {
      await flexible({ defaultSnap: 'half' });
      const recorder = record();
      const pointer = grab();
      await pointer.moveBy(-(FULL + 400), 10);
      await pointer.hold();
      expect(visibleHeight()).toBeGreaterThan(FULL);
      pointer.release();
      expect(await settle(FULL, recorder)).toEqual(at('full'));
    });

    it('an upward fling from half lands on full', async () => {
      await flexible({ defaultSnap: 'half' });
      const recorder = record();
      const pointer = grab();
      await pointer.moveBy(-80, 4, 8);
      pointer.release();
      expect(await settle(FULL, recorder)).toEqual(at('full'));
    });

    // With zero distance left to travel the release velocity used to go in
    // uncapped, throwing the sheet far past the snap before it came back.
    it('releasing exactly on full while still moving does not throw the sheet past it', async () => {
      await flexible({ defaultSnap: 'half' });
      let tallest = 0;

      const pointer = grab();
      await pointer.moveToHeight(FULL, 3);
      pointer.release();
      for (let i = 0; i < 120 && dragHeight() !== ''; i++) {
        tallest = Math.max(tallest, visibleHeight());
        await nextFrame();
      }

      expect(tallest).toBeLessThanOrEqual(FULL + 2);
      expect(await settle(FULL)).toEqual(at('full'));
    });

    it('re-grabbing mid-settle picks the sheet up and still lands correctly', async () => {
      await flexible({ defaultSnap: 'half' });
      const recorder = record();

      // Throw the sheet toward full, then catch it a few frames in.
      const fling = grab();
      await fling.moveBy(-80, 4, 8);
      fling.release();
      await nextFrame();
      await nextFrame();
      await nextFrame();
      expect(dragHeight()).not.toBe('');

      const caught = grab();
      await caught.moveToHeight(near('half'));
      await caught.hold();
      caught.release();
      expect(await settle(FULL, recorder)).toEqual(at('half'));
    });

    it('a body swipe down from the scroll top collapses full to half', async () => {
      await flexible({ defaultSnap: 'full' });
      expect(scrollViewport().scrollTop).toBe(0);

      const recorder = record();
      const pointer = touchBody();
      await pointer.moveBy(10, 2);
      await pointer.moveToHeight(near('half'));
      await pointer.hold();
      pointer.release();
      expect(await settle(FULL, recorder)).toEqual(at('half'));
    });

    it('follows a viewport resize between drags', async () => {
      await flexible({ defaultSnap: 'full' });
      await page.viewport(VIEWPORT_WIDTH, 600);
      const resizedFull = fullFor(600);
      const resizedHalf = resizedFull / 2;

      expect(await settle(resizedFull)).toEqual(landed('full', resizedFull));
      expect(await dragTo(resizedHalf + 10, resizedFull)).toEqual(
        landed('half', resizedHalf),
      );
      expect(await dragTo(resizedFull - 10, resizedFull)).toEqual(
        landed('full', resizedFull),
      );
    });
  },
);

/* ------------------------------------------------------------------ */
/* flexible — the override must survive what the drag does             */
/* ------------------------------------------------------------------ */

const ControlledSheet = () => {
  const [snap, setSnap] = useState<Snap>('half');

  return (
    <>
      {(['peek', 'half', 'full'] as const).map((value) => (
        <button
          key={value}
          type="button"
          data-testid={`to-${value}`}
          onClick={() => setSnap(value)}
        >
          {value}
        </button>
      ))}
      <Modal defaultOpen>
        <ModalContainer
          variant="bottom"
          resize="flexible"
          handle
          peekHeight={PEEK}
          snap={snap}
          onSnapChange={setSnap}
          largestUndimmedSnap="full"
          sx={{ '--modal-max-height': '400px' }}
        >
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Sheet</ModalHeading>
              <Lines count={30} />
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
};

describe('flexible sheet with --modal-max-height: 400px', () => {
  it('programmatic snap changes land on the same heights as drags', async () => {
    renderWithProvider(<ControlledSheet />);
    await expect.poll(() => sheet().dataset.status).toBe('open');

    const route = ['full', 'peek', 'half'] as const;
    const outcomes: Array<Outcome> = [];
    for (const snap of route) {
      await click(byTestId(`to-${snap}`));
      await expect.poll(() => sheet().dataset.snap).toBe(snap);
      outcomes.push(await settle(400));
    }

    const recorder = record();
    const pointer = grab();
    await pointer.moveToHeight(390);
    await pointer.hold();
    pointer.release();
    outcomes.push(await settle(400, recorder));

    expect(outcomes).toEqual([
      landed('full', 400),
      landed('peek', PEEK),
      landed('half', 200),
      landed('full', 400),
    ]);
  });

  it('set on the style prop, it is not cleared by a drag', async () => {
    await mount({
      resize: 'flexible',
      peekHeight: PEEK,
      defaultSnap: 'half',
      style: { '--modal-max-height': '400px' } as CSSProperties,
    });

    const outcomes: Array<Outcome> = [];
    for (const target of [390, 210]) {
      const recorder = record();
      const pointer = grab();
      await pointer.moveToHeight(target);
      await pointer.hold();
      pointer.release();
      outcomes.push(await settle(400, recorder));
    }

    expect(outcomes).toEqual([landed('full', 400), landed('half', 200)]);
    expect(sheet().style.getPropertyValue('--modal-max-height')).toBe('400px');
  });
});

/* ------------------------------------------------------------------ */
/* flexible — wrapper that ends above the viewport bottom              */
/* ------------------------------------------------------------------ */

// A persistent sheet between a top bar and a bottom navigation bar: the
// wrapper covers only the space between them and the sheet may fill it.
describe('flexible sheet in a wrapper inset from the viewport', () => {
  const TOP_BAR = 64;
  const BOTTOM_NAV = 56;
  const AREA = `calc(100dvh - ${TOP_BAR}px - ${BOTTOM_NAV}px)`;
  const FULL = VIEWPORT_HEIGHT - TOP_BAR - BOTTOM_NAV;
  const HALF = FULL / 2;

  const InsetSheet = () => {
    const [snap, setSnap] = useState<Snap>('half');
    return (
      <Modal open onOpenChange={() => {}}>
        <ModalContainer
          variant="bottom"
          resize="flexible"
          handle
          peekHeight={PEEK}
          snap={snap}
          onSnapChange={setSnap}
          largestUndimmedSnap="full"
          enableHalfSnapScroll
          disablePortal
          wrapperProps={{ sx: { top: `${TOP_BAR}px`, height: AREA } }}
          sx={{ '--modal-max-height': AREA }}
        >
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Sheet</ModalHeading>
              <Lines count={30} />
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>
    );
  };

  const mountInset = async () => {
    renderWithProvider(<InsetSheet />);
    await expect.poll(() => sheet().dataset.status).toBe('open');
    await animationsDone();
    await nextFrame();
  };

  it('sits above the bottom edge of its wrapper, not of the viewport', async () => {
    await mountInset();
    expect(await settle(FULL)).toEqual(landed('half', HALF));
    expect(
      Math.round(window.innerHeight - sheet().getBoundingClientRect().bottom),
    ).toBe(BOTTOM_NAV);
  });

  it('the sheet follows the pointer 1:1 from the first move', async () => {
    await mountInset();
    const before = visibleHeight();

    const pointer = grab();
    await pointer.moveBy(-4, 1);
    await nextFrame();
    const moved = visibleHeight() - before;
    await pointer.hold();
    pointer.release();

    expect(Math.round(moved)).toBe(4);
    expect(await settle(FULL)).toEqual(landed('half', HALF));
  });

  it('slow drags land on each snap in turn', async () => {
    await mountInset();
    const heights = { full: FULL, half: HALF, peek: PEEK };
    const route = ['full', 'half', 'peek', 'full', 'peek', 'half'] as const;
    const outcomes: Array<Outcome> = [];
    for (const snap of route) {
      const recorder = record();
      const pointer = grab();
      await pointer.moveToHeight(heights[snap] + (snap === 'full' ? -10 : 10));
      await pointer.hold();
      pointer.release();
      outcomes.push(await settle(FULL, recorder));
    }
    expect(outcomes).toEqual(route.map((snap) => landed(snap, heights[snap])));
  });

  it('pulling far past the top rubber-bands and settles at full', async () => {
    await mountInset();
    const recorder = record();
    const pointer = grab();
    await pointer.moveBy(-(FULL + 400), 10);
    await pointer.hold();
    pointer.release();
    expect(await settle(FULL, recorder)).toEqual(landed('full', FULL));
  });
});

// Padding on the wrapper moves the sheet's anchor without moving the wrapper.
describe('flexible sheet in a wrapper with bottom padding', () => {
  const PADDING = 24;
  const FULL = VIEWPORT_HEIGHT - PADDING - TOP_INSET;
  const HALF = FULL / 2;

  it('follows the pointer 1:1 and lands on the padded snap heights', async () => {
    await mount({
      resize: 'flexible',
      peekHeight: PEEK,
      defaultSnap: 'half',
      wrapperProps: { sx: { paddingBottom: `${PADDING}px` } },
    });
    expect(await settle(FULL)).toEqual(landed('half', HALF));

    const before = visibleHeight();
    const recorder = record();
    const pointer = grab();
    await pointer.moveBy(-4, 1);
    await nextFrame();
    const moved = visibleHeight() - before;
    await pointer.moveToHeight(FULL - 10);
    await pointer.hold();
    pointer.release();

    expect(Math.round(moved)).toBe(4);
    expect(await settle(FULL, recorder)).toEqual(landed('full', FULL));
  });
});

/* ------------------------------------------------------------------ */
/* non-flexible (hug / fill)                                           */
/* ------------------------------------------------------------------ */

describe.each([
  // The override is a ceiling, not a fixed height — short content still hugs.
  {
    name: 'hug, short content under --modal-max-height: 400px',
    props: { resize: 'hug', lines: 3 },
    full: undefined,
  },
  {
    name: 'hug, tall content capped by --modal-max-height: 400px',
    props: { resize: 'hug', lines: 60 },
    full: 400,
  },
  {
    name: 'fill with --modal-max-height: 400px',
    props: { resize: 'fill', lines: 3 },
    full: 400,
  },
] as const)('non-flexible sheet — $name', ({ props, full }) => {
  it('rests at its full height, collapses to peek and back, rubber-bands', async () => {
    await mount({
      peekHeight: PEEK,
      sx: { '--modal-max-height': '400px' },
      ...props,
    });
    const natural = visibleHeight();
    if (full === undefined) expect(natural).toBeLessThan(300);
    else expect(Math.round(natural)).toBe(full);

    const outcomes: Array<Outcome> = [];
    for (const target of [PEEK + 10, natural - 10]) {
      const recorder = record();
      const pointer = grab();
      await pointer.moveToHeight(target);
      await pointer.hold();
      pointer.release();
      outcomes.push(await settle(natural, recorder));
    }

    const recorder = record();
    const pointer = grab();
    await pointer.moveBy(-400, 8);
    await pointer.hold();
    pointer.release();
    outcomes.push(await settle(natural, recorder));

    expect(outcomes).toEqual([
      landed('peek', PEEK),
      landed('full', natural),
      landed('full', natural),
    ]);
  });
});
