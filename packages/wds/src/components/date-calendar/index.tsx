import { forwardRef, memo, useCallback, useEffect, useMemo } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import weekday from 'dayjs/plugin/weekday';
import utc from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';
import {
  IconCaretDown,
  IconCaretUp,
  IconChevronLeftSmall,
  IconChevronRightSmall,
} from '@wanteddev/wds-icon';
import { Box, type DefaultComponentProps } from '@wanteddev/wds-engine';
import {
  RovingFocusGroup,
  RovingFocusGroupItem,
} from '@radix-ui/react-roving-focus';
import { useRef } from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { composeEventHandlers } from '@radix-ui/primitive';
import { flushSync } from 'react-dom';

import FlexBox from '../flex-box';
import TextButton from '../text-button';
import IconButton from '../icon-button';
import Grid from '../grid';
import GridItem from '../grid-item';
import WithInteraction from '../with-interaction';
import ScrollArea from '../scroll-area';
import Typography from '../typography';

import {
  dateCalendarHeaderLabelButtonStyle,
  dateCalendarHeaderLabelStyle,
  dateCalendarHeaderNavigationStyle,
  dateCalendarHeaderStyle,
  dateCalendarStyle,
  dateCalendarWrapperStyle,
  dateItemButtonStyle,
  dateYearMonthWrapperStyle,
  stickyDateCalendarStyle,
  weekdayCellStyle,
} from './style';
import { useDefaultSelectedDate } from './hooks';
import { ACCESSIBLE_MAX_DATE, ACCESSIBLE_MIN_DATE } from './constants';
import {
  DateCalendarContextProvider,
  useDateCalendarContext,
} from './contexts';
import {
  dateTypeToDateObject,
  dayjsTimezone,
  findClosestEnableDate,
  focusDate,
  getWeekdays,
  isDisabledDate,
  isValidDate,
} from './helpers';

import type { Dayjs } from 'dayjs';
import type { KeyboardEvent, ReactNode } from 'react';
import type {
  DateCalendarProps,
  DateItemProps,
  DateType,
  ViewType,
} from './types';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(weekday);
dayjs.extend(utc);
dayjs.extend(timezonePlugin);

