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

import { TIME_PICKER_INPUT_NAME, TIME_PICKER_NAME } from './constants';
import {
  getSection,
  getTimeUnit,
  getTimeValue,
  parseTimeSections,
} from './helpers';
import { timePickerInputStyle } from './style';

import type { KeyboardEvent, MouseEvent } from 'react';
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
  hoursFormat = '12',
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
        hoursFormat={hoursFormat}
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
>(({ format, hoursFormat, disabled, value, sx, setValue }, ref) => {
  const [, setItem] = useState<HTMLInputElement | null>(null);
  const composedRefs = useComposedRefs(ref, (node) => setItem(node));

  const [targetSection, setTargetSection] = useState<TimeSection | null>(null);

  const [inputValue, setInputValue] = useState<string>('');

  const isEmpty = useMemo(
    () => value === null && inputValue.length === 0,
    [value, inputValue],
  );

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    let cursorPosition: number | null;

    if (isEmpty) {
      cursorPosition = 0;
      setInputValue(format);
      e.currentTarget.value = format;
    } else {
      cursorPosition = e.currentTarget.selectionStart ?? 0;
    }

    const sections = parseTimeSections({
      format,
      inputValue: e.currentTarget.value,
    });
    const clickedSection = sections.find(
      (section) =>
        cursorPosition >= section.start && cursorPosition <= section.end,
    );

    if (clickedSection) {
      setTargetSection(clickedSection);
      e.currentTarget.setSelectionRange(
        clickedSection.start,
        clickedSection.end,
      );
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!targetSection || disabled) return;

    e.preventDefault();

    if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
      const section = getSection({
        type: e.key === 'ArrowLeft' ? 'prev' : 'next',
        format,
        inputValue,
        sectionType: targetSection.type,
      });

      if (section) {
        setTargetSection(section);
        e.currentTarget.setSelectionRange(section.start, section.end);
      }

      return;
    }

    if (targetSection.type === 'ampm') {
      const lowerKey = e.key.toLowerCase();

      if (['a', 'p'].includes(lowerKey)) {
        const ampmText = lowerKey === 'a' ? DAYJS_AM_TEXT : DAYJS_PM_TEXT;
        const newInputValue =
          ampmText + e.currentTarget.value.slice(targetSection.end);

        setInputValue(newInputValue);
        e.currentTarget.value = newInputValue;

        const section = getSection({
          type: 'next',
          format,
          inputValue: newInputValue,
          sectionType: targetSection.type,
        });

        if (section) {
          setTargetSection(section);
          e.currentTarget.setSelectionRange(section.start, section.end);
        }
      }
      return;
    }

    if (
      !/^[0-9]$/.test(e.key) ||
      !['hour', 'minute', 'second'].includes(targetSection.type)
    ) {
      return;
    }

    const [unitValue, isUnitSectionFilled] = getTimeUnit({
      section: targetSection,
      unitKey: e.key,
      hoursFormat: targetSection.type === 'hour' ? hoursFormat : undefined,
    });

    const newInputValue =
      e.currentTarget.value.slice(0, targetSection.start) +
      unitValue +
      e.currentTarget.value.slice(targetSection.end);

    setInputValue(newInputValue);
    e.currentTarget.value = newInputValue;

    const section = getSection({
      type: isUnitSectionFilled ? 'next' : 'current',
      format,
      value: unitValue,
      inputValue: newInputValue,
      sectionType: targetSection.type,
    });

    if (section) {
      setTargetSection(section);
      e.currentTarget.setSelectionRange(section.start, section.end);
    }
  };

  useEffect(() => {
    if (inputValue.length === 0 || inputValue.match(/a|p|h|m|s/g)) return;

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
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onBlur={() => {
        if (isEmpty || inputValue === format) {
          setInputValue('');
        }
      }}
      onReset={() => {
        setValue(null);
        setInputValue('');
        setTargetSection(null);
      }}
      onChange={(e) => e.preventDefault()}
    />
  );
});

TimePickerInput.displayName = TIME_PICKER_INPUT_NAME;

export default TimePicker;
