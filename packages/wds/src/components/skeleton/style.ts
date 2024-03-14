import { css } from '@emotion/react';

import { createResponsiveStyle } from '@/utils';

import type { SkeletonProps } from './types';
import type { Theme } from '@emotion/react';

export const skeletonStyle =
  ({ xs, sm, md, lg, ...props }: SkeletonProps) =>
  (theme: Theme) => css`
    background-color: ${theme.palette.fill.normal};
    margin: 2px 0px;
    border-radius: 3px;
    ${skeletonSizeStyle(props)}

    ${createResponsiveStyle(
      { xs, sm, md, lg },
      theme,
    )(
      (params) => css`
        ${skeletonSizeStyle(params || {})}
        ${params?.css}
      `,
    )}
  `;

const skeletonSizeStyle = ({ width, height }: SkeletonProps) => css`
  ${Boolean(width) &&
  css`
    width: ${width};
  `}

  ${Boolean(height) &&
  css`
    height: ${height};
  `}
`;
