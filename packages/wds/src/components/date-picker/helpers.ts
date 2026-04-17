import dayjs from 'dayjs';

import {
  dateTypeToDateObject,
  dayjsTimezone,
  getMeridiem,
  getMonths,
  isValidDate,
} from '../date-calendar/helpers';

import { DATE_PICKER_FORMATS } from './constants';

import type { DatePickerFormat } from './types';
import type { DateType } from '../date-calendar/types';

const TEXT_FORMATS: Array<DatePickerFormat> = ['MMM', 'MMMM', 'a', 'A'];
const MAX_TIMESTAMP = 8640000000000000;
export const invalidDate = new Date(MAX_TIMESTAMP + 1);

export type DateFormatTextSection = {
  format: DatePickerFormat;
  value: string;
  startIndex: number;
  endIndex: number;
  index: number;
  type: 'text';
  options: Array<string>;
};

export type DateFormatNumericSection = {
  format: DatePickerFormat;
  value: string;
  startIndex: number;
  endIndex: number;
  index: number;
  type: 'numeric';
};

export type DateFormatSection =
  | DateFormatTextSection
  | DateFormatNumericSection;

const chunksFormat = (fmt: string) => {
  let current = null,
    currentFull = '',
    bracketed = false;
  const splits = [];
  for (let i = 0; i < fmt.length; i++) {
    const c = fmt.charAt(i);
    if (c === "'") {
      if (currentFull.length > 0) {
        splits.push(currentFull);
      }
      current = null;
      currentFull = '';
      bracketed = !bracketed;
    } else if (bracketed) {
      currentFull += c;
    } else if (c === current) {
      currentFull += c;
    } else {
      if (currentFull.length > 0) {
        splits.push(currentFull);
      }
      currentFull = c;
      current = c;
    }
  }

  if (currentFull.length > 0) {
    splits.push(currentFull);
  }

  return splits;
};

export const getRegexFormat = (
  format: DatePickerFormat,
  locale: string | undefined,
) => {
  switch (format) {
    case 'YY':
      return /^\d{2}/;
    case 'YYYY':
      return /^\d{4}/;
    case 'M':
      return /\d{1,2}/;
    case 'MM':
      return /^\d{2}/;
    case 'MMM':
      return new RegExp(
        '^' +
          String.raw`${getMonths(locale)
            .map((v) => v.short)
            .join('|')}`,
      );
    case 'MMMM':
      return new RegExp(
        '^' +
          String.raw`${getMonths(locale)
            .map((v) => v.long)
            .join('|')}`,
      );
    case 'D':
      return /^\d{1,2}/;
    case 'DD':
      return /^\d{2}/;
    case 'H':
      return /^\d{1,2}/;
    case 'HH':
      return /^\d{2}/;
    case 'h':
      return /^\d{1,2}/;
    case 'hh':
      return /^\d{2}/;
    case 'm':
      return /^\d{1,2}/;
    case 'mm':
      return /^\d{2}/;
    case 's':
      return /^\d{1,2}/;
    case 'ss':
      return /^\d{2}/;
    case 'a':
      return new RegExp(
        '^' +
          String.raw`${getMeridiem(locale)
            .map((v) => v.lower)
            .join('|')}`,
      );
    case 'A':
      return new RegExp(
        '^' +
          String.raw`${getMeridiem(locale)
            .map((v) => v.upper)
            .join('|')}`,
      );
  }
};

export const parseSections = (
  text: string,
  formatChunks: Array<string>,
  locale: string | undefined,
) => {
  const sections: Array<{
    format: DatePickerFormat;
    value: string;
    isMatched: boolean;
    isDefaultFormat: boolean;
  }> = [];
  let remainingText = text;

  for (let i = 0; i < formatChunks.length; i++) {
    const formatChunk = formatChunks[i];

    if (!formatChunk) {
      return null;
    }

    if (!isDatePickerFormat(formatChunk)) {
      remainingText = remainingText.slice(formatChunk.length);
      sections.push({
        format: formatChunk as DatePickerFormat,
        value: formatChunk,
        isMatched: false,
        isDefaultFormat: false,
      });
      continue;
    }

    const valueChunk = getRegexFormat(formatChunk as DatePickerFormat, locale);
    const match = remainingText.match(valueChunk);

    if (!match) {
      remainingText = remainingText.slice(formatChunk.length);
    } else {
      remainingText = remainingText.slice(match.index! + match[0].length);
    }

    sections.push({
      format: formatChunk as DatePickerFormat,
      value: match?.[0] || formatChunk,
      isMatched: Boolean(match),
      isDefaultFormat: !Boolean(match),
    });
  }

  return sections;
};

