import { useComposedRefs } from '@radix-ui/react-compose-refs';
import {
  Box,
  type DefaultComponentPropsInternal,
  getColorByToken,
} from '@montage-ui/engine';
import { IconCircleCheckFill, IconCircleCloseFill } from '@montage-ui/icon';
import { forwardRef, useEffect, useRef } from 'react';

import { FlexBox } from '../flex-box';
import { IconButton } from '../icon-button';
import { Button } from '../button';
import { FormFieldLayoutProvider } from '../form-control/contexts';
import {
  useFormFieldSize,
  useFormFieldSlotDefaults,
} from '../form-control/hooks';
import { SlotDefaultsProvider } from '../../hooks/internal/use-slot-defaults';

import {
  positiveIconWrapperStyle,
  textFieldButtonStyle,
  textFieldContentStyle,
  textFieldWrapperStyle,
} from './style';
import { TEXT_FIELD_SLOT_SIZE } from './constants';

import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@montage-ui/engine';
import type { ElementType, ForwardedRef } from 'react';
import type {
  TextFieldButtonProps,
  TextFieldContentProps,
  TextFieldProps,
} from './types';

const TextField = forwardRef<
  HTMLInputElement,
  DefaultComponentPropsInternal<TextFieldProps, 'input'>
>(
  (
    {
      size,
      status = 'normal',
      leadingContent,
      trailingContent,
      trailingButton,
      readOnly,
      disabled,
      className,
      style,
      onReset,
      type = 'text',
      wrapperRef,
      width,
      height,
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
            'input, textarea, button, a, [data-role="text-field-reset"], [contenteditable]',
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
      <FormFieldLayoutProvider
        size={resolvedSize}
        responsive={resolvedResponsive}
      >
        <Box
          className={className}
          style={style}
          data-component="text-field"
          ref={useComposedRefs(parentRef, wrapperRef)}
          sx={[
            textFieldWrapperStyle({
              size: resolvedSize,
              status,
              width,
              height,
              readOnly,
              disabled,
              type,
              ...resolvedResponsive,
              ...props,
            }),
            sx,
          ]}
        >
          <FlexBox gap="2px" data-role="text-field-wrapper">
            {leadingContent && (
              <FlexBox
                gap="8px"
                alignItems="center"
                data-role="text-field-leading-content"
              >
                {leadingContent}
              </FlexBox>
            )}

            <input
              ref={composedRefs}
              type={type}
              readOnly={readOnly}
              disabled={disabled}
              aria-readonly={readOnly}
              aria-invalid={status === 'negative' || undefined}
              aria-disabled={disabled}
              {...props}
            />

            <FlexBox
              gap="8px"
              alignItems="center"
              data-role="text-field-trailing-content"
            >
              {status === 'positive' && (
                <TextFieldContent
                  data-role="text-field-positive"
                  sx={positiveIconWrapperStyle}
                  variant="icon"
                >
                  <IconCircleCheckFill />
                </TextFieldContent>
              )}

              <TextFieldContent
                data-role="text-field-reset"
                variant="icon-button"
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
              >
                <IconButton
                  type="button"
                  tabIndex={-1}
                  sx={(theme) => ({
                    color: theme.semantic.foreground.neutral.quaternary,
                  })}
                >
                  <IconCircleCloseFill />
                </IconButton>
              </TextFieldContent>

              {trailingContent}
            </FlexBox>
          </FlexBox>

          {trailingButton && (
            <FlexBox
              alignItems="center"
              justifyContent="center"
              sx={{
                height: 'var(--text-field-content-max-height)',
              }}
            >
              {trailingButton}
            </FlexBox>
          )}
        </Box>
      </FormFieldLayoutProvider>
    );
  },
);

TextField.displayName = 'TextField';

const TextFieldContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<TextFieldContentProps, 'div'>
>(({ variant = 'text', children, sx, color, ...props }, ref) => {
  const slotDefaults = useFormFieldSlotDefaults(TEXT_FIELD_SLOT_SIZE[variant]);

  switch (variant) {
    case 'text':
    case 'timer':
      return (
        <FlexBox
          as="span"
          data-component="text-field-content"
          ref={ref}
          sx={[
            textFieldContentStyle,
            (theme) => ({
              padding: '0px 4px',
              color: getColorByToken(
                theme,
                color ?? 'semantic.foreground.neutral.primary',
              ),
            }),
            sx,
          ]}
          {...props}
        >
          {children}
        </FlexBox>
      );
    case 'badge':
      return (
        <FlexBox
          data-component="text-field-content"
          ref={ref}
          sx={[textFieldContentStyle, sx]}
          {...props}
        >
          <SlotDefaultsProvider value={slotDefaults}>
            {children}
          </SlotDefaultsProvider>
        </FlexBox>
      );
    case 'icon':
      return (
        <FlexBox
          data-component="text-field-content"
          ref={ref}
          sx={[
            textFieldContentStyle,
            (theme) => ({
              width: 'var(--text-field-content-icon-wrapper-size)',
              fontSize: 'var(--text-field-content-icon-size)',
              color: color ?? theme.semantic.foreground.neutral.tertiary,
            }),
            sx,
          ]}
          {...props}
        >
          {children}
        </FlexBox>
      );
    case 'icon-button':
      return (
        <FlexBox
          data-component="text-field-content"
          ref={ref}
          sx={[
            textFieldContentStyle,
            {
              width: 'var(--text-field-content-icon-wrapper-size)',
            },
            sx,
          ]}
          {...props}
        >
          <SlotDefaultsProvider value={slotDefaults}>
            {children}
          </SlotDefaultsProvider>
        </FlexBox>
      );
    case 'custom':
    default:
      return (
        <FlexBox
          data-component="text-field-content"
          ref={ref}
          sx={[textFieldContentStyle, sx]}
          {...props}
        >
          {children}
        </FlexBox>
      );
  }
});

TextFieldContent.displayName = 'TextFieldContent';

const TextFieldButton = forwardRef(
  <T extends ElementType = 'button'>(
    {
      type = 'button',
      as,
      disabled,
      ...props
    }: PolymorphicPropsInternal<TextFieldButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <Button
        as={(as || 'button') as ElementType}
        variant="outlined"
        type={type}
        color="assistive"
        ref={ref}
        disabled={disabled}
        size="large"
        data-role="text-field-button"
        {...props}
        sx={[textFieldButtonStyle, props.sx]}
      />
    );
  },
) as PolymorphicComponentInternal<TextFieldButtonProps, 'button'>;

TextFieldButton.displayName = 'TextFieldButton';

export { TextField, TextFieldContent, TextFieldButton };

export type { TextFieldProps, TextFieldContentProps, TextFieldButtonProps };
