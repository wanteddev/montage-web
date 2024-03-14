import { Skeleton } from '@wanteddev/wds';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: 'Components/Skeleton',
  args: {
    width: '100%',
    height: '22px',
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {
  args: {},
};
