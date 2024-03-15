/// <reference types="@emotion/react/types/css-prop" />
import { lightTheme, darkTheme } from '@wanteddev/wds';

import '@emotion/react';

type BaseTheme = typeof lightTheme | typeof darkTheme;

declare module '@emotion/react' {
  export interface Theme extends BaseTheme {}
}
