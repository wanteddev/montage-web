import dayjs from 'dayjs';

import type { Dayjs } from 'dayjs';
import type {
  TimePickerFormat,
  TimePickerHoursFormat,
  TimePickerValue,
  TimeSection,
} from './types';

export const isDayjsTimeValue = (value: TimePickerValue): value is Dayjs =>
  value !== null && dayjs.isDayjs(value);

/**
 * string을 DayJS 포맷 형식을 따라 섹션으로 분할합니다.
 *
 * @example 'aa hh:mm' -> ['aa', 'hh', 'mm']
 * @example 'a 12:mm' -> ['a', '12', 'mm']
 * @example '오전 12:00' -> ['오전', '12', '00']
 */
export const getFormatSections = (value: string) =>
  value.replace(/:/g, ' ').split(' ').filter(Boolean);

/**
 * 현재 시간을 format에 따라 Array<TimeSection>로 분할합니다.
 */
export const parseTimeSections = ({
  format,
  value,
  inputValue,
}: {
  format: TimePickerFormat;
  value: TimePickerValue;
  inputValue: string;
}): Array<TimeSection> => {
  const timeSections: Array<TimeSection> = [];
  let currentTimeSectionIndex = 0;

  const formatSections = getFormatSections(format);
  const inputSections = getFormatSections(inputValue);

  formatSections.forEach((section, index) => {
    let type: TimeSection['type'];
    let newValue = '';
    const inputSectionValue = inputSections[index];

    switch (section.toLowerCase()) {
      case 'a':
        type = 'ampm';
        newValue = value ? value.format('A') : inputSectionValue ?? 'a';
        break;

      case 'hh':
        type = 'hours';
        newValue = value ? value.format('hh') : inputSectionValue ?? 'hh';
        break;

      case 'mm':
        type = 'minutes';
        newValue = value ? value.format('mm') : inputSectionValue ?? 'mm';
        break;

      case 'ss':
        type = 'seconds';
        newValue = value ? value.format('ss') : inputSectionValue ?? 'ss';
        break;

      default:
        return;
    }

    timeSections.push({
      start: currentTimeSectionIndex,
      end: currentTimeSectionIndex + newValue.length,
      type,
      value: newValue,
    });

    // 다음 섹션 위치: 구분자 공백 추가
    currentTimeSectionIndex += newValue.length + 1;
  });

  return timeSections;
};

export const getNextSection = ({
  format,
  value,
  inputValue,
  shouldMoveToNextSection,
  selectedTimeSectionType,
}: {
  format: TimePickerFormat;
  value: TimePickerValue;
  inputValue: string;
  shouldMoveToNextSection: boolean;
  selectedTimeSectionType: TimeSection['type'];
}) => {
  const sections = parseTimeSections({
    format,
    value,
    inputValue,
  });
  const currentSectionIndex = sections.findIndex(
    (section) => section.type === selectedTimeSectionType,
  );
  const nextSectionIndex = currentSectionIndex + 1;

  const nextSection =
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    shouldMoveToNextSection && sections?.[nextSectionIndex]
      ? sections[nextSectionIndex]
      : sections[currentSectionIndex];

  return nextSection;
};

const max24Hours = 23;
const max12Hours = 12;
const maxMinutes = 59;

export const getTimeUnit = ({
  section,
  unitKey,
  hoursFormat,
}: {
  section: TimeSection;
  unitKey: string;
  hoursFormat?: TimePickerHoursFormat;
}) => {
  const maxValue =
    section.type === 'hours'
      ? hoursFormat === '12'
        ? max12Hours
        : max24Hours
      : maxMinutes;

  const valueFirstDigit = Number(maxValue.toString()[0]);

  // 새로운 시/분/초 계산
  let value = isNaN(Number(section.value))
    ? unitKey
    : section.value.toString() + unitKey;

  // 최대 시/분/초 제한
  if (Number(value) > maxValue) {
    value = unitKey;
  }
  value = Number(value).toString().padStart(2, '0');

  const isUnitSectionFilled = Number(value) > valueFirstDigit;

  return [value, isUnitSectionFilled] as const;
};
