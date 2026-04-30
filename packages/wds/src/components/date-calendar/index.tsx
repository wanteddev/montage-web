import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import dayjs from 'dayjs';
import {
  IconCaretDown,
  IconCaretUp,
  IconChevronLeftSmall,
  IconChevronRightSmall,
} from '@wanteddev/wds-icon';
import { Box, type DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import { useRef } from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';

import { FlexBox } from '../flex-box';
import { TextButton } from '../text-button';
import { IconButton } from '../icon-button';
import { Grid } from '../grid';
import { GridItem } from '../grid-item';
import { WithInteraction } from '../with-interaction';
import { ScrollArea } from '../scroll-area';
import { Typography } from '../typography';
import { extendDayjs } from '../../utils/internal/date';

import {
  dateCalendarHeaderLabelButtonStyle,
  dateCalendarHeaderLabelStyle,
  dateCalendarHeaderNavigationStyle,
  dateCalendarHeaderStyle,
  dateCalendarStyle,
  dateCalendarWrapperStyle,
  dateYearMonthWrapperStyle,
  dayItemButtonStyle,
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
  scrollIntoViewDate,
} from './helpers';

import type { Dayjs } from 'dayjs';
import type { KeyboardEvent, ReactNode } from 'react';
import type {
  DateCalendarProps,
  DateItemProps,
  DayCalendarProps,
  MonthCalendarProps,
  ViewType,
  YearCalendarProps,
} from './types';

extendDayjs();

const DateCalendar = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<DateCalendarProps, 'div'>
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
      locale = 'ko-KR',
      yearsOrder = 'asc',
      timezone,
      disabled,
      readOnly,
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
        if (disabled || readOnly) return;

        switch (newView) {
          case 'year': {
            if (isOnlySelectYear) {
              setValue(newValue);
              onChangeComplete?.(newValue);
            } else {
              setDefaultSelectedDate(dateTypeToDateObject(newValue, timezone));
              setView(views.includes('month') ? 'month' : 'day');
            }
            break;
          }
          case 'month': {
            if (isOnlySelectMonth || !views.includes('day')) {
              setValue(newValue);
              onChangeComplete?.(newValue);
            } else {
              setDefaultSelectedDate(dateTypeToDateObject(newValue, timezone));
              setView('day');
            }
            break;
          }
          case 'day': {
            setValue(newValue);
            onChangeComplete?.(newValue);
            break;
          }
        }
      },
      [
        disabled,
        isOnlySelectMonth,
        isOnlySelectYear,
        onChangeComplete,
        readOnly,
        setDefaultSelectedDate,
        setValue,
        setView,
        timezone,
        views,
      ],
    );

    const weekdays = useMemo(() => getWeekdays(locale), [locale]);

    const calendarComponent: { [key in ViewType]: ReactNode } = {
      year: <YearCalendar order={yearsOrder} />,
      month: <MonthCalendar />,
      day: <DayCalendar />,
    };

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
            aria-label={`Select ${view}`}
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
                      color="assistive"
                      size="medium"
                      aria-expanded={headerExpanded}
                      sx={[
                        dateCalendarHeaderLabelButtonStyle,
                        (isOnlySelectDay || isOnlySelectMonth) && {
                          pointerEvents: 'none',
                        },
                      ]}
                      trailingContent={
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
                    {views.includes('day') && (
                      <>
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
                      </>
                    )}
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
                      color="semantic.label.alternative"
                      align="center"
                    >
                      {day.narrow}
                    </Typography>
                  ))}
                </FlexBox>
              )}
            </FlexBox>

            <FlexBox sx={{ paddingBottom: 14 }} flexDirection="column">
              {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
              {calendarComponent[view ?? 'day']}
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
  DefaultComponentPropsInternal<YearCalendarProps, 'div'>
>(({ order = 'asc', ...props }, ref) => {
  const {
    min,
    max,
    defaultSelectedDate,
    handleNextView,
    now,
    value,
    containerRef,
    timezone,
  } = useDateCalendarContext('YearCalendar');

  const yearRange = useMemo(() => {
    const startDate = dayjsTimezone(
      dayjs(min ?? ACCESSIBLE_MIN_DATE),
      timezone,
    );
    const endDate = dayjsTimezone(dayjs(max ?? ACCESSIBLE_MAX_DATE), timezone);
    const years: Array<number> = [];

    let current = startDate;

    while (current.year() <= endDate.year()) {
      years.push(current.get('year'));
      current = current.add(1, 'year');
    }

    return order === 'asc' ? years : years.reverse();
  }, [min, timezone, max, order]);

  const [focusedIdx, setFocusedIdx] = useState(yearRange.length > 0 ? 0 : -1);

  useEffect(
    () => {
      const selectedDateIdx = isValidDate(value)
        ? yearRange.findIndex(
            (v) => v === dayjsTimezone(dayjs(value), timezone).year(),
          )
        : -1;

      if (selectedDateIdx !== -1) {
        scrollIntoViewDate('year', yearRange[selectedDateIdx]!, containerRef);
        focusDate('year', yearRange[selectedDateIdx]!, containerRef);
        setFocusedIdx(selectedDateIdx);
        return;
      }

      const todayDateIdx = isValidDate(now.toDate())
        ? yearRange.findIndex((v) => v === dayjsTimezone(now, timezone).year())
        : -1;

      if (todayDateIdx !== -1) {
        scrollIntoViewDate('year', yearRange[todayDateIdx]!, containerRef);
        focusDate('year', yearRange[todayDateIdx]!, containerRef);
        setFocusedIdx(todayDateIdx);
        return;
      }

      const fallbackDateIdx = yearRange.length > 0 ? 0 : -1;

      if (fallbackDateIdx !== -1) {
        focusDate('year', yearRange[fallbackDateIdx]!, containerRef);
      }

      setFocusedIdx(fallbackDateIdx);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    yearRange.map((v) => v),
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': {
          const newYear = findClosestEnableDate({
            value: dateTypeToDateObject(
              dayjs(defaultSelectedDate).year(
                Number(e.currentTarget.getAttribute('data-year') ?? 1) - 3,
              ),
              timezone,
            ),
            min,
            max,
            timezone,
          }).getFullYear();

          focusDate('year', newYear, containerRef);
          setFocusedIdx(yearRange.findIndex((v) => v === newYear));
          e.preventDefault();
          break;
        }
        case 'ArrowDown': {
          const newYear = findClosestEnableDate({
            value: dateTypeToDateObject(
              dayjs(defaultSelectedDate).year(
                Number(e.currentTarget.getAttribute('data-year') ?? 2999) + 3,
              ),
              timezone,
            ),
            min,
            max,
            timezone,
          }).getFullYear();

          focusDate('year', newYear, containerRef);
          setFocusedIdx(yearRange.findIndex((v) => v === newYear));
          e.preventDefault();
          break;
        }
        case 'ArrowLeft': {
          const newYear = findClosestEnableDate({
            value: dateTypeToDateObject(
              dayjs(defaultSelectedDate).year(
                Number(e.currentTarget.getAttribute('data-year') ?? 1) - 1,
              ),
              timezone,
            ),
            min,
            max,
            timezone,
          }).getFullYear();

          focusDate('year', newYear, containerRef);
          setFocusedIdx(yearRange.findIndex((v) => v === newYear));
          e.preventDefault();
          break;
        }
        case 'ArrowRight': {
          const newYear = findClosestEnableDate({
            value: dateTypeToDateObject(
              dayjs(defaultSelectedDate).year(
                Number(e.currentTarget.getAttribute('data-year') ?? 2999) + 1,
              ),
              timezone,
            ),
            min,
            max,
            timezone,
          }).getFullYear();

          focusDate('year', newYear, containerRef);
          setFocusedIdx(yearRange.findIndex((v) => v === newYear));
          e.preventDefault();
          break;
        }
        case 'Home': {
          const newYear =
            yearRange[0] ??
            dayjsTimezone(dayjs(ACCESSIBLE_MIN_DATE), timezone).year();
          focusDate('year', newYear, containerRef);
          setFocusedIdx(yearRange.findIndex((v) => v === newYear));
          e.preventDefault();
          break;
        }
        case 'End': {
          const newYear =
            yearRange[yearRange.length - 1] ??
            dayjsTimezone(dayjs(ACCESSIBLE_MAX_DATE), timezone).year();

          focusDate('year', newYear, containerRef);
          setFocusedIdx(yearRange.findIndex((v) => v === newYear));
          e.preventDefault();
          break;
        }
        default:
          break;
      }
    },
    [containerRef, defaultSelectedDate, max, min, timezone, yearRange],
  );

  const handleClick = useCallback(
    (year: number) => () => {
      const newValue = findClosestEnableDate({
        min,
        max,
        value: dateTypeToDateObject(
          dayjs(defaultSelectedDate).set('year', year),
          timezone,
        ),
        timezone,
      });

      handleNextView('year', newValue);
      setFocusedIdx(yearRange.findIndex((v) => v === year));
    },
    [min, max, defaultSelectedDate, timezone, handleNextView, yearRange],
  );

  return (
    <Grid
      columnSpacing={2}
      rowSpacing={0}
      ref={ref}
      {...props}
      sx={[dateYearMonthWrapperStyle, props.sx]}
    >
      {yearRange.map((year, i) => {
        const isActive =
          Boolean(value) &&
          isValidDate(value) &&
          dayjsTimezone(dayjs(value), timezone).year() === year;

        return (
          <GridItem columns={4} key={`${year + 1} year`}>
            <DateItem
              sx={{ width: 'calc(100% - 4px)' }}
              onClick={handleClick(year)}
              data-year={year}
              isCurrent={now.year() === year}
              aria-label={`${year} Year`}
              isActive={isActive}
              onKeyDown={handleKeyDown}
              tabIndex={focusedIdx === i ? 0 : -1}
            >
              {year}
            </DateItem>
          </GridItem>
        );
      })}
    </Grid>
  );
});

