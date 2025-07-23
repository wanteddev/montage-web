import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import { Tab, TabList, TabListItem, TabPanel } from '.';

describe('when given tab component with panel', () => {
  beforeEach(() => {
    render(
      <Tab defaultValue="1">
        <TabList data-testid="tab-list">
          <TabListItem data-testid="tab-1" value="1">
            Tab 1
          </TabListItem>
          <TabListItem data-testid="tab-2" value="2">
            Tab 2
          </TabListItem>
        </TabList>
        <TabPanel data-testid="tab-panel-1" value="1">
          Panel 1
        </TabPanel>
        <TabPanel data-testid="tab-panel-2" value="2">
          Panel 2
        </TabPanel>
      </Tab>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should render tab panel by tab value', () => {
    expect(screen.getByTestId('tab-panel-1')).toBeInTheDocument();
    expect(screen.queryByTestId('tab-panel-2')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('tab-2'));

    waitFor(() => {
      expect(screen.queryByTestId('tab-panel-1')).not.toBeInTheDocument();
      expect(screen.getByTestId('tab-panel-2')).toBeInTheDocument();
    });
  });

  it('should pass accessibility test', async () => {
    expect(await axe(screen.getByTestId('tab-list'))).toHaveNoViolations();
    expect(await axe(screen.getByTestId('tab-1'))).toHaveNoViolations();
    expect(await axe(screen.getByTestId('tab-panel-1'))).toHaveNoViolations();
  });
});
