import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IconClock } from '@wanteddev/wds-icon';
import dayjs from 'dayjs';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localeData from 'dayjs/plugin/localeData';
import { Box, type DefaultComponentProps } from '@wanteddev/wds-engine';

import { TextInput, TextInputContent } from '../text-input';
import IconButton from '../icon-button';
import { Popper, PopperAnchor, PopperContent } from '../popper';
import FlexBox from '../flex-box';
import ScrollArea from '../scroll-area';
import { List, ListCell } from '../list';
import FocusScope from '../focus-scope';
import DismissableLayer from '../dismissable-layer';

import {
  ARROW_DOWN_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  ARROW_UP_KEY,
  SECTION_TO_TYPE_MAP,
  TIME_PICKER_CONTENT_NAME,
  TIME_PICKER_INPUT_NAME,
  TIME_PICKER_ITEM_NAME,
  TIME_PICKER_LIST_NAME,
  TIME_PICKER_NAME,
  TYPE_TO_SECTION_MAP,
  maxMinutes,
} from './constants';
import * as helpers from './helpers';
import {
  timePickerContentBoxStyle,
  timePickerInputStyle,
  timePickerListCellStyle,
  timePickerListStyle,
  timePickerScrollAreaStyle,
} from './style';
import { TimePickerProvider, useTimePickerContext } from './context';
import useTimePicker from './hooks';

import type * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import type { Dayjs } from 'dayjs';
import type { ElementRef, KeyboardEvent } from 'react';
import type {
  TimePickerInputProps,
  TimePickerItemProps,
  TimePickerListProps,
  TimePickerProps,
  TimePickerValue,
  TimeSection,
} from './types';

import 'dayjs/locale/ko';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.locale('ko');

export const DAYJS_AM_TEXT = dayjs.localeData().meridiem(0, 0, false); // 오전
export const DAYJS_PM_TEXT = dayjs.localeData().meridiem(13, 0, false); // 오후

