import { css } from '@emotion/react';

import { createResponsiveStyle } from '@/utils';

import type { Theme } from '@emotion/react';
import type { GridProps } from './types';

export const gridStyle =
  ({ xs, sm, md, lg, ...props }: GridProps) =>
  (theme: Theme) => css`
    display: flex;
    flex-wrap: wrap;
    padding: calc(var(--wds-column-spacing, 0px) / 2)
      calc(var(--wds-row-spacing, 0px) / 2);

    ${gridContainerStyle(props, theme)}

    ${createResponsiveStyle(
      { xs, sm, md, lg },
      theme,
    )(
      (params) => css`
        ${gridContainerStyle(params, theme)}
        ${params?.css}
      `,
    )}
  `;

const gridContainerStyle = (
  {
    alignItems,
    direction,
    justify,
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
  ${Boolean(direction) &&
  css`
    flex-direction: ${direction};
  `}
  ${Boolean(justify) &&
  css`
    justify-content: ${justify};
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
    `;
  }
};
