import { useTheme } from '@montage-ui/engine';

import {
  respondMore as originRespondMore,
  respondTo as originRespondTo,
} from '../utils';

import type { BreakPoint } from '@montage-ui/engine';

const useMediaQuery = () => {
  const theme = useTheme();

  /**
   * `respondTo` has the same function as `respondDown`, and works when it is smaller than the specified breakpoint.
   *
   * @example
   * // returns `@media only screen and (max-width: 767px)`
   * respondTo(breakpoint.sm);
   */
  const respondTo = (breakpoint: BreakPoint[keyof BreakPoint]) =>
    originRespondTo(breakpoint);

  /**
   * `respondMore` has the same function as `respondUp`, and works when it is larger than or equal to the specified breakpoint.
   *
   * @example
   * // returns `@media only screen and (min-width: 768px)`
   * respondMore(breakpoint.sm);
   */
  const respondMore = (breakpoint: BreakPoint[keyof BreakPoint]) =>
    originRespondMore(breakpoint);

  /**
   * `respondDown` has the same function as `respondTo`, and works when it is smaller than the specified breakpoint.
   *
   * @example
   * // returns `@media only screen and (max-width: 767px)`
   * respondDown(breakpoint.sm);
   */
  const respondDown = (breakpoint: BreakPoint[keyof BreakPoint]) =>
    originRespondTo(breakpoint);

  /**
   * `respondUp` has the same function as `respondMore`, and works when it is larger than or equal to the specified breakpoint.
   *
   * @example
   * // returns `@media only screen and (min-width: 768px)`
   * respondUp(breakpoint.sm);
   */
  const respondUp = (breakpoint: BreakPoint[keyof BreakPoint]) =>
    originRespondMore(breakpoint);

  return {
    breakpoint: theme.breakpoint,
    respondTo,
    respondMore,
    respondUp,
    respondDown,
  };
};

export default useMediaQuery;
