import { FlexBox, Thumbnail } from '@wanteddev/wds';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Thumbnail> = {
  component: Thumbnail,
  title: 'Components/Thumbnail',
  args: {
    src: 'https://static.wanted.co.kr/images/company/79/elpzxpmgh94xesrf__1080_790.png',
    width: '600px',
    quality: 90,
    ratio: '1:1',
    alt: '',
  },
  render: (args) => {
    return (
      <FlexBox css={{ width: '400px' }}>
        <Thumbnail {...args} />
      </FlexBox>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Thumbnail>;

export const OneOne: Story = {
  args: {},
};

export const FourThree: Story = {
  args: {
    ratio: '4:3',
  },
};

export const Fallback: Story = {
  args: {
    src: '',
  },
};
