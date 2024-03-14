import { ProgressTracker, ProgressTrackerItem } from '@wanteddev/wds';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProgressTracker> = {
  component: ProgressTracker,
  title: 'Components/Progress Tracker',
  args: {},
  render: (args) => {
    return (
      <ProgressTracker {...args}>
        <ProgressTrackerItem />
        <ProgressTrackerItem />
        <ProgressTrackerItem />
        <ProgressTrackerItem />
        <ProgressTrackerItem />
      </ProgressTracker>
    );
  },
};

export default meta;
type Story = StoryObj<typeof ProgressTracker>;

export const Basic: Story = {
  args: {
    activeStep: 0,
  },
};
