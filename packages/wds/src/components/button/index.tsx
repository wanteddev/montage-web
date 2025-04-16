import { forwardRef, useId } from 'react';
import { Box } from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';

import WithInteraction from '../with-interaction';
import Loading from '../loading';

import { buttonStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef, SyntheticEvent } from 'react';
import type { ButtonProps } from './types';

const Button = forwardRef(
  <E extends ElementType = 'button'>(
    {
      as,
      variant: originVariant,
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
    }: PolymorphicProps<ButtonProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    const id = useId();

    const variant = originVariant || 'solid';

    const interactionColor: ThemeColorsToken =
      color === 'primary' && variant === 'outlined'
        ? 'semantic.primary.normal'
        : 'semantic.label.normal';

    const getInteractionVariant = () => {
      switch (variant) {
        case 'outlined':
          return color === 'primary' ? 'normal' : 'light';
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
        color={interactionColor}
        variant={getInteractionVariant()}
        disabled={disableInteraction || disabled}
      >
        <Box
          as={(as || 'button') as E}
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
) as PolymorphicComponent<ButtonProps, 'button'>;

Button.displayName = 'Button';

export default Button;
