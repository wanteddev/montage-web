import {
  Children,
  type ElementType,
  forwardRef,
  isValidElement,
  memo,
  useEffect,
  useState,
} from 'react';
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
import { ListText } from '../list';

import {
  OPTION_GROUP_NAME,
  OPTION_NAME,
  SELECT_CONTENT_NAME,
  SELECT_NAME,
} from './constants';
import {
  selectBoxButtonStyle,
  selectMenuContentStyle,
  selectTextInputArrowStyle,
  selectTextInputStyle,
} from './style';

import type { ListProps } from '../list/types';
import type { ElementRef, ForwardedRef, Ref } from 'react';
import type { OptionGroupProps, OptionProps, SelectProps } from './types';

const Select = forwardRef<
  HTMLSelectElement,
  DefaultComponentProps<SelectProps, 'select'>
>(
  (
    {
      defaultValue,
      value: valueProp,
      onChange: onValueChange,
      defaultOpen,
      open: openProps,
      onOpenChange,
      // TextInput props
      width = '335px',
      height = '48px',
      invalid,
      disabled,
      leftContent,
      placeholder,
      sx,
      children,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState<SelectProps['value']>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });
    const [label, setLabel] = useState('');

    const [open = false, setOpen] = useControllableState({
      prop: openProps,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });

    useEffect(() => {
      const updateLabel = () => {
        const selectedValue = value ?? defaultValue;

        Children.forEach(children, (child) => {
          if (!isValidElement(child)) return;
          if (child.type === OptionGroup) {
          } else if (child.props.value === selectedValue) {
            setLabel(child.props.children);
          }
        });
      };

      updateLabel();
    }, [defaultValue, value, children]);

    return (
      <Menu
        defaultValue={defaultValue}
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue as string);
          setOpen(false);
        }}
        open={open && !disabled}
        defaultOpen={defaultOpen}
        onOpenChange={(newOpen) => setOpen(newOpen)}
      >
        <MenuTrigger>
          <Box
            role="button"
            aria-disabled={disabled}
            sx={selectBoxButtonStyle({ disabled })}
          >
            <TextInput
              readOnly
              value={label}
              invalid={invalid}
              width={width}
              height={height}
              placeholder={placeholder}
              disabled={disabled}
              sx={selectTextInputStyle}
              leftContent={leftContent}
              rightContent={
                <TextInputContent
                  variant="icon"
                  data-role="select-button-arrow"
                >
                  <IconChevronDownThickSmall sx={selectTextInputArrowStyle} />
                </TextInputContent>
              }
            />
          </Box>
        </MenuTrigger>

        <MenuContent sx={[selectMenuContentStyle({ width }), sx]}>
          <MenuList
            ref={ref as Ref<HTMLUListElement>}
            role="listbox"
            {...(props as ListProps)}
          >
            {children}
          </MenuList>
        </MenuContent>
      </Menu>
    );
  },
);

Select.displayName = SELECT_NAME;

const OptionGroup = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<OptionGroupProps, 'div'>
>((props, ref) => {
  return <MenuGroup ref={ref} {...props} />;
});

OptionGroup.displayName = OPTION_GROUP_NAME;

const Option = memo(
  forwardRef(
    <E extends ElementType = 'option'>(
      {
        variant = 'normal',
        children,
        ...props
      }: PolymorphicProps<OptionProps, E>,
      ref: ForwardedRef<ElementRef<E>>,
    ) => {
      return (
        <MenuItem ref={ref} role="option" variant={variant} {...props}>
          <ListText>{children}</ListText>
        </MenuItem>
      );
    },
  ) as PolymorphicComponent<OptionProps, 'option'>,
);

Option.displayName = OPTION_NAME;

const SelectContent = TextInputContent;

SelectContent.displayName = SELECT_CONTENT_NAME;

export { Select, SelectContent, Option, OptionGroup };
