import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { IconCalendar } from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { composeEventHandlers } from '@radix-ui/primitive';

import { TextField, TextFieldContent } from '../text-field';
import { IconButton } from '../icon-button';
import { DateCalendar } from '../date-calendar';
import { Popper, PopperAnchor, PopperContent } from '../popper';
import { DismissableLayer } from '../dismissable-layer';
import { FocusScope } from '../focus-scope';
import { FlexBox } from '../flex-box';
import { PickerActionAreaProvider } from '../picker-action-area/contexts';
import { extendDayjs } from '../../utils/internal/date';

import { datePopperStyle } from './style';
import { useDateField } from './hooks';

import type { SlotProps } from '@radix-ui/react-slot';
import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { DatePickerFieldProps, DatePickerProps } from './types';
import type { DateType } from '../date-calendar/types';
import type { DateRangeType } from '../date-range-calendar/types';

extendDayjs();

const DatePicker = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<DatePickerProps, 'input'>
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
      locale = 'ko-KR',
      timezone,
      onChangeComplete,
      inputRef: originInputRef,
      yearsOrder,
      input,
      actionArea,
      invalid: originInvalid,
      disableLastUnitClickClose,
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

    const Component = input ?? DatePickerField;

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

    const composedInputRef = useComposedRefs(originInputRef, inputRef);

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
          data-role="date-picker-field"
          role="combobox"
          {...props}
          {...({
            type: 'text',
            autoComplete: 'off',
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
                  data-role="date-picker-calendar-icon"
                  variant="icon-button"
                >
                  <IconButton
                    aria-label="Toggle date picker"
                    disabled={disabled || readOnly}
                    onClick={() => {
                      handleInputValueChange();
                      setOpen((prev) => !prev);
                    }}
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
                onPointerDownOutside={(e) => {
                  if (
                    ref.current?.contains(e.target as HTMLElement) &&
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
                <FlexBox
                  flexDirection="column"
                  data-role="date-picker-wrapper"
                  sx={[datePopperStyle, contentSx]}
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
                    onChange={handleValueChange}
                    readOnly={readOnly}
                    disabled={disabled}
                    yearsOrder={yearsOrder}
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

DatePicker.displayName = 'DatePicker';

const DatePickerField = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<DatePickerFieldProps, 'input'>
>(({ inputRef, ...props }, ref) => (
  <TextField {...props} ref={inputRef} wrapperRef={ref} />
));

DatePickerField.displayName = 'DatePickerField';

export { DatePicker };

export type { DatePickerProps, DatePickerFieldProps, DateType };
