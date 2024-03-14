import { Avatar } from '@wanteddev/wds';
import { IconCompany, IconPersonFill } from '@wanteddev/wds-icon';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Components/Avatar',
  args: {
    src: undefined,
    alt: undefined,
    size: 'large',
    variant: 'circle',
    fallback: <IconPersonFill />,
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Circle: Story = {
  args: {
    variant: 'circle',
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
  },
};

export const Square: Story = {
  args: {
    variant: 'square',
  },
};

export const Fallback: Story = {
  args: {
    variant: 'rounded',
    fallback: <IconCompany />,
  },
};

export const WithSrc: Story = {
  args: {
    src: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
    alt: 'Mozilla',
  },
};
