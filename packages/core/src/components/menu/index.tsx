import { IconChevronRightTightSmall } from '@montage-ui/icon';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import {
  RovingFocusGroup,
  RovingFocusGroupItem,
} from '@radix-ui/react-roving-focus';
import { Slot } from '@radix-ui/react-slot';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { forwardRef, useRef, useState } from 'react';

import { createScope } from '../../hooks/internal/use-scope-context';
import { SlotDefaultsProvider } from '../../hooks/internal/use-slot-defaults';
import {
  isElementDisabled,
  scrollIntoViewIfNeeded,
} from '../../utils/internal/element';
import { Checkbox } from '../checkbox';
import { FlexBox } from '../flex-box';
import {
  List,
  ListCell,
  ListCellContent,
  ListCellExtraContent,
  ListCellLabelTrailing,
} from '../list';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { usePopoverContext } from '../popover/contexts';
import { PopperAnchor } from '../popper';
import { Radio } from '../radio';
import { ScrollArea } from '../scroll-area';
import { Typography } from '../typography';

import {
  MENU_ACTION_AREA_CONTENT_NAME,
  MENU_ACTION_AREA_CONTENT_SLOT_DEFAULTS,
  MENU_ACTION_AREA_NAME,
  MENU_CONTENT_NAME,
  MENU_GROUP_NAME,
  MENU_ITEM_CHECKBOX_NAME,
  MENU_ITEM_CONTENT_NAME,
  MENU_ITEM_EXTRA_CONTENT_NAME,
  MENU_ITEM_LABEL_TRAILING_NAME,
  MENU_ITEM_NAME,
  MENU_ITEM_RADIO_NAME,
  MENU_LIST_NAME,
  MENU_NAME,
  MENU_SUB_CONTENT_NAME,
  MENU_SUB_NAME,
  MENU_SUB_TRIGGER_NAME,
  MENU_TRIGGER_NAME,
  SUBMENU_CLOSE_KEYS,
  SUBMENU_OPEN_KEYS,
} from './constants';
import {
  MenuContentProvider,
  MenuItemProvider,
  MenuProvider,
  MenuSubProvider,
  useMenuContentContext,
  useMenuContext,
  useMenuSubContext,
} from './contexts';
import { getFocusableItems, isEditableTarget } from './helpers';
import { useSubmenuHover } from './hooks';
import {
  menuActionAreaContentStyle,
  menuActionAreaStyle,
  menuGroupStyle,
  menuGroupTitleStyle,
  menuItemStyle,
  menuListStyle,
  menuPopoverContentStyle,
  menuScrollAreaStyle,
  menuSubTriggerChevronStyle,
  menuSubTriggerStyle,
} from './style';

import type {
  ListCellContentProps,
  ListCellExtraContentProps,
  ListCellLabelTrailingProps,
} from '../list';
import type { MenuOpenReason } from './contexts';
import type {
  MenuActionAreaContentProps,
  MenuActionAreaProps,
  MenuContentProps,
  MenuDefaultProps,
  MenuGroupProps,
  MenuItemCheckboxProps,
  MenuItemProps,
  MenuItemRadioProps,
  MenuListProps,
  MenuProps,
  MenuSubContentProps,
  MenuSubProps,
  MenuSubTriggerProps,
  MenuTriggerProps,
} from './types';
import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@montage-ui/engine';
import type { ElementType, ForwardedRef, ReactNode } from 'react';

const useMenuScope = createScope('Popover');
// Mirrors how Popover derives its Popper scope, so a sub trigger can anchor
// the submenu without going through PopoverTrigger's dialog semantics.
const usePopperScope = createScope('Popper');

const ARROW_KEYS = ['ArrowUp', 'ArrowDown'];
/** Keys that move focus from the popup onto its first or last item. */
const FIRST_ITEM_KEYS = ['ArrowDown', 'Home', 'PageUp'];
const LAST_ITEM_KEYS = ['ArrowUp', 'End', 'PageDown'];

const Menu = ({
  defaultValue,
  value: valueProp,
  onValueChange,
  children,
  ...props
}: MenuProps) => {
  const [value, setValue] = useControllableState<MenuDefaultProps['value']>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const scopes = useMenuScope('Menu');
  // Opened programmatically (e.g. `defaultOpen`) counts as a pointer open,
  // so no item is focused until the user starts navigating.
  const openReasonRef = useRef<MenuOpenReason>('click');

  return (
    <MenuProvider
      value={value}
      onValueChange={setValue}
      openReasonRef={openReasonRef}
    >
      <Popover {...scopes} {...props}>
        {children}
      </Popover>
    </MenuProvider>
  );
};

