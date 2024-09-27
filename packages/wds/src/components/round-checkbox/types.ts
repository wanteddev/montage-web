import type Checkbox from '../checkbox';
import type { ComponentPropsWithoutRef } from 'react';

export type RoundCheckboxProps = Omit<
  ComponentPropsWithoutRef<typeof Checkbox>,
  'indeterminate' | 'indeterminateIcon'
>;
