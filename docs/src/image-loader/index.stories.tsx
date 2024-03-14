import { ImageLoader, getOptimizedImageSource } from '@wanteddev/wds';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ImageLoader> = {
  component: ImageLoader,
  title: 'Components/Image Loader',
  args: {
    src: 'https://static.wanted.co.kr/images/company/79/elpzxpmgh94xesrf__1080_790.png',
    width: '600px',
    quality: 90,
    alt: '',
  },
};

export default meta;
type Story = StoryObj<typeof ImageLoader>;

export const Basic: Story = {
  args: {},
};

export const Responsive: Story = {
  args: {
    src: 'https://static.wanted.co.kr/images/company/79/elpzxpmgh94xesrf__1080_790.png',
    width: '600px',
    quality: 90,
  },
  render: (args) => {
    return (
      <ImageLoader
        {...args}
        srcSet={`${getOptimizedImageSource({
          src: 'https://static.wanted.co.kr/images/company/79/elpzxpmgh94xesrf__1080_790.png',
          width: '300px',
          quality: 90,
        })} 480w, ${getOptimizedImageSource({
          src: 'https://static.wanted.co.kr/images/company/79/elpzxpmgh94xesrf__1080_790.png',
          width: '600px',
          quality: 90,
        })} 800w`}
        sizes="(max-width: 767px) 480px, 800px"
      />
    );
  },
};
