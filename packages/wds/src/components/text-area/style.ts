import { css } from '@emotion/react';

import { createResponsiveStyle, typographyStyle } from '../../utils';

import type { TextAreaProps } from './types';
import type { Theme } from '@emotion/react';

export const textAreaWrapperStyle =
  ({ disabled, invalid }: TextAreaProps) =>
  (theme: Theme) => css`
    border: none;
    box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.normal};
    border-radius: 10px;
    background-color: ${theme.palette.background.normal.normal};

    ${disabled &&
    css`
      background-color: ${theme.palette.interaction.disable};
      cursor: default;
    `}

    ${invalid &&
    css`
      box-shadow: inset 0 0 0 1px ${theme.palette.status.negative};
    `}

    width: fit-content;

    button {
      flex-shrink: 0;
      transition:
        background-color 0.3s ease,
        color 0.3s ease;
    }

    & > div {
      height: var(--wds-text-area-scroll-height);

      & > div {
        display: block !important;
        height: var(--wds-text-area-height);
        overflow: hidden;
      }
    }
  `;

export const textAreaStyle =
  ({ width = 'initial', xs, sm, md, lg, xl }: TextAreaProps) =>
  (theme: Theme) => css`
    height: var(--wds-text-area-height);
    display: flex;
    flex-direction: column;
    width: ${width};
    padding: 12px 16px;
    flex-shrink: 2;
    background-color: transparent;
    outline: none;
    border: none;
    resize: none;
    color: ${theme.palette.label.normal};
    ${typographyStyle('body1_normal', 'regular')}

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::placeholder {
      ${typographyStyle('body1_normal', 'regular')}
      color: ${theme.palette.label.assistive};
    }

    &:focus {
      outline: none;
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${Boolean(params?.width) &&
        css`
          width: ${params!.width};
        `}

        ${params?.css}
      `,
    )}
  `;

export const rightIconStyle = css`
  width: fit-content;
  height: 24px;
  align-items: center;
  position: absolute;
  right: 12px;
  bottom: 12px;

  & [wds-component='icon-button'] {
    margin-right: -4px;
  }

  & [wds-component='text-button'] {
    margin-right: 4px;
    margin-left: 4px;
  }
`;

export const maxLengthStyle = css`
  position: absolute;
  width: fit-content;
  height: fit-content;
  left: 16px;
  bottom: 12px;
`;
