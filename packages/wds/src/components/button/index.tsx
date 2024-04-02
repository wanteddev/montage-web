'use client';
import { forwardRef, useId } from 'react';

import WithInteraction from '../with-interaction';

import { buttonStyle } from './style';

import type { MergeWithCustomElementProps, ThemeColorsToken } from '@/types';
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
    const Comp = as || 'button';
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
        <Comp
          aria-labelledby={id}
          ref={ref}
          className={className}
          css={buttonStyle({
            variant,
            size,
            fullWidth,
            color,
            xs,
            sm,
            md,
            lg,
            xl,
          })}
          disabled={disabled}
          aria-disabled={disabled ? 'true' : undefined}
          {...props}
        >
          {Boolean(leftIcon) && leftIcon}
          <span id={id}>{children}</span>
          {Boolean(rightIcon) && rightIcon}
        </Comp>
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
