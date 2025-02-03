import {
  forwardRef,
  memo,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import dayjs from 'dayjs';
import {
  RovingFocusGroup,
  RovingFocusGroupItem,
} from '@radix-ui/react-roving-focus';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import utc from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { composeEventHandlers } from '@radix-ui/primitive';

import FlexBox from '../flex-box';
import { ActionArea, ActionAreaButton } from '../action-area';
import { dateTypeToDateObject, dayjsTimezone } from '../date-calendar/helpers';
import ScrollArea from '../scroll-area';
import { List, ListCell } from '../list';
import { useDefaultSelectedDate } from '../date-calendar/hooks';

import {
  ACCESSIBLE_MAX_TIME,
  ACCESSIBLE_MIN_TIME,
  TIME_ITEM_NAME,
  TIME_LIST_NAME,
  TIME_UNIT_STEP,
  TIME_VIEW_ACTION_AREA_NAME,
  TIME_VIEW_NAME,
  TIME_VIEW_NOW_ACTION_AREA_BUTTON_NAME,
  TIME_VIEW_SUBMIT_ACTION_AREA_BUTTON_NAME,
} from './constants';
import {
  timeItemStyle,
  timeListScrollAreaStyle,
  timeListStyle,
  timeViewActionAreaStyle,
  timeViewStyle,
} from './style';
import { useTimeView } from './hooks';
import { TimeViewContextProvider, useTimeViewContext } from './contexts';

import type { ActionAreaProps, ActionButtonProps } from '../action-area/types';
import type * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ElementRef } from 'react';
import type {
  HourType,
  TimeItemProps,
  TimeListProps,
  TimeViewProps,
} from './types';

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

