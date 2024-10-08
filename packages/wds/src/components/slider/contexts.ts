import { createContext } from '@radix-ui/react-context';

type SliderContextValue = {
  thumb: Set<HTMLSpanElement>;
};

export const [SliderProvider, useSliderContext] =
  createContext<SliderContextValue>('Slider');
