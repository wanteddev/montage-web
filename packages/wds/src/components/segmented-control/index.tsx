'use client';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { composeEventHandlers } from '@radix-ui/primitive';
import { Box } from '@wanteddev/wds-engine';

import FlexBox from '../flex-box';
import useResizeObserver from '../../hooks/use-resize-observer';

import {
  motionThumbStyle,
  segmentedControlItemStyle,
  segmentedControlStyle,
} from './style';
import {
  SegmentedControlProvider,
  useSegmentedControlContext,
} from './contexts';
import {
  SEGMENTED_CONTROL_ITEM_NAME,
  SEGMENTED_CONTROL_NAME,
} from './constants';
import { calculateAnimationStyle } from './helpers';

import type {
  DefaultComponentProps,
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type {
  CSSProperties,
  ElementRef,
  ElementType,
  ForwardedRef,
} from 'react';
import type { SegmentedControlItemProps, SegmentedControlProps } from './types';

const ARROW_KEYS = ['ArrowLeft', 'ArrowRight'];

const SegmentedControl = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<SegmentedControlProps, 'div'>
>(
  (
    {
      defaultValue,
      value: valueProp,
      onValueChange,
      children,
      variant = 'solid',
      size = 'large',
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    const [node, setNode] = useState<HTMLDivElement | null>(null);
    const composedRefs = useComposedRefs<HTMLDivElement>(ref, setNode);

    const motionThumbRef = useRef<HTMLDivElement | null>(null);

    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    const prevValue = useRef(value);
    const isValueChanged = useRef(false);

    const [motionStyleProperties, setMotionStyleProperties] =
      useState<CSSProperties>({});

    const handleResize = useCallback(() => {
      const parentElement = node;
      const targetElement = motionThumbRef.current;

      const currentElement = parentElement?.querySelector<HTMLDivElement>(
        `[wds-component="segmented-control-item"][data-value="${prevValue.current}"]`,
      );
      const nextElement = parentElement?.querySelector<HTMLDivElement>(
        `[wds-component="segmented-control-item"][data-value="${value}"]`,
      );

      if (variant === 'outlined') {
        setMotionStyleProperties((prev) => ({ ...prev, display: 'none' }));
        currentElement?.removeAttribute('data-ssr-motion');
        isValueChanged.current = false;

        return;
      }

      if (!parentElement || !targetElement || !nextElement) {
        setMotionStyleProperties((prev) => ({ ...prev, display: 'none' }));
        return;
      }

      setMotionStyleProperties({
        ...calculateAnimationStyle(nextElement, parentElement),
        ...(isValueChanged.current
          ? {
              transitionProperty: 'inset',
              transitionDuration: '500ms',
              transitionTimingFunction: 'cubic-bezier(0.25, 1.25, 0.4, 0.99)',
            }
          : {}),
      });

      nextElement.removeAttribute('data-ssr-motion');
      isValueChanged.current = false;

      requestAnimationFrame(() => {
        currentElement?.removeAttribute('data-ssr-motion');
      });
    }, [node, variant, value]);

    useEffect(() => {
      isValueChanged.current = true;
    }, [value]);

    useResizeObserver(node, handleResize);

    const handleValueChange = useCallback(
      (nextValue: string) => {
        prevValue.current = nextValue;
        setValue(nextValue);
      },
      [setValue],
    );

    return (
      <SegmentedControlProvider
        value={value}
        onValueChange={handleValueChange}
        variant={variant}
        size={size}
        responsive={{
          xs,
          sm,
          md,
          lg,
          xl,
        }}
      >
        <RovingFocusGroup.Root asChild orientation="horizontal" loop dir="ltr">
          <FlexBox
            ref={composedRefs}
            alignItems="stretch"
            role="listbox"
            {...props}
            wds-component="segmented-control"
            sx={[
              segmentedControlStyle({ variant, size, xs, sm, md, lg, xl }),
              props.sx,
            ]}
          >
            <Box
              ref={motionThumbRef}
              sx={motionThumbStyle}
              style={motionStyleProperties}
              data-role="segmented-control-motion"
            />

            {children}
          </FlexBox>
        </RovingFocusGroup.Root>
      </SegmentedControlProvider>
    );
  },
);

SegmentedControl.displayName = SEGMENTED_CONTROL_NAME;

const SegmentedControlItem = forwardRef<any, SegmentedControlItemProps>(
  <T extends ElementType = 'label'>(
    {
      children,
      value,
      disabled,
      leftContent,
      rightContent,
      as,
      ...props
    }: PolymorphicProps<SegmentedControlItemProps, T>,
    forwardedRef: ForwardedRef<ElementRef<T>>,
  ) => {
    const ref = useRef<ElementRef<T>>(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);

    const { size, variant, responsive, ...context } =
      useSegmentedControlContext(SEGMENTED_CONTROL_ITEM_NAME);

    const active = context.value === value;
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
      <RovingFocusGroup.Item asChild focusable={!disabled} active={active}>
        <FlexBox
          as={(as || 'label') as T}
          ref={composedRefs}
          flex="1 1 0"
          data-value={value}
          aria-disabled={disabled}
          alignItems="center"
          justifyContent="center"
          gap="4px"
          role="option"
          {...props}
          disabled={disabled}
          wds-component="segmented-control-item"
          data-active={active}
          data-ssr-motion={active}
          sx={[
            segmentedControlItemStyle({
              size,
              active,
              variant,
              disabled,
              ...responsive,
            }),
            props.sx,
          ]}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
            if (event.key === 'Enter') event.preventDefault();
          })}
          onClick={composeEventHandlers(props.onClick, () => {
            context.onValueChange(value);
          })}
          onFocus={composeEventHandlers(props.onFocus, (e) => {
            if (isArrowKeyPressedRef.current) {
              (e.currentTarget as HTMLElement).click();
            }
          })}
        >
          {leftContent}
          <span
            data-role="segmented-control-item-text"
            aria-selected={active}
            aria-disabled={disabled}
          >
            {children}
          </span>
          {rightContent}
        </FlexBox>
      </RovingFocusGroup.Item>
    );
  },
) as PolymorphicComponent<SegmentedControlItemProps, 'label'>;

SegmentedControlItem.displayName = SEGMENTED_CONTROL_ITEM_NAME;

export { SegmentedControl, SegmentedControlItem };
