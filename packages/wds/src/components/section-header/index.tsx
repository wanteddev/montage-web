import { forwardRef } from 'react';
import { Box, type DefaultComponentPropsInternal } from '@wanteddev/wds-engine';

import { FlexBox } from '../flex-box';
import { WithInteraction } from '../with-interaction';

import {
  sectionHeaderNavigationButtonStyle,
  sectionHeaderNavigationStyle,
  sectionHeaderStyle,
} from './style';

import type { ElementType, ForwardedRef } from 'react';
import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type {
  SectionHeaderNavigationButtonProps,
  SectionHeaderNavigationProps,
  SectionHeaderProps,
} from './types';

const SectionHeader = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<SectionHeaderProps, 'div'>
>(
  (
    {
      size = 'medium',
      platform = 'desktop',
      headingContent,
      trailingContent,
      color,
      headingTag = 'h2',
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    return (
      <FlexBox
        ref={ref}
        {...props}
        gap="12px"
        sx={[
          sectionHeaderStyle({ size, platform, color, xs, sm, md, lg, xl }),
          props.sx,
        ]}
      >
        <FlexBox
          data-role="section-header-content"
          gap="12px"
          flex="1 0 0"
          alignItems="flex-end"
        >
          <Box as={headingTag} data-role="section-header-content-heading">
            {children}
          </Box>

          {Boolean(headingContent) && (
            <FlexBox
              data-role="section-header-heading-content"
              gap="10px"
              alignItems="center"
            >
              {headingContent}
            </FlexBox>
          )}
        </FlexBox>

        {Boolean(trailingContent) && (
          <FlexBox
            data-role="section-header-trailing-content"
            gap="20px"
            alignItems="center"
            alignSelf="end"
          >
            {trailingContent}
          </FlexBox>
        )}
      </FlexBox>
    );
  },
);

SectionHeader.displayName = 'SectionHeader';

const SectionHeaderNavigation = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<SectionHeaderNavigationProps, 'div'>
>((props, ref) => {
  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      ref={ref}
      {...props}
      sx={[sectionHeaderNavigationStyle, props.sx]}
    />
  );
});

SectionHeaderNavigation.displayName = 'SectionHeaderNavigation';

const SectionHeaderNavigationButton = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      disabled,
      disableInteraction,
      children,
      ...props
    }: PolymorphicPropsInternal<SectionHeaderNavigationButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <WithInteraction disabled={disabled || disableInteraction}>
        <Box
          as={as ?? 'button'}
          disabled={disabled}
          aria-disabled={disabled}
          ref={ref}
          {...props}
          sx={[sectionHeaderNavigationButtonStyle, props.sx]}
        >
          {children}
        </Box>
      </WithInteraction>
    );
  },
) as PolymorphicComponentInternal<SectionHeaderNavigationButtonProps, 'button'>;

export {
  SectionHeader,
  SectionHeaderNavigation,
  SectionHeaderNavigationButton,
};

export type {
  SectionHeaderProps,
  SectionHeaderNavigationProps,
  SectionHeaderNavigationButtonProps,
};
