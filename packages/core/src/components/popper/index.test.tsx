import { cleanup, render, screen, waitFor } from '@testing-library/react';

import { Popper, PopperAnchor, PopperContent } from '.';

import type { PopperContentProps } from './types';

const VIEWPORT_WIDTH = 800;

const renderPopper = (
  collisionPadding?: PopperContentProps['collisionPadding'],
) =>
  render(
    <Popper>
      <PopperAnchor>
        <button>anchor</button>
      </PopperAnchor>
      <PopperContent collisionPadding={collisionPadding}>
        <div>content</div>
      </PopperContent>
    </Popper>,
  );

const getAvailableWidth = () =>
  screen
    .getByText('content')
    .closest<HTMLElement>('[data-side]')
    ?.style.getPropertyValue('--popper-available-width');

describe('when rendering popper content', () => {
  beforeEach(() => {
    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: VIEWPORT_WIDTH,
      configurable: true,
    });
  });

  afterEach(cleanup);

  it('should provide the available width excluding the default collision padding', async () => {
    renderPopper();

    await waitFor(() => expect(getAvailableWidth()).toBe('760px'));
  });

  it('should provide the available width excluding the given collision padding', async () => {
    renderPopper(16);

    await waitFor(() => expect(getAvailableWidth()).toBe('768px'));
  });

  it('should provide the available width excluding the given collision padding of each side', async () => {
    renderPopper({ left: 12, right: 8 });

    await waitFor(() => expect(getAvailableWidth()).toBe('780px'));
  });
});
