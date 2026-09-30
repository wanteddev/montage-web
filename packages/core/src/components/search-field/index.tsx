import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box, type DefaultComponentPropsInternal } from '@montage-ui/engine';
import { IconCircleCloseFill, IconSearch } from '@montage-ui/icon';
import { forwardRef, useEffect, useRef } from 'react';

import { FlexBox } from '../flex-box';
import { IconButton } from '../icon-button';
import { mapResponsiveProps } from '../../utils/internal/responsive-props';
import { FORM_FIELD_ICON_BUTTON_SIZE } from '../form-control/constants';
import { useFormFieldSize } from '../form-control/hooks';

import { searchFieldContentStyle, searchFieldWrapperStyle } from './style';

import type { SearchFieldProps } from './types';

const SearchField = forwardRef<
  HTMLInputElement,
  DefaultComponentPropsInternal<SearchFieldProps, 'input'>
>(
  (
    {
      className,
      disabled,
      style,
      onReset,
      width,
      variant = 'solid',
      size,
      wrapperRef,
      sx,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const composedRefs = useComposedRefs(inputRef, ref);

    const { size: resolvedSize, ...resolvedResponsive } = useFormFieldSize(
      size,
      { xs, sm, md, lg, xl },
    );

    useEffect(() => {
      const container = parentRef.current;

      if (!container || disabled) return;

      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (
          target.closest(
            'input, textarea, button, a, [data-role="search-field-reset"], [contenteditable]',
          )
        )
          return;

        inputRef.current?.click();
        inputRef.current?.focus();
      };

      container.addEventListener('click', handleClick);

      return () => container.removeEventListener('click', handleClick);
    }, [disabled]);

    return (
      <Box
        className={className}
        style={style}
        data-component="search-field"
        ref={useComposedRefs(parentRef, wrapperRef)}
        sx={[
          searchFieldWrapperStyle({
            disabled,
            size: resolvedSize,
            width,
            variant,
            ...resolvedResponsive,
            ...props,
          }),
          sx,
        ]}
      >
        <FlexBox data-role="search-field-wrapper" alignItems="center">
          <FlexBox
            data-role="search-field-icon"
            sx={searchFieldContentStyle}
            alignItems="center"
            justifyContent="center"
          >
            <IconSearch />
          </FlexBox>

          <input
            ref={composedRefs}
            autoComplete="off"
            disabled={disabled}
            aria-disabled={disabled}
            {...props}
            type="search"
          />

          <FlexBox
            data-role="search-field-reset"
            sx={searchFieldContentStyle}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              type="button"
              tabIndex={-1}
              aria-label="Reset search"
              // The reset button sits outside of a content slot, so it maps
              // the field size itself.
              size={FORM_FIELD_ICON_BUTTON_SIZE[resolvedSize]}
              {...mapResponsiveProps(
                resolvedResponsive,
                'size',
                (s) => FORM_FIELD_ICON_BUTTON_SIZE[s],
              )}
              interactionOverflow
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => {
                const input = inputRef.current;

                if (!input) return;

                requestAnimationFrame(() => {
                  const prevValue = input.value;

                  const event = new Event('change', { bubbles: true });
                  input.value = '';

                  props.onChange?.({
                    ...event,
                    target: input as EventTarget & HTMLInputElement,
                    currentTarget: input as EventTarget & HTMLInputElement,
                    nativeEvent: {
                      ...event,
                      target: input as EventTarget,
                      currentTarget: input as EventTarget,
                    },
                    isDefaultPrevented: () => false,
                    isPropagationStopped: () => false,
                    persist: (): void => {},
                  });

                  onReset?.(prevValue);

                  input.focus();
                });
              }}
              sx={(theme) => ({
                color: theme.semantic.foreground.neutral.quaternary,
              })}
            >
              <IconCircleCloseFill />
            </IconButton>
          </FlexBox>
        </FlexBox>
      </Box>
    );
  },
);

SearchField.displayName = 'SearchField';

export { SearchField };

export type { SearchFieldProps };
