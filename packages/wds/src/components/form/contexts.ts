import { createContext } from '@radix-ui/react-context';
import { type FieldPath, type FieldValues } from 'react-hook-form';

import { FORM_FIELD_NAME, FORM_ITEM_NAME } from './constants';

export type FormFieldContextType<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export const [FormFieldProvider, useFormFieldContext] =
  createContext<FormFieldContextType>(FORM_FIELD_NAME);

type FormItemContextType = {
  id: string;
};

export const [FormItemProvider, useFormItemContext] =
  createContext<FormItemContextType>(FORM_ITEM_NAME);
