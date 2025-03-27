'use client';
import { forwardRef, useId, useMemo } from 'react';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';

import { actionStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { ChipActionProps } from './types';

const ChipAction = forwardRef(
  <E extends ElementType = 'button'>(
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
    }: PolymorphicProps<ChipActionProps, E>,
    ref: ForwardedRef<E>,
  ) => {
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

    return (
      <WithInteraction
        color={interactionColor}
        variant={active ? 'normal' : 'light'}
        disabled={disableInteraction || disabled}
      >
        <Box
          as={(as || 'button') as E}
          aria-labelledby={id}
          role="button"
          type="button"
          ref={ref}
          disabled={disabled}
          aria-disabled={disabled}
          aria-pressed={active}
          tabIndex={0}
          {...props}
          sx={[actionStyle({ variant, size, xs, sm, md, lg, xl }), props.sx]}
        >
          {Boolean(leadingContent) && leadingContent}
          <span id={id}>{children}</span>
          {Boolean(trailingContent) && trailingContent}
        </Box>
      </WithInteraction>
    );
  },
) as PolymorphicComponent<ChipActionProps, 'button'>;

ChipAction.displayName = 'ChipAction';

export default ChipAction;
