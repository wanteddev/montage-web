import { css } from '@emotion/react';

import { typographyStyle } from '@/utils/typography';
import { createResponsiveStyle } from '@/utils';

import type { Theme } from '@emotion/react';
import type { TextButtonProps } from './types';

export const textButtonStyle =
  ({ xs, sm, md, lg, ...props }: TextButtonProps) =>
  (theme: Theme) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    box-sizing: border-box;
    line-height: initial;
    white-space: nowrap;
    height: fit-content;
    cursor: pointer;

    &:disabled {
      pointer-events: none;
      cursor: not-allowed;
    }

    ${getColorTheme(props, theme)}
    ${textButtonSizeStyle(props)}

  ${createResponsiveStyle(
      { xs, sm, md, lg },
      theme,
    )(
      (params = {}) => css`
        ${getColorTheme(params, theme)}
        ${textButtonSizeStyle(params)}
      `,
    )}
  `;

const getColorTheme = ({ color }: TextButtonProps, theme: Theme) => {
  switch (color) {
    case 'primary':
      return css`
        color: ${theme.palette.primary.normal};
        background-color: transparent;
        border: none;

        &:disabled {
          color: ${theme.palette.label.disable};
        }
      `;
    case 'assistive':
      return css`
        background-color: transparent;
        border: none;
        color: ${theme.palette.label.alternative};

        &:disabled {
          color: ${theme.palette.label.disable};
        }
      `;
  }
};

const textButtonSizeStyle = ({ size }: TextButtonProps) => {
  switch (size) {
    case 'medium':
      return css`
        gap: 4px;
        border-radius: 5px;
        padding: 4px 0px;

        & > [wds-component='with-interaction'] {
          width: calc(100% + 14px);
          height: 100%;
        }

        & > svg {
          font-size: 20px;
        }
        & > span {
          ${typographyStyle('body1_normal', 'bold')}
        }
      `;
    case 'small':
      return css`
        gap: 4px;
        border-radius: 5px;
        padding: 4px 0px;

        & > [wds-component='with-interaction'] {
          width: calc(100% + 12px);
          height: 100%;
        }

        & > svg {
          font-size: 16px;
        }
        & > span {
          ${typographyStyle('label1_normal', 'bold')}
        }
      `;
  }
};
