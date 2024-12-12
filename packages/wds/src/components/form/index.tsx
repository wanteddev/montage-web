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
import type { FlexBoxProps } from '../flex-box/types';
import type {
  FormControlProps,
  FormErrorMessageProps,
  FormLabelProps,
  FormMessageProps,
} from './types';

const FormField = forwardRef(
  <E extends ElementType = 'div'>(
    { as, ...props }: PolymorphicProps<FlexBoxProps, E>,
    ref: ForwardedRef<E>,
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
) as PolymorphicComponent<FlexBoxProps, 'div'>;

FormField.displayName = FORM_FIELD_NAME;

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>((props, ref) => {
  const { formFieldId, formLabelId } = useFormField(FORM_LABEL_NAME);

  return <Label ref={ref} id={formLabelId} htmlFor={formFieldId} {...props} />;
});

FormLabel.displayName = FORM_LABEL_NAME;

const FormControl = forwardRef<ElementRef<typeof Slot>, FormControlProps>(
  (props, ref) => {
    const { formFieldId, formLabelId, formMessageId, formErrorMessageId } =
      useFormField(FORM_CONTROL_NAME);

    return (
      <Slot
        ref={ref}
        id={formFieldId}
        aria-describedby={`${formMessageId} ${formErrorMessageId}`}
        aria-labelledby={formLabelId}
        {...props}
      />
    );
  },
);

FormControl.displayName = FORM_CONTROL_NAME;

const FormMessage = forwardRef(
  <E extends ElementType = 'p'>(
    { as, children, ...props }: PolymorphicProps<FormMessageProps, E>,
    ref: ForwardedRef<E>,
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

FormMessage.displayName = FORM_MESSAGE_NAME;

const FormErrorMessage = forwardRef(
  <E extends ElementType = 'p'>(
    { as, children, ...props }: PolymorphicProps<FormErrorMessageProps, E>,
    ref: ForwardedRef<E>,
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

FormErrorMessage.displayName = FORM_ERROR_MESSAGE_NAME;

export { FormControl, FormErrorMessage, FormField, FormLabel, FormMessage };
