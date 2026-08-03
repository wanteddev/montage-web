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
  IconClose,
} from '@montage-ui/icon';
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
import { FlexBox } from '../flex-box';
import { Typography } from '../typography';
import { VirtualValueInput } from '../virtual-input';
import { ListCellContent } from '../list';
import { IconButtonProvider } from '../icon-button/contexts';
import { ellipsisTypographyStyle } from '../../utils';
import { Chip } from '../chip';

import {
  selectContentStyle,
  selectIconStyle,
  selectRenderChipStyle,
  selectStyle,
  selectTextStyle,
} from './style';
import { convertChildrenToData } from './helpers';
import {
  OPTION_CONTENT_NAME,
  OPTION_GROUP_NAME,
  OPTION_NAME,
  SELECT_CONTENT_NAME,
  SELECT_NAME,
  SELECT_RENDER_CHIP_NAME,
} from './constants';
import { SelectProvider, useSelectContext } from './context';

import type { ListCellContentProps } from '../list';
import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@montage-ui/engine';
import type { ForwardedRef } from 'react';
import type {
  OptionGroupProps,
  OptionProps,
  SelectContentProps,
  SelectProps,
  SelectRenderChipProps,
} from './types';

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
      size = 'large',
      width,
      height,
      status = 'normal',
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
            aria-invalid={status === 'negative' || undefined}
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
              aria-invalid={status === 'negative' || undefined}
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
                  size,
                  disabled,
                  status,
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
              <FlexBox flex="1" gap="2px" data-role="select-wrapper">
                {Boolean(leadingContent) && leadingContent}

                {shouldShowPlaceholder && (
                  <Typography
                    data-role="select-placeholder"
                    noWrap
                    sx={[selectTextStyle, ellipsisTypographyStyle(1)]}
                  >
                    {placeholder}
                  </Typography>
                )}

                {typeof render === 'undefined' && !shouldShowPlaceholder && (
                  <Typography
                    data-role="select-values"
                    noWrap
                    sx={[selectTextStyle, ellipsisTypographyStyle(1)]}
                  >
                    {label}
                  </Typography>
                )}

                {typeof render === 'function' && !shouldShowPlaceholder && (
                  <FlexBox
                    flex="1"
                    flexWrap="wrap"
                    data-role="select-chip-wrapper"
                  >
                    {render(label, value)}
                  </FlexBox>
                )}

                <SelectContent variant="icon" data-variant="select-chevron">
                  {open ? (
                    <IconChevronUpThickSmall
                      sx={selectIconStyle({ disabled })}
                    />
                  ) : (
                    <IconChevronDownThickSmall
                      sx={selectIconStyle({ disabled })}
                    />
                  )}
                </SelectContent>
              </FlexBox>
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

const SelectContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<SelectContentProps, 'div'>
>(({ variant = 'icon', children, sx, color, ...props }, ref) => {
  switch (variant) {
    case 'icon':
      return (
        <FlexBox
          data-component="select-content"
          data-variant="icon"
          ref={ref}
          sx={[
            selectContentStyle,
            (theme) => ({
              width: 'var(--select-content-icon-wrapper-size)',
              height: 'var(--select-content-max-height)',
              fontSize: 'var(--select-content-icon-size)',
              color: color ?? theme.semantic.foreground.neutral.tertiary,
            }),
            sx,
          ]}
          {...props}
        >
          {children}
        </FlexBox>
      );
    case 'icon-button':
      return (
        <FlexBox
          data-component="select-content"
          data-variant="icon-button"
          ref={ref}
          sx={[
            selectContentStyle,
            {
              width: 'var(--select-content-icon-wrapper-size)',
              height: 'var(--select-content-max-height)',
            },
            sx,
          ]}
          {...props}
        >
          <IconButtonProvider normal="semantic.foreground.neutral.tertiary">
            {children}
          </IconButtonProvider>
        </FlexBox>
      );
    case 'custom':
    default:
      return (
        <FlexBox
          data-component="select-content"
          data-variant="custom"
          ref={ref}
          sx={[selectContentStyle, sx]}
          {...props}
        >
          {children}
        </FlexBox>
      );
  }
});

SelectContent.displayName = SELECT_CONTENT_NAME;

const SelectRenderChip = forwardRef(
  <T extends ElementType = 'button'>(
    {
      disabled,
      status = 'normal',
      trailingContent = <IconClose />,
      ...props
    }: PolymorphicPropsInternal<SelectRenderChipProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <Chip
        ref={ref}
        disabled={disabled}
        variant="outlined"
        size="xsmall"
        trailingContent={trailingContent}
        {...props}
        sx={[selectRenderChipStyle({ status }), props.sx]}
      />
    );
  },
) as PolymorphicComponentInternal<SelectRenderChipProps, 'button'>;

SelectRenderChip.displayName = SELECT_RENDER_CHIP_NAME;

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
  ),
) as PolymorphicComponentInternal<OptionProps, 'li'>;

Option.displayName = OPTION_NAME;
// @ts-expect-error
Option.isOption = true;

const OptionContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ListCellContentProps, 'div'>
>((props, ref) => {
  return <ListCellContent ref={ref} {...props} />;
});

OptionContent.displayName = OPTION_CONTENT_NAME;

export {
  Select,
  SelectContent,
  SelectRenderChip,
  Option,
  OptionGroup,
  OptionContent,
};

export type {
  SelectProps,
  SelectContentProps,
  SelectRenderChipProps,
  OptionGroupProps,
  ListCellContentProps as OptionContentProps,
  OptionProps,
};
