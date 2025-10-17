import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Box, type DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';

import { FlexBox } from '../flex-box';
import { Typography } from '../typography';
import { VirtualValueInput } from '../virtual-input';

import {
  clamp,
  convertValueToPercentage,
  getClosestThumbIndex,
  linearScale,
} from './helpers';
import {
  sliderProgressRangeStyle,
  sliderProgressStyle,
  sliderProgressWrapperStyle,
  sliderThumbInteractionStyle,
  sliderThumbStyle,
} from './style';

import type { ReactNode } from 'react';
import type {
  SliderLabelProps,
  SliderProps,
  SliderThumbProps,
  SliderTitleProps,
} from './types';

const PAGE_KEYS = ['PageUp', 'PageDown'];
const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

const Slider = forwardRef<
  HTMLSpanElement,
  DefaultComponentPropsInternal<SliderProps, 'span'>
>(
  (
    {
      title,
      label,
      min = 0,
      max = 100,
      step = 1,
      minStepBetweenThumbs = 0,
      defaultValue = [min],
      disableSwapThumbs = false,
      value,
      onValueChange,
      onValueChangeComplete,
      disabled,
      name,
      onPointerDown,
      onPointerUp,
      onPointerMove,
      onKeyDown,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onChange: _,
      ...props
    },
    forwardedRef,
  ) => {
    const labelId = useId();
    const thumbRefs = useRef<Set<HTMLSpanElement>>(new Set());
    const currentFocusedIndex = useRef(0);
    const rect = useRef<DOMRect | undefined>(undefined);
    const [node, setNode] = useState<HTMLSpanElement | null>(null);

    const [values = [], setValues] = useControllableState({
      prop: value,
      defaultProp: defaultValue,
      onChange: (v) => {
        [...thumbRefs.current][currentFocusedIndex.current]?.focus();
        onValueChange?.(v);
      },
    });

    const slideStartValues = useRef(values);

    const handleValueChange = useCallback(
      (nextValue: number, index: number, isCompleted = false) => {
        const decimalCount = nextValue.toString().split('.')[1]?.length ?? 0;
        const snapToStep =
          Math.round(
            Math.round(((nextValue - min) / step) * step + min) *
              Math.pow(10, decimalCount),
          ) / Math.pow(10, decimalCount);

        const calculatedNextValue = clamp(snapToStep, [min, max]);

        setValues((prevValues = []) => {
          const nextValues = [
            ...prevValues.slice(0, index),
            calculatedNextValue,
            ...prevValues.slice(index + 1),
          ];

          const stepsBetweenValue = Math.min(
            ...nextValues.slice(0, -1).map((v, i) => nextValues[i + 1]! - v),
          );

          if (
            (disableSwapThumbs && stepsBetweenValue < minStepBetweenThumbs) ||
            (minStepBetweenThumbs > 0 &&
              stepsBetweenValue < minStepBetweenThumbs)
          ) {
            return prevValues;
          }

          const sortedNextValues = nextValues.sort((a, b) => a - b);

          currentFocusedIndex.current =
            sortedNextValues.indexOf(calculatedNextValue);

          const hasChanged =
            sortedNextValues.toString() !== prevValues.toString();
          if (hasChanged && isCompleted) {
            onValueChangeComplete?.(sortedNextValues);
          }
          return hasChanged ? sortedNextValues : prevValues;
        });
      },
      [
        max,
        min,
        onValueChangeComplete,
        setValues,
        step,
        minStepBetweenThumbs,
        disableSwapThumbs,
      ],
    );

    const getValueFromPointer = (pointerPosition: number) => {
      if (!node) {
        return;
      }

      const newRect = rect.current || node.getBoundingClientRect();
      const cb = linearScale([0, newRect.width], [min, max]);

      rect.current = newRect;
      return cb(pointerPosition - newRect.left);
    };

    const initialValuesRef = useRef(values);

    useEffect(() => {
      const form = node?.closest('form');
      if (form) {
        const reset = () => setValues(initialValuesRef.current);
        form.addEventListener('reset', reset);
        return () => form.removeEventListener('reset', reset);
      }
    }, [node, setValues]);

    return (
      <FlexBox
        as="span"
        flexDirection="column"
        ref={forwardedRef}
        {...props}
        sx={[{ width: '100%' }, props.sx]}
      >
        {typeof title !== 'undefined' && (
          <FlexBox
            as={Typography}
            gap="4px"
            data-role="slider-title"
            align="center"
            display="block"
            variant="headline2"
            weight="bold"
            alignItems="center"
            color={
              disabled ? 'semantic.label.disable' : 'semantic.label.normal'
            }
            sx={{ margin: '0 auto 32px auto' }}
          >
            {typeof title === 'function'
              ? (title({ values, disabled, min, max }) as ReactNode)
              : title}
          </FlexBox>
        )}

        <Box
          sx={sliderProgressWrapperStyle({ disabled })}
          data-role="slider-progress-wrapper"
          as="span"
          ref={setNode}
          onKeyDown={composeEventHandlers(onKeyDown, (e) => {
            if (disabled) return;

            if (e.key === 'Home') {
              e.preventDefault();
              handleValueChange(min, 0, true);
            } else if (e.key === 'End') {
              e.preventDefault();
              handleValueChange(max, values.length - 1, true);
            } else if (PAGE_KEYS.concat(ARROW_KEYS).includes(e.key)) {
              e.preventDefault();
              const isPageKey = PAGE_KEYS.includes(e.key);
              const isSkipKey =
                isPageKey || (e.shiftKey && ARROW_KEYS.includes(e.key));
              const multiplier = isSkipKey ? 10 : 1;
              const atIndex = currentFocusedIndex.current;
              const newValue = values[atIndex]!;

              const stepInDirection =
                step *
                multiplier *
                (['Home', 'PageDown', 'ArrowDown', 'ArrowLeft'].includes(e.key)
                  ? -1
                  : 1);
              handleValueChange(newValue + stepInDirection, atIndex, true);
            }
          })}
          onPointerDown={composeEventHandlers(onPointerDown, (event) => {
            if (disabled) return;

            slideStartValues.current = values;

            const target = event.target as HTMLElement;
            target.setPointerCapture(event.pointerId);
            event.preventDefault();

            const closestThumb = target.closest<HTMLSpanElement>(
              '[data-role="slider-thumb"]',
            );

            if (closestThumb && thumbRefs.current.has(closestThumb)) {
              target.focus();
            } else {
              const newValue = getValueFromPointer(event.clientX);
              if (newValue === undefined) return;

              const closestIndex = getClosestThumbIndex(values, newValue);
              handleValueChange(newValue, closestIndex);
            }
          })}
          onPointerMove={composeEventHandlers(onPointerMove, (event) => {
            if (disabled) return;

            const target = event.target as HTMLElement;
            if (target.hasPointerCapture(event.pointerId)) {
              const newValue = getValueFromPointer(event.clientX);
              if (newValue === undefined) return;

              handleValueChange(newValue, currentFocusedIndex.current);
            }
          })}
          onPointerUp={composeEventHandlers(onPointerUp, (event) => {
            if (disabled) return;

            const target = event.target as HTMLElement;
            if (target.hasPointerCapture(event.pointerId)) {
              target.releasePointerCapture(event.pointerId);

              const prevValue =
                slideStartValues.current[currentFocusedIndex.current];
              const nextValue = values[currentFocusedIndex.current];
              const hasChanged = nextValue !== prevValue;
              rect.current = undefined;

              if (hasChanged) {
                onValueChangeComplete?.(values);
              }
            }
          })}
        >
          <Box sx={sliderProgressStyle} data-role="slider-progress-range">
            <Box
              sx={sliderProgressRangeStyle}
              data-role="slider-progress"
              style={{
                left: `${values.length > 1 ? convertValueToPercentage(Math.min(...values), min, max) : 0}%`,
                right: `${100 - convertValueToPercentage(Math.max(...values), min, max)}%`,
              }}
            />
          </Box>

          {values.map((v, index) => (
            <SliderThumb
              disabled={disabled}
              name={name}
              key={index}
              length={value?.length ?? 0}
              value={v}
              min={min}
              max={max}
              aria-labelledby={labelId}
              onFocus={() => (currentFocusedIndex.current = index)}
              thumbs={thumbRefs.current}
            />
          ))}
        </Box>

        {typeof label !== 'undefined' && (
          <Box
            data-role="slider-label-wrapper"
            sx={{ position: 'relative', height: '20px', marginTop: '8px' }}
          >
            {values.map((v, i) => {
              const render =
                typeof label === 'function'
                  ? (label({
                      value: v,
                      index: i,
                      min,
                      max,
                      disabled,
                    }) as ReactNode)
                  : label;

              if (!render) {
                return null;
              }

              return (
                <Typography
                  data-role="slider-label"
                  variant="label1"
                  weight="medium"
                  key={i}
                  display="inline-block"
                  style={{
                    left: `${convertValueToPercentage(values[i] ?? 0, min, max)}%`,
                    transform: `translateX(-${convertValueToPercentage(values[i] ?? 0, min, max)}%)`,
                  }}
                  sx={{
                    position: 'absolute',
                    width: 'max-content',
                  }}
                  color={
                    disabled
                      ? 'semantic.label.disable'
                      : 'semantic.label.normal'
                  }
                >
                  {render}
                </Typography>
              );
            })}
          </Box>
        )}
      </FlexBox>
    );
  },
);

