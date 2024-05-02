/// <reference types="@emotion/react/types/css-prop" />

import type { lightTheme } from '@wanteddev/wds-theme';

import '@emotion/react';

type BaseTheme = typeof lightTheme;

declare module '@emotion/react' {
  export interface Theme extends BaseTheme {}
}
