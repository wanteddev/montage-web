import { Avatar, AvatarButton } from '@wanteddev/wds';
import { IconPersonFill } from '@wanteddev/wds-icon';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AvatarButton> = {
  component: AvatarButton,
  title: 'Components/Avatar Button',
  args: {
    children: <Avatar variant="circle" fallback={<IconPersonFill />} />,
  },
};

export default meta;
type Story = StoryObj<typeof AvatarButton>;

export const Basic: Story = {
  args: {},
};

export const WithPushBadge: Story = {
  args: {
    pushBadge: true,
  },
};

export const WithLink: Story = {
  args: {
    as: 'a',
    href: 'https://www.wanted.co.kr',
    target: '_blank',
  },
};
