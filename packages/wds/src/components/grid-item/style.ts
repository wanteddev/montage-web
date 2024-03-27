import { css } from '@emotion/react';

import { createResponsiveStyle } from '@/utils';

import type { Theme } from '@emotion/react';
import type { GridItemProps, GridSize } from './types';

export const gridItemStyle =
  ({ xs, sm, md, lg, ...props }: GridItemProps) =>
  (theme: Theme) => css`
    min-width: 0px;
    padding-top: calc(var(--wds-column-spacing));
    padding-left: calc(var(--wds-row-spacing));

    ${gridItemAlignStyle(props)}

    ${createResponsiveStyle(
      { xs, sm, md, lg },
      theme,
    )(
      (params) => css`
        ${gridItemAlignStyle(params)}
        ${params?.css}
      `,
    )}
  `;

const gridItemAlignStyle = ({ columns, alignSelf }: GridItemProps = {}) => {
  return css`
    ${Boolean(alignSelf) &&
    css`
      align-self: ${alignSelf};
    `}

    ${gridItemLayoutStyle(columns)}
  `;
};

const gridItemLayoutStyle = (value?: GridSize) => {
  if (!value) {
    return;
  }

  if (value === true) {
    return css`
      flex-grow: 1;
      flex-basis: 0px;
      max-width: 100%;
      width: initial;
    `;
  }

  if (value === 'auto') {
    return css`
      flex: 0 0 auto;
      max-width: none;
      width: auto;
    `;
  }

  return css`
    max-width: ${Math.round((value / 12) * 10e7) / 10e5}%;
    width: initial;
    flex-grow: 0;
    flex-basis: ${Math.round((value / 12) * 10e7) / 10e5}%;
    flex-shrink: initial;
  `;
};
