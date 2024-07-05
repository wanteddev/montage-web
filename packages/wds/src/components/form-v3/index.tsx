'use client';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef, useId } from 'react';

import FlexBox from '../flex-box';
import Label from '../label';
import Typography from '../typography';

import {
  FORM_CONTROL_NAME,
  FORM_ERROR_MESSAGE_NAME,
  FORM_FIELD_NAME,
  FORM_LABEL_NAME,
  FORM_MESSAGE_NAME,
} from './constants';
import { FormFieldProvider } from './contexts';
import { useFormField } from './hooks';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type {
  FormControlProps,
  FormErrorMessageProps,
  FormFieldProps,
  FormLabelProps,
  FormMessageProps,
} from './types';

const FormFieldV3 = forwardRef(
  <E extends ElementType = 'div'>(
    { as, ...props }: PolymorphicProps<FormFieldProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const id = useId();

    return (
      <FormFieldProvider id={id}>
        <FlexBox
          as={(as || 'div') as E}
          ref={ref}
          flexDirection="column"
          gap="8px"
          {...props}
        />
      </FormFieldProvider>
    );
  },
) as PolymorphicComponent<FormFieldProps, 'div'>;

FormFieldV3.displayName = FORM_FIELD_NAME;

const FormLabelV3 = forwardRef<HTMLLabelElement, FormLabelProps>(
  (props, ref) => {
    const { formFieldId } = useFormField(FORM_LABEL_NAME);

    return <Label ref={ref} htmlFor={formFieldId} {...props} />;
  },
);

FormLabelV3.displayName = FORM_LABEL_NAME;

const FormControlV3 = forwardRef<ElementRef<typeof Slot>, FormControlProps>(
  ({ error, ...props }, ref) => {
    const { formFieldId, formMessageId, formErrorMessageId } =
      useFormField(FORM_CONTROL_NAME);

    return (
      <Slot
        ref={ref}
        id={formFieldId}
        aria-describedby={
          Boolean(error)
            ? `${formMessageId} ${formErrorMessageId}`
            : `${formMessageId}`
        }
        aria-invalid={Boolean(error)}
        {...(Boolean(error) && { invalid: Boolean(error).toString() })}
        {...props}
      />
    );
  },
);

FormControlV3.displayName = FORM_CONTROL_NAME;

const FormMessageV3 = forwardRef(
  <E extends ElementType = 'p'>(
    { as, children, ...props }: PolymorphicProps<FormMessageProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const { formMessageId } = useFormField(FORM_MESSAGE_NAME);

    if (!children) {
      return null;
    }

    return (
      <Typography
        as={(as || 'p') as E}
        ref={ref}
        id={formMessageId}
        variant="label2"
        weight="regular"
        color="palette.label.alternative"
        {...props}
      >
        {children}
      </Typography>
    );
  },
) as PolymorphicComponent<FormMessageProps, 'p'>;

FormMessageV3.displayName = FORM_MESSAGE_NAME;

const FormErrorMessageV3 = forwardRef(
  <E extends ElementType = 'p'>(
    { as, children, ...props }: PolymorphicProps<FormErrorMessageProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const { formErrorMessageId } = useFormField(FORM_ERROR_MESSAGE_NAME);

    if (!children) {
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
        {children}
      </Typography>
    );
  },
) as PolymorphicComponent<FormErrorMessageProps, 'p'>;

FormErrorMessageV3.displayName = FORM_ERROR_MESSAGE_NAME;

export {
  FormControlV3,
  FormErrorMessageV3,
  FormFieldV3,
  FormLabelV3,
  FormMessageV3,
};
