import { createContext } from 'react';
import { type Theme, theme } from '@wanteddev/wds-theme';

const ThemeContext = createContext<Theme>(theme.light);

if (process.env.NODE_ENV !== 'production') {
  ThemeContext.displayName = 'ThemeContext';
}

export default ThemeContext;
