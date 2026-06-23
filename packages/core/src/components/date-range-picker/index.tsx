import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { IconCalendar } from '@montage-ui/icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { composeEventHandlers } from '@radix-ui/primitive';

import { TextField, TextFieldContent } from '../text-field';
import { IconButton } from '../icon-button';
import { DateRangeCalendar } from '../date-range-calendar';
import { Popper, PopperAnchor, PopperContent } from '../popper';
import { DismissableLayer } from '../dismissable-layer';
import { FocusScope } from '../focus-scope';
import { FlexBox } from '../flex-box';
import { extendDayjs } from '../../utils/internal/date';
import {
  mapResponsiveProps,
  mergeResponsiveProps,
  splitResponsiveBreakpoints,
} from '../../utils/internal/responsive-props';
import { DEFAULT_RANGE_VALUE } from '../date-range-calendar/constants';
import { PickerActionAreaProvider } from '../picker-action-area/contexts';
import { useFormControlLayoutContext } from '../form-control/contexts';

import { isInvalidDateRange } from './helpers';
import { dateRangePopperStyle } from './style';
import { useDateRangeField } from './hooks';

import type { SlotProps } from '@radix-ui/react-slot';
import type { DefaultComponentPropsInternal } from '@montage-ui/engine';
import type {
  DateRangePickerFieldInternalProps,
  DateRangePickerFieldProps,
  DateRangePickerProps,
} from './types';
import type { DateType } from '../date-calendar/types';
import type { DateRangeType } from '../date-range-calendar/types';

extendDayjs();

