import { css } from '@wanteddev/wds-engine';

import {
  addOpacity,
  createResponsiveStyle,
  ellipsisTypographyStyle,
  typographyStyle,
} from '../../utils';

import type { SegmentControlProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const segmentControlStyle =
  ({ variant, size, xs, sm, md, lg, xl }: SegmentControlProps) =>
  (theme: Theme) => css`
    position: relative;
    width: 100%;

    ${segmentControlSizeStyle({ size, variant })}
    ${segmentControlVariantStyle({ variant }, theme)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${segmentControlSizeStyle({ variant, size: params?.size })}
        ${params?.sx}
      `,
    )}
  `;

const segmentControlVariantStyle = (
  { variant }: SegmentControlProps,
  theme: Theme,
) => {
  switch (variant) {
    case 'outlined':
      return css`
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.normal};
      `;
    case 'solid':
    default:
      return css`
        background-color: ${theme.palette.fill.normal};
      `;
  }
};

const segmentControlSizeStyle = ({ size, variant }: SegmentControlProps) => {
  switch (size) {
    case 'large':
      return css`
        border-radius: 12px;
        height: 48px;

        ${variant === 'solid' &&
        css`
          padding: 3px;

          [data-role='segment-control-motion'] {
            border-radius: 10px;
          }
        `}
      `;
    case 'medium':
      return css`
        border-radius: 10px;
        height: 40px;

        ${variant === 'solid' &&
        css`
          padding: 2px;

          [data-role='segment-control-motion'] {
            border-radius: 8px;
          }
        `}
      `;
    case 'small':
      return css`
        border-radius: 8px;
        height: 32px;

        ${variant === 'solid' &&
        css`
          padding: 2px;

          [data-role='segment-control-motion'] {
            border-radius: 6px;
          }
        `}
      `;
  }
};

export const motionThumbStyle = (theme: Theme) => css`
  position: absolute;
  background-color: ${addOpacity(
    theme.palette.static.white,
    theme.opacity[28],
  )};
  box-shadow: 0px 0px 4px 0px
    ${addOpacity(theme.palette.static.black, theme.opacity[8])};

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    position: absolute;
    border-radius: inherit;
    background-color: ${theme.palette.background.elevated.normal};
  }
`;

type SegmentControlItemStyleProps = {
  active?: boolean;
  disabled?: boolean;
  variant?: SegmentControlProps['variant'];
  size?: SegmentControlProps['size'];
} & Pick<SegmentControlProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

export const segmentControlItemStyle =
  ({
    size,
    disabled,
    variant,
    xs,
    sm,
    md,
    lg,
    xl,
  }: SegmentControlItemStyleProps) =>
  (theme: Theme) => css`
    position: relative;
    padding: 0px 16px;
    height: 100%;
    cursor: pointer;
    box-shadow: none;
    border-radius: 0px;
    min-width: 0;

    [data-role='segment-control-item-text'] {
      font: inherit;
      display: block;
      ${ellipsisTypographyStyle(1)}
    }

    & > :not([data-role='segment-control-item-text']) {
      flex-shrink: 0;
    }

    ${disabled &&
    css`
      cursor: initial;
    `}

    ${segmentControlItemActiveStyle({ variant }, theme)}
    ${segmentControlItemSizeStyle({ size, variant })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${segmentControlItemSizeStyle({ size: params?.size, variant })}
      `,
    )}
  `;

const segmentControlItemSizeStyle = ({
  size,
  variant,
}: SegmentControlItemStyleProps) => {
  switch (size) {
    case 'large':
      return css`
        ${typographyStyle('headline2', 'medium')}
        padding: 12px 8px;

        svg {
          font-size: 20px;
        }

        ${variant === 'solid'
          ? css`
              border-radius: 10px;
              padding: 9px 8px;
            `
          : css`
              &:first-of-type {
                border-radius: 12px 0px 0px 12px;
              }

              &:last-of-type {
                border-radius: 0px 12px 12px 0px;
              }
            `}
      `;
    case 'medium':
      return css`
        ${typographyStyle('body2_normal', 'medium')}
        padding: 9px 8px;

        svg {
          font-size: 18px;
        }

        ${variant === 'solid'
          ? css`
              border-radius: 8px;
              padding: 7px 8px;
            `
          : css`
              &:first-of-type {
                border-radius: 10px 0px 0px 10px;
              }

              &:last-of-type {
                border-radius: 0px 10px 10px 0px;
              }
            `}
      `;
    case 'small':
      return css`
        ${typographyStyle('label2', 'medium')}
        padding: 7px 6px;

        svg {
          font-size: 14px;
        }

        ${variant === 'solid'
          ? css`
              border-radius: 6px;
              padding: 5px 6px;
            `
          : css`
              &:first-of-type {
                border-radius: 8px 0px 0px 8px;
              }
              &:last-of-type {
                border-radius: 0px 8px 8px 0px;
              }
            `}
      `;
  }
};

const segmentControlItemActiveStyle = (
  { variant }: SegmentControlItemStyleProps,
  theme: Theme,
) => {
  switch (variant) {
    case 'solid':
      return css`
        color: ${theme.palette.label.alternative};
        background-color: transparent;
        box-shadow: none;
        transition: color 0.2s;

        &[data-active='true'] {
          color: ${theme.palette.label.normal};

          &[data-ssr-motion='true'] {
            box-shadow: 0px 0px 4px 0px
              ${addOpacity(theme.palette.static.black, theme.opacity[8])};
            background-color: ${theme.palette.background.elevated.normal};
            position: relative;

            &::before {
              content: '';
              width: 100%;
              height: 100%;
              left: 0px;
              top: 0px;
              position: absolute;
              border-radius: inherit;
              background-color: ${addOpacity(
                theme.palette.static.white,
                theme.opacity[28],
              )};
              z-index: -1;
            }
          }
        }
      `;
    case 'outlined':
      return css`
        color: ${theme.palette.label.alternative};
        background-color: transparent;
        box-shadow: none;
        border: 1px solid transparent;
        transition: none;

        &::after {
          content: '';
          width: calc(100% + 1px);
          height: 100%;
          left: 0px;
          top: 0px;
          position: absolute;
          border-radius: inherit;
          border-right: 1px solid ${theme.palette.line.normal.normal};
          box-sizing: content-box;
        }

        &:last-of-type {
          &::after {
            border-color: transparent;
          }
        }

        &:has(+ [data-active='true']) {
          &::after {
            border-color: transparent;
          }
        }

        &[data-active='true'] {
          background-color: ${addOpacity(
            theme.palette.primary.normal,
            theme.opacity[5],
          )};
          color: ${theme.palette.primary.normal};
          border: 1px solid
            ${addOpacity(theme.palette.primary.normal, theme.opacity[43])};

          &::after {
            border: none;
          }
        }
      `;
  }
};
