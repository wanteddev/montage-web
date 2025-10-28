import { forwardRef, useEffect, useRef, useState } from 'react';
import { IconCheckThick, IconLineHorizontalThick } from '@wanteddev/wds-icon';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box } from '@wanteddev/wds-engine';

import { WithInteraction } from '../with-interaction';
import { VirtualCheckboxInput } from '../virtual-input';

import { checkboxStyle } from './style';
import { useCheckboxContext } from './contexts';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { CheckboxProps } from './types';

const Checkbox = forwardRef<
  HTMLButtonElement,
  Omit<
    DefaultComponentPropsInternal<CheckboxProps, 'button'>,
    'onChange' | 'value'
  >
>(
  (
    {
      name,
      defaultChecked,
      icon: originIcon,
      disabled,
      required,
      checked: originChecked,
      onCheckedChange,
      size = 'medium',
      invalid = false,
      indeterminate,
      indeterminateIcon: originIndeterminateIcon,
      tight: originTight,
      bold,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    const { tight: contextTight } = useCheckboxContext() || {};

    const tight = originTight ?? contextTight ?? false;

    const icon = originIcon || <IconCheckThick />;
    const indeterminateIcon = originIndeterminateIcon || (
      <IconLineHorizontalThick />
    );

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
            defaultChecked={defaultChecked}
            bubbles={!hasConsumerStoppedPropagationRef.current}
          />
        )}

        <WithInteraction
          width="calc(100% + 8px)"
          height="calc(100% + 8px)"
          disabled={disabled}
          scale
        >
          <Box
            as="button"
            type="button"
            role="checkbox"
            aria-checked={indeterminate ? 'mixed' : checked}
            aria-disabled={disabled}
            aria-invalid={invalid}
            disabled={disabled}
            aria-required={required}
            ref={composedRefs}
            data-tight={tight}
            wds-component="checkbox"
            {...props}
            sx={[
              checkboxStyle({
                size,
                checked,
                disabled,
                indeterminate,
                bold,
                tight,
                // invalid,
                xs,
                sm,
                md,
                lg,
                xl,
              }),
              props.sx,
            ]}
            onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
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
            <span data-role="checkbox-icon-wrapper">
              {indeterminate ? indeterminateIcon : icon}
            </span>
          </Box>
        </WithInteraction>
      </>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };

export type { CheckboxProps };
