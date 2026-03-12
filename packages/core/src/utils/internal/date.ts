import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import weekday from 'dayjs/plugin/weekday.js';
import utc from 'dayjs/plugin/utc.js';
import timezonePlugin from 'dayjs/plugin/timezone.js';

export const extendDayjs = () => {
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isBetween);
  dayjs.extend(weekday);
  dayjs.extend(utc);
  dayjs.extend(timezonePlugin);
};
