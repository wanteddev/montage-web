import { ChipAction } from '@wanteddev/wds';
import { IconPencil } from '@wanteddev/wds-icon';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ChipAction<'button'>> = {
  component: ChipAction<'button'>,
  title: 'Components/Chip Action',
  args: {
    children: 'Chip Action',
    size: 'medium',
    variant: 'filled',
    disabled: false,
    disableInteraction: false,
  },
};

export default meta;
type Story = StoryObj<typeof ChipAction<'button'>>;

export const Filled: Story = {
  args: {},
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Responsive: Story = {
  args: {
    variant: 'outlined',
    size: 'small',
    md: {
      size: 'medium',
    },
  },
};

export const WithLink: StoryObj<typeof ChipAction<'a'>> = {
  args: {
    as: 'a',
    variant: 'outlined',
    href: 'https://www.wanted.co.kr',
    target: '_blank',
  },
};

export const WithLeftIcon: Story = {
  args: {
    variant: 'outlined',
    leftIcon: <IconPencil />,
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: 'outlined',
    rightIcon: <IconPencil />,
  },
};
