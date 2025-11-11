import fs from 'node:fs';
import path from 'node:path';

import { darkOriginTheme, lightOriginTheme } from '@wanteddev/wds-engine';

import reset from './reset.mjs';

const isHexColor = (value) => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})/i.test(value);

const isHexWithOpacity = (hexColor) =>
  /^#([a-f0-9]{8}|[a-f0-9]{4})\b/i.test(hexColor);

const hexToRgb = (hexColor) => {
  const parsedColor = hexColor.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_, r, g, b) => r + r + g + g + b + b,
  );

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(parsedColor);

  if (result && result.length > 2) {
    return `${parseInt(result[1] || '', 16)}, ${parseInt(
      result[2] || '',
      16,
    )}, ${parseInt(result[3] || '', 16)}`;
  }

  return null;
};

const generateVariable = (token, value) => {
  if (token.includes('platform')) {
    return '';
  }

  if (!isHexColor(value)) {
    return `--${token}: ${value};`;
  }

  return `--${token}: ${value};
  --${token}-rgb: ${
    isHexWithOpacity(value) ? hexToRgb(value.slice(0, 7)) : hexToRgb(value)
  };`;
};

const objectToCssKey = (object, prefix) =>
  Object.entries(object).map((v) => {
    if (typeof v[1] !== 'object') {
      return generateVariable(`${prefix}-${v[0]}`, v[1]);
    }

    return objectToCssKey(v[1], `${prefix}-${v[0]}`);
  });

const light = [
  ...objectToCssKey(lightOriginTheme.atomic, 'atomic'),
  ...objectToCssKey(lightOriginTheme.semantic, 'semantic'),
].flat(Infinity);
const dark = [
  ...objectToCssKey(darkOriginTheme.atomic, 'atomic'),
  ...objectToCssKey(darkOriginTheme.semantic, 'semantic'),
].flat(Infinity);

const content = `:root {
  ${light.join('\n  ')}
}

html[data-theme='dark'] {
  ${dark.join('\n  ')}
}
`;

fs.writeFile(
  path.join(path.dirname(import.meta.dirname), 'dist', 'reset.css'),
  reset,
  () => {
    console.log('Build done by reset.css');
  },
);

fs.writeFile(
  path.join(path.dirname(import.meta.dirname), 'dist', 'theme.css'),
  content,
  () => {
    console.log('Build done by theme.css');
  },
);

fs.writeFile(
  path.join(path.dirname(import.meta.dirname), 'dist', 'global.css'),
  `${reset}

${content}`,
  () => {
    console.log('Build done by global.css(include reset.css, theme.css)');
  },
);
