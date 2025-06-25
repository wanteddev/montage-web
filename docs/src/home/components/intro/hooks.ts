import { useMotionValueEvent, useTransform } from 'framer-motion';
import { useState } from 'react';

import type { MotionValue } from 'framer-motion';

export const useMotionState = <T extends number>(
  motionValue: MotionValue<number>,
  inputRange: Array<number>,
  outputRange: Array<T>,
) => {
  const [state, setState] = useState<T>(outputRange[0] as T);

  const value = useTransform(motionValue, inputRange, outputRange);

  useMotionValueEvent(value, 'change', () => {
    setState(value.get());
  });

  return state;
};
