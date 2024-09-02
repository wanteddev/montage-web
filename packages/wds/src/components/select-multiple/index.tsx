'use client';
import { forwardRef, useMemo, useRef } from 'react';
import {
  IconChevronDownThickSmall,
  IconChevronUpThickSmall,
  IconCircleExclamationFill,
} from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { composeEventHandlers } from '@radix-ui/primitive';

import { Menu, MenuContent, MenuList, MenuTrigger } from '../menu';
import FlexBox from '../flex-box';
import Typography from '../typography';
import { ellipsisTypographyStyle } from '../../utils';
import { SelectContent } from '../select-single';

import {
  invalidIconWrapperStyle,
  selectIconStyle,
  selectMultipleStyle,
} from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
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
      render,
      width,
      height,
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
    const ref = useRef<HTMLDivElement>(null);

    const composedRefs = useComposedRefs(forwardedRef, ref);

    const [value = [], setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });

    const shouldShowPlaceholder = useMemo(
      () => value.length === 0,
      [value.length],
    );

    return (
      <Menu
        value={value}
        onValueChange={useCallbackRef(
          (v: string | Array<string> | undefined) => {
            if (!Array.isArray(v) && process.env.NODE_ENV !== 'production') {
              throw new Error(
                'SelectMultiple 값에 오류가 발생했습니다. radio를 사용하였거나 value가 Array가 아닌지 확인이 필요합니다.',
              );
            }

            setValue(v as Array<string>);
          },
        )}
        open={open}
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
                (e.target as HTMLElement) === ref.current
              ) {
                e.preventDefault();
                e.currentTarget.click();
              }
            })}
            sx={[
              selectMultipleStyle({
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
            {(typeof render === 'undefined' || shouldShowPlaceholder) && (
              <FlexBox flex="1" gap="4px" sx={{ padding: '0px 4px' }}>
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
                    noWrap
                    variant="body1_normal"
                    weight="regular"
                    sx={ellipsisTypographyStyle(1)}
                  >
                    {value.join(', ')}
                  </Typography>
                )}
              </FlexBox>
            )}

            {typeof render === 'function' && (
              <FlexBox flex="1" gap="4px" flexWrap="wrap">
                {render(value)}
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

        <MenuContent {...contentProps}>
          <MenuList role="listbox">{children}</MenuList>
        </MenuContent>
      </Menu>
    );
  },
);

SelectMultiple.displayName = 'SelectMultiple';

export default SelectMultiple;
