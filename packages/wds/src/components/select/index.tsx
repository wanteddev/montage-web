import {
  type ElementType,
  forwardRef,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  IconChevronDownThickSmall,
  IconChevronUpThickSmall,
  IconCircleExclamationFill,
} from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useSize } from '@radix-ui/react-use-size';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { composeEventHandlers } from '@radix-ui/primitive';

import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuTrigger,
} from '../menu';
import { TextFieldContent } from '../text-field';
import { FlexBox } from '../flex-box';
import { Typography } from '../typography';
import { invalidIconWrapperStyle } from '../text-field/style';
import { VirtualValueInput } from '../virtual-input';
import { ListCellContent } from '../list';
import { ChipProvider } from '../chip/contexts';

import { selectIconStyle, selectStyle, selectTextStyle } from './style';
import { convertChildrenToData } from './helpers';
import {
  OPTION_CONTENT_NAME,
  OPTION_GROUP_NAME,
  OPTION_NAME,
  SELECT_CONTENT_NAME,
  SELECT_NAME,
} from './constants';
import { SelectProvider, useSelectContext } from './context';

import type { ListCellContentProps } from '../list';
import type { TextFieldContentProps } from '../text-field';
import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type { ForwardedRef } from 'react';
import type { OptionGroupProps, OptionProps, SelectProps } from './types';

const Select = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<SelectProps, 'div'>
>(
  (
    {
      value: valueProp,
      defaultValue = '',
      onChange,
      defaultOpen,
      open: openProp,
      onOpenChange,
      width,
      height,
      invalid,
      disabled,
      render,
      placeholder,
      leadingContent,
      enableMenuActionArea = false,
      menuValue: menuValueProp,
      onMenuValueChange,
      xs,
      sm,
      md,
      lg,
      xl,
      contentProps,
      children,
      ...props
    },
    forwardedRef,
  ) => {
    const [node, setNode] = useState<HTMLDivElement | null>(null);

    const { width: contentWidth } = useSize(node) || {};

    const composedRefs = useComposedRefs<HTMLDivElement>(forwardedRef, setNode);

    const [menuValue, setMenuValue] = useControllableState({
      prop: menuValueProp,
      defaultProp: defaultValue,
      onChange: onMenuValueChange,
    });

    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: (v) => {
        setMenuValue(v);
        onChange?.(v);
      },
    });

    const [openState, setOpenState] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: (v) => {
        setMenuValue(value);
        onOpenChange?.(v);
      },
    });
    const open = openState && !disabled;

    const shouldShowPlaceholder = useMemo(
      () =>
        typeof value === 'string'
          ? value.length === 0
          : !Boolean(value) && value !== 0,
      [value],
    );

    const label = useMemo(() => {
      return (
        convertChildrenToData(children).find((v) => v.value === value)?.label ??
        ''
      );
    }, [value, children]);

    const isFormControl = node ? Boolean(node.closest('form')) : true;

    const initialValueStateRef = useRef(value);

    useEffect(() => {
      const form = node?.closest('form');

      if (form) {
        const reset = () => setValue(initialValueStateRef.current);
        form.addEventListener('reset', reset);
        return () => form.removeEventListener('reset', reset);
      }
    }, [node, setValue]);

    return (
      <SelectProvider
        onOpenChange={setOpenState}
        enableMenuActionArea={enableMenuActionArea}
        value={value}
      >
        {isFormControl && (
          <VirtualValueInput
            name={props.name}
            value={value}
            aria-invalid={invalid}
            disabled={disabled}
            tabIndex={-1}
          />
        )}
        <Menu
          value={enableMenuActionArea ? menuValue : value}
          onValueChange={useCallbackRef(
            (v: string | Array<string> | undefined) => {
              if (Array.isArray(v) && process.env.NODE_ENV !== 'production') {
                throw new Error(
                  'Select 값에 오류가 발생했습니다. checkbox를 사용하였거나 value가 string 형식이 아닌지 확인해주세요.',
                );
              }

              if (enableMenuActionArea) {
                setMenuValue(v as string);
              } else {
                setValue(v as string);
              }
            },
          )}
          open={open}
          onOpenChange={setOpenState}
        >
          <MenuTrigger>
            <FlexBox
              ref={composedRefs}
              gap="8px"
              alignItems="center"
              aria-invalid={invalid}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              role="combobox"
              data-placeholder={shouldShowPlaceholder}
              {...props}
              onKeyDown={composeEventHandlers(props.onKeyDown, (e) => {
                if (
                  (e.key === 'Enter' || e.key === ' ') &&
                  (e.target as HTMLElement) === node
                ) {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              })}
              sx={[
                selectStyle({
                  disabled,
                  invalid,
                  width,
                  height,
                  xs,
                  sm,
                  md,
                  lg,
                  xl,
                  ...props,
                }),
                props.sx,
              ]}
            >
              {Boolean(leadingContent) && leadingContent}

              {(typeof render === 'undefined' || shouldShowPlaceholder) && (
                <FlexBox
                  flex="1"
                  gap="4px"
                  data-role="select-render-wrapper"
                  sx={{ padding: '0px 4px', overflow: 'hidden' }}
                >
                  {shouldShowPlaceholder ? (
                    <Typography
                      data-role="select-placeholder"
                      noWrap
                      variant="body1"
                      weight="regular"
                      sx={selectTextStyle}
                    >
                      {placeholder}
                    </Typography>
                  ) : (
                    <Typography
                      data-role="select-values"
                      noWrap
                      variant="body1"
                      weight="regular"
                      sx={selectTextStyle}
                    >
                      {label}
                    </Typography>
                  )}
                </FlexBox>
              )}

              {typeof render === 'function' && !shouldShowPlaceholder && (
                <ChipProvider solid="semantic.label.alternative">
                  <FlexBox
                    flex="1"
                    gap="4px"
                    flexWrap="wrap"
                    data-role="select-render-wrapper"
                  >
                    {render(label, value)}
                  </FlexBox>
                </ChipProvider>
              )}

              {invalid && (
                <SelectContent
                  data-role="select-invalid"
                  variant="icon"
                  sx={invalidIconWrapperStyle}
                >
                  <IconCircleExclamationFill />
                </SelectContent>
              )}

              {open ? (
                <IconChevronUpThickSmall sx={selectIconStyle({ disabled })} />
              ) : (
                <IconChevronDownThickSmall sx={selectIconStyle({ disabled })} />
              )}
            </FlexBox>
          </MenuTrigger>

          <MenuContent
            offset={8}
            position="bottom-center"
            {...contentProps}
            sx={[
              { width: contentWidth ?? '320px', minWidth: '140px' },
              contentProps?.sx,
            ]}
          >
            <MenuList
              role="listbox"
              sx={enableMenuActionArea ? { paddingBottom: '0px' } : undefined}
            >
              {children}
            </MenuList>
          </MenuContent>
        </Menu>
      </SelectProvider>
    );
  },
);

