import { forwardRef } from 'react';
import {
  Box,
  type DefaultComponentPropsInternal,
  type PolymorphicComponentInternal,
  type PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';

import { FlexBox } from '../flex-box';
import { Typography } from '../typography';
import { IconButton } from '../icon-button';
import { TextButton } from '../text-button';
import { TextButtonProvider } from '../text-button/contexts';

import {
  topNavigationButtonTextStyle,
  topNavigationFloatingBackgroundStyle,
  topNavigationLeftIconStyle,
  topNavigationRightIconStyle,
  topNavigationStyle,
  topNavigationTitleStyle,
  topNavigationWrapperStyle,
} from './style';
import { TOP_NAVIGATION_ACTION_NAME, TOP_NAVIGATION_NAME } from './constants';

import type { ElementType, ForwardedRef } from 'react';
import type { TopNavigationButtonProps, TopNavigationProps } from './types';

const TopNavigation = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<TopNavigationProps, 'div'>
>(
  (
    {
      variant = 'normal',
      leadingContent,
      trailingContent,
      toolbar,
      background = true,
      titleId,
      xs,
      sm,
      md,
      lg,
      xl,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <FlexBox
        wds-component="top-navigation"
        ref={ref}
        flexDirection="column"
        data-background={background}
        {...props}
        data-variant={variant}
        sx={[
          topNavigationStyle({
            background,
            variant,
            xs,
            sm,
            md,
            lg,
            xl,
          }),
          props.sx,
        ]}
      >
        {background && variant === 'floating' && (
          <FlexBox
            aria-hidden
            data-role="top-navigation-floating-background"
            sx={topNavigationFloatingBackgroundStyle}
          >
            <Box
              aria-hidden
              data-role="top-navigation-floating-background-layer"
            />
            <Box
              aria-hidden
              data-role="top-navigation-floating-background-layer"
            />
            <Box
              aria-hidden
              data-role="top-navigation-floating-background-layer"
            />
            <Box
              aria-hidden
              data-role="top-navigation-floating-background-layer"
            />
            <Box
              aria-hidden
              data-role="top-navigation-floating-background-layer"
            />
            <Box
              aria-hidden
              data-role="top-navigation-floating-background-layer"
            />
          </FlexBox>
        )}
        <FlexBox
          data-role="top-navigation-wrapper"
          sx={topNavigationWrapperStyle(variant)}
        >
          {Boolean(leadingContent) && variant !== 'display' && (
            <FlexBox
              gap="16px"
              alignItems="center"
              sx={topNavigationLeftIconStyle(variant)}
              data-role="top-navigation-leading-content-wrapper"
            >
              {leadingContent}
            </FlexBox>
          )}

          {Boolean(children) &&
            (variant === 'search' ? (
              <FlexBox
                data-role="navigation-field"
                sx={topNavigationTitleStyle(variant)}
                id={titleId}
              >
                {children}
              </FlexBox>
            ) : (
              <FlexBox
                alignItems="center"
                sx={topNavigationTitleStyle(variant)}
                data-role="navigation-title"
              >
                <Typography
                  as="h2"
                  id={titleId}
                  variant="headline2"
                  weight="bold"
                  color="semantic.label.strong"
                  display="block"
                  sx={{ margin: 0, border: 'none' }}
                >
                  {children}
                </Typography>
              </FlexBox>
            ))}

          {Boolean(trailingContent) && (
            <FlexBox
              gap="16px"
              alignItems="center"
              sx={topNavigationRightIconStyle(variant)}
              data-role="top-navigation-trailing-content-wrapper"
            >
              {trailingContent}
            </FlexBox>
          )}
        </FlexBox>

        {toolbar && variant !== 'floating' && (
          <FlexBox
            sx={{ width: '100%' }}
            flexDirection="column"
            data-role="top-navigation-toolbar"
          >
            {toolbar}
          </FlexBox>
        )}
      </FlexBox>
    );
  },
);

TopNavigation.displayName = TOP_NAVIGATION_NAME;

const TopNavigationButton = forwardRef(
  <T extends ElementType = 'button'>(
    {
      children,
      variant = 'icon',
      color = 'assistive',
      ...props
    }: PolymorphicPropsInternal<TopNavigationButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    if (variant === 'icon') {
      return (
        <IconButton
          variant="normal"
          size={24}
          {...props}
          wds-component="top-navigation-button"
          ref={ref}
        >
          {children}
        </IconButton>
      );
    }

    return (
      <TextButtonProvider assistive="semantic.label.normal">
        <TextButton
          color={color}
          size="medium"
          {...props}
          sx={[topNavigationButtonTextStyle, props.sx]}
          wds-component="top-navigation-button"
          ref={ref}
        >
          {children}
        </TextButton>
      </TextButtonProvider>
    );
  },
) as PolymorphicComponentInternal<TopNavigationButtonProps, 'button'>;

TopNavigationButton.displayName = TOP_NAVIGATION_ACTION_NAME;

export { TopNavigation, TopNavigationButton };

export type { TopNavigationProps, TopNavigationButtonProps };
