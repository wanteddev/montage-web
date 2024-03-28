export const respondTo = (breakpoint: string) =>
  `@media only screen and (max-width: ${breakpoint})`;

export const respondMore = (breakpoint: string) =>
  `@media only screen and (min-width: ${parseInt(breakpoint, 10) - 1}px)`;
