'use client';
import { forwardRef, useEffect, useRef } from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Box } from '@wanteddev/wds-engine';

import Radio from '../radio';
import { createEmptyResponsiveStyle } from '../../utils';

import { RADIO_GROUP_NAME, RADIO_ITEM_NAME } from './constants';
import { RadioGroupProvider, useRadioGroupContext } from './contexts';

import type { ElementRef } from 'react';
import type { RadioGroupItemProps, RadioGroupProps } from './types';

const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (props: RadioGroupProps, ref) => {
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
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

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
            sx={[groupProps.sx, createEmptyResponsiveStyle(groupProps)]}
            ref={ref}
          />
        </RovingFocusGroup.Root>
      </RadioGroupProvider>
    );
  },
);

RadioGroup.displayName = RADIO_GROUP_NAME;

const RadioGroupItem = forwardRef<
  ElementRef<typeof Radio>,
  RadioGroupItemProps
>(({ disabled, ...itemProps }, forwardedRef) => {
  const context = useRadioGroupContext(RADIO_ITEM_NAME);
  const isDisabled = context.disabled || disabled;

  const ref = useRef<React.ElementRef<typeof Radio>>(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const checked = context.value === itemProps.value;
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
        {...itemProps}
        sx={[itemProps.sx, createEmptyResponsiveStyle(itemProps)]}
        name={context.name}
        ref={composedRefs}
        onCheck={() => context.onValueChange(itemProps.value)}
        onKeyDown={composeEventHandlers(itemProps.onKeyDown, (event) => {
          if (event.key === 'Enter') event.preventDefault();
        })}
        onFocus={composeEventHandlers(itemProps.onFocus, () => {
          if (isArrowKeyPressedRef.current) ref.current?.click();
        })}
      />
    </RovingFocusGroup.Item>
  );
});

RadioGroupItem.displayName = RADIO_ITEM_NAME;

export { RadioGroup, RadioGroupItem };
