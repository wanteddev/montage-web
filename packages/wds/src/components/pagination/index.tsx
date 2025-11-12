import { forwardRef, useId, useMemo } from 'react';
import {
  IconChevronLeftTightSmall,
  IconChevronRightTightSmall,
} from '@wanteddev/wds-icon';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

import { FlexBox } from '../flex-box';
import { IconButton } from '../icon-button';
import { Typography } from '../typography';
import { TextButton } from '../text-button';
import { Menu, MenuContent, MenuItem, MenuList, MenuTrigger } from '../menu';
import { FilterButton } from '../filter-button';
import { Label } from '../label';
import { TextField } from '../text-field';

import { getPaginationItems } from './helpers';
import { PaginationProvider, usePaginationContext } from './contexts';
import {
  PAGINATION_FIELD_NAME,
  PAGINATION_NAME,
  PAGINATION_SELECT_NAME,
} from './constants';
import {
  pageButtonStyle,
  paginationContentStyle,
  paginationFieldStyle,
  paginationItemStyle,
  paginationStyle,
} from './style';

import type {
  PaginationFieldProps,
  PaginationItemProps,
  PaginationProps,
  PaginationSelectProps,
} from './types';
import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';

const Pagination = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<PaginationProps, 'div'>
>(
  (
    {
      defaultPage = 1,
      page: givenPage,
      totalPages = 1,
      boundaryPages = 1,
      siblingPages = 1,
      variant = 'extended',
      hidePrevButton,
      hideNextButton,
      disabled = false,
      leadingContent,
      trailingContent,
      onChange,
      sx,
      ...props
    },
    ref,
  ) => {
    const id = useId();

    const [page, setPage] = useControllableState({
      prop: givenPage,
      defaultProp: defaultPage,
      onChange,
    });

    const items = useMemo(() => {
      return getPaginationItems({
        defaultPage,
        page,
        totalPages,
        boundaryPages,
        siblingPages,
      });
    }, [defaultPage, page, totalPages, boundaryPages, siblingPages]);

    const disabledPrevButton = useMemo(() => page <= 1, [page]);
    const disabledNextButton = useMemo(
      () => page >= totalPages,
      [page, totalPages],
    );

    const pageButtonActions = useMemo(
      () => ({
        prev: () => {
          if (page > 1) {
            setPage(page - 1);
          }
        },
        next: () => {
          if (page < totalPages) {
            setPage(page + 1);
          }
        },
        set: setPage,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [page, totalPages],
    );

    if (typeof totalPages !== 'number' || totalPages < 0) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('Invalid totalPages in Pagination');
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
      <PaginationProvider
        id={id}
        totalPages={totalPages}
        disabled={disabled}
        setPage={setPage}
      >
        <FlexBox
          ref={ref}
          alignItems="center"
          gap="12px"
          {...props}
          sx={[paginationStyle({ variant }), sx]}
        >
          {variant === 'extended' && (
            <FlexBox
              data-role="pagination-leading-content-wrapper"
              sx={paginationContentStyle}
            >
              {Boolean(leadingContent) && leadingContent}
            </FlexBox>
          )}

          <FlexBox
            ref={ref}
            alignItems="center"
            justifyContent="center"
            data-role="pagination-wrapper"
            gap={variant === 'minimize' ? '8px' : '16px'}
          >
            {!hidePrevButton && (
              <IconButton
                type="button"
                size={variant === 'compact' ? 24 : 16}
                color="semantic.label.alternative"
                disabled={disabled || disabledPrevButton}
                data-role="pagination-prev-button"
                aria-label="Previous page"
                onClick={pageButtonActions.prev}
              >
                <IconChevronLeftTightSmall />
              </IconButton>
            )}

            {variant === 'minimize' ? (
              <Typography
                variant="label2"
                weight="medium"
                data-role="pagination-page-num"
                color={
                  disabled ? 'semantic.label.disable' : 'semantic.label.neutral'
                }
              >
                {page}
                <span data-role="pagination-page-num-slash">/</span>
                {totalPages}
              </Typography>
            ) : (
              <FlexBox as="ul" gap="16px" alignItems="center">
                {items.map(({ type, page: itemPage }, index) => (
                  <PaginationItem
                    key={`pagination-${id}-pagination-item-${index}`}
                    type={type}
                    page={page}
                    itemPage={itemPage}
                    disabled={disabled}
                    onPageChange={pageButtonActions.set}
                  />
                ))}
              </FlexBox>
            )}

            {!hideNextButton && (
              <IconButton
                type="button"
                size={variant === 'compact' ? 24 : 16}
                color="semantic.label.alternative"
                disabled={disabled || disabledNextButton}
                data-role="pagination-next-button"
                aria-label="Next page"
                onClick={pageButtonActions.next}
              >
                <IconChevronRightTightSmall />
              </IconButton>
            )}
          </FlexBox>

          {variant === 'extended' && (
            <FlexBox
              data-role="pagination-trailing-content-wrapper"
              sx={paginationContentStyle}
            >
              {Boolean(trailingContent) && trailingContent}
            </FlexBox>
          )}
        </FlexBox>
      </PaginationProvider>
    );
  },
);

Pagination.displayName = PAGINATION_NAME;

const PaginationItem = ({
  type,
  page,
  itemPage,
  disabled,
  onPageChange,
}: PaginationItemProps) => {
  return (
    <FlexBox as="li" justifyContent="center" sx={paginationItemStyle}>
      {type === 'page' ? (
        <TextButton
          size="medium"
          color="assistive"
          disabled={disabled}
          disableInteraction={disabled}
          aria-label={`Page ${itemPage}`}
          aria-current={page === itemPage ? 'page' : undefined}
          data-role="pagination-item-page"
          onClick={() => onPageChange(itemPage!)}
          sx={pageButtonStyle}
        >
          {itemPage}
        </TextButton>
      ) : (
        <Typography
          variant="body2"
          weight="regular"
          color={
            disabled ? 'semantic.label.disable' : 'semantic.label.alternative'
          }
          data-role="pagination-item-ellipsis"
        >
          ...
        </Typography>
      )}
    </FlexBox>
  );
};

const PaginationSelect = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<PaginationSelectProps, 'div'>
>(
  (
    {
      pageSizeOptions = [10, 20, 30, 40, 50],
      defaultPageSize = pageSizeOptions[0] ?? 10,
      pageSize: givenPageSize,
      label = '씩 보기',
      optionRender,
      onChange,
      disabled,
      open: givenOpen,
      defaultOpen,
      onOpenChange,
      contentProps,
      ...props
    },
    ref,
  ) => {
    const { id, disabled: paginationDisabled } = usePaginationContext(
      PAGINATION_SELECT_NAME,
    );

    const [open, setOpen] = useControllableState({
      prop: givenOpen,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
    });

    const [pageSize = defaultPageSize, setPageSize] =
      useControllableState<number>({
        prop: givenPageSize,
        defaultProp: defaultPageSize,
        onChange,
      });

    return (
      <Menu
        open={open}
        onOpenChange={setOpen}
        value={pageSize.toString()}
        onValueChange={(value) => setPageSize(Number(value))}
      >
        <FlexBox
          ref={ref}
          alignItems="center"
          gap="8px"
          data-role="pagination-select-trigger-wrapper"
          {...props}
        >
          <MenuTrigger>
            <FilterButton
              variant="outlined"
              size="small"
              disabled={paginationDisabled || disabled}
            >
              {pageSize}
            </FilterButton>
          </MenuTrigger>
          <Label
            variant="label2"
            weight="medium"
            color="semantic.label.alternative"
            sx={{ minWidth: 'max-content' }}
          >
            {label}
          </Label>
        </FlexBox>

        <MenuContent
          offset={8}
          position="bottom-start"
          data-role="pagination-select-content"
          {...contentProps}
          sx={[
            {
              width: '140px',
            },
            contentProps?.sx,
          ]}
        >
          <MenuList role="listbox">
            {pageSizeOptions.map((option) => (
              <MenuItem
                key={`pagination-${id}-pagination-select-menu-item-${option}`}
                value={option.toString()}
                onClick={() => setOpen(false)}
              >
                {typeof optionRender === 'function'
                  ? optionRender(option)
                  : `${option}개`}
              </MenuItem>
            ))}
          </MenuList>
        </MenuContent>
      </Menu>
    );
  },
);

PaginationSelect.displayName = PAGINATION_SELECT_NAME;

const PaginationField = forwardRef<
  HTMLInputElement,
  DefaultComponentPropsInternal<PaginationFieldProps, 'input'>
>(({ label = '페이지 이동', sx, onKeyDown, disabled, ...props }, ref) => {
  const {
    totalPages,
    disabled: paginationDisabled,
    setPage,
  } = usePaginationContext(PAGINATION_FIELD_NAME);

  return (
    <FlexBox wds-component="pagination-field" alignItems="center" gap="8px">
      <Label
        variant="label2"
        weight="medium"
        color="semantic.label.alternative"
        sx={{ minWidth: 'max-content' }}
      >
        {label}
      </Label>

      <TextField
        ref={ref}
        width="53px"
        height="32px"
        {...props}
        disabled={paginationDisabled || disabled}
        sx={[paginationFieldStyle, sx]}
        onKeyDown={composeEventHandlers(onKeyDown, (event) => {
          if (event.key !== 'Enter') {
            return;
          }
          const pageValue = Number(event.currentTarget.value);

          if (
            !Number.isNaN(pageValue) &&
            pageValue > 0 &&
            pageValue <= totalPages
          ) {
            setPage(pageValue);
          }

          event.currentTarget.value = '';
        })}
      />
    </FlexBox>
  );
});

PaginationField.displayName = PAGINATION_FIELD_NAME;

export { Pagination, PaginationSelect, PaginationField };

export type { PaginationProps, PaginationSelectProps, PaginationFieldProps };
