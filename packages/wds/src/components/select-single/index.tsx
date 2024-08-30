import { type ElementType, forwardRef } from 'react';
import { IconChevronDownThickSmall } from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import {
  Box,
  type DefaultComponentProps,
  type PolymorphicComponent,
  type PolymorphicProps,
} from '@wanteddev/wds-engine';

import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuTrigger,
} from '../menu';
import { TextInput, TextInputContent } from '../text-input';

import {
  OPTION_GROUP_NAME,
  OPTION_NAME,
  SELECT_CONTENT_NAME,
  SELECT_SINGLE_NAME,
} from './constants';
import {
  selectStyle,
  textInputButtonChevronStyle,
  textInputButtonStyle,
  textInputStyle,
} from './style';

import type { ListProps } from '../list/types';
import type { MenuGroupProps } from '../menu/types';
import type { ElementRef, ForwardedRef } from 'react';
import type { OptionProps, SelectSingleProps } from './types';

const SelectSingle = forwardRef<
  HTMLSelectElement,
  DefaultComponentProps<SelectSingleProps, 'select'>
>(
  ({
    width = '335px',
    height = '48px',
    invalid,
    disabled,
    defaultValue,
    placeholder,
    value: valueProp,
    onChange: onValueChange,
    open,
    defaultOpen,
    onOpenChange,
    leftContent,
    sx,
    children,
    ...props
  }) => {
    const [selectValue, setSelectValue] = useControllableState<
      SelectSingleProps['value']
    >({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    return (
      <Menu
        defaultValue={defaultValue}
        value={selectValue}
        onValueChange={(value) => setSelectValue(value?.toString())}
        open={open && !disabled}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <MenuTrigger>
          <Box
            role="button"
            aria-disabled={disabled}
            sx={textInputButtonStyle({ disabled })}
          >
            <TextInput
              readOnly
              value={selectValue}
              invalid={invalid}
              width={width}
              height={height}
              placeholder={placeholder}
              disabled={disabled}
              sx={textInputStyle}
              leftContent={leftContent}
              rightContent={
                <TextInputContent
                  variant="icon"
                  data-icon="select-button-arrow"
                >
                  <IconChevronDownThickSmall sx={textInputButtonChevronStyle} />
                </TextInputContent>
              }
            />
          </Box>
        </MenuTrigger>

        <MenuContent sx={[selectStyle(width), sx]}>
          <MenuList role="select" {...(props as ListProps)}>
            {children}
          </MenuList>
        </MenuContent>
      </Menu>
    );
  },
);

SelectSingle.displayName = SELECT_SINGLE_NAME;

const Group = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<MenuGroupProps, 'div'>
>((props, ref) => {
  return <MenuGroup ref={ref} {...props} />;
});

Group.displayName = OPTION_GROUP_NAME;

const Option = forwardRef(
  <E extends ElementType = 'option'>(
    { variant = 'normal', ...props }: PolymorphicProps<OptionProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return <MenuItem ref={ref} role="option" variant={variant} {...props} />;
  },
) as PolymorphicComponent<OptionProps, 'option'>;

Option.displayName = OPTION_NAME;

const SelectContent = TextInputContent;

SelectContent.displayName = SELECT_CONTENT_NAME;

export { SelectSingle, Option, Group, SelectContent };
