import { forwardRef, useEffect, useRef, useState } from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Box } from '@wanteddev/wds-engine';

import { Radio } from '../radio';
import { createEmptyResponsiveStyle } from '../../utils/internal/responsive-props';

import { RADIO_GROUP_NAME, RADIO_ITEM_NAME } from './constants';
import { RadioGroupProvider, useRadioGroupContext } from './contexts';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { ComponentRef } from 'react';
import type { RadioGroupItemProps, RadioGroupProps } from './types';

const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

const RadioGroup = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<RadioGroupProps, 'div'>
>((props, ref) => {
  const {
    name,
    defaultValue,
    value: valueProp,
    required = false,
    disabled = false,
    orientation,
    dir,
    loop = true,
    onValueChange,
    ...groupProps
  } = props;
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? '',
    onChange: onValueChange,
  });

  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const composedRefs = useComposedRefs<HTMLDivElement>(ref, setNode);

  const initialValueStateRef = useRef(value);

  useEffect(() => {
    const form = node?.closest('form');
    if (form) {
      const reset = () => setValue(initialValueStateRef.current);
      form.addEventListener('reset', reset);
      return () => form.removeEventListener('reset', reset);
    }
  }, [node, setValue]);

  return (
    <RadioGroupProvider
      name={name}
      required={required}
      disabled={disabled}
      value={value}
      onValueChange={setValue}
    >
      <RovingFocusGroup.Root
        asChild
        orientation={orientation}
        dir={dir || 'ltr'}
        loop={loop}
      >
        <Box
          role="radiogroup"
          aria-required={required}
          aria-orientation={orientation}
          data-disabled={disabled ? '' : undefined}
          dir={dir || 'ltr'}
          {...groupProps}
          ref={composedRefs}
        />
      </RovingFocusGroup.Root>
    </RadioGroupProvider>
  );
});

RadioGroup.displayName = RADIO_GROUP_NAME;

const RadioGroupItem = forwardRef<
  ComponentRef<typeof Radio>,
  RadioGroupItemProps
>(({ disabled, ...props }, forwardedRef) => {
  const context = useRadioGroupContext(RADIO_ITEM_NAME);
  const isDisabled = context.disabled || disabled;

  const ref = useRef<React.ComponentRef<typeof Radio>>(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const checked = context.value === props.value;
  const isArrowKeyPressedRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (ARROW_KEYS.includes(event.key)) {
        isArrowKeyPressedRef.current = true;
      }
    };

    const handleKeyUp = () => (isArrowKeyPressedRef.current = false);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <RovingFocusGroup.Item asChild focusable={!isDisabled} active={checked}>
      <Radio
        disabled={isDisabled}
        required={context.required}
        checked={checked}
        name={context.name}
        {...props}
        sx={[props.sx, createEmptyResponsiveStyle(props)]}
        ref={composedRefs}
        onCheck={() => context.onValueChange(props.value)}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          if (event.key === 'Enter') event.preventDefault();
        })}
        onFocus={composeEventHandlers(props.onFocus, () => {
          if (isArrowKeyPressedRef.current) ref.current?.click();
        })}
      />
    </RovingFocusGroup.Item>
  );
});

RadioGroupItem.displayName = RADIO_ITEM_NAME;

export { RadioGroup, RadioGroupItem };

export type { RadioGroupProps, RadioGroupItemProps };
