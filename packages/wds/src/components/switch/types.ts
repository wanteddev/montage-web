import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

export type SwitchDefaultProps = {
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: 'small' | 'medium';
  onCheckedChange?: (state: boolean) => void;
};

export type SwitchResponsiveProps = ResponsiveProps<
  Pick<SwitchDefaultProps, 'size'>
>;

export type SwitchProps = Merge<SwitchDefaultProps, SwitchResponsiveProps>;