Menu.displayName = MENU_NAME;

const MenuTrigger = forwardRef<HTMLElement, MenuTriggerProps>((props, ref) => {
  const scopes = useMenuScope('Menu');
  const { open, onOpenChange } = usePopoverContext(
    MENU_TRIGGER_NAME,
    scopes.__scopePopover,
  );
  const { openReasonRef } = useMenuContext(MENU_TRIGGER_NAME);

  return (
    <PopoverTrigger
      {...props}
      {...scopes}
      ref={ref}
      // Runs before PopoverTrigger opens. Enter / Space on a button, or a
      // trigger calling `click()` for them, dispatches a click with no detail.
      onClick={composeEventHandlers(props.onClick, (e) => {
        if (!open)
          openReasonRef.current = e.detail === 0 ? 'keyboard' : 'click';
      })}
      onKeyDown={composeEventHandlers(props.onKeyDown, (e) => {
        if (
          open ||
          isElementDisabled(e.currentTarget) ||
          !ARROW_KEYS.includes(e.key)
        ) {
          return;
        }

        e.preventDefault();
        openReasonRef.current = 'keyboard';
        onOpenChange(true);
      })}
    />
  );
});

MenuTrigger.displayName = MENU_TRIGGER_NAME;

const MenuContent = forwardRef(
  <T extends ElementType = 'div'>(
    {
      position = 'bottom-center',
      offset,
      container,
      disablePortal,
      sx,
      children,
      forceMount,
      onMountAutoFocus,
      ...props
    }: PolymorphicPropsInternal<MenuContentProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const scopes = useMenuScope('Menu');
    const { openReasonRef } = useMenuContext(MENU_CONTENT_NAME);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const [content, setContent] = useState<HTMLElement | null>(null);
    const composedRef = useComposedRefs(
      ref as ForwardedRef<HTMLElement>,
      setContent,
    );

    return (
      <RovingFocusGroup
        orientation="vertical"
        dir="ltr"
        asChild
        preventScrollOnEntryFocus
      >
        <PopoverContent
          ref={composedRef}
          position={position}
          offset={offset}
          container={container}
          disablePortal={disablePortal}
          forceMount={forceMount}
          aria-label="Select menu"
          variant="custom"
          // RovingFocusGroup's onEntryFocus never fires here: the group mounts
          // while the popover is closed, and Radix only attaches the listener
          // to the node present at mount. FocusScope's mount event fires on
          // every open, right before the active item receives focus.
          onMountAutoFocus={composeEventHandlers(
            onMountAutoFocus,
            (e) => {
              // The reason belongs to this open only. A later open that skips
              // the trigger (controlled `open`) must not reuse it.
              const openReason = openReasonRef.current;
              openReasonRef.current = 'click';

              if (e.defaultPrevented) return;

              const viewport = viewportRef.current;
              const firstSelectedItem = viewport?.querySelector<HTMLElement>(
                '[data-menu-selected="true"]',
              );

              if (viewport && firstSelectedItem) {
                scrollIntoViewIfNeeded(viewport, firstSelectedItem);
              }

              // Otherwise the popup gets focus and its roving group moves it
              // to the selected item, or to the first item.
              if (firstSelectedItem || openReason === 'keyboard') return;

              // Opened by pointer with nothing selected: focus the popup
              // without landing on an item, so the first arrow key press
              // reaches the first item instead of skipping it.
              e.preventDefault();
              viewport?.focus({ preventScroll: true });
            },
            // Runs even when the autofocus was prevented (by the consumer, or
            // by a submenu opened by pointer), so the reason is still reset.
            { checkForDefaultPrevented: false },
          )}
          {...props}
          {...scopes}
          sx={[menuPopoverContentStyle, sx]}
        >
          <ScrollArea
            zIndex={11}
            sx={menuScrollAreaStyle}
            size="small"
            viewportRef={viewportRef}
            viewportProps={{
              tabIndex: -1,
              sx: { outline: 'none' },
              onKeyDown: (e) => {
                // Only while the popup itself holds focus; items handle their
                // own navigation.
                if (e.target !== e.currentTarget) return;

                const items = getFocusableItems(e.currentTarget);
                const item = FIRST_ITEM_KEYS.includes(e.key)
                  ? items[0]
                  : LAST_ITEM_KEYS.includes(e.key)
                    ? items.at(-1)
                    : undefined;

                if (!item) return;

                e.preventDefault();
                item.focus();
              },
            }}
          >
            <MenuContentProvider content={content}>
              {children}
            </MenuContentProvider>
          </ScrollArea>
        </PopoverContent>
      </RovingFocusGroup>
    );
  },
) as PolymorphicComponentInternal<MenuContentProps, 'div'>;

