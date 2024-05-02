import type { CSSProperties } from 'react';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';

export type FlexBoxDefaultProps = {
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
};

type FlexBoxResponsiveProps = ResponsiveProps<FlexBoxDefaultProps>;

export type FlexBoxProps = Merge<FlexBoxDefaultProps, FlexBoxResponsiveProps>;
