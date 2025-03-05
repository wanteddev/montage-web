'use client';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box, type DefaultComponentProps } from '@wanteddev/wds-engine';
import {
  IconCircleCheckFill,
  IconCircleCloseFill,
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
  textFieldButtonStyle,
  textFieldContentStyle,
  textFieldWrapperStyle,
} from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type {
  TextFieldButtonProps,
  TextFieldContentProps,
  TextFieldProps,
} from './types';

const TextField = forwardRef<
  HTMLInputElement,
  DefaultComponentProps<TextFieldProps, 'input'>
>(
  (
    {
      invalid,
      leftContent,
      rightContent,
      positive,
      readOnly,
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
    const inputRef = useRef<HTMLInputElement>(null);
    const composedRefs = useComposedRefs(inputRef, ref);

    return (
      <Box
        className={className}
        style={style}
        wds-component="text-field"
        ref={wrapperRef}
        sx={[
          textFieldWrapperStyle({
            invalid,
            width,
            height,
            readOnly,
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
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest('input, button, a')) return;

          if (target !== event.currentTarget) {
            return;
          }

          const input = inputRef.current;
          if (
            !input ||
            target.tagName === 'INPUT' ||
            target.getAttribute('data-role') === 'text-field-reset'
          )
            return;

          requestAnimationFrame(() => {
            input.focus();
            input.click();
          });
        }}
      >
        {leftContent}
        <input
          ref={composedRefs}
          type={type}
          readOnly={readOnly}
          aria-readonly={readOnly}
          aria-invalid={invalid}
          {...props}
        />
        {invalid ? (
          <TextFieldContent
            data-role="text-field-invalid"
            sx={invalidIconWrapperStyle}
            variant="icon"
          >
            <IconCircleExclamationFill />
          </TextFieldContent>
        ) : (
          positive && (
            <TextFieldContent
              data-role="text-field-positive"
              sx={positiveIconWrapperStyle}
              variant="icon"
            >
              <IconCircleCheckFill />
            </TextFieldContent>
          )
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
            size={22}
            tabIndex={-1}
            sx={(theme) => ({ color: theme.palette.label.assistive })}
          >
            <IconCircleCloseFill />
          </IconButton>
        </TextFieldContent>
        {rightContent}
      </Box>
    );
  },
);

TextField.displayName = 'TextField';

const TextFieldContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<TextFieldContentProps, 'div'>
>(({ variant = 'text', children, sx, color, ...props }, ref) => {
  switch (variant) {
    case 'text':
      return (
        <Typography
          as="div"
          wds-component="text-field-content"
          variant="body1"
          weight="medium"
          ref={ref}
          sx={[textFieldContentStyle, { padding: '0px 4px' }, sx]}
          color={color ?? 'palette.label.assistive'}
          {...props}
        >
          {children}
        </Typography>
      );
    case 'badge':
      return (
        <FlexBox
          wds-component="text-field-content"
          ref={ref}
          sx={[textFieldContentStyle, sx]}
          {...props}
        >
          {children}
        </FlexBox>
      );
    case 'timer':
      return (
        <Typography
          as="div"
          variant="label1"
          weight="bold"
          wds-component="text-field-content"
          ref={ref}
          sx={[textFieldContentStyle, { padding: '2px 4px' }, sx]}
          color={color ?? 'palette.primary.normal'}
          {...props}
        >
          {children}
        </Typography>
      );
    case 'icon':
      return (
        <FlexBox
          wds-component="text-field-content"
          ref={ref}
          sx={[
            textFieldContentStyle,
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
          wds-component="text-field-content"
          ref={ref}
          sx={[
            textFieldContentStyle,
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
          wds-component="text-field-content"
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
  <E extends ElementType = 'button'>(
    {
      type = 'button',
      as,
      position = 'right',
      variant = 'normal',
      disabled,
      ...props
    }: PolymorphicProps<TextFieldButtonProps, E>,
    ref: ForwardedRef<E>,
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
        sx={[textFieldButtonStyle({ variant, position, disabled }), props.sx]}
      />
    );
  },
) as PolymorphicComponent<TextFieldButtonProps, 'button'>;

TextFieldButton.displayName = 'TextFieldButton';

export { TextField, TextFieldContent, TextFieldButton };