export const toFormat = (
  date: DateType,
  format: string,
  locale: string | undefined,
  timezone?: string,
) => {
  const formatChunks = chunksFormat(format);

  let result = '';

  for (const chunk of formatChunks) {
    if (!isDatePickerFormat(chunk)) {
      result += chunk;
      continue;
    }

    result += localeFormat(date, chunk, locale, timezone);
  }

  return result;
};

export const parseFromFormat = (
  text: string,
  format: string,
  previousValue: DateType,
  locale: string | undefined,
  timezone?: string,
) => {
  const formatChunks = chunksFormat(format);
  const sections = parseSections(text, formatChunks, locale)?.filter(
    ({ isMatched, isDefaultFormat }) => isMatched || isDefaultFormat,
  );

  if (!sections || sections.length === 0) {
    return null;
  }

  let parsedDate = dayjsTimezone(
    isValidDate(previousValue) ? dayjs(previousValue) : dayjs(),
    timezone,
  );

  sections.sort(
    (a, b) =>
      DATE_PICKER_FORMATS.findIndex((v) => v === a.format) -
      DATE_PICKER_FORMATS.findIndex((v) => v === b.format),
  );

  for (const section of sections) {
    const { format: sectionFormat, value } = section;

    switch (sectionFormat) {
      case 'YYYY':
        if (!/^\d{4}$/.test(value)) {
          return invalidDate;
        }
        parsedDate = parsedDate.year(parseInt(value));
        break;

      case 'YY':
        if (!/^\d{2}$/.test(value)) {
          return invalidDate;
        }
        const year = parseInt(value);
        parsedDate = parsedDate.year(year + (year > 68 ? 1900 : 2000));
        break;

      case 'M':
      case 'MM':
        if (!/^\d{1,2}$/.test(value)) {
          return invalidDate;
        }
        const month = parseInt(value);
        if (month < 1 || month > 12) {
          return invalidDate;
        }
        parsedDate = parsedDate.month(month - 1);
        break;
      case 'MMM':
      case 'MMMM':
        const monthIndex = getMonths(locale).findIndex((v) =>
          sectionFormat === 'MMM' ? v.short === value : v.long === value,
        );
        if (monthIndex === -1) {
          return invalidDate;
        }
        parsedDate = parsedDate.month(monthIndex);
        break;
      case 'D':
      case 'DD':
        if (!/^\d{1,2}$/.test(value)) {
          return invalidDate;
        }
        const day = parseInt(value);
        if (day < 1 || day > 31 || day > parsedDate.daysInMonth()) {
          return invalidDate;
        }
        parsedDate = parsedDate.date(day);
        break;
      case 'H':
      case 'HH':
        if (!/^\d{1,2}$/.test(value)) {
          return invalidDate;
        }
        const hour = parseInt(value);
        if (hour < 0 || hour > 23) {
          return invalidDate;
        }
        parsedDate = parsedDate.hour(hour);
        break;
      case 'h':
      case 'hh':
        if (!/^\d{1,2}$/.test(value)) {
          return invalidDate;
        }
        const hour12 = parseInt(value);
        if (hour12 < 1 || hour12 > 12) {
          return invalidDate;
        }
        parsedDate = parsedDate.hour(hour12);
        break;
      case 'm':
      case 'mm':
        if (!/^\d{1,2}$/.test(value)) {
          return invalidDate;
        }
        const minute = parseInt(value);
        if (minute < 0 || minute > 59) {
          return invalidDate;
        }
        parsedDate = parsedDate.minute(minute);
        break;
      case 's':
      case 'ss':
        if (!/^\d{1,2}$/.test(value)) {
          return invalidDate;
        }
        const second = parseInt(value);
        if (second < 0 || second > 59) {
          return invalidDate;
        }
        parsedDate = parsedDate.second(second);
        break;
      case 'a':
      case 'A':
        const meridiem = getMeridiem(locale).findIndex((v) =>
          sectionFormat === 'A' ? v.upper === value : v.lower === value,
        );

        if (meridiem === -1) {
          return invalidDate;
        }
        parsedDate = parsedDate.set(
          'hour',
          meridiem === 0
            ? parsedDate.hour() >= 12
              ? parsedDate.hour() - 12
              : parsedDate.hour()
            : parsedDate.hour() < 12
              ? parsedDate.hour() + 12
              : parsedDate.hour(),
        );
        break;
    }
  }

  return parsedDate.isValid()
    ? dateTypeToDateObject(parsedDate, timezone)
    : invalidDate;
};

