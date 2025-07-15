import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type SwitchDefaultProps = WithSxProps<{
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: 'small' | 'medium';
  onCheckedChange?: (state: boolean) => void;
}>;

export type SwitchResponsiveProps = ResponsiveProps<
  Pick<SwitchDefaultProps, 'size'>
>;

export type SwitchProps = Merge<SwitchDefaultProps, SwitchResponsiveProps>;
