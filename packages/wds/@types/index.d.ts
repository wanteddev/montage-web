/// <reference types="@emotion/react/types/css-prop" />
/// <reference types="csstype" />

import type { lightTheme } from '../src/theme';

import '@emotion/react';

type BaseTheme = typeof lightTheme;

declare module '@emotion/react' {
  export interface Theme extends BaseTheme {}
}
