import { forwardRef, useEffect, useMemo, useRef } from 'react';
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

const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

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

    const isArrowKeyPressedRef = useRef(false);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (ARROW_KEYS.includes(event.key)) {
          isArrowKeyPressedRef.current = true;
        }
      };

      const handleKeyUp = () => (isArrowKeyPressedRef.current = false);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }, []);

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
          aria-label="Slide dots"
          role="tablist"
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
                focusable
                asChild
              >
                <Box
                  as="button"
                  role="tab"
                  type="button"
                  onClick={() => onClickDot?.(i + 1)}
                  data-role="pagination-dot-button"
                  sx={paginationDotsStyle(scale, i === visibleArea[0])}
                  aria-selected={isActive}
                  aria-label={`Slide dot ${i + 1}`}
                  onFocus={(e) => {
                    if (isArrowKeyPressedRef.current) e.currentTarget.click();
                  }}
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
