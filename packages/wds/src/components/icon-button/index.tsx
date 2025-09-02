import { forwardRef, useMemo } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { WithInteraction } from '../with-interaction';

import { backgroundBlendStyle, iconButtonStyle } from './style';
import { useIconButtonContext } from './contexts';

import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { IconButtonProps } from './types';

const IconButton = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      disabled = false,
      disableInteraction = false,
      size,
      variant = 'normal',
      interactionColor = 'semantic.label.normal',
      alternative,
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
    const context = useIconButtonContext();

    const color = useMemo(() => {
      if (originColor) {
        return originColor;
      }

      if (context?.[variant]) {
        return context[variant];
      }

      switch (variant) {
        case 'solid':
          return 'semantic.static.white';
        case 'background':
          return undefined;
        case 'normal':
          return 'semantic.label.normal';
        default:
          return 'semantic.label.normal';
      }
    }, [context, originColor, variant]);

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
        disabled={disableInteraction || disabled}
        variant={getInteractionVariant()}
        scale={variant === 'normal'}
      >
        <Box
          as={(as || 'button') as ElementType}
          ref={ref}
          wds-component="icon-button"
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
              color,
              xs,
              sm,
              md,
              lg,
              xl,
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
