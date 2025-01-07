import { forwardRef, useRef } from 'react';
import { IconCalendar } from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { composeEventHandlers } from '@radix-ui/primitive';

import { TextInput, TextInputContent } from '../text-input';
import IconButton from '../icon-button';
import DateCalendar from '../date-calendar';
import { Popper, PopperAnchor, PopperContent } from '../popper';
import DismissableLayer from '../dismissable-layer';
import FocusScope from '../focus-scope';

import { datePopperStyle } from './style';
import { useDateField } from './hooks';

import type { SlotProps } from '@radix-ui/react-slot';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { DateInputProps, DatePickerProps } from './types';
import type { DateType } from '../date-calendar/types';

const DatePicker = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<DatePickerProps, 'input'>
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
      defaultView,
      view,
      views,
      onViewChange,
      contentProps,
      format = 'YYYY.MM.DD',
      placeholder = format,
      min,
      max,
      locale,
      timezone,
      onChangeComplete,
      inputRef: givenInputRef,
      input,
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
      onChange: onChange,
    });

    const {
      loop,
      trapped,
      trappedContent,
      onMountAutoFocus,
      onUnmountAutoFocus,
      position = 'top-start',
      offset = 8,
      ...otherContentProps
    } = contentProps || {};

    const Component = input ?? DateInput;

    const {
      inputRef,
      inputValue,
      focusedSection,
      handleBlur,
      handleClick,
      handleFocus,
      handleKeyDown,
      handlePaste,
      handleValueChange,
    } = useDateField({
      value,
      format,
      locale,
      timezone,
      setValue,
    });

    const handleChangeComplete = useCallbackRef((v: DateType) => {
      handleValueChange(v);
      onChangeComplete?.(v);
      setOpen(false);
    });

    const composedInputRef = useComposedRefs(givenInputRef, inputRef);

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
          data-role="date-picker-input"
          {...props}
          {...({
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
            rightContent: (
              <>
                {props.rightContent}
                <TextInputContent
                  data-role="date-picker-calendar-icon"
                  variant="icon-button"
                >
                  <IconButton
                    disabled={disabled}
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    <IconCalendar />
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
            sx={[datePopperStyle, otherContentProps.sx]}
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
                    (e.target as HTMLElement).closest(
                      '[data-role="date-picker-calendar-icon"]',
                    )
                  ) {
                    e.preventDefault();
                  }
                }}
                onDismiss={() => {
                  setOpen(false);
                }}
              >
                <DateCalendar
                  min={min}
                  max={max}
                  timezone={timezone}
                  locale={locale}
                  onChangeComplete={handleChangeComplete}
                  view={view}
                  defaultView={defaultView}
                  onViewChange={onViewChange}
                  views={views}
                  value={value}
                  onChange={setValue}
                />
              </DismissableLayer>
            </FocusScope>
          </PopperContent>
        )}
      </Popper>
    );
  },
);

DatePicker.displayName = 'DatePicker';

const DateInput = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<DateInputProps, 'input'>
>(({ inputRef, ...props }, ref) => (
  <TextInput {...props} ref={inputRef} wrapperRef={ref} />
));

DateInput.displayName = 'DateInput';

export default DatePicker;