MenuContent.displayName = MENU_CONTENT_NAME;

const MenuList = forwardRef<
  HTMLUListElement,
  DefaultComponentPropsInternal<MenuListProps, 'ul'>
>(({ sx, ...props }, ref) => {
  return (
    <List
      ref={ref}
      role="menu"
      alignItems="center"
      gap="4px"
      {...props}
      sx={[menuListStyle, sx]}
    />
  );
});

MenuList.displayName = MENU_LIST_NAME;

const MenuGroup = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<MenuGroupProps, 'div'>
>(({ title, sx, children, ...props }, ref) => {
  return (
    <FlexBox
      ref={ref}
      role="group"
      alignItems="center"
      flexDirection="column"
      gap="4px"
      {...props}
      sx={[menuGroupStyle, sx]}
    >
      {Boolean(title) && (
        <Typography
          variant="caption1"
          weight="bold"
          color="semantic.foreground.neutral.tertiary"
          sx={menuGroupTitleStyle}
        >
          {title}
        </Typography>
      )}
      {children}
    </FlexBox>
  );
});

MenuGroup.displayName = MENU_GROUP_NAME;

const MenuItem = forwardRef<any, MenuItemProps>(
  <T extends ElementType = 'li'>(
    {
      variant = 'normal',
      onKeyDown,
      sx,
      ...props
    }: PolymorphicPropsInternal<MenuItemProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { disabled } = props;
    const context = useMenuContext(MENU_ITEM_NAME);

    const normalActive = Array.isArray(context.value)
      ? context.value.includes(props.value)
      : props.value === context.value;

    const renderComponent: {
      [key in Exclude<MenuItemProps['variant'], undefined>]: ReactNode;
    } = {
      radio: <MenuItemRadio ref={ref} {...props} sx={[menuItemStyle, sx]} />,
      checkbox: (
        <MenuItemCheckbox ref={ref} {...props} sx={[menuItemStyle, sx]} />
      ),
      normal: (
        <ListCell
          data-menu-selected={normalActive}
          disabled={disabled}
          role="menuitemradio"
          ref={ref}
          selected={normalActive}
          aria-current={undefined}
          aria-checked={normalActive}
          {...props}
          sx={[menuItemStyle, sx]}
          onClick={composeEventHandlers(props.onClick, (e) => {
            e.preventDefault();

            const { value } = props;
            const values = context.value;

            if (Array.isArray(values)) {
              return context.onValueChange(
                values.includes(value)
                  ? values.filter((valueItem) => valueItem !== value)
                  : [...values, value],
              );
            }

            context.onValueChange(value);
          })}
        />
      ),
    };

    return (
      <MenuItemProvider
        selected={variant === 'normal' ? normalActive : undefined}
      >
        <RovingFocusGroupItem
          asChild
          focusable={!disabled}
          active={normalActive}
          data-active={normalActive}
          onKeyDown={composeEventHandlers(onKeyDown, (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              (e.target as HTMLElement).click();
            }
          })}
        >
          {renderComponent[variant]}
        </RovingFocusGroupItem>
      </MenuItemProvider>
    );
  },
) as PolymorphicComponentInternal<MenuItemProps, 'li'>;

MenuItem.displayName = MENU_ITEM_NAME;

const MenuItemRadio = forwardRef<any, MenuItemRadioProps>(
  <T extends ElementType = 'li'>(
    { value, ...props }: PolymorphicPropsInternal<MenuItemRadioProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const context = useMenuContext(MENU_ITEM_NAME);

    const checked = context.value === value;

    return (
      <ListCell
        ref={ref}
        role="menuitemradio"
        aria-checked={checked}
        leadingContent={
          <ListCellContent variant="radio">
            <Radio tabIndex={-1} checked={checked} value={value} />
          </ListCellContent>
        }
        trailingContent={null}
        aria-current={undefined}
        data-menu-selected={checked}
        {...props}
        onClick={composeEventHandlers(props.onClick, (e) => {
          if (!e.defaultPrevented) {
            context.onValueChange(value);
          }
          e.preventDefault();
        })}
      />
    );
  },
) as PolymorphicComponentInternal<MenuItemRadioProps, 'li'>;

