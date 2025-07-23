import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';
import dayjs from 'dayjs';
import {
  RovingFocusGroup,
  RovingFocusGroupItem,
} from '@radix-ui/react-roving-focus';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

import { FlexBox } from '../flex-box';
import { ScrollArea } from '../scroll-area';
import { List, ListCell } from '../list';
import { useDefaultSelectedDate } from '../date-calendar/hooks';
import { dateTypeToDateObject, dayjsTimezone } from '../date-calendar/helpers';
import { extendDayjs } from '../../utils/date';

import {
  // ACCESSIBLE_MAX_TIME,
  // ACCESSIBLE_MIN_TIME,
  TIME_ITEM_NAME,
  TIME_LIST_NAME,
  TIME_VIEW_NAME,
} from './constants';
import {
  timeItemStyle,
  timeListScrollAreaStyle,
  timeListStyle,
  timeViewStyle,
} from './style';
import { useTimeList } from './hooks';
import { TimeViewContextProvider, useTimeViewContext } from './contexts';
import { scrollToTime } from './helpers';

import type * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { ElementRef, KeyboardEvent } from 'react';
import type {
  HourType,
  TimeItemProps,
  TimeListProps,
  TimeViewProps,
} from './types';

extendDayjs();

const TimeView = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<TimeViewProps, 'div'>
>(
  (
    {
      value: originValue,
      defaultValue,
      // minTime = ACCESSIBLE_MIN_TIME,
      // maxTime = ACCESSIBLE_MAX_TIME,
      views = ['hour', 'minute'],
      locale = 'ko-KR',
      timezone,
      disabled = false,
      readOnly = false,
      onChange,
      onChangeComplete,
      sx,
      ...props
    },
    ref,
  ) => {
    const id = useId();

    const [value, setValue] = useControllableState({
      prop: originValue,
      defaultProp: defaultValue,
      onChange,
    });

    // const { now } = useDefaultSelectedDate(value, minTime, maxTime, timezone);
    const { now } = useDefaultSelectedDate(
      value,
      undefined,
      undefined,
      timezone,
    );

    const hourType: HourType = useMemo(
      () => (views.includes('meridiem') ? '12' : '24'),
      [views],
    );

    return (
      <TimeViewContextProvider
        value={value}
        now={now}
        hourType={hourType}
        timezone={timezone}
        disabled={disabled}
        readOnly={readOnly}
        onChange={setValue}
        onChangeComplete={onChangeComplete}
      >
        <FlexBox
          ref={ref}
          wds-component="time-view"
          sx={[timeViewStyle, sx]}
          {...props}
        >
          {views.map((view, index) => (
            <TimeList
              key={`${id}-${view}`}
              view={view}
              value={value}
              locale={locale}
              timezone={timezone}
              variant={
                views.length === 1
                  ? 'single'
                  : index === 0
                    ? 'first'
                    : index === views.length - 1
                      ? 'last'
                      : 'middle'
              }
            />
          ))}
        </FlexBox>
      </TimeViewContextProvider>
    );
  },
);

TimeView.displayName = TIME_VIEW_NAME;

