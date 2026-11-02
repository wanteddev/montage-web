import type { CheckboxProps } from '../checkbox/types';
import type { DefaultComponentProps } from '@montage-ui/engine';

export type RoundCheckboxProps = Omit<
  DefaultComponentProps<CheckboxProps, 'button'>,
  'onChange' | 'value'
>;
