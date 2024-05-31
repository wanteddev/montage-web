'use client';
import { forwardRef, useEffect, useId, useState } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useTheme } from '@wanteddev/wds-engine';

import Typography from '../typography';
import FlexBox from '../flex-box';

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
  DefaultComponentProps,
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type {
  CSSProperties,
  ElementRef,
  ElementType,
  ForwardedRef,
} from 'react';
import type { BottomNavigationItemProps, BottomNavigationProps } from './types';

const BottomNavigation = forwardRef(
  (
    {
      defaultValue,
      value: valueProp,
      onValueChange,
      children,
      ...props
    }: DefaultComponentProps<BottomNavigationProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const theme = useTheme();

    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    const [scrollEnd, setScrollEnd] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setScrollEnd(
          document.body.clientHeight - window.innerHeight === window.scrollY,
        );
      };

      handleScroll();
      window.addEventListener('resize', handleScroll);
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('resize', handleScroll);
        window.addEventListener('scroll', handleScroll);
      };
    }, []);

    return (
      <BottomNavigationProvider value={value} onValueChange={setValue}>
        <FlexBox
          ref={ref}
          alignItems="center"
          {...props}
          wds-component="bottom-navigation"
          sx={[bottomNavigationStyle, props.sx]}
          style={
            {
              '--wds-bottom-navigation-border-color': scrollEnd
                ? 'transparent'
                : theme.palette.line.normal.neutral,
              ...props.style,
            } as CSSProperties
          }
        >
          {children}
        </FlexBox>
      </BottomNavigationProvider>
    );
  },
);

BottomNavigation.displayName = BOTTOM_NAVIGATION_NAME;

const BottomNavigationItem = forwardRef(
  <T extends ElementType = 'button'>(
    {
      label,
      value,
      icon,
      as,
      ...props
    }: PolymorphicProps<BottomNavigationItemProps, T>,
    ref: ForwardedRef<ElementRef<T>>,
  ) => {
    const id = useId();
    const context = useBottomNavigationContext(BOTTOM_NAVIGATION_ITEM_NAME);

    const isActive = context.value === value;

    return (
      <FlexBox
        as={(as || 'button') as T}
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
        })}
      >
        {icon}
        {Boolean(label) && (
          <Typography variant="caption2" weight="medium" id={id}>
            {label}
          </Typography>
        )}
      </FlexBox>
    );
  },
) as PolymorphicComponent<BottomNavigationItemProps, 'button'>;

BottomNavigationItem.displayName = BOTTOM_NAVIGATION_ITEM_NAME;

export { BottomNavigation, BottomNavigationItem };
