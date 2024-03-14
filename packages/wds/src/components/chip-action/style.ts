import { css } from '@emotion/react';

import { typographyStyle } from '@/utils/typography';
import { createResponsiveStyle } from '@/utils';

import type { ChipActionProps } from './types';
import type { Theme } from '@emotion/react';

export const actionStyle =
  ({ xs, sm, md, lg, ...props }: ChipActionProps) =>
  (theme: Theme) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    box-sizing: border-box;
    line-height: initial;
    white-space: nowrap;
    cursor: pointer;
    width: fit-content;

    &:disabled {
      pointer-events: none;
      cursor: not-allowed;
    }

    ${actionVariantStyle(props, theme)}
    ${actionSizeStyle(props)}

  ${createResponsiveStyle(
      { xs, sm, md, lg },
      theme,
    )(
      (params) => css`
        ${actionSizeStyle(params)}
        ${params?.css}
      `,
    )}
  `;

const actionSizeStyle = ({ size }: ChipActionProps = {}) => {
  switch (size) {
    case 'large':
      return css`
        border-radius: 8px;
        padding: 9px 16px;
        gap: 8px;

        & > svg {
          font-size: 16px;
        }
        & > span {
          ${typographyStyle('body2_normal', 'medium')}
        }
      `;
    case 'medium':
      return css`
        border-radius: 6px;
        padding: 6px 12px;
        gap: 4px;

        & > svg {
          font-size: 14px;
        }
        & > span {
          ${typographyStyle('label1_normal', 'medium')}
        }
      `;
    case 'small':
      return css`
        border-radius: 4px;
        padding: 4px 9px;
        gap: 4px;

        & > svg {
          font-size: 12px;
        }
        & > span {
          ${typographyStyle('caption1', 'medium')}
        }
      `;
  }
};

const actionVariantStyle = (
  { variant }: ChipActionProps = {},
  theme: Theme,
) => {
  switch (variant) {
    case 'filled':
      return css`
        color: ${theme.palette.label.normal};
        background-color: ${theme.palette.fill.alternative};
        border: none;

        &:disabled {
          color: ${theme.palette.label.assistive};
          background-color: ${theme.palette.fill.alternative};
          border: none;
        }
      `;
    case 'outlined':
      return css`
        color: ${theme.palette.label.normal};
        background-color: transparent;
        border: 1px solid ${theme.palette.line.normal.normal};

        &:disabled {
          color: ${theme.palette.label.disable};
          background-color: transparent;
          border: 1px solid ${theme.palette.line.normal.alternative};
        }
      `;
  }
};
