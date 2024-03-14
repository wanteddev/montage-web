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

const meta: Meta<typeof ModalNavigation> = {
  component: ModalNavigation,
  title: 'Components/Modal/Navigation',
  args: {
    children: '제목',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['compact', 'floating', 'emphasized', 'extended'],
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
            <ModalNavigation {...args} />
            <ModalContent padding>
              <ModalContentItem>
                <ModalHeading>제목</ModalHeading>
                <ModalSummary>요약</ModalSummary>
                <ModalDescription>설명</ModalDescription>
              </ModalContentItem>
            </ModalContent>
            <ModalActionArea priority="strong" variant="normal">
              <ModalActionButton variant="primary">메인 액션</ModalActionButton>
            </ModalActionArea>
          </ModalContainer>
        </Modal>
      </>
    );
  },
};

export default meta;

type Story = StoryObj<typeof ModalNavigation>;

export const Basic: Story = {
  args: {
    variant: 'compact',
  },
};
