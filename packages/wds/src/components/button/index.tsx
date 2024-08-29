'use client';
import { forwardRef, useId } from 'react';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';

import { buttonStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { ButtonProps } from './types';

const Button = forwardRef(
  <E extends ElementType = 'button'>(
    {
      as,
      variant: originVariant,
      disabled = false,
      disableInteraction = false,
      fullWidth = false,
      color = 'primary',
      iconOnly,
      leftContent,
      rightContent,
      size = 'medium',
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicProps<ButtonProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const id = useId();

    const variant = originVariant || 'solid';

    const interactionColor: ThemeColorsToken =
      color === 'primary' && variant === 'outlined'
        ? 'palette.primary.normal'
        : 'palette.label.normal';

    const getInteractionVariant = () => {
      switch (variant) {
        case 'outlined':
          return color === 'primary' ? 'normal' : 'light';
        case 'solid':
          return color === 'primary' ? 'strong' : 'normal';
      }
    };

    return (
      <WithInteraction
        color={interactionColor}
        variant={getInteractionVariant()}
        disabled={disableInteraction || disabled}
      >
        <Box
          as={(as || 'button') as ElementType}
          aria-labelledby={iconOnly ? undefined : id}
          ref={ref}
          disabled={disabled}
          aria-disabled={disabled}
          data-size={size}
          type="button"
          {...props}
          sx={[
            buttonStyle({
              variant,
              iconOnly,
              size,
              fullWidth,
              color,
              xs,
              sm,
              md,
              lg,
              xl,
            } as ButtonProps),
            props.sx,
          ]}
        >
          {iconOnly ? (
            children
          ) : (
            <>
              {Boolean(leftContent) && leftContent}
              <span id={id}>{children}</span>
              {Boolean(rightContent) && rightContent}
            </>
          )}
        </Box>
      </WithInteraction>
    );
  },
) as PolymorphicComponent<ButtonProps, 'button'>;

Button.displayName = 'Button';

export default Button;
