/// <reference types="@emotion/react/types/css-prop" />
import { lightTheme } from '@wanteddev/wds';

import '@emotion/react';

type BaseTheme = typeof lightTheme;

declare module '@emotion/react' {
  export interface Theme extends BaseTheme {}
}
