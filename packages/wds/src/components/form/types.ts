import type { ComponentPropsWithoutRef } from 'react';
import type Label from '../label';
import type { TypographyProps } from '../typography/types';

export type FormLabelProps = ComponentPropsWithoutRef<typeof Label>;
export type FormMessageProps = TypographyProps;
export type FormErrorMessageProps = TypographyProps;
