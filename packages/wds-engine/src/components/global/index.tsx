import { Global as StyleEngineGlobal } from '@emotion/react';

import { useTheme } from '../../hooks';
import { interpolationTheme } from '../../utils';

import type { Theme } from '@wanteddev/wds-theme';
import type { Interpolation } from '@emotion/react';

type Props = {
  styles: Interpolation<Theme>;
};

const Global = ({ styles }: Props) => {
  const theme = useTheme();

  return <StyleEngineGlobal styles={interpolationTheme(styles, theme)} />;
};

export { Global };
