import { forwardRef, useId } from 'react';

import { FlexBox } from '../flex-box';
import { Typography } from '../typography';
import { IconButton } from '../icon-button';
import { TextButton } from '../text-button';

import {
  topNavigationButtonFloat,
  topNavigationButtonTextStyle,
  topNavigationLeftIconStyle,
  topNavigationRightIconStyle,
  topNavigationStyle,
  topNavigationTitleStyle,
  topNavigationWrapperStyle,
} from './style';
import { TopNavigationProvider, useTopNavigationContext } from './contexts';
import { TOP_NAVIGATION_ACTION_NAME, TOP_NAVIGATION_NAME } from './constants';

import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
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
      scrolled,
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
    const leadingContentRender = () =>
      Boolean(leadingContent) ? (
        <FlexBox
          gap="16px"
          alignItems="center"
          sx={topNavigationLeftIconStyle(variant)}
        >
          {leadingContent}
        </FlexBox>
      ) : null;

    const trailingContentRender = () =>
      Boolean(trailingContent) && (
        <FlexBox
          gap="16px"
          alignItems="center"
          sx={topNavigationRightIconStyle(variant)}
        >
          {trailingContent}
        </FlexBox>
      );

    if (
      process.env.NODE_ENV !== 'production' &&
      variant === 'floating' &&
      Boolean(toolbar)
    ) {
      console.error('toolbar is not supported in floating variant');
    }

    return (
      <TopNavigationProvider variant={variant}>
        <FlexBox
          wds-component="top-navigation"
          ref={ref}
          flexDirection="column"
          data-is-scrolled={scrolled && variant !== 'floating'}
          {...props}
          sx={[
            topNavigationStyle({
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
          <FlexBox sx={topNavigationWrapperStyle(variant)}>
            {variant === 'extended' ? (
              <FlexBox sx={{ width: '100%' }}>
                {leadingContentRender()}
                {trailingContentRender()}
              </FlexBox>
            ) : (
              leadingContentRender()
            )}

            {Boolean(children) && (
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
            )}

            {variant !== 'extended' && trailingContentRender()}
          </FlexBox>

          {toolbar && variant !== 'floating' && (
            <FlexBox sx={{ width: '100%' }} data-role="top-navigation-toolbar">
              {toolbar}
            </FlexBox>
          )}
        </FlexBox>
      </TopNavigationProvider>
    );
  },
);

TopNavigation.displayName = TOP_NAVIGATION_NAME;

const TopNavigationButton = forwardRef(
  <T extends ElementType = 'button'>(
    {
      children,
      variant = 'icon',
      alternative,
      background = false,
      ...props
    }: PolymorphicPropsInternal<TopNavigationButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const id = useId();
    const { variant: navigationVariant } = useTopNavigationContext() || {};

    if (process.env.NODE_ENV !== 'production' && !navigationVariant) {
      throw new Error(
        'TopNavigationButton 은 TopNavigation 내부에서만 사용 가능합니다.',
      );
    }

    if (variant === 'icon') {
      return (
        <IconButton
          variant={
            navigationVariant === 'floating' && background
              ? 'background'
              : 'normal'
          }
          size={24}
          alternative={alternative}
          {...props}
          wds-component="top-navigation-button"
          ref={ref}
        >
          {children}
        </IconButton>
      );
    }

    if (navigationVariant === 'floating' && background) {
      return (
        <IconButton
          variant="background"
          size={24}
          alternative={alternative}
          aria-labelledby={id}
          {...props}
          sx={[topNavigationButtonFloat({ alternative, background }), props.sx]}
          wds-component="top-navigation-button"
          ref={ref}
        >
          <Typography as="p" variant="body2" weight="medium" id={id}>
            {children}
          </Typography>
        </IconButton>
      );
    }

    return (
      <TextButton
        color="assistive"
        size="medium"
        {...props}
        sx={[topNavigationButtonTextStyle, props.sx]}
        wds-component="top-navigation-button"
        ref={ref}
      >
        {children}
      </TextButton>
    );
  },
) as PolymorphicComponentInternal<TopNavigationButtonProps, 'button'>;

TopNavigationButton.displayName = TOP_NAVIGATION_ACTION_NAME;

export { TopNavigation, TopNavigationButton };

export type { TopNavigationProps, TopNavigationButtonProps };
