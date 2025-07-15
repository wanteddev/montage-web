import type { FlexBoxProps } from '../flex-box/types';
import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type SectionHeaderDefaultProps = WithSxProps<{
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  platform?: 'desktop' | 'mobile';
  headingContent?: ReactNode;
  trailingContent?: ReactNode;
  color?: ThemeColorsToken;
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: ReactNode;
}>;

export type SectionHeaderResponsiveProps = ResponsiveProps<
  Pick<SectionHeaderDefaultProps, 'size' | 'platform'>
>;

export type SectionHeaderProps = Merge<
  SectionHeaderDefaultProps,
  SectionHeaderResponsiveProps
>;

export type SectionHeaderNavigationProps = FlexBoxProps;

export type SectionHeaderNavigationButtonProps = WithSxProps<{
  disabled?: boolean;
  disableInteraction?: boolean;
  children?: ReactNode;
}>;
