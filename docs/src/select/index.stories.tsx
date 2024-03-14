import {
  Button,
  FlexBox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
} from '@wanteddev/wds';
import { useForm } from 'react-hook-form';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Components/Select',
  args: {
    disabled: false,
    placeholder: '선택',
    defaultValue: '',
    width: '200px',
  },
};

export default meta;

type Story = StoryObj<typeof Select>;
export const Basic: Story = {
  args: {
    children: <option value="test">test</option>,
  },
};

export const WithOptionGroup: Story = {
  args: {
    children: (
      <>
        <optgroup label="그룹">
          <option value="test">Test</option>
        </optgroup>

        <optgroup label="그룹2">
          <option value="test2">Test2</option>
        </optgroup>
      </>
    ),
  },
};

export const WithForm = () => {
  const form = useForm<{ selected?: string }>();

  return (
    <Form {...form}>
      <FlexBox
        as="form"
        flexDirection="column"
        gap="8px"
        onSubmit={form.handleSubmit((v) => alert(JSON.stringify(v)))}
      >
        <FormField
          control={form.control}
          name="selected"
          rules={{ required: { value: true, message: '필수 값입니다.' } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select</FormLabel>

              <FormControl>
                <Select {...field} width="300px" placeholder="값을 선택하세요.">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Select>
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
