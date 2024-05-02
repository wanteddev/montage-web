import { useTheme } from '@wanteddev/wds-engine';

import {
  respondMore as originRespondMore,
  respondTo as originRespondTo,
} from '../utils';

import type { BreakPoint } from '@wanteddev/wds-engine';

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
