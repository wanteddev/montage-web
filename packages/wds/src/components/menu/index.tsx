import { forwardRef } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

import { List, ListCell, ListItemContent } from '../list';
import ScrollArea from '../scroll-area';
import { RadioGroupItem } from '../radio-group';
import Checkbox from '../checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

import {
  MENU_CHECKBOX_ITEM_NAME,
  MENU_CONTENT_NAME,
  MENU_ITEM_NAME,
  MENU_NAME,
  MENU_RADIO_ITEM_NAME,
  MENU_TRIGGER_NAME,
} from './constants';
import {
  listInMenuStyle,
  menuPopoverContentStyle,
  menuScrollAreaStyle,
} from './style';
import { MenuProvider, useMenuContext } from './context';

import type {
  MenuCheckboxItemProps,
  MenuContentProps,
  MenuDefaultProps,
  MenuItemProps,
  MenuProps,
  MenuRadioItemProps,
} from './types';
import type {
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
      <PopoverContent position="top-start" sx={menuPopoverContentStyle}>
        <ScrollArea role="menu" ref={ref} sx={menuScrollAreaStyle}>
          <List {...props} sx={[listInMenuStyle, props.sx]}>
            {children}
          </List>
        </ScrollArea>
      </PopoverContent>
    );
  },
);

MenuContent.displayName = MENU_CONTENT_NAME;

const MenuItem = forwardRef(
  <E extends ElementType = 'li'>(
    { variant = 'normal', ...props }: PolymorphicProps<MenuItemProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    switch (variant) {
      case 'radio':
        return <MenuRadioItem ref={ref} {...props} />;
      case 'checkbox':
        return <MenuCheckboxItem ref={ref} {...props} />;
      case 'normal':
      default:
        return <ListCell ref={ref} {...props} />;
    }
  },
) as PolymorphicComponent<MenuItemProps, 'li'>;

MenuItem.displayName = MENU_ITEM_NAME;

const MenuRadioItem = forwardRef(
  <E extends ElementType = 'li'>(
    { value, ...props }: PolymorphicProps<MenuRadioItemProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <ListCell
        ref={ref}
        leftContent={
          <ListItemContent variant="radio">
            <RadioGroupItem value={value} />
          </ListItemContent>
        }
        {...props}
      />
    );
  },
) as PolymorphicComponent<MenuRadioItemProps, 'li'>;

MenuRadioItem.displayName = MENU_RADIO_ITEM_NAME;

const MenuCheckboxItem = forwardRef(
  <E extends ElementType = 'li'>(
    { value, ...props }: PolymorphicProps<MenuRadioItemProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const MenuContext = useMenuContext(MENU_ITEM_NAME);
    const valueList = Array.isArray(MenuContext.value)
      ? [...MenuContext.value]
      : [];

    const onCheckedChange = (checked: boolean) => {
      MenuContext.onValueChange(
        checked
          ? [...valueList, value]
          : valueList.filter((valueItem) => valueItem !== value),
      );
    };

    return (
      <ListCell
        ref={ref}
        leftContent={
          <ListItemContent variant="checkbox">
            <Checkbox
              checked={valueList.includes(value)}
              onCheckedChange={onCheckedChange}
            />
          </ListItemContent>
        }
        {...props}
      />
    );
  },
) as PolymorphicComponent<MenuCheckboxItemProps, 'li'>;

MenuCheckboxItem.displayName = MENU_CHECKBOX_ITEM_NAME;

export { Menu, MenuTrigger, MenuContent, MenuItem };
