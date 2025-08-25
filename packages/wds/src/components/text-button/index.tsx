import { forwardRef, useId, useMemo } from 'react';
import { Box } from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';

import { WithInteraction } from '../with-interaction';
import { Loading } from '../loading';

import { textButtonStyle } from './style';
import { useTextButtonContext } from './contexts';

import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef, SyntheticEvent } from 'react';
import type { TextButtonProps } from './types';

const TextButton = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      disabled = false,
      disableInteraction = false,
      color = 'primary',
      leadingContent,
      trailingContent,
      size = 'medium',
      children,
      loading = false,
      disableLoadingPreventEvents,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicPropsInternal<TextButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const id = useId();
    const context = useTextButtonContext();

    const interactionColor: ThemeColorsToken =
      color === 'primary' ? 'semantic.primary.normal' : 'semantic.label.normal';

    const overrideColor = useMemo(() => {
      return context?.[color];
    }, [context, color]);

    const handlePreventEventsLoading = (e: SyntheticEvent) => {
      if (loading && !disableLoadingPreventEvents) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    return (
      <WithInteraction
        color={interactionColor}
        disabled={disableInteraction || disabled}
        variant={color === 'primary' ? 'strong' : 'light'}
        scale
      >
        <Box
          as={(as || 'button') as T}
          wds-component="text-button"
          data-color={color}
          aria-labelledby={id}
          ref={ref}
          type="button"
          disabled={disabled}
          aria-disabled={disabled}
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
            textButtonStyle({
              overrideColor,
              size,
              loading,
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
          {loading && (
            <Loading
              size="1em"
              variant="circular"
              data-role="text-button-loading"
            />
          )}
          {Boolean(leadingContent) && leadingContent}
          <span id={id}>{children}</span>
          {Boolean(trailingContent) && trailingContent}
        </Box>
      </WithInteraction>
    );
  },
) as PolymorphicComponentInternal<TextButtonProps, 'button'>;

TextButton.displayName = 'TextButton';

export { TextButton };

export type { TextButtonProps };
