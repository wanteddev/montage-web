import { forwardRef, useEffect, useMemo, useState } from 'react';
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

import {
  ARROW_DOWN_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  ARROW_UP_KEY,
  TIME_PICKER_INPUT_NAME,
  TIME_PICKER_NAME,
  TYPE_TO_SECTION_MAP,
} from './constants';
import {
  getNewInputValue,
  getSection,
  getTimeUnit,
  getTimeValue,
  parseTimeSections,
} from './helpers';
import { timePickerInputStyle } from './style';

import type { KeyboardEvent } from 'react';
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

export const DAYJS_AM_TEXT = dayjs.localeData().meridiem(0, 0, false); // 오전
export const DAYJS_PM_TEXT = dayjs.localeData().meridiem(13, 0, false); // 오후

const TimePicker = ({
  defaultValue = null,
  value: givenValue,
  format = 'a hh:mm',
  hourFormat = '12',
  disabled = false,
  onChange,
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
        value={value}
        format={format}
        hourFormat={hourFormat}
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
>(({ format, hourFormat, disabled, value, sx, setValue }, ref) => {
  const [item, setItem] = useState<HTMLInputElement | null>(null);
  const composedRefs = useComposedRefs(ref, (node) => setItem(node));

  const [targetSection, setTargetSection] = useState<TimeSection | null>(null);

  const [inputValue, setInputValue] = useState<string>('');

  const isEmpty = useMemo(
    () => value === null && inputValue.length === 0,
    [value, inputValue],
  );

  const handlePointerDown = () => {
    if (!item) return;

    let cursorPosition: number;

    requestAnimationFrame(() => {
      if (isEmpty) {
        cursorPosition = 0;
        item.value = format;
      } else {
        cursorPosition = item.selectionStart ?? 0;
      }

      const sections = parseTimeSections({
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

        if (isEmpty) {
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

      const newInputValue = getNewInputValue({
        section: targetSection,
        value: formatValue,
        inputValue,
      });

      const section = getSection({
        type: 'current',
        format,
        inputValue: newInputValue,
        sectionType: targetSection.type,
      });

      if (section) {
        item.value = newInputValue;
        item.setSelectionRange(section.start, section.end);
        setInputValue(newInputValue);
        setTargetSection(section);
      }

      return;
    }

    if (e.key === ARROW_LEFT_KEY || e.key === ARROW_RIGHT_KEY) {
      const section = getSection({
        type: e.key === ARROW_LEFT_KEY ? 'prev' : 'next',
        format,
        inputValue,
        sectionType: targetSection.type,
      });

      if (section) {
        item.setSelectionRange(section.start, section.end);
        setTargetSection(section);
      }

      return;
    }

    if (targetSection.type === 'ampm') {
      const lowerKey = e.key.toLowerCase();

      if (['a', 'p'].includes(lowerKey)) {
        const ampmText = lowerKey === 'a' ? DAYJS_AM_TEXT : DAYJS_PM_TEXT;
        const newInputValue = ampmText + item.value.slice(targetSection.end);

        const section = getSection({
          type: 'next',
          format,
          inputValue: newInputValue,
          sectionType: targetSection.type,
        });

        if (section) {
          item.value = newInputValue;
          item.setSelectionRange(section.start, section.end);
          setInputValue(newInputValue);
          setTargetSection(section);
        }
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

    const [unitValue, isUnitSectionFilled] = getTimeUnit({
      section: targetSection,
      unitKey: e.key,
      hourFormat: targetSection.type === 'hour' ? hourFormat : undefined,
    });

    const newInputValue = getNewInputValue({
      section: targetSection,
      value: unitValue,
      inputValue,
    });

    const section = getSection({
      type: isUnitSectionFilled ? 'next' : 'current',
      format,
      value: unitValue,
      inputValue: newInputValue,
      sectionType: targetSection.type,
    });

    if (section) {
      item.value = newInputValue;
      item.setSelectionRange(section.start, section.end);
      setInputValue(newInputValue);
      setTargetSection(section);
    }
  };

  useEffect(() => {
    setValue(getTimeValue({ format, inputValue }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
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
        <PopoverTrigger>
          <TextInputContent variant="icon-button">
            <IconButton type="button" size={22} disabled={disabled}>
              <IconClock />
            </IconButton>
          </TextInputContent>
        </PopoverTrigger>
      }
      sx={[timePickerInputStyle, sx]}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
      onBlur={() => {
        if (isEmpty || inputValue === format) {
          setInputValue('');
        }
      }}
      onReset={() => {
        if (!item) return;

        const sections = parseTimeSections({
          format,
          inputValue: format,
        });
        const defaultSection = sections.find((section) => section.start === 0);

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
  );
});

TimePickerInput.displayName = TIME_PICKER_INPUT_NAME;

export default TimePicker;
