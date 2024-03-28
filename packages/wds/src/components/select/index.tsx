'use client';
import { forwardRef } from 'react';
import { IconChevronDown } from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

import { selectWrapperStyle } from './style';

import type { MergeElementProps } from '@/types';
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
      <div
        css={selectWrapperStyle({
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
        <select
          ref={ref}
          aria-invalid={invalid}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={disabled}
          {...props}
        >
          {Boolean(placeholder) && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>

        <IconChevronDown
          css={{
            pointerEvents: 'none',
          }}
        />
      </div>
    );
  },
);

Select.displayName = 'Select';

export default Select;
