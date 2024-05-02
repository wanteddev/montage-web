import type { FlexBoxProps } from '../flex-box/types';
import type { MergeElementProps } from '@wanteddev/wds-engine';
import type { Slot } from '@radix-ui/react-slot';
import type Label from '../label';
import type { ComponentPropsWithoutRef } from 'react';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import type { TypographyProps } from '../typography/types';

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName>;

export type FormItemProps = MergeElementProps<'div', FlexBoxProps>;

export type FormLabelProps = ComponentPropsWithoutRef<typeof Label>;

export type FormControlProps = ComponentPropsWithoutRef<typeof Slot>;

export type FormDescriptionProps = MergeElementProps<'p', TypographyProps>;

export type FormErrorMessageProps = MergeElementProps<'p', TypographyProps>;

export type FormMessageProps = MergeElementProps<'p', TypographyProps>;
