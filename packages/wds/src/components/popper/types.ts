import type { MergeElementProps } from '@/types';

export type PopperContentProps = MergeElementProps<
  'div',
  {
    offset?: number;
    placement?:
      | '1'
      | '2'
      | '3'
      | '4'
      | '5'
      | '6'
      | '7'
      | '8'
      | '9'
      | '10'
      | '11'
      | '12';
    referenceHidden?: boolean;
  }
>;
