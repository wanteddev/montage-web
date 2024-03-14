import { Divider, FlexBox } from '@wanteddev/wds';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Divider> = {
  component: Divider,
  title: 'Components/Divider',
  args: {
    variant: 'normal',
    size: '100%',
    color: 'palette.line.normal.normal',
    vertical: false,
  },
  decorators: [
    (Story) => (
      <FlexBox css={{ height: '50px' }}>
        <Story />
      </FlexBox>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: {
    vertical: false,
  },
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
};
