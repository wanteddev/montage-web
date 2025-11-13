export const hexToRgbaSlash = (hexColor: string) => {
  const hex = hexColor.replace(/^#/, '');

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  let a = 1;
  if (hex.length > 6) {
    const alphaHex = hex.slice(6);
    a = parseInt(alphaHex, 16) / 255;
  }

  const alphaRounded = Math.round(a * 100) / 100;

  return `${r}/${g}/${b}/${alphaRounded}`;
};

export const rgbaToHex = (rgbaColor: string) => {
  const [r = 0, g = 0, b = 0, a = 1] = rgbaColor
    .replace(/^rgba\(/, '')
    .replace(/\)$/, '')
    .split(', ')
    .map(Number);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${
    a !== 1
      ? Math.round(a * 255)
          .toString(16)
          .padStart(2, '0')
      : ''
  }`;
};
