import { type DefaultComponentPropsInternal } from '@montage-ui/engine';
import { IconClock } from '@montage-ui/icon';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';

import { extendDayjs } from '../../utils/internal/date';
import { useDateField } from '../date-picker/hooks';
import { DismissableLayer } from '../dismissable-layer';
import { FlexBox } from '../flex-box';
import { FocusScope } from '../focus-scope';
import { FormFieldLayoutProvider } from '../form-control/contexts';
import { useFormFieldSize } from '../form-control/hooks';
import { IconButton } from '../icon-button';
import { PickerActionAreaProvider } from '../picker-action-area/contexts';
import { Popper, PopperAnchor, PopperContent } from '../popper';
import { TextField, TextFieldContent } from '../text-field';
import { TimeView } from '../time-view';

import { TIME_PICKER_FIELD_NAME, TIME_PICKER_NAME } from './constants';
import { sectionsToViews } from './helpers';
import { timePickerStyle } from './style';

import type { DateType } from '../date-picker';
import type { DateRangeType } from '../date-range-calendar/types';
import type {
  TimePickerFieldInternalProps,
  TimePickerFieldProps,
  TimePickerProps,
} from './types';
import type { SlotProps } from '@radix-ui/react-slot';

extendDayjs();

const TimePicker = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<TimePickerProps, 'input'>
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
      onChangeComplete,
      contentProps,
      format = 'a hh:mm',
      placeholder = format,
      locale = 'ko-KR',
      timezone,
      minTime,
      maxTime,
      status: originStatus,
      input,
      inputRef: originInputRef,
      disableLastUnitClickClose,
      actionArea,
      views: originViews,
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
    const ref = useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    // How the latest open was triggered. Opens that skip the toggle button
    // (controlled `open`, `defaultOpen`) behave like a pointer open.
    const openReasonRef = useRef<'pointer' | 'keyboard'>('pointer');

    const [open, setOpen] = useControllableState({
      prop: originOpen,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
    });

    const [value, setValue] = useControllableState({
      prop: originValue,
      defaultProp: defaultValue,
      onChange,
    });

    const initialValue = useRef(value);

    const {
      loop = true,
      trapped,
      trappedContent = true,
      onMountAutoFocus,
      onUnmountAutoFocus,
      position = 'bottom-start',
      disableFocusScope,
      offset,
      sx: contentSx,
      ...otherContentProps
    } = contentProps || {};

    const Component = input ?? TimePickerField;

    const {
      sections,
      inputRef,
      inputValue,
      focusedSection,
      handleBlur,
      handleClick,
      handleFocus,
      handleKeyDown,
      handlePaste,
      handleValueChange,
      handleInputValueChange,
    } = useDateField({
      value,
      format,
      locale,
      timezone,
      setValue,
      readOnly,
      disabled,
    });

    const composedInputRef = useComposedRefs(originInputRef, inputRef);

    const views = useMemo(
      () => originViews ?? sectionsToViews(sections),
      [sections, originViews],
    );

    // 비제어 모드에서 파싱할 수 없는 값이 들어오면 status를 negative로 승격한다.
    const status =
      originStatus === 'negative' ||
      (!onChange && Boolean(value) && isNaN(new Date(value!).getTime()))
        ? 'negative'
        : originStatus;

    const { size: resolvedSize, ...resolvedResponsive } = useFormFieldSize(
      size,
      { xs, sm, md, lg, xl },
    );

    const isCustomInput = Boolean(input);

    const handleChangeCompleteCallback = useCallbackRef(onChangeComplete);

    const handleChangeComplete = useCallback(
      (v: DateType) => {
        handleValueChange(v);
        handleChangeCompleteCallback(v);

        if (!disableLastUnitClickClose) {
          setOpen(false);
        }
      },
      [
        handleValueChange,
        handleChangeCompleteCallback,
        disableLastUnitClickClose,
        setOpen,
      ],
    );

    const handleChangeCompleteActionArea = useCallback(
      (v: DateType | DateRangeType) => {
        handleChangeComplete(v as DateType);
        setOpen(false);
      },
      [handleChangeComplete, setOpen],
    );

    useEffect(() => {
      if (open) {
        initialValue.current = value;
      } else {
        handleBlur();
      }
      // oxlint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
      <Popper>
        {/* Keeps the calendar IconButton sized to the field even with a custom `input`. */}
        <FormFieldLayoutProvider
          size={resolvedSize}
          responsive={resolvedResponsive}
        >
          <PopperAnchor
            ref={composedRefs}
            onChange={() => {}}
            inputMode={focusedSection?.type}
            aria-haspopup="dialog"
            aria-expanded={open}
            role="combobox"
            {...props}
            data-role="time-picker-field"
            {...({
              // Raw responsive props reach a custom `input` as in 3.x (and as
              // DateRangePicker does); the default field gets the resolved
              // ones below.
              xs,
              sm,
              md,
              lg,
              xl,
              autoComplete: 'off',
              type: 'text',
              readOnly,
              disabled,
              placeholder,
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
                    status,
                    size: resolvedSize,
                    ...resolvedResponsive,
                  }),
              trailingContent: (
                <>
                  {props.trailingContent}
                  <TextFieldContent
                    data-role="time-picker-clock-icon"
                    variant="icon-button"
                  >
                    <IconButton
                      disabled={disabled || readOnly}
                      onClick={(e) => {
                        // Record only opens; a close must not leak its input
                        // into a later open that skips this button. Enter /
                        // Space on a button dispatches a click without detail.
                        if (!open) {
                          openReasonRef.current =
                            e.detail === 0 ? 'keyboard' : 'pointer';
                        }
                        handleInputValueChange();
                        setOpen(!open);
                      }}
                      aria-label="Toggle time picker"
                    >
                      <IconClock />
                    </IconButton>
                  </TextFieldContent>
                </>
              ),
            } as unknown as SlotProps)}
          >
            <Component />
          </PopperAnchor>
        </FormFieldLayoutProvider>

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
              onMountAutoFocus={composeEventHandlers(
                onMountAutoFocus,
                (e) => {
                  // The reason belongs to this open only.
                  const openReason = openReasonRef.current;
                  openReasonRef.current = 'pointer';

                  if (e.defaultPrevented || openReason === 'keyboard') return;

                  const container = e.currentTarget as HTMLElement;
                  const viewport = container.querySelector<HTMLElement>(
                    '[data-role="time-list-scroll-area"] [data-radix-scroll-area-viewport]',
                  );

                  // With a value, the first list hands focus to its selected
                  // item as before.
                  if (
                    !viewport ||
                    viewport.querySelector(
                      '[role="option"][aria-selected="true"]',
                    )
                  ) {
                    return;
                  }

                  // Opened by pointer with nothing selected: focus the list
                  // without landing on an item, so the first arrow key press
                  // reaches the first item instead of skipping it.
                  e.preventDefault();
                  viewport.focus({ preventScroll: true });
                },
                // Runs even when the consumer prevented the autofocus, so the
                // reason is still reset.
                { checkForDefaultPrevented: false },
              )}
              onUnmountAutoFocus={onUnmountAutoFocus}
              disableFocusScope={disableFocusScope}
            >
              <DismissableLayer
                asChild
                disableOutsidePointerEvents
                onDismiss={() => {
                  setOpen(false);
                }}
              >
                <FlexBox
                  flexDirection="column"
                  data-role="time-picker-wrapper"
                  sx={[timePickerStyle, contentSx]}
                >
                  <TimeView
                    value={value}
                    defaultValue={defaultValue}
                    views={views}
                    minTime={minTime}
                    maxTime={maxTime}
                    locale={locale}
                    timezone={timezone}
                    readOnly={readOnly}
                    disabled={disabled}
                    onChange={handleValueChange}
                    onChangeComplete={handleChangeComplete}
                  />

                  <PickerActionAreaProvider
                    timezone={timezone}
                    value={value}
                    initialValue={initialValue}
                    onChangeComplete={handleChangeCompleteActionArea}
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

TimePicker.displayName = TIME_PICKER_NAME;

const TimePickerField = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<TimePickerFieldInternalProps, 'input'>
>(({ inputRef, ...props }, ref) => (
  <TextField {...props} ref={inputRef} wrapperRef={ref} />
));

TimePickerField.displayName = TIME_PICKER_FIELD_NAME;

export { TimePicker };

export type { TimePickerFieldProps, TimePickerProps };
