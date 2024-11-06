import type { CheckboxProps } from '../checkbox/types';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';

export type NestedCheckboxProps = Omit<
  DefaultComponentProps<CheckboxProps, 'button'>,
  'onChange' | 'value' | 'indeterminate' | 'indeterminateIcon'
>;
