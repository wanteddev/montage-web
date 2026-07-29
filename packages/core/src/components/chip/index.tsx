import { forwardRef, useId } from 'react';
import { Box } from '@montage-ui/engine';

import { WithInteraction } from '../with-interaction';

import { chipStyle } from './style';

import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
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
    const id = useId();

    const active = givenActive ?? props['aria-pressed'];

    return (
      <WithInteraction
        color={
          active
            ? 'semantic.foreground.brand.primary'
            : 'semantic.foreground.neutral.primary'
        }
        variant={active ? 'normal' : 'light'}
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
