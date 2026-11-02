import type { TypographyProps } from '../typography/types';
import type { Merge } from '@montage-ui/engine';

export type LabelProps = Merge<
  {
    /**
     * If true, displays an asterisk (*) to indicate the field is required.
     */
    required?: boolean;
  },
  TypographyProps
>;
