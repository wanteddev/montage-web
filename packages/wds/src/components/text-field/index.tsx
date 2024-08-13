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
import type { ElementRef, ElementType, ForwardedRef, MouseEvent } from 'react';
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
      className,
      style,
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
        sx={[
          textFieldWrapperStyle({
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
        onPointerDown={(event: MouseEvent) => {
          const target = event.target as HTMLElement;
          if (target.closest('input, button, a')) return;

          const input = inputRef.current;
          if (!input) return;

          requestAnimationFrame(() => {
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

        <TextFieldContent data-role="text-field-reset" variant="icon-button">
          <IconButton type="button" size={22}>
            <IconCircleClose />
          </IconButton>
        </TextFieldContent>
        {rightContent}
      </Box>
    );
  },
);

TextField.displayName = 'TextField';

const TextFieldContent = forwardRef<
  HTMLElement,
  DefaultComponentProps<TextFieldContentProps, 'div'>
>(({ variant = 'text', children, sx, ...props }, ref) => {
  switch (variant) {
    case 'text':
      return (
        <Typography
          wds-component="text-field-content"
          variant="body1_normal"
          weight="medium"
          ref={ref}
          sx={[textFieldContentStyle, { padding: '0px 4px' }, sx]}
          {...props}
          color="palette.label.assistive"
        >
          {children}
        </Typography>
      );
    case 'badge':
      return (
        <FlexBox
          wds-component="text-field-content"
          ref={ref as ForwardedRef<HTMLDivElement>}
          sx={[textFieldContentStyle, sx]}
          {...props}
        >
          {children}
        </FlexBox>
      );
    case 'timer':
      return (
        <Typography
          variant="label1_normal"
          weight="bold"
          wds-component="text-field-content"
          ref={ref}
          sx={[textFieldContentStyle, { padding: '2px 4px' }, sx]}
          {...props}
          color="palette.primary.normal"
        >
          {children}
        </Typography>
      );
    case 'icon':
    case 'icon-button':
      return (
        <FlexBox
          wds-component="text-field-content"
          ref={ref as ForwardedRef<HTMLDivElement>}
          sx={[textFieldContentStyle, { padding: '1px', fontSize: '22px' }, sx]}
          {...props}
        >
          {children}
        </FlexBox>
      );
    case 'custom':
    default:
      return (
        <FlexBox
          wds-component="text-field-content"
          ref={ref as ForwardedRef<HTMLDivElement>}
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
        sx={[textFieldButtonStyle({ variant, position, disabled }), props.sx]}
      />
    );
  },
) as PolymorphicComponent<TextFieldButtonProps, 'button'>;

TextFieldButton.displayName = 'TextFieldButton';

export { TextField, TextFieldContent, TextFieldButton };
