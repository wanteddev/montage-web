'use client';
import { forwardRef, useRef } from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box, type MergeElementProps } from '@wanteddev/wds-engine';

import { textFieldWrapperStyle } from './style';

import type { MouseEvent } from 'react';
import type { TextFieldProps } from './types';

type Props = MergeElementProps<'input', TextFieldProps>;

const TextField = forwardRef<HTMLInputElement, Props>(
  (
    { invalid, rightIcon, className, style, sx, xs, sm, md, lg, xl, ...props },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const composedRefs = useComposedRefs(inputRef, ref);

    return (
      <Box
        className={className}
        style={style}
        sx={[
          textFieldWrapperStyle({
            invalid,
            xs,
            sm,
            md,
            lg,
            xl,
            ...props,
          }),
          sx,
        ]}
        onPointerDown={(event: MouseEvent) => {
          const target = event.target as HTMLElement;
          if (target.closest('input, button, a')) return;

          const input = inputRef.current;
          if (!input) return;

          requestAnimationFrame(() => {
            input.focus();
          });
        }}
      >
        <input ref={composedRefs} aria-invalid={invalid} {...props} />
        {rightIcon}
      </Box>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;