const TimeView = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<TimeViewProps, 'div'>
>(
  (
    {
      value: originValue,
      defaultValue,
      minTime = ACCESSIBLE_MIN_TIME,
      maxTime = ACCESSIBLE_MAX_TIME,
      views = ['hour', 'minute'],
      locale = 'ko-KR',
      timezone,
      disabled = false,
      readOnly = false,
      actionArea,
      onChange,
      onChangeComplete,
      sx,
      ...props
    },
    ref,
  ) => {
    const id = useId();

    const [item, setItem] = useState<HTMLDivElement | null>(null);
    const composedRefs = useComposedRefs(ref, (node) => setItem(node));

    const [value, setValue] = useControllableState({
      prop: originValue,
      defaultProp: defaultValue,
      onChange,
    });

    const { now } = useDefaultSelectedDate(value, minTime, maxTime, timezone);
    const hourType: HourType = useMemo(
      () => (views.includes('meridiem') ? '12' : '24'),
      [views],
    );

    useEffect(() => {
      if (!item) return;

      const scrollArea = item.querySelector(
        `[data-role="time-list-scroll-area"]`,
      );
      if (scrollArea) {
        (scrollArea as HTMLElement).focus();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Boolean(item)]);

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
        <FlexBox ref={composedRefs} sx={[timeViewStyle, sx]} {...props}>
          <FlexBox data-role="time-list-wrapper">
            {views.map((view, index) => (
              <TimeList
                key={`${id}-${view}`}
                view={view}
                value={value}
                locale={locale}
                timezone={timezone}
                order={
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
          {actionArea}
        </FlexBox>
      </TimeViewContextProvider>
    );
  },
);

TimeView.displayName = TIME_VIEW_NAME;

const TimeList = memo(
  forwardRef<HTMLUListElement, TimeListProps>(
    ({ view, value, locale, order, timezone }) => {
      const id = useId();
      const { hourType } = useTimeViewContext(TIME_VIEW_NAME);

      const { timeValue, timeList } = useTimeView({
        view,
        value,
        timezone,
        locale,
        hourType,
      });

      const scrollViewportRef =
        useRef<ElementRef<typeof ScrollAreaPrimitive.Viewport>>(null);

      useEffect(() => {
        if (!timeValue || !scrollViewportRef.current) return;

        const item = scrollViewportRef.current.querySelector(
          `[data-value="${timeValue}"]`,
        );
        if (item) {
          scrollViewportRef.current.scrollTop =
            (item as HTMLElement).offsetTop - 8;
        }
      }, [timeValue]);

      return (
        <RovingFocusGroup orientation="vertical" dir="ltr" asChild>
          <ScrollArea
            viewportRef={scrollViewportRef}
            size="small"
            zIndex={11}
            sx={timeListScrollAreaStyle}
            data-role="time-list-scroll-area"
          >
            <List sx={timeListStyle}>
              {timeList.map((time) => {
                if (!time) return null;

                const isMeridiem = 'meridiem' in time;
                const label = isMeridiem ? time.meridiem : time.text;
                const textValue = isMeridiem
                  ? time.value.toString()
                  : time.text;

                return (
                  <TimeItem
                    key={`${id}-${time.value}`}
                    view={view}
                    value={time.value}
                    aria-label={label}
                    data-value={textValue}
                    order={order}
                    active={timeValue ? timeValue === textValue : false}
                  >
                    {label}
                  </TimeItem>
                );
              })}
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
  DefaultComponentProps<TimeItemProps, 'li'>
>(({ value, active, order, view, children, ...props }, ref) => {
  const {
    value: viewValue,
    disabled,
    readOnly,
    now,
    hourType,
    timezone,
    onChange,
  } = useTimeViewContext(TIME_ITEM_NAME);

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
        padding="8px"
        active={active}
        value={value}
        aria-selected={active}
        sx={timeItemStyle({
          active,
          disabled,
          order,
        })}
        {...props}
        onClick={() => {
          if (readOnly) return;

          let newValue = viewValue
            ? dayjsTimezone(dayjs(viewValue), timezone)
            : now;

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
            onChange(dateTypeToDateObject(newValue, timezone));
          }
        }}
        onKeyDown={(e) => {
          if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

          const listWrapper = e.currentTarget.closest(
            '[data-role="time-list-wrapper"]',
          );
          const currentScrollArea = e.currentTarget.closest(
            '[data-role="time-list-scroll-area"]',
          );

          if (!listWrapper || !currentScrollArea) return;

          const scrollAreaList = Array.from(
            listWrapper.querySelectorAll('[data-role="time-list-scroll-area"]'),
          );
          const currentIndex = scrollAreaList.indexOf(currentScrollArea);
          const moveIndex =
            e.key === 'ArrowLeft' ? currentIndex - 1 : currentIndex + 1;

          if (moveIndex >= 0 && moveIndex < scrollAreaList.length) {
            (scrollAreaList[moveIndex] as HTMLElement).focus();
          }
        }}
      >
        {children}
      </ListCell>
    </RovingFocusGroupItem>
  );
});

TimeItem.displayName = TIME_ITEM_NAME;

const TimeViewActionArea = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ActionAreaProps, 'div'>
>(({ sx, ...props }, ref) => {
  return (
    <ActionArea
      ref={ref}
      property="compact"
      {...props}
      sx={[timeViewActionAreaStyle, sx]}
    />
  );
});

TimeViewActionArea.displayName = TIME_VIEW_ACTION_AREA_NAME;

const TimeViewNowActionAreaButton = forwardRef<
  HTMLButtonElement,
  DefaultComponentProps<ActionButtonProps, 'button'>
>(({ children, ...props }, ref) => {
  const { timezone, onChange } = useTimeViewContext(TIME_VIEW_ACTION_AREA_NAME);

  return (
    <ActionAreaButton
      ref={ref}
      variant="sub"
      textButtonVariant="assistive"
      {...props}
      onClick={composeEventHandlers(props.onClick, () => {
        let current = dayjsTimezone(dayjs(), timezone);

        const roundedMinutes =
          Math.round(current.minute() / TIME_UNIT_STEP) * TIME_UNIT_STEP;
        const roundedSeconds =
          Math.round(current.second() / TIME_UNIT_STEP) * TIME_UNIT_STEP;

        current = current.minute(roundedMinutes).second(roundedSeconds);

        onChange(current.toDate());
      })}
    >
      {children ?? '현재'}
    </ActionAreaButton>
  );
});

TimeViewNowActionAreaButton.displayName = TIME_VIEW_NOW_ACTION_AREA_BUTTON_NAME;

const TimeViewSubmitActionAreaButton = forwardRef<
  HTMLButtonElement,
  DefaultComponentProps<ActionButtonProps, 'button'>
>(({ children, ...props }, ref) => {
  const { value, onChangeComplete } = useTimeViewContext(
    TIME_VIEW_ACTION_AREA_NAME,
  );

  return (
    <ActionAreaButton
      ref={ref}
      variant="sub"
      textButtonVariant="primary"
      {...props}
      onClick={composeEventHandlers(props.onClick, () =>
        onChangeComplete?.(value),
      )}
    >
      {children ?? '적용'}
    </ActionAreaButton>
  );
});

TimeViewSubmitActionAreaButton.displayName =
  TIME_VIEW_SUBMIT_ACTION_AREA_BUTTON_NAME;

export {
  TimeView,
  TimeViewActionArea,
  TimeViewNowActionAreaButton,
  TimeViewSubmitActionAreaButton,
};
