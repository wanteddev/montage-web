import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import { IconClock } from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { type DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';

import { TextField, TextFieldContent } from '../text-field';
import { IconButton } from '../icon-button';
import { Popper, PopperAnchor, PopperContent } from '../popper';
import { FocusScope } from '../focus-scope';
import { DismissableLayer } from '../dismissable-layer';
import { useDateField } from '../date-picker/hooks';
import { TimeView } from '../time-view';
import { FlexBox } from '../flex-box';
import { PickerActionAreaProvider } from '../picker-action-area/contexts';
import { extendDayjs } from '../../utils/internal/date';

import { TIME_PICKER_INPUT_NAME, TIME_PICKER_NAME } from './constants';
import { sectionsToViews } from './helpers';
import { timePickerStyle } from './style';

import type { SlotProps } from '@radix-ui/react-slot';
import type { TimePickerFieldProps, TimePickerProps } from './types';
import type { DateType } from '../date-picker';
import type { DateRangeType } from '../date-range-calendar/types';

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
      invalid: originInvalid,
      input,
      inputRef: originInputRef,
      disableLastUnitClickClose,
      actionArea,
      views: originViews,
      ...props
    },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);

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

    const Component = input ?? TimePickerInput;

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

    const invalid =
      originInvalid ||
      (!onChange && Boolean(value) && isNaN(new Date(value!).getTime()));

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
      <Popper>
        <PopperAnchor
          ref={composedRefs}
          onChange={() => {}}
          inputMode={focusedSection?.type}
          aria-haspopup="dialog"
          aria-expanded={open}
          data-role="time-picker-field"
          role="combobox"
          {...({
            ...props,
            autoComplete: 'off',
            type: 'text',
            readOnly,
            disabled,
            placeholder,
            invalid,
            onFocus: composeEventHandlers(props.onFocus, handleFocus),
            onClick: composeEventHandlers(props.onClick, handleClick),
            onKeyDown: composeEventHandlers(props.onKeyDown, handleKeyDown),
            onBlur: composeEventHandlers(props.onBlur, handleBlur),
            onPaste: composeEventHandlers(props.onPaste, handlePaste),
            value: inputValue,
            inputRef: composedInputRef,
            trailingContent: (
              <>
                {props.trailingContent}
                <TextFieldContent
                  data-role="time-picker-clock-icon"
                  variant="icon-button"
                >
                  <IconButton
                    size={22}
                    disabled={disabled || readOnly}
                    onClick={() => {
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
                onPointerDownOutside={(e) => {
                  if (
                    ref.current?.contains(e.target as HTMLElement) &&
                    (e.target as HTMLElement).closest(
                      '[data-role="time-picker-clock-icon"]',
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

const TimePickerInput = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<TimePickerFieldProps, 'input'>
>(({ inputRef, ...props }, ref) => (
  <TextField {...props} ref={inputRef} wrapperRef={ref} />
));

TimePickerInput.displayName = TIME_PICKER_INPUT_NAME;

export { TimePicker };

export type { TimePickerFieldProps, TimePickerProps };