const DateCalendar = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<DateCalendarProps, 'div'>
>(
  (
    {
      value: originValue,
      defaultValue,
      onChange,
      onChangeComplete,
      max = ACCESSIBLE_MAX_DATE,
      min = ACCESSIBLE_MIN_DATE,
      views = ['year', 'day'],
      view: originView,
      defaultView: givenDefaultView = views.at(views.length - 1) ?? 'day',
      onViewChange,
      locale = 'ko',
      timezone,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      prop: originValue,
      defaultProp: defaultValue,
      onChange,
    });

    const [view, setView] = useControllableState({
      prop: originView,
      defaultProp: givenDefaultView,
      onChange: onViewChange,
    });

    const focusableElementRef = useRef<HTMLDivElement>(null);

    const { defaultSelectedDate, setDefaultSelectedDate, now } =
      useDefaultSelectedDate(value, min, max, timezone);

    const containerRef = useRef<HTMLDivElement>(null);

    const composedRefs = useComposedRefs(ref, containerRef);

    const isOnlySelectYear = views.length === 1 && views.at(0) === 'year';
    const isOnlySelectMonth = views.length === 1 && views.at(0) === 'month';
    const isOnlySelectDay = views.length === 1 && views.at(0) === 'day';

    const headerLabel = Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
      timeZone: timezone,
    }).format(defaultSelectedDate);

    const headerExpanded =
      isOnlySelectYear ||
      isOnlySelectMonth ||
      (views.includes('day') && (view === 'month' || view === 'year')) ||
      (views.includes('month') && view === 'year');

    const handleNextView = useCallback(
      (
        newView: DateCalendarProps['view'],
        newValue: DateCalendarProps['value'],
      ) => {
        switch (newView) {
          case 'year': {
            if (isOnlySelectYear) {
              onChangeComplete?.(newValue);
            } else {
              setView(views.includes('month') ? 'month' : 'day');
            }
            break;
          }
          case 'month': {
            if (isOnlySelectMonth || !views.includes('day')) {
              onChangeComplete?.(newValue);
            } else {
              setView('day');
            }
            break;
          }
          case 'day': {
            onChangeComplete?.(newValue);
            break;
          }
        }
      },
      [isOnlySelectMonth, isOnlySelectYear, onChangeComplete, setView, views],
    );

    const weekdays = useMemo(() => getWeekdays(locale), [locale]);

    const calenderComponent: { [key in ViewType]: ReactNode } = {
      year: <YearCalendar />,
      month: <MonthCalendar />,
      day: <DayCalendar />,
    };

    const isFirstRender = useRef(true);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      requestAnimationFrame(() => {
        focusableElementRef.current
          ?.querySelector<HTMLElement>('[tabIndex="0"]')
          ?.focus();
      });
    }, [view]);

    const handleSetValue = useCallback(
      (v: DateType) => {
        flushSync(() => setValue(v));
      },
      [setValue],
    );

    return (
      <DateCalendarContextProvider
        defaultSelectedDate={defaultSelectedDate}
        setDefaultSelectedDate={setDefaultSelectedDate}
        now={now}
        min={min}
        max={max}
        locale={locale}
        timezone={timezone}
        value={value}
        setValue={handleSetValue}
        handleNextView={handleNextView}
        containerRef={containerRef}
      >
        <FlexBox
          ref={composedRefs}
          wds-component="date-calendar"
          flexDirection="column"
          alignItems="flex-start"
          {...props}
          sx={[dateCalendarStyle, props.sx]}
        >
          <ScrollArea
            sx={dateCalendarWrapperStyle}
            zIndex={11}
            role={view === 'day' ? 'grid' : 'radiogroup'}
          >
            <FlexBox
              sx={stickyDateCalendarStyle}
              data-role="date-calendar-header"
              flexDirection="column"
            >
              {!isOnlySelectYear && (
                <FlexBox sx={dateCalendarHeaderStyle} alignItems="center">
                  <FlexBox sx={dateCalendarHeaderLabelStyle} flex="1">
                    <TextButton
                      wds-ignore-first-focus="true"
                      onClick={() => {
                        if (isOnlySelectDay || isOnlySelectMonth) return;

                        setView((prev) => {
                          switch (prev) {
                            case 'year':
                              return views.includes('day') ? 'day' : 'month';
                            case 'month':
                              return views.includes('day') ? 'day' : 'year';
                            case 'day':
                              return views.includes('year') ? 'year' : 'month';
                          }
                        });
                      }}
                      variant="assistive"
                      size="medium"
                      aria-expanded={headerExpanded}
                      sx={[
                        dateCalendarHeaderLabelButtonStyle,
                        (isOnlySelectDay || isOnlySelectMonth) && {
                          pointerEvents: 'none',
                        },
                      ]}
                      rightContent={
                        isOnlySelectDay ||
                        isOnlySelectMonth ? null : headerExpanded ? (
                          <IconCaretUp />
                        ) : (
                          <IconCaretDown />
                        )
                      }
                    >
                      {headerLabel}
                    </TextButton>
                  </FlexBox>

                  <FlexBox gap="18px" sx={dateCalendarHeaderNavigationStyle}>
                    <IconButton
                      wds-ignore-first-focus="true"
                      size={18}
                      aria-label="Previous month"
                      disabled={
                        isValidDate(min) &&
                        dayjsTimezone(
                          dayjs(defaultSelectedDate),
                          timezone,
                        ).isSameOrBefore(
                          dateTypeToDateObject(min, timezone),
                          'month',
                        )
                      }
                      onClick={() =>
                        setDefaultSelectedDate(
                          dateTypeToDateObject(
                            dayjsTimezone(
                              dayjs(defaultSelectedDate),
                              timezone,
                            ).subtract(1, 'month'),
                            timezone,
                          ),
                        )
                      }
                    >
                      <IconChevronLeftSmall />
                    </IconButton>

                    <IconButton
                      wds-ignore-first-focus="true"
                      size={18}
                      aria-label="Next month"
                      disabled={
                        isValidDate(max) &&
                        dayjsTimezone(
                          dayjs(defaultSelectedDate),
                          timezone,
                        ).isSameOrAfter(
                          dayjs(dateTypeToDateObject(max, timezone)),
                          'month',
                        )
                      }
                      onClick={() =>
                        setDefaultSelectedDate(
                          dateTypeToDateObject(
                            dayjsTimezone(
                              dayjs(defaultSelectedDate),
                              timezone,
                            ).add(1, 'month'),
                            timezone,
                          ),
                        )
                      }
                    >
                      <IconChevronRightSmall />
                    </IconButton>
                  </FlexBox>
                </FlexBox>
              )}

              {view === 'day' && (
                <FlexBox role="row" sx={dateCalendarHeaderLabelStyle}>
                  {weekdays.map((day, i) => (
                    <Typography
                      key={day.long + i}
                      role="columnheader"
                      aria-label={day.long}
                      sx={weekdayCellStyle}
                      variant="caption2"
                      weight="medium"
                      color="palette.label.alternative"
                      align="center"
                    >
                      {day.narrow}
                    </Typography>
                  ))}
                </FlexBox>
              )}
            </FlexBox>

            <FlexBox
              sx={{ paddingBottom: 14 }}
              flexDirection="column"
              ref={focusableElementRef}
            >
              {calenderComponent[view ?? 'day']}
            </FlexBox>
          </ScrollArea>
        </FlexBox>
      </DateCalendarContextProvider>
    );
  },
);

