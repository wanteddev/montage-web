'use client';
import { Slot } from '@radix-ui/react-slot';
import { Controller, FormProvider } from 'react-hook-form';
import { forwardRef, useId } from 'react';

import Label from '../label';
import Typography from '../typography';
import FlexBox from '../flex-box';

import { FormFieldProvider, FormItemProvider } from './contexts';
import {
  FORM_CONTROL_NAME,
  FORM_DESCRIPTION_NAME,
  FORM_ERROR_MESSAGE_NAME,
  FORM_FIELD_NAME,
  FORM_ITEM_NAME,
  FORM_LABEL_NAME,
  FORM_MESSAGE_NAME,
} from './constants';
import { useFormField } from './hooks';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import type {
  FormControlProps,
  FormDescriptionProps,
  FormErrorMessageProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormMessageProps,
} from './types';

const Form: typeof FormProvider = FormProvider;

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

const FormItem = forwardRef(
  <E extends ElementType = 'div'>(
    { as, ...props }: PolymorphicProps<FormItemProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const id = useId();

    return (
      <FormItemProvider id={id}>
        <FlexBox
          as={(as || 'div') as E}
          ref={ref}
          flexDirection="column"
          gap="8px"
          {...props}
        />
      </FormItemProvider>
    );
  },
) as PolymorphicComponent<FormItemProps, 'div'>;

FormItem.displayName = FORM_ITEM_NAME;

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>((props, ref) => {
  const { formItemId } = useFormField(FORM_LABEL_NAME);

  return <Label ref={ref} htmlFor={formItemId} {...props} />;
});

FormLabel.displayName = FORM_LABEL_NAME;

const FormControl = forwardRef<ElementRef<typeof Slot>, FormControlProps>(
  (props, ref) => {
    const {
      error,
      formItemId,
      formMessageId,
      formDescriptionId,
      formErrorMessageId,
    } = useFormField(FORM_CONTROL_NAME);

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={
          Boolean(error)
            ? `${formMessageId} ${formDescriptionId} ${formErrorMessageId}`
            : `${formMessageId} ${formDescriptionId}`
        }
        aria-invalid={Boolean(error)}
        {...(Boolean(error) && { invalid: Boolean(error).toString() })}
        {...props}
      />
    );
  },
);

FormControl.displayName = FORM_CONTROL_NAME;

const FormDescription = forwardRef(
  <E extends ElementType = 'p'>(
    { as, children, ...props }: PolymorphicProps<FormDescriptionProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const { formDescriptionId } = useFormField(FORM_DESCRIPTION_NAME);

    if (!children) {
      return null;
    }

    return (
      <Typography
        as={(as || 'p') as E}
        ref={ref}
        id={formDescriptionId}
        variant="label2"
        weight="regular"
        color="palette.label.alternative"
        {...props}
      >
        {children}
      </Typography>
    );
  },
) as PolymorphicComponent<FormDescriptionProps, 'p'>;

FormDescription.displayName = FORM_DESCRIPTION_NAME;

const FormErrorMessage = forwardRef(
  <E extends ElementType = 'p'>(
    { as, children, ...props }: PolymorphicProps<FormErrorMessageProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const { error, formErrorMessageId } = useFormField(FORM_ERROR_MESSAGE_NAME);

    const message = String(error?.message || '') || children;

    if (!message) {
      return null;
    }

    return (
      <Typography
        as={(as || 'p') as E}
        ref={ref}
        id={formErrorMessageId}
        variant="label2"
        weight="regular"
        color="palette.status.negative"
        {...props}
      >
        {message}
      </Typography>
    );
  },
) as PolymorphicComponent<FormErrorMessageProps, 'p'>;

FormErrorMessage.displayName = FORM_ERROR_MESSAGE_NAME;

const FormMessage = forwardRef(
  <E extends ElementType = 'p'>(
    { as, children, ...props }: PolymorphicProps<FormMessageProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const { error, formMessageId } = useFormField(FORM_MESSAGE_NAME);

    const hasError = Boolean(error);

    const message = String(error?.message || '') || children;

    if (!message) {
      return null;
    }

    return (
      <Typography
        as={(as || 'p') as E}
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
) as PolymorphicComponent<FormMessageProps, 'p'>;

FormMessage.displayName = FORM_MESSAGE_NAME;

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormErrorMessage,
  FormMessage,
  FormField,
};
