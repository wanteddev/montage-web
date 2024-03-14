import type { Slot } from '@radix-ui/react-slot';
import type { FlexBox, Typography } from '..';
import type Label from '../label';
import type { ComponentPropsWithoutRef } from 'react';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName>;

export type FormItemProps = Omit<
  ComponentPropsWithoutRef<typeof FlexBox<'div'>>,
  'as'
>;

export type FormLabelProps = ComponentPropsWithoutRef<typeof Label>;

export type FormControlProps = ComponentPropsWithoutRef<typeof Slot>;

export type FormMessageProps = Omit<
  ComponentPropsWithoutRef<typeof Typography<'p'>>,
  'as'
>;
