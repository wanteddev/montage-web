'use client';
import { Slot } from '@radix-ui/react-slot';
import { Controller, FormProvider } from 'react-hook-form';
import { forwardRef, useId } from 'react';

import Label from '../label';
import Typography from '../typography';
import FlexBox from '../flex-box';

import { FormFieldProvider, FormItemProvider, useFormField } from './contexts';
import { FORM_FIELD_NAME, FORM_ITEM_NAME } from './constants';

import type { ElementRef } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import type {
  FormControlProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormMessageProps,
} from './types';

const Form = FormProvider;

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: FormFieldProps<TFieldValues, TName>) => {
  return (
    <FormFieldProvider name={props.name}>
      <Controller {...props} />
    </FormFieldProvider>
  );
};
FormField.displayName = FORM_FIELD_NAME;

const FormItem = forwardRef<HTMLDivElement, FormItemProps>((props, ref) => {
  const id = useId();

  return (
    <FormItemProvider id={id}>
      <FlexBox ref={ref} flexDirection="column" gap="8px" {...props} />
    </FormItemProvider>
  );
});
FormItem.displayName = FORM_ITEM_NAME;

const FormLabel: ReturnType<
  typeof forwardRef<HTMLLabelElement, FormLabelProps>
> = forwardRef<HTMLLabelElement, FormLabelProps>((props, ref) => {
  const { formItemId } = useFormField();

  return <Label ref={ref} htmlFor={formItemId} {...props} />;
});

FormLabel.displayName = 'FormLabel';

const FormControl = forwardRef<ElementRef<typeof Slot>, FormControlProps>(
  (props, ref) => {
    const { error, formItemId, formMessageId } = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={formMessageId}
        aria-invalid={Boolean(error)}
        {...(Boolean(error) && { invalid: Boolean(error).toString() })}
        {...props}
      />
    );
  },
);
FormControl.displayName = 'FormControl';

const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();

    const hasError = Boolean(error);

    const message = String(error?.message || '') || children;

    if (!message) {
      return null;
    }

    return (
      <Typography
        as="p"
        ref={ref}
        id={formMessageId}
        variant="label2"
        weight="regular"
        color={
          hasError ? 'palette.status.negative' : 'palette.label.alternative'
        }
        {...props}
      >
        {message}
      </Typography>
    );
  },
);
FormMessage.displayName = 'FormMessage';

export { Form, FormItem, FormLabel, FormControl, FormMessage, FormField };
