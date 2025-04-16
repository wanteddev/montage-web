import { forwardRef, useEffect, useRef, useState } from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useSize } from '@radix-ui/react-use-size';
import { usePrevious } from '@radix-ui/react-use-previous';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';

import { switchStyle } from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { SwitchProps } from './types';

const Switch = forwardRef<
  HTMLButtonElement,
  Omit<DefaultComponentProps<SwitchProps, 'button'>, 'onChange' | 'value'>
>(
  (
    {
      name,
      defaultChecked = false,
      disabled,
      checked: originChecked,
      onCheckedChange,
      size = 'medium',
      required,
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
    const [checked = false, setChecked] = useControllableState({
      prop: originChecked,
      defaultProp: defaultChecked,
      onChange: onCheckedChange,
    });
    const initialCheckedStateRef = useRef(checked);

    useEffect(() => {
      const form = button?.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener('reset', reset);
        return () => form.removeEventListener('reset', reset);
      }
    }, [button, setChecked]);

    return (
      <>
        {isFormControl && (
          <BubbleInput
            name={name}
            value={checked ? 'on' : 'off'}
            type="checkbox"
            checked={checked}
            defaultChecked={defaultChecked}
            sx={{ display: 'none', pointerEvents: 'none' }}
            control={button}
            bubbles={!hasConsumerStoppedPropagationRef.current}
          />
        )}

        <WithInteraction disabled={disabled}>
          <Box
            as="button"
            type="button"
            role="switch"
            aria-checked={checked}
            aria-disabled={disabled}
            aria-required={required}
            disabled={disabled}
            ref={composedRefs}
            {...props}
            sx={[
              switchStyle({
                size,
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
              setChecked((prevChecked) => !prevChecked);

              if (isFormControl) {
                hasConsumerStoppedPropagationRef.current =
                  event.isPropagationStopped();

                if (!hasConsumerStoppedPropagationRef.current)
                  event.stopPropagation();
              }
            })}
          >
            <span />
          </Box>
        </WithInteraction>
      </>
    );
  },
);

Switch.displayName = 'Switch';

export default Switch;

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
  sx,
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
        sx,
      ]}
    />
  );
};
