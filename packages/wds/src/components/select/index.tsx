'use client';
import { forwardRef } from 'react';
import { IconChevronDown } from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Box } from '@wanteddev/wds-engine';

import FlexBox from '../flex-box';

import { selectIconStyle, selectStyle, selectWrapperStyle } from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ChangeEvent } from 'react';
import type { SelectProps } from './types';

const Select = forwardRef<
  HTMLSelectElement,
  DefaultComponentProps<SelectProps, 'select'>
>(
  (
    {
      invalid,
      disabled,
      defaultValue = '',
      value: originValue,
      onChange,
      placeholder,
      children,
      width,
      height,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      prop: originValue,
      defaultProp: defaultValue,
      onChange,
    });

    return (
      <FlexBox alignItems="center" sx={selectWrapperStyle}>
        <Box
          as="select"
          ref={ref}
          aria-invalid={invalid}
          disabled={disabled}
          {...props}
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
              __shouldShowPlaceholder:
                value === '' || (value === undefined && Boolean(placeholder)),
              ...props,
            }),
            props.sx,
          ]}
          value={value}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setValue(event.target.value)
          }
        >
          {Boolean(placeholder) && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </Box>

        <IconChevronDown sx={selectIconStyle({ disabled })} />
      </FlexBox>
    );
  },
);

Select.displayName = 'Select';

export default Select;