const DateRangePicker = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<DateRangePickerProps, 'input'>
>(
  (
    {
      disabled,
      readOnly,
      value: originValue,
      defaultValue,
      onChange,
      defaultOpen,
      open: originOpen,
      onOpenChange,
      view,
      contentProps,
      format = 'YYYY.MM.DD',
      placeholder,
      min,
      max,
      locale = 'ko-KR',
      timezone,
      onChangeComplete,
      inputRef: originInputRef,
      yearsOrder,
      input,
      actionArea,
      invalid: originInvalid,
      disableLastDateClickClose,
      calendars,
      size,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    forwardedRef,
  ) => {
    const { picked: responsiveCalendars, rest: responsiveRest } =
      splitResponsiveBreakpoints({ xs, sm, md, lg, xl }, ['calendars']);

    const ref = useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);

    const [open, setOpen] = useControllableState({
      prop: originOpen,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
    });

    const [value, setValue] = useControllableState<DateRangeType>({
      prop: originValue,
      defaultProp: defaultValue ?? DEFAULT_RANGE_VALUE,
      onChange: onChange,
    });

    const initialValue = useRef(value);

    const {
      loop = true,
      trapped,
      trappedContent = true,
      disableFocusScope,
      onMountAutoFocus,
      onUnmountAutoFocus,
      position = 'bottom-start',
      offset = 8,
      sx: contentSx,
      ...otherContentProps
    } = contentProps || {};

    const Component = input ?? DateRangePickerField;

    const {
      inputRef,
      inputValue,
      focusedSection,
      handlePaste,
      handleFocus,
      handleClick,
      handleBlur,
      handleKeyDown,
      handleValueChange,
      handleInputValueChange,
    } = useDateRangeField({
      value,
      format,
      locale,
      timezone,
      setValue,
      readOnly,
      disabled,
    });

    const invalid = originInvalid || (!onChange && isInvalidDateRange(value));

    const { size: formControlSize, responsive } =
      useFormControlLayoutContext() || {};

    const resolvedSize = size ?? formControlSize ?? 'large';

    const isCustomInput = Boolean(input);

    const {
      xs: resolvedXs,
      sm: resolvedSm,
      md: resolvedMd,
      lg: resolvedLg,
      xl: resolvedXl,
    } = mergeResponsiveProps(responsiveRest ?? {}, responsive, 'size');

    const handleChangeCompleteCallback = useCallbackRef(onChangeComplete);

    const handleChangeComplete = useCallback(
      (v: DateRangeType) => {
        handleValueChange(v);
        handleChangeCompleteCallback(v);

        if (!disableLastDateClickClose) {
          setOpen(false);
        }
      },
      [
        handleValueChange,
        handleChangeCompleteCallback,
        disableLastDateClickClose,
        setOpen,
      ],
    );

    const handleChangeCompleteActionArea = useCallback(
      (v: DateRangeType | DateType) => {
        handleChangeComplete(v as DateRangeType);
        setOpen(false);
      },
      [handleChangeComplete, setOpen],
    );

    const composedInputRef = useComposedRefs(originInputRef, inputRef);

    const resolvedPlaceholder = placeholder ?? `${format} - ${format}`;

    useEffect(() => {
      if (open) {
        initialValue.current = value;
      } else {
        handleBlur();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
      <Popper>
        <PopperAnchor
          ref={composedRefs}
          onChange={() => {}}
          aria-haspopup="dialog"
          aria-expanded={open}
          data-role="date-range-picker-field"
          role="combobox"
          {...props}
          {...({
            ...responsiveRest,
            type: 'text',
            autoComplete: 'off',
            readOnly,
            disabled,
            placeholder: resolvedPlaceholder,
            inputMode: focusedSection?.type,
            onFocus: composeEventHandlers(props.onFocus, handleFocus),
            onClick: composeEventHandlers(props.onClick, handleClick),
            onKeyDown: composeEventHandlers(props.onKeyDown, handleKeyDown),
            onBlur: composeEventHandlers(props.onBlur, handleBlur),
            onPaste: composeEventHandlers(props.onPaste, handlePaste),
            value: inputValue,
            inputRef: composedInputRef,
            ...(isCustomInput
              ? {}
              : {
                  invalid,
                  size: resolvedSize,
                  xs: resolvedXs,
                  sm: resolvedSm,
                  md: resolvedMd,
                  lg: resolvedLg,
                  xl: resolvedXl,
                }),
            trailingContent: (
              <>
                {props.trailingContent}
                <TextFieldContent
                  data-role="date-range-picker-calendar-icon"
                  variant="icon-button"
                >
                  <IconButton
                    aria-label="Toggle date range picker"
                    disabled={disabled || readOnly}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInputValueChange();
                      setOpen((prev) => !prev);
                    }}
                    size={size === 'medium' ? 28 : 32}
                    {...mapResponsiveProps(
                      { xs, sm, md, lg, xl },
                      'size',
                      (s) => {
                        switch (s) {
                          case 'large':
                            return 32;
                          case 'medium':
                            return 28;
                        }
                      },
                    )}
                  >
                    <IconCalendar />
                  </IconButton>
                </TextFieldContent>
              </>
            ),
          } as unknown as SlotProps)}
        >
          <Component />
        </PopperAnchor>

        {open && (
          <PopperContent
            role="dialog"
            {...otherContentProps}
            position={position}
            offset={offset}
          >
            <FocusScope
              loop={loop}
              trapped={trapped}
              trappedContent={trappedContent}
              onMountAutoFocus={onMountAutoFocus}
              onUnmountAutoFocus={onUnmountAutoFocus}
              disableFocusScope={disableFocusScope}
            >
              <DismissableLayer
                asChild
                disableOutsidePointerEvents
                onPointerDownOutside={(e) => {
                  if (
                    ref.current?.contains(e.target as HTMLElement) &&
                    (e.target as HTMLElement).closest(
                      '[data-role="date-range-picker-calendar-icon"]',
                    )
                  ) {
                    e.preventDefault();
                  }
                }}
                onDismiss={() => {
                  setOpen(false);
                }}
              >
                <FlexBox
                  flexDirection="column"
                  data-role="date-range-picker-wrapper"
                  sx={[dateRangePopperStyle, contentSx]}
                >
                  <DateRangeCalendar
                    min={min}
                    max={max}
                    timezone={timezone}
                    locale={locale}
                    onChangeComplete={handleChangeComplete}
                    view={view}
                    value={value}
                    onChange={handleValueChange}
                    readOnly={readOnly}
                    disabled={disabled}
                    yearsOrder={yearsOrder}
                    calendars={calendars}
                    {...responsiveCalendars}
                  />

                  <PickerActionAreaProvider
                    timezone={timezone}
                    value={value}
                    initialValue={initialValue}
                    onChangeComplete={handleChangeCompleteActionArea}
                    mode="range"
                  >
                    {actionArea}
                  </PickerActionAreaProvider>
                </FlexBox>
              </DismissableLayer>
            </FocusScope>
          </PopperContent>
        )}
      </Popper>
    );
  },
);

DateRangePicker.displayName = 'DateRangePicker';

const DateRangePickerField = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<DateRangePickerFieldInternalProps, 'input'>
>(({ inputRef, ...props }, ref) => (
  <TextField {...props} ref={inputRef} wrapperRef={ref} />
));

DateRangePickerField.displayName = 'DateRangePickerField';

export { DateRangePicker };

export type { DateRangePickerProps, DateRangePickerFieldProps };
