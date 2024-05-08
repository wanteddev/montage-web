import type { ComponentPropsWithoutRef } from 'react';
import type { RovingFocusGroup } from '@radix-ui/react-roving-focus';
import type { Merge } from '@wanteddev/wds-engine';
import type { RadioGroupContextType } from './contexts';
import type Radio from '../radio';

type RovingFocusGroupProps = ComponentPropsWithoutRef<typeof RovingFocusGroup>;

export type RadioGroupProps = {
  name?: RadioGroupContextType['name'];
  required?: ComponentPropsWithoutRef<typeof Radio>['required'];
  disabled?: ComponentPropsWithoutRef<typeof Radio>['disabled'];
  dir?: RovingFocusGroupProps['dir'];
  orientation?: RovingFocusGroupProps['orientation'];
  loop?: RovingFocusGroupProps['loop'];
  defaultValue?: string;
  value?: RadioGroupContextType['value'];
  onValueChange?: RadioGroupContextType['onValueChange'];
};

export type RadioGroupItemProps = Merge<
  {
    value: string;
  },
  Omit<ComponentPropsWithoutRef<typeof Radio>, 'onCheck' | 'name'>
>;
