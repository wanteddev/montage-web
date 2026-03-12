import { cleanup, render, screen, waitFor } from '@testing-library/react';

import * as imageBaseHelpers from '../image-base/helpers';

import { Thumbnail } from '.';

describe('when given thumbnail component', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('should render thumbnail with image', async () => {
    render(
      <Thumbnail
        alt="alt"
        data-testid="thumbnail"
        src="https://static.wanted.co.kr/favicon/new/favicon.ico"
      />,
    );

    expect(screen.getByTestId('thumbnail')).toBeInTheDocument();
    expect(screen.getByAltText('alt')).toBeInTheDocument();
  });

  it('should render thumbnail with image when src is changed', async () => {
    const { rerender } = render(
      <Thumbnail
        alt="alt"
        data-testid="thumbnail"
        src="https://static.wanted.co.kr/favicon/new/favicon.ico"
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('thumbnail')).toBeInTheDocument();
      expect(screen.getByAltText('alt')).toBeInTheDocument();
    });

    rerender(
      <Thumbnail
        alt="alt"
        data-testid="thumbnail"
        src="https://static.wanted.co.kr/favicon/favicon.ico"
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('thumbnail')).toBeInTheDocument();
      expect(screen.getByAltText('alt')).toBeInTheDocument();
    });

    vi.spyOn(imageBaseHelpers, 'loadImage').mockRejectedValue(
      new Error('test'),
    );

    rerender(<Thumbnail alt="alt" data-testid="thumbnail" src="/" />);

    await waitFor(() => {
      expect(screen.queryByTestId('thumbnail')).not.toBeInTheDocument();
      expect(screen.getByLabelText('alt')).toBeInTheDocument();
    });
  });

  it('should render fallback icon when image load failure', async () => {
    vi.spyOn(imageBaseHelpers, 'loadImage').mockRejectedValue(
      new Error('test'),
    );

    render(<Thumbnail alt="alt" data-testid="thumbnail" src="/" />);

    expect(screen.getByTestId('thumbnail')).toBeInTheDocument();

    // image load failure
    await waitFor(() => {
      expect(screen.queryByTestId('thumbnail')).not.toBeInTheDocument();
      expect(screen.getByLabelText('alt')).toBeInTheDocument();
    });
  });
});
