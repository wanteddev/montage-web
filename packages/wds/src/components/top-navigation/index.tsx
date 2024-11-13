import { forwardRef, useId } from 'react';
import { type DefaultComponentProps, useTheme } from '@wanteddev/wds-engine';

import FlexBox from '../flex-box';
import Typography from '../typography';
import IconButton from '../icon-button';
import TextButton from '../text-button';

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
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type {
  CSSProperties,
  ElementRef,
  ElementType,
  ForwardedRef,
} from 'react';
import type { TopNavigationButtonProps, TopNavigationProps } from './types';

const TopNavigation = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<TopNavigationProps, 'div'>
>(
  (
    {
      variant = 'normal',
      leftContent,
      rightContent,
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
    const theme = useTheme();

    const leftContentRender = () =>
      Boolean(leftContent) ? (
        <FlexBox
          gap="16px"
          alignItems="center"
          sx={topNavigationLeftIconStyle(variant)}
        >
          {leftContent}
        </FlexBox>
      ) : null;

    const rightContentRender = () =>
      Boolean(rightContent) && (
        <FlexBox
          gap="16px"
          alignItems="center"
          sx={topNavigationRightIconStyle(variant)}
        >
          {rightContent}
        </FlexBox>
      );

    return (
      <TopNavigationProvider variant={variant}>
        <FlexBox
          wds-component="top-navigation"
          ref={ref}
          flexDirection="column"
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
          style={
            {
              ['--wds-top-navigation-border-color']:
                scrolled && variant !== 'floating'
                  ? theme.palette.line.normal.normal
                  : 'transparent',
              ...props.style,
            } as CSSProperties
          }
        >
          <FlexBox sx={topNavigationWrapperStyle(variant)}>
            {variant !== 'floating' ? (
              <>
                {variant !== 'extended' && leftContentRender()}

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
                      color="palette.label.strong"
                      display="block"
                      sx={{ margin: 0, border: 'none' }}
                    >
                      {children}
                    </Typography>
                  </FlexBox>
                )}

                {variant !== 'extended' ? (
                  rightContentRender()
                ) : (
                  <FlexBox sx={{ width: '100%' }}>
                    {leftContentRender()}
                    {rightContentRender()}
                  </FlexBox>
                )}
              </>
            ) : (
              <>
                {Boolean(leftContent) && (
                  <FlexBox
                    gap="16px"
                    data-role="top-navigation-left-button"
                    sx={topNavigationLeftIconStyle(variant)}
                  >
                    {leftContent}
                  </FlexBox>
                )}
                {Boolean(rightContent) && (
                  <FlexBox
                    gap="16px"
                    data-role="top-navigation-right-button"
                    sx={topNavigationRightIconStyle(variant)}
                  >
                    {rightContent}
                  </FlexBox>
                )}
              </>
            )}
          </FlexBox>

          {toolbar && (
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
  <E extends ElementType = 'button'>(
    {
      children,
      variant = 'icon',
      alternative,
      background = false,
      ...props
    }: PolymorphicProps<TopNavigationButtonProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
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
          <Typography as="p" variant="body2_normal" weight="medium" id={id}>
            {children}
          </Typography>
        </IconButton>
      );
    }

    return (
      <TextButton
        variant="assistive"
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
) as PolymorphicComponent<TopNavigationButtonProps, 'button'>;

TopNavigationButton.displayName = TOP_NAVIGATION_ACTION_NAME;

export { TopNavigation, TopNavigationButton };
