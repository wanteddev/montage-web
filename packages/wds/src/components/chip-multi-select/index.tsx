import { forwardRef, useEffect, useRef, useState } from 'react';
import { IconCheckThick } from '@wanteddev/wds-icon';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';
import { VirtualCheckboxInput } from '../virtual-input';

import { multiSelectStyle } from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ChipMultiSelectProps } from './types';

/**
 * @deprecated ChipAction 을 사용해주세요.
 */
const ChipMultiSelect = forwardRef<
  HTMLButtonElement,
  Omit<
    DefaultComponentProps<ChipMultiSelectProps, 'button'>,
    'onChange' | 'value'
  >
>(
  (
    {
      name,
      defaultChecked = false,
      icon: originIcon,
      disabled,
      required,
      checked: originChecked,
      onCheckedChange,
      size = 'large',
      invalid = false,
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
    const icon = originIcon || <IconCheckThick />;

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
            type="checkbox"
            checked={checked}
            defaultChecked={defaultChecked}
            bubbles={!hasConsumerStoppedPropagationRef.current}
          />
        )}

        <WithInteraction disabled={disabled}>
          <Box
            as="button"
            type="button"
            role="checkbox"
            aria-checked={checked}
            aria-disabled={disabled}
            aria-invalid={invalid}
            disabled={disabled}
            aria-required={required}
            ref={composedRefs}
            {...props}
            sx={[
              multiSelectStyle({
                size,
                checked,
                disabled,
                invalid,
                xs,
                sm,
                md,
                lg,
                xl,
              }),
              props.sx,
            ]}
            onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
              // WAI ARIA 상으로 checkbox는 enter로 선택 하지 않음.
              if (event.key === 'Enter') event.preventDefault();
            })}
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
            {icon}
            <span>{children}</span>
          </Box>
        </WithInteraction>
      </>
    );
  },
);

ChipMultiSelect.displayName = 'ChipMultiSelect';

export default ChipMultiSelect;
