import { TextButton } from '@wanteddev/wds';
import { IconPencil } from '@wanteddev/wds-icon';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextButton<'button'>> = {
  component: TextButton<'button'>,
  title: 'Components/Text Button',
  args: {
    children: 'Text Button',
    size: 'medium',
    color: 'primary',
    disabled: false,
    disableInteraction: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextButton<'button'>>;

export const Primary: Story = {
  args: {
    color: 'primary',
  },
};

export const Assistive: Story = {
  args: {
    color: 'assistive',
  },
};

export const Responsive: Story = {
  args: {
    color: 'assistive',
    size: 'small',
    md: {
      size: 'medium',
    },
  },
};

export const WithLink: StoryObj<typeof TextButton<'a'>> = {
  args: {
    as: 'a',
    color: 'assistive',
    href: 'https://www.wanted.co.kr',
    target: '_blank',
  },
};

export const WithLeftIcon: Story = {
  args: {
    color: 'assistive',
    leftIcon: <IconPencil />,
  },
};

export const WithRightIcon: Story = {
  args: {
    color: 'assistive',
    rightIcon: <IconPencil />,
  },
};
