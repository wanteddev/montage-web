import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { TextButtonProps } from './types';

export const textButtonStyle =
  ({ xs, sm, md, lg, xl, ...props }: TextButtonProps) =>
  (theme: Theme) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    box-sizing: border-box;
    line-height: initial;
    white-space: nowrap;
    height: fit-content;
    width: fit-content;
    cursor: pointer;

    &:disabled,
    &[aria-disabled='true'] {
      pointer-events: none;
      cursor: initial;
    }

    ${getColorTheme(props, theme)}
    ${textButtonSizeStyle(props)}

  ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params = {}) => css`
        ${textButtonSizeStyle(params)}
        ${params.sx}
      `,
    )}
  `;

const getColorTheme = ({ variant }: TextButtonProps, theme: Theme) => {
  switch (variant) {
    case 'primary':
      return css`
        color: ${theme.palette.primary.normal};
        background-color: transparent;
        border: none;
        box-shadow: none;

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.palette.label.disable};
        }
      `;
    case 'assistive':
      return css`
        background-color: transparent;
        border: none;
        box-shadow: none;
        color: ${theme.palette.label.alternative};

        &:disabled,
        &[aria-disabled='true'] {
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
        border-radius: 6px;
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
        border-radius: 6px;
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
