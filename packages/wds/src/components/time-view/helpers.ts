import dayjs from 'dayjs';

export type GetTimeUnitsResult = ReturnType<typeof getHours>;

type GetHoursParams = {
  format: string;
  locale?: string;
  step?: number;
};

export const getHours = ({ format, locale, step = 1 }: GetHoursParams) => {
  const is24Hour = format.includes('H');
  const start = is24Hour ? 0 : 1;
  const end = is24Hour ? 23 : 12;
  const is2Digit = format.includes('HH') || format.includes('hh');

  return new Array(Math.floor((end - start + 1) / step)).fill(0).map((_, i) => {
    const value = start + i * step;
    const date = dayjs().hour(value).toDate();

    return {
      value,
      digit: is2Digit ? value.toString().padStart(2, '0') : value.toString(),
      '2-digit': new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
      }).format(date),
      numeric: new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
      }).format(date),
    };
  });
};

type GetTimeUnitsParams = {
  format: string;
  locale?: string;
  step?: number;
};

export const getMinutes = ({
  format,
  locale,
  step = 5,
}: GetTimeUnitsParams) => {
  return new Array(Math.floor(60 / step)).fill(0).map((_, i) => {
    const value = i * step;
    const date = dayjs().minute(value).toDate();
    const is2Digit = format.includes('mm');

    return {
      value,
      digit: is2Digit ? value.toString().padStart(2, '0') : value.toString(),
      '2-digit': new Intl.DateTimeFormat(locale, {
        minute: '2-digit',
      }).format(date),
      numeric: new Intl.DateTimeFormat(locale, {
        minute: 'numeric',
      }).format(date),
    };
  });
};

export const getSeconds = ({
  format,
  locale,
  step = 5,
}: GetTimeUnitsParams) => {
  return new Array(Math.floor(60 / step)).fill(0).map((_, i) => {
    const value = i * step;
    const date = dayjs().second(value).toDate();
    const is2Digit = format.includes('ss');

    return {
      value,
      digit: is2Digit ? value.toString().padStart(2, '0') : value.toString(),
      '2-digit': new Intl.DateTimeFormat(locale, {
        second: '2-digit',
      }).format(date),
      numeric: new Intl.DateTimeFormat(locale, {
        second: 'numeric',
      }).format(date),
    };
  });
};
