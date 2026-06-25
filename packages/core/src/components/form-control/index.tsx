import { Slot } from '@radix-ui/react-slot';
import { forwardRef, useId } from 'react';

import { FlexBox } from '../flex-box';
import { Label } from '../label';
import { Typography } from '../typography';
import { splitResponsiveBreakpoints } from '../../utils/internal/responsive-props';

import {
  FORM_CONTROL_CHARACTER_COUNTER,
  FORM_CONTROL_FIELD_NAME,
  FORM_CONTROL_LABEL_NAME,
  FORM_CONTROL_MESSAGE_NAME,
  FORM_CONTROL_NAME,
  FORM_CONTROL_NEGATIVE_MESSAGE_NAME,
  FORM_CONTROL_POSITIVE_MESSAGE_NAME,
} from './constants';
import {
  FormControlLayoutProvider,
  FormControlProvider,
  useFormControlLayoutContext,
} from './contexts';
import { useFormControl } from './hooks';
import {
  formCharacterCounterStyle,
  formControlStyle,
  formLabelStyle,
  formMessageStyle,
} from './style';

import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@montage-ui/engine';
import type { ElementType, ForwardedRef } from 'react';
import type {
  FormControlCharacterCounterProps,
  FormControlFieldProps,
  FormControlLabelProps,
  FormControlMessageProps,
  FormControlNegativeMessageProps,
  FormControlPositiveMessageProps,
  FormControlProps,
} from './types';

