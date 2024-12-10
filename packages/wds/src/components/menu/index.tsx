import { forwardRef } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import {
  RovingFocusGroup,
  RovingFocusGroupItem,
} from '@radix-ui/react-roving-focus';
import { composeEventHandlers } from '@radix-ui/primitive';
import { IconCheck } from '@wanteddev/wds-icon';

import { List, ListCell, ListItemContent } from '../list';
import ScrollArea from '../scroll-area';
import Radio from '../radio';
import Checkbox from '../checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import FlexBox from '../flex-box';
import Typography from '../typography';
import { usePopoverContext } from '../popover/contexts';

import {
  MENU_BOTTOM_CONTENT_NAME,
  MENU_CONTENT_NAME,
  MENU_GROUP_NAME,
  MENU_ITEM_CHECKBOX_NAME,
  MENU_ITEM_NAME,
  MENU_ITEM_RADIO_NAME,
  MENU_LIST_NAME,
  MENU_NAME,
  MENU_TRIGGER_NAME,
} from './constants';
import {
  menuBottomContentStyle,
  menuBottomStyle,
  menuGroupStyle,
  menuGroupTitleStyle,
  menuItemStyle,
  menuListStyle,
  menuPopoverContentStyle,
  menuScrollAreaStyle,
} from './style';
import { MenuItemProvider, MenuProvider, useMenuContext } from './contexts';

import type { ListProps } from '../list/types';
import type {
  MenuBottomContentProps,
  MenuBottomProps,
  MenuContentProps,
  MenuDefaultProps,
  MenuGroupProps,
  MenuItemCheckboxProps,
  MenuItemProps,
  MenuItemRadioProps,
  MenuProps,
  MenuTriggerProps,
} from './types';
import type {
  DefaultComponentProps,
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef, ReactNode } from 'react';

const ARROW_KEYS = ['ArrowUp', 'ArrowDown'];

const Menu = (props: MenuProps) => {
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

const MenuTrigger = forwardRef<
  ElementRef<typeof PopoverTrigger>,
  MenuTriggerProps
>((props, ref) => {
  const { open, onOpenChange } = usePopoverContext(MENU_TRIGGER_NAME);

  return (
    <PopoverTrigger
      {...props}
      ref={ref}
      onKeyDown={composeEventHandlers(props.onKeyDown, (e) => {
        if (
          open ||
          e.currentTarget.ariaDisabled?.toString() === 'true' ||
          e.currentTarget.getAttribute('disabled')?.toString() === 'true' ||
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

const MenuContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<MenuContentProps, 'div'>
>(
  (
    {
      position = 'top-center',
      offset,
      container,
      disablePortal,
      sx,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <RovingFocusGroup orientation="vertical" dir="ltr" asChild>
        <PopoverContent
          ref={ref}
          position={position}
          offset={offset}
          container={container}
          disablePortal={disablePortal}
          {...props}
          sx={[menuPopoverContentStyle, sx]}
        >
          <ScrollArea zIndex={11} sx={menuScrollAreaStyle} size="small">
            {children}
          </ScrollArea>
        </PopoverContent>
      </RovingFocusGroup>
    );
  },
);

MenuContent.displayName = MENU_CONTENT_NAME;

const MenuList = forwardRef<
  HTMLUListElement,
  DefaultComponentProps<ListProps, 'ul'>
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
  DefaultComponentProps<MenuGroupProps>
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

const MenuItem = forwardRef<any, MenuItemProps>(
  <E extends ElementType = 'li'>(
    {
      variant = 'normal',
      onKeyDown,
      sx,
      ...props
    }: PolymorphicProps<MenuItemProps, E>,
    ref: ForwardedRef<E>,
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
          role="menuitem"
          ref={ref}
          active={normalActive}
          rightContent={
            normalActive ? (
              <ListItemContent variant="icon">
                <IconCheck data-role="menu-item-active-icon-check" />
              </ListItemContent>
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
        active={variant === 'normal' ? normalActive : undefined}
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
) as PolymorphicComponent<MenuItemProps, 'li'>;

MenuItem.displayName = MENU_ITEM_NAME;

const MenuItemRadio = forwardRef<any, MenuItemRadioProps>(
  <E extends ElementType = 'li'>(
    { value, ...props }: PolymorphicProps<MenuItemRadioProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    const context = useMenuContext(MENU_ITEM_NAME);

    return (
      <ListCell
        ref={ref}
        role="menuitemradio"
        leftContent={
          <ListItemContent variant="radio">
            <Radio
              tabIndex={-1}
              checked={context.value === value}
              value={value}
            />
          </ListItemContent>
        }
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
) as PolymorphicComponent<MenuItemRadioProps, 'li'>;

MenuItemRadio.displayName = MENU_ITEM_CHECKBOX_NAME;

const MenuItemCheckbox = forwardRef<any, MenuItemRadioProps>(
  <E extends ElementType = 'li'>(
    { value, ...props }: PolymorphicProps<MenuItemRadioProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
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
        onClick={composeEventHandlers(props.onClick, (e) => {
          if (!e.defaultPrevented) {
            onCheckedChange(!checked);
          }
          e.preventDefault();
        })}
      />
    );
  },
) as PolymorphicComponent<MenuItemCheckboxProps, 'li'>;

MenuItemCheckbox.displayName = MENU_ITEM_RADIO_NAME;

const MenuBottom = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<MenuBottomProps, 'div'>
>(({ leftContent, rightContent, children, sx, ...props }, ref) => {
  return (
    <FlexBox
      ref={ref}
      alignItems="center"
      justifyContent="space-between"
      {...props}
      sx={[menuBottomStyle, sx]}
    >
      {Boolean(leftContent) && leftContent}
      {children}
      {Boolean(rightContent) && rightContent}
    </FlexBox>
  );
});

MenuBottom.displayName = MENU_GROUP_NAME;

const MenuBottomContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<MenuBottomContentProps, 'div'>
>(({ variant = 'custom', sx, children, ...props }, ref) => {
  switch (variant) {
    case 'icon':
      return (
        <FlexBox
          wds-component="menu-bottom-content"
          ref={ref}
          {...props}
          sx={[
            menuBottomContentStyle,
            (theme) => ({
              fontSize: '24px',
              color: theme.palette.label.alternative,
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
          sx={[menuBottomContentStyle, sx]}
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
          sx={[menuBottomContentStyle, sx]}
        >
          {children}
        </FlexBox>
      );
  }
});

MenuBottomContent.displayName = MENU_BOTTOM_CONTENT_NAME;

export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuBottom,
  MenuBottomContent,
};
