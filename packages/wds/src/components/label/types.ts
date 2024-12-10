import type { Merge } from '@wanteddev/wds-engine';
import type { TypographyProps } from '../typography/types';

export type LabelProps = Merge<
  {
    required?: boolean;
  },
  TypographyProps
>;
