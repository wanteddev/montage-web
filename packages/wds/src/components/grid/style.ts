import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { Theme } from '@wanteddev/wds-engine';
import type { GridProps } from './types';

export const gridStyle =
  ({ xs, sm, md, lg, xl, ...props }: GridProps) =>
  (theme: Theme) => css`
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    ${gridContainerStyle(props, theme)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${gridContainerStyle(params, theme)}
        ${params?.sx}
      `,
    )}
  `;

const gridContainerStyle = (
  {
    alignItems,
    justifyContent,
    spacing,
    rowSpacing,
    columnSpacing,
  }: GridProps = {},
  theme: Theme,
) => css`
  ${Boolean(alignItems) &&
  css`
    align-items: ${alignItems};
  `}
  ${Boolean(justifyContent) &&
  css`
    justify-content: ${justifyContent};
  `}

  ${gridSpacingStyle(rowSpacing || spacing, 'row', theme)}
  ${gridSpacingStyle(columnSpacing || spacing, 'column', theme)}
`;

const gridSpacingStyle = (
  spacing: GridProps['spacing'],
  type: 'row' | 'column',
  theme: Theme,
) => {
  if (!spacing) {
    return;
  }

  if (typeof spacing === 'number') {
    return css`
      --wds-${type}-spacing: ${theme.spacing[spacing]};

      ${
        type === 'column'
          ? css`
              margin-top: calc(var(--wds-${type}-spacing) * -1);
            `
          : css`
              width: calc(100% + var(--wds-${type}-spacing));
              margin-left: calc(var(--wds-${type}-spacing) * -1);
            `
      }
    `;
  }
};