const TimePicker = ({
  defaultValue = null,
  value: givenValue,
  open: originOpen,
  defaultOpen,
  format = 'a hh:mm',
  hourFormat = '12',
  disabled = false,
  onChange,
  onOpenChange,
}: TimePickerProps) => {
  const [open = false, setOpen] = useControllableState({
    prop: originOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const [value = defaultValue, setValue] =
    useControllableState<TimePickerValue>({
      prop: givenValue,
      defaultProp: defaultValue,
      onChange,
    });

  const [item, setItem] = useState<HTMLInputElement | null>(null);

  const [inputValue, setInputValue] = useState<string>('');

  const [targetSection, setTargetSection] = useState<TimeSection | null>(null);

  const isEmptyInputValue = useMemo(
    () => value === null && inputValue.length === 0,
    [value, inputValue],
  );
  const isNotSelectedTime = useMemo(
    () => isEmptyInputValue || inputValue === format,
    [isEmptyInputValue, inputValue, format],
  );

  const { setSection, setInputValueAndSection } = useTimePicker({
    format,
    hourFormat,
    item,
    targetSection,
    inputValue,
    setValue,
    setInputValue,
    setTargetSection,
  });

  return (
    <TimePickerProvider
      format={format}
      hourFormat={hourFormat}
      item={item}
      value={value}
      targetSection={targetSection}
      inputValue={inputValue}
      isNotSelectedTime={isNotSelectedTime}
      open={open}
      onOpenChange={setOpen}
      setInputValue={setInputValue}
      setTargetSection={setTargetSection}
      setInputValueAndSection={setInputValueAndSection}
      setSection={setSection}
    >
      <Popper>
        <PopperAnchor>
          <Box>
            <TimePickerInput
              value={value}
              format={format}
              hourFormat={hourFormat}
              disabled={disabled}
              isEmptyInputValue={isEmptyInputValue}
              setValue={setValue}
              setItem={setItem}
            />
          </Box>
        </PopperAnchor>
        {open ? <TimePickerContent /> : null}
      </Popper>
    </TimePickerProvider>
  );
};

TimePicker.displayName = TIME_PICKER_NAME;

const TimePickerInput = forwardRef<
  HTMLInputElement,
  DefaultComponentProps<TimePickerInputProps, 'input'>
>(
  (
    {
      format,
      hourFormat,
      disabled,
      value,
      isEmptyInputValue,
      setItem,
      setValue,
      sx,
    },
    ref,
  ) => {
    const composedRefs = useComposedRefs(ref, (node) => setItem(node));

    const {
      item,
      open,
      inputValue,
      setInputValue,
      isNotSelectedTime,
      setSection,
      setInputValueAndSection,
      targetSection,
      setTargetSection,
      onOpenChange,
    } = useTimePickerContext(TIME_PICKER_INPUT_NAME);

    const handlePointerDown = () => {
      if (!item) return;

      let cursorPosition: number;

      requestAnimationFrame(() => {
        if (isEmptyInputValue) {
          cursorPosition = 0;
          item.value = format;
        } else {
          cursorPosition = item.selectionStart ?? 0;
        }

        const sections = helpers.parseTimeSections({
          format,
          inputValue: item.value,
        });
        const clickedSection = sections.find(
          (section) =>
            cursorPosition >= section.start && cursorPosition <= section.end,
        );

        if (clickedSection) {
          setTargetSection(clickedSection);
          item.setSelectionRange(clickedSection.start, clickedSection.end);

          if (isEmptyInputValue) {
            setInputValue(format);
          }
        }
      });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (disabled || !targetSection || !item) return;
      if (e.key === 'Tab' || e.key === 'Enter') return;

      e.preventDefault();

      if (e.key === 'Backspace') {
        const formatValue = TYPE_TO_SECTION_MAP[targetSection.type];

        if (formatValue === targetSection.value) return;

        setInputValueAndSection(formatValue, 'current');

        return;
      }

      if (e.key === ARROW_LEFT_KEY || e.key === ARROW_RIGHT_KEY) {
        setSection(e.key === ARROW_LEFT_KEY ? 'prev' : 'next');
        return;
      }

      if (targetSection.type === 'ampm') {
        const lowerKey = e.key.toLowerCase();

        if (['a', 'p'].includes(lowerKey)) {
          const ampmText = lowerKey === 'a' ? DAYJS_AM_TEXT : DAYJS_PM_TEXT;
          setInputValueAndSection(ampmText, 'next');
        }
        return;
      }

      const isValidSection = ['hour', 'minute', 'second'].includes(
        targetSection.type,
      );
      const isValidKey =
        /^[0-9]$/.test(e.key) ||
        e.key === ARROW_UP_KEY ||
        e.key === ARROW_DOWN_KEY;

      if (!isValidKey || !isValidSection) return;

      const [unitValue, isUnitSectionFilled] = helpers.getTimeUnit({
        section: targetSection,
        unitKey: e.key,
        hourFormat: targetSection.type === 'hour' ? hourFormat : undefined,
      });

      setInputValueAndSection(
        unitValue,
        isUnitSectionFilled ? 'next' : 'current',
      );
    };

    return (
      <PopperAnchor>
        <TextInput
          ref={composedRefs}
          width="100%"
          value={inputValue}
          disabled={disabled}
          placeholder={dayjs().startOf('day').format(format)}
          invalid={
            value
              ? !value.isValid()
              : inputValue.length > 0 && inputValue !== format
          }
          rightContent={
            <TextInputContent variant="icon-button">
              <IconButton
                type="button"
                size={22}
                disabled={disabled}
                onClick={() => {
                  if (item && isNotSelectedTime) {
                    item.value = format;
                    setInputValue(format);
                  }
                  onOpenChange(!open);
                }}
              >
                <IconClock />
              </IconButton>
            </TextInputContent>
          }
          sx={[timePickerInputStyle, sx]}
          onPointerDown={handlePointerDown}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (isNotSelectedTime) {
              setInputValue('');
            }
          }}
          onReset={() => {
            if (!item) return;

            const sections = helpers.parseTimeSections({
              format,
              inputValue: format,
            });
            const defaultSection = sections.find(
              (section) => section.start === 0,
            );

            if (defaultSection) {
              item.value = format;
              item.setSelectionRange(defaultSection.start, defaultSection.end);

              setValue(null);
              setInputValue(format);
              setTargetSection(defaultSection);
            }
          }}
          onChange={() => {}}
        />
      </PopperAnchor>
    );
  },
);

TimePickerInput.displayName = TIME_PICKER_INPUT_NAME;

const TimePickerContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<{}, 'div'>
>((props, ref) => {
  const { format, onOpenChange } = useTimePickerContext(
    TIME_PICKER_CONTENT_NAME,
  );
  const formatSections = helpers.getFormatSections(format);

  return (
    <PopperContent ref={ref} position="top-start" {...props}>
      <FocusScope loop trapped>
        <DismissableLayer
          asChild
          disableOutsidePointerEvents
          onDismiss={() => {
            onOpenChange(false);
          }}
        >
          <Box sx={timePickerContentBoxStyle}>
            <FlexBox data-role="time-picker-list-wrapper">
              {formatSections.map((formatSection) => (
                <TimePickerList
                  key={formatSection}
                  type={
                    SECTION_TO_TYPE_MAP[formatSection] as TimeSection['type']
                  }
                />
              ))}
            </FlexBox>
            {/* <ActionArea sticky divider priority="neutral">
          <ActionAreaButton variant="sub" textButtonVariant="assistive">
            현재
          </ActionAreaButton>
          <ActionAreaButton variant="sub" textButtonVariant="primary">
            적용
          </ActionAreaButton>
        </ActionArea> */}
          </Box>
        </DismissableLayer>
      </FocusScope>
    </PopperContent>
  );
});

