import dayjs from 'dayjs';

import { DAYJS_AM_TEXT, DAYJS_PM_TEXT } from '.';

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

type ParseTimeSectionsParams = {
  format: TimePickerFormat;
  inputValue: string;
};

const timeSectionType: Record<string, TimeSection['type']> = {
  a: 'ampm',
  hh: 'hour',
  mm: 'minute',
  ss: 'second',
} as const;

/**
 * 현재 시간을 format에 따라 Array<TimeSection>로 분할합니다.
 */
export const parseTimeSections = ({
  format,
  inputValue,
}: ParseTimeSectionsParams): Array<TimeSection> => {
  const sections: Array<TimeSection> = [];
  let currentSectionIndex = 0;

  const formatSections = getFormatSections(format);
  const inputSections = getFormatSections(inputValue);

  formatSections.forEach((section, index) => {
    const formatSectionValue = section.toLowerCase();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const type = timeSectionType?.[formatSectionValue];

    const inputSectionValue = inputSections[index];
    const value = inputSectionValue ?? formatSectionValue;

    if (type) {
      sections.push({
        start: currentSectionIndex,
        end: currentSectionIndex + value.length,
        type,
        value,
      });
      // 다음 섹션 위치: 구분자 공백 추가
      currentSectionIndex += value.length + 1;
    }
  });

  return sections;
};

type GetNextSectionParams = {
  format: TimePickerFormat;
  value?: string;
  inputValue: string;
  shouldMoveToNextSection: boolean;
  selectedTimeSectionType: TimeSection['type'];
};

export const getNextSection = ({
  format,
  value,
  inputValue,
  shouldMoveToNextSection,
  selectedTimeSectionType,
}: GetNextSectionParams) => {
  const sections = parseTimeSections({
    format,
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

  // 현재 섹션에 머무를 경우 값 업데이트
  if (nextSection && value) {
    nextSection.value = value;
  }

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
    section.type === 'hour'
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

/**
 * input value를 DayJS 객체로 변환합니다.
 */
export const getTimeValue = ({
  format,
  inputValue,
}: {
  format: TimePickerFormat;
  inputValue: string;
}) => {
  let time = dayjs().startOf('day').clone();

  const sections = parseTimeSections({
    format,
    inputValue,
  });
  sections.forEach((section) => {
    if (section.type !== 'ampm') {
      time.set(section.type, Number(section.value));
    }
  });

  const ampmSection = sections.find((section) => section.type === 'ampm');

  if (ampmSection) {
    const currentAmpm = time.format('A');

    if (ampmSection.value === DAYJS_AM_TEXT) {
      time = currentAmpm === DAYJS_AM_TEXT ? time : time.subtract(12, 'hour');
    } else {
      time = currentAmpm === DAYJS_PM_TEXT ? time : time.add(12, 'hour');
    }
  }

  return time;
};
