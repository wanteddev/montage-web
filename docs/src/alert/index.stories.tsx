import { Alert, Button } from '@wanteddev/wds';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'Components/Alert',
  args: {
    children: '콘텐츠입니다.',
    variant: 'normal',
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [show, setShow] = useState(false);

    return (
      <>
        <Alert {...args} show={show} onShowChange={setShow} />

        <Button
          variant="outlined"
          color="assistive"
          size="small"
          onClick={() => setShow(true)}
        >
          {args.variant}
        </Button>
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Normal: Story = {
  args: {
    variant: 'normal',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
};
