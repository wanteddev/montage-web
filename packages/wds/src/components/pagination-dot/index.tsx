import { forwardRef, useMemo } from 'react';
import {
  RovingFocusGroup,
  RovingFocusGroupItem,
} from '@radix-ui/react-roving-focus';
import { Box } from '@wanteddev/wds-engine';

import FlexBox from '../flex-box';

import { getPaginationDotScale, getPaginationDotVisibleArea } from './helpers';
import { paginationDotStyle, paginationDotWrapperStyle } from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { PaginationDotProps } from './types';

const PaginationDot = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<PaginationDotProps, 'div'>
>(
  (
    {
      totalPage = 3,
      currentPage = 1,
      maxDotCount = 5,
      color = 'normal',
      size = 'normal',
      onClickDot,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    const visibleArea = useMemo<[number, number]>(
      () =>
        getPaginationDotVisibleArea({
          maxDotCount,
          currentPage,
          totalPage,
        }),
      [maxDotCount, currentPage, totalPage],
    );

    if (typeof totalPage !== 'number' || totalPage < 0) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('Invalid totalPage in PaginationDot');
      }

      return null;
    }

    return (
      <RovingFocusGroup>
        <FlexBox
          alignItems="center"
          {...props}
          sx={[
            paginationDotWrapperStyle({ color, size, xs, sm, md, lg, xl }),
            props.sx,
          ]}
          ref={ref}
        >
          {[...Array(totalPage)].map((_, i) => {
            const scale = getPaginationDotScale({
              index: i,
              visibleArea,
              totalPage,
              maxDotCount,
            });
            const isActive = i + 1 === currentPage;

            return (
              <RovingFocusGroupItem
                key={`wds-pagination-dot-${i}`}
                active={isActive}
                asChild
              >
                <Box
                  as="button"
                  onClick={() => onClickDot?.(i + 1)}
                  data-role="pagination-dot-button"
                  onFocus={(e) => {
                    e.currentTarget.click();
                  }}
                  sx={paginationDotStyle(scale, i === visibleArea[0])}
                  aria-current={isActive ? 'page' : undefined}
                />
              </RovingFocusGroupItem>
            );
          })}
        </FlexBox>
      </RovingFocusGroup>
    );
  },
);

PaginationDot.displayName = 'PaginationDot';

export default PaginationDot;
