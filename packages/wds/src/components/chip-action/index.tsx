'use client';
import { forwardRef, useId } from 'react';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';

import { actionStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { ChipActionProps } from './types';

const ChipAction = forwardRef(
  <E extends ElementType = 'button'>(
    {
      as,
      variant = 'filled',
      disabled = false,
      disableInteraction = false,
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
    }: PolymorphicProps<ChipActionProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const id = useId();

    const interactionColor: ThemeColorsToken = 'palette.label.normal';

    return (
      <WithInteraction
        color={interactionColor}
        disabled={disableInteraction || disabled}
      >
        <Box
          as={(as || 'button') as E}
          aria-labelledby={id}
          type="button"
          ref={ref}
          disabled={disabled}
          aria-disabled={disabled ? 'true' : undefined}
          {...props}
          sx={[actionStyle({ variant, size, xs, sm, md, lg, xl }), props.sx]}
        >
          {Boolean(leftIcon) && leftIcon}
          <span id={id}>{children}</span>
          {Boolean(rightIcon) && rightIcon}
        </Box>
      </WithInteraction>
    );
  },
) as PolymorphicComponent<ChipActionProps, 'button'>;

ChipAction.displayName = 'ChipAction';

export default ChipAction;