Slider.displayName = 'Slider';

const SliderThumb = ({
  name,
  disabled,
  min,
  max,
  value,
  length,
  thumbs,
  ...props
}: DefaultComponentPropsInternal<SliderThumbProps, 'span'>) => {
  const [thumb, setThumb] = useState<HTMLSpanElement | null>(null);
  const isFormControl = thumb ? Boolean(thumb.closest('form')) : true;

  useEffect(() => {
    if (thumb) {
      thumbs.add(thumb);

      return () => {
        thumbs.delete(thumb);
      };
    }
  }, [thumb, thumbs]);

  return (
    <>
      <Box
        ref={setThumb}
        as="span"
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        style={{
          left: convertValueToPercentage(value, min, max) + '%',
          transform: `translateX(${convertValueToPercentage(value, min, max) * -1}%)`,
        }}
        data-role="slider-thumb"
        sx={sliderThumbStyle}
        {...props}
        onPointerDown={composeEventHandlers(props.onPointerDown, () => {
          thumb?.focus();
        })}
      >
        <Box
          data-role="slider-thumb-interaction"
          as="span"
          sx={sliderThumbInteractionStyle}
        />

        {isFormControl && (
          <VirtualValueInput
            type="range"
            name={length > 1 ? `${name}[]` : name}
            value={value}
            defaultValue={value}
          />
        )}
      </Box>
    </>
  );
};

SliderThumb.displayName = 'SliderThumb';

export { Slider };

export type { SliderProps, SliderLabelProps, SliderTitleProps };
