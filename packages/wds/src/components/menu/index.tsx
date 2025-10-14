import { forwardRef } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import {
  RovingFocusGroup,
  RovingFocusGroupItem,
} from '@radix-ui/react-roving-focus';
import { composeEventHandlers } from '@radix-ui/primitive';
import { IconCheck } from '@wanteddev/wds-icon';
import { Slot } from '@radix-ui/react-slot';

import { List, ListCell, ListCellContent } from '../list';
import { ScrollArea } from '../scroll-area';
import { Radio } from '../radio';
import { Checkbox } from '../checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { FlexBox } from '../flex-box';
import { Typography } from '../typography';
import { usePopoverContext } from '../popover/contexts';
import { createScope } from '../../hooks/internal/use-scope-context';
import { isElementDisabled } from '../../utils/internal/element';

import {
  MENU_ACTION_AREA_CONTENT_NAME,
  MENU_ACTION_AREA_NAME,
  MENU_CONTENT_NAME,
  MENU_GROUP_NAME,
  MENU_ITEM_CHECKBOX_NAME,
  MENU_ITEM_CONTENT_NAME,
  MENU_ITEM_NAME,
  MENU_ITEM_RADIO_NAME,
  MENU_LIST_NAME,
  MENU_NAME,
  MENU_TRIGGER_NAME,
} from './constants';
import {
  menuActionAreaContentStyle,
  menuActionAreaStyle,
  menuGroupStyle,
  menuGroupTitleStyle,
  menuItemStyle,
  menuListStyle,
  menuPopoverContentStyle,
  menuScrollAreaStyle,
} from './style';
import { MenuItemProvider, MenuProvider, useMenuContext } from './contexts';

import type { ListCellContentProps } from '../list';
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
  MenuTriggerProps,
} from './types';
import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef, ReactNode } from 'react';

const useMenuScope = createScope('Popover');

const ARROW_KEYS = ['ArrowUp', 'ArrowDown'];

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

  return (
    <MenuProvider value={value} onValueChange={setValue}>
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

  return (
    <PopoverTrigger
      {...props}
      {...scopes}
      ref={ref}
      onKeyDown={composeEventHandlers(props.onKeyDown, (e) => {
        if (
          open ||
          isElementDisabled(e.currentTarget) ||
          !ARROW_KEYS.includes(e.key)
        ) {
          return;
        }

        e.preventDefault();
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
      ...props
    }: PolymorphicPropsInternal<MenuContentProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const scopes = useMenuScope('Menu');

    return (
      <RovingFocusGroup orientation="vertical" dir="ltr" asChild>
        <PopoverContent
          ref={ref}
          position={position}
          offset={offset}
          container={container}
          disablePortal={disablePortal}
          forceMount={forceMount}
          aria-label="Select menu"
          variant="custom"
          {...props}
          {...scopes}
          sx={[menuPopoverContentStyle, sx]}
        >
          <ScrollArea zIndex={11} sx={menuScrollAreaStyle} size="small">
            {children}
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
          color="semantic.label.alternative"
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
          disabled={disabled}
          role="menuitemradio"
          ref={ref}
          selected={normalActive}
          aria-current={undefined}
          aria-checked={normalActive}
          trailingContent={
            normalActive ? (
              <ListCellContent variant="icon">
                <IconCheck data-role="menu-item-active-icon-check" />
              </ListCellContent>
            ) : null
          }
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
        aria-current={undefined}
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
        aria-current={undefined}
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

const MenuItemContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ListCellContentProps, 'div'>
>((props, ref) => {
  return <ListCellContent ref={ref} {...props} />;
});

MenuItemContent.displayName = MENU_ITEM_CONTENT_NAME;

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
          wds-component="menu-action-area-content"
          ref={ref}
          {...props}
          sx={[
            menuActionAreaContentStyle(variant),
            (theme) => ({
              fontSize: '24px',
              color: theme.semantic.label.alternative,
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
          wds-component="menu-bottom-content"
          ref={ref}
          {...props}
          sx={[menuActionAreaContentStyle(variant), sx]}
        >
          {children}
        </FlexBox>
      );

    case 'badge':
    case 'custom':
    default:
      return (
        <FlexBox
          wds-component="menu-bottom-content"
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
  MenuItemContent,
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
  ListCellContentProps as MenuItemContentProps,
  MenuActionAreaProps,
  MenuActionAreaContentProps,
};
