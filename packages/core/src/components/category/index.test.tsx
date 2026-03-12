import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import { Category, CategoryList, CategoryListItem, CategoryPanel } from '.';

describe('when given category component with panel', () => {
  beforeEach(() => {
    render(
      <Category defaultValue="1">
        <CategoryList data-testid="category-list">
          <CategoryListItem data-testid="category-1" value="1">
            Category 1
          </CategoryListItem>
          <CategoryListItem data-testid="category-2" value="2">
            Category 2
          </CategoryListItem>
        </CategoryList>
        <CategoryPanel
          data-testid="category-panel-1"
          value="1"
          mountMode="only-active"
        >
          Panel 1
        </CategoryPanel>
        <CategoryPanel
          data-testid="category-panel-2"
          value="2"
          mountMode="only-active"
        >
          Panel 2
        </CategoryPanel>
      </Category>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should render category panel by category value', () => {
    expect(screen.getByTestId('category-panel-1')).toBeInTheDocument();
    expect(screen.queryByTestId('category-panel-2')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('category-2'));

    expect(screen.queryByTestId('category-panel-1')).not.toBeInTheDocument();
    expect(screen.getByTestId('category-panel-2')).toBeInTheDocument();
  });

  it('should handle keyboard navigation', async () => {
    fireEvent.focus(screen.getByTestId('category-1'));
    fireEvent.keyDown(screen.getByTestId('category-1'), { key: 'ArrowRight' });

    await waitFor(() => {
      expect(screen.getByTestId('category-2')).toHaveFocus();
      expect(screen.getByTestId('category-panel-2')).toBeInTheDocument();
    });
  });

  it('should pass accessibility test', async () => {
    expect(await axe(screen.getByTestId('category-list'))).toHaveNoViolations();
    expect(await axe(screen.getByTestId('category-1'))).toHaveNoViolations();
    expect(
      await axe(screen.getByTestId('category-panel-1')),
    ).toHaveNoViolations();
  });
});
