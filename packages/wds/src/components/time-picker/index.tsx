import { forwardRef, useEffect, useState } from 'react';
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
import { getNextSection, getTimeUnit, parseTimeSections } from './helpers';
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

const DAYJS_AM_TEXT = dayjs.localeData().meridiem(0, 0, false);
const DAYJS_PM_TEXT = dayjs.localeData().meridiem(13, 0, false);

const TimePicker = ({
  defaultValue = null,
  value: givenValue,
  format = 'a hh:mm',
  hoursFormat = '12',
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

  const [selectedTimeSection, setSelectedTimeSection] =
    useState<TimeSection | null>(null);

  const [inputValue, setInputValue] = useState<string>('');

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    let cursorPosition: number | null;

    if (value === null && inputValue.length === 0) {
      cursorPosition = 0;
      setInputValue(format);
      e.currentTarget.value = format;
    } else {
      cursorPosition = e.currentTarget.selectionStart;
    }

    cursorPosition ??= 0;

    const sections = parseTimeSections({
      format,
      value,
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
      const lowerKey = e.key.toLowerCase();

      if (lowerKey === 'a' || lowerKey === 'p') {
        const ampmText = lowerKey === 'a' ? DAYJS_AM_TEXT : DAYJS_PM_TEXT;
        const newInputValue =
          ampmText + e.currentTarget.value.slice(selectedTimeSection.end);

        setInputValue(newInputValue);
        e.currentTarget.value = newInputValue;

        const nextSection = getNextSection({
          format,
          value,
          inputValue: newInputValue,
          shouldMoveToNextSection: true,
          selectedTimeSectionType: selectedTimeSection.type,
        });

        if (nextSection) {
          setSelectedTimeSection(nextSection);
          e.currentTarget.setSelectionRange(nextSection.start, nextSection.end);
        }
      }

      return;
    }

    if (
      !/^[0-9]$/.test(e.key) ||
      (selectedTimeSection.type !== 'hours' &&
        selectedTimeSection.type !== 'minutes' &&
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        selectedTimeSection.type !== 'seconds')
    ) {
      return;
    }

    const [unitValue, isUnitSectionFilled] = getTimeUnit({
      section: selectedTimeSection,
      unitKey: e.key,
      hoursFormat:
        selectedTimeSection.type === 'hours' ? hoursFormat : undefined,
    });

    const newInputValue =
      e.currentTarget.value.slice(0, selectedTimeSection.start) +
      unitValue +
      e.currentTarget.value.slice(selectedTimeSection.end);

    setInputValue(newInputValue);
    e.currentTarget.value = newInputValue;

    const nextSection = getNextSection({
      format,
      value,
      inputValue: newInputValue,
      shouldMoveToNextSection: isUnitSectionFilled,
      selectedTimeSectionType: selectedTimeSection.type,
    });

    if (nextSection) {
      setSelectedTimeSection(nextSection);
      e.currentTarget.setSelectionRange(nextSection.start, nextSection.end);
    }
  };

  useEffect(() => {
    if (inputValue.length > 0 && !inputValue.match(/a|p|h|m|s/g)) {
      let time = dayjs().startOf('day').clone();

      const sections = parseTimeSections({
        format,
        value: null,
        inputValue,
      });

      sections.forEach((section) => {
        switch (section.type) {
          case 'hours':
            time = time.hour(Number(section.value));
            break;
          case 'minutes':
            time = time.minute(Number(section.value));
            break;
          case 'seconds':
            time = time.second(Number(section.value));
            break;
        }
      });

      const ampmSection = sections.find((section) => section.type === 'ampm');

      if (ampmSection) {
        const currentAmpm = time.format('A');

        if (ampmSection.value === DAYJS_AM_TEXT) {
          time =
            currentAmpm === DAYJS_AM_TEXT ? time : time.subtract(12, 'hour');
        } else {
          time = currentAmpm === DAYJS_PM_TEXT ? time : time.add(12, 'hour');
        }
      }

      setValue(time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <TextInput
      ref={composedRefs}
      width="100%"
      value={inputValue}
      disabled={disabled}
      invalid={
        value
          ? !value.isValid()
          : inputValue.length > 0 && inputValue !== format
      }
      placeholder={dayjs().startOf('day').format(format)}
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
      onKeyDown={handleKeyDown}
      onBlur={() => {
        if ((value === null && inputValue === '') || inputValue === format) {
          setInputValue('');
        }
      }}
      onReset={() => {
        setValue(null);
        setInputValue('');
        setSelectedTimeSection(null);
      }}
      onChange={() => {}}
    />
  );
});

TimePickerInput.displayName = TIME_PICKER_INPUT_NAME;

export default TimePicker;
