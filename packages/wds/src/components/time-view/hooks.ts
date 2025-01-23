import { useMemo } from 'react';

import { getMeridiem, isValidDate } from '../date-calendar/helpers';
import { toFormat } from '../date-picker/helpers';

import { getHours, getMinutes, getSeconds } from './helpers';

import type { TimeViewType } from './types';
import type { DateType } from '../date-picker';

type Props = {
  view: TimeViewType;
  format: string;
  locale?: string;
  value: DateType;
  timezone?: string;
};

export const useTimeView = ({ value, timezone, ...props }: Props) => {
  const timeValue = useMemo(() => {
    if (!isValidDate(value)) return;

    switch (props.view) {
      case 'ampm':
        return toFormat(value, 'a', props.locale, timezone);
      case 'hour':
        return toFormat(value, 'h', props.locale, timezone);
      case 'minute':
        return toFormat(value, 'm', props.locale, timezone);
      case 'second':
        return toFormat(value, 's', props.locale, timezone);
    }
  }, [value, timezone, props.view, props.locale]);

  const timeList = useMemo(() => {
    switch (props.view) {
      case 'ampm':
        return getMeridiem(props.locale).map((meridiem, index) => ({
          value: index,
          meridiem: props.format.includes('A')
            ? meridiem.upper
            : meridiem.lower,
        }));

      case 'hour':
        return getHours(props);
      case 'minute':
        return getMinutes(props);
      case 'second':
        return getSeconds(props);
    }
  }, [props]);

  return { timeValue, timeList };
};
