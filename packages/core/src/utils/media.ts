/**
 * `respondTo` has the same function as `respondDown`, and works when it is smaller than the specified breakpoint.
 * The breakpoint must be a `px` value.
 *
 * @example
 * // returns `@media only screen and (max-width: 767px)`
 * respondTo('768px');
 */
export const respondTo = (breakpoint: string) =>
  `@media only screen and (max-width: ${parseInt(breakpoint, 10) - 1}px)`;

/**
 * `respondMore` has the same function as `respondUp`, and works when it is larger than or equal to the specified breakpoint.
 *
 * @example
 * // returns `@media only screen and (min-width: 768px)`
 * respondMore('768px');
 */
export const respondMore = (breakpoint: string) =>
  `@media only screen and (min-width: ${breakpoint})`;

/**
 * `respondDown` has the same function as `respondTo`, and works when it is smaller than the specified breakpoint.
 * The breakpoint must be a `px` value.
 *
 * @example
 * // returns `@media only screen and (max-width: 767px)`
 * respondDown('768px');
 */
export const respondDown = (breakpoint: string) =>
  `@media only screen and (max-width: ${parseInt(breakpoint, 10) - 1}px)`;

/**
 * `respondUp` has the same function as `respondMore`, and works when it is larger than or equal to the specified breakpoint.
 *
 * @example
 * // returns `@media only screen and (min-width: 768px)`
 * respondUp('768px');
 */
export const respondUp = (breakpoint: string) =>
  `@media only screen and (min-width: ${breakpoint})`;