TimePickerContent.displayName = TIME_PICKER_CONTENT_NAME;

const TIME_UNIT_INTERVAL = 5;
const ampmList = [
  {
    text: DAYJS_AM_TEXT,
    value: 'a',
  },
  {
    text: DAYJS_PM_TEXT,
    value: 'p',
  },
] as const;
const minutes = helpers.getTimeUnitList(0, maxMinutes, TIME_UNIT_INTERVAL);
const seconds = helpers.getTimeUnitList(0, maxMinutes, TIME_UNIT_INTERVAL);

const TimePickerList = forwardRef<
  HTMLUListElement,
  DefaultComponentProps<TimePickerListProps, 'ul'>
>(({ type, sx, ...props }, ref) => {
  const id = useId();

  const { open } = useTimePickerContext(TIME_PICKER_LIST_NAME);

  const scrollViewportRef =
    useRef<ElementRef<typeof ScrollAreaPrimitive.Viewport>>(null);

  const { format, hourFormat, inputValue, setInputValue } =
    useTimePickerContext(TIME_PICKER_LIST_NAME);

  const hours = useMemo(() => helpers.getHoursList(hourFormat), [hourFormat]);

  const timeUnitValues = useMemo(
    () => (type === 'minute' ? minutes : type === 'hour' ? hours : seconds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hours],
  );

  const section = useMemo(() => {
    return helpers.getSection({
      type: 'current',
      format,
      inputValue,
      sectionType: type,
      status: 'update',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    if (!scrollViewportRef.current || !open) return;

    const item = scrollViewportRef.current.querySelector(
      `[data-value="${Number(section?.value)}"]`,
    );

    if (item) {
      scrollViewportRef.current.scrollTop = (item as HTMLElement).offsetTop - 8;
    }
  }, [open, section?.value]);

  const updateTime = useCallback(
    (value: string, defaultTime: Dayjs) => {
      if (type === 'ampm') {
        const currentAmpm = defaultTime.format('A');

        if (value === 'a') {
          defaultTime =
            currentAmpm === DAYJS_AM_TEXT
              ? defaultTime
              : defaultTime.subtract(12, 'hour');
        } else {
          defaultTime =
            currentAmpm === DAYJS_PM_TEXT
              ? defaultTime
              : defaultTime.add(12, 'hour');
        }
      } else {
        defaultTime = defaultTime.set(type, Number(value));
      }

      setInputValue(defaultTime.format(format));
    },
    [format, setInputValue, type],
  );

  return (
    <ScrollArea
      size="small"
      viewportRef={scrollViewportRef}
      // viewportProps={{
      //   sx: {
      //     scrollBehavior: '',
      //   },
      // }}
      zIndex={11}
      sx={timePickerScrollAreaStyle}
    >
      <List ref={ref} {...props} sx={[timePickerListStyle, sx]}>
        {type === 'ampm'
          ? ampmList.map((ampm) => (
              <TimePickerItem
                key={`${id}-${type}-${ampm.value}`}
                type={type}
                value={ampm.value}
                active={section?.value === ampm.value}
                updateTime={updateTime}
              >
                {ampm.text}
              </TimePickerItem>
            ))
          : timeUnitValues.map((value) => (
              <TimePickerItem
                key={`${id}-${type}-${value}`}
                type={type}
                value={value.toString()}
                active={Number(section?.value) === value}
                updateTime={updateTime}
              >
                {value.toString()}
              </TimePickerItem>
            ))}
      </List>
    </ScrollArea>
  );
});

TimePickerList.displayName = TIME_PICKER_LIST_NAME;

const TimePickerItem = memo(
  forwardRef<HTMLLIElement, DefaultComponentProps<TimePickerItemProps, 'li'>>(
    ({ value, active, disabled = false, updateTime, children }, ref) => {
      const { isNotSelectedTime, value: timeValue } = useTimePickerContext(
        TIME_PICKER_ITEM_NAME,
      );

      return (
        <ListCell
          ref={ref}
          fillWidth
          active={active}
          data-value={value}
          sx={timePickerListCellStyle({ active, disabled })}
          onClick={(e) => {
            if (isNotSelectedTime) {
              e.preventDefault();
              e.stopPropagation();

              updateTime(value, dayjs().startOf('day'));

              return;
            }
            if (timeValue) {
              updateTime(value, timeValue.clone());
            }
          }}
        >
          {children}
        </ListCell>
      );
    },
  ),
);

TimePickerItem.displayName = TIME_PICKER_ITEM_NAME;

export default TimePicker;
