import { useTheme } from '@emotion/react';

import {
  respondMore as originRespondMore,
  respondTo as originRespondTo,
} from '../utils';

import type { BreakPoint } from '../types';

const useMedia = () => {
  const theme = useTheme();

  const respondTo = (breakpoint: BreakPoint[keyof BreakPoint]) =>
    originRespondTo(breakpoint);

  const respondMore = (breakpoint: BreakPoint[keyof BreakPoint]) =>
    originRespondMore(breakpoint);

  return {
    breakpoint: theme.breakpoint,
    respondTo,
    respondMore,
  };
};

export default useMedia;
