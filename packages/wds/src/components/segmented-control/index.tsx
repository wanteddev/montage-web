import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { composeEventHandlers } from '@radix-ui/primitive';
import { Box } from '@wanteddev/wds-engine';
import { usePrevious } from '@radix-ui/react-use-previous';

import { FlexBox } from '../flex-box';
import useResizeObserver from '../../hooks/internal/use-resize-observer';
import { calculateAnimationStyle } from '../../utils/internal/animation';
import { VirtualCheckboxInput } from '../virtual-input';

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

import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type {
  CSSProperties,
  ComponentRef,
  ElementType,
  ForwardedRef,
} from 'react';
import type { SegmentedControlItemProps, SegmentedControlProps } from './types';

const ARROW_KEYS = ['ArrowLeft', 'ArrowRight'];

const SegmentedControl = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<SegmentedControlProps, 'div'>
>(
  (
    {
      defaultValue,
      value: valueProp,
      onValueChange,
      children,
      variant = 'solid',
      size = 'medium',
      name,
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
      defaultProp: defaultValue ?? '',
      onChange: onValueChange,
    });

    const prevValue = usePrevious(value);
    const isValueChanged = prevValue !== value;

    const [motionStyleProperties, setMotionStyleProperties] =
      useState<CSSProperties>({});

    const handleResize = useCallback(() => {
      const parentElement = node;
      const targetElement = motionThumbRef.current;

      const currentElement = parentElement?.querySelector<HTMLDivElement>(
        `[wds-component="segmented-control-item"][data-value="${prevValue}"]`,
      );
      const nextElement = parentElement?.querySelector<HTMLDivElement>(
        `[wds-component="segmented-control-item"][data-value="${value}"]`,
      );

      if (variant === 'outlined') {
        setMotionStyleProperties((prev) => ({ ...prev, display: 'none' }));
        currentElement?.removeAttribute('data-ssr-motion');

        return;
      }

      if (!parentElement || !targetElement || !nextElement) {
        setMotionStyleProperties((prev) => ({ ...prev, display: 'none' }));
        return;
      }

      setMotionStyleProperties({
        ...calculateAnimationStyle(nextElement, parentElement),
        ...(isValueChanged
          ? {
              transitionProperty: 'inset',
              transitionDuration: '500ms',
              transitionTimingFunction: 'cubic-bezier(0.25, 1.25, 0.4, 0.99)',
            }
          : {}),
      });

      nextElement.removeAttribute('data-ssr-motion');

      requestAnimationFrame(() => {
        currentElement?.removeAttribute('data-ssr-motion');
      });
    }, [node, variant, value, isValueChanged, prevValue]);

    useResizeObserver(node, handleResize);

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
      <SegmentedControlProvider
        value={value}
        onValueChange={setValue}
        variant={variant}
        size={size}
        name={name}
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
            role="radiogroup"
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
      leadingContent,
      trailingContent,
      as,
      ...props
    }: PolymorphicPropsInternal<SegmentedControlItemProps, T>,
    forwardedRef: ForwardedRef<T>,
  ) => {
    const id = useId();

    const [node, setNode] = useState<ComponentRef<T> | null>(null);
    const composedRefs = useComposedRefs(
      forwardedRef,
      setNode as ForwardedRef<T>,
    );

    const { size, variant, responsive, name, ...context } =
      useSegmentedControlContext(SEGMENTED_CONTROL_ITEM_NAME);

    const active = context.value === value;
    const isArrowKeyPressedRef = useRef(false);

    const isFormControl = node
      ? Boolean((node as unknown as HTMLElement).closest('form'))
      : true;

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
          alignItems="center"
          justifyContent="center"
          gap="4px"
          data-value={value}
          role="radio"
          aria-disabled={disabled}
          aria-checked={active}
          aria-labelledby={id}
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
            if (disabled) return;

            if (event.key === 'Enter') event.preventDefault();
          })}
          onClick={composeEventHandlers(props.onClick, () => {
            if (disabled) return;

            context.onValueChange(value);
          })}
          onFocus={composeEventHandlers(props.onFocus, (e) => {
            if (disabled) return;

            if (isArrowKeyPressedRef.current) {
              (e.currentTarget as HTMLElement).click();
            }
          })}
        >
          {leadingContent}
          <span
            data-role="segmented-control-item-text"
            aria-selected={active}
            aria-disabled={disabled}
            id={id}
          >
            {isFormControl && (
              <VirtualCheckboxInput
                type="radio"
                name={name}
                value={value}
                checked={active}
                disabled={disabled}
              />
            )}
            {children}
          </span>
          {trailingContent}
        </FlexBox>
      </RovingFocusGroup.Item>
    );
  },
) as PolymorphicComponentInternal<SegmentedControlItemProps, 'label'>;

SegmentedControlItem.displayName = SEGMENTED_CONTROL_ITEM_NAME;

export { SegmentedControl, SegmentedControlItem };

export type { SegmentedControlProps, SegmentedControlItemProps };
