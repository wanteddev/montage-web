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
  segmentControlItemStyle,
  segmentControlStyle,
} from './style';
import { SegmentControlProvider, useSegmentControlContext } from './contexts';
import { SEGMENT_CONTROL_ITEM_NAME, SEGMENT_CONTROL_NAME } from './constants';
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
import type { SegmentControlItemProps, SegmentControlProps } from './types';

const ARROW_KEYS = ['ArrowLeft', 'ArrowRight'];

const SegmentControl = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<SegmentControlProps, 'div'>
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
        `[wds-component="segment-control-item"][data-value="${prevValue.current}"]`,
      );
      const nextElement = parentElement?.querySelector<HTMLDivElement>(
        `[wds-component="segment-control-item"][data-value="${value}"]`,
      );

      if (variant === 'outlined') {
        setMotionStyleProperties((prev) => ({ ...prev, display: 'none' }));
        currentElement?.style.removeProperty('boxShadow');
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
              transitionDuration: '400ms',
              transitionTimingFunction: 'cubic-bezier(0.25, 1.25, 0.4, 0.99)',
            }
          : {}),
      });

      nextElement.style.boxShadow = 'none';
      nextElement.style.backgroundColor = 'transparent';
      isValueChanged.current = false;

      requestAnimationFrame(() => {
        currentElement?.style.removeProperty('transparent');
        currentElement?.style.removeProperty('boxShadow');
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
      <SegmentControlProvider
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
            wds-component="segment-control"
            sx={[
              segmentControlStyle({ variant, size, xs, sm, md, lg, xl }),
              props.sx,
            ]}
          >
            <Box
              ref={motionThumbRef}
              sx={motionThumbStyle}
              style={motionStyleProperties}
              data-role="segment-control-motion"
            />

            {children}
          </FlexBox>
        </RovingFocusGroup.Root>
      </SegmentControlProvider>
    );
  },
);

SegmentControl.displayName = SEGMENT_CONTROL_NAME;

const SegmentControlItem = forwardRef(
  <T extends ElementType = 'label'>(
    {
      children,
      value,
      disabled,
      leftContent,
      rightContent,
      as,
      ...props
    }: PolymorphicProps<SegmentControlItemProps, T>,
    forwardedRef: ForwardedRef<ElementRef<T>>,
  ) => {
    const ref = useRef<ElementRef<T>>(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);

    const { size, variant, responsive, ...context } = useSegmentControlContext(
      SEGMENT_CONTROL_ITEM_NAME,
    );

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
          data-active={active}
          aria-disabled={disabled}
          alignItems="center"
          justifyContent="center"
          gap="4px"
          role="option"
          {...props}
          disabled={disabled}
          wds-component="segment-control-item"
          sx={[
            segmentControlItemStyle({
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
          onClick={composeEventHandlers(props.onClick, (e) => {
            context.onValueChange(value);
            console.log(e.target, e.currentTarget, e.relatedTarget);
          })}
          onFocus={composeEventHandlers(props.onFocus, (e) => {
            if (isArrowKeyPressedRef.current) {
              (e.currentTarget as HTMLElement).click();
            }
          })}
        >
          {leftContent}
          <span
            data-role="segment-control-item-text"
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
) as PolymorphicComponent<SegmentControlItemProps, 'label'>;

SegmentControlItem.displayName = SEGMENT_CONTROL_ITEM_NAME;

export { SegmentControl, SegmentControlItem };
