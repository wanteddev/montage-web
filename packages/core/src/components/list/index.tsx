import { forwardRef, useId, useState } from 'react';
import {
  Box,
  type PolymorphicComponentInternal,
  type PolymorphicPropsInternal,
} from '@montage-ui/engine';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import {
  IconCheck,
  IconChevronRightTightSmall,
  IconVerifiedCheckFill,
} from '@montage-ui/icon';

import { Divider } from '../divider';
import { FlexBox } from '../flex-box';
import { Typography } from '../typography';
import { WithInteraction } from '../with-interaction';
import { useMenuItemContext } from '../menu/contexts';
import { IconButtonProvider } from '../icon-button/contexts';
import { TextButtonProvider } from '../text-button/contexts';
import { CheckboxProvider } from '../checkbox/contexts';
import { RadioProvider } from '../radio/contexts';
import { isElementDisabled } from '../../utils/internal/element';

import {
  LIST_CELL_CONTENT_NAME,
  LIST_CELL_EXTRA_CONTENT_NAME,
  LIST_CELL_LABEL_TRAILING_NAME,
  LIST_CELL_NAME,
  LIST_CELL_SELECTED_ICON_NAME,
  LIST_NAME,
  LIST_TEXT_NAME,
} from './constants';
import {
  listCellContentStyle,
  listCellDividerStyle,
  listCellExtraContentStyle,
  listCellLabelTrailingStyle,
  listCellLeadingContentAreaStyle,
  listCellStyle,
  listCellTrailingContentAreaStyle,
  listStyle,
  listTextContentWrapperStyle,
  listTextEllipsisStyle,
  listTextStyle,
} from './style';
import { ListCellProvider, useListCellContext } from './contexts';

import type { DefaultComponentPropsInternal } from '@montage-ui/engine';
import type { ElementType, ForwardedRef } from 'react';
import type { TypographyWeight } from '../typography/types';
import type {
  ListCellContentProps,
  ListCellExtraContentProps,
  ListCellLabelTrailingProps,
  ListCellProps,
  ListProps,
  ListTextProps,
} from './types';

const List = forwardRef(
  (
    { children, ...props }: DefaultComponentPropsInternal<ListProps, 'ul'>,
    ref: ForwardedRef<HTMLUListElement>,
  ) => {
    return (
      <FlexBox
        as="ul"
        ref={ref}
        role="list"
        flexDirection="column"
        {...props}
        sx={[listStyle, props.sx]}
      >
        {children}
      </FlexBox>
    );
  },
);

List.displayName = LIST_NAME;

const ListCell = forwardRef(
  <T extends ElementType = 'li'>(
    {
      as,
      verticalPadding = 'medium',
      variant = 'inset',
      divider,
      ellipsis = false,
      alignItems = 'flex-start',

      selected = false,
      disabled = false,
      disableInteraction = false,

      textProps,
      leadingContent,
      trailingContent = selected ? <ListCellSelectedIcon /> : undefined,
      labelTrailing,
      extraContent,
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      sx,
      ...props
    }: PolymorphicPropsInternal<ListCellProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const [item, setItem] = useState<T | null>(null);
    const composedRefs = useComposedRefs(ref, (node) => setItem(node as T));

    const itemElement = item as unknown as HTMLElement | null;

    const controllable = itemElement?.querySelector(
      '[role="checkbox"], [role="radio"], button:not([role="switch"]), [role="button"], a',
    );
    const clickable = !disabled && !disableInteraction;

    const textId = useId();
    const captionId = useId();

    return (
      <ListCellProvider
        selected={selected}
        disabled={disabled}
        ellipsis={ellipsis}
        textId={textId}
        captionId={captionId}
      >
        <WithInteraction
          disabled={disabled || disableInteraction}
          variant="light"
        >
          <FlexBox
            as={(as || 'li') as T}
            role="listitem"
            ref={composedRefs}
            flexDirection="row"
            alignItems={alignItems}
            gap="8px"
            aria-disabled={disabled}
            disabled={disabled}
            tabIndex={clickable ? 0 : undefined}
            aria-labelledby={textId}
            aria-describedby={captionId}
            aria-current={selected}
            data-disable-interaction={
              disabled || disableInteraction || verticalPadding === 'none'
            }
            data-component="list-cell"
            {...props}
            onKeyDown={composeEventHandlers(props.onKeyDown, (e) => {
              if (
                e.key === 'Enter' &&
                !e.metaKey &&
                (e.target as HTMLElement) === itemElement
              ) {
                e.preventDefault();
                e.currentTarget.click();
              }
            })}
            onClick={composeEventHandlers(props.onClick, (e) => {
              const target = e.target as HTMLElement;
              if (
                isElementDisabled(target) ||
                target.ariaHidden?.toString() === 'true' ||
                target.hidden.toString() === 'true'
              ) {
                return;
              }

              if (
                controllable &&
                // prevent double call of event when clicking directly on controllable
                !controllable.contains(e.target as HTMLElement)
              ) {
                (controllable as HTMLElement).click();

                if (controllable.role === 'radio') {
                  (controllable as HTMLElement).focus({
                    preventScroll: false,
                    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#focusvisible
                    // @ts-expect-error
                    focusVisible: false,
                  });
                }
              }
            })}
            sx={[
              listCellStyle({
                variant,
                verticalPadding,
                selected,
                disabled,
                disableInteraction,
                xl,
                xs,
                sm,
                md,
                lg,
              }),
              sx,
            ]}
          >
            {Boolean(leadingContent) && (
              <FlexBox
                data-role="list-cell-leading-content"
                sx={listCellLeadingContentAreaStyle}
                alignItems={alignItems}
              >
                {leadingContent}
              </FlexBox>
            )}

            <ListText
              labelTrailing={labelTrailing}
              extraContent={extraContent}
              {...textProps}
            >
              {children}
            </ListText>

            {divider && (
              <Divider
                data-role="list-cell-divider"
                color="semantic.line.neutral.tertiary"
                sx={listCellDividerStyle}
              />
            )}

            {Boolean(trailingContent) && (
              <FlexBox
                data-role="list-cell-trailing-content"
                sx={listCellTrailingContentAreaStyle}
                alignItems="center"
              >
                {trailingContent}
              </FlexBox>
            )}
          </FlexBox>
        </WithInteraction>
      </ListCellProvider>
    );
  },
) as PolymorphicComponentInternal<ListCellProps, 'li'>;

