import {
  Button,
  FlexBox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TextButton,
  TextField,
} from '@wanteddev/wds';
import { useForm } from 'react-hook-form';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: 'Components/Text Field',
  args: {
    disabled: false,
    placeholder: '입력하세요.',
    defaultValue: '',
    width: '300px',
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Basic: Story = {
  args: {},
};

export const WithAction: Story = {
  args: {
    rightIcon: (
      <TextButton size="small" color="primary">
        확인
      </TextButton>
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
          rules={{ required: { value: true, message: '필수 값입니다.' } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>인풋</FormLabel>

              <FormControl>
                <TextField
                  {...field}
                  width="300px"
                  placeholder="값을 입력하세요."
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">제출</Button>
      </FlexBox>
    </Form>
  );
};
