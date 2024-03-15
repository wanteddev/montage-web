/// <reference types="@emotion/react/types/css-prop" />
import type { Theme as BaseTheme } from '@wanteddev/wds';

import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends BaseTheme {}
}
