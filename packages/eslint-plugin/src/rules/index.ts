import iconButtonUsesName from './icon-button-uses-name';
import imageUsesAlt from './image-uses-alt';
import segmentedControlItemUsesName from './segmented-control-item-uses-name';

import type { ESLint } from 'eslint';

const rules = {
  'image-uses-alt': imageUsesAlt,
  'icon-button-uses-name': iconButtonUsesName,
  'segmented-control-item-uses-name': segmentedControlItemUsesName,
} satisfies ESLint.Plugin['rules'];

export default rules;