MenuItemRadio.displayName = MENU_ITEM_CHECKBOX_NAME;

const MenuItemCheckbox = forwardRef<any, MenuItemRadioProps>(
  <T extends ElementType = 'li'>(
    { value, ...props }: PolymorphicPropsInternal<MenuItemRadioProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const context = useMenuContext(MENU_ITEM_NAME);
    const valueList = Array.isArray(context.value) ? [...context.value] : [];

    const checked = valueList.includes(value);

    const onCheckedChange = (newChecked: boolean) => {
      context.onValueChange(
        newChecked
          ? [...valueList, value]
          : valueList.filter((valueItem) => valueItem !== value),
      );
    };

    return (
      <ListCell
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        leadingContent={
          <ListCellContent variant="checkbox">
            <Checkbox
              tabIndex={-1}
              checked={checked}
              onCheckedChange={onCheckedChange}
            />
          </ListCellContent>
        }
        trailingContent={null}
        aria-current={undefined}
        data-menu-selected={checked}
        {...props}
        onClick={composeEventHandlers(props.onClick, (e) => {
          if (!e.defaultPrevented) {
            onCheckedChange(!checked);
          }
          e.preventDefault();
        })}
      />
    );
  },
) as PolymorphicComponentInternal<MenuItemCheckboxProps, 'li'>;

MenuItemCheckbox.displayName = MENU_ITEM_RADIO_NAME;

const MenuSub = ({
  open: openProp,
  defaultOpen,
  onOpenChange,
  children,
}: MenuSubProps) => {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
  });
  const openReasonRef = useRef<MenuOpenReason>('hover');
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const [content, setContent] = useState<HTMLElement | null>(null);

  const scopes = useMenuScope('Menu');
  const menu = useMenuContext(MENU_SUB_NAME);

  return (
    <MenuSubProvider
      open={open}
      onOpenChange={(nextOpen, reason) => {
        if (nextOpen && reason) openReasonRef.current = reason;
        setOpen(nextOpen);
      }}
      trigger={trigger}
      onTriggerChange={setTrigger}
      content={content}
      onContentChange={setContent}
    >
      {/* Re-provided with the root menu's value, so submenu items select into
          it, but with this submenu's own open reason. The Popover shares the
          root menu's scope, so it shadows the parent's for everything below. */}
      <MenuProvider
        value={menu.value}
        onValueChange={menu.onValueChange}
        openReasonRef={openReasonRef}
      >
        <Popover {...scopes} open={open} onOpenChange={setOpen}>
          {children}
        </Popover>
      </MenuProvider>
    </MenuSubProvider>
  );
};

MenuSub.displayName = MENU_SUB_NAME;

const MenuSubTrigger = forwardRef<
  HTMLLIElement,
  DefaultComponentPropsInternal<MenuSubTriggerProps, 'li'>
