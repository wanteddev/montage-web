import { forwardRef, useMemo } from 'react';
import {
  IconChevronLeftTightSmall,
  IconChevronRightTightSmall,
} from '@wanteddev/wds-icon';

import { FlexBox, IconButton, Typography, useControllableState } from '../..';

import {
  PAGINATION_INPUT_NAME,
  PAGINATION_NAME,
  PAGINATION_SELECT_NAME,
} from './constants';
import { minimizePaginationStyle } from './style';

import type { FlexBoxProps } from '../flex-box/types';
import type { PaginationProps } from './types';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';

const Pagination = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<PaginationProps, 'div'>
>(
  (
    {
      defaultPage = 1,
      page: givenPage,
      count = 1,
      variant = 'extended',
      leftContent,
      rightContent,
      onChange,
      // xs,
      // sm,
      // md,
      // lg,
      // xl,
      sx,
      ...props
    },
    ref,
  ) => {
    const [page = defaultPage, setPage] = useControllableState<number>({
      prop: givenPage,
      defaultProp: defaultPage,
      onChange,
    });

    const disabledPrevButton = useMemo(() => page <= 1, [page]);
    const disabledNextButton = useMemo(() => page >= count, [page, count]);

    const pageButtonActions = useMemo(
      () => ({
        prev: () => {
          if (page > 1) {
            setPage(page - 1);
          }
        },
        next: () => {
          if (page < count) {
            setPage(page + 1);
          }
        },
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [page, count, setPage],
    );

    if (typeof count !== 'number' || count < 0) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('Invalid count in Pagination');
      }
      return null;
    }

    if (typeof page !== 'number' || page < 0) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('Invalid page in Pagination');
      }
      return null;
    }

    switch (variant) {
      case 'extended':
        return (
          <FlexBox ref={ref} gap="16px" alignItems="center" {...props}>
            {Boolean(leftContent) && leftContent}
            1/10
            {Boolean(rightContent) && rightContent}
          </FlexBox>
        );

      case 'minimize':
        return (
          <FlexBox
            ref={ref}
            gap="4px"
            alignItems="center"
            {...props}
            sx={[minimizePaginationStyle, sx]}
          >
            <IconButton
              size={16}
              color="palette.label.alternative"
              disabled={disabledPrevButton}
              aria-label="Previous page"
              onClick={pageButtonActions.prev}
            >
              <IconChevronLeftTightSmall />
            </IconButton>

            <Typography
              variant="label2"
              color="palette.label.neutral"
              weight="medium"
            >
              {page}/{count}
            </Typography>

            <IconButton
              size={16}
              color="palette.label.alternative"
              disabled={disabledNextButton}
              aria-label="Next page"
              onClick={pageButtonActions.next}
            >
              <IconChevronRightTightSmall />
            </IconButton>
          </FlexBox>
        );
    }
  },
);

Pagination.displayName = PAGINATION_NAME;

const PaginationSelect = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<FlexBoxProps, 'div'>
>((props, ref) => {
  return <FlexBox ref={ref} {...props} />;
});

PaginationSelect.displayName = PAGINATION_SELECT_NAME;

const PaginationInput = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<FlexBoxProps, 'div'>
>((props, ref) => {
  return <FlexBox ref={ref} {...props} />;
});

PaginationInput.displayName = PAGINATION_INPUT_NAME;

export { Pagination, PaginationSelect, PaginationInput };