ListCell.displayName = LIST_CELL_NAME;

const ListCellContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ListCellContentProps, 'div'>
>(({ variant = 'custom', children, chevron = false, sx, ...props }, ref) => {
  const { disabled } = useListCellContext(LIST_CELL_CONTENT_NAME);

  const chevronIcon = chevron && (
    <IconChevronRightTightSmall
      data-role="list-cell-content-chevron"
      aria-hidden
      sx={(theme) => ({
        fontSize: theme.dimension[16],
        color: disabled
          ? theme.semantic.foreground.disable.primary
          : theme.semantic.foreground.neutral.quaternary,
        flexShrink: 0,
      })}
    />
  );

  switch (variant) {
    case 'large-icon':
      return (
        <>
          <FlexBox
            data-component="list-cell-content"
            data-parent-disabled={disabled}
            alignItems="center"
            ref={ref}
            {...props}
            sx={[listCellContentStyle({ variant }), sx]}
          >
            <FlexBox>{children}</FlexBox>
          </FlexBox>

          {chevronIcon}
        </>
      );

    case 'text-button':
      return (
        <>
          <FlexBox
            data-component="list-cell-content"
            data-parent-disabled={disabled}
            alignItems="center"
            ref={ref}
            {...props}
            sx={[listCellContentStyle({ variant }), sx]}
          >
            <TextButtonProvider assistive="semantic.foreground.neutral.tertiary">
              {children}
            </TextButtonProvider>
          </FlexBox>

          {chevronIcon}
        </>
      );

    case 'icon-button':
      return (
        <>
          <FlexBox
            data-component="list-cell-content"
            data-parent-disabled={disabled}
            alignItems="center"
            ref={ref}
            {...props}
            sx={[listCellContentStyle({ variant }), sx]}
          >
            <IconButtonProvider normal="semantic.foreground.neutral.tertiary">
              {children}
            </IconButtonProvider>
          </FlexBox>

          {chevronIcon}
        </>
      );

    case 'checkbox':
      return (
        <CheckboxProvider tight>
          <FlexBox
            data-component="list-cell-content"
            data-parent-disabled={disabled}
            alignItems="center"
            ref={ref}
            {...props}
            sx={[listCellContentStyle({ variant }), sx]}
          >
            {children}
          </FlexBox>

          {chevronIcon}
        </CheckboxProvider>
      );
    case 'radio':
      return (
        <RadioProvider tight>
          <FlexBox
            data-component="list-cell-content"
            data-parent-disabled={disabled}
            alignItems="center"
            ref={ref}
            {...props}
            sx={[listCellContentStyle({ variant }), sx]}
          >
            {children}
          </FlexBox>

          {chevronIcon}
        </RadioProvider>
      );
    case 'button':
    case 'toggle-icon':
    case 'icon':
    case 'avatar':
    case 'content-badge':
    case 'switch':
    case 'thumbnail':
    case 'value':
    case 'custom':
    default:
      return (
        <>
          <FlexBox
            data-component="list-cell-content"
            data-parent-disabled={disabled}
            alignItems="center"
            ref={ref}
            {...props}
            sx={[listCellContentStyle({ variant }), sx]}
          >
            {children}
          </FlexBox>

          {chevronIcon}
        </>
      );
  }
});

ListCellContent.displayName = LIST_CELL_CONTENT_NAME;

