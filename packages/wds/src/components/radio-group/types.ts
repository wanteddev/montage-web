import type { RadioProps } from '../radio/types';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { RovingFocusGroupProps } from '@radix-ui/react-roving-focus';
import type { Merge, WithSxProps } from '@wanteddev/wds-engine';
import type { RadioGroupContextType } from './contexts';
import type { Radio } from '../radio';

export type RadioGroupProps = WithSxProps<{
  name?: RadioGroupContextType['name'];
  required?: RadioProps['required'];
  disabled?: RadioProps['disabled'];
  dir?: RovingFocusGroupProps['dir'];
  orientation?: RovingFocusGroupProps['orientation'];
  loop?: RovingFocusGroupProps['loop'];
  defaultValue?: string;
  value?: RadioGroupContextType['value'];
  onValueChange?: RadioGroupContextType['onValueChange'];
  children?: ReactNode;
}>;

export type RadioGroupItemProps = Merge<
  {
    value: string;
  },
  Omit<ComponentPropsWithoutRef<typeof Radio>, 'onCheck' | 'name'>
>;
