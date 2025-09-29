import { css, getColorByToken, keyframes } from '@wanteddev/wds-engine';
import objectPath from 'object-path';

import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';

import type { SkeletonProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

const pulse = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

export const skeletonStyle =
  ({
    xs,
    sm,
    md,
    lg,
    xl,
    animation,
    opacity: opacityProp = 'opacity.100',
    ...props
  }: SkeletonProps) =>
  (theme: Theme) => {
    const opacity = objectPath.get(theme, opacityProp) as Theme['opacity'];

    return css`
      position: relative;
      flex-shrink: 0;
      width: 100%;

      ${animation &&
      css`
        animation: ${pulse} 2s ease-in-out infinite;
      `}

      & > span {
        border-radius: inherit;
        display: block;
        width: 100%;
        height: 100%;
        opacity: ${opacity};
      }

      ${skeletonVariantStyle(props, theme)}
      ${skeletonSizeStyle(props)}

    ${createResponsiveStyle(
        { xs, sm, md, lg, xl },
        theme,
      )(
        (params) => css`
          ${skeletonSizeStyle({
            ...params,
            variant: props.variant,
          })}
          ${params?.sx}
        `,
      )}
    `;
  };

const skeletonSizeStyle = ({
  variant,
  width,
  height,
}: Pick<SkeletonProps, 'width' | 'height' | 'variant'>) => {
  switch (variant) {
    case 'text':
      return css`
        height: ${toCssValue(height) ?? '22px'};

        > span {
          ${width !== undefined &&
          css`
            width: ${toCssValue(width)};
          `}
        }
      `;
    case 'rectangle':
    case 'circle':
      return css`
        ${width !== undefined &&
        css`
          width: ${toCssValue(width)};
        `}
        ${height !== undefined &&
        css`
          height: ${toCssValue(height)};
        `}
      `;
  }
};

const skeletonVariantStyle = (
  {
    variant,
    align: alignProp,
    color: colorProp,
    radius = 'initial',
  }: Pick<SkeletonProps, 'variant' | 'radius' | 'align' | 'color'>,
  theme: Theme,
) => {
  const color = colorProp ? getColorByToken(theme, colorProp) : colorProp;

  switch (variant) {
    case 'text':
      return css`
        display: inline-flex;
        padding: 2px 0px;
        border-radius: 3px;
        justify-content: ${{
          left: 'flex-start',
          center: 'center',
          right: 'flex-end',
        }[alignProp ?? 'left']};

        & > span {
          display: inline-block;
          background-color: ${color ?? theme.semantic.fill.normal};
        }
      `;
    case 'rectangle':
      return css`
        border-radius: ${toCssValue(radius)};

        & > span {
          background-color: ${color ?? theme.semantic.fill.alternative};
        }
      `;
    case 'circle':
      return css`
        border-radius: 50%;

        & > span {
          background-color: ${color ?? theme.semantic.fill.normal};
        }
      `;
  }
};
