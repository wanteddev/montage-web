import { useFormContext } from 'react-hook-form';

import { useFormFieldContext, useFormItemContext } from './contexts';

export const useFormField = (componentName: string) => {
  const { name } = useFormFieldContext(componentName);
  const { id } = useFormItemContext(componentName);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(name, formState);

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formErrorMessageId: `${id}-form-item-error-message`,
    formMessageId: `${id}-form-item-message`,
    error: fieldState.error,
  };
};
