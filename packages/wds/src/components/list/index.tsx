import { forwardRef, useState } from 'react';
import {
  type PolymorphicComponent,
  type PolymorphicProps,
  type ThemeColorsToken,
} from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { IconChevronRightTightSmall } from '@wanteddev/wds-icon';
import { Slot } from '@radix-ui/react-slot';

import { Divider, FlexBox, Typography, WithInteraction } from '..';
import { useMenuItemContext } from '../menu/contexts';
import { IconButtonProvider } from '../icon-button/contexts';
import { TextButtonProvider } from '../text-button/contexts';

import {
  LIST_CELL_NAME,
  LIST_ITEM_CONTENT_NAME,
  LIST_ITEM_NAME,
  LIST_NAME,
  LIST_TEXT_NAME,
} from './constants';
import {
  listCellDividerStyle,
  listCellStyle,
  listItemContentStyle,
  listItemStyle,
  listStyle,
  listTextEllipsisStyle,
} from './style';
import { ListItemProvider, useListItemContext } from './contexts';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { TypographyWeight } from '../typography/types';
import type {
  ListCellProps,
  ListItemContentProps,
  ListItemProps,
  ListProps,
  ListTextProps,
} from './types';

const List = forwardRef(
  (
    { children, ...props }: DefaultComponentProps<ListProps, 'ul'>,
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

const ListItem = forwardRef(
  <E extends ElementType = 'li'>(
    {
      as,
      leftContent,
      rightContent,
      active = false,
      disabled = false,
      ellipsis = false,
      alignItems: alignItemsProp,
      children,
      ...props
    }: PolymorphicProps<ListItemProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const [item, setItem] = useState<E | null>(null);
    const composedRefs = useComposedRefs(ref, (node) => setItem(node as E));

    const itemElement = item as unknown as HTMLElement | null;

    const controllable = itemElement?.querySelector(
      '[role="checkbox"], [role="radio"], button:not([role="switch"]), [role="button"], a',
    );
    const clickable = Boolean(props.onClick || controllable) && !disabled;

    const alignItems = alignItemsProp ?? ellipsis ? 'center' : 'flex-start';

    return (
      <ListItemProvider
        active={active}
        disabled={disabled}
        ellipsis={ellipsis}
        alignItems={alignItems}
      >
        <FlexBox
          as={(as || 'li') as E}
          role="listitem"
          ref={composedRefs}
          flexDirection="row"
          alignItems={alignItems}
          gap="8px"
          aria-disabled={disabled}
          disabled={disabled}
          tabIndex={clickable ? 0 : undefined}
          {...props}
          onKeyDown={composeEventHandlers(props.onKeyDown, (e) => {
            if (
              (e.key === 'Enter' || e.key === ' ') &&
              (e.target as HTMLElement) === itemElement
            ) {
              e.preventDefault();
              e.currentTarget.click();
            }
          })}
          onClick={composeEventHandlers(props.onClick, (e) => {
            if (
              (e.target as HTMLElement).getAttribute('disabled')?.toString() ===
                'true' ||
              (e.target as HTMLElement).ariaDisabled?.toString() === 'true' ||
              (e.target as HTMLElement).ariaHidden?.toString() === 'true' ||
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              (e.target as HTMLElement).hidden?.toString() === 'true'
            ) {
              return;
            }

            if (
              controllable &&
              // controllable 직접 클릭 시 이벤트 중복 호출을 방어함.
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
          sx={[listItemStyle({ active, disabled }), props.sx]}
        >
          {Boolean(leftContent) && leftContent}
          {children}
          {Boolean(rightContent) && (
            <Slot data-role="list-item-right-content">{rightContent}</Slot>
          )}
        </FlexBox>
      </ListItemProvider>
    );
  },
) as PolymorphicComponent<ListItemProps, 'li'>;

ListItem.displayName = LIST_ITEM_NAME;

const ListItemContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ListItemContentProps, 'div'>
>(
  (
    {
      variant = 'custom',
      height = 'normal',
      children,
      chevron = true,
      xl,
      lg,
      md,
      sm,
      xs,
      sx,
      ...props
    },
    ref,
  ) => {
    const { alignItems } = useListItemContext(LIST_ITEM_CONTENT_NAME);

    switch (variant) {
      case 'large-icon':
        return (
          <FlexBox
            wds-component="list-item-content"
            alignItems={alignItems}
            ref={ref}
            {...props}
            sx={[
              listItemContentStyle({ variant, height, xl, lg, md, sm, xs }),
              sx,
            ]}
          >
            <FlexBox>{children}</FlexBox>
          </FlexBox>
        );

      case 'button':
        return (
          <FlexBox
            wds-component="list-item-content"
            alignItems={alignItems}
            ref={ref}
            {...props}
            sx={[
              listItemContentStyle({ variant, height, xl, lg, md, sm, xs }),
              sx,
            ]}
          >
            <TextButtonProvider assistive="palette.label.alternative">
              {children}
            </TextButtonProvider>
          </FlexBox>
        );

      case 'icon-button':
        return (
          <FlexBox
            wds-component="list-item-content"
            alignItems={alignItems}
            ref={ref}
            {...props}
            sx={[
              listItemContentStyle({ variant, height, xl, lg, md, sm, xs }),
              sx,
            ]}
          >
            <IconButtonProvider normal="palette.label.alternative">
              {children}
            </IconButtonProvider>
          </FlexBox>
        );

      case 'chevron':
        return (
          <FlexBox
            role="button"
            alignItems={alignItems}
            wds-component="list-item-content"
            gap="8px"
            ref={ref}
            tabIndex={props.onClick ? 0 : -1}
            {...props}
            sx={sx}
          >
            {Boolean(children) && (
              <FlexBox
                justifyContent="flex-end"
                alignItems={alignItems}
                sx={listItemContentStyle({
                  variant,
                  height,
                  xl,
                  lg,
                  md,
                  sm,
                  xs,
                })}
              >
                {children}
              </FlexBox>
            )}
            {chevron && (
              <FlexBox alignItems="center" sx={{ height: '24px' }}>
                <IconChevronRightTightSmall
                  sx={(theme) => ({
                    color: theme.palette.label.assistive,
                  })}
                />
              </FlexBox>
            )}
          </FlexBox>
        );

      case 'icon':
      case 'avatar':
      case 'badge':
      case 'checkbox':
      case 'radio':
      case 'switch':
      case 'custom':
      default:
        return (
          <FlexBox
            wds-component="list-item-content"
            alignItems={alignItems}
            ref={ref}
            {...props}
            sx={[
              listItemContentStyle({ variant, height, xl, lg, md, sm, xs }),
              sx,
            ]}
          >
            {children}
          </FlexBox>
        );
    }
  },
);

ListItemContent.displayName = LIST_ITEM_CONTENT_NAME;

const ListCell = forwardRef(
  <E extends ElementType = 'li'>(
    {
      padding = '12px',
      fillWidth = false,
      divider,
      children,
      disabled,
      disableInteraction,
      interactionPadding = fillWidth ? undefined : '12px',
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicProps<ListCellProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <WithInteraction disabled={disabled || disableInteraction}>
        <ListItem
          ref={ref}
          role="button"
          disabled={disabled}
          {...props}
          sx={[
            listCellStyle({
              padding,
              fillWidth,
              disabled,
              disableInteraction,
              interactionPadding,
              xs,
              sm,
              md,
              lg,
              xl,
            }),
            props.sx,
          ]}
        >
          {children}
          {divider && (
            <Divider data-role="list-cell-divider" sx={listCellDividerStyle} />
          )}
        </ListItem>
      </WithInteraction>
    );
  },
) as PolymorphicComponent<ListCellProps, 'li'>;

ListCell.displayName = LIST_CELL_NAME;

const ListText = forwardRef(
  <E extends ElementType = 'p'>(
    {
      color,
      children,
      caption,
      captionProps,
      sx,
      ...props
    }: PolymorphicProps<ListTextProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const { active, disabled, ellipsis } = useListItemContext(LIST_TEXT_NAME);
    const { active: menuItemActive } = useMenuItemContext() || {};

    if (!children) {
      return null;
    }

    const weight: TypographyWeight =
      active || menuItemActive ? 'medium' : 'regular';

    const getTextColor = (): ThemeColorsToken => {
      if (disabled) {
        return 'palette.label.alternative';
      }
      if (active) {
        return 'palette.primary.normal';
      }

      return color ?? 'palette.label.normal';
    };

    return (
      <FlexBox
        ref={ref}
        flexDirection="column"
        gap="4px"
        flex="1"
        as="p"
        {...props}
        sx={{ overflow: 'hidden' }}
      >
        <Typography
          variant="body1_normal"
          color={getTextColor()}
          weight={weight}
          sx={[ellipsis && listTextEllipsisStyle, sx]}
          {...props}
        >
          {children}
        </Typography>

        {Boolean(caption) && (
          <Typography
            variant="label1_normal"
            color="palette.label.alternative"
            {...captionProps}
            sx={[ellipsis && listTextEllipsisStyle, captionProps?.sx]}
          >
            {caption}
          </Typography>
        )}
      </FlexBox>
    );
  },
) as PolymorphicComponent<ListTextProps, 'span'>;

ListText.displayName = LIST_TEXT_NAME;

export { List, ListCell, ListItem, ListItemContent, ListText };
