import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import FlexBox from '../flex-box';

import {
  backgroundBlendLayerStyle,
  backgroundBlendStyle,
  paginationCounterStyle,
} from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { PaginationCounterProps } from './types';

const PaginationCounter = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<PaginationCounterProps, 'div'>
>(
  (
    {
      totalPage = 3,
      currentPage = 1,
      size = 'normal',
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
          <>
            <Box
              as="span"
              role="presentation"
              data-role="pagination-counter-background-blend"
              sx={backgroundBlendStyle}
            />
            <Box
              as="span"
              role="presentation"
              data-role="pagination-counter-background-blend-layer"
              sx={backgroundBlendLayerStyle}
            />
          </>
        )}

        <span data-role="pagination-counter-text">{currentPage}</span>
        <span data-role="pagination-counter-divider">/</span>
        <span data-role="pagination-counter-text">{totalPage}</span>
      </FlexBox>
    );
  },
);

PaginationCounter.displayName = 'PaginationCounter';

export default PaginationCounter;
