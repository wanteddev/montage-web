import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';

import type { Theme } from '@wanteddev/wds-engine';
import type { FlexBoxDefaultProps, FlexBoxProps } from './types';

export const flexBoxStyle =
  ({ xs, sm, md, lg, xl, ...props }: FlexBoxProps) =>
  (theme: Theme) => css`
    display: flex;
    ${flexibleStyle(props)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${flexibleStyle(params)}
        ${params?.sx}
      `,
    )}
  `;

const flexibleStyle = ({
  flexDirection,
  flexWrap,
  justifyContent,
  alignItems,
  alignContent,
  order,
  flex,
  flexGrow,
  flexShrink,
  alignSelf,
  flexBasis,
  gap,
  rowGap,
  columnGap,
}: FlexBoxDefaultProps = {}) => css`
  ${gap !== undefined &&
  css`
    gap: ${toCssValue(gap)};
  `}
  ${rowGap !== undefined &&
  css`
    row-gap: ${toCssValue(rowGap)};
  `}
    ${columnGap !== undefined &&
  css`
    column-gap: ${toCssValue(columnGap)};
  `}
  ${flexDirection !== undefined &&
  css`
    flex-direction: ${flexDirection};
  `}
  ${flexWrap !== undefined &&
  css`
    flex-wrap: ${flexWrap};
  `}
	${justifyContent !== undefined &&
  css`
    justify-content: ${justifyContent};
  `}
	${alignItems !== undefined &&
  css`
    align-items: ${alignItems};
  `}
	${alignContent !== undefined &&
  css`
    align-content: ${alignContent};
  `}
	${order !== undefined &&
  css`
    order: ${order};
  `}
	${flex !== undefined &&
  css`
    flex: ${flex};
  `}
	${flexGrow !== undefined &&
  css`
    flex-grow: ${flexGrow};
  `}
	${flexShrink !== undefined &&
  css`
    flex-shrink: ${flexShrink};
  `}
	${alignSelf !== undefined &&
  css`
    align-self: ${alignSelf};
  `}
  ${flexBasis !== undefined &&
  css`
    flex-basis: ${toCssValue(flexBasis)};
  `}
`;
