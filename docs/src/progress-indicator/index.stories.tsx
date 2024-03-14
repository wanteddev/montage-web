import { ProgressIndicator } from '@wanteddev/wds';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProgressIndicator> = {
  component: ProgressIndicator,
  title: 'Components/Progress Indicator',
  args: {},
};

export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

export const Basic: Story = {
  args: {
    percent: 20,
  },
};
