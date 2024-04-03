'use client';
import { forwardRef } from 'react';

import WithInteraction from '../with-interaction';
import PushBadge from '../push-badge';

import { iconButtonStyle } from './style';

import type { MergeWithCustomElementProps } from '../../types';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { IconButtonProps } from './types';

type Props<T extends ElementType = 'button'> = MergeWithCustomElementProps<
  T,
  IconButtonProps
>;

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
    }: Props<E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const Comp = as || 'button';

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
        <Comp
          ref={ref}
          wds-component="icon-button"
          css={iconButtonStyle({ variant, size, color, xs, sm, md, lg, xl })}
          disabled={disabled}
          aria-disabled={disabled ? 'true' : undefined}
          {...props}
        >
          {children}

          {pushBadge && (
            <PushBadge
              variant="dot"
              css={{
                position: 'absolute',
                right: '-10px',
                top: '-10px',
              }}
            />
          )}
        </Comp>
      </WithInteraction>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton as <E extends ElementType = 'button'>(
  props: Props<E>,
) => JSX.Element;
