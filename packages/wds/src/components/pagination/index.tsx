import { forwardRef, useId, useMemo } from 'react';
import {
  IconChevronLeftTightSmall,
  IconChevronRightTightSmall,
} from '@wanteddev/wds-icon';

import {
  FlexBox,
  IconButton,
  TextButton,
  Typography,
  useControllableState,
} from '../..';

import {
  PAGINATION_INPUT_NAME,
  PAGINATION_ITEM_NAME,
  PAGINATION_NAME,
  PAGINATION_SELECT_NAME,
} from './constants';
import { pageButtonStyle, paginationItemStyle } from './style';
import { usePagination } from './hooks';

import type { FlexBoxProps } from '../flex-box/types';
import type { PaginationItemProps, PaginationProps } from './types';
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
      boundaryCount = 1,
      siblingCount = 1,
      variant = 'extended',
      hidePrevButton,
      hideNextButton,
      disabled = false,
      // leftContent,
      // rightContent,
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
    const id = useId();

    const [page = defaultPage, setPage] = useControllableState<number>({
      prop: givenPage,
      defaultProp: defaultPage,
      onChange,
    });
    const items = usePagination({
      defaultPage,
      page,
      count,
      boundaryCount,
      siblingCount,
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
        set: setPage,
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

    return (
      <FlexBox
        ref={ref}
        alignItems="center"
        justifyContent="center"
        gap={variant === 'extended' ? '16px' : '8px'}
        {...props}
        sx={sx}
      >
        {!hidePrevButton && (
          <IconButton
            type="button"
            size={16}
            color="palette.label.alternative"
            disabled={disabled || disabledPrevButton}
            aria-label="Previous page"
            onClick={pageButtonActions.prev}
          >
            <IconChevronLeftTightSmall />
          </IconButton>
        )}

        {variant === 'extended' ? (
          <FlexBox as="ul" gap="16px" alignItems="center">
            {items.map(({ type, page: itemPage }, index) => (
              <PaginationItem
                key={`pagination-item-${id}-${index}`}
                type={type}
                page={page}
                itemPage={itemPage}
                disabled={disabled}
                onClick={() => pageButtonActions.set(itemPage)}
              />
            ))}
          </FlexBox>
        ) : (
          <Typography
            variant="label2"
            weight="medium"
            color="palette.label.neutral"
          >
            {page}/{count}
          </Typography>
        )}

        {!hideNextButton && (
          <IconButton
            type="button"
            size={16}
            color="palette.label.alternative"
            disabled={disabled || disabledNextButton}
            aria-label="Next page"
            onClick={pageButtonActions.next}
          >
            <IconChevronRightTightSmall />
          </IconButton>
        )}
      </FlexBox>
    );
  },
);

Pagination.displayName = PAGINATION_NAME;

const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ type, page, itemPage, ...props }, ref) => {
    return (
      <FlexBox
        ref={ref}
        as="li"
        justifyContent="center"
        sx={paginationItemStyle}
      >
        {type === 'page' ? (
          <TextButton
            size="medium"
            variant="assistive"
            aria-label={`Page ${itemPage}`}
            aria-current={page === itemPage ? 'page' : undefined}
            {...props}
            sx={pageButtonStyle}
          >
            {itemPage}
          </TextButton>
        ) : (
          <Typography
            variant="body2_normal"
            weight="regular"
            color="palette.label.alternative"
          >
            ...
          </Typography>
        )}
      </FlexBox>
    );
  },
);

PaginationItem.displayName = PAGINATION_ITEM_NAME;

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
