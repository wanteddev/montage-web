import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

export type RadioDefaultProps = {
  name?: string;
  checked?: boolean;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  size?: 'medium' | 'small';
  onCheck?: () => void;
  tight?: boolean;
};

export type RadioResponsiveProps = ResponsiveProps<
  Pick<RadioDefaultProps, 'size'>
>;

export type RadioProps = Merge<RadioDefaultProps, RadioResponsiveProps>;
