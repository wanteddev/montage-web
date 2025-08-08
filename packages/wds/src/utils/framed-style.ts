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
  attributes?: {
    hover?: Array<string> | string;
    focusVisible?: Array<string> | string;
  };
};

export const framedStyle = (params?: FramedStyleParams) => (theme: Theme) => {
  const {
    shadow = 'semantic.elevation.shadow.xsmall',
    size = 'medium',
    attributes = {},
    invalid,
    disabled,
    selected,
  } = params ?? {};

  const givenShadow = objectPath.get(theme, shadow);
  const boxShadow = givenShadow
    ? givenShadow
    : theme.semantic.elevation.shadow.xsmall;

  return css`
    ${getSizeStyle(size)}
    ${getShadowStyle(
      { base: boxShadow, invalid, disabled, selected, attributes },
      theme,
    )}
      background-color: ${theme.semantic.background.normal.normal};
    display: flex;
    padding: var(--wds-framed-style-vertical-padding)
      var(--wds-framed-style-horizontal-padding);
    border-radius: var(--wds-framed-style-border-radius);
    position: relative;
    width: fit-content;
    height: fit-content;
    transition:
      box-shadow ease 0.2s,
      background-color ease 0.2s;

    &:focus-visible {
      outline: none;
    }

    & > * {
      position: relative;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      background-color: ${theme.semantic.label.normal};
      border-radius: inherit;
      z-index: 0;
      transition: opacity 0.15s ease;
    }

    ${disabled
      ? css`
          background-color: ${theme.semantic.interaction.disable};
        `
      : css`
          &:hover {
            &::before {
              opacity: ${theme.opacity[5]};
            }
          }

          ${attributes.hover &&
          css`
            &${attributesSelector(attributes.hover)} {
              &::before {
                opacity: 1;
              }
            }
          `}
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
        --wds-framed-style-vertical-padding: 8px;
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
    disabled,
    selected,
    attributes,
  }: { base: string } & Pick<
    FramedStyleParams,
    'invalid' | 'disabled' | 'selected' | 'attributes'
  >,
  theme: Theme,
) => {
  if (disabled) {
    return css`
      box-shadow:
        ${base},
        inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
    `;
  }

  if (invalid) {
    return css`
      box-shadow:
        ${base},
        inset 0 0 0 1px
          ${addOpacity(theme.semantic.status.negative, theme.opacity[28])};

      &:focus,
      &:focus-visible,
      &[aria-expanded='true'] {
        box-shadow:
          ${base},
          inset 0 0 0 0px transparent,
          0 0 0 2px
            ${addOpacity(theme.semantic.status.negative, theme.opacity[28])},
          0 0 0 2px ${theme.semantic.background.normal.normal};
      }

      ${attributes?.focusVisible &&
      css`
        &${attributesSelector(attributes.focusVisible)} {
          box-shadow:
            ${base},
            inset 0 0 0 0px transparent,
            0 0 0 2px
              ${addOpacity(theme.semantic.status.negative, theme.opacity[28])},
            0 0 0 2px ${theme.semantic.background.normal.normal};
        }
      `}
    `;
  }

  if (selected) {
    return css`
      box-shadow:
        ${base},
        inset 0 0 0 2px
          ${addOpacity(theme.semantic.primary.normal, theme.opacity[43])},
        inset 0 0 0 2px ${theme.semantic.background.normal.normal};

      &:focus,
      &:focus-visible,
      &[aria-expanded='true'] {
        box-shadow:
          ${base},
          inset 0 0 0 2px
            ${addOpacity(theme.semantic.primary.normal, theme.opacity[43])},
          inset 0 0 0 2px ${theme.semantic.background.normal.normal},
          0 0 0 2px
            ${addOpacity(theme.semantic.primary.normal, theme.opacity[22])};
      }

      ${attributes?.focusVisible &&
      css`
        &${attributesSelector(attributes.focusVisible)} {
          box-shadow:
            ${base},
            inset 0 0 0 2px
              ${addOpacity(theme.semantic.primary.normal, theme.opacity[43])},
            inset 0 0 0 2px ${theme.semantic.background.normal.normal},
            0 0 0 2px
              ${addOpacity(theme.semantic.primary.normal, theme.opacity[22])};
        }
      `}
    `;
  }

  return css`
    box-shadow:
      ${base},
      inset 0 0 0 1px ${theme.semantic.line.normal.neutral};

    &:focus,
    &:focus-visible,
    &[aria-expanded='true'] {
      box-shadow:
        ${base},
        inset 0 0 0 0px transparent,
        0 0 0 2px
          ${addOpacity(theme.semantic.primary.normal, theme.opacity[22])};
    }

    ${attributes?.focusVisible &&
    css`
      &${attributesSelector(attributes.focusVisible)} {
        box-shadow:
          ${base},
          inset 0 0 0 0px transparent,
          0 0 0 2px
            ${addOpacity(theme.semantic.primary.normal, theme.opacity[22])};
      }
    `}
  `;
};

const attributesSelector = (attribute: Array<string> | string) => {
  if (Array.isArray(attribute)) {
    return attribute.join(',');
  }

  return attribute;
};
