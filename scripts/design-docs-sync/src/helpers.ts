import path from 'node:path';
import url from 'node:url';
import fs from 'node:fs';

import type { FigmaNode } from './types';
import type { FrameNode, TextNode } from '@figma/rest-api-spec';

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const chunk = <T>(array: Array<T>, size: number): Array<Array<T>> => {
  const chunks: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const cleanString = (str: string) => {
  return str.replace(/[^a-zA-Z0-9 ]/g, '').trim();
};

export const toKebabCase = (str: string) => {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export const gcd = (a: number, b: number) => (b === 0 ? a : gcd(b, a % b));

export const getImageRatio = (imageNode: FigmaNode) => {
  const node = imageNode as unknown as FrameNode;

  const width = Math.floor(node.absoluteBoundingBox!.width);
  const height = Math.floor(node.absoluteBoundingBox!.height);
  const divisor = gcd(width, height);

  return `${width / divisor} / ${height / divisor}`;
};

export const getComponentDirectory = (name: string, group: string) => {
  return path.join(process.cwd(), '../../docs/data/components', group, name);
};

export const getComponentConfig = async (name: string, group: string) => {
  const configPath = path.join(getComponentDirectory(name, group), 'config.js');

  if (!fs.existsSync(configPath)) {
    return null;
  }

  const absolutePath = path.resolve(configPath);
  const fileUrl = url.pathToFileURL(absolutePath).href;
  const module = await import(fileUrl);

  return module.default || module;
};

export const getComponentImageDirectory = (name: string, group: string) => {
  return path.join(
    process.cwd(),
    '../../docs/public/components',
    group,
    name,
    'design',
  );
};

export const getImageNames = (idx: number) => {
  return idx === 0 ? 'Image.png' : `Image-${idx}.png`;
};

export const getCharacters = (node: FigmaNode) => {
  return (node as unknown as TextNode).characters
    .trim()
    .replace(/^(\n|\t|\s)/, '');
};

export const getDescriptionOfFigure = (figure: FigmaNode) => {
  const figures = figure.children.filter(
    ({ name }) => name === 'Figure' || name === 'Figcaption',
  );

  return figures
    .map((data) => {
      const filteredOptions = data.children.filter(
        ({ type, visible }) => type === 'TEXT' && visible !== false,
      );

      const options: Array<{
        text: string;
        type: 'LINE' | 'NONE';
        depth?: number;
      }> = [];

      filteredOptions.forEach((option) => {
        const text = getCharacters(option);
        const textNode = option as unknown as TextNode;

        if (textNode.lineTypes.some((type) => type !== 'NONE')) {
          if (text.includes('\n')) {
            const splitText = text.split('\n');

            splitText.forEach((line, index) => {
              options.push({
                text: line,
                type: 'LINE',
                depth: textNode.lineIndentations[index] ?? 0,
              });
            });
          } else {
            options.push({ text, type: 'LINE' });
          }
        } else {
          options.push({ text, type: 'NONE' });
        }
      });

      if (options.length > 1) {
        return options
          .map(({ text, type, depth }) => {
            if (type === 'LINE') {
              return `${'  '.repeat(depth ?? 0)}- ${text}`;
            }

            return text;
          })
          .join('\n');
      } else {
        return options.at(0)?.text ?? '';
      }
    })
    .filter(Boolean)
    .join('\n');
};
