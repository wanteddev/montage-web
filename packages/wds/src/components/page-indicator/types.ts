import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

type PageIndicatorDefaultProps = {
  size?: 'small' | 'normal';
  variant?: 'dot' | 'counter';
  totalPage?: number;
  currentPage?: number;
  /**
   * variant='dot' only
   */
  maxDotCount?: number;
  /**
   * variant='dot' only
   */
  color?: 'normal' | 'white';
  /**
   * variant='dot' only
   */
  onClickDot?: (page: number) => void;
};

type PageIndicatorResponsiveProps = ResponsiveProps<
  Pick<PageIndicatorDefaultProps, 'size'>
>;

export type PageIndicatorProps = Merge<
  PageIndicatorDefaultProps,
  PageIndicatorResponsiveProps
>;
