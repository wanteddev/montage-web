import { forwardRef, useId, useMemo } from 'react';
import { Box } from '@montage-ui/engine';

import { WithInteraction } from '../with-interaction';

import { chipStyle } from './style';
import { useChipContext } from './contexts';

import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
  ThemeColorsToken,
} from '@montage-ui/engine';
import type { ElementType, ForwardedRef } from 'react';
import type { ChipProps } from './types';

const Chip = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      variant = 'solid',
      disabled = false,
      disableInteraction = false,
      iconOnly,
      leadingContent,
      trailingContent,
      size = 'medium',
      active: givenActive,
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicPropsInternal<ChipProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const context = useChipContext();
    const id = useId();

    const active = givenActive ?? props['aria-pressed'];

    const interactionColor: ThemeColorsToken = useMemo(() => {
      if (!active) {
        return 'semantic.foreground.neutral.primary';
      }

      if (variant === 'outlined') {
        return 'semantic.foreground.brand.primary';
      }

      return 'semantic.foreground.neutral.inverse';
    }, [active, variant]);

    const interactionVariant = useMemo(() => {
      if (!active) {
        return 'light';
      }

      if (variant === 'outlined') {
        return 'normal';
      }

      return 'strong';
    }, [active, variant]);

    const overrideColor = useMemo(() => {
      return context?.[variant];
    }, [context, variant]);

    return (
      <WithInteraction
        color={interactionColor}
        variant={interactionVariant}
        disabled={disableInteraction || disabled}
      >
        <Box
          as={as || 'button'}
          aria-labelledby={iconOnly ? undefined : id}
          role="button"
          type="button"
          ref={ref}
          disabled={disabled}
          data-component="chip"
          aria-disabled={disabled}
          data-active={active}
          aria-pressed={active}
          {...props}
          sx={[
            chipStyle({
              iconOnly,
              overrideColor,
              active,
              variant,
              size,
              xs,
              sm,
              md,
              lg,
              xl,
            }),
            props.sx,
          ]}
        >
          {iconOnly ? (
            children
          ) : (
            <>
              {Boolean(leadingContent) && leadingContent}
              <span id={id}>{children}</span>
              {Boolean(trailingContent) && trailingContent}
            </>
          )}
        </Box>
      </WithInteraction>
    );
  },
) as PolymorphicComponentInternal<ChipProps, 'button'>;

Chip.displayName = 'Chip';

export { Chip };

export type { ChipProps };
