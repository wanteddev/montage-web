import { cleanup, render, waitFor } from '@testing-library/react';

import * as helpers from '../image-base/helpers';

import { Avatar } from '.';

describe('when given avatar component', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should render fallback when src is absent and render image after src is provided', () => {
    const { container, rerender } = render(<Avatar />);

    const root = container.querySelector('[data-component="avatar"]')!;
    expect(root).toHaveAttribute('data-state', 'idle');
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-role="avatar-fallback"]'),
    ).toBeInTheDocument();

    let resolve!: () => void;
    vi.spyOn(helpers, 'loadImage').mockImplementation(() => {
      return new Promise<void>((r) => {
        resolve = r;
      });
    });

    rerender(<Avatar src="/img-1.png" />);

    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(
      container.querySelector('[data-role="avatar-fallback"]'),
    ).not.toBeInTheDocument();

    resolve();
    return waitFor(() => {
      expect(root).toHaveAttribute('data-state', 'loaded');
    });
  });

  it('should show fallback on error, then reset to idle and show image after src changes', async () => {
    const loadSpy = vi.spyOn(helpers, 'loadImage');
    loadSpy.mockRejectedValue(new Error('fail'));

    const { container, rerender } = render(<Avatar src="/broken.png" />);

    const root = container.querySelector('[data-component="avatar"]')!;

    // img first, then effect rejects and Avatar switches to fallback
    expect(container.querySelector('img')).toBeInTheDocument();

    await waitFor(() => {
      expect(
        container.querySelector('[data-role="avatar-fallback"]'),
      ).toBeInTheDocument();
      expect(container.querySelector('img')).not.toBeInTheDocument();
      expect(root).toHaveAttribute('data-state', 'error');
    });

    let resolve!: () => void;
    loadSpy.mockReset();
    loadSpy.mockImplementation(() => {
      return new Promise<void>((r) => {
        resolve = r;
      });
    });

    rerender(<Avatar src="/fixed.png" />);

    expect(container.querySelector('img')).toBeInTheDocument();
    expect(
      container.querySelector('[data-role="avatar-fallback"]'),
    ).not.toBeInTheDocument();
    expect(root).toHaveAttribute('data-state', 'idle');

    resolve();
    await waitFor(() => {
      expect(root).toHaveAttribute('data-state', 'loaded');
    });
  });

  it('should call user provided onLoad and onError handlers', () => {
    const onLoad = vi.fn();
    const onError = vi.fn();

    const loadSpy = vi.spyOn(helpers, 'loadImage');
    loadSpy.mockResolvedValue(undefined);

    const { rerender } = render(
      <Avatar src="/image.png" onLoad={onLoad} onError={onError} />,
    );

    return waitFor(() => {
      expect(onLoad).toHaveBeenCalledTimes(1);
    }).then(async () => {
      loadSpy.mockReset();
      loadSpy.mockRejectedValue(new Error('fail'));

      rerender(<Avatar src="/broken.png" onLoad={onLoad} onError={onError} />);

      await waitFor(() => {
        expect(onError).toHaveBeenCalledTimes(1);
      });
    });
  });

  it('should keep alt="" as a decorative image without a default label', () => {
    vi.spyOn(helpers, 'loadImage').mockImplementation(
      () => new Promise<void>(() => {}),
    );
    const { container } = render(<Avatar src="/img-1.png" alt="" />);

    const img = container.querySelector('img')!;
    expect(img).toHaveAttribute('alt', '');
    expect(img).not.toHaveAttribute('role');
    expect(img).not.toHaveAttribute('aria-label');
  });

  it('should hide a decorative fallback from assistive technology', () => {
    const { container } = render(<Avatar alt="" />);

    const fallback = container.querySelector('[data-role="avatar-fallback"]')!;
    expect(fallback).toHaveAttribute('aria-hidden', 'true');
    expect(fallback).not.toHaveAttribute('role');
    expect(fallback).not.toHaveAttribute('aria-label');
  });

  it('should still label the image by default', () => {
    vi.spyOn(helpers, 'loadImage').mockImplementation(
      () => new Promise<void>(() => {}),
    );
    const { container } = render(<Avatar src="/img-1.png" />);

    const img = container.querySelector('img')!;
    expect(img).toHaveAttribute('alt', '프로필 이미지');
    expect(img).toHaveAttribute('role', 'img');
  });
});
