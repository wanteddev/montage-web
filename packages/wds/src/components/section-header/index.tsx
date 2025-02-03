import { forwardRef } from 'react';
import { Box, type DefaultComponentProps } from '@wanteddev/wds-engine';

import FlexBox from '../flex-box';
import WithInteraction from '../with-interaction';

import {
  sectionHeaderNavigationButtonStyle,
  sectionHeaderNavigationStyle,
  sectionHeaderStyle,
} from './style';

import type { ElementType, ForwardedRef } from 'react';
import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type {
  SectionHeaderNavigationButtonProps,
  SectionHeaderNavigationProps,
  SectionHeaderProps,
} from './types';

const SectionHeader = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<SectionHeaderProps, 'div'>
>(
  (
    {
      size = 'medium',
      platform = 'desktop',
      leftContent,
      rightContent,
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
        gap="16px"
        sx={[
          sectionHeaderStyle({ size, platform, color, xs, sm, md, lg, xl }),
          props.sx,
        ]}
      >
        <FlexBox
          data-role="section-header-content"
          gap="10px"
          flex="1 0 0"
          alignItems="center"
        >
          <Box as={headingTag}>{children}</Box>

          {Boolean(leftContent) && (
            <FlexBox
              data-role="section-header-left-content"
              gap="10px"
              alignItems="center"
            >
              {leftContent}
            </FlexBox>
          )}
        </FlexBox>

        {Boolean(rightContent) && (
          <FlexBox
            data-role="section-header-right-content"
            gap="20px"
            alignItems="center"
            alignSelf="end"
          >
            {rightContent}
          </FlexBox>
        )}
      </FlexBox>
    );
  },
);

SectionHeader.displayName = 'SectionHeader';

const SectionHeaderNavigation = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<SectionHeaderNavigationProps, 'div'>
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
    }: PolymorphicProps<SectionHeaderNavigationButtonProps, T>,
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
) as PolymorphicComponent<SectionHeaderNavigationButtonProps, 'button'>;

export {
  SectionHeader,
  SectionHeaderNavigation,
  SectionHeaderNavigationButton,
};
