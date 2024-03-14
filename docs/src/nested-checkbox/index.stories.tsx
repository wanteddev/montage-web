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
  NestedCheckbox,
} from '@wanteddev/wds';
import { useId } from 'react';
import { useForm } from 'react-hook-form';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NestedCheckbox> = {
  component: NestedCheckbox,
  title: 'Components/Nested Checkbox',
  args: {
    defaultChecked: false,
    disabled: false,
    required: false,
    size: 'normal',
  },
};

export default meta;
type Story = StoryObj<typeof NestedCheckbox>;

export const Basic: Story = {
  args: {},
};

export const WithLabel = () => {
  const id = useId();

  return (
    <FlexBox gap="4px">
      <NestedCheckbox id={id} />
      <Label htmlFor={id}>Label</Label>
    </FlexBox>
  );
};

export const WithForm = () => {
  const form = useForm<{ checked?: boolean }>();

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
          rules={{ required: { value: true, message: '필수 값입니다.' } }}
          render={({ field }) => (
            <FormItem>
              <FlexBox gap="4px">
                <FormControl>
                  <NestedCheckbox
                    {...field}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>체크박스</FormLabel>
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

export const WithFormMultiCheckbox = () => {
  const form = useForm<{ selected: Array<string> }>({
    defaultValues: { selected: [] },
  });

  const items = [
    {
      id: 'develop',
      label: '개발',
    },
    { id: 'design', label: '디자인' },
  ];

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
          render={() => (
            <FormItem>
              <FormLabel>관심 분야</FormLabel>

              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="selected"
                  rules={{
                    required: {
                      value: true,
                      message: '필수 값입니다.',
                    },
                  }}
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        flexDirection="row"
                        alignItems="center"
                      >
                        <FormControl>
                          <NestedCheckbox
                            {...field}
                            checked={field.value.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value.filter(
                                      (value) => value !== item.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel>{item.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">제출</Button>
      </FlexBox>
    </Form>
  );
};
