import type { WithSxProps } from '@wanteddev/wds-engine';
import type { FunctionComponent, ReactNode } from 'react';

export type SliderProps = WithSxProps<{
  title?: FunctionComponent<SliderTitleProps> | ReactNode;
  label?: FunctionComponent<SliderLabelProps> | ReactNode;
  disabled?: boolean;
  value?: Array<number>;
  defaultValue?: Array<number>;
  /**
   * The value to move at once with keyboard operation.
   */
  step?: number;
  /**
   * The minimum value between multiple Sliders.
   */
  minStepBetweenThumbs?: number;
  /**
   * When manipulating the Slider, it is restricted so that the other Thumb cannot be moved.
   */
  disableSwapThumbs?: boolean;
  min?: number;
  max?: number;
  onValueChange?: (value: Array<number>) => void;
  onValueChangeComplete?: (value: Array<number>) => void;
  name?: string;
  children?: ReactNode;
}>;

export type SliderThumbProps = {
  value: number;
  length: number;
  name?: string;
  disabled?: boolean;
  min: number;
  max: number;
  thumbs: Set<HTMLSpanElement>;
};

export type SliderLabelProps = {
  value: number;
  index: number;
  min?: number;
  max?: number;
  disabled?: boolean;
};

export type SliderTitleProps = {
  values: Array<number>;
  min?: number;
  max?: number;
  disabled?: boolean;
};