>(
  (
    {
      openOnHover = true,
      enterDelay = 100,
      disabled,
      trailingContent,
      onClick,
      onKeyDown,
      onPointerMove,
      onPointerLeave,
      sx,
      ...props
    },
    ref,
  ) => {
    const scopes = useMenuScope('Menu');
    const popperScopes = usePopperScope(scopes.__scopePopover);
    const { triggerId, contentId } = usePopoverContext(
      MENU_SUB_TRIGGER_NAME,
      scopes.__scopePopover,
    );
    const { content: parentContent } = useMenuContentContext(
      MENU_SUB_TRIGGER_NAME,
    );
    const sub = useMenuSubContext(MENU_SUB_TRIGGER_NAME);
    const composedRef = useComposedRefs(ref, sub.onTriggerChange);

    const hover = useSubmenuHover({
      open: sub.open,
      onOpenChange: (nextOpen) => sub.onOpenChange(nextOpen, 'hover'),
      trigger: sub.trigger,
      content: sub.content,
      parentContent,
      enabled: openOnHover && !disabled,
      enterDelay,
    });

    return (
      <RovingFocusGroupItem
        asChild
        focusable={!disabled}
        onKeyDown={composeEventHandlers(onKeyDown, (e) => {
          if (disabled || !SUBMENU_OPEN_KEYS.includes(e.key)) return;

          e.preventDefault();

          if (sub.open) {
            // Opened by hover: focus stayed here, so hand it to the submenu.
            // Focusing the popup lets its roving group pick the entry item.
            sub.content?.focus();
            return;
          }

          sub.onOpenChange(true, 'keyboard');
        })}
      >
        <PopperAnchor {...popperScopes}>
          <ListCell
            ref={composedRef}
            id={triggerId}
            role="menuitem"
            aria-haspopup="menu"
            aria-expanded={sub.open}
            aria-controls={sub.open ? contentId : undefined}
            aria-current={undefined}
            data-status={sub.open ? 'open' : 'close'}
            disabled={disabled}
            trailingContent={
              trailingContent ?? (
                <IconChevronRightTightSmall
                  aria-hidden
                  data-role="menu-sub-trigger-chevron"
                  data-parent-disabled={disabled}
                  sx={menuSubTriggerChevronStyle}
                />
              )
            }
            {...props}
            sx={[menuItemStyle, menuSubTriggerStyle, sx]}
            onClick={composeEventHandlers(onClick, (e) => {
              e.preventDefault();

              if (disabled || sub.open) return;

              sub.onOpenChange(true, 'click');
            })}
            onPointerMove={composeEventHandlers(
              onPointerMove,
              hover.onPointerMove,
            )}
            onPointerLeave={composeEventHandlers(
              onPointerLeave,
              hover.onPointerLeave,
            )}
          />
        </PopperAnchor>
      </RovingFocusGroupItem>
    );
  },
);

MenuSubTrigger.displayName = MENU_SUB_TRIGGER_NAME;

const MenuSubContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<MenuSubContentProps, 'div'>
>(
  (
    {
      position = 'right-start',
      offset = 28,
      fallbackAxisSide = 'end',
      fallbackAxisOffset = 8,
      onMountAutoFocus,
      onUnmountAutoFocus,
      onKeyDown,
      onFocusOutside,
      onPointerDownOutside,
      ...props
    },
    ref,
  ) => {
    const scopes = useMenuScope('Menu');
    const { triggerId } = usePopoverContext(
      MENU_SUB_CONTENT_NAME,
      scopes.__scopePopover,
    );
    const sub = useMenuSubContext(MENU_SUB_CONTENT_NAME);
    const { openReasonRef } = useMenuContext(MENU_SUB_CONTENT_NAME);
    const composedRef = useComposedRefs(ref, sub.onContentChange);

    const isTriggerEvent = (e: Event) =>
      Boolean(sub.trigger?.contains(e.target as Node));

    return (
      <MenuContent
        ref={composedRef}
        position={position}
        offset={offset}
        fallbackAxisSide={fallbackAxisSide}
        fallbackAxisOffset={fallbackAxisOffset}
        aria-labelledby={triggerId}
        // The parent menu must stay interactive so the pointer can move back
        // to it, and focus may return to it without dismissing this submenu.
        trapped={false}
        disableOutsidePointerEvents={false}
        {...props}
        onMountAutoFocus={composeEventHandlers(onMountAutoFocus, (e) => {
          // Only a keyboard open moves focus in. Otherwise focus stays on
          // the trigger, as the pointer may still be traveling to it.
          if (openReasonRef.current !== 'keyboard') e.preventDefault();
        })}
        onUnmountAutoFocus={composeEventHandlers(onUnmountAutoFocus, (e) => {
          // Focus left with the popup (e.g. Escape from inside it). Return
          // it to the trigger instead of wherever it was when this submenu
          // opened, which for a hover open is not the trigger.
          const activeElement = document.activeElement;
          if (activeElement && activeElement !== document.body) return;

          e.preventDefault();
          sub.trigger?.focus();
        })}
        onKeyDown={composeEventHandlers(onKeyDown, (e) => {
          // Keys from a nested submenu bubble through the React tree; let
          // that submenu handle its own close.
          if (!e.currentTarget.contains(e.target as Node)) return;
          if (!SUBMENU_CLOSE_KEYS.includes(e.key)) return;
          // ArrowLeft moves the caret in a field inside the submenu.
          if (isEditableTarget(e.target)) return;

          e.preventDefault();
          sub.trigger?.focus();
          sub.onOpenChange(false);
        })}
        // Focusing or pressing the trigger keeps the submenu: the trigger
        // owns the open state, and re-opening would flicker the popup.
        onFocusOutside={composeEventHandlers(onFocusOutside, (e) => {
          if (isTriggerEvent(e)) e.preventDefault();
        })}
        onPointerDownOutside={composeEventHandlers(
          onPointerDownOutside,
          (e) => {
            if (isTriggerEvent(e)) e.preventDefault();
          },
        )}
      />
    );
  },
);