Select.displayName = SELECT_NAME;

const OptionGroup = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<OptionGroupProps, 'div'>
>((props, ref) => {
  return <MenuGroup ref={ref} {...props} />;
});

OptionGroup.displayName = OPTION_GROUP_NAME;
// @ts-expect-error
OptionGroup.isOptionGroup = true;

const Option = memo(
  forwardRef<any, OptionProps>(
    <T extends ElementType = 'li'>(
      {
        variant = 'normal',
        children,
        as,
        ...props
      }: PolymorphicPropsInternal<OptionProps, T>,
      ref: ForwardedRef<T>,
    ) => {
      const { onOpenChange, enableMenuActionArea, value, isMultiple } =
        useSelectContext(OPTION_NAME);

      const selected = Array.isArray(value)
        ? value.includes(props.value)
        : value === props.value;

      return (
        <MenuItem
          ref={ref}
          role="option"
          variant={variant}
          as={as || 'li'}
          aria-checked={undefined}
          aria-selected={selected}
          {...props}
          onClick={composeEventHandlers(props.onClick, () => {
            if (enableMenuActionArea === false && !isMultiple) {
              onOpenChange(false);
            }
          })}
        >
          {children}
        </MenuItem>
      );
    },
  ) as PolymorphicComponentInternal<OptionProps, 'li'>,
);

Option.displayName = OPTION_NAME;
// @ts-expect-error
Option.isOption = true;

const SelectContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<TextFieldContentProps, 'div'>
>((props, ref) => {
  return <TextFieldContent ref={ref} {...props} />;
});

SelectContent.displayName = SELECT_CONTENT_NAME;

const OptionContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ListCellContentProps, 'div'>
>((props, ref) => {
  return <ListCellContent ref={ref} {...props} />;
});

OptionContent.displayName = OPTION_CONTENT_NAME;

export { Select, SelectContent, Option, OptionGroup, OptionContent };

export type {
  SelectProps,
  OptionGroupProps,
  TextFieldContentProps as SelectContentProps,
  ListCellContentProps as OptionContentProps,
  OptionProps,
};
