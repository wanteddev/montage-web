import type { Interpolation } from '@emotion/react';
import type { Theme } from '@montage-ui/theme';

export const interpolationTheme = (
  expressions: Interpolation<Theme>,
  theme: Theme,
): Interpolation<Theme> => {
  if (Array.isArray(expressions)) {
    return expressions.map((expression) =>
      interpolationTheme(expression, theme),
    );
  }

  if (typeof expressions === 'function') {
    return expressions(theme);
  }

  return expressions;
};
