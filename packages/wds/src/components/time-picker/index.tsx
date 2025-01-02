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
import { getNextSection, getTimeUnit, parseTimeSections } from './helpers';
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
>(({ format, hoursFormat, disabled, value, sx, setValue, ...props }, ref) => {
  const [item, setItem] = useState<HTMLInputElement | null>(null);
  const composedRefs = useComposedRefs(ref, (node) => setItem(node));

  const [selectedTimeSection, setSelectedTimeSection] =
    useState<TimeSection | null>(null);

  const [inputValue, setInputValue] = useState<string>('');

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (value === null && e.currentTarget.value === '') {
      e.currentTarget.value = format;
      setInputValue(format);
    }

    const cursorPosition = e.currentTarget.selectionStart || 0;
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
        setInputValue(newInputValue);
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
    setInputValue(newInputValue);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (
      (value === null && e.currentTarget.value === '') ||
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
      value={inputValue}
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
      invalid={
        value ? value.isValid() : inputValue.length > 0 && inputValue !== format
      }
      sx={[timePickerInputStyle, sx]}
      onClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onChange={() => {}}
    />
  );
});

TimePickerInput.displayName = TIME_PICKER_INPUT_NAME;

export default TimePicker;
