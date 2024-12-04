import { forwardRef, useMemo } from 'react';
import { Box } from '@wanteddev/wds-engine';
import {
  RovingFocusGroup,
  RovingFocusGroupItem,
} from '@radix-ui/react-roving-focus';

import FlexBox from '../flex-box';

import {
  pageIndicatorCounterStyle,
  pageIndicatorDotStyle,
  pageIndicatorDotWrapperStyle,
} from './style';
import { getPageIndicatorDotVisibleArea } from './helpers';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { PageIndicatorProps } from './types';

const MEDIUM_SCALE_RATIO = 0.8;
const SMALL_SCALE_RATIO = 0.6;

const PageIndicator = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<PageIndicatorProps, 'div'>
>(
  (
    {
      totalPage = 3,
      currentPage = 1,
      maxDotCount = 5,
      variant = 'dot',
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
        getPageIndicatorDotVisibleArea({
          maxDotCount,
          currentPage,
          totalPage,
        }),
      [maxDotCount, currentPage, totalPage],
    );

    if (variant === 'counter') {
      return (
        <FlexBox sx={pageIndicatorCounterStyle({ xs, sm, md, lg, xl })}>
          <div data-role="page-indicator-counter-background-first" />
          <div data-role="page-indicator-counter-background-second" />
          <div data-role="page-indicator-counter-background-layer" />

          <div data-role="page-indicator-counter-wrapper">
            <span data-role="page-indicator-counter-text">{currentPage}</span>
            <span data-role="page-indicator-counter-divider">/</span>
            <span data-role="page-indicator-counter-text">{totalPage}</span>
          </div>
        </FlexBox>
      );
    }

    if (typeof totalPage !== 'number' || totalPage < 0) {
      return null;
    }

    const getPageIndicatorDotStyle = (index: number) => {
      if (!(index >= visibleArea[0] && index <= visibleArea[1])) {
        return 0;
      }

      // first
      if (visibleArea[0] === 0 && Math.floor(maxDotCount / 2) > index) {
        return 1;
      }

      // last
      if (
        visibleArea[1] === totalPage - 1 &&
        index >= totalPage - Math.floor(maxDotCount / 2) - 1
      ) {
        return 1;
      }

      const distance = Math.min(
        Math.abs(index - visibleArea[0]),
        Math.abs(index - visibleArea[1]),
      );

      if (
        distance === 1 ||
        (visibleArea[0] === 1 && index === 1) ||
        (visibleArea[1] === totalPage - 2 && index === totalPage - 2)
      ) {
        return MEDIUM_SCALE_RATIO;
      }

      if (distance === 0) {
        return SMALL_SCALE_RATIO;
      }

      return 1;
    };

    return (
      <RovingFocusGroup>
        <FlexBox
          alignItems="center"
          {...props}
          sx={[
            pageIndicatorDotWrapperStyle({ color, size, xs, sm, md, lg, xl }),
            props.sx,
          ]}
          ref={ref}
        >
          {[...Array(totalPage)].map((_, i) => {
            const scale = getPageIndicatorDotStyle(i);
            const isActive = i + 1 === currentPage;

            return (
              <RovingFocusGroupItem
                key={`wds-page-indicator-dot-${i}`}
                active={isActive}
                asChild
              >
                <Box
                  as="button"
                  onClick={() => onClickDot?.(i + 1)}
                  data-role="page-indicator-dot"
                  onFocus={(e) => {
                    e.currentTarget.click();
                  }}
                  sx={pageIndicatorDotStyle(scale, i === visibleArea[0])}
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

PageIndicator.displayName = 'PageIndicator';

export default PageIndicator;
