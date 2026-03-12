import { darkOriginTheme, lightOriginTheme, theme } from '.';

describe('when dark and light themes are given', () => {
  it('should return same css variables', () => {
    expect(theme.light).toEqual(theme.dark);
  });
});

describe('when dark origin theme and light origin theme are given', () => {
  it('should return different hex values', () => {
    expect(lightOriginTheme).not.toEqual(darkOriginTheme);
  });
});
