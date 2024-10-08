import type { ReactNode } from 'react';

export type SliderProps = {
  heading?: boolean;
  labels?: Array<ReactNode>;
  disabled?: boolean;
  value?: Array<number>;
  defaultValue?: Array<number>;
  step?: number;
  minStepBetweenThumbs?: number;
  min?: number;
  max?: number;
  onValueChange?: (value: Array<number>) => void;
  onValueChangeComplete?: (value: Array<number>) => void;
  name?: string;
};

export type SliderThumbProps = {
  value: number;
  length: number;
  name?: string;
  disabled?: boolean;
  min: number;
  max: number;
  thumbs: Set<HTMLSpanElement>;
};
