import type { Slot } from '@radix-ui/react-slot';
import type { ComponentPropsWithoutRef } from 'react';
import type { FlexBoxProps } from '../flex-box/types';
import type Label from '../label';
import type { TypographyProps } from '../typography/types';

export type FormFieldProps = FlexBoxProps & {
  name?: string;
};

export type FormLabelProps = ComponentPropsWithoutRef<typeof Label>;

type FieldErrors = {
  message?: string | undefined;
  [key: string]: any;
};

type FormControlError = boolean | string | FieldErrors;

export type FormControlProps = ComponentPropsWithoutRef<typeof Slot> & {
  error?: FormControlError;
};

export type FormMessageProps = TypographyProps;
export type FormErrorMessageProps = TypographyProps;
