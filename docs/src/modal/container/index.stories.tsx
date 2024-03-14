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
// variant?: 'popup' | 'bottom' | 'full';
// size?: 'normal' | 'small' | 'medium' | 'large'
const meta: Meta<typeof ModalContainer> = {
  component: ModalContainer,
  title: 'Components/Modal/Container',
  argTypes: {
    variant: {
      control: 'radio',
      options: ['popup', 'bottom', 'full'],
    },
    size: {
      control: 'radio',
      options: ['normal', 'small', 'medium', 'large'],
    },
    // @ts-expect-error
    open: {
      table: {
        disable: true,
      },
    },
    defaultOpen: {
      table: {
        disable: true,
      },
    },
    container: {
      table: {
        disable: true,
      },
    },
    onOpenChange: {
      table: {
        disable: true,
      },
    },
    disableDimmer: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>

        <Modal open={open} onOpenChange={setOpen}>
          <ModalContainer {...args}>
            <ModalNavigation>제목</ModalNavigation>
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

type Story = StoryObj<typeof ModalContainer>;

export const Basic: Story = {
  args: {
    size: 'normal',
    variant: 'popup',
  },
};
