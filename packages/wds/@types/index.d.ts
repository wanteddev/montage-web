/// <reference types="@emotion/react/types/css-prop" />
import type { Theme as BaseTheme } from '../src/types';

import '@emotion/react';

declare module '@emotion/react' {
  // @ts-expect-error
  export type Theme = BaseTheme;
}
