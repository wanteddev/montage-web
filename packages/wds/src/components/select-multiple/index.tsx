import {
  forwardRef,
  useCallback,
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
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useSize } from '@radix-ui/react-use-size';

import { Menu, MenuContent, MenuList, MenuTrigger } from '../menu';
import { FlexBox } from '../flex-box';
import { Typography } from '../typography';
import { ellipsisTypographyStyle } from '../../utils';
import { SelectContent } from '../select';
import { convertChildrenToData } from '../select/helpers';
import {
  invalidIconWrapperStyle,
  selectIconStyle,
  selectStyle,
} from '../select/style';
import useResizeObserver from '../../hooks/internal/use-resize-observer';
import { VirtualValueInput } from '../virtual-input';
import { SelectProvider } from '../select/context';
import { ChipProvider } from '../chip/contexts';

import { customSelectMultipleRenderWrapperStyle } from './style';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { UIEventHandler } from 'react';
import type { SelectMultipleProps } from './types';

const SelectMultiple = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<SelectMultipleProps, 'div'>
>(
  (
    {
      invalid,
      disabled,
      defaultValue = [],
      value: valueProp,
      onChange,
      placeholder,
      children,
      open: openProp,
      defaultOpen,
      onOpenChange,
      allSelectedLabel,
      leadingContent,
      render,
      width,
      height,
      enableMenuActionArea,
      overflow = false,
      menuValue: menuValueProp,
      onMenuValueChange,
      contentProps,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    forwardedRef,
  ) => {
    const [node, setNode] = useState<HTMLDivElement | null>(null);
    const composedRefs = useComposedRefs<HTMLDivElement>(forwardedRef, setNode);

    const [renderWrapperNode, setRenderWrapperNode] =
      useState<HTMLDivElement | null>(null);

    const { width: contentWidth } = useSize(node) || {};

    const [isScrollableLeft, setIsScrollableLeft] = useState(false);
    const [isScrollableRight, setIsScrollableRight] = useState(false);

    const [menuValue = [], setMenuValue] = useControllableState({
      prop: menuValueProp,
      defaultProp: defaultValue,
      onChange: onMenuValueChange,
    });

    const [value = [], setValue] = useControllableState({
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

    const handleOnScroll: UIEventHandler<HTMLDivElement> = useCallback(
      (e) => {
        const target = e.target as Element;

        const { scrollLeft, scrollWidth, clientWidth } = target;

        setIsScrollableLeft(scrollLeft > 0);

        if (scrollWidth - scrollLeft <= clientWidth + 1) {
          setIsScrollableRight(false);
        } else if (scrollWidth !== clientWidth) {
          setIsScrollableRight(true);
        }
      },
      [setIsScrollableLeft, setIsScrollableRight],
    );

    const handleResize = useCallback(() => {
      const target = renderWrapperNode;
      if (!target) {
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = target;

      setIsScrollableLeft(scrollLeft > 0);

      if (scrollWidth - scrollLeft <= clientWidth + 1) {
        setIsScrollableRight(false);
      } else if (scrollWidth !== clientWidth) {
        setIsScrollableRight(true);
      }
    }, [renderWrapperNode, setIsScrollableLeft, setIsScrollableRight]);

    useResizeObserver(renderWrapperNode, handleResize);

    const shouldShowPlaceholder = useMemo(
      () =>
        Array.isArray(value) || typeof value === 'string'
          ? value.length === 0
          : !Boolean(value) && value !== 0,
      [value],
    );

    const optionList = useMemo(() => {
      return convertChildrenToData(children);
    }, [children]);

    const isAllSelected =
      (Array.isArray(value) || typeof value === 'string') &&
      optionList.length === value.length;
    const shouldShowAllSelectedLabel =
      isAllSelected && Boolean(allSelectedLabel);

    const label = useMemo(() => {
      return (
        convertChildrenToData(children)
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          .filter((v) => value?.includes(v.value))
          .map(({ label: labelValue }) => labelValue)
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
        isMultiple
      >
        {isFormControl && (
          <VirtualValueInput
            name={props.name}
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            value={Array.isArray(value) ? value.join(',') : value ?? ''}
            aria-invalid={invalid}
            disabled={disabled}
            tabIndex={-1}
          />
        )}

        <Menu
          value={enableMenuActionArea ? menuValue : value}
          onValueChange={useCallbackRef(
            (v: string | Array<string> | undefined) => {
              if (!Array.isArray(v) && process.env.NODE_ENV !== 'production') {
                throw new Error(
                  'SelectMultiple 값에 오류가 발생했습니다. radio를 사용하였거나 value가 Array 형식이 아닌지 확인해주세요.',
                );
              }

              if (enableMenuActionArea) {
                setMenuValue(v as Array<string>);
              } else {
                setValue(v as Array<string>);
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
              alignItems="flex-start"
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
                  overflow,
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
                  data-role="select-multiple-render-wrapper"
                  sx={{ padding: '0px 4px', overflow: 'hidden' }}
                >
                  {shouldShowPlaceholder ? (
                    <Typography
                      data-role="select-multiple-placeholder"
                      noWrap
                      variant="body1"
                      weight="regular"
                      sx={ellipsisTypographyStyle(1)}
                    >
                      {placeholder}
                    </Typography>
                  ) : (
                    <Typography
                      data-role="select-multiple-values"
                      variant="body1"
                      weight="regular"
                      {...(overflow === false && {
                        noWrap: true,
                        sx: ellipsisTypographyStyle(1),
                      })}
                    >
                      {shouldShowAllSelectedLabel
                        ? allSelectedLabel
                        : label.join(', ')}
                    </Typography>
                  )}
                </FlexBox>
              )}

              {typeof render === 'function' && !shouldShowPlaceholder && (
                <FlexBox
                  flex="1"
                  data-role="select-multiple-render-wrapper"
                  sx={customSelectMultipleRenderWrapperStyle({
                    overflow,
                    isScrollableLeft,
                    isScrollableRight,
                  })}
                >
                  <ChipProvider solid="semantic.label.alternative">
                    <FlexBox
                      ref={setRenderWrapperNode}
                      gap="4px"
                      flexWrap={overflow ? 'wrap' : 'nowrap'}
                      onScrollCapture={handleOnScroll}
                    >
                      {shouldShowAllSelectedLabel
                        ? allSelectedLabel
                        : render(label, value)}
                    </FlexBox>
                  </ChipProvider>
                </FlexBox>
              )}

              {invalid && (
                <SelectContent
                  data-role="select-multiple-invalid"
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

SelectMultiple.displayName = 'SelectMultiple';

export { SelectMultiple };

export type { SelectMultipleProps };
