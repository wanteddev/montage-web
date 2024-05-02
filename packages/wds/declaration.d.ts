/// <reference types="@emotion/react/types/css-prop" />
import { theme } from '@wanteddev/wds';

import '@emotion/react';

type BaseTheme = typeof theme.light;

declare module '@emotion/react' {
  export interface Theme extends BaseTheme {}
}
