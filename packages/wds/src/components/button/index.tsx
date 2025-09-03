import { forwardRef, useId } from 'react';
import { Box } from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';

import { WithInteraction } from '../with-interaction';
import { Loading } from '../loading';

import { buttonStyle } from './style';

import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef, SyntheticEvent } from 'react';
import type { ButtonProps } from './types';

const Button = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      variant = 'solid',
      disabled = false,
      disableInteraction = false,
      fullWidth = false,
      color = 'primary',
      loading = false,
      iconOnly,
      leadingContent,
      trailingContent,
      size = 'medium',
      disableLoadingPreventEvents,
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicPropsInternal<ButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const id = useId();

    const getInteractionVariant = () => {
      switch (variant) {
        case 'outlined':
          return 'light';
        case 'solid':
          return color === 'primary' ? 'strong' : 'normal';
      }
    };

    const handlePreventEventsLoading = (e: SyntheticEvent) => {
      if (loading && !disableLoadingPreventEvents) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    return (
      <WithInteraction
        color="semantic.label.normal"
        variant={getInteractionVariant()}
        disabled={disableInteraction || disabled}
      >
        <Box
          as={(as || 'button') as T}
          aria-labelledby={iconOnly ? undefined : id}
          ref={ref}
          disabled={disabled}
          aria-disabled={disabled}
          type="button"
          {...props}
          onClick={composeEventHandlers(
            handlePreventEventsLoading,
            props.onClick,
          )}
          onMouseDown={composeEventHandlers(
            handlePreventEventsLoading,
            props.onMouseDown,
          )}
          onPointerDown={composeEventHandlers(
            handlePreventEventsLoading,
            props.onPointerDown,
          )}
          onKeyDown={composeEventHandlers((e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handlePreventEventsLoading(e);
            }
          }, props.onKeyDown)}
          sx={[
            buttonStyle({
              variant,
              iconOnly,
              loading,
              size,
              fullWidth,
              color,
              xs,
              sm,
              md,
              lg,
              xl,
            } as ButtonProps),
            props.sx,
          ]}
        >
          {loading && <Loading data-role="button-loading" variant="circular" />}
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
) as PolymorphicComponentInternal<ButtonProps, 'button'>;

Button.displayName = 'Button';

export { Button };

export type { ButtonProps };
