import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box, type DefaultComponentProps } from '@wanteddev/wds-engine';
import {
  IconCircleCheckFill,
  IconCircleCloseFill,
  IconCircleExclamationFill,
} from '@wanteddev/wds-icon';
import { forwardRef, useEffect, useRef } from 'react';

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
      leadingContent,
      trailingContent,
      positive,
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

    useEffect(() => {
      const container = parentRef.current;

      if (!container || disabled) return;

      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        if (
          target.closest('input, textarea, button, a') ||
          target.getAttribute('data-role') === 'text-field-reset'
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
        wds-component="text-field"
        ref={useComposedRefs(parentRef, wrapperRef)}
        sx={[
          textFieldWrapperStyle({
            invalid,
            width,
            height,
            readOnly,
            disabled,
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
      >
        {leadingContent}
        <input
          ref={composedRefs}
          type={type}
          readOnly={readOnly}
          disabled={disabled}
          aria-readonly={readOnly}
          aria-invalid={invalid}
          aria-disabled={disabled}
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
            sx={(theme) => ({ color: theme.semantic.label.assistive })}
          >
            <IconCircleCloseFill />
          </IconButton>
        </TextFieldContent>
        {trailingContent}
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
          color={color ?? 'semantic.label.assistive'}
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
          color={color ?? 'semantic.primary.normal'}
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
              color: theme.semantic.label.alternative,
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
          <IconButtonProvider normal="semantic.label.alternative">
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
  <T extends ElementType = 'button'>(
    {
      type = 'button',
      as,
      position = 'right',
      variant = 'normal',
      disabled,
      ...props
    }: PolymorphicProps<TextFieldButtonProps, T>,
    ref: ForwardedRef<T>,
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
