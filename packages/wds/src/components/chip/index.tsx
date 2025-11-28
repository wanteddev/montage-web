import { forwardRef, useId, useMemo } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { WithInteraction } from '../with-interaction';

import { chipStyle } from './style';
import { useChipContext } from './contexts';

import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { ChipProps } from './types';

const Chip = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      variant = 'solid',
      disabled = false,
      disableInteraction = false,
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
        return 'semantic.label.normal';
      }

      if (variant === 'outlined') {
        return 'semantic.primary.normal';
      }

      return 'semantic.inverse.label';
    }, [active, variant]);

    const overrideColor = useMemo(() => {
      return context?.[variant];
    }, [context, variant]);

    return (
      <WithInteraction
        color={interactionColor}
        variant={active ? 'normal' : 'light'}
        disabled={disableInteraction || disabled}
      >
        <Box
          as={as || 'button'}
          aria-labelledby={id}
          role="button"
          type="button"
          ref={ref}
          disabled={disabled}
          aria-disabled={disabled}
          data-active={active}
          aria-pressed={active}
          {...props}
          sx={[
            chipStyle({
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
          {Boolean(leadingContent) && leadingContent}
          <span id={id}>{children}</span>
          {Boolean(trailingContent) && trailingContent}
        </Box>
      </WithInteraction>
    );
  },
) as PolymorphicComponentInternal<ChipProps, 'button'>;

Chip.displayName = 'Chip';

export { Chip };

export type { ChipProps };
