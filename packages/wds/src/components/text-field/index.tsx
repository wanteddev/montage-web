'use client';
import { forwardRef, useRef } from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';

import { textFieldWrapperStyle } from './style';

import type { MergeElementProps } from '@/types';
import type { TextFieldProps } from './types';

type Props = MergeElementProps<'input', TextFieldProps>;

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ invalid, rightIcon, className, xs, sm, md, lg, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const composedRefs = useComposedRefs(inputRef, ref);

    return (
      <div
        className={className}
        css={textFieldWrapperStyle({
          invalid,
          xs,
          sm,
          md,
          lg,
          ...props,
        })}
        onPointerDown={(event) => {
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
      </div>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;