YearCalendar.displayName = 'YearCalendar';

const MonthCalendar = memo(
  forwardRef<
    HTMLDivElement,
    DefaultComponentPropsInternal<MonthCalendarProps, 'div'>
  >((props, ref) => {
    const {
      min,
      max,
      defaultSelectedDate,
      locale,
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

    const [focusedIdx, setFocusedIdx] = useState(
      monthRange.findIndex((v) => !v.disabled),
    );

    useEffect(
      () => {
        const selectedDateIdx = isValidDate(value)
          ? monthRange.findIndex(
              (v) =>
                !v.disabled &&
                v.value === dayjsTimezone(dayjs(value), timezone).month(),
            )
          : -1;

        if (selectedDateIdx !== -1) {
          scrollIntoViewDate(
            'month',
            monthRange[selectedDateIdx]!.value,
            containerRef,
          );
          focusDate('month', monthRange[selectedDateIdx]!.value, containerRef);
          setFocusedIdx(selectedDateIdx);
          return;
        }

        const todayDateIdx = isValidDate(now.toDate())
          ? monthRange.findIndex(
              (v) =>
                !v.disabled &&
                v.value === dayjsTimezone(now, timezone).month() &&
                dayjsTimezone(now, timezone).year() ===
                  dayjsTimezone(dayjs(defaultSelectedDate), timezone).year(),
            )
          : -1;

        if (todayDateIdx !== -1) {
          scrollIntoViewDate(
            'month',
            monthRange[todayDateIdx]!.value,
            containerRef,
          );
          focusDate('month', monthRange[todayDateIdx]!.value, containerRef);
          setFocusedIdx(todayDateIdx);
          return;
        }

        const fallbackDateIdx = monthRange.findIndex((v) => !v.disabled);

        if (fallbackDateIdx !== -1) {
          focusDate('month', monthRange[fallbackDateIdx]!.value, containerRef);
        }

        setFocusedIdx(fallbackDateIdx);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      monthRange.map((v) => v.value),
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        const changeMonthByKeyDown = (month: number) => {
          const newMonth =
            Number(e.currentTarget.getAttribute('data-month') ?? '0') + month;

          const newValue = findClosestEnableDate({
            min,
            max,
            value: dateTypeToDateObject(
              dayjs(defaultSelectedDate).set(
                'month',
                newMonth < 0 ? 0 : newMonth > 11 ? 11 : newMonth,
              ),
              timezone,
            ),
            timezone,
          });

          setFocusedIdx(
            monthRange.findIndex((v) => v.value === newValue.getMonth()),
          );

          requestAnimationFrame(() => {
            focusDate('month', newValue.getMonth(), containerRef);
          });
        };

        switch (e.key) {
          case 'ArrowUp':
            changeMonthByKeyDown(-3);
            e.preventDefault();
            break;
          case 'ArrowDown':
            changeMonthByKeyDown(3);
            e.preventDefault();
            break;
          case 'ArrowLeft':
            changeMonthByKeyDown(-1);
            e.preventDefault();
            break;
          case 'ArrowRight':
            changeMonthByKeyDown(1);
            e.preventDefault();
            break;

          case 'Home':
            changeMonthByKeyDown(0);
            e.preventDefault();
            break;
          case 'End':
            changeMonthByKeyDown(11);
            e.preventDefault();
            break;
          default:
            break;
        }
      },
      [containerRef, defaultSelectedDate, max, min, monthRange, timezone],
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

        handleNextView('month', newValue);
        setFocusedIdx(monthRange.findIndex((v) => v.value === newMonth));
      },
      [defaultSelectedDate, handleNextView, max, min, monthRange, timezone],
    );

    return (
      <Grid
        columnSpacing={2}
        rowSpacing={0}
        ref={ref}
        {...props}
        sx={[dateYearMonthWrapperStyle, props.sx]}
      >
        {monthRange.map((month, i) => (
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
              tabIndex={focusedIdx === i ? 0 : -1}
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
  forwardRef<
    HTMLDivElement,
    DefaultComponentPropsInternal<DayCalendarProps, 'div'>
  >((props, ref) => {
    const {
      min,
      max,
      defaultSelectedDate,
      value,
      handleNextView,
      setDefaultSelectedDate,
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
            isOtherMonth: true,
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
            isOtherMonth: false,
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
            isOtherMonth: true,
          };
        });

      return [...monDaysWithPrevMonthDays, ...nextMonthDays];
    }, [defaultSelectedDate, max, min, timezone]);

    const dayRangeRow = useMemo(() => {
      return dayRange.reduce(
        (acc, cur, idx) => {
          const chunkIndex = Math.floor(idx / 7);

          if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
          }

          acc[chunkIndex].push(cur);

          return acc;
        },
        [] as Array<typeof dayRange>,
      );
    }, [dayRange]);

    const [focusedIdx, setFocusedIdx] = useState(
      dayRange.findIndex((v) => !v.isOtherMonth),
    );

    // first focus
    useEffect(
      () => {
        const selectedDateIdx = isValidDate(value)
          ? dayRange.findIndex(
              (v) =>
                !v.isOtherMonth &&
                !v.disabled &&
                v.value.format('YYYY MM DD') ===
                  dayjsTimezone(dayjs(value), timezone).format('YYYY MM DD'),
            )
          : -1;

        if (selectedDateIdx !== -1) {
          setFocusedIdx(selectedDateIdx);
          focusDate(
            'day',
            dayRange[selectedDateIdx]!.value.date(),
            containerRef,
          );
          return;
        }

        const todayDateIdx = isValidDate(now.toDate())
          ? dayRange.findIndex(
              (v) =>
                !v.isOtherMonth &&
                !v.disabled &&
                v.value.format('YYYY MM DD') ===
                  dayjsTimezone(now, timezone).format('YYYY MM DD'),
            )
          : -1;

        if (todayDateIdx !== -1) {
          setFocusedIdx(todayDateIdx);
          focusDate('day', dayRange[todayDateIdx]!.value.date(), containerRef);
          return;
        }

        const fallbackDateIdx = dayRange.findIndex(
          (v) => !v.isOtherMonth && !v.disabled,
        );

        if (fallbackDateIdx !== -1) {
          focusDate(
            'day',
            dayRange[fallbackDateIdx]!.value.date(),
            containerRef,
          );
        }

        setFocusedIdx(fallbackDateIdx);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dayRange.map((v) => v.value.format('YYYY MM DD')),
    );

    const handleClick = useCallback(
      (v: Date) => () => {
        const newValue = findClosestEnableDate({
          min,
          max,
          value: v,
          timezone,
        });

        handleNextView('day', newValue);
        setFocusedIdx(
          dayRange.findIndex(
            (day) =>
              !day.isOtherMonth &&
              !day.disabled &&
              day.value.format('YYYY MM DD') ===
                dayjsTimezone(dayjs(newValue), timezone).format('YYYY MM DD'),
          ),
        );
      },
      [dayRange, handleNextView, max, min, timezone],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        const changeDateByKeyDown = (date: number | Dayjs) => {
          let newValue: Date;

          if (typeof date === 'number') {
            const newDay =
              Number(e.currentTarget.getAttribute('data-date') ?? '0') + date;

            newValue = findClosestEnableDate({
              min,
              max,
              value: dateTypeToDateObject(
                dayjs(defaultSelectedDate).set('date', newDay),
                timezone,
              ),
              timezone,
            });
          } else {
            newValue = findClosestEnableDate({
              min,
              max,
              value: dateTypeToDateObject(date, timezone),
              timezone,
            });
          }

          setDefaultSelectedDate(newValue);
          setFocusedIdx(
            dayRange.findIndex(
              (v) =>
                v.value.format('YYYY MM DD') ===
                dayjsTimezone(dayjs(newValue), timezone).format('YYYY MM DD'),
            ),
          );

          requestAnimationFrame(() => {
            focusDate('day', newValue.getDate(), containerRef);
          });
        };

        switch (e.key) {
          case 'ArrowUp':
            changeDateByKeyDown(-7);
            e.preventDefault();
            break;
          case 'ArrowDown':
            changeDateByKeyDown(7);
            e.preventDefault();
            break;
          case 'ArrowLeft': {
            changeDateByKeyDown(-1);
            e.preventDefault();
            break;
          }
          case 'ArrowRight': {
            changeDateByKeyDown(1);
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
      [
        containerRef,
        dayRange,
        defaultSelectedDate,
        max,
        min,
        setDefaultSelectedDate,
        timezone,
      ],
    );

    return (
      <FlexBox
        flexWrap="wrap"
        ref={ref}
        role="rowgroup"
        {...props}
        columnGap="0px"
        rowGap="2px"
        sx={[dateYearMonthWrapperStyle, props.sx]}
      >
        {dayRangeRow.map((days, idx) => (
          <FlexBox
            key={`${dayjsTimezone(dayjs(defaultSelectedDate), timezone).year()} / ${defaultSelectedDate.getMonth() + 1} / ${idx}`}
            role="row"
            aria-rowindex={idx + 1}
          >
            {days.map((day, dayIdx) => {
              const isSelected =
                isValidDate(value) &&
                day.value.format('YYYY MM DD') ===
                  dayjsTimezone(dayjs(value), timezone).format('YYYY MM DD');

              const isOtherMonth =
                day.value.month() !==
                dayjsTimezone(dayjs(defaultSelectedDate), timezone).month();

              return (
                <DayItem
                  key={`${day.value.year()} / ${day.value.month()} / ${day.label} / ${dayIdx}`}
                  sx={{ width: '32px' }}
                  role="gridcell"
                  disabled={day.disabled}
                  isActive={isSelected}
                  isOtherMonth={isOtherMonth}
                  isCurrent={
                    now.format('YYYY MM DD') ===
                    dayjs(day.value).format('YYYY MM DD')
                  }
                  data-date={day.label}
                  tabIndex={focusedIdx === idx * 7 + dayIdx ? 0 : -1}
                  aria-colindex={dayIdx + 1}
                  aria-label={day.label.toString()}
                  onClick={handleClick(
                    dateTypeToDateObject(day.value, timezone),
                  )}
                  onKeyDown={handleKeyDown}
                >
                  {day.label}
                </DayItem>
              );
            })}
          </FlexBox>
        ))}
      </FlexBox>
    );
  }),
);

DayCalendar.displayName = 'DayCalendar';

const DateItem = memo(
  forwardRef<
    HTMLButtonElement,
    DefaultComponentPropsInternal<DateItemProps, 'button'>
  >(({ disabled, isCurrent, isOtherMonth, isActive, ...props }, ref) => {
    return (
      <WithInteraction disabled={disabled} variant="light">
        <Box
          as="button"
          disabled={disabled}
          ref={ref}
          role="radio"
          type="button"
          {...props}
          aria-checked={isActive}
          aria-disabled={disabled}
          aria-current={isCurrent ? 'date' : undefined}
          data-other-month={isOtherMonth}
          sx={[dayItemButtonStyle, { borderRadius: 8 }, props.sx]}
        />
      </WithInteraction>
    );
  }),
);

DateItem.displayName = 'DateItem';

const DayItem = forwardRef<
  HTMLButtonElement,
  DefaultComponentPropsInternal<DateItemProps, 'button'>
>(({ disabled, isCurrent, isOtherMonth, isActive, ...props }, ref) => {
  return (
    <WithInteraction disabled={disabled} variant="light">
      <Box
        as="button"
        disabled={disabled}
        ref={ref}
        role="gridcell"
        type="button"
        {...props}
        aria-selected={isActive}
        aria-disabled={disabled}
        aria-current={isCurrent ? 'date' : undefined}
        data-other-month={isOtherMonth}
        sx={[dayItemButtonStyle, props.sx]}
      />
    </WithInteraction>
  );
});

DayItem.displayName = 'DayItem';

export { DateCalendar };

export type { DateCalendarProps };
