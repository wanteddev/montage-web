import type { CSSProperties, ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type FlexBoxDefaultProps = WithSxProps<{
  flexDirection?: CSSProperties['flexDirection'];
  flexWrap?: CSSProperties['flexWrap'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  alignContent?: CSSProperties['alignContent'];
  order?: CSSProperties['order'];
  flex?: CSSProperties['flex'];
  flexGrow?: CSSProperties['flexGrow'];
  flexShrink?: CSSProperties['flexShrink'];
  flexBasis?: CSSProperties['flexBasis'];
  alignSelf?: CSSProperties['alignSelf'];
  gap?: CSSProperties['gap'];
  rowGap?: CSSProperties['rowGap'];
  columnGap?: CSSProperties['columnGap'];
  children?: ReactNode;
}>;

type FlexBoxResponsiveProps = ResponsiveProps<
  Omit<FlexBoxDefaultProps, 'children' | 'sx'>
>;

export type FlexBoxProps = Merge<FlexBoxDefaultProps, FlexBoxResponsiveProps>;
