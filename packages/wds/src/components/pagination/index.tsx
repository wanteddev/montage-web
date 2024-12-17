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
  PAGINATION_NAME,
  PAGINATION_SELECT_NAME,
} from './constants';
import { pageButtonStyle, paginationStyle } from './style';

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
      hidePrevButton,
      hideNextButton,
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
        {...props}
        sx={[paginationStyle({ variant }), sx]}
      >
        {!hidePrevButton && (
          <IconButton
            type="button"
            size={16}
            color="palette.label.alternative"
            disabled={disabledPrevButton}
            aria-label="Previous page"
            onClick={pageButtonActions.prev}
          >
            <IconChevronLeftTightSmall />
          </IconButton>
        )}

        {variant === 'extended' ? (
          <FlexBox ref={ref} gap="16px" alignItems="center">
            {[...Array(count)].map((_, i) => {
              const pageIndex = i + 1;
              const isActive = pageIndex === page;

              return (
                <TextButton
                  key={`${id} ${pageIndex}`}
                  size="medium"
                  variant="assistive"
                  aria-label={`Page ${pageIndex}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => pageButtonActions.set(pageIndex)}
                  sx={pageButtonStyle}
                >
                  {pageIndex}
                </TextButton>
              );
            })}
          </FlexBox>
        ) : (
          <Typography
            variant="label2"
            color="palette.label.neutral"
            weight="medium"
          >
            {page}/{count}
          </Typography>
        )}

        {!hideNextButton && (
          <IconButton
            type="button"
            size={16}
            color="palette.label.alternative"
            disabled={disabledNextButton}
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
