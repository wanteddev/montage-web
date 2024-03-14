import { WithInteraction } from '@wanteddev/wds';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof WithInteraction> = {
  component: WithInteraction,
  title: 'Components/With Interaction',
  args: {
    children: (
      <button css={{ backgroundColor: 'transparent', padding: '4px 8px' }}>
        액션
      </button>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof WithInteraction>;

export const Basic: Story = {
  args: {},
};

export const CustomColor: Story = {
  args: {
    color: 'palette.status.negative',
  },
};

export const Scale: Story = {
  args: {
    scale: true,
    width: 'calc(100% + 8px)',
    height: 'calc(100% + 8px)',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
