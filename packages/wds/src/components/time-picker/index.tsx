import { forwardRef, useState } from 'react';
import { IconClock } from '@wanteddev/wds-icon';
import dayjs from 'dayjs';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localeData from 'dayjs/plugin/localeData';

import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { TextInput, TextInputContent } from '../text-input';
import IconButton from '../icon-button';

import { TIME_PICKER_INPUT_NAME, TIME_PICKER_NAME } from './constants';
import { parseTimeSections } from './helpers';
import { timePickerInputStyle } from './style';

import type { FocusEvent, KeyboardEvent, MouseEvent } from 'react';
import type {
  TimePickerInputProps,
  TimePickerProps,
  TimePickerValue,
  TimeSection,
} from './types';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import 'dayjs/locale/ko';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.locale('ko');

const DAYJS_AM_TEXT = dayjs.localeData().meridiem(0, 0, false);
const DAYJS_PM_TEXT = dayjs.localeData().meridiem(13, 0, false);

const TimePicker = ({
  defaultValue = null,
  value: givenValue,
  format = 'a hh:mm',
  disabled = false,
  onChange,
  // ...props
}: TimePickerProps) => {
  const [value = defaultValue, setValue] =
    useControllableState<TimePickerValue>({
      prop: givenValue,
      defaultProp: defaultValue,
      onChange,
    });

  return (
    <Popover>
      <TimePickerInput
        timeValue={value}
        format={format}
        disabled={disabled}
        setValue={setValue}
      />
      <PopoverContent>타임피커 리스트</PopoverContent>
    </Popover>
  );
};

TimePicker.displayName = TIME_PICKER_NAME;

const TimePickerInput = forwardRef<
  HTMLInputElement,
  DefaultComponentProps<TimePickerInputProps, 'input'>
>(({ format, disabled, timeValue, sx, setValue, ...props }, ref) => {
  const is24HourFormat = format.includes('H');
  const [item, setItem] = useState<HTMLInputElement | null>(null);
  const composedRefs = useComposedRefs(ref, (node) => setItem(node));

  const [selectedTimeSection, setSelectedTimeSection] =
    useState<TimeSection | null>(null);

  const [inputValue, setInputValue] = useState<string>('');

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (timeValue === null && e.currentTarget.value === '') {
      e.currentTarget.value = format;
      setInputValue(format);
    }

    const cursorPosition = e.currentTarget.selectionStart || 0;
    const sections = parseTimeSections({
      format,
      timeValue,
      inputValue: e.currentTarget.value,
    });

    const clickedSection = sections.find(
      (section) =>
        cursorPosition >= section.start && cursorPosition <= section.end,
    );

    if (clickedSection) {
      setSelectedTimeSection(clickedSection);
      e.currentTarget.setSelectionRange(
        clickedSection.start,
        clickedSection.end,
      );
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!selectedTimeSection || disabled) return;
    e.preventDefault();

    if (selectedTimeSection.type === 'ampm') {
      const key = e.key.toLowerCase();
      const targetInputValue = e.currentTarget.value;

      if (key === 'a' || key === 'p') {
        const ampmText = key === 'a' ? DAYJS_AM_TEXT : DAYJS_PM_TEXT;
        const newInputValue =
          ampmText + targetInputValue.slice(selectedTimeSection.end);

        e.currentTarget.value = newInputValue;

        const sections = parseTimeSections({
          format,
          timeValue,
          inputValue: newInputValue,
        });
        const currentSectionIndex = sections.findIndex(
          (section) => section.type === 'ampm',
        );
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const nextSection = sections?.[currentSectionIndex + 1];

        if (nextSection) {
          setSelectedTimeSection(nextSection);
          e.currentTarget.setSelectionRange(nextSection.start, nextSection.end);
        }

        setInputValue(newInputValue);
      }
    }

    if (!/^[0-9]$/.test(e.key)) return;

    if (selectedTimeSection.type === 'hours') {
      const numberSectionHoursValue = Number(selectedTimeSection.value);

      // 새로운 시간값 계산
      let newHoursValue = Number.isNaN(numberSectionHoursValue)
        ? e.key
        : numberSectionHoursValue.toString() + e.key;

      // 최대 시간 확인
      const maxHours = is24HourFormat ? 23 : 12;
      if (Number(newHoursValue) > maxHours) {
        newHoursValue = e.key;
      }

      newHoursValue = newHoursValue.padStart(2, '0');

      const shouldMoveToNextSection = is24HourFormat
        ? Number(newHoursValue) > 2
        : Number(newHoursValue) > 1;

      const targetInputValue = e.currentTarget.value;
      const newInputValue =
        targetInputValue.slice(0, selectedTimeSection.start) +
        newHoursValue +
        targetInputValue.slice(selectedTimeSection.end);

      e.currentTarget.value = newInputValue;

      const sections = parseTimeSections({
        format,
        timeValue,
        inputValue: newInputValue,
      });
      const currentSectionIndex = sections.findIndex(
        (section) => section.type === 'hours',
      );
      const nextSectionIndex = currentSectionIndex + 1;

      const nextSection =
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        shouldMoveToNextSection && sections?.[nextSectionIndex]
          ? sections[nextSectionIndex]
          : sections[currentSectionIndex];

      if (nextSection) {
        setSelectedTimeSection(nextSection);
        e.currentTarget.setSelectionRange(nextSection.start, nextSection.end);
      }
      setInputValue(newInputValue);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (
      (timeValue === null && e.currentTarget.value === '') ||
      e.currentTarget.value === format
    ) {
      e.currentTarget.value = '';
      setInputValue('');
    }
  };

  return (
    <TextInput
      ref={composedRefs}
      width="100%"
      value={timeValue ? timeValue.format(format) : undefined}
      placeholder={dayjs().startOf('day').format(format)}
      disabled={disabled}
      rightContent={
        <PopoverTrigger>
          <TextInputContent variant="icon-button">
            <IconButton type="button" size={22}>
              <IconClock />
            </IconButton>
          </TextInputContent>
        </PopoverTrigger>
      }
      sx={[timePickerInputStyle, sx]}
      onClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
});

TimePickerInput.displayName = TIME_PICKER_INPUT_NAME;

export default TimePicker;