MenuSubContent.displayName = MENU_SUB_CONTENT_NAME;

const MenuItemContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ListCellContentProps, 'div'>
>((props, ref) => {
  return <ListCellContent ref={ref} {...props} />;
});

MenuItemContent.displayName = MENU_ITEM_CONTENT_NAME;

const MenuItemLabelTrailing = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ListCellLabelTrailingProps, 'div'>
>((props, ref) => {
  return <ListCellLabelTrailing ref={ref} {...props} />;
});

MenuItemLabelTrailing.displayName = MENU_ITEM_LABEL_TRAILING_NAME;

const MenuItemExtraContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ListCellExtraContentProps, 'div'>
>((props, ref) => {
  return <ListCellExtraContent ref={ref} {...props} />;
});

MenuItemExtraContent.displayName = MENU_ITEM_EXTRA_CONTENT_NAME;

const MenuActionArea = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<MenuActionAreaProps, 'div'>
>(({ leadingContent, trailingContent, children, sx, ...props }, ref) => {
  return (
    <FlexBox
      ref={ref}
      alignItems="center"
      justifyContent="space-between"
      {...props}
      sx={[menuActionAreaStyle, sx]}
    >
      {Boolean(leadingContent) && (
        <Slot data-role="menu-action-area-leading-content">
          {leadingContent}
        </Slot>
      )}
      {children}
      {Boolean(trailingContent) && (
        <Slot data-role="menu-action-area-trailing-content">
          {trailingContent}
        </Slot>
      )}
    </FlexBox>
  );
});

MenuActionArea.displayName = MENU_ACTION_AREA_NAME;

const MenuActionAreaContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<MenuActionAreaContentProps, 'div'>
>(({ variant = 'custom', sx, children, ...props }, ref) => {
  switch (variant) {
    case 'icon':
      return (
        <FlexBox
          data-component="menu-action-area-content"
          ref={ref}
          {...props}
          sx={[
            menuActionAreaContentStyle(variant),
            (theme) => ({
              fontSize: '24px',
              color: theme.semantic.foreground.neutral.tertiary,
            }),
            sx,
          ]}
        >
          {children}
        </FlexBox>
      );

    case 'button':
    case 'icon-button':
    case 'text-button':
    case 'chip-filter':
      return (
        <FlexBox
          data-component="menu-bottom-content"
          ref={ref}
          {...props}
          sx={[menuActionAreaContentStyle(variant), sx]}
        >
          <SlotDefaultsProvider
            value={MENU_ACTION_AREA_CONTENT_SLOT_DEFAULTS[variant]}
          >
            {children}
          </SlotDefaultsProvider>
        </FlexBox>
      );

    case 'badge':
    case 'custom':
    default:
      return (
        <FlexBox
          data-component="menu-bottom-content"
          ref={ref}
          {...props}
          sx={[menuActionAreaContentStyle(variant), sx]}
        >
          {children}
        </FlexBox>
      );
  }
});

MenuActionAreaContent.displayName = MENU_ACTION_AREA_CONTENT_NAME;

export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
  MenuItemContent,
  MenuItemLabelTrailing,
  MenuItemExtraContent,
  MenuActionArea,
  MenuActionAreaContent,
};

export type {
  MenuProps,
  MenuTriggerProps,
  MenuContentProps,
  MenuListProps,
  MenuGroupProps,
  MenuItemProps,
  MenuSubProps,
  MenuSubTriggerProps,
  MenuSubContentProps,
  ListCellContentProps as MenuItemContentProps,
  ListCellLabelTrailingProps as MenuItemLabelTrailingProps,
  ListCellExtraContentProps as MenuItemExtraContentProps,
  MenuActionAreaProps,
  MenuActionAreaContentProps,
};
