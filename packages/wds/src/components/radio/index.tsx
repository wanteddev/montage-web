import { forwardRef, useRef, useState } from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { IconDot } from '@wanteddev/wds-icon';
import { Box } from '@wanteddev/wds-engine';

import { WithInteraction } from '../with-interaction';
import { VirtualCheckboxInput } from '../virtual-input';

import { radioStyle } from './style';
import { useRadioContext } from './contexts';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { RadioProps } from './types';

const Radio = forwardRef<
  HTMLButtonElement,
  Omit<DefaultComponentPropsInternal<RadioProps, 'button'>, 'onChange'>
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
      size = 'medium',
      tight: originTight,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    const { tight: contextTight } = useRadioContext() || {};

    const tight = originTight ?? contextTight ?? false;

    const [button, setButton] = useState<HTMLButtonElement | null>(null);
    const composedRefs = useComposedRefs(ref, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = useRef(false);
    const isFormControl = button ? Boolean(button.closest('form')) : true;

    return (
      <>
        {isFormControl && (
          <VirtualCheckboxInput
            value={value}
            checked={checked}
            type="radio"
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
            aria-disabled={disabled}
            aria-required={required}
            aria-invalid={invalid}
            disabled={disabled}
            value={value}
            ref={composedRefs}
            data-tight={tight}
            wds-component="radio"
            {...props}
            sx={[
              radioStyle({
                size,
                // invalid,
                tight,
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

export { Radio };

export type { RadioProps };