const TimeList = memo(
  forwardRef<HTMLUListElement, TimeListProps>(
    ({ view, value, locale, variant, timezone }, ref) => {
      const id = useId();

      const { hourType } = useTimeViewContext(TIME_VIEW_NAME);
      const { currentTimeValue, timeList } = useTimeList({
        view,
        value,
        timezone,
        locale,
        hourType,
      });

      const scrollViewportRef =
        useRef<ElementRef<typeof ScrollAreaPrimitive.Viewport>>(null);

      useEffect(() => {
        if (currentTimeValue) {
          scrollToTime(view, currentTimeValue, scrollViewportRef);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currentTimeValue]);

      return (
        <RovingFocusGroup tabIndex={0} orientation="vertical" dir="ltr" asChild>
          <ScrollArea
            viewportRef={scrollViewportRef}
            size="small"
            zIndex={11}
            sx={timeListScrollAreaStyle}
            data-role="time-list-scroll-area"
          >
            <List
              data-role={`time-list-${view}`}
              role="listbox"
              aria-label={`Select ${view}`}
              ref={ref}
              sx={timeListStyle}
            >
              {timeList.map((time) =>
                time ? (
                  <TimeItem
                    key={`${id}-${time.value}`}
                    view={view}
                    variant={variant}
                    currentTimeValue={currentTimeValue}
                    {...time}
                  />
                ) : null,
              )}
            </List>
          </ScrollArea>
        </RovingFocusGroup>
      );
    },
  ),
);

TimeList.displayName = TIME_LIST_NAME;

const TimeItem = forwardRef<
  HTMLLIElement,
  DefaultComponentPropsInternal<TimeItemProps, 'li'>
>(({ value, text, variant, view, currentTimeValue, ...props }, ref) => {
  const {
    value: time,
    disabled,
    readOnly,
    now,
    hourType,
    timezone,
    onChange,
    onChangeComplete,
  } = useTimeViewContext(TIME_ITEM_NAME);

  const textValue = view === 'meridiem' ? value.toString() : text;
  const active = currentTimeValue ? currentTimeValue === textValue : false;

  const handleClick = useCallback(() => {
    if (readOnly) return;

    let newValue = time ? dayjsTimezone(dayjs(time), timezone) : now;

    switch (view) {
      case 'meridiem':
        newValue = newValue.set(
          'hour',
          value === 0
            ? newValue.hour() >= 12
              ? newValue.hour() - 12
              : newValue.hour()
            : newValue.hour() < 12
              ? newValue.hour() + 12
              : newValue.hour(),
        );
        break;
      case 'hour':
        if (hourType === '12') {
          newValue = newValue.hour(
            value === 12
              ? newValue.hour() >= 12
                ? 12
                : 0
              : newValue.hour() >= 12
                ? value + 12
                : value,
          );
        } else {
          newValue = newValue.hour(value);
        }
        break;
      case 'minute':
        newValue = newValue.minute(value);
        break;
      case 'second':
        newValue = newValue.second(value);
        break;
    }

    if (newValue.isValid()) {
      const parsedDateNewValue = dateTypeToDateObject(newValue, timezone);

      onChange(parsedDateNewValue);

      if (variant === 'last' || variant === 'single') {
        onChangeComplete?.(parsedDateNewValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hourType, time, timezone, value, variant, onChangeComplete]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

    const timeViewElement = e.currentTarget.closest(
      '[wds-component="time-view"]',
    );
    const currentTimeListScrollArea = e.currentTarget.closest(
      '[data-role="time-list-scroll-area"]',
    );

    if (!timeViewElement || !currentTimeListScrollArea) return;

    const scrollAreaList = Array.from(
      timeViewElement.querySelectorAll('[data-role="time-list-scroll-area"]'),
    );
    const currentIndex = scrollAreaList.indexOf(currentTimeListScrollArea);
    const moveIndex =
      e.key === 'ArrowLeft' ? currentIndex - 1 : currentIndex + 1;

    if (moveIndex >= 0 && moveIndex < scrollAreaList.length) {
      (scrollAreaList[moveIndex] as HTMLElement).focus();
    }
  }, []);

  return (
    <RovingFocusGroupItem
      asChild
      focusable={!disabled}
      active={active}
      data-active={active}
    >
      <ListCell
        ref={ref}
        fillWidth
        verticalPadding="small"
        active={active}
        value={value}
        role="option"
        aria-selected={active}
        aria-label={text}
        data-role={`time-item-${view}`}
        {...{
          [`data-${view}`]: textValue,
        }}
        sx={timeItemStyle({
          active,
          disabled,
          variant,
        })}
        {...props}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {text}
      </ListCell>
    </RovingFocusGroupItem>
  );
});

TimeItem.displayName = TIME_ITEM_NAME;

export { TimeView };

export type { TimeViewProps };
