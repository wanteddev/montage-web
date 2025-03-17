import { forwardRef, useId, useMemo, useState } from 'react';
import {
  IconChevronLeftTightSmall,
  IconChevronRightTightSmall,
} from '@wanteddev/wds-icon';
import { composeEventHandlers } from '@radix-ui/primitive';

import {
  ChipFilter,
  FlexBox,
  IconButton,
  Label,
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  MenuTrigger,
  TextButton,
  TextField,
  Typography,
  useControllableState,
} from '../..';

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
import { PaginationProvider, usePaginationContext } from './contexts';
import { getPaginationItems } from './helpers';

import type {
  PaginationFieldProps,
  PaginationItemProps,
  PaginationProps,
  PaginationSelectProps,
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

    const [page = defaultPage, setPage] = useControllableState<number>({
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
          {...props}
          sx={[paginationStyle({ variant }), sx]}
        >
          <FlexBox
            data-role="pagination-leading-content-wrapper"
            sx={paginationContentStyle}
          >
            {Boolean(leadingContent) && leadingContent}
          </FlexBox>

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
                    onClick={() => pageButtonActions.set(itemPage)}
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

          <FlexBox
            data-role="pagination-trailing-content-wrapper"
            sx={paginationContentStyle}
          >
            {Boolean(trailingContent) && trailingContent}
          </FlexBox>
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
  ...props
}: PaginationItemProps) => {
  return (
    <FlexBox as="li" justifyContent="center" sx={paginationItemStyle}>
      {type === 'page' ? (
        <TextButton
          size="medium"
          variant="assistive"
          disabled={disabled}
          disableInteraction={disabled}
          aria-label={`Page ${itemPage}`}
          aria-current={page === itemPage ? 'page' : undefined}
          data-role="pagination-item-page"
          {...props}
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
  DefaultComponentProps<PaginationSelectProps, 'div'>
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
      ...props
    },
    ref,
  ) => {
    const { id, disabled: paginationDisabled } = usePaginationContext(
      PAGINATION_SELECT_NAME,
    );

    const [open, setOpen] = useState(false);

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
        defaultValue={pageSize.toString()}
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
            <ChipFilter
              variant="outlined"
              size="small"
              disabled={paginationDisabled || disabled}
            >
              {pageSize}
            </ChipFilter>
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
          position="top-start"
          data-role="pagination-select-content"
          sx={{
            width: '140px',
          }}
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
  DefaultComponentProps<PaginationFieldProps, 'input'>
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
