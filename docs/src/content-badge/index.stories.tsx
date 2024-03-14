import { IconPencil } from '@wanteddev/wds-icon';
import { ContentBadge } from '@wanteddev/wds';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ContentBadge> = {
  component: ContentBadge,
  title: 'Components/Content Badge',
  args: {
    children: '원티드',
    variant: 'outlined',
    color: 'neutral',
    size: 'small',
  },
};

export default meta;
type Story = StoryObj<typeof ContentBadge>;

export const OutlinedNeutral: Story = {
  args: {
    variant: 'outlined',
    color: 'neutral',
  },
};

export const FilledNeutral: Story = {
  args: {
    variant: 'filled',
    color: 'neutral',
  },
};

export const FilledAccent: Story = {
  args: {
    variant: 'filled',
    color: 'accent',
    accentColor: 'lightBlue',
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
