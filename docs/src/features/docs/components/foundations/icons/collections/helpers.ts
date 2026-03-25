import type { IconMetadata } from '../types';

export const getDescription = (icon: IconMetadata | null) => {
  if (!icon) return null;

  return icon.description.split('\n').at(0);
};

export const getKeywords = (icon: IconMetadata | null) => {
  if (!icon) return null;

  return icon.description
    .split('\n')
    .at(1)
    ?.replace('키워드: ', '')
    .split(', ');
};
