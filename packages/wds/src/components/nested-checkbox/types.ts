import type Checkbox from '../checkbox';
import type { ComponentPropsWithoutRef } from 'react';

export type NestedCheckboxProps = Omit<
  ComponentPropsWithoutRef<typeof Checkbox>,
  'indeterminate' | 'indeterminateIcon'
>;
