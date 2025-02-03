import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { IconClock } from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { type DefaultComponentProps } from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';
import dayjs from 'dayjs';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';

import { TextInput, TextInputContent } from '../text-input';
import IconButton from '../icon-button';
import { Popper, PopperAnchor, PopperContent } from '../popper';
import FocusScope from '../focus-scope';
import DismissableLayer from '../dismissable-layer';
import { useDateField } from '../date-picker/hooks';
import { dayjsTimezone } from '../date-calendar/helpers';
import { toFormat } from '../date-picker/helpers';
import TimeView from '../time-view';

import { TIME_PICKER_INPUT_NAME, TIME_PICKER_NAME } from './constants';
import { sectionsToViews } from './helpers';

import type { SlotProps } from '@radix-ui/react-slot';
import type { TimePickerInputProps, TimePickerProps } from './types';
import type { DateType } from '../date-picker';

const TimePicker = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<TimePickerProps, 'input'>
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
      placeholder: givenPlaceholder,
      locale = 'ko-KR',
      timezone,
      minTime,
      maxTime,
      invalid: originInvalid,
      input,
      inputRef: originInputRef,
      hasActionArea,
      actionAreaProps,
      ...props
    },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);

    const [open = false, setOpen] = useControllableState({
      prop: originOpen,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });

    const [value, setValue] = useControllableState({
      prop: originValue,
      defaultProp: defaultValue,
      onChange,
    });

    const {
      loop,
      trapped,
      trappedContent,
      onMountAutoFocus,
      onUnmountAutoFocus,
      position = 'top-start',
      offset,
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

    const views = useMemo(() => sectionsToViews(sections), [sections]);

    const invalid =
      originInvalid ||
      (!onChange && Boolean(value) && isNaN(new Date(value!).getTime()));

    const [placeholder, setPlaceholder] = useState('');

    useEffect(() => {
      setPlaceholder(
        toFormat(
          dayjsTimezone(dayjs().startOf('day'), timezone).toDate(),
          format,
          locale,
          timezone,
        ),
      );
    }, [timezone, format, locale]);

    const handleChangeComplete = useCallbackRef((v: DateType) => {
      setValue(v);
      onChangeComplete?.(v);
      setOpen(false);
    });

    return (
      <Popper>
        <PopperAnchor
          ref={composedRefs}
          onChange={() => {}}
          autoComplete="off"
          type="text"
          inputMode={focusedSection?.type}
          aria-haspopup="dialog"
          aria-expanded={open}
          data-role="time-picker-input"
          {...props}
          {...({
            readOnly,
            disabled,
            placeholder: givenPlaceholder ?? placeholder,
            invalid,
            onFocus: composeEventHandlers(props.onFocus, handleFocus),
            onClick: composeEventHandlers(props.onClick, handleClick),
            onKeyDown: composeEventHandlers(props.onKeyDown, handleKeyDown),
            onBlur: composeEventHandlers(props.onBlur, handleBlur),
            onPaste: composeEventHandlers(props.onPaste, handlePaste),
            value: inputValue,
            inputRef: composedInputRef,
            rightContent: (
              <>
                {props.rightContent}
                <TextInputContent
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
                  >
                    <IconClock />
                  </IconButton>
                </TextInputContent>
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
                  handleBlur();
                  setOpen(false);
                }}
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
                  hasActionArea={hasActionArea}
                  actionAreaProps={actionAreaProps}
                  onChange={(v) => {
                    setValue(v);
                    handleInputValueChange();
                  }}
                  onChangeComplete={handleChangeComplete}
                />
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
  DefaultComponentProps<TimePickerInputProps, 'input'>
>(({ inputRef, ...props }, ref) => (
  <TextInput {...props} ref={inputRef} wrapperRef={ref} />
));

TimePickerInput.displayName = TIME_PICKER_INPUT_NAME;

export { TimePicker };
export type { TimePickerInputProps };
