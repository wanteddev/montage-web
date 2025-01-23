import { forwardRef, useMemo, useRef } from 'react';
import { IconClock } from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { type DefaultComponentProps } from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';
import dayjs from 'dayjs';

import { TextInput, TextInputContent } from '../text-input';
import IconButton from '../icon-button';
import { Popper, PopperAnchor, PopperContent } from '../popper';
import FocusScope from '../focus-scope';
import DismissableLayer from '../dismissable-layer';
import { useDateField } from '../date-picker/hooks';
import { dayjsTimezone } from '../date-calendar/helpers';
import { toFormat } from '../date-picker/helpers';
import TimeView from '../time-view';

import { TimePickerProvider } from './context';
import { TIME_PICKER_INPUT_NAME, TIME_PICKER_NAME } from './constants';
import { sectionsToViews } from './helpers';

import type { SlotProps } from '@radix-ui/react-slot';
import type { TimePickerInputProps, TimePickerProps } from './types';

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
      contentProps,
      format = 'a hh:mm',
      viewFormat = 'a h:m',
      placeholder: givenPlaceholder,
      locale = 'ko-KR',
      timezone,
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
      handleTimeClick,
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

    const placeholder = useMemo(
      () =>
        givenPlaceholder ??
        toFormat(
          dayjsTimezone(dayjs().startOf('day'), timezone).toDate(),
          format,
          locale,
          timezone,
        ),
      [givenPlaceholder, format, locale, timezone],
    );

    const invalid =
      originInvalid ||
      (!onChange && Boolean(value) && isNaN(new Date(value!).getTime()));

    const views = useMemo(() => sectionsToViews(sections), [sections]);

    const composedInputRef = useComposedRefs(originInputRef, inputRef);

    return (
      <TimePickerProvider
        timezone={timezone}
        onOpenChange={setOpen}
        handleValueChange={handleValueChange}
        handleTimeClick={handleTimeClick}
      >
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
              placeholder,
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
                  onFocus={(e) => {
                    const item = e.target.querySelector(
                      `[data-role="time-list-scroll-area"]`,
                    );
                    if (item) {
                      (item as HTMLElement).focus();
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
                    onChange={handleValueChange}
                    format={viewFormat}
                    locale={locale}
                    timezone={timezone}
                    readOnly={readOnly}
                    disabled={disabled}
                    hasActionArea={hasActionArea}
                    actionAreaProps={actionAreaProps}
                  />
                </DismissableLayer>
              </FocusScope>
            </PopperContent>
          )}
        </Popper>
      </TimePickerProvider>
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

export default TimePicker;
