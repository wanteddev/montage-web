import { Box } from '@montage-ui/engine';
import { IconCheckThick, IconLineHorizontalThick } from '@montage-ui/icon';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { VirtualCheckboxInput } from '../virtual-input';
import { WithInteraction } from '../with-interaction';

import { useCheckboxContext } from './contexts';
import { checkboxStyle } from './style';

import type { CheckboxProps } from './types';
import type { DefaultComponentPropsInternal } from '@montage-ui/engine';

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
            disabled={disabled}
            aria-required={required}
            ref={composedRefs}
            data-tight={tight}
            data-component="checkbox"
            {...props}
            sx={[
              checkboxStyle({
                size,
                checked,
                disabled,
                indeterminate,
                bold,
                tight,
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
