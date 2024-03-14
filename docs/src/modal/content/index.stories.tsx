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

const meta: Meta<typeof ModalContent> = {
  component: ModalContent,
  title: 'Components/Modal/Content',
  args: {
    padding: false,
    paddingExtra: false,
    paddingInfo: false,
  },
  argTypes: {
    padding: {
      type: 'boolean',
    },
    paddingExtra: {
      type: 'boolean',
    },
    paddingInfo: {
      type: 'boolean',
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
            <ModalContent {...args}>
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

type Story = StoryObj<typeof ModalContent>;

export const Basic: Story = {
  args: {},
};
