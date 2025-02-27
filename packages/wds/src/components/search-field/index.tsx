'use client';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box, type DefaultComponentProps } from '@wanteddev/wds-engine';
import { IconCircleClose, IconSearch } from '@wanteddev/wds-icon';
import { forwardRef, useRef } from 'react';

import FlexBox from '../flex-box';
import IconButton from '../icon-button';

import { searchFieldContentStyle, searchFieldWrapperStyle } from './style';

import type { SearchFieldProps } from './types';

const SearchField = forwardRef<
  HTMLInputElement,
  DefaultComponentProps<SearchFieldProps, 'input'>
>(
  (
    {
      readOnly,
      className,
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
    const inputRef = useRef<HTMLInputElement>(null);
    const composedRefs = useComposedRefs(inputRef, ref);

    return (
      <Box
        className={className}
        style={style}
        wds-component="search-field"
        ref={wrapperRef}
        sx={[
          searchFieldWrapperStyle({
            readOnly,
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
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest('input, button, a')) return;

          if (target !== event.currentTarget) {
            return;
          }

          const input = inputRef.current;
          if (!input || target.tagName === 'INPUT') return;

          requestAnimationFrame(() => {
            input.focus();
            input.click();
          });
        }}
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
            onPointerDown={() => {
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
              color: theme.palette.label.assistive,
            })}
          >
            <IconCircleClose />
          </IconButton>
        </FlexBox>
      </Box>
    );
  },
);

SearchField.displayName = 'SearchField';

export default SearchField;