DateCalendar.displayName = 'DateCalendar';

const YearCalendar = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<{}, 'div'>
>((props, ref) => {
  const {
    min,
    max,
    defaultSelectedDate,
    setValue,
    handleNextView,
    now,
    value,
    containerRef,
    timezone,
  } = useDateCalendarContext('YearCalendar');

  const yearRange = useMemo(() => {
    const startDate = dayjsTimezone(dayjs(min ?? ACCESSIBLE_MIN_DATE), timezone)
      .set('month', 0)
      .set('day', 1);
    const endDate = dayjsTimezone(dayjs(max ?? ACCESSIBLE_MAX_DATE), timezone)
      .set('month', 11)
      .set('day', 31);
    const years: Array<number> = [];

    let current = startDate;

    while (current.isBefore(endDate, 'year')) {
      years.push(current.get('year'));
      current = current.add(1, 'year');
    }

    return years;
  }, [min, max, timezone]);

  return (
    <RovingFocusGroup asChild>
      <Grid
        columnSpacing={2}
        rowSpacing={0}
        ref={ref}
        {...props}
        sx={[dateYearMonthWrapperStyle, props.sx]}
      >
        {yearRange.map((year) => (
          <GridItem columns={4} key={`${year + 1} year`}>
            <RovingFocusGroupItem
              active={dayjs(defaultSelectedDate).year() === year}
              asChild
              onKeyDown={(e) => {
                switch (e.key) {
                  case 'ArrowUp':
                    focusDate(
                      'year',
                      findClosestEnableDate({
                        value: dateTypeToDateObject(
                          dayjs(defaultSelectedDate).subtract(3, 'year'),
                          timezone,
                        ),
                        min,
                        max,
                        timezone,
                      }).getFullYear(),
                      containerRef,
                    );
                    e.preventDefault();
                    break;
                  case 'ArrowDown':
                    focusDate(
                      'year',
                      findClosestEnableDate({
                        value: dateTypeToDateObject(
                          dayjs(defaultSelectedDate).add(3, 'year'),
                          timezone,
                        ),
                        min,
                        max,
                        timezone,
                      }).getFullYear(),
                      containerRef,
                    );
                    e.preventDefault();
                    break;
                  case 'ArrowLeft': {
                    focusDate(
                      'year',
                      findClosestEnableDate({
                        value: dateTypeToDateObject(
                          dayjs(defaultSelectedDate).subtract(1, 'year'),
                          timezone,
                        ),
                        min,
                        max,
                        timezone,
                      }).getFullYear(),
                      containerRef,
                    );
                    e.preventDefault();
                    break;
                  }
                  case 'ArrowRight': {
                    focusDate(
                      'year',
                      findClosestEnableDate({
                        value: dateTypeToDateObject(
                          dayjs(defaultSelectedDate).add(1, 'year'),
                          timezone,
                        ),
                        min,
                        max,
                        timezone,
                      }).getFullYear(),
                      containerRef,
                    );
                    e.preventDefault();
                    break;
                  }
                  case 'Home':
                    focusDate(
                      'year',
                      yearRange[0] ??
                        dayjsTimezone(
                          dayjs(ACCESSIBLE_MIN_DATE),
                          timezone,
                        ).year(),
                      containerRef,
                    );
                    e.preventDefault();
                    break;
                  case 'End':
                    focusDate(
                      'year',
                      yearRange[yearRange.length - 1] ??
                        dayjsTimezone(
                          dayjs(ACCESSIBLE_MAX_DATE),
                          timezone,
                        ).year(),
                      containerRef,
                    );
                    e.preventDefault();
                    break;
                  default:
                    break;
                }
              }}
            >
              <DateItem
                sx={{ width: 'calc(100% - 4px)' }}
                onClick={() => {
                  const newValue = findClosestEnableDate({
                    min,
                    max,
                    value: dateTypeToDateObject(
                      dayjs(defaultSelectedDate).set('year', year),
                      timezone,
                    ),

                    timezone,
                  });

                  setValue(newValue);
                  handleNextView('year', newValue);
                }}
                data-year={year}
                isCurrent={now.year() === year}
                aria-label={`${year} Year`}
                isActive={
                  Boolean(value) &&
                  dayjsTimezone(dayjs(value), timezone).year() === year
                }
              >
                {year}
              </DateItem>
            </RovingFocusGroupItem>
          </GridItem>
        ))}
      </Grid>
    </RovingFocusGroup>
  );
});

