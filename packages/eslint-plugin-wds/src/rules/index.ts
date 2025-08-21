import iconButtonUsesName from './icon-button-uses-name';
import imageUsesAlt from './image-uses-alt';

import type { ESLint } from 'eslint';

const rules = {
  'image-uses-alt': imageUsesAlt,
  'icon-button-uses-name': iconButtonUsesName,
} satisfies ESLint.Plugin['rules'];

export default rules;
