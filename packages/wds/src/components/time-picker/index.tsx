import { forwardRef, useEffect, useId, useRef } from 'react';
import { IconClock } from '@wanteddev/wds-icon';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { type DefaultComponentProps } from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';
import dayjs from 'dayjs';

import { TextInput, TextInputContent } from '../text-input';
import IconButton from '../icon-button';
import { Popper, PopperAnchor, PopperContent } from '../popper';
import FlexBox from '../flex-box';
import ScrollArea from '../scroll-area';
import { List, ListCell } from '../list';
import FocusScope from '../focus-scope';
import DismissableLayer from '../dismissable-layer';
import { useDateField } from '../date-picker/hooks';
import { ActionArea, ActionAreaButton } from '../action-area';
import {
  type GetMeridiemResult,
  dayjsTimezone,
} from '../date-calendar/helpers';

import {
  timePickerBottomStyle,
  timePickerContentBoxStyle,
  timePickerListCellStyle,
  timePickerListStyle,
  timePickerScrollAreaStyle,
} from './style';
import { useTimePickerList } from './hooks';
import { TimePickerProvider, useTimePickerContext } from './context';
import {
  TIME_PICKER_BOTTOM_NAME,
  TIME_PICKER_LIST_NAME,
  TIME_PICKER_NAME,
} from './constants';

import type { SlotProps } from '@radix-ui/react-slot';
import type { GetTimeUnitsResult } from './helpers';
import type * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import type { ElementRef } from 'react';
import type {
  TimePickerBottomProps,
  TimePickerInputProps,
  TimePickerListProps,
  TimePickerProps,
} from './types';

const TimePicker = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<TimePickerProps, 'input'>
>(
  (
    {
      value: originValue,
      defaultValue,
      onChange,
      format = 'a hh:mm',
      placeholder = format,
      locale = 'ko-KR',
      timezone,
      disabled = false,
      invalid: originInvalid,
      readOnly,
      input,
      inputRef: originInputRef,
      open: originOpen,
      contentProps,
      defaultOpen,
      onOpenChange,
      ...props
    },
    forwardedRef,
  ) => {
    const id = useId();

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

    const invalid =
      originInvalid ||
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      (!onChange && Boolean(value) && isNaN(new Date(value!).getTime()));

    const composedInputRef = useComposedRefs(originInputRef, inputRef);

    return (
      <TimePickerProvider
        timezone={timezone}
        onOpenChange={setOpen}
        handleValueChange={handleValueChange}
        handleTimeClick={handleTimeClick}
      >
        <Popper>
          {/* @ts-expect-error */}
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
                        setOpen((prev) => !prev);
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
                  disableOutsidePointerEvents
                  onDismiss={() => {
                    handleBlur();
                    setOpen(false);
                  }}
                >
                  <FlexBox sx={timePickerContentBoxStyle}>
                    <FlexBox data-role="time-picker-list-wrapper">
                      {sections.map((section) => (
                        <TimePickerList
                          key={`${id}-${section.index}`}
                          locale={locale}
                          disabled={disabled}
                          {...section}
                        />
                      ))}
                    </FlexBox>
                    <TimePickerBottom />
                  </FlexBox>
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

TimePickerInput.displayName = 'TimePickerInput';

const TimePickerList = forwardRef<
  HTMLUListElement,
  DefaultComponentProps<TimePickerListProps, 'ul'>
>(({ locale, disabled, ...section }, ref) => {
  const { format } = section;

  const id = useId();

  const scrollViewportRef =
    useRef<ElementRef<typeof ScrollAreaPrimitive.Viewport>>(null);

  const values = useTimePickerList({ locale, format });

  const { handleTimeClick } = useTimePickerContext(TIME_PICKER_LIST_NAME);

  useEffect(() => {
    if (!scrollViewportRef.current) return;

    const item = scrollViewportRef.current.querySelector(
      `[data-value="${section.value}"], [data-value="${Number(section.value)}"]`,
    );
    if (item) {
      scrollViewportRef.current.scrollTop = (item as HTMLElement).offsetTop - 8;
    }
  }, [section.value]);

  return (
    <ScrollArea
      viewportRef={scrollViewportRef}
      size="small"
      zIndex={11}
      sx={timePickerScrollAreaStyle}
    >
      <List ref={ref} sx={timePickerListStyle}>
        {section.format === 'a' || section.format === 'A'
          ? (values as GetMeridiemResult).map(({ lower, upper }) => {
              const meridiem = section.format === 'A' ? upper : lower;
              const active = section.value === meridiem;

              return (
                <ListCell
                  key={`${id}-${format}-${meridiem}`}
                  fillWidth
                  padding="8px"
                  active={false}
                  data-value={meridiem}
                  value={meridiem}
                  sx={timePickerListCellStyle({
                    active,
                    disabled,
                  })}
                  onClick={() =>
                    handleTimeClick({
                      ...section,
                      value: meridiem,
                    })
                  }
                >
                  {meridiem}
                </ListCell>
              );
            })
          : (values as GetTimeUnitsResult).map(({ value }) => {
              const stringValue = value.toString();
              const active = Number(section.value) === value;

              return (
                <ListCell
                  key={`${id}-${format}-${value}`}
                  fillWidth
                  padding="8px"
                  active={section.value === stringValue}
                  data-value={value}
                  value={value}
                  sx={timePickerListCellStyle({
                    active,
                    disabled,
                  })}
                  onClick={() =>
                    handleTimeClick({
                      ...section,
                      value: stringValue,
                    })
                  }
                >
                  {stringValue}
                </ListCell>
              );
            })}
      </List>
    </ScrollArea>
  );
});

TimePickerList.displayName = TIME_PICKER_LIST_NAME;

const TimePickerBottom = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<TimePickerBottomProps, 'div'>
>(({ nowText = '현재', submitText = '적용', sx, ...props }, ref) => {
  const { timezone, onOpenChange, handleValueChange } = useTimePickerContext(
    TIME_PICKER_BOTTOM_NAME,
  );

  return (
    <ActionArea
      ref={ref}
      property="compact"
      {...props}
      sx={[timePickerBottomStyle, sx]}
    >
      <ActionAreaButton
        variant="sub"
        textButtonVariant="assistive"
        onClick={() =>
          handleValueChange(dayjsTimezone(dayjs(), timezone).toDate())
        }
      >
        {nowText}
      </ActionAreaButton>
      <ActionAreaButton
        variant="sub"
        textButtonVariant="primary"
        onClick={() => onOpenChange(false)}
      >
        {submitText}
      </ActionAreaButton>
    </ActionArea>
  );
});

TimePickerBottom.displayName = TIME_PICKER_BOTTOM_NAME;

export default TimePicker;
