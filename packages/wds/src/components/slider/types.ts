import type { WithSxProps } from '@wanteddev/wds-engine';
import type { FunctionComponent, ReactNode } from 'react';

export type SliderProps = WithSxProps<{
  /** The title of the slider. */
  title?: FunctionComponent<SliderTitleProps> | ReactNode;
  /** The label of the slider. */
  label?: FunctionComponent<SliderLabelProps> | ReactNode;
  /** Whether the slider is disabled. */
  disabled?: boolean;
  /** The value of the slider. */
  value?: Array<number>;
  /** The default value of the slider. */
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
  /** The minimum value of the slider. */
  min?: number;
  /** The maximum value of the slider. */
  max?: number;
  /** Callback function when the value changes. */
  onValueChange?: (value: Array<number>) => void;
  /** Callback function when the value changes complete. */
  onValueChangeComplete?: (value: Array<number>) => void;
  /** The name of the slider. */
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
