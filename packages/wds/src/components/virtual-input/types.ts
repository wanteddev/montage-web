import type { WithSxProps } from '@wanteddev/wds-engine';

export type VirtualCheckboxInputProps = WithSxProps<{
  checked?: boolean;
  bubbles?: boolean;
}>;

export type VirtualValueInputProps = WithSxProps<{
  value?: string | number;
  bubbles?: boolean;
}>;
