import { Fragment, useMemo } from 'react';
import { theme } from '@wanteddev/wds-theme';

import ThemeContext from '../../context';

import type { Theme } from '@wanteddev/wds-theme';
import type { JSX, ReactNode } from 'react';

type Props = {
  theme?: 'light' | 'dark';
  children: ReactNode;
  provider?: (props: { theme: Theme; children: ReactNode }) => JSX.Element;
};

const ThemeProvider = ({
  theme: localTheme = 'light',
  children,
  provider,
}: Props) => {
  const engineTheme = useMemo(() => {
    switch (localTheme) {
      case 'light':
        return theme.light;
      case 'dark':
        return theme.dark;
      default: {
        console.error('WDS: 올바른 Theme 값을 설정했는지 확인이 필요합니다.');
      }
    }
  }, [localTheme]);

  const Provider = provider ?? Fragment;

  return (
    <ThemeContext.Provider value={engineTheme!}>
      {Boolean(provider) ? (
        <Provider theme={engineTheme!}>{children}</Provider>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
