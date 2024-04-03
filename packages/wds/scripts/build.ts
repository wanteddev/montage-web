import fs from 'node:fs';
import path from 'node:path';

import flattenDeep from 'lodash.flattendeep';

import { darkSemantic, lightSemantic } from '../src/theme/palette';
import * as atomic from '../src/theme/colors';

import reset from './reset';

const isHexColor = (value: string) =>
  /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})/i.test(value);

const isHexWithOpacity = (hexColor: string) =>
  /#([a-f0-9]{8}|[a-f0-9]{4})\b/i.test(hexColor);

const hexToRgb = (hexColor: string) => {
  const parsedColor = hexColor.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_, r: string, g: string, b: string) => r + r + g + g + b + b,
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

const generateVariable = (token: string, value: string) => {
  if (!isHexColor(value)) {
    return `--${token}: ${value};`;
  }

  return `--${token}: ${value};
  --${token}-rgb: ${
    isHexWithOpacity(value) ? hexToRgb(value.slice(0, 7)) : hexToRgb(value)
  };`;
};

type Entries<T> = Array<
  {
    [K in keyof T]: [K, T[K]];
  }[keyof T]
>;

const objectToCssKey = <T extends object>(
  object: T,
  prefix: string,
): Array<unknown> =>
  Object.entries(object).map((v: Entries<T>) => {
    if (typeof v[1] !== 'object') {
      return generateVariable(`${prefix}-${v[0]}`, v[1] as unknown as string);
    }

    return objectToCssKey(v[1], `${prefix}-${v[0]}`);
  });

const light = flattenDeep(objectToCssKey(lightSemantic, 'palette'));
const dark = flattenDeep(objectToCssKey(darkSemantic, 'palette'));

const basic = flattenDeep(objectToCssKey(atomic, 'palette'));

const content = `:root {
  ${basic.join('\n  ')}

  ${light.join('\n  ')}
}

html[data-theme='dark'] {
  ${dark.join('\n  ')}
}
`;

fs.writeFile(
  path.join(path.dirname(__dirname), '/dist/reset.css'),
  reset,
  () => {
    console.log('Done reset css');
  },
);

fs.writeFile(
  path.join(path.dirname(__dirname), '/dist/theme.css'),
  content,
  () => {
    console.log('Done theme css');
  },
);
