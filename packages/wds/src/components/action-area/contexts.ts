import { createContext } from '@radix-ui/react-context';

import { ACTION_AREA_NAME } from './constants';

import type { ActionAreaProps } from './types';

type ActionAreaContextValue = Pick<ActionAreaProps, 'priority'>;

export const [ActionAreaProvider, useActionAreaContext] =
  createContext<ActionAreaContextValue>(ACTION_AREA_NAME);
