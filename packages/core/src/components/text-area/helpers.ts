import type { CSSProperties } from 'react';
import type { TextAreaProps } from './types';

// Height before the client measures the textarea (SSR / first paint). The
// textarea has no vertical padding, so `minRows` lines of the size's
// line-height (`--text-area-line-height`, set per size and breakpoint by the
// wrapper style) is exactly what the measurement will produce.
export const getTextAreaDefaultHeight = ({
  minRows = 2,
}: Pick<TextAreaProps, 'minRows'>) => {
  const height = `calc(${minRows} * var(--text-area-line-height))`;

  return {
    '--text-area-scroll-height': height,
    '--text-area-height': height,
  } as CSSProperties;
};
