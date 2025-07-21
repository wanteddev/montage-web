import { theme } from '../theme';

import { addHexOpacity, getColorByToken } from '.';

describe('addHexOpacity', () => {
  it('should add hex opacity to a hex color', () => {
    expect(addHexOpacity('#000000', 0.5)).toBe('#00000080');
    expect(addHexOpacity('#FF0000', 1.0)).toBe('#FF0000FF');
    expect(addHexOpacity('#00FF00', 0.0)).toBe('#00FF0000');
    expect(addHexOpacity('#0000FF', 0.25)).toBe('#0000FF40');
    expect(addHexOpacity('#FFFFFF', 0.75)).toBe('#FFFFFFBF');
    expect(addHexOpacity('#123456', 0.33)).toBe('#12345654');
    expect(addHexOpacity('#ABCDEF', 0.67)).toBe('#ABCDEFAB');
  });

  it('should handle edge case opacity values', () => {
    expect(addHexOpacity('#000000', 0.001)).toBe('#00000000');
    expect(addHexOpacity('#FFFFFF', 0.999)).toBe('#FFFFFFFF');
  });
});

describe('getColorByToken', () => {
  it('should return color value for valid token', () => {
    expect(getColorByToken(theme.light, 'semantic.primary.normal')).toBe(
      theme.light.semantic.primary.normal,
    );
    expect(getColorByToken(theme.dark, 'semantic.label.normal')).toBe(
      theme.light.semantic.label.normal,
    );

    expect(
      getColorByToken(theme.light, 'semantic.background.elevated.alternative'),
    ).toBe(theme.light.semantic.background.elevated.alternative);
    expect(
      getColorByToken(theme.dark, 'semantic.accent.background.redOrange'),
    ).toBe(theme.light.semantic.accent.background.redOrange);
  });

  it('should return undefined for invalid token', () => {
    // @ts-expect-error
    expect(getColorByToken(theme.light, 'invalid.token')).toBeUndefined();
    // @ts-expect-error
    expect(getColorByToken(theme.dark, 'semantic.invalid')).toBeUndefined();
  });
});