const FormControl = forwardRef(
  <T extends ElementType = 'div'>(
    {
      as,
      size = 'large',
      labelPlacement = 'top',
      gap,
      rowGap,
      columnGap,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicPropsInternal<FormControlProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const id = useId();

    const { picked: responsiveSize, rest: responsiveRest } =
      splitResponsiveBreakpoints({ xs, sm, md, lg, xl }, [
        'size',
        'labelPlacement',
        'gap',
        'rowGap',
        'columnGap',
        'sx',
      ]);

    return (
      <FormControlProvider id={id}>
        <FormControlLayoutProvider size={size} responsive={responsiveSize}>
          <FlexBox
            as={as || 'div'}
            ref={ref}
            data-component="form-control"
            flexDirection="column"
            gap="8px"
            {...responsiveRest}
            {...props}
            sx={[
              formControlStyle({
                gap,
                rowGap,
                columnGap,
                labelPlacement,
                ...responsiveSize,
              }),
              props.sx,
            ]}
          />
        </FormControlLayoutProvider>
      </FormControlProvider>
    );
  },
) as PolymorphicComponentInternal<FormControlProps, 'div'>;

FormControl.displayName = FORM_CONTROL_NAME;

const FormControlLabel = forwardRef<
  HTMLLabelElement,
  DefaultComponentPropsInternal<FormControlLabelProps, 'label'>
>(({ variant, weight, xs, sm, md, lg, xl, ...props }, ref) => {
  const { fieldId: formFieldId, labelId: formLabelId } = useFormControl(
    FORM_CONTROL_LABEL_NAME,
  );

  const { size, responsive } = useFormControlLayoutContext() ?? {};

  return (
    <Label
      ref={ref}
      data-component="form-control-label"
      id={formLabelId}
      htmlFor={formFieldId}
      {...props}
      sx={[
        formLabelStyle({
          variant,
          weight,
          xs,
          sm,
          md,
          lg,
          xl,
          responsive,
          size,
        }),
        props.sx,
      ]}
    />
  );
});

FormControlLabel.displayName = FORM_CONTROL_LABEL_NAME;

const FormControlField = forwardRef<HTMLElement, FormControlFieldProps>(
  (props, ref) => {
    const {
      fieldId,
      labelId,
      messageId,
      negativeMessageId,
      positiveMessageId,
    } = useFormControl(FORM_CONTROL_FIELD_NAME);

    return (
      <Slot
        ref={ref}
        id={fieldId}
        aria-describedby={`${messageId} ${negativeMessageId} ${positiveMessageId}`}
        aria-labelledby={labelId}
        data-role="form-control-slot"
        {...props}
      />
    );
  },
);

FormControlField.displayName = FORM_CONTROL_FIELD_NAME;

const FormControlMessage = forwardRef(
  <T extends ElementType = 'p'>(
    {
      as,
      children,
      characterCounter,
      ...props
    }: PolymorphicPropsInternal<FormControlMessageProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { messageId } = useFormControl(FORM_CONTROL_MESSAGE_NAME);

    if (!children) {
      return null;
    }

    return (
      <Typography
        as={as || 'p'}
        ref={ref}
        id={messageId}
        data-component="form-control-message"
        variant="caption1"
        weight="regular"
        color="semantic.label.alternative"
        {...props}
        sx={[formMessageStyle, props.sx]}
      >
        <span data-role="form-control-message-content">{children}</span>

        {characterCounter}
      </Typography>
    );
  },
) as PolymorphicComponentInternal<FormControlMessageProps, 'p'>;

FormControlMessage.displayName = FORM_CONTROL_MESSAGE_NAME;

const FormControlNegativeMessage = forwardRef(
  <T extends ElementType = 'p'>(
    {
      as,
      children,
      characterCounter,
      ...props
    }: PolymorphicPropsInternal<FormControlNegativeMessageProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { negativeMessageId } = useFormControl(
      FORM_CONTROL_NEGATIVE_MESSAGE_NAME,
    );

    if (!children) {
      return null;
    }

    return (
      <Typography
        as={as || 'p'}
        ref={ref}
        id={negativeMessageId}
        data-component="form-control-negative-message"
        variant="caption1"
        weight="regular"
        color="semantic.status.negative"
        {...props}
        sx={[formMessageStyle, props.sx]}
      >
        <span data-role="form-control-negative-message-content">
          {children}
        </span>

        {characterCounter}
      </Typography>
    );
  },
) as PolymorphicComponentInternal<FormControlNegativeMessageProps, 'p'>;

FormControlNegativeMessage.displayName = FORM_CONTROL_NEGATIVE_MESSAGE_NAME;

const FormControlPositiveMessage = forwardRef(
  <T extends ElementType = 'p'>(
    {
      as,
      children,
      characterCounter,
      ...props
    }: PolymorphicPropsInternal<FormControlPositiveMessageProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { positiveMessageId } = useFormControl(
      FORM_CONTROL_POSITIVE_MESSAGE_NAME,
    );

    if (!children) {
      return null;
    }

    return (
      <Typography
        as={as || 'p'}
        ref={ref}
        id={positiveMessageId}
        data-component="form-control-positive-message"
        variant="caption1"
        weight="regular"
        color="semantic.label.alternative"
        {...props}
        sx={[formMessageStyle, props.sx]}
      >
        <span data-role="form-control-positive-message-content">
          {children}
        </span>

        {characterCounter}
      </Typography>
    );
  },
) as PolymorphicComponentInternal<FormControlPositiveMessageProps, 'p'>;

FormControlPositiveMessage.displayName = FORM_CONTROL_POSITIVE_MESSAGE_NAME;

const FormControlCharacterCounter = forwardRef<
  HTMLSpanElement,
  DefaultComponentPropsInternal<FormControlCharacterCounterProps, 'span'>
>(({ length, maxLength, ...props }, ref) => {
  return (
    <Typography
      data-component="form-control-character-counter"
      variant="label2"
      weight="medium"
      ref={ref}
      data-is-overflow={length > maxLength}
      {...props}
      color="semantic.label.alternative"
      sx={[formCharacterCounterStyle, props.sx]}
    >
      <span data-role="form-control-character-counter-length">{length}</span>
      <span data-role="form-control-character-counter-divider">/</span>
      <span data-role="form-control-character-counter-max-length">
        {maxLength}
      </span>
    </Typography>
  );
});

FormControlCharacterCounter.displayName = FORM_CONTROL_CHARACTER_COUNTER;

export {
  FormControl,
  FormControlField,
  FormControlLabel,
  FormControlMessage,
  FormControlNegativeMessage,
  FormControlPositiveMessage,
  FormControlCharacterCounter,
};

export type {
  FormControlProps,
  FormControlFieldProps,
  FormControlLabelProps,
  FormControlMessageProps,
  FormControlNegativeMessageProps,
  FormControlPositiveMessageProps,
  FormControlCharacterCounterProps,
};
