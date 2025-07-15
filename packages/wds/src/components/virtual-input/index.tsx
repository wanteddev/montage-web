import { Box } from '@wanteddev/wds-engine';
import { forwardRef, useEffect, useRef } from 'react';
import { usePrevious } from '@radix-ui/react-use-previous';
import { useComposedRefs } from '@radix-ui/react-compose-refs';

import type {
  VirtualCheckboxInputProps,
  VirtualValueInputProps,
} from './types';
import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';

const VirtualCheckboxInput = forwardRef<
  HTMLInputElement,
  DefaultComponentPropsInternal<VirtualCheckboxInputProps, 'input'>
>(({ checked, bubbles, ...props }, forwardedRef) => {
  const ref = useRef<HTMLInputElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);

  const prevChecked = usePrevious(checked);

  useEffect(() => {
    const input = ref.current!;
    const inputProto = window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(
      inputProto,
      'checked',
    ) as PropertyDescriptor;
    const setChecked = descriptor.set;
    if (prevChecked !== checked && setChecked) {
      const event = new Event('click', { bubbles });
      setChecked.call(input, checked);
      input.dispatchEvent(event);
    }
  }, [prevChecked, checked, bubbles]);

  return (
    <Box
      as="input"
      type="radio"
      aria-hidden
      defaultChecked={checked}
      {...props}
      tabIndex={-1}
      ref={composedRefs}
      sx={[
        {
          transform: 'translateX(-100%)',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'none',
          opacity: 0,
          margin: 0,
        },
        props.sx,
      ]}
    />
  );
});

VirtualCheckboxInput.displayName = 'VirtualCheckboxInput';

const VirtualValueInput = forwardRef<
  HTMLInputElement,
  DefaultComponentPropsInternal<VirtualValueInputProps, 'input'>
>(({ value, bubbles, ...props }, forwardedRef) => {
  const ref = useRef<HTMLInputElement>(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);

  const prevValue = useRef(value);

  useEffect(() => {
    const input = ref.current!;
    const inputProto = window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(
      inputProto,
      'value',
    ) as PropertyDescriptor;
    const setValue = descriptor.set;
    if (prevValue.current !== value && setValue) {
      const event = new Event('input', { bubbles: true });
      setValue.call(input, value);
      input.dispatchEvent(event);
    }

    prevValue.current = value;
  }, [value, bubbles]);

  return (
    <Box
      as="input"
      type="text"
      aria-hidden
      {...props}
      tabIndex={-1}
      ref={composedRefs}
      sx={[
        {
          transform: 'translateX(-100%)',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'none',
          opacity: 0,
          margin: 0,
        },
        props.sx,
      ]}
    />
  );
});

VirtualValueInput.displayName = 'VirtualValueInput';

export { VirtualCheckboxInput, VirtualValueInput };

export type { VirtualCheckboxInputProps, VirtualValueInputProps };
