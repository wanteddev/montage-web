import breakpoint from './breakpoint';
import opacity from './opacity';
import { darkPalette, lightPalette } from './palette';
import spacing from './spacing';
import zIndex from './zIndex';

export const lightTheme = {
  palette: lightPalette,
  opacity,
  breakpoint,
  spacing,
  zIndex,
  platform: {
    ios: {
      navigation: `
        background-color: rgba(var(--palette-background-elevated-normal-rgb), 0.8);
        backdrop-filter: blur(32px);
      `,
    },
  },
};

export const darkTheme = {
  palette: darkPalette,
  opacity,
  breakpoint,
  spacing,
  zIndex,
  platform: {
    ios: {
      navigation: `
        background-color: rgba(var(--palette-background-elevated-normal-rgb), 0.75);
        backdrop-filter: blur(32px);
      `,
    },
  },
};

export const theme = {
  dark: darkTheme,
  light: lightTheme,
};

export { lightValues, darkValues } from './palette';
