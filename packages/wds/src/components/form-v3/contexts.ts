import { createContext } from '@radix-ui/react-context';

import { FORM_FIELD_NAME } from './constants';

type FormFieldContextType = {
  id: string;
};

export const [FormFieldProvider, useFormFieldContext] =
  createContext<FormFieldContextType>(FORM_FIELD_NAME);
