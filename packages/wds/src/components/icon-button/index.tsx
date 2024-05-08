'use client';
import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';
import PushBadge from '../push-badge';

import { iconButtonStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { IconButtonProps } from './types';

const IconButton = forwardRef(
  <E extends ElementType = 'button'>(
    {
      as,
      disabled = false,
      disableInteraction = false,
      size,
      variant = 'normal',
      interactionColor = 'palette.label.normal',
      pushBadge = false,
      color = variant === 'solid'
        ? 'palette.static.white'
        : 'palette.label.normal',
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicProps<IconButtonProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const getInteractionSize = () => {
      switch (variant) {
        case 'outlined':
        case 'solid':
          return '100%';
        case 'background':
          return 'calc(100% + 8px)';
        case 'normal':
          return 'calc(100% + 16px)';
      }
    };

    const getInteractionVariant = () => {
      switch (variant) {
        case 'normal':
        case 'background':
        case 'outlined':
          return 'light';
        case 'solid':
          return 'strong';
      }
    };

    const interactionSize = getInteractionSize();

    return (
      <WithInteraction
        width={interactionSize}
        height={interactionSize}
        color={interactionColor}
        disabled={disableInteraction || disabled}
        variant={getInteractionVariant()}
        scale={variant === 'normal'}
      >
        <Box
          as={(as || 'button') as ElementType}
          ref={ref}
          wds-component="icon-button"
          disabled={disabled}
          aria-disabled={disabled ? 'true' : undefined}
          {...props}
          sx={[
            iconButtonStyle({ variant, size, color, xs, sm, md, lg, xl }),
            props.sx,
          ]}
        >
          {children}

          {pushBadge && (
            <PushBadge
              variant="dot"
              sx={{
                position: 'absolute',
                right: '-10px',
                top: '-10px',
              }}
            />
          )}
        </Box>
      </WithInteraction>
    );
  },
) as PolymorphicComponent<IconButtonProps, 'button'>;

IconButton.displayName = 'IconButton';

export default IconButton;
