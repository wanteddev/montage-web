'use client';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { IconCheckThick } from '@wanteddev/wds-icon';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useSize } from '@radix-ui/react-use-size';
import { usePrevious } from '@radix-ui/react-use-previous';

import WithInteraction from '../with-interaction';

import { checkboxStyle } from './style';

import type { MergeElementProps } from '@/types';
import type { ComponentPropsWithoutRef } from 'react';
import type { CheckboxProps } from './types';

type Props = Omit<
  MergeElementProps<'button', CheckboxProps>,
  'onChange' | 'value'
>;

const Checkbox = forwardRef<HTMLButtonElement, Props>(
  (
    {
      name,
      defaultChecked = false,
      icon: originIcon,
      disabled,
      required,
      checked: originChecked,
      onCheckedChange,
      size = 'small',
      invalid = false,
      xs,
      sm,
      md,
      lg,
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
          <BubbleInput
            name={name}
            value={checked ? 'on' : 'off'}
            type="checkbox"
            checked={checked}
            defaultChecked={defaultChecked}
            css={{ display: 'none', pointerEvents: 'none' }}
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
          <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            aria-disabled={disabled}
            aria-invalid={invalid}
            disabled={disabled}
            aria-required={required}
            ref={composedRefs}
            css={checkboxStyle({
              size,
              checked,
              disabled,
              // invalid,
              xs,
              sm,
              md,
              lg,
            })}
            {...props}
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
            <span>{icon}</span>
          </button>
        </WithInteraction>
      </>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;

type BubbleInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'checked'> & {
  checked: boolean;
  control: HTMLElement | null;
  bubbles: boolean;
};

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
    <input
      type="checkbox"
      aria-hidden
      defaultChecked={checked}
      {...inputProps}
      tabIndex={-1}
      ref={ref}
      css={{
        ...controlSize,
        transform: 'translateX(-100%)',
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        margin: 0,
      }}
    />
  );
};
