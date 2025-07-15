import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { FlexBox } from '../flex-box';

import { backgroundBlendStyle, paginationCounterStyle } from './style';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { PaginationCounterProps } from './types';

const PaginationCounter = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<PaginationCounterProps, 'div'>
>(
  (
    {
      totalPage = 3,
      currentPage = 1,
      size = 'medium',
      alternative = false,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    return (
      <FlexBox
        ref={ref}
        {...props}
        alignItems="center"
        sx={[
          paginationCounterStyle({ size, alternative, xs, sm, md, lg, xl }),
          props.sx,
        ]}
      >
        {!alternative && (
          <Box
            as="span"
            role="presentation"
            data-role="pagination-counter-background-blend"
            sx={backgroundBlendStyle}
          />
        )}

        <span data-role="pagination-counter-text">{currentPage}</span>
        <span data-role="pagination-counter-divider">/</span>
        <span data-role="pagination-counter-text">{totalPage}</span>
      </FlexBox>
    );
  },
);

PaginationCounter.displayName = 'PaginationCounter';

export { PaginationCounter };

export type { PaginationCounterProps };
