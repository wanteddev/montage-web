import { css } from '@wanteddev/wds-engine';

import {
  addOpacity,
  ellipsisTypographyStyle,
  typographyStyle,
} from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { SegmentedControlProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const segmentedControlStyle =
  ({ variant, size, xs, sm, md, lg, xl }: SegmentedControlProps) =>
  (theme: Theme) => css`
    position: relative;
    width: 100%;

    ${segmentedControlSizeStyle({ size, variant })}
    ${segmentedControlVariantStyle({ variant }, theme)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${segmentedControlSizeStyle({ variant, size: params?.size })}
        ${params?.sx}
      `,
    )}
  `;

const segmentedControlVariantStyle = (
  { variant }: SegmentedControlProps,
  theme: Theme,
) => {
  switch (variant) {
    case 'outlined':
      return css`
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.normal};
      `;
    case 'solid':
    default:
      return css`
        background-color: ${theme.semantic.fill.normal};
      `;
  }
};

const segmentedControlSizeStyle = ({
  size,
  variant,
}: SegmentedControlProps) => {
  switch (size) {
    case 'large':
      return css`
        border-radius: 12px;
        height: 48px;

        ${variant === 'solid' &&
        css`
          padding: 3px;

          [data-role='segmented-control-motion'] {
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

          [data-role='segmented-control-motion'] {
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

          [data-role='segmented-control-motion'] {
            border-radius: 6px;
          }
        `}
      `;
  }
};

export const motionThumbStyle = (theme: Theme) => css`
  position: absolute;
  background-color: ${theme.semantic.background.elevated.normal};
  box-shadow: 0px 0px 4px 0px
    ${addOpacity(theme.semantic.static.black, theme.opacity[8])};

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    position: absolute;
    border-radius: inherit;
    background-color: ${addOpacity(
      theme.semantic.static.white,
      theme.opacity[28],
    )};
  }
`;

type SegmentedControlItemStyleProps = {
  active?: boolean;
  disabled?: boolean;
  variant?: SegmentedControlProps['variant'];
  size?: SegmentedControlProps['size'];
} & Pick<SegmentedControlProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

export const segmentedControlItemStyle =
  ({
    size,
    disabled,
    variant,
    xs,
    sm,
    md,
    lg,
    xl,
  }: SegmentedControlItemStyleProps) =>
  (theme: Theme) => css`
    position: relative;
    padding: 0px 16px;
    height: 100%;
    cursor: pointer;
    box-shadow: none;
    border-radius: 0px;
    min-width: 0;

    [data-role='segmented-control-item-text'] {
      font: inherit;
      display: block;
      ${ellipsisTypographyStyle(1)}
    }

    & > :not([data-role='segmented-control-item-text']) {
      flex-shrink: 0;
    }

    ${disabled &&
    css`
      cursor: initial;
    `}

    ${segmentedControlItemActiveStyle({ variant }, theme)}
    ${segmentedControlItemSizeStyle({ size, variant })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${segmentedControlItemSizeStyle({ size: params?.size, variant })}
      `,
    )}
  `;

const segmentedControlItemSizeStyle = ({
  size,
  variant,
}: SegmentedControlItemStyleProps) => {
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
        ${typographyStyle('body2', 'medium')}
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

const segmentedControlItemActiveStyle = (
  { variant }: SegmentedControlItemStyleProps,
  theme: Theme,
) => {
  switch (variant) {
    case 'solid':
      return css`
        color: ${theme.semantic.label.alternative};
        background-color: transparent;
        box-shadow: none;
        transition: color 0.2s;

        &[data-active='true'] {
          color: ${theme.semantic.label.normal};

          &[data-ssr-motion='true'] {
            & > * {
              z-index: 1;
            }

            box-shadow: 0px 0px 4px 0px
              ${addOpacity(theme.semantic.static.black, theme.opacity[8])};
            position: relative;
            background-color: ${theme.semantic.background.elevated.normal};

            &::before {
              content: '';
              width: 100%;
              height: 100%;
              left: 0px;
              top: 0px;
              position: absolute;
              border-radius: inherit;
              background-color: ${addOpacity(
                theme.semantic.static.white,
                theme.opacity[28],
              )};
            }
          }
        }
      `;
    case 'outlined':
      return css`
        color: ${theme.semantic.label.alternative};
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
          border-right: 1px solid ${theme.semantic.line.normal.normal};
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
            theme.semantic.primary.normal,
            theme.opacity[5],
          )};
          color: ${theme.semantic.primary.normal};
          border: 1px solid
            ${addOpacity(theme.semantic.primary.normal, theme.opacity[43])};

          &::after {
            border: none;
          }
        }
      `;
  }
};
