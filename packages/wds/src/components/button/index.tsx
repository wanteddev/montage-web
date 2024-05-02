'use client';
import { forwardRef, useId } from 'react';
import {
  Box,
  type MergeWithCustomElementProps,
  type ThemeColorsToken,
} from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';

import { buttonStyle } from './style';

import type { ElementType, ForwardedRef } from 'react';
import type { ButtonProps, ButtonVariant } from './types';

type Props<
  E extends ElementType,
  T extends ButtonVariant,
> = MergeWithCustomElementProps<E, ButtonProps<T>>;

const Button = forwardRef(
  <E extends ElementType = 'button', T extends ButtonVariant = 'solid'>(
    {
      as,
      variant: originVariant,
      disabled = false,
      disableInteraction = false,
      fullWidth = false,
      color = 'primary',
      leftIcon,
      rightIcon,
      className,
      size = 'medium',
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: Props<E, T>,
    ref: ForwardedRef<Props<E, T>['as']>,
  ) => {
    const id = useId();

    const variant = originVariant || 'solid';

    const interactionColor: ThemeColorsToken =
      color === 'primary' && variant === 'outlined'
        ? 'palette.primary.normal'
        : 'palette.label.normal';

    const getInteractionVariant = () => {
      if (variant === 'outlined') {
        if (color === 'primary') {
          return 'normal';
        }

        return 'light';
      }

      return 'strong';
    };

    return (
      <WithInteraction
        color={interactionColor}
        variant={getInteractionVariant()}
        disabled={disableInteraction || disabled}
      >
        <Box
          as={(as || 'button') as ElementType}
          aria-labelledby={id}
          ref={ref}
          className={className}
          disabled={disabled}
          aria-disabled={disabled ? 'true' : undefined}
          {...props}
          sx={[
            buttonStyle({
              variant,
              size,
              fullWidth,
              color,
              xs,
              sm,
              md,
              lg,
              xl,
            }),
            props.sx,
          ]}
        >
          {Boolean(leftIcon) && leftIcon}
          <span id={id}>{children}</span>
          {Boolean(rightIcon) && rightIcon}
        </Box>
      </WithInteraction>
    );
  },
);

Button.displayName = 'Button';

export default Button as <
  E extends ElementType = 'button',
  T extends ButtonVariant = 'solid',
>(
  props: Props<E, T>,
) => JSX.Element;