const ListCellLabelTrailing = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ListCellLabelTrailingProps, 'div'>
>(({ variant = 'custom', children, sx, ...props }, ref) => {
  const { disabled } = useListCellContext(LIST_CELL_LABEL_TRAILING_NAME);

  switch (variant) {
    case 'verified-check':
      return (
        <FlexBox
          data-component="list-cell-label-trailing"
          data-parent-disabled={disabled}
          ref={ref}
          {...props}
          sx={[listCellLabelTrailingStyle, sx]}
        >
          <IconVerifiedCheckFill
            sx={(theme) => ({
              fontSize: '22px',
              color: theme.semantic.foreground.brand.primary,
            })}
          />
        </FlexBox>
      );
    case 'content-badge':
    case 'custom':
    default:
      return (
        <FlexBox
          data-component="list-cell-label-trailing"
          data-parent-disabled={disabled}
          ref={ref}
          {...props}
          sx={[listCellLabelTrailingStyle, sx]}
        >
          {children}
        </FlexBox>
      );
  }
});

ListCellLabelTrailing.displayName = LIST_CELL_LABEL_TRAILING_NAME;

const ListCellExtraContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ListCellExtraContentProps, 'div'>
>(({ variant = 'custom', children, sx, ...props }, ref) => {
  const { disabled } = useListCellContext(LIST_CELL_EXTRA_CONTENT_NAME);

  switch (variant) {
    case 'text':
      return (
        <Typography
          data-component="list-cell-extra-content"
          ref={ref}
          variant="label2"
          weight="regular"
          data-parent-disabled={disabled}
          {...props}
          color="semantic.foreground.neutral.tertiary"
          sx={[listCellExtraContentStyle({ variant }), sx]}
        >
          {children}
        </Typography>
      );
    case 'content-badge':
      return (
        <FlexBox
          data-component="list-cell-extra-content"
          ref={ref}
          data-parent-disabled={disabled}
          {...props}
          sx={[
            listCellExtraContentStyle({ variant }),
            (theme) => ({
              paddingTop: theme.spacing[2],
            }),
            sx,
          ]}
        >
          {children}
        </FlexBox>
      );
    case 'custom':
    default:
      return (
        <FlexBox
          data-component="list-cell-extra-content"
          data-parent-disabled={disabled}
          ref={ref}
          {...props}
          sx={[listCellExtraContentStyle({ variant }), sx]}
        >
          {children}
        </FlexBox>
      );
  }
});

ListCellExtraContent.displayName = LIST_CELL_EXTRA_CONTENT_NAME;

const ListCellSelectedIcon = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <ListCellContent data-role="list-cell-selected-icon-check" ref={ref}>
      <IconCheck sx={{ fontSize: '22px' }} />
    </ListCellContent>
  );
});

ListCellSelectedIcon.displayName = LIST_CELL_SELECTED_ICON_NAME;

const ListText = forwardRef(
  <T extends ElementType = 'div'>(
    {
      variant = 'body2',
      weight: givenWeight,
      color,
      children,
      caption,
      captionProps,
      as,
      extraContent,
      labelTrailing,
      ...props
    }: PolymorphicPropsInternal<ListTextProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { selected, ellipsis, textId, captionId } =
      useListCellContext(LIST_TEXT_NAME);
    const { selected: menuItemSelected } = useMenuItemContext() || {};

    if (!children) {
      return null;
    }

    const weight: TypographyWeight =
      givenWeight ?? (selected || menuItemSelected ? 'bold' : 'medium');

    return (
      <Typography
        ref={ref}
        color={color}
        variant={variant}
        weight={weight}
        data-role="list-text-wrapper"
        {...props}
        as={as || 'div'}
        sx={[listTextStyle, props.sx]}
      >
        <Box
          as="span"
          data-role="list-text-content-wrapper"
          sx={listTextContentWrapperStyle(ellipsis)}
        >
          <Box as="p" data-role="list-text-content" id={textId}>
            {children}
          </Box>

          {labelTrailing}
        </Box>

        {Boolean(caption) && (
          <Typography
            variant="label2"
            color="semantic.foreground.neutral.tertiary"
            data-role="list-text-caption"
            id={captionId}
            {...captionProps}
            sx={[listTextEllipsisStyle(ellipsis), captionProps?.sx]}
          >
            {caption}
          </Typography>
        )}

        {Boolean(extraContent) && (
          <FlexBox
            data-role="list-extra-content-area"
            gap="6px"
            alignItems="center"
          >
            {extraContent}
          </FlexBox>
        )}
      </Typography>
    );
  },
) as PolymorphicComponentInternal<ListTextProps, 'p'>;

ListText.displayName = LIST_TEXT_NAME;

export {
  List,
  ListCell,
  ListCellContent,
  ListCellLabelTrailing,
  ListCellExtraContent,
};

export type {
  ListProps,
  ListCellProps,
  ListCellContentProps,
  ListCellLabelTrailingProps,
  ListCellExtraContentProps,
};
