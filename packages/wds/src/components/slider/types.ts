import type { FunctionComponent, ReactNode } from 'react';

export type SliderLabelProps = {
  value: number;
  index: number;
  min?: number;
  max?: number;
  disabled?: boolean;
};

export type SliderHeadingProps = {
  values: Array<number>;
  min?: number;
  max?: number;
  disabled?: boolean;
};

export type SliderProps = {
  heading?: FunctionComponent<SliderHeadingProps> | ReactNode;
  label?: FunctionComponent<SliderLabelProps> | ReactNode;
  disabled?: boolean;
  value?: Array<number>;
  defaultValue?: Array<number>;
  /**
   * 키보드 조작으로 한번에 이동할 값
   */
  step?: number;
  /**
   * 여러 Slider 사이 최소 값
   */
  minStepBetweenThumbs?: number;
  /**
   * Slider를 조작할 때 다른 Thumb을 넘어갈 수 없도록 제한합니다.
   */
  disableSwapThumbs?: boolean;
  min?: number;
  max?: number;
  onValueChange?: (value: Array<number>) => void;
  onValueChangeComplete?: (value: Array<number>) => void;
  name?: string;
  children?: ReactNode;
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
