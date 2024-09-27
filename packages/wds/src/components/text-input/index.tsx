'use client';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box, type DefaultComponentProps } from '@wanteddev/wds-engine';
import {
  IconCircleCheckFill,
  IconCircleClose,
  IconCircleExclamationFill,
} from '@wanteddev/wds-icon';
import { forwardRef, useRef } from 'react';

import FlexBox from '../flex-box';
import IconButton from '../icon-button';
import Typography from '../typography';
import Button from '../button';
import { IconButtonProvider } from '../icon-button/contexts';

import {
  invalidIconWrapperStyle,
  positiveIconWrapperStyle,
  textInputButtonStyle,
  textInputContentStyle,
  textInputWrapperStyle,
} from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type {
  TextInputButtonProps,
  TextInputContentProps,
  TextInputProps,
} from './types';

const TextInput = forwardRef<
  HTMLInputElement,
  DefaultComponentProps<TextInputProps, 'input'>
>(
  (
    {
      invalid,
      leftContent,
      rightContent,
      positive,
      className,
      style,
      onReset,
      type = 'text',
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
        wds-component="text-input"
        sx={[
          textInputWrapperStyle({
            invalid,
            type,
            positive,
            xs,
            sm,
            md,
            lg,
            xl,
            ...props,
          }),
          sx,
        ]}
        onPointerDown={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest('input, button, a')) return;

          const input = inputRef.current;
          if (!input || target.tagName === 'INPUT') return;

          requestAnimationFrame(() => {
            input.dispatchEvent(
              new PointerEvent('pointerdown', {
                bubbles: false,
              }),
            );

            props.onPointerDown?.({
              ...event,
              currentTarget: input as EventTarget & HTMLInputElement,
              bubbles: false,
            });
            input.focus();
          });
        }}
      >
        {leftContent}
        <input
          ref={composedRefs}
          type={type}
          aria-invalid={invalid}
          {...props}
        />
        {invalid ? (
          <TextInputContent
            data-role="text-input-invalid"
            sx={invalidIconWrapperStyle}
            variant="icon"
          >
            <IconCircleExclamationFill />
          </TextInputContent>
        ) : (
          positive && (
            <TextInputContent
              data-role="text-input-positive"
              sx={positiveIconWrapperStyle}
              variant="icon"
            >
              <IconCircleCheckFill />
            </TextInputContent>
          )
        )}

        <TextInputContent
          data-role="text-input-reset"
          variant="icon-button"
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
        >
          <IconButton
            type="button"
            size={22}
            tabIndex={-1}
            sx={(theme) => ({ color: theme.palette.label.assistive })}
          >
            <IconCircleClose />
          </IconButton>
        </TextInputContent>
        {rightContent}
      </Box>
    );
  },
);

TextInput.displayName = 'TextInput';

const TextInputContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<TextInputContentProps, 'div'>
>(({ variant = 'text', children, sx, color, ...props }, ref) => {
  switch (variant) {
    case 'text':
      return (
        <Typography
          as="div"
          wds-component="text-input-content"
          variant="body1_normal"
          weight="medium"
          ref={ref}
          sx={[textInputContentStyle, { padding: '0px 4px' }, sx]}
          color={color ?? 'palette.label.assistive'}
          {...props}
        >
          {children}
        </Typography>
      );
    case 'badge':
      return (
        <FlexBox
          wds-component="text-input-content"
          ref={ref}
          sx={[textInputContentStyle, sx]}
          {...props}
        >
          {children}
        </FlexBox>
      );
    case 'timer':
      return (
        <Typography
          as="div"
          variant="label1_normal"
          weight="bold"
          wds-component="text-input-content"
          ref={ref}
          sx={[textInputContentStyle, { padding: '2px 4px' }, sx]}
          color={color ?? 'palette.primary.normal'}
          {...props}
        >
          {children}
        </Typography>
      );
    case 'icon':
      return (
        <FlexBox
          wds-component="text-input-content"
          ref={ref}
          sx={[
            textInputContentStyle,
            (theme) => ({
              padding: '1px',
              fontSize: '22px',
              color: theme.palette.label.alternative,
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
          wds-component="text-input-content"
          ref={ref}
          sx={[
            textInputContentStyle,
            {
              padding: '1px',
            },
            sx,
          ]}
          {...props}
        >
          <IconButtonProvider normal="palette.label.alternative">
            {children}
          </IconButtonProvider>
        </FlexBox>
      );
    case 'custom':
    default:
      return (
        <FlexBox
          wds-component="text-input-content"
          ref={ref}
          sx={[textInputContentStyle, sx]}
          {...props}
        >
          {children}
        </FlexBox>
      );
  }
});

TextInputContent.displayName = 'TextInputContent';

const TextInputButton = forwardRef(
  <E extends ElementType = 'button'>(
    {
      type = 'button',
      as,
      position = 'right',
      variant = 'normal',
      disabled,
      ...props
    }: PolymorphicProps<TextInputButtonProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <Button
        as={(as || 'button') as ElementType}
        variant="outlined"
        type={type}
        color={variant === 'normal' ? 'secondary' : 'assistive'}
        ref={ref}
        disabled={disabled}
        size="large"
        {...props}
        sx={[textInputButtonStyle({ variant, position, disabled }), props.sx]}
      />
    );
  },
) as PolymorphicComponent<TextInputButtonProps, 'button'>;

TextInputButton.displayName = 'TextInputButton';

export { TextInput, TextInputContent, TextInputButton };
