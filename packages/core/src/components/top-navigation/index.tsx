import { forwardRef } from 'react';
import {
  Box,
  type DefaultComponentPropsInternal,
  type PolymorphicComponentInternal,
  type PolymorphicPropsInternal,
} from '@montage-ui/engine';
import { IconChevronLeft } from '@montage-ui/icon';

import { FlexBox } from '../flex-box';
import { Typography } from '../typography';
import { IconButton } from '../icon-button';
import { TextButton } from '../text-button';
import { TextButtonProvider } from '../text-button/contexts';
import { SlotDefaultsProvider } from '../../hooks/internal/use-slot-defaults';

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
        data-component="top-navigation"
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
              <SlotDefaultsProvider
                value={{
                  SearchField: {
                    size: 'medium',
                  },
                }}
              >
                <FlexBox
                  data-role="navigation-field"
                  sx={topNavigationTitleStyle(variant)}
                  id={titleId}
                >
                  {children}
                </FlexBox>
              </SlotDefaultsProvider>
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
                  color="semantic.foreground.neutral.strong"
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
      variant = 'icon-button',
      color = 'assistive',
      size,
      ...props
    }: PolymorphicPropsInternal<TopNavigationButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    switch (variant) {
      case 'icon-button':
      case 'back-button':
        return (
          <IconButton
            variant="normal"
            interactionEffect="dim"
            size={size ?? 'xlarge'}
            interactionOverflow
            aria-label={variant === 'back-button' ? 'Go back' : undefined}
            {...props}
            data-component="top-navigation-button"
            ref={ref}
          >
            {children ?? (variant === 'back-button' && <IconChevronLeft />)}
          </IconButton>
        );

      case 'text-button':
      default:
        return (
          <TextButtonProvider assistive="semantic.foreground.neutral.primary">
            <TextButton
              color={color}
              {...props}
              size={size === 'small' ? 'small' : 'medium'}
              sx={[topNavigationButtonTextStyle, props.sx]}
              data-component="top-navigation-button"
              ref={ref}
            >
              {children}
            </TextButton>
          </TextButtonProvider>
        );
    }
  },
) as PolymorphicComponentInternal<TopNavigationButtonProps, 'button'>;

TopNavigationButton.displayName = TOP_NAVIGATION_ACTION_NAME;

export { TopNavigation, TopNavigationButton };

export type { TopNavigationProps, TopNavigationButtonProps };
