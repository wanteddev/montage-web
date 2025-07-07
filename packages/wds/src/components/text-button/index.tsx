import { forwardRef, useId, useMemo } from 'react';
import { Box } from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';

import WithInteraction from '../with-interaction';
import Loading from '../loading';

import { textButtonStyle } from './style';
import { useTextButtonContext } from './contexts';

import type {
  PolymorphicComponent,
  PolymorphicProps,
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
      variant = 'primary',
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
    }: PolymorphicProps<TextButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const id = useId();
    const context = useTextButtonContext();

    const interactionColor: ThemeColorsToken =
      variant === 'primary'
        ? 'semantic.primary.normal'
        : 'semantic.label.normal';

    const color = useMemo(() => {
      return context?.[variant];
    }, [context, variant]);

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
        variant={variant === 'primary' ? 'strong' : 'light'}
        scale
      >
        <Box
          as={(as || 'button') as T}
          wds-component="text-button"
          data-variant={variant}
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
              color,
              size,
              loading,
              variant,
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
) as PolymorphicComponent<TextButtonProps, 'button'>;

TextButton.displayName = 'TextButton';

export default TextButton;
