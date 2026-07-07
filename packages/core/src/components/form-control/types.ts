import type { ReactNode } from 'react';
import type { Merge, ResponsiveProps, WithSxProps } from '@montage-ui/engine';
import type { FlexBoxDefaultProps } from '../flex-box/types';
import type { LabelProps } from '../label';
import type { SlotProps } from '@radix-ui/react-slot';
import type { TypographyProps } from '../typography/types';

type FormControlDefaultProps = FlexBoxDefaultProps & {
  /** Size propagated to child input components. Defaults to `'large'` */
  size?: 'large' | 'medium';
  /** Label placement direction. `'top'` stacks above, `'leading'` aligns inline to the left */
  labelPlacement?: 'top' | 'leading';
};

export type FormControlProps = Merge<
  FormControlDefaultProps,
  ResponsiveProps<Omit<FormControlDefaultProps, 'children'>>
>;
export type FormControlLabelProps = LabelProps;
export type FormControlMessageProps = Merge<
  TypographyProps,
  {
    /** Accessory element to be rendered alongside the message */
    accessory?: ReactNode;
  }
>;
export type FormControlPositiveMessageProps = Merge<
  TypographyProps,
  {
    /** Accessory element to be rendered alongside the message */
    accessory?: ReactNode;
  }
>;
export type FormControlNegativeMessageProps = Merge<
  TypographyProps,
  {
    /** Accessory element to be rendered alongside the message */
    accessory?: ReactNode;
  }
>;
export type FormControlFieldProps = SlotProps;

export type FormControlMessageAccessoryProps = WithSxProps<{
  length?: number;
  maxLength?: number;
  variant?: 'character-counter' | 'custom';
}>;
