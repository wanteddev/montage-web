import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type RadioDefaultProps = WithSxProps<{
  /** The name of the radio. */
  name?: string;
  /** Whether the radio is checked. */
  checked?: boolean;
  value?: string;
  /** Whether the radio is disabled. */
  disabled?: boolean;
  required?: boolean;
  /** Whether the radio is invalid. */
  invalid?: boolean;
  /** The size of the radio. */
  size?: 'medium' | 'small';
  /** Callback function when the radio is checked. */
  onCheck?: () => void;
  /** If you want to remove the left/right spacing to align items, use this prop. */
  tight?: boolean;
}>;

export type RadioResponsiveProps = ResponsiveProps<
  Pick<RadioDefaultProps, 'size'>
>;

export type RadioProps = Merge<RadioDefaultProps, RadioResponsiveProps>;
