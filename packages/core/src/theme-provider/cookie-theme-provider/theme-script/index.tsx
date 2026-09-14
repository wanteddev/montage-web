import { memo } from 'react';

import { THEME_SCRIPT_ATTRIBUTE } from '../constants';

import { buildThemeScript } from './helpers';

import type { ThemeScriptProps } from './types';

const ThemeScript = memo(({ nonce, ...scriptOptions }: ThemeScriptProps) => {
  // https://github.com/pacocoursey/next-themes/issues/387#issuecomment-4181891723
  const scriptProps =
    typeof window === 'undefined'
      ? undefined
      : ({ type: 'application/json' } as const);

  return (
    <script
      suppressHydrationWarning
      {...{ [THEME_SCRIPT_ATTRIBUTE]: '' }}
      nonce={nonce}
      {...scriptProps}
      dangerouslySetInnerHTML={{ __html: buildThemeScript(scriptOptions) }}
    />
  );
});

ThemeScript.displayName = 'ThemeScript';

export default ThemeScript;
