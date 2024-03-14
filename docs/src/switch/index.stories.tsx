import {
  Button,
  FlexBox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Label,
  Switch,
} from '@wanteddev/wds';
import { useId } from 'react';
import { useForm } from 'react-hook-form';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Components/Switch',
  args: {
    checked: false,
    defaultChecked: false,
    disabled: false,
    required: false,
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Basic: Story = {
  args: {},
};

export const WithLabel = () => {
  const id = useId();

  return (
    <FlexBox gap="4px" alignItems="center">
      <Label htmlFor={id}>알림</Label>
      <Switch id={id} />
    </FlexBox>
  );
};

export const WithForm = () => {
  const form = useForm<{ checked?: boolean }>({
    defaultValues: {
      checked: false,
    },
  });

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
          name="checked"
          render={({ field }) => (
            <FormItem>
              <FlexBox gap="8px" alignItems="center">
                <FormLabel>알림</FormLabel>
                <FormControl>
                  <Switch
                    {...field}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FlexBox>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">제출</Button>
      </FlexBox>
    </Form>
  );
};
