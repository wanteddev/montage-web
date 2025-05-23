import { forwardRef, useEffect, useRef, useState } from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';
import { VirtualCheckboxInput } from '../virtual-input';

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
          <VirtualCheckboxInput
            name={name}
            value={checked ? 'on' : 'off'}
            checked={checked}
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
