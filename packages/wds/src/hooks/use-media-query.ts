import { useTheme } from '@wanteddev/wds-engine';

import {
  respondMore as originRespondMore,
  respondTo as originRespondTo,
} from '../utils';

import type { BreakPoint } from '@wanteddev/wds-engine';

const useMediaQuery = () => {
  const theme = useTheme();

  /**
   * @description `respondDown` 와 같은 역할을 하며 지정한 breakpoint 보다 작을 때 동작합니다.
   *
   * @example
   * // returns `@media screen and (max-width: 767px)`
   * respondTo('768px');
   */
  const respondTo = (breakpoint: BreakPoint[keyof BreakPoint]) =>
    originRespondTo(breakpoint);

  /**
   * @description `respondUp` 와 같은 역할을 하며 지정한 breakpoint 보다 작을 때 동작합니다.
   *
   * @example
   * // returns `@media screen and (min-width: 768px)`
   * respondUp('768px');
   */
  const respondMore = (breakpoint: BreakPoint[keyof BreakPoint]) =>
    originRespondMore(breakpoint);

  /**
   * @description `respondTo` 와 같은 역할을 하며 지정한 breakpoint 보다 작을 때 동작합니다.
   *
   * @example
   * // returns `@media screen and (max-width: 767px)`
   * respondDown('768px');
   */
  const respondDown = (breakpoint: BreakPoint[keyof BreakPoint]) =>
    originRespondTo(breakpoint);

  /**
   * @description `respondMore` 와 같은 역할을 하며 지정한 breakpoint 보다 클 때 동작합니다.
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
