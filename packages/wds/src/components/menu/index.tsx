import { forwardRef } from 'react';

import { List, ListCell, ListItemContent } from '../list';
import ScrollArea from '../scroll-area';
import { RadioGroupItem } from '../radio-group';
import Checkbox from '../checkbox';

import { MENU_CONTENT_NAME, MENU_ITEM_NAME, MENU_NAME } from './constants';
import { listInMenuStyle, menuScrollAreaStyle } from './style';
import { MenuProvider, useMenuContext } from './context';

import type { MenuContentProps, MenuItemProps, MenuProps } from './types';
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

const Menu = ({ children, ...props }: PropsWithChildren<MenuProps>) => {
  return <MenuProvider {...props}>{children}</MenuProvider>;
};

Menu.displayName = MENU_NAME;

const MenuContent = forwardRef(
  (
    { children, ...props }: MenuContentProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <ScrollArea role="menu" ref={ref} sx={menuScrollAreaStyle}>
        <List {...props} sx={[listInMenuStyle, props.sx]}>
          {children}
        </List>
      </ScrollArea>
    );
  },
);

MenuContent.displayName = MENU_CONTENT_NAME;

const MenuItem = forwardRef(
  <E extends ElementType = 'li'>(
    {
      variant = 'normal',
      value,
      children,
      ...props
    }: PolymorphicProps<MenuItemProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const MenuContext = useMenuContext();

    switch (variant) {
      case 'radio':
        // const handleRadio = () => {}; // radio 변경 시 값 변경은 MenuContent의 RadioGroup단에서 해야할까

        return (
          <ListCell
            ref={ref}
            leftContent={
              <ListItemContent variant="radio">
                <RadioGroupItem value={value} />
              </ListItemContent>
            }
            {...props}
          >
            {children}
          </ListCell>
        );

      case 'checkbox':
        const onCheckedChange = (checked: boolean) => {
          return checked
            ? MenuContext.setValue((prevValue) => [...prevValue, value])
            : MenuContext.setValue((prevValue) => {
                const valueList = prevValue as Array<string>;
                return valueList.filter(
                  (prevValueItem) => prevValueItem !== value,
                );
              });
        };

        return (
          <ListCell
            ref={ref}
            leftContent={
              <ListItemContent variant="checkbox">
                <Checkbox
                  checked={value.includes(value)}
                  onCheckedChange={onCheckedChange}
                />
              </ListItemContent>
            }
            {...props}
          >
            {children}
          </ListCell>
        );

      case 'normal':
      default:
        return (
          <ListCell ref={ref} {...props}>
            {props.children}
          </ListCell>
        );
    }
  },
) as PolymorphicComponent<MenuItemProps, 'li'>;

MenuItem.displayName = MENU_ITEM_NAME;

export { Menu, MenuContent, MenuItem };
