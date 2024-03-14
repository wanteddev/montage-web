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
  Radio,
  RadioGroup,
  RadioGroupItem,
} from '@wanteddev/wds';
import { useForm } from 'react-hook-form';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: 'Components/Radio',
  args: {
    defaultChecked: false,
    checked: false,
    disabled: false,
    required: false,
    size: 'normal',
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Basic: Story = {
  args: {},
};

export const WithRadioGroup = () => {
  return (
    <RadioGroup>
      <FlexBox flexDirection="row" alignItems="center">
        <RadioGroupItem value="man" />
        <Label>Man</Label>
      </FlexBox>

      <FlexBox flexDirection="row" alignItems="center">
        <RadioGroupItem value="woman" />
        <Label>Woman</Label>
      </FlexBox>
    </RadioGroup>
  );
};

export const WithForm = () => {
  const form = useForm<{ gender?: string }>();

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
          name="gender"
          rules={{
            required: {
              value: true,
              message: '필수 값 입니다.',
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>성별</FormLabel>

              <FormControl>
                <RadioGroup
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem flexDirection="row" alignItems="center">
                    <FormControl>
                      <RadioGroupItem value="man" />
                    </FormControl>
                    <FormLabel>Man</FormLabel>
                  </FormItem>

                  <FormItem flexDirection="row" alignItems="center">
                    <FormControl>
                      <RadioGroupItem value="woman" />
                    </FormControl>
                    <FormLabel>Woman</FormLabel>
                  </FormItem>
                </RadioGroup>
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
