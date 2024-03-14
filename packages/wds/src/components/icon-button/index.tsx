'use client';
import { forwardRef } from 'react';

import WithInteraction from '../with-interaction';
import PushBadge from '../push-badge';

import { iconButtonStyle } from './style';

import type { MergeWithCustomElementProps } from '@/types';
import type { ElementType, ForwardedRef, ReactNode } from 'react';
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
      ...props
    }: Props<E>,
    ref: ForwardedRef<Props<E>['as']>,
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

    const interactionSize = getInteractionSize();

    return (
      <WithInteraction
        width={interactionSize}
        height={interactionSize}
        color={interactionColor}
        disabled={disableInteraction || disabled}
        scale={variant === 'normal'}
      >
        <Comp
          ref={ref}
          wds-component="icon-button"
          css={iconButtonStyle({ variant, size, color, xs, sm, md, lg })}
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
                right: '-6px',
                top: '-5px',
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
) => ReactNode;
