import dayjs from 'dayjs';

import type { Dayjs } from 'dayjs';
import type { TimePickerFormat, TimePickerValue, TimeSection } from './types';

type ParseTimeSectionsParams = {
  format: TimePickerFormat;
  timeValue: TimePickerValue;
  inputValue: string;
};

export const isDayjsTimeValue = (
  timeValue: TimePickerValue,
): timeValue is Dayjs => timeValue !== null && dayjs.isDayjs(timeValue);

/**
 * TimePickerFormat과 inputValue를 기반으로 시간 섹션을 분할합니다.
 *
 * @example 'aa hh:mm' -> ['aa', 'hh', 'mm']
 * @example 'a 12:mm' -> ['a', '12', 'mm']
 * @example '오전 12:00' -> ['오전', '12', '00']
 */
export const getFormatTimeSections = ({
  format,
  timeValue,
  inputValue,
}: ParseTimeSectionsParams) => {
  return {
    formatSections: format.replace(/:/g, ' ').split(' ').filter(Boolean),
    inputSections: inputValue.replace(/:/g, ' ').split(' ').filter(Boolean),
  };
};

/**
 * 현재 시간을 format에 따라 Array<TimeSection>로 분할합니다.
 */
export const parseTimeSections = ({
  format,
  timeValue,
  inputValue,
}: ParseTimeSectionsParams): Array<TimeSection> => {
  const timeSections: Array<TimeSection> = [];
  let currentTimeSectionIndex = 0;

  const { formatSections, inputSections } = getFormatTimeSections({
    format,
    timeValue,
    inputValue,
  });

  formatSections.forEach((section, index) => {
    let type: TimeSection['type'];
    let value = '';
    const inputSectionValue = inputSections[index];

    switch (section) {
      case 'a':
        type = 'ampm';
        value = timeValue ? timeValue.format('A') : inputSectionValue ?? 'a';
        break;

      case 'hh': // 12시간 형식
        type = 'hours';
        value = timeValue ? timeValue.format('hh') : inputSectionValue ?? 'hh';
        break;

      case 'HH': // 24시간 형식
        type = 'hours';
        value = timeValue ? timeValue.format('HH') : inputSectionValue ?? 'HH';
        break;

      case 'mm':
        type = 'minutes';
        value = timeValue ? timeValue.format('mm') : inputSectionValue ?? 'mm';
        break;

      case 'ss':
        type = 'seconds';
        value = timeValue ? timeValue.format('ss') : inputSectionValue ?? 'ss';
        break;

      default:
        return;
    }

    timeSections.push({
      start: currentTimeSectionIndex,
      end: currentTimeSectionIndex + value.length,
      type,
      value,
    });

    // 다음 섹션 위치: 구분자 공백 추가
    currentTimeSectionIndex += value.length + 1;
  });

  return timeSections;
};
