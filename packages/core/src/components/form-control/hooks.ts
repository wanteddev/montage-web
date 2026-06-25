import { useFormControlContext } from './contexts';

export const useFormControl = (componentName: string) => {
  const { id } = useFormControlContext(componentName);

  return {
    id,
    labelId: `${id}-form-control-label`,
    fieldId: `${id}-form-control-field`,
    messageId: `${id}-form-control-message`,
    negativeMessageId: `${id}-form-control-negative-message`,
    positiveMessageId: `${id}-form-control-positive-message`,
  };
};
