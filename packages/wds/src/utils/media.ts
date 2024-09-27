/**
 * @description `respondDown` 와 같은 역할을 하며 지정한 breakpoint 보다 작을 때 동작합니다.
 *
 * @example
 * // returns `@media screen and (max-width: 767px)`
 * respondTo('768px');
 */
export const respondTo = (breakpoint: string) =>
  `@media only screen and (max-width: ${parseInt(breakpoint, 10) - 1}px)`;

/**
 * @description `respondUp` 와 같은 역할을 하며 지정한 breakpoint 보다 작을 때 동작합니다.
 *
 * @example
 * // returns `@media screen and (min-width: 768px)`
 * respondUp('768px');
 */
export const respondMore = (breakpoint: string) =>
  `@media only screen and (min-width: ${breakpoint})`;

/**
 * @description `respondTo` 와 같은 역할을 하며 지정한 breakpoint 보다 작을 때 동작합니다.
 *
 * @example
 * // returns `@media screen and (max-width: 767px)`
 * respondDown('768px');
 */
export const respondDown = (breakpoint: string) =>
  `@media only screen and (max-width: ${parseInt(breakpoint, 10) - 1}px)`;

/**
 * @description `respondMore` 와 같은 역할을 하며 지정한 breakpoint 보다 클 때 동작합니다.
 *
 * @example
 * // returns `@media screen and (min-width: 768px)`
 * respondDown('768px');
 */
export const respondUp = (breakpoint: string) =>
  `@media only screen and (min-width: ${breakpoint})`;
