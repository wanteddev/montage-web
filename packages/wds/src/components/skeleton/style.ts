import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils/responsive-props';

import type { SkeletonProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const skeletonStyle =
  ({ xs, sm, md, lg, xl, ...props }: SkeletonProps) =>
  (theme: Theme) => css`
    position: relative;
    flex-shrink: 0;

    & > span {
      border-radius: inherit;
      display: block;
      width: 100%;
      height: 100%;
    }

    ${skeletonVariantStyle(props, theme)}
    ${skeletonSizeStyle(props)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${skeletonSizeStyle(params || {})}
        ${params?.sx}
      `,
    )}
  `;

const skeletonSizeStyle = ({
  width,
  height,
}: Pick<SkeletonProps, 'width' | 'height'>) => css`
  ${Boolean(width) &&
  css`
    width: ${width};
  `}

  ${Boolean(height) &&
  css`
    height: ${height};
  `}
`;

const skeletonVariantStyle = (
  { variant, radius = 'initial' }: Pick<SkeletonProps, 'variant' | 'radius'>,
  theme: Theme,
) => {
  switch (variant) {
    case 'text':
      return css`
        padding: 2px 0px;
        border-radius: 3px;

        & > span {
          background-color: ${theme.palette.fill.normal};
        }
      `;
    case 'circle':
      return css`
        border-radius: 50%;

        & > span {
          background-color: ${theme.palette.fill.alternative};
        }
      `;
    case 'rectangle':
      return css`
        border-radius: ${radius};

        & > span {
          background-color: ${theme.palette.fill.alternative};
        }
      `;
  }
};
