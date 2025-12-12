import type { Merge } from '@wanteddev/wds-engine';
import type { TypographyProps } from '../typography/types';

export type LabelProps = Merge<
  {
    /**
     * If true, displays an asterisk (*) to indicate the field is required.
     */
    required?: boolean;
  },
  TypographyProps
>;
