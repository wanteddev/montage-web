import { Button } from '@wanteddev/wds';
import { IconPencil } from '@wanteddev/wds-icon';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
  args: {
    children: 'Button',
    size: 'medium',
    disabled: false,
    disableInteraction: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button<'button', 'outlined'>>;

export const SolidPrimary: StoryObj<typeof Button<'button', 'solid'>> = {
  args: {
    variant: 'solid',
    color: 'primary',
  },
};

export const OutlinedPrimary: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
  },
};

export const OutlinedSecondary: Story = {
  args: {
    variant: 'outlined',
    color: 'secondary',
  },
};

export const OutlinedAssistive: Story = {
  args: {
    variant: 'outlined',
    color: 'assistive',
  },
};

export const Responsive: Story = {
  args: {
    variant: 'outlined',
    color: 'assistive',
    size: 'large',
    md: {
      size: 'small',
    },
  },
};

export const WithLink: StoryObj<typeof Button<'a', 'outlined'>> = {
  args: {
    as: 'a',
    variant: 'outlined',
    color: 'assistive',
    href: 'https://www.wanted.co.kr',
    target: '_blank',
  },
};

export const WithLeftIcon: Story = {
  args: {
    variant: 'outlined',
    color: 'assistive',
    leftIcon: <IconPencil />,
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: 'outlined',
    color: 'assistive',
    rightIcon: <IconPencil />,
  },
};
