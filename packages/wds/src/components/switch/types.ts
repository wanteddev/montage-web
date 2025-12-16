import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type SwitchDefaultProps = WithSxProps<{
  name?: string;
  /** Whether the switch is checked. */
  checked?: boolean;
  /** Whether the switch is checked by default. */
  defaultChecked?: boolean;
  /** Whether the switch is disabled. */
  disabled?: boolean;
  /** Whether the switch is required. */
  required?: boolean;
  /** The size of the switch. */
  size?: 'small' | 'medium';
  /** Callback function when the checked state changes. */
  onCheckedChange?: (state: boolean) => void;
}>;

export type SwitchResponsiveProps = ResponsiveProps<
  Pick<SwitchDefaultProps, 'size'>
>;

export type SwitchProps = Merge<SwitchDefaultProps, SwitchResponsiveProps>;
