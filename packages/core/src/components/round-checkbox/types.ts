import type { DefaultComponentProps } from '@montage-ui/engine';
import type { CheckboxProps } from '../checkbox/types';

export type RoundCheckboxProps = Omit<
  DefaultComponentProps<CheckboxProps, 'button'>,
  'onChange' | 'value'
>;
