import {
  Button,
  Modal,
  ModalActionArea,
  ModalActionButton,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalDescription,
  ModalHeading,
  ModalNavigation,
  ModalSummary,
} from '@wanteddev/wds';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ModalActionArea> = {
  component: ModalActionArea,
  title: 'Components/Modal/Action Area',
  args: {
    children: <ModalActionButton variant="primary">액션</ModalActionButton>,
    variant: 'normal',
    priority: 'strong',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['normal', 'extra'],
    },
    priority: {
      control: 'radio',
      options: ['strong', 'neutral', 'compact', 'single'],
    },
    caption: {
      type: 'string',
    },
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContainer>
            <ModalNavigation>제목</ModalNavigation>
            <ModalContent padding>
              <ModalContentItem>
                <ModalHeading>제목</ModalHeading>
                <ModalSummary>요약</ModalSummary>
                <ModalDescription>설명</ModalDescription>
              </ModalContentItem>
            </ModalContent>

            <ModalActionArea {...args} />
          </ModalContainer>
        </Modal>
      </>
    );
  },
};

export default meta;

type Story = StoryObj<typeof ModalActionArea>;

export const Basic: Story = {
  args: {},
};

export const Strong: Story = {
  args: {
    priority: 'strong',
    children: (
      <>
        <ModalActionButton variant="primary">메인 액션</ModalActionButton>
        <ModalActionButton variant="secondary">대체 액션</ModalActionButton>
        <ModalActionButton variant="assistive">보조 액션</ModalActionButton>
      </>
    ),
  },
};

export const Neutral: Story = {
  args: {
    priority: 'neutral',
    children: (
      <>
        <ModalActionButton variant="assistive">보조 액션</ModalActionButton>
        <ModalActionButton variant="secondary">대체 액션</ModalActionButton>
        <ModalActionButton variant="primary">메인 액션</ModalActionButton>
      </>
    ),
  },
};

export const Compact: Story = {
  args: {
    priority: 'compact',
    children: (
      <>
        <ModalActionButton variant="assistive">대체 액션</ModalActionButton>
        <ModalActionButton variant="primary">메인 액션</ModalActionButton>
      </>
    ),
  },
};

export const Single: Story = {
  args: {
    priority: 'single',
    children: (
      <ModalActionButton variant="primary">메인 액션</ModalActionButton>
    ),
  },
};

export const Scroll = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalContainer>
          <ModalNavigation>제목</ModalNavigation>

          <ModalContent padding>
            <ModalContentItem>
              <ModalHeading>제목</ModalHeading>
              <ModalSummary>요약</ModalSummary>
              <ModalDescription>설명</ModalDescription>
            </ModalContentItem>

            <ModalContentItem>
              <ModalHeading>제목</ModalHeading>
              <ModalSummary>요약</ModalSummary>
              <ModalDescription>설명</ModalDescription>
            </ModalContentItem>

            <ModalContentItem>
              <ModalHeading>제목</ModalHeading>
              <ModalSummary>요약</ModalSummary>
              <ModalDescription>설명</ModalDescription>
            </ModalContentItem>
          </ModalContent>

          <ModalActionArea variant="normal" priority="strong">
            <ModalActionButton variant="primary">메인 액션</ModalActionButton>
          </ModalActionArea>
        </ModalContainer>
      </Modal>
    </>
  );
};
