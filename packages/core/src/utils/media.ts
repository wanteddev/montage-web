/**
 * `respondDown` has the same function as `respondDown`, and works when it is smaller than the specified breakpoint.
 *
 * @example
 * // returns `@media screen and (max-width: 767px)`
 * respondTo('768px');
 */
export const respondTo = (breakpoint: string) =>
  `@media only screen and (max-width: ${parseInt(breakpoint, 10) - 1}px)`;

/**
 * `respondUp` has the same function as `respondUp`, and works when it is smaller than the specified breakpoint.
 *
 * @example
 * // returns `@media screen and (min-width: 768px)`
 * respondUp('768px');
 */
export const respondMore = (breakpoint: string) =>
  `@media only screen and (min-width: ${breakpoint})`;

/**
 * `respondTo` has the same function as `respondTo`, and works when it is smaller than the specified breakpoint.
 *
 * @example
 * // returns `@media screen and (max-width: 767px)`
 * respondDown('768px');
 */
export const respondDown = (breakpoint: string) =>
  `@media only screen and (max-width: ${parseInt(breakpoint, 10) - 1}px)`;

/**
 * `respondMore` has the same function as `respondMore`, and works when it is larger than the specified breakpoint.
 *
 * @example
 * // returns `@media screen and (min-width: 768px)`
 * respondDown('768px');
 */
export const respondUp = (breakpoint: string) =>
  `@media only screen and (min-width: ${breakpoint})`;
