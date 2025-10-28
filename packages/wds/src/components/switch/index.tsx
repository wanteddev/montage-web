import { forwardRef, useEffect, useRef, useState } from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box } from '@wanteddev/wds-engine';

import { WithInteraction } from '../with-interaction';
import { VirtualCheckboxInput } from '../virtual-input';
import { hapticFeedback } from '../../utils/internal/haptic';

import { switchStyle } from './style';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { SwitchProps } from './types';

const Switch = forwardRef<
  HTMLButtonElement,
  Omit<
    DefaultComponentPropsInternal<SwitchProps, 'button'>,
    'onChange' | 'value'
  >
>(
  (
    {
      name,
      defaultChecked,
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
    const [checked, setChecked] = useControllableState({
      prop: originChecked,
      defaultProp: defaultChecked ?? false,
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

        <WithInteraction
          disabled={disabled}
          color={checked ? 'semantic.static.white' : 'semantic.label.normal'}
        >
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

              hapticFeedback();

              if (isFormControl) {
                hasConsumerStoppedPropagationRef.current =
                  event.isPropagationStopped();

                if (!hasConsumerStoppedPropagationRef.current)
                  event.stopPropagation();
              }
            })}
          >
            <span
              data-role="switch-knob"
              data-checked={checked}
              data-disabled={disabled}
            />
          </Box>
        </WithInteraction>
      </>
    );
  },
);

Switch.displayName = 'Switch';

export { Switch };

export type { SwitchProps };
