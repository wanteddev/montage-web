import { forwardRef, useEffect, useId, useState } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { composeEventHandlers } from '@radix-ui/primitive';

import { Typography } from '../typography';
import { FlexBox } from '../flex-box';
import { WithInteraction } from '../with-interaction';
import { hapticFeedback } from '../../utils/internal/haptic';

import {
  BottomNavigationProvider,
  useBottomNavigationContext,
} from './contexts';
import {
  BOTTOM_NAVIGATION_ITEM_NAME,
  BOTTOM_NAVIGATION_NAME,
} from './constants';
import { bottomNavigationItemStyle, bottomNavigationStyle } from './style';

import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { BottomNavigationItemProps, BottomNavigationProps } from './types';

const BottomNavigation = forwardRef(
  (
    {
      defaultValue,
      value: valueProp,
      onValueChange,
      children,
      ...props
    }: DefaultComponentPropsInternal<BottomNavigationProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? '',
      onChange: onValueChange,
    });

    const [scrollEnd, setScrollEnd] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setScrollEnd(
          document.body.clientHeight - window.innerHeight <= window.scrollY,
        );
      };

      handleScroll();
      window.addEventListener('resize', handleScroll);
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('gesturechange', handleScroll);

      return () => {
        window.removeEventListener('resize', handleScroll);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('gesturechange', handleScroll);
      };
    }, []);

    return (
      <BottomNavigationProvider value={value} onValueChange={setValue}>
        <FlexBox
          ref={ref}
          alignItems="center"
          {...props}
          wds-component="bottom-navigation"
          data-scroll-end={scrollEnd}
          sx={[bottomNavigationStyle, props.sx]}
        >
          {children}
        </FlexBox>
      </BottomNavigationProvider>
    );
  },
);

BottomNavigation.displayName = BOTTOM_NAVIGATION_NAME;

const BottomNavigationItem = forwardRef<any, BottomNavigationItemProps>(
  <T extends ElementType = 'button'>(
    {
      label,
      value,
      icon,
      as,
      ...props
    }: PolymorphicPropsInternal<BottomNavigationItemProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const id = useId();
    const context = useBottomNavigationContext(BOTTOM_NAVIGATION_ITEM_NAME);

    const isActive = context.value === value;

    return (
      <WithInteraction variant="light">
        <FlexBox
          as={as || 'button'}
          ref={ref}
          {...props}
          flex="1 1 0"
          gap="2px"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          wds-component="bottom-navigation-item"
          aria-current={isActive ? 'page' : undefined}
          aria-labelledby={id}
          sx={[bottomNavigationItemStyle, props.sx]}
          onClick={composeEventHandlers(props.onClick, () => {
            context.onValueChange(value);

            if (value !== context.value) {
              hapticFeedback();
            }
          })}
        >
          {icon}
          {Boolean(label) && (
            <Typography variant="caption2" weight="medium" id={id}>
              {label}
            </Typography>
          )}
        </FlexBox>
      </WithInteraction>
    );
  },
) as PolymorphicComponentInternal<BottomNavigationItemProps, 'button'>;

BottomNavigationItem.displayName = BOTTOM_NAVIGATION_ITEM_NAME;

export { BottomNavigation, BottomNavigationItem };

export type { BottomNavigationProps, BottomNavigationItemProps };
