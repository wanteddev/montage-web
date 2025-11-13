import { css } from '@wanteddev/wds-engine';
import objectPath from 'object-path';

import { addOpacity } from './color';

import type { Theme, ThemeShadowToken } from '@wanteddev/wds-engine';

export type FramedStyleParams = {
  invalid?: boolean;
  disabled?: boolean;
  selected?: boolean;
  shadow?: ThemeShadowToken;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
};

export const framedStyle = (params?: FramedStyleParams) => (theme: Theme) => {
  const {
    shadow = 'semantic.elevation.shadow.normal.xsmall',
    size = 'medium',
    invalid,
    disabled,
    selected,
  } = params ?? {};

  const givenShadow = objectPath.get(theme, shadow);
  const boxShadow = givenShadow
    ? givenShadow
    : theme.semantic.elevation.shadow.normal.xsmall;

  return css`
    ${getSizeStyle(size)}
    ${getShadowStyle({ base: boxShadow, invalid, selected }, theme)}

    background-color: transparent;
    display: flex;
    padding: var(--wds-framed-style-vertical-padding)
      var(--wds-framed-style-horizontal-padding);
    border-radius: var(--wds-framed-style-border-radius);
    position: relative;
    width: fit-content;
    height: fit-content;

    & > * {
      position: relative;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 1;
      pointer-events: none;
      border-radius: inherit;
      z-index: 0;
      transition: opacity 0.15s ease;
      transition: box-shadow ease 0.2s;
    }

    ${disabled &&
    css`
      &::before {
        opacity: ${theme.opacity[43]};
      }
    `}
  `;
};

const getSizeStyle = (size: FramedStyleParams['size']) => {
  switch (size) {
    case 'small':
      return css`
        --wds-framed-style-border-radius: 12px;
        --wds-framed-style-vertical-padding: 4px;
        --wds-framed-style-horizontal-padding: 12px;
      `;
    case 'medium':
    default:
      return css`
        --wds-framed-style-border-radius: 14px;
        --wds-framed-style-vertical-padding: 4px;
        --wds-framed-style-horizontal-padding: 16px;
      `;
    case 'large':
      return css`
        --wds-framed-style-border-radius: 16px;
        --wds-framed-style-vertical-padding: 4px;
        --wds-framed-style-horizontal-padding: 20px;
      `;
    case 'xlarge':
      return css`
        --wds-framed-style-border-radius: 20px;
        --wds-framed-style-vertical-padding: 8px;
        --wds-framed-style-horizontal-padding: 24px;
      `;
  }
};

const getShadowStyle = (
  {
    base,
    invalid,
    selected,
  }: { base: string } & Pick<FramedStyleParams, 'invalid' | 'selected'>,
  theme: Theme,
) => {
  if (invalid) {
    return css`
      &::before {
        box-shadow:
          ${base},
          inset 0 0 0 1px
            ${addOpacity(theme.semantic.status.negative, theme.opacity[28])};
      }
    `;
  }

  if (selected) {
    return css`
      &::before {
        box-shadow:
          ${base},
          inset 0 0 0 2px
            ${addOpacity(theme.semantic.primary.normal, theme.opacity[43])},
          inset 0 0 0 2px ${theme.semantic.background.normal.normal};
      }
    `;
  }

  return css`
    &::before {
      box-shadow:
        ${base},
        inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
    }
  `;
};
