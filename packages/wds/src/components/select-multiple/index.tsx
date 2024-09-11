'use client';
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
import { Box, type DefaultComponentProps } from '@wanteddev/wds-engine';

import { Menu, MenuContent, MenuList, MenuTrigger } from '../menu';
import FlexBox from '../flex-box';
import Typography from '../typography';
import { ellipsisTypographyStyle } from '../../utils';
import { SelectContent } from '../select';
import { convertChildrenToData } from '../select/helpers';
import {
  invalidIconWrapperStyle,
  selectBubbleInputStyle,
  selectIconStyle,
  selectStyle,
} from '../select/style';
import useResizeObserver from '../../hooks/use-resize-observer';

import { customSelectMultipleRenderWrapperStyle } from './style';

import type { UIEventHandler } from 'react';
import type { SelectMultipleProps } from './types';

const SelectMultiple = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<SelectMultipleProps, 'div'>
>(
  (
    {
      invalid,
      disabled,
      defaultValue = [],
      value: valueProp,
      onValueChange,
      placeholder,
      children,
      open: openProp,
      defaultOpen,
      onOpenChange,
      leftContent,
      render,
      width,
      height,
      enableMenuBottom,
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

    const { width: contentWidth, height: contentHeight } = useSize(node) || {};

    const [isScrollable, setIsScrollable] = useState(false);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);

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

    const handleOnScroll: UIEventHandler<HTMLDivElement> = useCallback(
      (e) => {
        const target = e.target as Element;

        setScrollLeft(target.scrollLeft);
        setScrollWidth(target.scrollWidth);
      },
      [setScrollLeft, setScrollWidth],
    );

    useEffect(() => {
      if (
        scrollWidth - scrollLeft <=
        (renderWrapperNode?.clientWidth || 0) + 1
      ) {
        setIsScrollable(false);
      } else if (scrollWidth !== renderWrapperNode?.clientWidth) {
        setIsScrollable(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollLeft, scrollWidth]);

    useEffect(() => {
      if (overflow === false) {
        setScrollWidth(renderWrapperNode?.scrollWidth || 0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enableMenuBottom ? menuValue.length : value.length]);

    const handleResize = useCallback(() => {
      const target = renderWrapperNode;
      if (!target) {
        return;
      }

      const targetScrollWidth = target.scrollWidth;
      const targetScrollLeft = target.scrollLeft;

      setScrollLeft(targetScrollLeft);
      setScrollWidth(targetScrollWidth);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setScrollLeft]);

    useResizeObserver(renderWrapperNode, handleResize);

    const shouldShowPlaceholder = useMemo(
      () => value.length === 0,
      [value.length],
    );

    const label = useMemo(() => {
      return convertChildrenToData(children)
        .filter((v) => value.includes(v.value))
        .map(({ label: labelValue }) => labelValue);
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
      <>
        {isFormControl && (
          <Box
            as="input"
            name={props.name}
            value={value.join(',')}
            aria-invalid={invalid}
            disabled={disabled}
            tabIndex={-1}
            aria-hidden
            readOnly
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
              if (!Array.isArray(v) && process.env.NODE_ENV !== 'production') {
                throw new Error(
                  'SelectMultiple 값에 오류가 발생했습니다. radio를 사용하였거나 value가 Array 형식이 아닌지 확인해주세요.',
                );
              }

              if (enableMenuBottom) {
                setMenuValue(v as Array<string>);
              } else {
                setValue(v as Array<string>);
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
              {Boolean(leftContent) && leftContent}

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
                      variant="body1_normal"
                      weight="regular"
                      sx={ellipsisTypographyStyle(1)}
                    >
                      {placeholder}
                    </Typography>
                  ) : (
                    <Typography
                      data-role="select-multiple-values"
                      variant="body1_normal"
                      weight="regular"
                      {...(overflow === false && {
                        noWrap: true,
                        sx: ellipsisTypographyStyle(1),
                      })}
                    >
                      {label.join(', ')}
                    </Typography>
                  )}
                </FlexBox>
              )}

              {typeof render === 'function' && !shouldShowPlaceholder && (
                <FlexBox
                  ref={setRenderWrapperNode}
                  flex="1"
                  gap="4px"
                  flexWrap="wrap"
                  data-role="select-multiple-render-wrapper"
                  onScrollCapture={handleOnScroll}
                  sx={customSelectMultipleRenderWrapperStyle({
                    overflow,
                    isScrollable,
                  })}
                >
                  {render(label, value)}
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
      </>
    );
  },
);

SelectMultiple.displayName = 'SelectMultiple';

export default SelectMultiple;
