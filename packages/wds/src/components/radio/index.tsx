'use client';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useSize } from '@radix-ui/react-use-size';
import { usePrevious } from '@radix-ui/react-use-previous';
import { IconDot } from '@wanteddev/wds-icon';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';

import { radioStyle } from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { RadioProps } from './types';

const Radio = forwardRef<
  HTMLButtonElement,
  Omit<DefaultComponentProps<RadioProps, 'button'>, 'onChange'>
>(
  (
    {
      name,
      checked = false,
      disabled,
      required,
      value,
      invalid = false,
      onCheck,
      size = 'normal',
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    const [button, setButton] = useState<HTMLButtonElement | null>(null);
    const composedRefs = useComposedRefs(ref, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = useRef(false);
    const isFormControl = button ? Boolean(button.closest('form')) : true;

    return (
      <>
        {isFormControl && (
          <BubbleInput
            aria-hidden="true"
            tabIndex={-1}
            value={value}
            type="radio"
            checked={checked}
            defaultChecked={checked}
            sx={{ display: 'none', pointerEvents: 'none' }}
            control={button}
            bubbles={!hasConsumerStoppedPropagationRef.current}
            name={name}
            required={required}
            disabled={disabled}
          />
        )}

        <WithInteraction
          width="calc(100% + 8px)"
          height="calc(100% + 8px)"
          disabled={disabled}
        >
          <Box
            as="button"
            type="button"
            role="radio"
            aria-checked={checked}
            aria-disabled={disabled ? 'true' : undefined}
            aria-required={required}
            aria-invalid={invalid}
            disabled={disabled}
            value={value}
            ref={composedRefs}
            {...props}
            sx={[
              radioStyle({
                size,
                // invalid,
                checked,
                disabled,
                xs,
                sm,
                md,
                lg,
                xl,
              }),
              props.sx,
            ]}
            onClick={composeEventHandlers(props.onClick, (event) => {
              if (!checked) onCheck?.();
              if (isFormControl) {
                hasConsumerStoppedPropagationRef.current =
                  event.isPropagationStopped();
                if (!hasConsumerStoppedPropagationRef.current)
                  event.stopPropagation();
              }
            })}
          >
            <span>
              <IconDot />
            </span>
          </Box>
        </WithInteraction>
      </>
    );
  },
);

Radio.displayName = 'Radio';

export default Radio;

type BubbleInputProps = DefaultComponentProps<
  {
    checked: boolean;
    control: HTMLElement | null;
    bubbles: boolean;
  },
  'input'
>;

const BubbleInput = ({
  control,
  checked,
  bubbles = true,
  ...inputProps
}: BubbleInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const prevChecked = usePrevious(checked);
  const controlSize = useSize(control);

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
      type="checkbox"
      aria-hidden
      defaultChecked={checked}
      {...inputProps}
      tabIndex={-1}
      ref={ref}
      sx={[
        {
          ...controlSize,
          transform: 'translateX(-100%)',
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0,
          margin: 0,
        },
        inputProps.sx,
      ]}
    />
  );
};
