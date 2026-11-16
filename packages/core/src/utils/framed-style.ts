import { css } from '@montage-ui/engine';
import objectPath from 'object-path';

import type { Theme, ThemeShadowToken } from '@montage-ui/engine';

export type FramedStyleParams = {
  status?: 'normal' | 'negative';
  disabled?: boolean;
  selected?: boolean;
  shadow?: ThemeShadowToken;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
};

export const framedStyle = (params?: FramedStyleParams) => (theme: Theme) => {
  const {
    shadow,
    size = 'medium',
    status = 'normal',
    disabled,
    selected,
  } = params ?? {};

  const boxShadow: string | undefined = shadow
    ? objectPath.get(theme, shadow)
    : undefined;

  return css`
    ${getSizeStyle(size)}
    ${getShadowStyle({ base: boxShadow, status, selected }, theme)}

    background-color: transparent;
    display: flex;
    padding: var(--framed-style-vertical-padding)
      var(--framed-style-horizontal-padding);
    border-radius: var(--framed-style-border-radius);
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

    ${
      disabled &&
      css`
        &::before {
          opacity: ${theme.opacity[43]};
        }
      `
    }
  `;
};

const getSizeStyle = (size: FramedStyleParams['size']) => {
  switch (size) {
    case 'small':
      return css`
        --framed-style-border-radius: 12px;
        --framed-style-vertical-padding: 4px;
        --framed-style-horizontal-padding: 12px;
      `;
    case 'medium':
    default:
      return css`
        --framed-style-border-radius: 14px;
        --framed-style-vertical-padding: 4px;
        --framed-style-horizontal-padding: 16px;
      `;
    case 'large':
      return css`
        --framed-style-border-radius: 16px;
        --framed-style-vertical-padding: 4px;
        --framed-style-horizontal-padding: 20px;
      `;
    case 'xlarge':
      return css`
        --framed-style-border-radius: 20px;
        --framed-style-vertical-padding: 8px;
        --framed-style-horizontal-padding: 24px;
      `;
  }
};

const getShadowStyle = (
  {
    base,
    status,
    selected,
  }: { base?: string } & Pick<FramedStyleParams, 'status' | 'selected'>,
  theme: Theme,
) => {
  const negative = status === 'negative';
  const layers: Array<string> = [];

  if (selected) {
    const line = negative
      ? theme.semantic.line.negative
      : theme.semantic.line.brand;

    layers.push(
      `inset 0 0 0 1px ${line.strong}`,
      `inset 0 0 0 1px ${theme.semantic.background.neutral.primary}`,
      `0 0 0 4px ${line.focus}`,
    );
  } else {
    layers.push(
      `inset 0 0 0 1px ${
        negative
          ? theme.semantic.line.negative.primary
          : theme.semantic.line.neutral.secondary
      }`,
    );
  }

  if (base) {
    layers.push(base);
  }

  return css`
    &::before {
      box-shadow: ${layers.join(', ')};
    }
  `;
};
