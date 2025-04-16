import { forwardRef, useEffect, useRef, useState } from 'react';
import { IconCheckThick, IconLineHorizontalThick } from '@wanteddev/wds-icon';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useSize } from '@radix-ui/react-use-size';
import { usePrevious } from '@radix-ui/react-use-previous';
import { Box } from '@wanteddev/wds-engine';

import WithInteraction from '../with-interaction';

import { checkboxStyle } from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { CheckboxProps } from './types';

const Checkbox = forwardRef<
  HTMLButtonElement,
  Omit<DefaultComponentProps<CheckboxProps, 'button'>, 'onChange' | 'value'>
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
      size = 'medium',
      invalid = false,
      indeterminate,
      indeterminateIcon: originIndeterminateIcon,
      tight = false,
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
    const icon = originIcon || <IconCheckThick />;
    const indeterminateIcon = originIndeterminateIcon || (
      <IconLineHorizontalThick />
    );

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

export default Checkbox;

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
