import { forwardRef, useMemo } from 'react';
import { Box, useTheme } from '@montage-ui/engine';

import { WithInteraction } from '../with-interaction';
import { useSlotDefaults } from '../../hooks/internal/use-slot-defaults';
import { resolveInheritedResponsive } from '../../utils/internal/responsive-props';

import { backgroundBlendStyle, iconButtonStyle } from './style';
import { maxDimensionToken } from './helpers';

import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@montage-ui/engine';
import type { ElementType, ForwardedRef } from 'react';
import type { IconButtonProps } from './types';

const IconButton = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      disabled = false,
      size: originSize,
      variant = 'normal',
      interactionEffect: originInteractionEffect,
      interactionColor = 'semantic.foreground.neutral.primary',
      alternative,
      interactionOverflow: originInteractionOverflow,
      color: originColor,
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicPropsInternal<IconButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const theme = useTheme();

    const inherited = useSlotDefaults().IconButton?.[variant];

    // Sizes declared on the icon button win; otherwise the slot's
    // base / per-breakpoint sizes (for this variant) are applied.
    const { base: size, responsive } = resolveInheritedResponsive(
      { base: originSize, responsive: { xs, sm, md, lg, xl } },
      inherited && { base: inherited.size, responsive: inherited.responsive },
      'size',
    );

    const interactionOverflow =
      originInteractionOverflow ?? inherited?.interactionOverflow ?? false;
    const inheritedColor = inherited?.color;
    const inheritedInteractionEffect = inherited?.interactionEffect;

    // A numeric box size is capped at the largest dimension token. Under
    // interactionOverflow the normal variant's size is the icon, which is not capped.
    if (
      process.env.NODE_ENV !== 'production' &&
      !(interactionOverflow && variant === 'normal')
    ) {
      const maxSize = maxDimensionToken(theme);
      [
        size,
        responsive.xs?.size,
        responsive.sm?.size,
        responsive.md?.size,
        responsive.lg?.size,
        responsive.xl?.size,
      ].forEach((s) => {
        if (typeof s === 'number' && s > maxSize) {
          console.warn(
            `IconButton: size={${s}} exceeds the largest dimension token and is clamped to ${maxSize}px.`,
          );
        }
      });
    }

    const color = useMemo(() => {
      if (originColor) {
        return originColor;
      }

      if (inheritedColor) {
        return inheritedColor;
      }

      switch (variant) {
        case 'solid':
          return 'semantic.static.white';
        case 'background':
          return undefined;
        case 'normal':
          return 'semantic.foreground.neutral.primary';
        default:
          return 'semantic.foreground.neutral.primary';
      }
    }, [inheritedColor, originColor, variant]);

    const interactionEffect = useMemo(() => {
      if (originInteractionEffect) {
        return originInteractionEffect;
      }

      if (inheritedInteractionEffect) {
        return inheritedInteractionEffect;
      }

      return 'normal';
    }, [inheritedInteractionEffect, originInteractionEffect]);

    const getInteractionSize = () => {
      switch (variant) {
        case 'normal':
        case 'outlined':
        case 'solid':
        case 'background':
          return '100%';
      }
    };

    const getInteractionVariant = () => {
      switch (variant) {
        case 'normal':
        case 'outlined':
          return 'light';
        case 'background':
          return alternative ? 'normal' : 'light';
        case 'solid':
          return 'strong';
      }
    };

    const interactionSize = getInteractionSize();

    return (
      <WithInteraction
        width="auto"
        height={interactionSize}
        color={interactionColor}
        disabled={interactionEffect === 'none' || disabled}
        variant={getInteractionVariant()}
        scale={variant === 'normal'}
      >
        <Box
          as={(as || 'button') as ElementType}
          ref={ref}
          data-component="icon-button"
          data-variant={variant}
          disabled={disabled}
          type="button"
          aria-disabled={disabled}
          {...props}
          sx={[
            iconButtonStyle({
              variant,
              size,
              alternative,
              interactionOverflow,
              interactionEffect,
              interactionColor,
              color,
              ...responsive,
            }),
            props.sx,
          ]}
        >
          {variant === 'background' && !alternative && (
            <Box
              as="span"
              role="presentation"
              data-role="icon-button-background-blend"
              sx={backgroundBlendStyle}
            />
          )}

          {children}
        </Box>
      </WithInteraction>
    );
  },
) as PolymorphicComponentInternal<IconButtonProps, 'button'>;

IconButton.displayName = 'IconButton';

export { IconButton };

export type { IconButtonProps };