YearCalendar.displayName = 'YearCalendar';

const MonthCalendar = memo(
  forwardRef<HTMLDivElement, DefaultComponentProps<{}, 'div'>>((props, ref) => {
    const {
      min,
      max,
      defaultSelectedDate,
      locale,
      setValue,
      handleNextView,
      now,
      value,
      containerRef,
      timezone,
    } = useDateCalendarContext('MonthCalendar');

    const monthRange = useMemo(() => {
      return new Array(12).fill(0).map((_, i) => {
        const minDate = dayjsTimezone(
          dayjs(min ?? ACCESSIBLE_MIN_DATE),
          timezone,
        );
        const maxDate = dayjsTimezone(
          dayjs(max ?? ACCESSIBLE_MAX_DATE),
          timezone,
        );

        const minDateCurrentMonth = dayjsTimezone(dayjs(minDate), timezone).set(
          'month',
          i,
        );
        const maxDateCurrentMonth = dayjsTimezone(dayjs(maxDate), timezone).set(
          'month',
          i,
        );

        return {
          value: i,
          label: Intl.DateTimeFormat(locale, {
            month: 'short',
          }).format(dateTypeToDateObject(dayjs().set('month', i), timezone)),
          disabled:
            (minDateCurrentMonth.isBefore(minDate, 'month') &&
              minDate.year() >=
                dayjsTimezone(dayjs(defaultSelectedDate), timezone).year()) ||
            (maxDateCurrentMonth.isAfter(maxDate, 'month') &&
              maxDate.year() <=
                dayjsTimezone(dayjs(defaultSelectedDate), timezone).year()),
        };
      });
    }, [min, timezone, max, locale, defaultSelectedDate]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        const changeMonthByKeyDown = (newDate: Dayjs) => {
          const newValue = findClosestEnableDate({
            min,
            max,
            value: dateTypeToDateObject(newDate, timezone),
            timezone,
          });

          setTimeout(() => setValue(newValue));

          focusDate('month', newValue.getMonth(), containerRef);
        };

        switch (e.key) {
          case 'ArrowUp':
            changeMonthByKeyDown(
              dayjsTimezone(dayjs(defaultSelectedDate), timezone).subtract(
                3,
                'month',
              ),
            );
            e.preventDefault();
            break;
          case 'ArrowDown':
            changeMonthByKeyDown(
              dayjsTimezone(dayjs(defaultSelectedDate), timezone).add(
                3,
                'month',
              ),
            );
            e.preventDefault();
            break;
          case 'ArrowLeft':
            changeMonthByKeyDown(
              dayjsTimezone(dayjs(defaultSelectedDate), timezone).subtract(
                1,
                'month',
              ),
            );
            e.preventDefault();
            break;
          case 'ArrowRight':
            changeMonthByKeyDown(
              dayjsTimezone(dayjs(defaultSelectedDate), timezone).add(
                1,
                'month',
              ),
            );
            e.preventDefault();
            break;

          case 'Home':
            changeMonthByKeyDown(
              dayjsTimezone(dayjs(defaultSelectedDate), timezone).set(
                'month',
                monthRange[0]?.value ?? 0,
              ),
            );
            e.preventDefault();
            break;
          case 'End':
            changeMonthByKeyDown(
              dayjsTimezone(dayjs(defaultSelectedDate), timezone).set(
                'month',
                monthRange[monthRange.length - 1]?.value ?? 11,
              ),
            );
            e.preventDefault();
            break;
          default:
            break;
        }
      },
      [
        containerRef,
        defaultSelectedDate,
        max,
        min,
        monthRange,
        setValue,
        timezone,
      ],
    );

    const handleClick = useCallback(
      (newMonth: number) => () => {
        const newValue = findClosestEnableDate({
          min,
          max,
          timezone,
          value: dateTypeToDateObject(
            dayjs(defaultSelectedDate).set('month', newMonth),
            timezone,
          ),
        });

        setValue(newValue);
        handleNextView('month', newValue);
      },
      [defaultSelectedDate, handleNextView, max, min, setValue, timezone],
    );

    return (
      <Grid
        columnSpacing={2}
        rowSpacing={0}
        ref={ref}
        {...props}
        sx={[dateYearMonthWrapperStyle, props.sx]}
        tabIndex={0}
        onFocus={composeEventHandlers(props.onFocus, (e) => {
          if (e.target === e.currentTarget) {
            e.preventDefault();

            (
              e.currentTarget.querySelector<HTMLButtonElement>(
                '[aria-checked="true"]',
              ) ??
              e.currentTarget.querySelector<HTMLButtonElement>(
                '[data-current="date"]',
              ) ??
              e.currentTarget.querySelector<HTMLButtonElement>('[role="radio"]')
            )?.focus();
          }
        })}
      >
        {monthRange.map((month) => (
          <GridItem
            columns={4}
            key={`${dayjsTimezone(dayjs(defaultSelectedDate), timezone).year()} / ${month.label}`}
          >
            <DateItem
              sx={{ width: 'calc(100% - 4px)' }}
              onClick={handleClick(month.value)}
              disabled={month.disabled}
              isCurrent={
                now.month() === month.value &&
                now.year() ===
                  dayjsTimezone(dayjs(defaultSelectedDate), timezone).year()
              }
              data-month={month.value}
              aria-label={month.label}
              isActive={
                Boolean(value) &&
                dayjsTimezone(dayjs(value), timezone).month() === month.value
              }
              onKeyDown={handleKeyDown}
            >
              {month.label}
            </DateItem>
          </GridItem>
        ))}
      </Grid>
    );
  }),
);

