import { createContext } from '@radix-ui/react-context';

import createLooseContext from '../../hooks/internal/use-loose-context';

import { FORM_CONTROL_NAME } from './constants';

import type { ResponsiveProps } from '@montage-ui/engine';
import type { FormControlProps } from './types';

export type FormControlContextType = {
  id: string;
};

export const [FormControlProvider, useFormControlContext] =
  createContext<FormControlContextType>(FORM_CONTROL_NAME);

export type FormControlLayoutContextType = {
  /** Base size declared on FormControl. */
  size?: FormControlProps['size'];
  /** Per-breakpoint size declared on FormControl. */
  responsive?: ResponsiveProps<Pick<FormControlProps, 'size'>>;
};

export const [FormControlLayoutProvider, useFormControlLayoutContext] =
  createLooseContext<FormControlLayoutContextType>('AnyComponent');
