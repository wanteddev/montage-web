import { cleanup, render, screen, waitFor } from '@testing-library/react';

import { Thumbnail } from '.';

describe('when given thumbnail component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render thumbnail with image', () => {
    render(
      <Thumbnail
        alt="alt"
        data-testid="thumbnail"
        src="https://static.wanted.co.kr/favicon/new/favicon.ico"
      />,
    );

    // image load pending
    expect(screen.getByTestId('thumbnail')).toBeInTheDocument();
    expect(screen.getByAltText('alt')).toBeInTheDocument();

    // image load success
    waitFor(() => {
      expect(screen.getByTestId('thumbnail')).toBeInTheDocument();
      expect(screen.getByAltText('alt')).toBeInTheDocument();
    });
  });

  it('should render fallback icon when image load failure', () => {
    render(<Thumbnail alt="alt" data-testid="thumbnail" src="/" />);

    // image load
    expect(screen.getByTestId('thumbnail')).toBeInTheDocument();

    // image load failure
    waitFor(() => {
      expect(screen.queryByTestId('thumbnail')).not.toBeInTheDocument();
      expect(screen.getByLabelText('alt')).toBeInTheDocument();
    });
  });
});
