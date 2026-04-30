import { useCallback, useState } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import dayjs from 'dayjs';

import {
  dateTypeToDateObject,
  dayjsTimezone,
  isValidDate,
} from '../date-calendar/helpers';

import { DEFAULT_RANGE_VALUE } from './constants';

import type { DateRangeType } from './types';

type UseRangeSelectionParams = {
  value?: DateRangeType;
  defaultValue?: DateRangeType;
  onChange?: (value: DateRangeType) => void;
  onChangeComplete?: (value: DateRangeType) => void;
  timezone?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export const useRangeSelection = ({
  value,
  defaultValue,
  onChange,
  onChangeComplete,
  timezone,
  disabled,
  readOnly,
}: UseRangeSelectionParams) => {
  const [rangeValue, setRangeValue] = useControllableState<DateRangeType>({
    prop: value,
    defaultProp: defaultValue ?? DEFAULT_RANGE_VALUE,
    onChange,
  });

  const [activePosition, setActivePosition] = useState<'start' | 'end'>(
    'start',
  );
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const handleDateSelect = useCallback(
    (date: Date) => {
      if (disabled || readOnly) return;

      if (activePosition === 'start') {
        const newRange: DateRangeType = [date, undefined];
        setRangeValue(newRange);
        setActivePosition('end');
      } else {
        const start = rangeValue[0];
        if (isValidDate(start)) {
          const startDate = dateTypeToDateObject(start, timezone);
          let newRange: DateRangeType;

          if (
            dayjsTimezone(dayjs(date), timezone).isBefore(
              dayjsTimezone(dayjs(startDate), timezone),
              'day',
            )
          ) {
            newRange = [date, startDate];
          } else {
            newRange = [startDate, date];
          }

          setRangeValue(newRange);
          setHoveredDate(null);
          onChangeComplete?.(newRange);
          setActivePosition('start');
        } else {
          const newRange: DateRangeType = [date, undefined];
          setRangeValue(newRange);
          setActivePosition('end');
        }
      }
    },
    [
      activePosition,
      disabled,
      onChangeComplete,
      rangeValue,
      readOnly,
      setRangeValue,
      timezone,
    ],
  );

  return {
    rangeValue,
    setRangeValue,
    activePosition,
    setActivePosition,
    hoveredDate,
    setHoveredDate,
    handleDateSelect,
  };
};
