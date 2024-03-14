import { PushBadge } from '@wanteddev/wds';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PushBadge> = {
  component: PushBadge,
  title: 'Components/Push Badge',
  args: {},
};

export default meta;
type Story = StoryObj<typeof PushBadge>;

export const Dot: Story = {
  args: {
    variant: 'dot',
  },
};

export const New: Story = {
  args: {
    variant: 'new',
  },
};

export const Number: Story = {
  args: {
    variant: 'number',
    children: 1,
  },
};
