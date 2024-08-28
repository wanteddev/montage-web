import { forwardRef } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import {
  RovingFocusGroup,
  RovingFocusGroupItem,
} from '@radix-ui/react-roving-focus';
import { composeEventHandlers } from '@radix-ui/primitive';

import { List, ListCell, ListItemContent } from '../list';
import ScrollArea from '../scroll-area';
import Radio from '../radio';
import Checkbox from '../checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import FlexBox from '../flex-box';
import Typography from '../typography';

import {
  MENU_CONTENT_NAME,
  MENU_GROUP_NAME,
  MENU_ITEM_CHECKBOX_NAME,
  MENU_ITEM_NAME,
  MENU_ITEM_RADIO_NAME,
  MENU_NAME,
  MENU_TRIGGER_NAME,
} from './constants';
import {
  listInMenuStyle,
  menuGroupStyle,
  menuGroupTitleStyle,
  menuItemStyle,
  menuPopoverContentStyle,
  menuScrollAreaStyle,
} from './style';
import { MenuProvider, useMenuContext } from './context';

import type {
  MenuContentProps,
  MenuDefaultProps,
  MenuGroupDefaultProps,
  MenuItemCheckboxProps,
  MenuItemProps,
  MenuItemRadioProps,
  MenuProps,
} from './types';
import type {
  DefaultComponentProps,
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type {
  ElementRef,
  ElementType,
  ForwardedRef,
  PropsWithChildren,
} from 'react';

const Menu = (props: PropsWithChildren<MenuProps>) => {
  const {
    defaultValue,
    value: valueProp,
    onValueChange,
    children,
    ...popoverProps
  } = props;

  const [value, setValue] = useControllableState<MenuDefaultProps['value']>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  return (
    <MenuProvider value={value} onValueChange={setValue}>
      <Popover {...popoverProps}>{children}</Popover>
    </MenuProvider>
  );
};

Menu.displayName = MENU_NAME;

const MenuTrigger = PopoverTrigger;

MenuTrigger.displayName = MENU_TRIGGER_NAME;

const MenuContent = forwardRef(
  (
    { children, ...props }: MenuContentProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <PopoverContent
        ref={ref}
        position="top-start"
        sx={[menuPopoverContentStyle, props.sx]}
      >
        <RovingFocusGroup orientation="vertical" dir="ltr" loop asChild>
          <ScrollArea ref={ref} zIndex={11} sx={menuScrollAreaStyle}>
            <List
              role="menu"
              alignItems="center"
              gap="4px"
              {...props}
              sx={listInMenuStyle}
            >
              {children}
            </List>
          </ScrollArea>
        </RovingFocusGroup>
      </PopoverContent>
    );
  },
);

MenuContent.displayName = MENU_CONTENT_NAME;

const MenuGroup = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<MenuGroupDefaultProps, 'div'>
>(({ title, children, ...props }, ref) => {
  return (
    <FlexBox
      ref={ref}
      role="group"
      alignItems="center"
      flexDirection="column"
      {...props}
      sx={[menuGroupStyle, props.sx]}
    >
      {Boolean(title) && (
        <Typography
          variant="caption1"
          weight="bold"
          color="palette.label.alternative"
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

const MenuItem = forwardRef(
  <E extends ElementType = 'li'>(
    {
      variant = 'normal',
      disabled,
      ...props
    }: PolymorphicProps<MenuItemProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const context = useMenuContext(MENU_ITEM_NAME);

    switch (variant) {
      case 'radio':
        return (
          <RovingFocusGroupItem asChild focusable={!disabled}>
            <MenuItemRadio
              disabled={disabled}
              ref={ref}
              {...props}
              sx={[menuItemStyle, props.sx]}
            />
          </RovingFocusGroupItem>
        );
      case 'checkbox':
        return (
          <RovingFocusGroupItem asChild focusable={!disabled}>
            <MenuItemCheckbox
              disabled={disabled}
              ref={ref}
              {...props}
              sx={[menuItemStyle, props.sx]}
            />
          </RovingFocusGroupItem>
        );
      case 'normal':
      default:
        return (
          <RovingFocusGroupItem asChild focusable={!disabled}>
            <ListCell
              disabled={disabled}
              role="menuitem"
              ref={ref}
              {...props}
              sx={[menuItemStyle, props.sx]}
              onClick={composeEventHandlers(
                props.onClick,
                (e) => {
                  e.preventDefault();
                  context.onValueChange(props.value);
                },
                {
                  checkForDefaultPrevented: false,
                },
              )}
            />
          </RovingFocusGroupItem>
        );
    }
  },
) as PolymorphicComponent<MenuItemProps, 'li'>;

MenuItem.displayName = MENU_ITEM_NAME;

const MenuItemRadio = forwardRef(
  <E extends ElementType = 'li'>(
    { value, ...props }: PolymorphicProps<MenuItemRadioProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const context = useMenuContext(MENU_ITEM_NAME);

    return (
      <ListCell
        ref={ref}
        role="menuitemradio"
        leftContent={
          <ListItemContent variant="radio">
            <Radio tabIndex={-1} value={value} />
          </ListItemContent>
        }
        {...props}
        onKeyDown={composeEventHandlers(props.onKeyDown, (e) => {
          // 동작 안할수도..?
          (e.target as HTMLElement).click();
        })}
        onClick={composeEventHandlers(
          props.onClick,
          (e) => {
            if (!e.defaultPrevented) {
              context.onValueChange(value);
            }

            e.preventDefault();
          },
          {
            checkForDefaultPrevented: false,
          },
        )}
      />
    );
  },
) as PolymorphicComponent<MenuItemRadioProps, 'li'>;

MenuItemRadio.displayName = MENU_ITEM_CHECKBOX_NAME;

const MenuItemCheckbox = forwardRef(
  <E extends ElementType = 'li'>(
    { value, ...props }: PolymorphicProps<MenuItemRadioProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const MenuContext = useMenuContext(MENU_ITEM_NAME);
    const valueList = Array.isArray(MenuContext.value)
      ? [...MenuContext.value]
      : [];

    const checked = valueList.includes(value);

    const onCheckedChange = (newChecked: boolean) => {
      MenuContext.onValueChange(
        newChecked
          ? [...valueList, value]
          : valueList.filter((valueItem) => valueItem !== value),
      );
    };

    return (
      <ListCell
        ref={ref}
        role="menuitemcheckbox"
        leftContent={
          <ListItemContent variant="checkbox">
            <Checkbox
              tabIndex={-1}
              checked={checked}
              onCheckedChange={onCheckedChange}
            />
          </ListItemContent>
        }
        {...props}
        // sx={(theme) => ({
        //   ['&:focus-visible']: {
        //     outline: 'none',
        //     ['& > [data-role="with-interaction"]']: {
        //       opacity: theme.opacity[5],
        //     },
        //   },
        // })}
        onClick={composeEventHandlers(
          props.onClick,
          (e) => {
            if (!e.defaultPrevented) {
              onCheckedChange(!checked);
            }

            e.preventDefault();
          },
          {
            checkForDefaultPrevented: false,
          },
        )}
      />
    );
  },
) as PolymorphicComponent<MenuItemCheckboxProps, 'li'>;

MenuItemCheckbox.displayName = MENU_ITEM_RADIO_NAME;

export { Menu, MenuTrigger, MenuContent, MenuGroup, MenuItem };
