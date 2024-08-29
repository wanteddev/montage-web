import { type ElementType, forwardRef } from 'react';
import { IconChevronDownThickSmall } from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import {
  Box,
  type DefaultComponentProps,
  type PolymorphicComponent,
  type PolymorphicProps,
} from '@wanteddev/wds-engine';

import { Menu, MenuContent, MenuItem, MenuTrigger } from '../menu';
import { TextInput, TextInputContent } from '../text-input';

import { OPTION_NAME, SELECT_SINGLE_NAME } from './constants';
import {
  selectStyle,
  textInputButtonChevronStyle,
  textInputButtonStyle,
  textInputStyle,
} from './style';

import type { ElementRef, ForwardedRef } from 'react';
import type { OptionProps, SelectSingleProps } from './types';

const SelectSingle = forwardRef<
  HTMLSelectElement,
  DefaultComponentProps<SelectSingleProps, 'select'>
>(
  ({
    width = '335px',
    invalid,
    defaultValue,
    value: valueProp,
    onChange: onValueChange,
    open,
    defaultOpen,
    onOpenChange,
    sx,
    children,
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
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <MenuTrigger>
          <Box role="button" sx={textInputButtonStyle}>
            <TextInput
              readOnly
              value={selectValue}
              invalid={invalid}
              width={width}
              sx={textInputStyle}
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

        <MenuContent sx={[selectStyle(width), sx]}>{children}</MenuContent>
      </Menu>
    );
  },
);

SelectSingle.displayName = SELECT_SINGLE_NAME;

// const MenuGroup = forwardRef<
//   HTMLDivElement,
//   DefaultComponentProps<MenuGroupDefaultProps, 'div'>
// >(({ title, sx, children, ...props }, ref) => {
//   return (
//     <FlexBox
//       ref={ref}
//       role="group"
//       alignItems="center"
//       flexDirection="column"
//       gap="4px"
//       {...props}
//       sx={[menuGroupStyle, sx]}
//     >
//       {Boolean(title) && (
//         <Typography
//           variant="caption1"
//           weight="bold"
//           color="palette.label.alternative"
//           sx={menuGroupTitleStyle}
//         >
//           {title}
//         </Typography>
//       )}
//       {children}
//     </FlexBox>
//   );
// });

// MenuGroup.displayName = MENU_GROUP_NAME;

const Option = forwardRef(
  <E extends ElementType = 'option'>(
    { variant = 'normal', ...props }: PolymorphicProps<OptionProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return <MenuItem ref={ref} role="option" variant={variant} {...props} />;
  },
) as PolymorphicComponent<OptionProps, 'option'>;

Option.displayName = OPTION_NAME;

export { SelectSingle, Option };
