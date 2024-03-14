import {
  FlexBox,
  Form,
  FormControl,
  FormField,
  FormItem,
  IconButton,
  TextArea,
  TextButton,
} from '@wanteddev/wds';
import { useForm } from 'react-hook-form';
import { IconSendFill } from '@wanteddev/wds-icon';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: 'Components/Text Area',
  args: {
    disabled: false,
    placeholder: '입력하세요.',
    defaultValue: '',
    width: '300px',
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {
  args: {},
};

export const WithMinRows: Story = {
  args: {
    minRows: 3,
  },
};

export const WithMaxRows: Story = {
  args: {
    maxRows: 3,
  },
};

export const WithAction: Story = {
  args: {
    rightIcon: (
      <TextButton size="small" color="primary">
        보내기
      </TextButton>
    ),
  },
};

export const WithActionIcon: Story = {
  args: {
    rightIcon: (
      <IconButton size="small" variant="solid">
        <IconSendFill />
      </IconButton>
    ),
  },
};

export const WithForm = () => {
  const form = useForm<{ content?: string }>();

  return (
    <Form {...form}>
      <FlexBox
        as="form"
        flexDirection="column"
        gap="12px"
        onSubmit={form.handleSubmit((v) => alert(JSON.stringify(v)))}
      >
        <FormField
          control={form.control}
          name="content"
          rules={{
            maxLength: 100,
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextArea
                  {...field}
                  maxLength={100}
                  width="300px"
                  placeholder="값을 입력하세요."
                  rightIcon={
                    <IconButton
                      disabled={!Boolean(field.value)}
                      type="submit"
                      variant="solid"
                      size="small"
                      aria-label="submit"
                    >
                      <IconSendFill />
                    </IconButton>
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
      </FlexBox>
    </Form>
  );
};
