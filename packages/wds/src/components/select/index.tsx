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
import {
  Box,
  type DefaultComponentProps,
  type PolymorphicComponent,
  type PolymorphicProps,
} from '@wanteddev/wds-engine';
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
import { TextInputContent } from '../text-input';
import { ListText } from '../list';
import FlexBox from '../flex-box';
import Typography from '../typography';
import { invalidIconWrapperStyle } from '../text-input/style';

import {
  selectBubbleInputStyle,
  selectIconStyle,
  selectStyle,
  selectTextStyle,
} from './style';
import { convertChildrenToData } from './helpers';
import {
  OPTION_GROUP_NAME,
  OPTION_NAME,
  SELECT_CONTENT_NAME,
  SELECT_NAME,
} from './constants';
import { SelectProvider, useSelectContext } from './context';

import type { ElementRef, ForwardedRef } from 'react';
import type { OptionGroupProps, OptionProps, SelectProps } from './types';

const Select = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<SelectProps, 'div'>
>(
  (
    {
      value: valueProp,
      defaultValue = '',
      onValueChange,
      defaultOpen,
      open: openProp,
      onOpenChange,
      width,
      height,
      invalid,
      disabled,
      render,
      placeholder,
      leftContent,
      enableMenuBottom,
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

    const { width: contentWidth, height: contentHeight } = useSize(node) || {};

    const composedRefs = useComposedRefs<HTMLDivElement>(forwardedRef, setNode);

    const [menuValue = '', setMenuValue] = useControllableState({
      prop: menuValueProp,
      defaultProp: defaultValue,
      onChange: onMenuValueChange,
    });

    const [value = '', setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: (v) => {
        setMenuValue(v);
        onValueChange?.(v);
      },
    });

    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: (v) => {
        setMenuValue(value);
        onOpenChange?.(v);
      },
    });

    const shouldShowPlaceholder = useMemo(
      () => value.length === 0,
      [value.length],
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
        onOpenChange={setOpen}
        enableMenuBottom={enableMenuBottom}
      >
        {isFormControl && (
          <Box
            as="input"
            name={props.name}
            value={value}
            aria-invalid={invalid}
            disabled={disabled}
            tabIndex={-1}
            readOnly
            aria-hidden
            sx={[
              {
                width: contentWidth,
                height: contentHeight,
              },
              selectBubbleInputStyle,
            ]}
          />
        )}
        <Menu
          value={enableMenuBottom ? menuValue : value}
          onValueChange={useCallbackRef(
            (v: string | Array<string> | undefined) => {
              if (Array.isArray(v) && process.env.NODE_ENV !== 'production') {
                throw new Error(
                  'Select 값에 오류가 발생했습니다. checkbox를 사용하였거나 value가 string 형식이 아닌지 확인해주세요.',
                );
              }

              if (enableMenuBottom) {
                setMenuValue(v as string);
              } else {
                setValue(v as string);
              }
            },
          )}
          open={open && !disabled}
          onOpenChange={setOpen}
        >
          <MenuTrigger>
            <FlexBox
              ref={composedRefs}
              gap="8px"
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
              {Boolean(leftContent) && leftContent}

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
                      variant="body1_normal"
                      weight="regular"
                      sx={selectTextStyle}
                    >
                      {placeholder}
                    </Typography>
                  ) : (
                    <Typography
                      data-role="select-values"
                      noWrap
                      variant="body1_normal"
                      weight="regular"
                      sx={selectTextStyle}
                    >
                      {label}
                    </Typography>
                  )}
                </FlexBox>
              )}

              {typeof render === 'function' && !shouldShowPlaceholder && (
                <FlexBox
                  flex="1"
                  gap="4px"
                  flexWrap="wrap"
                  data-role="select-render-wrapper"
                >
                  {render(label, value)}
                </FlexBox>
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
            {...contentProps}
            sx={[
              { width: contentWidth ?? '320px', minWidth: '140px' },
              contentProps?.sx,
            ]}
          >
            <MenuList
              role="listbox"
              sx={enableMenuBottom ? { paddingBottom: '0px' } : undefined}
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
  DefaultComponentProps<OptionGroupProps, 'div'>
>((props, ref) => {
  return <MenuGroup ref={ref} {...props} />;
});

OptionGroup.displayName = OPTION_GROUP_NAME;
// @ts-expect-error
OptionGroup.isOptionGroup = true;

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
      const { onOpenChange, enableMenuBottom } = useSelectContext() || {};

      return (
        <MenuItem
          ref={ref}
          role="option"
          variant={variant}
          {...props}
          onClick={composeEventHandlers(props.onClick, () => {
            if (variant !== 'radio' && !enableMenuBottom) {
              onOpenChange?.(false);
            }
          })}
        >
          <ListText>{children}</ListText>
        </MenuItem>
      );
    },
  ) as PolymorphicComponent<OptionProps, 'option'>,
);

Option.displayName = OPTION_NAME;
// @ts-expect-error
Option.isOption = true;

const SelectContent = TextInputContent;

SelectContent.displayName = SELECT_CONTENT_NAME;

export { Select, SelectContent, Option, OptionGroup };
