import { FloatingAction } from '@wanteddev/wds';
import { IconPencil } from '@wanteddev/wds-icon';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FloatingAction<'button'>> = {
  component: FloatingAction<'button'>,
  title: 'Components/Floating Action',
  args: {
    size: '56px',
    iconSize: '24px',
    disabled: false,
    disableInteraction: false,
    children: <IconPencil />,
  },
};

export default meta;
type Story = StoryObj<typeof FloatingAction<'button'>>;

export const Basic: Story = {
  args: {},
};

export const WithLink: StoryObj<typeof FloatingAction<'a'>> = {
  args: {
    as: 'a',
    color: 'assistive',
    href: 'https://www.wanted.co.kr',
    target: '_blank',
  },
};