MonthCalendar.displayName = 'MonthCalendar';

const DayCalendar = memo(
  forwardRef<HTMLDivElement, DefaultComponentProps<{}, 'div'>>((props, ref) => {
    const {
      min,
      max,
      defaultSelectedDate,
      value,
      setValue,
      handleNextView,
      now,
      containerRef,
      timezone,
    } = useDateCalendarContext('DayCalendar');

    const dayRange = useMemo(() => {
      const firstDayOfMonth = dayjsTimezone(
        dayjs(defaultSelectedDate),
        timezone,
      ).set('date', 1);

      const prevMonthDays = new Array(firstDayOfMonth.weekday())
        .fill(0)
        .map((_, i) => {
          const nextDay = firstDayOfMonth.day(i);

          return {
            value: nextDay,
            disabled: isDisabledDate({
              min,
              max,
              value: dateTypeToDateObject(nextDay, timezone),
              timezone,
            }),
            label: nextDay.date(),
          };
        });

      const monthDays = new Array(firstDayOfMonth.daysInMonth())
        .fill(0)
        .map((_, i) => {
          const nextDay = firstDayOfMonth.date(i + 1);

          return {
            value: nextDay,
            disabled: isDisabledDate({
              min,
              max,
              value: dateTypeToDateObject(nextDay, timezone),
              timezone,
            }),
            label: nextDay.date(),
          };
        });

      const monDaysWithPrevMonthDays = [...prevMonthDays, ...monthDays];

      const nextMonthDays = new Array(
        monDaysWithPrevMonthDays.length / 7 > 5
          ? 6 - firstDayOfMonth.date(firstDayOfMonth.daysInMonth()).weekday()
          : 13 - firstDayOfMonth.date(firstDayOfMonth.daysInMonth()).weekday(),
      )
        .fill(0)
        .map((_, i) => {
          const nextDay = firstDayOfMonth.date(
            firstDayOfMonth.daysInMonth() + i + 1,
          );

          return {
            value: nextDay,
            disabled: isDisabledDate({
              min,
              max,
              value: dateTypeToDateObject(nextDay, timezone),
              timezone,
            }),
            label: nextDay.date(),
          };
        });

      return [...monDaysWithPrevMonthDays, ...nextMonthDays].reduce(
        (acc, cur, idx) => {
          const chunkIndex = Math.floor(idx / 7);

          if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
          }

          acc[chunkIndex]?.push(cur);

          return acc;
        },
        [] as Array<typeof monthDays>,
      );
    }, [defaultSelectedDate, max, min, timezone]);

    const handleClick = useCallback(
      (v: Date) => () => {
        const newValue = findClosestEnableDate({
          min,
          max,
          value: v,
          timezone,
        });

        setValue(newValue);
        handleNextView('day', newValue);
      },
      [handleNextView, max, min, setValue, timezone],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        const changeDateByKeyDown = (newDate: Dayjs) => {
          const newValue = findClosestEnableDate({
            min,
            max,
            value: dateTypeToDateObject(newDate, timezone),
            timezone,
          });

          setTimeout(() => setValue(newValue));

          focusDate('day', newValue.getDate(), containerRef);
        };

        switch (e.key) {
          case 'ArrowUp':
            changeDateByKeyDown(dayjs(defaultSelectedDate).subtract(7, 'day'));
            e.preventDefault();
            break;
          case 'ArrowDown':
            changeDateByKeyDown(dayjs(defaultSelectedDate).add(7, 'day'));
            e.preventDefault();
            break;
          case 'ArrowLeft': {
            changeDateByKeyDown(dayjs(defaultSelectedDate).subtract(1, 'day'));
            e.preventDefault();
            break;
          }
          case 'ArrowRight': {
            changeDateByKeyDown(dayjs(defaultSelectedDate).add(1, 'day'));
            e.preventDefault();
            break;
          }
          case 'Home':
            changeDateByKeyDown(
              dayjs(defaultSelectedDate).subtract(
                dayjs(defaultSelectedDate).weekday(),
                'day',
              ),
            );
            e.preventDefault();
            break;
          case 'End':
            changeDateByKeyDown(
              dayjs(defaultSelectedDate).add(
                6 - dayjs(defaultSelectedDate).weekday(),
                'day',
              ),
            );
            e.preventDefault();
            break;
          case 'PageDown':
            changeDateByKeyDown(
              dayjs(defaultSelectedDate).subtract(1, 'month'),
            );
            e.preventDefault();
            break;
          case 'PageUp':
            changeDateByKeyDown(dayjs(defaultSelectedDate).add(1, 'month'));
            e.preventDefault();
            break;
          default:
            break;
        }
      },
      [containerRef, defaultSelectedDate, max, min, setValue, timezone],
    );

    return (
      <FlexBox
        flexWrap="wrap"
        rowGap="2px"
        columnGap="0px"
        ref={ref}
        role="rowgroup"
        {...props}
        sx={[dateYearMonthWrapperStyle, props.sx]}
        tabIndex={0}
        onFocus={composeEventHandlers(props.onFocus, (e) => {
          if (e.target === e.currentTarget) {
            e.preventDefault();

            (
              e.currentTarget.querySelector<HTMLButtonElement>(
                '[aria-selected="true"]',
              ) ??
              e.currentTarget.querySelector<HTMLButtonElement>(
                '[data-current="date"]',
              ) ??
              e.currentTarget.querySelector<HTMLButtonElement>(
                '[role="gridcell"]',
              )
            )?.focus();
          }
        })}
      >
        {dayRange.map((days, idx) => (
          <FlexBox
            key={`${dayjsTimezone(dayjs(defaultSelectedDate), timezone).year()} / ${defaultSelectedDate.getMonth() + 1} / ${idx}`}
            role="row"
            aria-rowindex={idx + 1}
          >
            {days.map((day, dayIdx) => (
              <DateItem
                sx={{ width: '32px' }}
                role="gridcell"
                aria-colindex={dayIdx + 1}
                aria-checked={undefined}
                aria-selected={
                  isValidDate(value) &&
                  day.value.format('YYYY MM DD') ===
                    dayjsTimezone(dayjs(value), timezone).format('YYYY MM DD')
                }
                aria-label={day.label.toString()}
                onClick={handleClick(dateTypeToDateObject(day.value, timezone))}
                isOtherMonth={
                  day.value.month() !==
                  dayjsTimezone(dayjs(defaultSelectedDate), timezone).month()
                }
                disabled={day.disabled}
                data-day={day.label}
                isCurrent={
                  now.format('YYYY MM DD') ===
                  dayjs(day.value).format('YYYY MM DD')
                }
                isActive={
                  isValidDate(value) &&
                  day.value.format('YYYY MM DD') ===
                    dayjsTimezone(dayjs(value), timezone).format('YYYY MM DD')
                }
                key={`${day.value.year()} / ${day.value.month()} / ${day.label} / ${dayIdx}`}
                onKeyDown={handleKeyDown}
              >
                {day.label}
              </DateItem>
            ))}
          </FlexBox>
        ))}
      </FlexBox>
    );
  }),
);

DayCalendar.displayName = 'DayCalendar';

const DateItem = forwardRef<
  HTMLButtonElement,
  DefaultComponentProps<DateItemProps, 'button'>
>(({ disabled, isCurrent, isOtherMonth, isActive, ...props }, ref) => {
  return (
    <WithInteraction disabled={disabled}>
      <Box
        as="button"
        disabled={disabled}
        ref={ref}
        role="radio"
        type="button"
        aria-checked={isActive}
        {...props}
        aria-disabled={disabled}
        data-other-month={isOtherMonth}
        sx={[dateItemButtonStyle, props.sx]}
        aria-current={isCurrent ? 'date' : undefined}
      />
    </WithInteraction>
  );
});

DateItem.displayName = 'DateItem';

export default DateCalendar;
