'use client';
import { forwardRef } from 'react';
import { IconChevronDown } from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Box, type MergeElementProps } from '@wanteddev/wds-engine';

import { selectWrapperStyle } from './style';

import type { ChangeEvent } from 'react';
import type { SelectProps } from './types';

type FieldProps = MergeElementProps<'select', SelectProps>;

const Select = forwardRef<HTMLSelectElement, FieldProps>(
  (
    {
      invalid,
      disabled,
      defaultValue = '',
      value: originValue,
      onChange,
      placeholder,
      children,
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
      <Box
        sx={selectWrapperStyle({
          __shouldShowPlaceholder:
            value === '' || (value === undefined && Boolean(placeholder)),
          invalid,
          disabled,
          xs,
          sm,
          md,
          lg,
          xl,
          ...props,
        })}
      >
        <Box
          as="select"
          ref={ref}
          aria-invalid={invalid}
          disabled={disabled}
          {...props}
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

        <IconChevronDown
          sx={{
            pointerEvents: 'none',
          }}
        />
      </Box>
    );
  },
);

Select.displayName = 'Select';

export default Select;
