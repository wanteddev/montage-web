import { ToggleIcon } from '@wanteddev/wds';
import { IconHeart, IconHeartFill } from '@wanteddev/wds-icon';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ToggleIcon<'button'>> = {
  component: ToggleIcon<'button'>,
  title: 'Components/Toggle Icon',
  args: {
    disabled: false,
    size: '24px',
    children: <IconHeart />,
    activeColor: 'palette.primary.normal',
  },
};

export default meta;
type Story = StoryObj<typeof ToggleIcon<'button'>>;

export const Basic: Story = {
  args: {},
};

export const IconByActive = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [active, setActive] = useState(false);

  return (
    <ToggleIcon
      active={active}
      onActiveChange={setActive}
      activeColor="palette.status.negative"
    >
      {active ? <IconHeartFill /> : <IconHeart />}
    </ToggleIcon>
  );
};
