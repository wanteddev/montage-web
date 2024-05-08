'use client';
import { forwardRef, useId } from 'react';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';

import { buttonStyle } from './style';

import type {
  DefaultComponentProps,
  OverrideProps,
  PolymorphicProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { ButtonProps, ButtonVariant } from './types';

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
      size = 'medium',
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicProps<ButtonProps<T>, E>,
    ref: ForwardedRef<ElementRef<E>>,
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
) as PolymorphicButtonComponent;

Button.displayName = 'Button';

interface PolymorphicButtonComponent {
  <C extends ElementType, V extends ButtonVariant = 'solid'>(
    props: {
      as: C;
    } & OverrideProps<ButtonProps<V>, C>,
  ): JSX.Element;
  <V extends ButtonVariant = 'solid'>(
    props: DefaultComponentProps<ButtonProps<V>, 'button'>,
  ): JSX.Element;
  propTypes?: any;
  displayName?: string | undefined;
}

export default Button;
