'use client';
import { forwardRef, useId, useMemo } from 'react';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';
import Loading from '../loading';

import { textButtonStyle } from './style';
import { useTextButtonContext } from './contexts';

import type {
  PolymorphicComponent,
  PolymorphicProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { TextButtonProps } from './types';

const TextButton = forwardRef(
  <E extends ElementType = 'button'>(
    {
      as,
      disabled = false,
      disableInteraction = false,
      variant = 'primary',
      leftContent,
      rightContent,
      size = 'medium',
      children,
      loading = false,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicProps<TextButtonProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    const id = useId();
    const context = useTextButtonContext();

    const interactionColor: ThemeColorsToken =
      variant === 'primary' ? 'palette.primary.normal' : 'palette.label.normal';

    const color = useMemo(() => {
      return context?.[variant];
    }, [context, variant]);

    return (
      <WithInteraction
        color={interactionColor}
        disabled={disableInteraction || disabled}
        variant={variant === 'primary' ? 'strong' : 'light'}
        scale
      >
        <Box
          as={(as || 'button') as E}
          wds-component="text-button"
          data-variant={variant}
          aria-labelledby={id}
          ref={ref}
          type="button"
          disabled={disabled}
          aria-disabled={disabled}
          {...props}
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
          {Boolean(leftContent) && leftContent}
          <span id={id}>{children}</span>
          {Boolean(rightContent) && rightContent}
        </Box>
      </WithInteraction>
    );
  },
) as PolymorphicComponent<TextButtonProps, 'button'>;

TextButton.displayName = 'TextButton';

export default TextButton;
