import { useFormFieldContext } from './contexts';

export const useFormField = (componentName: string) => {
  const { id } = useFormFieldContext(componentName);

  return {
    id,
    formFieldId: `${id}-form-field`,
    formMessageId: `${id}-form-field-message`,
    formErrorMessageId: `${id}-form-field-error-message`,
  };
};
