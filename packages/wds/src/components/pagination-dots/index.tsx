import { forwardRef, useMemo } from 'react';
import {
  RovingFocusGroup,
  RovingFocusGroupItem,
} from '@radix-ui/react-roving-focus';
import { Box } from '@wanteddev/wds-engine';

import { FlexBox } from '../flex-box';

import { getPaginationDotScale, getPaginationDotsVisibleArea } from './helpers';
import { paginationDotsStyle, paginationDotsWrapperStyle } from './style';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { PaginationDotsProps } from './types';

const PaginationDots = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<PaginationDotsProps, 'div'>
>(
  (
    {
      totalPages = 3,
      currentPage = 1,
      maxDotCount = 5,
      color = 'normal',
      size = 'medium',
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
        getPaginationDotsVisibleArea({
          maxDotCount,
          currentPage,
          totalPages,
        }),
      [maxDotCount, currentPage, totalPages],
    );

    if (typeof totalPages !== 'number' || totalPages < 0) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('Invalid totalPages in PaginationDots');
      }

      return null;
    }

    return (
      <RovingFocusGroup>
        <FlexBox
          alignItems="center"
          {...props}
          sx={[
            paginationDotsWrapperStyle({ color, size, xs, sm, md, lg, xl }),
            props.sx,
          ]}
          ref={ref}
        >
          {[...Array(totalPages)].map((_, i) => {
            const scale = getPaginationDotScale({
              index: i,
              visibleArea,
              totalPages,
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
                  sx={paginationDotsStyle(scale, i === visibleArea[0])}
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

PaginationDots.displayName = 'PaginationDots';

export { PaginationDots };

export type { PaginationDotsProps };