export const getDateformatSections = (
  inputValue: string,
  format: string,
  locale: string | undefined,
) => {
  const result: Array<DateFormatSection> = [];

  const formatChunks = chunksFormat(format);
  const sections = parseSections(inputValue, formatChunks, locale);

  if (!sections) {
    return [];
  }

  let searchIndex = 0;

  for (let i = 0; i < formatChunks.length; i++) {
    const formatChunk = formatChunks[i];

    if (!formatChunk || !isDatePickerFormat(formatChunk)) continue;

    const section = sections.find((v) => v.format === formatChunk);

    const startIndex = inputValue.indexOf(
      section?.value ?? formatChunk,
      searchIndex,
    );
    const endIndex = startIndex + (section?.value ?? formatChunk).length;

    searchIndex = endIndex;

    const getOptions = () => {
      switch (formatChunk) {
        case 'MMM':
          return getMonths(locale).map((v) => v.short);
        case 'MMMM':
          return getMonths(locale).map((v) => v.long);
        case 'a':
          return getMeridiem(locale).map((v) => v.lower);
        case 'A':
          return getMeridiem(locale).map((v) => v.upper);
        default:
          return [];
      }
    };

    result.push({
      index: result.length,
      startIndex,
      endIndex,
      format: formatChunk as DatePickerFormat,
      value: section?.value ?? formatChunk,
      type: TEXT_FORMATS.includes(formatChunk) ? 'text' : 'numeric',
      options: getOptions(),
    });
  }

  return result;
};

export const getClosetSection = (
  cursorPosition: number,
  sections: Array<DateFormatSection>,
) => {
  const clickedSection = sections.find(
    (section) =>
      cursorPosition >= section.startIndex &&
      cursorPosition <= section.endIndex,
  );

  if (clickedSection) {
    return clickedSection;
  } else {
    let closestSection: DateFormatSection | undefined;
    let closestDistance = Infinity;

    for (const section of sections) {
      const { startIndex, endIndex } = section;

      const distance =
        cursorPosition >= startIndex && cursorPosition <= endIndex
          ? 0
          : Math.min(
              Math.abs(cursorPosition - startIndex),
              Math.abs(cursorPosition - endIndex),
            );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = section;
      }
    }

    return closestSection;
  }
};

const isDatePickerFormat = (format: string): format is DatePickerFormat => {
  return DATE_PICKER_FORMATS.includes(format);
};

export const localeFormat = (
  value: DateType,
  format: string,
  locale: string | undefined,
  timezone: string | undefined,
) => {
  if (!isValidDate(value)) {
    return value;
  }

  const parsedValue = dateTypeToDateObject(value, timezone);
  const parsedDayjs = dayjsTimezone(dayjs(parsedValue), timezone);

  switch (format) {
    case 'YY':
      return parsedDayjs.year().toString().padStart(2, '0');
    case 'YYYY':
      return parsedDayjs.year().toString().padStart(4, '0');
    case 'M':
      return (parsedDayjs.month() + 1).toString();
    case 'MM':
      return (parsedDayjs.month() + 1).toString().padStart(2, '0');
    case 'MMM':
      return Intl.DateTimeFormat(locale, {
        month: 'short',
        timeZone: timezone,
      }).format(parsedValue);
    case 'MMMM':
      return Intl.DateTimeFormat(locale, {
        month: 'long',
        timeZone: timezone,
      }).format(parsedValue);
    case 'D':
      return parsedDayjs.date().toString();
    case 'DD':
      return parsedDayjs.date().toString().padStart(2, '0');
    case 'H':
      return parsedDayjs.hour().toString();
    case 'HH':
      return parsedDayjs.hour().toString().padStart(2, '0');
    case 'h':
      return (parsedDayjs.hour() % 12 || 12).toString();
    case 'hh':
      return (parsedDayjs.hour() % 12 || 12).toString().padStart(2, '0');
    case 'm':
      return parsedDayjs.minute().toString();
    case 'mm':
      return parsedDayjs.minute().toString().padStart(2, '0');
    case 's':
      return parsedDayjs.second().toString();
    case 'ss':
      return parsedDayjs.second().toString().padStart(2, '0');
    case 'a':
      return (
        Intl.DateTimeFormat(locale, {
          hour: 'numeric',
          hour12: true,
          timeZone: timezone,
        })
          .formatToParts(parsedValue)
          .find((v) => v.type === 'dayPeriod')?.value || 'a'
      );
    case 'A':
      return (
        Intl.DateTimeFormat(locale, {
          hour: 'numeric',
          hour12: true,
          timeZone: timezone,
        })
          .formatToParts(parsedValue)
          .find((v) => v.type === 'dayPeriod')
          ?.value.toUpperCase() || 'A'
      );

    default:
      return format;
  }
};

