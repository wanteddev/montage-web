import { IconButton } from '@wanteddev/wds';
import { IconPencil } from '@wanteddev/wds-icon';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof IconButton<'button'>> = {
  component: IconButton<'button'>,
  title: 'Components/Icon Button',
  args: {
    disabled: false,
    pushBadge: false,
    interactionColor: 'palette.label.normal',
    disableInteraction: false,
    children: <IconPencil />,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton<'button'>>;

export const Normal: Story = {
  args: {
    variant: 'normal',
  },
};

export const Background: Story = {
  args: {
    variant: 'background',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Solid: Story = {
  args: {
    variant: 'solid',
  },
};

export const WithLink: StoryObj<typeof IconButton<'a'>> = {
  args: {
    as: 'a',
    href: 'https://www.wanted.co.kr',
    target: '_blank',
  },
};
