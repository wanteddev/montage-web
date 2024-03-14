import { Avatar, AvatarGroup } from '@wanteddev/wds';
import { IconPersonFill } from '@wanteddev/wds-icon';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AvatarGroup> = {
  component: AvatarGroup,
  title: 'Components/Avatar Group',
  render: (args) => {
    return (
      <AvatarGroup {...args}>
        <Avatar
          variant="circle"
          src="https://developer.mozilla.org/favicon-48x48.cbbd161b.png"
          alt="Mozilla"
          fallback={<IconPersonFill />}
        />
        <Avatar variant="circle" fallback={<IconPersonFill />} />
        <Avatar variant="circle" fallback={<IconPersonFill />} />
        <Avatar variant="circle" fallback={<IconPersonFill />} />
      </AvatarGroup>
    );
  },
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Basic: Story = {
  args: {},
};
