import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { TextButton } from '.';

import type { Mock } from 'vitest';

describe('when given text button component with loading', () => {
  let handleClick: Mock;
  let handleMouseDown: Mock;
  let handlePointerDown: Mock;
  let handleKeyDown: Mock;

  beforeEach(() => {
    handleClick = vi.fn();
    handleMouseDown = vi.fn();
    handlePointerDown = vi.fn();
    handleKeyDown = vi.fn();
  });

  afterEach(() => {
    cleanup();
  });

  it('should prevent click event', () => {
    render(
      <TextButton
        data-testid="text-button"
        loading
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
      />,
    );

    const button = screen.getByTestId('text-button');

    fireEvent.click(button);
    fireEvent.mouseDown(button);
    fireEvent.pointerDown(button);
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: ' ' });

    expect(handleClick).not.toHaveBeenCalled();
    expect(handleMouseDown).not.toHaveBeenCalled();
    expect(handlePointerDown).not.toHaveBeenCalled();
    expect(handleKeyDown).not.toHaveBeenCalled();

    fireEvent.keyDown(button, { key: 'Tab' });

    expect(handleKeyDown).toHaveBeenCalled();
  });

  it('should not prevent click event when disableLoadingPreventEvents is true', () => {
    render(
      <TextButton
        data-testid="text-button"
        loading
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        disableLoadingPreventEvents
      />,
    );

    const button = screen.getByTestId('text-button');

    fireEvent.click(button);
    fireEvent.mouseDown(button);
    fireEvent.pointerDown(button);
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: ' ' });

    expect(handleClick).toHaveBeenCalled();
    expect(handleMouseDown).toHaveBeenCalled();
    expect(handlePointerDown).toHaveBeenCalled();
    expect(handleKeyDown).toHaveBeenCalled();
  });
});