export const getNumericFormatRange = (
  format: DatePickerFormat,
  value: DateType,
  timezone: string | undefined,
) => {
  const maxDaysInMonthFromValue = dayjsTimezone(
    dayjs(
      isValidDate(value)
        ? dateTypeToDateObject(value, timezone)
        : dateTypeToDateObject(new Date(), timezone),
    ),
    timezone,
  ).daysInMonth();

  const maxDaysInMonth = isNaN(maxDaysInMonthFromValue)
    ? 31
    : maxDaysInMonthFromValue;

  switch (format) {
    case 'YYYY':
      return {
        minValue: 1900,
        maxValue: 2100,
        isComplete: (v: string) => {
          const parsedValue = parseInt(v);
          return v.length === 4 && !isNaN(parsedValue) && parsedValue >= 1900;
        },
      };
    case 'YY':
      return {
        minValue: 0,
        maxValue: 99,
        isComplete: (v: string) => {
          const parsedValue = parseInt(v);

          return !isNaN(parsedValue) && parsedValue >= 0 && v.length === 2;
        },
      };
    case 'M':
      return {
        minValue: 1,
        maxValue: 12,
        isComplete: (v: string) => {
          if (v.length === 0) return false;

          const parsedValue = parseInt(v);

          if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 12)
            return false;
          if (v.length === 2 && v[0] === '0') return true;
          if (v.length === 2 && parsedValue >= 10) return true;
          if (v === '1') return false;

          return parsedValue >= 2 && parsedValue <= 9;
        },
      };
    case 'MM':
      return {
        minValue: 1,
        maxValue: 12,
        isComplete: (v: string) => {
          const parsedValue = parseInt(v);

          return (
            !isNaN(parsedValue) &&
            v.length === 2 &&
            parsedValue >= 1 &&
            parsedValue <= 12
          );
        },
      };
    case 'D':
    case 'DD':
      return {
        minValue: 1,
        maxValue: maxDaysInMonth,
        isComplete: (v: string) => {
          if (v.length === 0) return false;
          if (v.length > 2) return false;

          const parsedValue = parseInt(v);

          if (
            isNaN(parsedValue) ||
            parsedValue < 1 ||
            parsedValue > maxDaysInMonth
          )
            return false;

          if (v.length === 2) return true;
          if (parsedValue >= 4) return true;

          const canHaveMoreDigits = {
            1: maxDaysInMonth >= 10,
            2: maxDaysInMonth >= 20,
            3: maxDaysInMonth >= 30,
          }[parsedValue];

          return !canHaveMoreDigits;
        },
      };
    case 'H':
    case 'HH':
      return {
        minValue: 0,
        maxValue: 23,
        isComplete: (v: string) => {
          if (v.length === 0) return false;
          if (v.length > 2) return false;

          const parsedValue = parseInt(v);

          if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 23)
            return false;

          if (v.length === 2) return true;
          if (parsedValue >= 3) return true;

          return false;
        },
      };

    case 'h':
    case 'hh':
      return {
        minValue: 1,
        maxValue: 12,
        isComplete: (v: string) => {
          if (v.length === 0) return false;
          if (v.length > 2) return false;

          const parsedValue = parseInt(v);

          if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 12)
            return false;

          if (v.length === 2) return true;
          if (parsedValue >= 2) return true;

          return false;
        },
      };

    case 'm':
    case 'mm':
      return {
        minValue: 0,
        maxValue: 59,
        isComplete: (v: string) => {
          if (v.length === 0) return false;
          if (v.length > 2) return false;

          const parsedValue = parseInt(v);

          if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 59)
            return false;

          if (v.length === 2) return true;
          if (parsedValue >= 6) return true;

          return false;
        },
      };

    case 's':
    case 'ss':
      return {
        minValue: 0,
        maxValue: 59,
        isComplete: (v: string) => {
          const parsedValue = parseInt(v);

          if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 59)
            return false;

          if (v.length === 2) return true;
          if (parsedValue >= 6) return true;

          return false;
        },
      };
    default:
      return {
        minValue: 0,
        maxValue: 0,
        isComplete: () => false,
      };
  }
};

