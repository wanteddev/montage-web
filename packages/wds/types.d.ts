/// <reference types="@emotion/react/types/css-prop" />
import type { Theme as BaseTheme } from '@/types';

import '@emotion/react';

declare module '@emotion/react' {
  export type Theme = BaseTheme;
}
