import { darkOriginTheme, lightOriginTheme } from '@wanteddev/wds-theme';
import { useMemo } from 'react';

import ThemeContext from '../../context';

import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  theme: 'light' | 'dark';
}>;

const ForceTheme = ({ theme: localTheme, children }: Props) => {
  const engineTheme = useMemo(() => {
    switch (localTheme) {
      case 'light':
        return lightOriginTheme;
      case 'dark':
        return darkOriginTheme;
      default: {
        console.error('WDS: 올바른 Theme 값을 설정했는지 확인이 필요합니다.');
      }
    }
  }, [localTheme]);

  return (
    <ThemeContext.Provider value={engineTheme!}>
      {children}
    </ThemeContext.Provider>
  );
};

ForceTheme.displayName = 'ForceTheme';

export default ForceTheme;