/**
 * Computes the new section value string for ArrowUp/ArrowDown.
 */
export const getIncrementedSectionValue = (
  section: DateFormatSection,
  direction: 'up' | 'down',
  value: DateType,
  timezone: string | undefined,
): string | undefined => {
  if (section.type === 'text') {
    const optionIndex = section.options.indexOf(section.value);

    if (direction === 'up') {
      return section.options[
        optionIndex === -1 ? 0 : (optionIndex + 1) % section.options.length
      ];
    }

    return section.options[
      optionIndex === -1
        ? section.options.length - 1
        : optionIndex === 0
          ? section.options.length - 1
          : optionIndex - 1
    ];
  }

  const { minValue, maxValue } = getNumericFormatRange(
    section.format,
    value,
    timezone,
  );

  const parsed = parseInt(section.value);

  if (isNaN(parsed)) {
    if (section.format === 'YY' || section.format === 'YYYY') {
      return dayjsTimezone(dayjs(), timezone).format(section.format);
    }
    return minValue.toString().padStart(section.format.length, '0');
  }

  if (direction === 'up') {
    return (maxValue <= parsed ? minValue : parsed + 1)
      .toString()
      .padStart(section.format.length, '0');
  }

  return (minValue >= parsed ? maxValue : parsed - 1)
    .toString()
    .padStart(section.format.length, '0');
};

/**
 * Computes the section value string for Home/End.
 */
export const getBoundSectionValue = (
  section: DateFormatSection,
  bound: 'home' | 'end',
  value: DateType,
  timezone: string | undefined,
): string | undefined => {
  if (section.type === 'text') {
    return bound === 'home'
      ? section.options[0]
      : section.options[section.options.length - 1];
  }

  const { minValue, maxValue } = getNumericFormatRange(
    section.format,
    value,
    timezone,
  );

  const target = bound === 'home' ? minValue : maxValue;
  return target.toString().padStart(section.format.length, '0');
};

/**
 * Processes a character key input into a section.
 * Returns the new input string, whether input is finished, and the updated ref value.
 * Returns `undefined` if the key is not valid for the section.
 */
export const processCharacterInput = (
  key: string,
  section: DateFormatSection,
  currentSectionRef: string,
  currentInput: string,
  locale: string | undefined,
  value: DateType,
  timezone: string | undefined,
):
  | {
      newInput: string;
      isFinished: boolean;
      newSectionRef: string;
    }
  | undefined => {
  const lowerKey = key.toLowerCase();

  if (section.type === 'text') {
    const foundOption = section.options.filter((v) => {
      if (/^a$/i.test(section.format)) {
        const meridiem = getMeridiem(locale);
        const [am, pm] = meridiem.map((m) =>
          section.format === 'a' ? m.lower : m.upper,
        );
        return new RegExp(
          `^${lowerKey === 'a' ? am : lowerKey === 'p' ? pm : '$^'}`,
        ).test(v);
      }
      return new RegExp('^' + String.raw`${currentSectionRef}${lowerKey}`).test(
        v.toLowerCase(),
      );
    });

    if (foundOption.length > 0) {
      return {
        newInput:
          currentInput.slice(0, section.startIndex) +
          foundOption[0] +
          currentInput.slice(section.endIndex),
        isFinished: foundOption.length === 1,
        newSectionRef: currentSectionRef + lowerKey,
      };
    }

    const resetRef = lowerKey;
    const fallbackOption = section.options.filter((v) =>
      new RegExp('^' + String.raw`${resetRef}`).test(v.toLowerCase()),
    );

    if (fallbackOption.length === 0) return undefined;

    return {
      newInput:
        currentInput.slice(0, section.startIndex) +
        fallbackOption[0] +
        currentInput.slice(section.endIndex),
      isFinished: fallbackOption.length === 1,
      newSectionRef: resetRef,
    };
  }

  // numeric
  const numericValue = parseInt(lowerKey);
  if (isNaN(numericValue)) return undefined;

  const { isComplete } = getNumericFormatRange(section.format, value, timezone);

  const newSectionRef = (currentSectionRef + lowerKey).slice(
    (section.format.length === 1 ? 2 : section.format.length) * -1,
  );

  const newInput =
    currentInput.slice(0, section.startIndex) +
    currentInput
      .slice(section.startIndex)
      .replace(
        section.value,
        newSectionRef.replace(/^0+/, '').padStart(section.format.length, '0'),
      );

  return {
    newInput,
    isFinished: isComplete(newSectionRef),
    newSectionRef,
  };
};
