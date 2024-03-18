import { Tab, TabItem } from '@wanteddev/wds';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tab> = {
  component: Tab,
  title: 'Components/Tab',
  args: {},
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <TabItem active={true}>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
      </>
    ),
  },
};

export const Scroll: Story = {
  args: {
    children: (
      <>
        <TabItem active={true}>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
        <TabItem>텍스트</TabItem>
      </>
    ),
  },
};
