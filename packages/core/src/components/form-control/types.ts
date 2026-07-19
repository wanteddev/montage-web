import type { CSSProperties, ReactNode } from 'react';
import type { Merge, ResponsiveProps, WithSxProps } from '@montage-ui/engine';
import type { FlexBoxDefaultProps } from '../flex-box/types';
import type { LabelProps } from '../label';
import type { SlotProps } from '@radix-ui/react-slot';
import type { TypographyProps } from '../typography/types';

type FlexBoxResponsiveProps = Omit<FlexBoxDefaultProps, 'children' | 'sx'>;

export type FormControlGroupDefaultProps = Merge<
  {
    /** Label column width applied to `grid-template-columns` of descendant `labelPlacement="leading"` FormControls */
    labelWidth?: CSSProperties['gridTemplateColumns'];
  },
  FlexBoxDefaultProps
>;

export type FormControlGroupResponsiveProps = ResponsiveProps<
  Merge<
    Pick<FormControlGroupDefaultProps, 'labelWidth'>,
    FlexBoxResponsiveProps
  >
>;

export type FormControlGroupProps = Merge<
  FormControlGroupDefaultProps,
  FormControlGroupResponsiveProps
>;

export type FormControlDefaultProps = Merge<
  {
    /** Size propagated to child input components. Defaults to `'large'` */
    size?: 'large' | 'medium';
    /** Label placement direction. `'top'` stacks above, `'leading'` aligns inline to the left */
    labelPlacement?: 'top' | 'leading';
  },
  FlexBoxDefaultProps
>;

export type FormControlResponsiveProps = ResponsiveProps<
  Merge<
    Pick<FormControlDefaultProps, 'size' | 'labelPlacement'>,
    FlexBoxResponsiveProps
  >
>;

export type FormControlProps = Merge<
  FormControlDefaultProps,
  FormControlResponsiveProps
>;
export type FormControlLabelProps = LabelProps;
export type FormControlMessageProps = Merge<
  {
    /** Accessory element to be rendered alongside the message */
    accessory?: ReactNode;
  },
  TypographyProps
>;
export type FormControlPositiveMessageProps = Merge<
  {
    /** Accessory element to be rendered alongside the message */
    accessory?: ReactNode;
  },
  TypographyProps
>;
export type FormControlNegativeMessageProps = Merge<
  {
    /** Accessory element to be rendered alongside the message */
    accessory?: ReactNode;
  },
  TypographyProps
>;
export type FormControlFieldProps = SlotProps;

export type FormControlMessageAccessoryProps = WithSxProps<{
  length?: number;
  maxLength?: number;
  variant?: 'character-counter' | 'custom';
}>;
