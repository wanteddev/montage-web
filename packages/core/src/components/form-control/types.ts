import type { ReactNode } from 'react';
import type { Merge, ResponsiveProps, WithSxProps } from '@montage-ui/engine';
import type { FlexBoxDefaultProps } from '../flex-box/types';
import type { LabelProps } from '../label';
import type { SlotProps } from '@radix-ui/react-slot';
import type { TypographyProps } from '../typography/types';

type FormControlDefaultProps = FlexBoxDefaultProps & {
  /** The size of the Control. Maps the sibling `FormLabel` to a typography variant. */
  size?: 'large' | 'medium';

  labelPlacement?: 'top' | 'start';
};

export type FormControlProps = Merge<
  FormControlDefaultProps,
  ResponsiveProps<Omit<FormControlDefaultProps, 'children'>>
>;
export type FormControlLabelProps = LabelProps;
export type FormControlMessageProps = Merge<
  TypographyProps,
  {
    characterCounter?: ReactNode;
  }
>;
export type FormControlPositiveMessageProps = Merge<
  TypographyProps,
  {
    characterCounter?: ReactNode;
  }
>;
export type FormControlNegativeMessageProps = Merge<
  TypographyProps,
  {
    characterCounter?: ReactNode;
  }
>;
export type FormControlFieldProps = SlotProps;

export type FormControlCharacterCounterProps = WithSxProps<{
  length: number;
  maxLength: number;
}>;
