import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box, type DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import { IconCircleCloseFill, IconSearch } from '@wanteddev/wds-icon';
import { forwardRef, useEffect, useRef } from 'react';

import { FlexBox } from '../flex-box';
import { IconButton } from '../icon-button';

import { searchFieldContentStyle, searchFieldWrapperStyle } from './style';

import type { SearchFieldProps } from './types';

const SearchField = forwardRef<
  HTMLInputElement,
  DefaultComponentPropsInternal<SearchFieldProps, 'input'>
>(
  (
    {
      readOnly,
      className,
      disabled,
      style,
      onReset,
      width,
      size = 'medium',
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
        wds-component="search-field"
        ref={useComposedRefs(parentRef, wrapperRef)}
        sx={[
          searchFieldWrapperStyle({
            readOnly,
            disabled,
            size,
            width,
            xs,
            sm,
            md,
            lg,
            xl,
            ...props,
          }),
          sx,
        ]}
      >
        <FlexBox
          data-role="search-field-icon"
          sx={[
            searchFieldContentStyle,
            { height: '20px', padding: '0px 2px', marginRight: '4px' },
          ]}
          alignItems="center"
          justifyContent="center"
        >
          <IconSearch />
        </FlexBox>
        <input
          ref={composedRefs}
          type="search"
          readOnly={readOnly}
          aria-readonly={readOnly}
          autoComplete="off"
          disabled={disabled}
          aria-disabled={disabled}
          {...props}
        />
        <FlexBox
          data-role="search-field-reset"
          sx={[searchFieldContentStyle, { height: '22px', marginLeft: '8px' }]}
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            type="button"
            size={22}
            tabIndex={-1}
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
              color: theme.semantic.label.assistive,
            })}
          >
            <IconCircleCloseFill />
          </IconButton>
        </FlexBox>
      </Box>
    );
  },
);

SearchField.displayName = 'SearchField';

export { SearchField };

export type { SearchFieldProps };
