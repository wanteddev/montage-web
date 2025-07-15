import { useTheme } from '@wanteddev/wds-engine';

import {
  respondMore as originRespondMore,
  respondTo as originRespondTo,
} from '../utils';

import type { BreakPoint } from '@wanteddev/wds-engine';

const useMediaQuery = () => {
  const theme = useTheme();

  /**
   * `respondDown` has the same function as `respondDown`, and works when it is smaller than the specified breakpoint.
   *
   * @example
   * // returns `@media screen and (max-width: 767px)`
   * respondTo('768px');
   */
  const respondTo = (breakpoint: BreakPoint[keyof BreakPoint]) =>
    originRespondTo(breakpoint);

  /**
   * `respondUp` has the same function as `respondUp`, and works when it is smaller than the specified breakpoint.
   *
   * @example
   * // returns `@media screen and (min-width: 768px)`
   * respondUp('768px');
   */
  const respondMore = (breakpoint: BreakPoint[keyof BreakPoint]) =>
    originRespondMore(breakpoint);

  /**
   * `respondTo` has the same function as `respondTo`, and works when it is smaller than the specified breakpoint.
   *
   * @example
   * // returns `@media screen and (max-width: 767px)`
   * respondDown('768px');
   */
  const respondDown = (breakpoint: BreakPoint[keyof BreakPoint]) =>
    originRespondTo(breakpoint);

  /**
   * `respondMore` has the same function as `respondMore`, and works when it is larger than the specified breakpoint.
   *
   * @example
   * // returns `@media screen and (min-width: 768px)`
   * respondDown('768px');
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
