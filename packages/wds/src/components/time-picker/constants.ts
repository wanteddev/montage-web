import type { TimeSection } from './types';

export const TIME_PICKER_NAME = 'TimePicker';
export const TIME_PICKER_INPUT_NAME = 'TimePickerInput';
export const TIME_PICKER_CONTENT_NAME = 'TimePickerContent';
export const TIME_PICKER_LIST_NAME = 'TimePickerList';
export const TIME_PICKER_ITEM_NAME = 'TimePickerItem';

export const SECTION_TO_TYPE_MAP: Record<string, TimeSection['type']> = {
  a: 'ampm',
  hh: 'hour',
  mm: 'minute',
  ss: 'second',
} as const;

export const TYPE_TO_SECTION_MAP: Record<TimeSection['type'], string> = {
  ampm: 'a',
  hour: 'hh',
  minute: 'mm',
  second: 'ss',
} as const;

export const ARROW_LEFT_KEY = 'ArrowLeft';
export const ARROW_RIGHT_KEY = 'ArrowRight';
export const ARROW_UP_KEY = 'ArrowUp';
export const ARROW_DOWN_KEY = 'ArrowDown';

export const max24Hours = 23;
export const max12Hours = 12;
export const maxMinutes = 59;
export const minHours = 1;
export const minMinutes = 0;
