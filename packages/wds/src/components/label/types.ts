import type { Merge, ResponsiveProps } from '@/types';

type LabelDefaultProps = {
  type?: 'toggle' | 'checkbox';
};

type LabelResponsiveProps = ResponsiveProps<{}>;

export type LabelProps = Merge<LabelDefaultProps, LabelResponsiveProps>;
