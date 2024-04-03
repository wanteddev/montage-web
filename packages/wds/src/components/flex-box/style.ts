import { css } from '@emotion/react';

import { createResponsiveStyle } from '../../utils';

import type { Theme } from '@emotion/react';
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
        ${params?.css}
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
}: FlexBoxDefaultProps = {}) => css`
  ${Boolean(gap) &&
  css`
    gap: ${gap};
  `}
  ${Boolean(flexDirection) &&
  css`
    flex-direction: ${flexDirection};
  `}
  ${Boolean(flexWrap) &&
  css`
    flex-wrap: ${flexWrap};
  `}
	${Boolean(justifyContent) &&
  css`
    justify-content: ${justifyContent};
  `}
	${Boolean(alignItems) &&
  css`
    align-items: ${alignItems};
  `}
	${Boolean(alignContent) &&
  css`
    align-content: ${alignContent};
  `}
	${Boolean(order) &&
  css`
    order: ${order};
  `}
	${Boolean(flex) &&
  css`
    flex: ${flex};
  `}
	${Boolean(flexGrow) &&
  css`
    flex-grow: ${flexGrow};
  `}
	${Boolean(flexShrink) &&
  css`
    flex-shrink: ${flexShrink};
  `}
	${Boolean(alignSelf) &&
  css`
    align-self: ${alignSelf};
  `}
  ${Boolean(flexBasis) &&
  css`
    align-self: ${flexBasis};
  `}
`;
