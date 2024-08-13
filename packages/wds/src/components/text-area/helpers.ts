import type { CSSProperties } from 'react';
import type { TextAreaProps } from './types';

const DEFAULT_LINE_HEIGHT = 26;

// ssr
export const getTextAreaDefaultHeight = ({
  minRows = 2,
}: Pick<TextAreaProps, 'minRows'>) => {
  return {
    '--wds-text-area-scroll-height': minRows * DEFAULT_LINE_HEIGHT,
    '--wds-text-area-height': minRows * DEFAULT_LINE_HEIGHT,
  } as CSSProperties;
};
