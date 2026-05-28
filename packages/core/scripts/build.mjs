import fs from 'node:fs';
import path from 'node:path';

import { darkOriginTheme, lightOriginTheme } from '@montage-ui/engine';

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

const toCssVarSegment = (key) => key.replace(/\./g, '_');

const objectToCssKey = (object, prefix) =>
  Object.entries(object).map((v) => {
    const segment = toCssVarSegment(v[0]);
    if (typeof v[1] !== 'object') {
      return generateVariable(`${prefix}-${segment}`, v[1]);
    }

    return objectToCssKey(v[1], `${prefix}-${segment}`);
  });

const themeInvariant = [
  ...objectToCssKey(lightOriginTheme.primitive, 'primitive'),
  ...objectToCssKey(lightOriginTheme.opacity, 'opacity'),
  ...objectToCssKey(lightOriginTheme.spacing, 'spacing'),
  ...objectToCssKey(lightOriginTheme.radius, 'radius'),
  ...objectToCssKey(lightOriginTheme.dimension, 'dimension'),
  ...objectToCssKey(lightOriginTheme.zIndex, 'zIndex'),
].flat(Infinity);
const light = [
  ...objectToCssKey(lightOriginTheme.atomic, 'atomic'),
  ...objectToCssKey(lightOriginTheme.semantic, 'semantic'),
].flat(Infinity);
const dark = [
  ...objectToCssKey(darkOriginTheme.atomic, 'atomic'),
  ...objectToCssKey(darkOriginTheme.semantic, 'semantic'),
].flat(Infinity);

const content = `:root {
  ${[...themeInvariant, ...light].join('\n  ')}
}

html[data-theme='dark'] {
  ${dark.join('\n  ')}
}
`;

const dts = `export {}`;

const buildPath = (url) =>
  path.join(path.dirname(import.meta.dirname), 'dist', url);

fs.writeFileSync(buildPath('reset.css'), reset);

fs.writeFileSync(buildPath('reset.css.d.ts'), dts);

fs.writeFileSync(buildPath('theme.css'), content);

fs.writeFileSync(buildPath('theme.css.d.ts'), dts);

fs.writeFileSync(
  buildPath('global.css'),
  `${reset}

${content}`,
);

fs.writeFileSync(buildPath('global.css.d.ts'), dts);
