import {
  IconCircleCheckFill,
  IconCircleCloseFill,
  IconCircleInfoFill,
  IconTriangleExclamationFill,
} from '@montage-ui/icon';

import type { SectionMessageProps } from './types';
import type { ReactNode } from 'react';

export const sectionMessageIconComponent: {
  [key in Exclude<SectionMessageProps['variant'], undefined>]: ReactNode;
} = {
  custom: null,
  positive: <IconCircleCheckFill aria-label="positive" role="img" />,
  negative: <IconCircleCloseFill aria-label="negative" role="img" />,
  cautionary: (
    <IconTriangleExclamationFill aria-label="cautionary" role="img" />
  ),
  info: <IconCircleInfoFill aria-label="info" role="img" />,
};
