import { FlexBox } from '@wanteddev/wds';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FlexBox> = {
  component: FlexBox,
  title: 'Components/Flex Box',
};

export default meta;

export const Basic: StoryObj<typeof FlexBox> = {
  args: {},
};
