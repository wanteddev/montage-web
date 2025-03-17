import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils';

import type { FloatingActionProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const floatingActionStyle =
  ({ size, iconSize, xs, sm, md, lg, xl }: FloatingActionProps) =>
  (theme: Theme) => css`
    background-color: ${theme.semantic.primary.normal};
    box-shadow: ${theme.semantic.elevation.shadow.strong};
    border-radius: 9999px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 16px;
    color: ${theme.semantic.static.white};

    ${floatingActionSizeStyle({ size, iconSize })}

    &:disabled, &[aria-disabled='true'] {
      color: ${theme.semantic.label.assistive};
      background-color: ${theme.semantic.interaction.disable};
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${floatingActionSizeStyle({
          size: params?.size,
          iconSize: params?.iconSize,
        })}
        ${params?.sx}
      `,
    )}
  `;

const floatingActionSizeStyle = ({
  size,
  iconSize,
}: Pick<FloatingActionProps, 'size' | 'iconSize'>) => css`
  ${Boolean(size) &&
  css`
    width: ${size};
    height: ${size};
  `}

  ${Boolean(iconSize) &&
  css`
    font-size: ${iconSize};
  `}
`;
