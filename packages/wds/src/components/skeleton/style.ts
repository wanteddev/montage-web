import { css, getColorByToken } from '@wanteddev/wds-engine';
import objectPath from 'object-path';

import { createResponsiveStyle } from '../../utils/responsive-props';

import type { SkeletonProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const skeletonStyle =
  ({ xs, sm, md, lg, xl, ...props }: SkeletonProps) =>
  (theme: Theme) => css`
    position: relative;
    flex-shrink: 0;
    width: 100%;

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
  variant,
  width,
  height,
}: Pick<SkeletonProps, 'width' | 'height' | 'variant'>) => {
  switch (variant) {
    case 'text':
      return css`
        height: ${height ?? '22px'};

        > span {
          ${Boolean(width) &&
          css`
            width: ${width};
          `}
        }
      `;
    case 'rectangle':
    case 'circle':
      return css`
        ${Boolean(width) &&
        css`
          width: ${width};
        `}
        ${Boolean(height) &&
        css`
          height: ${height};
        `}
      `;
  }
};

const skeletonVariantStyle = (
  {
    variant,
    align,
    color: colorProp,
    opacity: opacityProp,
    radius = 'initial',
  }: Pick<SkeletonProps, 'variant' | 'radius' | 'opacity' | 'align' | 'color'>,
  theme: Theme,
) => {
  const color = colorProp ? getColorByToken(theme, colorProp) : colorProp;
  const opacity = opacityProp
    ? objectPath.get(theme, opacityProp)
    : opacityProp;

  switch (variant) {
    case 'text':
      return css`
        display: inline-flex;
        padding: 2px 0px;
        border-radius: 3px;
        text-align: ${align};

        & > span {
          display: inline-block;
          background-color: ${color ?? theme.palette.fill.normal};
          opacity: ${opacity};
        }
      `;
    case 'rectangle':
      return css`
        border-radius: ${radius};

        & > span {
          background-color: ${color ?? theme.palette.fill.alternative};
          opacity: ${opacity};
        }
      `;
    case 'circle':
      return css`
        border-radius: 50%;

        & > span {
          background-color: ${color ?? theme.palette.fill.normal};
          opacity: ${opacity};
        }
      `;
  }
};
