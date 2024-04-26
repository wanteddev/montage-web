import { get, useFormContext } from 'react-hook-form';

import { useFormFieldContext, useFormItemContext } from './contexts';

import type { FieldError } from 'react-hook-form';

export const useFormField = (componentName: string) => {
  const { name } = useFormFieldContext(componentName);
  const { id } = useFormItemContext(componentName);
  const { formState } = useFormContext();
  const error = get(formState.errors, name) as FieldError | undefined;

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formErrorMessageId: `${id}-form-item-error-message`,
    formMessageId: `${id}-form-item-message`,
    error,
  };
};
