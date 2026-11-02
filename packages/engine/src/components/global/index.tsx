import { Global as StyleEngineGlobal } from '@emotion/react';

import { useTheme } from '../../hooks';
import { interpolationTheme } from '../../utils';

import type { Interpolation } from '@emotion/react';
import type { Theme } from '@montage-ui/theme';

type Props = {
  styles: Interpolation<Theme>;
};

const Global = ({ styles }: Props) => {
  const theme = useTheme();

  return <StyleEngineGlobal styles={interpolationTheme(styles, theme)} />;
};

export { Global };
