import { forwardRef, useId, useMemo } from 'react';
import {
  IconChevronLeftTightSmall,
  IconChevronRightTightSmall,
} from '@wanteddev/wds-icon';
import { composeEventHandlers } from '@radix-ui/primitive';

import {
  FlexBox,
  IconButton,
  Label,
  TextButton,
  TextInput,
  Typography,
  useControllableState,
} from '../..';

import {
  PAGINATION_INPUT_NAME,
  PAGINATION_ITEM_NAME,
  PAGINATION_NAME,
  PAGINATION_SELECT_NAME,
} from './constants';
import {
  pageButtonStyle,
  paginationInputStyle,
  paginationItemStyle,
  paginationStyle,
} from './style';
import { usePaginationItems } from './hooks';
import { PaginationProvider, usePaginationContext } from './contexts';

import type { FlexBoxProps } from '../flex-box/types';
import type {
  PaginationInputProps,
  PaginationItemProps,
  PaginationProps,
} from './types';
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
    const id = useId();

    const [page = defaultPage, setPage] = useControllableState<number>({
      prop: givenPage,
      defaultProp: defaultPage,
      onChange,
    });
    const items = usePaginationItems({
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
      <PaginationProvider count={count} setPage={setPage}>
        <FlexBox
          ref={ref}
          alignItems="center"
          gap="20px"
          {...props}
          sx={[paginationStyle({ variant }), sx]}
        >
          <FlexBox flex={1}>{Boolean(leftContent) && leftContent}</FlexBox>

          <FlexBox
            ref={ref}
            alignItems="center"
            justifyContent="center"
            gap={variant === 'extended' ? '16px' : '8px'}
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

          <FlexBox flex={1} justifyContent="flex-end">
            {Boolean(rightContent) && rightContent}
          </FlexBox>
        </FlexBox>
      </PaginationProvider>
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
  HTMLInputElement,
  DefaultComponentProps<PaginationInputProps, 'input'>
>(({ label = '페이지 이동', hideLabel, sx, onKeyDown, ...props }, ref) => {
  const { count, setPage } = usePaginationContext(PAGINATION_INPUT_NAME);

  return (
    <FlexBox alignItems="center" gap="8px">
      {!hideLabel && (
        <Label
          variant="label2"
          weight="medium"
          color="palette.label.alternative"
          sx={{ minWidth: 'max-content' }}
        >
          {label}
        </Label>
      )}

      <TextInput
        ref={ref}
        width="53px"
        height="32px"
        {...props}
        sx={[paginationInputStyle, sx]}
        onKeyDown={composeEventHandlers(onKeyDown, (event) => {
          if (event.key !== 'Enter') {
            return;
          }

          const pageValue = Number(event.currentTarget.value);

          if (!Number.isNaN(pageValue) && pageValue > 0 && pageValue <= count) {
            setPage(pageValue);
          }
        })}
      />
    </FlexBox>
  );
});

PaginationInput.displayName = PAGINATION_INPUT_NAME;

export { Pagination, PaginationSelect, PaginationInput };
