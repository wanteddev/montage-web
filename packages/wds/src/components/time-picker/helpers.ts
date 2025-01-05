import dayjs from 'dayjs';

import { ARROW_DOWN_KEY, ARROW_UP_KEY, SECTION_TO_TYPE_MAP } from './constants';

import { DAYJS_AM_TEXT, DAYJS_PM_TEXT } from '.';

import type { Dayjs } from 'dayjs';
import type {
  TimePickerFormat,
  TimePickerHourFormat,
  TimePickerValue,
  TimeSection,
} from './types';

export const isDayjsTimeValue = (value: TimePickerValue): value is Dayjs =>
  value !== null && dayjs.isDayjs(value);

const SEPARATOR = ' ';
/**
 * string을 DayJS 포맷 형식을 따라 섹션으로 분할합니다.
 *
 * @example 'aa hh:mm' -> ['aa', 'hh', 'mm']
 * @example 'a 12:mm' -> ['a', '12', 'mm']
 * @example '오전 12:00' -> ['오전', '12', '00']
 */
export const getFormatSections = (value: string) =>
  value.replace(/:/g, SEPARATOR).split(SEPARATOR).filter(Boolean);

type ParseTimeSectionsParams = {
  format: TimePickerFormat;
  inputValue: string;
};

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
    const type = SECTION_TO_TYPE_MAP?.[formatSectionValue];

    const inputSectionValue = inputSections[index];
    const value = inputSectionValue ?? formatSectionValue;

    if (type) {
      sections.push({
        start: currentSectionIndex,
        end: currentSectionIndex + value.length,
        type,
        value,
      });
      // 다음 섹션 위치: 구분자 길이 추가
      currentSectionIndex += value.length + SEPARATOR.length;
    }
  });

  return sections;
};

type GetSectionParams = {
  type: 'prev' | 'current' | 'next';
  format: TimePickerFormat;
  value?: string;
  inputValue: string;
  sectionType: TimeSection['type'];
};

export const getSection = ({
  type,
  format,
  value,
  inputValue,
  sectionType,
}: GetSectionParams) => {
  const sections = parseTimeSections({
    format,
    inputValue,
  });

  const currentSectionIndex = sections.findIndex(
    (section) => section.type === sectionType,
  );
  const sectionIndex =
    type === 'prev'
      ? currentSectionIndex - 1
      : type === 'next'
        ? currentSectionIndex + 1
        : currentSectionIndex;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const section = sections?.[sectionIndex]
    ? sections[sectionIndex]
    : sections[currentSectionIndex];

  // 현재 섹션에 머무를 경우 값 업데이트
  if (
    (type === 'current' || sectionType === section?.type) &&
    section &&
    value
  ) {
    section.value = value;
  }

  return section;
};

const max24Hours = 23;
const max12Hours = 12;
const maxMinutes = 59;
const minHours = 1;
const minMinutes = 0;

export const getTimeUnit = ({
  section,
  unitKey,
  hourFormat,
}: {
  section: TimeSection;
  unitKey: string;
  hourFormat?: TimePickerHourFormat;
}) => {
  const [minValue, maxValue] =
    section.type === 'hour'
      ? hourFormat === '12'
        ? [minHours, max12Hours]
        : [minHours, max24Hours]
      : [minMinutes, maxMinutes];
  const valueFirstDigit = Number(maxValue.toString()[0]);

  // 새로운 시/분/초 계산
  let value = '';

  if (isNaN(Number(section.value))) {
    value = unitKey;
  } else {
    if ([ARROW_UP_KEY, ARROW_DOWN_KEY].includes(unitKey)) {
      const increment = unitKey === ARROW_UP_KEY ? 1 : -1;
      const newValue = Number(section.value) + increment;

      value = (
        newValue > maxValue
          ? minValue
          : newValue < minValue
            ? maxValue
            : newValue
      ).toString();
    } else {
      value = section.value.toString() + unitKey;
    }
    // 최대 시/분/초 제한
    if (Number(value) > maxValue) {
      value = unitKey;
    }
  }

  value = Number(value).toString().padStart(2, '0');

  const isUnitSectionFilled = Number(value) > valueFirstDigit;

  return [value, isUnitSectionFilled] as const;
};

export const getTimeValue = ({
  format,
  inputValue,
}: {
  format: TimePickerFormat;
  inputValue: string;
}) => {
  if (inputValue.length === 0 || inputValue.match(/a|p|h|m|s/g)) {
    return null;
  }

  let time = dayjs().startOf('day').clone();

  const sections = parseTimeSections({
    format,
    inputValue,
  });
  sections.forEach((section) => {
    if (section.type !== 'ampm') {
      time = time.set(section.type, Number(section.value));
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

/**
 * 현재 입력값, 새로 입력한 section value를 반영한 input value를 반환합니다.
 * @example '오전 hh:mm' -> hh에 12 입력 -> '오전 12:mm'
 */
export const getNewInputValue = ({
  section,
  value,
  inputValue,
}: {
  section: TimeSection;
  value: string;
  inputValue: string;
}) => {
  return (
    inputValue.slice(0, section.start) + value + inputValue.slice(section.end)
  );
};
