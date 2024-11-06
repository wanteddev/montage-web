import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { CheckboxProps } from '../checkbox/types';

export type RoundCheckboxProps = Omit<
  DefaultComponentProps<CheckboxProps, 'button'>,
  'onChange' | 'value'
>;
