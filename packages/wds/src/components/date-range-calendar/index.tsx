import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import dayjs from 'dayjs';
import {
  IconChevronLeftSmall,
  IconChevronRightSmall,
} from '@wanteddev/wds-icon';
import {
  Box,
  type DefaultComponentPropsInternal,
  useTheme,
} from '@wanteddev/wds-engine';
import { useComposedRefs } from '@radix-ui/react-compose-refs';

import { FlexBox } from '../flex-box';
import { IconButton } from '../icon-button';
import { WithInteraction } from '../with-interaction';
import { ScrollArea } from '../scroll-area';
import { Typography } from '../typography';
import { extendDayjs } from '../../utils/internal/date';
import { useMedia } from '../../hooks/internal/use-media';
import { getPreviousValue } from '../../utils/internal/responsive-props';
import { useDefaultSelectedDate } from '../date-calendar/hooks';
import {
  ACCESSIBLE_MAX_DATE,
  ACCESSIBLE_MIN_DATE,
} from '../date-calendar/constants';
import {
  dateTypeToDateObject,
  dayjsTimezone,
  findClosestEnableDate,
  getWeekdays,
  isDisabledDate,
  isValidDate,
} from '../date-calendar/helpers';

import {
  focusRangeDate,
  getDisplayRange,
  isDateInRangeForView,
  isDateInVisiblePanels,
  isSameDateForView,
  scrollIntoViewRangeDate,
} from './helpers';
import {
  rangeCalendarContainerStyle,
  rangeDayCellStyle,
  rangeDayItemStyle,
  rangeGridWrapperStyle,
  rangeMonthYearCellStyle,
  rangePanelHeaderLabelStyle,
  rangePanelHeaderNavigationStyle,
  rangePanelHeaderStyle,
  rangePanelStyle,
  rangePanelWrapperStyle,
  rangeStickyHeaderStyle,
  rangeWeekdayCellStyle,
} from './style';
import { useRangeSelection } from './hooks';
import {
  DateRangeCalendarContextProvider,
  useDateRangeCalendarContext,
} from './contexts';

import type { BreakPoint } from '@wanteddev/wds-engine';
import type { Dayjs } from 'dayjs';
import type { KeyboardEvent } from 'react';
import type {
  DateRangeCalendarProps,
  DateRangeType,
  RangeDateItemProps,
} from './types';

extendDayjs();

const DateRangeCalendar = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<DateRangeCalendarProps, 'div'>
>(
  (
    {
      value: originValue,
      defaultValue,
      onChange,
      onChangeComplete,
      calendars: givenCalendars = 1,
      max = ACCESSIBLE_MAX_DATE,
      min = ACCESSIBLE_MIN_DATE,
      view = 'day',
      locale = 'ko-KR',
      yearsOrder = 'asc',
      timezone,
      disabled,
      readOnly,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();

    const breakpoints = useMemo(
      () => Object.keys(theme.breakpoint) as Array<keyof BreakPoint>,
      [theme.breakpoint],
    );

    const calendars =
      useMedia(
        breakpoints.map((v) => `(min-width: ${theme.breakpoint[v]})`),
        breakpoints.map((v) =>
          getPreviousValue(
            { xs, sm, md, lg, xl },
            'calendars',
            givenCalendars,
            v,
          ),
        ),
        givenCalendars,
      ) ?? givenCalendars;

    const {
      rangeValue,
      activePosition,
      hoveredDate,
      setHoveredDate,
      handleDateSelect: baseHandleDateSelect,
    } = useRangeSelection({
      value: originValue,
      defaultValue,
      onChange,
      onChangeComplete,
      timezone,
      disabled,
      readOnly,
    });

    // Use initial value only — don't auto-navigate when dates are selected
    const initialStart = useRef(originValue?.[0] ?? defaultValue?.[0]).current;

    const { defaultSelectedDate, setDefaultSelectedDate, now } =
      useDefaultSelectedDate(initialStart, min, max, timezone);

    const containerRef = useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(ref, containerRef);

    const effectiveCalendars = view === 'day' ? Math.max(1, calendars) : 1;

    return (
      <DateRangeCalendarContextProvider
        rangeValue={rangeValue}
        hoveredDate={hoveredDate}
        setHoveredDate={setHoveredDate}
        activePosition={activePosition}
        handleDateSelect={baseHandleDateSelect}
        defaultSelectedDate={defaultSelectedDate}
        setDefaultSelectedDate={setDefaultSelectedDate}
        now={now}
        min={min}
        max={max}
        locale={locale}
        timezone={timezone}
        containerRef={containerRef}
        view={view}
        calendars={effectiveCalendars}
        disabled={disabled}
        readOnly={readOnly}
      >
        <FlexBox
          ref={composedRefs}
          wds-component="date-range-calendar"
          sx={[rangeCalendarContainerStyle, props.sx]}
          onMouseLeave={() => {
            if (!disabled && !readOnly) setHoveredDate(null);
          }}
        >
          {view === 'day' &&
            Array.from({ length: effectiveCalendars }).map((_, panelIdx) => (
              <RangeDayPanel key={panelIdx} panelIndex={panelIdx} />
            ))}
          {view === 'month' && <RangeMonthPanel />}
          {view === 'year' && <RangeYearPanel yearsOrder={yearsOrder} />}
        </FlexBox>
      </DateRangeCalendarContextProvider>
    );
  },
);

DateRangeCalendar.displayName = 'DateRangeCalendar';

type RangeDayPanelProps = {
  panelIndex: number;
};

const RangeDayPanel = memo(({ panelIndex }: RangeDayPanelProps) => {
  const {
    defaultSelectedDate,
    setDefaultSelectedDate,
    locale,
    timezone,
    min,
    max,
    calendars,
  } = useDateRangeCalendarContext('RangeDayPanel');

  const panelMonth = useMemo(
    () =>
      dayjsTimezone(dayjs(defaultSelectedDate), timezone).add(
        panelIndex,
        'month',
      ),
    [defaultSelectedDate, panelIndex, timezone],
  );

  const headerLabel = useMemo(
    () =>
      Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
        timeZone: timezone,
      }).format(dateTypeToDateObject(panelMonth, timezone)),
    [locale, panelMonth, timezone],
  );

  const weekdays = useMemo(() => getWeekdays(locale), [locale]);

  const showPrevArrow = panelIndex === 0;
  const showNextArrow = panelIndex === calendars - 1;

  const isOnlyOneCalendar = calendars === 1;

  const prevArrow = useMemo(() => {
    return (
      <IconButton
        wds-ignore-first-focus="true"
        size={18}
        aria-label="Previous month"
        disabled={
          isValidDate(min) &&
          dayjsTimezone(dayjs(defaultSelectedDate), timezone).isSameOrBefore(
            dateTypeToDateObject(min, timezone),
            'month',
          )
        }
        onClick={() =>
          setDefaultSelectedDate(
            dateTypeToDateObject(
              dayjsTimezone(dayjs(defaultSelectedDate), timezone).subtract(
                1,
                'month',
              ),
              timezone,
            ),
          )
        }
      >
        <IconChevronLeftSmall />
      </IconButton>
    );
  }, [min, defaultSelectedDate, timezone, setDefaultSelectedDate]);

  const nextArrow = useMemo(() => {
    return (
      <IconButton
        wds-ignore-first-focus="true"
        size={18}
        aria-label="Next month"
        disabled={
          isValidDate(max) &&
          dayjsTimezone(dayjs(defaultSelectedDate), timezone)
            .add(calendars - 1, 'month')
            .isSameOrAfter(dayjs(dateTypeToDateObject(max, timezone)), 'month')
        }
        onClick={() =>
          setDefaultSelectedDate(
            dateTypeToDateObject(
              dayjsTimezone(dayjs(defaultSelectedDate), timezone).add(
                1,
                'month',
              ),
              timezone,
            ),
          )
        }
      >
        <IconChevronRightSmall />
      </IconButton>
    );
  }, [max, defaultSelectedDate, timezone, calendars, setDefaultSelectedDate]);

  return (
    <FlexBox
      flexDirection="column"
      alignItems="flex-start"
      sx={rangePanelStyle}
    >
      <ScrollArea
        sx={rangePanelWrapperStyle}
        zIndex={11}
        role="grid"
        aria-multiselectable
        aria-label="Select day range"
      >
        <FlexBox
          sx={rangeStickyHeaderStyle}
          data-role="date-range-calendar-header"
          flexDirection="column"
        >
          <FlexBox sx={rangePanelHeaderStyle} alignItems="center">
            {isOnlyOneCalendar ? (
              <>
                <FlexBox sx={rangePanelHeaderLabelStyle} flex="1">
                  <PanelHeaderLabel label={headerLabel} />
                </FlexBox>

                <FlexBox gap="18px" sx={rangePanelHeaderNavigationStyle}>
                  {prevArrow}
                  {nextArrow}
                </FlexBox>
              </>
            ) : (
              <FlexBox
                alignItems="center"
                justifyContent="space-between"
                flex="1"
              >
                <FlexBox sx={rangePanelHeaderNavigationStyle}>
                  {showPrevArrow ? prevArrow : <Box sx={{ width: 18 }} />}
                </FlexBox>

                <FlexBox
                  sx={rangePanelHeaderLabelStyle}
                  justifyContent="center"
                >
                  <PanelHeaderLabel label={headerLabel} />
                </FlexBox>

                <FlexBox sx={rangePanelHeaderNavigationStyle}>
                  {showNextArrow ? nextArrow : <Box sx={{ width: 18 }} />}
                </FlexBox>
              </FlexBox>
            )}
          </FlexBox>

          <FlexBox role="row" sx={rangePanelHeaderLabelStyle}>
            {weekdays.map((day, i) => (
              <Typography
                key={day.long + i}
                role="columnheader"
                aria-label={day.long}
                sx={rangeWeekdayCellStyle}
                variant="caption2"
                weight="medium"
                color="semantic.label.alternative"
                align="center"
              >
                {day.narrow}
              </Typography>
            ))}
          </FlexBox>
        </FlexBox>

        <FlexBox sx={{ paddingBottom: 14 }} flexDirection="column">
          <RangeDayGrid panelMonth={panelMonth} panelIndex={panelIndex} />
        </FlexBox>
      </ScrollArea>
    </FlexBox>
  );
});

RangeDayPanel.displayName = 'RangeDayPanel';

type RangeDayGridProps = {
  panelMonth: Dayjs;
  panelIndex: number;
};

const RangeDayGrid = memo(({ panelMonth, panelIndex }: RangeDayGridProps) => {
  const {
    min,
    max,
    rangeValue,
    hoveredDate,
    activePosition,
    handleDateSelect,
    setHoveredDate,
    defaultSelectedDate,
    setDefaultSelectedDate,
    now,
    containerRef,
    timezone,
    calendars,
    disabled,
    readOnly,
  } = useDateRangeCalendarContext('RangeDayGrid');

  const displayRange = useMemo(
    () => getDisplayRange(rangeValue, hoveredDate, activePosition, timezone),
    [rangeValue, hoveredDate, activePosition, timezone],
  );

  const dayRange = useMemo(() => {
    const firstDayOfMonth = panelMonth.set('date', 1);

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

    const allDays = [...prevMonthDays, ...monthDays];

    const nextMonthDays = new Array(
      allDays.length / 7 > 5
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

    return [...allDays, ...nextMonthDays];
  }, [panelMonth, min, max, timezone]);

  const dayRangeRows = useMemo(() => {
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

  useEffect(
    () => {
      if (panelIndex !== 0) {
        setFocusedIdx(dayRange.findIndex((v) => !v.isOtherMonth));
        return;
      }

      const [start] = rangeValue;
      const selectedDateIdx = isValidDate(start)
        ? dayRange.findIndex(
            (v) =>
              !v.isOtherMonth &&
              !v.disabled &&
              v.value.format('YYYY MM DD') ===
                dayjsTimezone(dayjs(start), timezone).format('YYYY MM DD'),
          )
        : -1;

      if (selectedDateIdx !== -1) {
        setFocusedIdx(selectedDateIdx);
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
        return;
      }

      setFocusedIdx(dayRange.findIndex((v) => !v.isOtherMonth && !v.disabled));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [panelMonth.format('YYYY-MM')],
  );

  const handleClick = useCallback(
    (date: Date) => () => {
      const clamped = findClosestEnableDate({
        min,
        max,
        value: date,
        timezone,
      });
      handleDateSelect(clamped);
    },
    [handleDateSelect, max, min, timezone],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const currentDateStr = e.currentTarget.getAttribute('data-date');
      if (!currentDateStr) return;

      const current = dayjsTimezone(dayjs(currentDateStr), timezone);
      let target: Dayjs;

      switch (e.key) {
        case 'ArrowUp':
          target = current.subtract(7, 'day');
          break;
        case 'ArrowDown':
          target = current.add(7, 'day');
          break;
        case 'ArrowLeft':
          target = current.subtract(1, 'day');
          break;
        case 'ArrowRight':
          target = current.add(1, 'day');
          break;
        case 'Home':
          target = current.startOf('week');
          break;
        case 'End':
          target = current.endOf('week');
          break;
        case 'PageUp':
          target = current.subtract(1, 'month');
          break;
        case 'PageDown':
          target = current.add(1, 'month');
          break;
        default:
          return;
      }

      e.preventDefault();

      const clamped = findClosestEnableDate({
        min,
        max,
        value: dateTypeToDateObject(target, timezone),
        timezone,
      });

      const clampedDayjs = dayjsTimezone(dayjs(clamped), timezone);

      if (
        !isDateInVisiblePanels(
          clampedDayjs,
          defaultSelectedDate,
          calendars,
          timezone,
        )
      ) {
        const base = dayjsTimezone(dayjs(defaultSelectedDate), timezone);
        const lastPanelMonth = base.add(calendars - 1, 'month');

        if (clampedDayjs.isBefore(base, 'month')) {
          setDefaultSelectedDate(
            dateTypeToDateObject(clampedDayjs.startOf('month'), timezone),
          );
        } else if (clampedDayjs.isAfter(lastPanelMonth, 'month')) {
          setDefaultSelectedDate(
            dateTypeToDateObject(
              clampedDayjs.subtract(calendars - 1, 'month').startOf('month'),
              timezone,
            ),
          );
        }
      }

      setHoveredDate(clamped);

      requestAnimationFrame(() => {
        focusRangeDate('day', clampedDayjs.format('YYYY-MM-DD'), containerRef);
      });
    },
    [
      calendars,
      containerRef,
      defaultSelectedDate,
      max,
      min,
      setDefaultSelectedDate,
      setHoveredDate,
      timezone,
    ],
  );

  return (
    <FlexBox flexWrap="wrap" role="rowgroup" sx={rangeGridWrapperStyle}>
      {dayRangeRows.map((days, rowIdx) => (
        <FlexBox
          key={`${panelMonth.format('YYYY-MM')}-row-${rowIdx}`}
          role="row"
          aria-rowindex={rowIdx + 1}
        >
          {days.map((day, dayIdx) => {
            const dateValue = day.value.format('YYYY-MM-DD');
            const isOtherMonth = day.value.month() !== panelMonth.month();

            if (isOtherMonth) {
              return (
                <Box
                  key={`${dateValue}-${dayIdx}`}
                  role="gridcell"
                  sx={rangeDayCellStyle}
                />
              );
            }

            const dateObj = dateTypeToDateObject(day.value, timezone);

            const isRangeStart = isSameDateForView(
              dateObj,
              displayRange[0],
              'day',
              timezone,
            );
            const isRangeEnd = isSameDateForView(
              dateObj,
              displayRange[1],
              'day',
              timezone,
            );
            const isInRange = isDateInRangeForView(
              dateObj,
              displayRange[0],
              displayRange[1],
              'day',
              timezone,
            );
            const isSelected = isRangeStart || isRangeEnd;

            return (
              <Box
                key={`${dateValue}-${dayIdx}`}
                sx={rangeDayCellStyle}
                data-in-range={isInRange ? true : undefined}
                data-range-start={isRangeStart ? true : undefined}
                data-range-end={isRangeEnd ? true : undefined}
              >
                <RangeDateItem
                  sx={{ width: '32px', borderRadius: '999px' }}
                  role="gridcell"
                  disabled={day.disabled}
                  isActive={isSelected}
                  isCurrent={
                    now.format('YYYY MM DD') === day.value.format('YYYY MM DD')
                  }
                  data-date={dateValue}
                  data-other-month={false}
                  tabIndex={focusedIdx === rowIdx * 7 + dayIdx ? 0 : -1}
                  aria-colindex={dayIdx + 1}
                  aria-label={day.label.toString()}
                  onClick={handleClick(dateObj)}
                  onKeyDown={handleKeyDown}
                  onMouseEnter={() => {
                    if (!disabled && !readOnly) setHoveredDate(dateObj);
                  }}
                >
                  {day.label}
                </RangeDateItem>
              </Box>
            );
          })}
        </FlexBox>
      ))}
    </FlexBox>
  );
});

RangeDayGrid.displayName = 'RangeDayGrid';

const RangeMonthPanel = memo(() => {
  const {
    defaultSelectedDate,
    setDefaultSelectedDate,
    locale,
    timezone,
    min,
    max,
    containerRef,
    rangeValue,
    hoveredDate,
    activePosition,
    handleDateSelect,
    setHoveredDate,
    now,
    disabled,
    readOnly,
  } = useDateRangeCalendarContext('RangeMonthPanel');

  const headerLabel = useMemo(
    () =>
      Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
        timeZone: timezone,
      }).format(defaultSelectedDate),
    [defaultSelectedDate, locale, timezone],
  );

  const displayRange = useMemo(
    () => getDisplayRange(rangeValue, hoveredDate, activePosition, timezone),
    [rangeValue, hoveredDate, activePosition, timezone],
  );

  const { monthRange, monthRows } = useMemo(() => {
    const range = new Array(12).fill(0).map((_, i) => {
      const minDate = dayjsTimezone(
        dayjs(min ?? ACCESSIBLE_MIN_DATE),
        timezone,
      );
      const maxDate = dayjsTimezone(
        dayjs(max ?? ACCESSIBLE_MAX_DATE),
        timezone,
      );
      const currentMonth = dayjsTimezone(
        dayjs(defaultSelectedDate),
        timezone,
      ).set('month', i);

      return {
        value: i,
        label: Intl.DateTimeFormat(locale, { month: 'short' }).format(
          dateTypeToDateObject(dayjs().set('month', i), timezone),
        ),
        disabled:
          (currentMonth.isBefore(minDate, 'month') &&
            minDate.year() >=
              dayjsTimezone(dayjs(defaultSelectedDate), timezone).year()) ||
          (currentMonth.isAfter(maxDate, 'month') &&
            maxDate.year() <=
              dayjsTimezone(dayjs(defaultSelectedDate), timezone).year()),
      };
    });

    const rows = new Array(Math.ceil(range.length / 3)).fill(0).map((_, i) => {
      return range.slice(i * 3, (i + 1) * 3);
    });

    return {
      monthRange: range,
      monthRows: rows,
    };
  }, [min, timezone, max, locale, defaultSelectedDate]);

  const [focusedIdx, setFocusedIdx] = useState(
    monthRange.findIndex((v) => !v.disabled),
  );

  useEffect(
    () => {
      const [start] = rangeValue;
      const selectedDateIdx = isValidDate(start)
        ? monthRange.findIndex(
            (v) =>
              !v.disabled &&
              v.value === dayjsTimezone(dayjs(start), timezone).month(),
          )
        : -1;

      if (selectedDateIdx !== -1) {
        setFocusedIdx(selectedDateIdx);
        const mv = `${dayjsTimezone(dayjs(defaultSelectedDate), timezone).year()}-${String(monthRange[selectedDateIdx]!.value + 1).padStart(2, '0')}`;
        scrollIntoViewRangeDate('month', mv, containerRef);
        focusRangeDate('month', mv, containerRef);
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
        setFocusedIdx(todayDateIdx);
        return;
      }

      setFocusedIdx(monthRange.findIndex((v) => !v.disabled));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    monthRange.map((v) => v.value),
  );

  const handleClick = useCallback(
    (monthIdx: number) => () => {
      const newValue = findClosestEnableDate({
        min,
        max,
        timezone,
        value: dateTypeToDateObject(
          dayjs(defaultSelectedDate).set('month', monthIdx),
          timezone,
        ),
      });
      handleDateSelect(newValue);
    },
    [defaultSelectedDate, handleDateSelect, max, min, timezone],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const currentMonthStr = e.currentTarget.getAttribute('data-month');
      if (!currentMonthStr) return;

      const currentMonth = Number(
        e.currentTarget.getAttribute('data-month-index') ?? '0',
      );
      let newMonth: number;
      let yearDelta = 0;

      switch (e.key) {
        case 'ArrowUp':
          if (currentMonth < 3) {
            yearDelta = -1;
            newMonth = currentMonth + 9;
          } else {
            newMonth = currentMonth - 3;
          }
          break;
        case 'ArrowDown':
          if (currentMonth > 8) {
            yearDelta = 1;
            newMonth = currentMonth - 9;
          } else {
            newMonth = currentMonth + 3;
          }
          break;
        case 'ArrowLeft':
          if (currentMonth === 0) {
            yearDelta = -1;
            newMonth = 11;
          } else {
            newMonth = currentMonth - 1;
          }
          break;
        case 'ArrowRight':
          if (currentMonth === 11) {
            yearDelta = 1;
            newMonth = 0;
          } else {
            newMonth = currentMonth + 1;
          }
          break;
        case 'PageUp':
          yearDelta = -1;
          newMonth = currentMonth;
          break;
        case 'PageDown':
          yearDelta = 1;
          newMonth = currentMonth;
          break;
        case 'Home':
          newMonth = 0;
          break;
        case 'End':
          newMonth = 11;
          break;
        default:
          return;
      }

      e.preventDefault();

      if (yearDelta !== 0) {
        const newDate = dayjsTimezone(dayjs(defaultSelectedDate), timezone).add(
          yearDelta,
          'year',
        );

        const clamped = findClosestEnableDate({
          min,
          max,
          value: dateTypeToDateObject(newDate.set('month', newMonth), timezone),
          timezone,
        });

        setDefaultSelectedDate(
          dateTypeToDateObject(
            dayjsTimezone(dayjs(clamped), timezone).startOf('month'),
            timezone,
          ),
        );

        const clampedMonth = dayjsTimezone(dayjs(clamped), timezone).month();
        setFocusedIdx(monthRange.findIndex((v) => v.value === clampedMonth));

        if (!disabled && !readOnly) {
          setHoveredDate(clamped);
        }

        const clampedYear = dayjsTimezone(dayjs(clamped), timezone).year();
        const mv = `${clampedYear}-${String(clampedMonth + 1).padStart(2, '0')}`;
        requestAnimationFrame(() => {
          focusRangeDate('month', mv, containerRef);
        });
      } else {
        const clamped = findClosestEnableDate({
          min,
          max,
          timezone,
          value: dateTypeToDateObject(
            dayjsTimezone(dayjs(defaultSelectedDate), timezone).set(
              'month',
              newMonth,
            ),
            timezone,
          ),
        });
        const clampedMonth = dayjsTimezone(dayjs(clamped), timezone).month();
        const clampedYear = dayjsTimezone(dayjs(clamped), timezone).year();

        setFocusedIdx(monthRange.findIndex((v) => v.value === clampedMonth));

        if (!disabled && !readOnly) {
          setHoveredDate(clamped);
        }

        const mv = `${clampedYear}-${String(clampedMonth + 1).padStart(2, '0')}`;
        requestAnimationFrame(() => {
          focusRangeDate('month', mv, containerRef);
        });
      }
    },
    [
      containerRef,
      defaultSelectedDate,
      disabled,
      max,
      min,
      monthRange,
      readOnly,
      setDefaultSelectedDate,
      setHoveredDate,
      timezone,
    ],
  );

  return (
    <FlexBox
      flexDirection="column"
      alignItems="flex-start"
      sx={rangePanelStyle}
    >
      <ScrollArea
        sx={rangePanelWrapperStyle}
        zIndex={11}
        role="grid"
        aria-label="Select month range"
        aria-multiselectable
      >
        <FlexBox
          sx={rangeStickyHeaderStyle}
          data-role="date-range-calendar-header"
          flexDirection="column"
        >
          <FlexBox sx={rangePanelHeaderStyle} alignItems="center">
            <FlexBox sx={rangePanelHeaderLabelStyle} flex="1">
              <PanelHeaderLabel label={headerLabel} />
            </FlexBox>
            <FlexBox gap="18px" sx={rangePanelHeaderNavigationStyle}>
              <IconButton
                wds-ignore-first-focus="true"
                size={18}
                aria-label="Previous year"
                disabled={
                  isValidDate(min) &&
                  dayjsTimezone(dayjs(defaultSelectedDate), timezone).year() <=
                    dayjsTimezone(dayjs(min), timezone).year()
                }
                onClick={() =>
                  setDefaultSelectedDate(
                    dateTypeToDateObject(
                      dayjsTimezone(
                        dayjs(defaultSelectedDate),
                        timezone,
                      ).subtract(1, 'year'),
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
                aria-label="Next year"
                disabled={
                  isValidDate(max) &&
                  dayjsTimezone(dayjs(defaultSelectedDate), timezone).year() >=
                    dayjsTimezone(dayjs(max), timezone).year()
                }
                onClick={() =>
                  setDefaultSelectedDate(
                    dateTypeToDateObject(
                      dayjsTimezone(dayjs(defaultSelectedDate), timezone).add(
                        1,
                        'year',
                      ),
                      timezone,
                    ),
                  )
                }
              >
                <IconChevronRightSmall />
              </IconButton>
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <FlexBox sx={{ paddingBottom: 12 }}>
          <FlexBox flex="1" flexDirection="column" sx={rangeGridWrapperStyle}>
            {monthRows.map((rowMonths, rowIdx) => (
              <FlexBox
                key={`month-row-${rowIdx}`}
                role="row"
                aria-rowindex={rowIdx + 1}
              >
                {rowMonths.map((month, colIndex) => {
                  const monthDate = dateTypeToDateObject(
                    dayjsTimezone(dayjs(defaultSelectedDate), timezone).set(
                      'month',
                      month.value,
                    ),
                    timezone,
                  );
                  const year = dayjsTimezone(
                    dayjs(defaultSelectedDate),
                    timezone,
                  ).year();
                  const monthVal = `${year}-${String(month.value + 1).padStart(2, '0')}`;

                  const isRangeStart = isSameDateForView(
                    monthDate,
                    displayRange[0],
                    'month',
                    timezone,
                  );
                  const isRangeEnd = isSameDateForView(
                    monthDate,
                    displayRange[1],
                    'month',
                    timezone,
                  );
                  const isInRange = isDateInRangeForView(
                    monthDate,
                    displayRange[0],
                    displayRange[1],
                    'month',
                    timezone,
                  );

                  return (
                    <Box
                      key={`${year}-${month.label}`}
                      sx={[rangeMonthYearCellStyle, { flex: '1 0 0' }]}
                      data-in-range={isInRange ? true : undefined}
                      data-range-start={isRangeStart ? true : undefined}
                      data-range-end={isRangeEnd ? true : undefined}
                    >
                      <RangeDateItem
                        sx={{ width: 'calc(100% - 4px)' }}
                        onClick={handleClick(month.value)}
                        disabled={month.disabled}
                        isCurrent={
                          now.month() === month.value && now.year() === year
                        }
                        isActive={isRangeStart || isRangeEnd}
                        data-month={monthVal}
                        data-month-index={month.value}
                        aria-colindex={colIndex + 1}
                        aria-label={month.label}
                        tabIndex={focusedIdx === month.value ? 0 : -1}
                        onKeyDown={handleKeyDown}
                        onMouseEnter={() => {
                          if (!disabled && !readOnly) setHoveredDate(monthDate);
                        }}
                      >
                        {month.label}
                      </RangeDateItem>
                    </Box>
                  );
                })}
              </FlexBox>
            ))}
          </FlexBox>
        </FlexBox>
      </ScrollArea>
    </FlexBox>
  );
});

RangeMonthPanel.displayName = 'RangeMonthPanel';

type RangeYearPanelProps = {
  yearsOrder?: 'desc' | 'asc';
};

const RangeYearPanel = memo(({ yearsOrder = 'asc' }: RangeYearPanelProps) => {
  const {
    defaultSelectedDate,
    locale,
    timezone,
    min,
    max,
    containerRef,
    rangeValue,
    hoveredDate,
    activePosition,
    handleDateSelect,
    setHoveredDate,
    now,
    disabled,
    readOnly,
  } = useDateRangeCalendarContext('RangeYearPanel');

  const headerLabel = useMemo(
    () =>
      Intl.DateTimeFormat(locale, {
        year: 'numeric',
        timeZone: timezone,
      }).format(defaultSelectedDate),
    [defaultSelectedDate, locale, timezone],
  );

  const displayRange = useMemo(
    () => getDisplayRange(rangeValue, hoveredDate, activePosition, timezone),
    [rangeValue, hoveredDate, activePosition, timezone],
  );

  const { yearRange, yearRows } = useMemo(() => {
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

    const range = yearsOrder === 'asc' ? years : years.reverse();
    const rows = new Array(Math.ceil(range.length / 3)).fill(0).map((_, i) => {
      return range.slice(i * 3, (i + 1) * 3);
    });

    return {
      yearRange: range,
      yearRows: rows,
    };
  }, [min, timezone, max, yearsOrder]);

  const [focusedIdx, setFocusedIdx] = useState(yearRange.length > 0 ? 0 : -1);

  useEffect(
    () => {
      const [start] = rangeValue;
      const selectedDateIdx = isValidDate(start)
        ? yearRange.findIndex(
            (v) => v === dayjsTimezone(dayjs(start), timezone).year(),
          )
        : -1;

      if (selectedDateIdx !== -1) {
        scrollIntoViewRangeDate(
          'year',
          String(yearRange[selectedDateIdx]!),
          containerRef,
        );
        focusRangeDate(
          'year',
          String(yearRange[selectedDateIdx]!),
          containerRef,
        );
        setFocusedIdx(selectedDateIdx);
        return;
      }

      const todayDateIdx = isValidDate(now.toDate())
        ? yearRange.findIndex((v) => v === dayjsTimezone(now, timezone).year())
        : -1;

      if (todayDateIdx !== -1) {
        scrollIntoViewRangeDate(
          'year',
          String(yearRange[todayDateIdx]!),
          containerRef,
        );
        focusRangeDate('year', String(yearRange[todayDateIdx]!), containerRef);
        setFocusedIdx(todayDateIdx);
        return;
      }

      const fallbackDateIdx = yearRange.length > 0 ? 0 : -1;
      if (fallbackDateIdx !== -1) {
        focusRangeDate(
          'year',
          String(yearRange[fallbackDateIdx]!),
          containerRef,
        );
      }
      setFocusedIdx(fallbackDateIdx);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    yearRange.map((v) => v),
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
      handleDateSelect(newValue);
    },
    [defaultSelectedDate, handleDateSelect, max, min, timezone],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const currentYearStr = e.currentTarget.getAttribute('data-year');
      if (!currentYearStr) return;

      const currentYear = Number(currentYearStr);
      let newYear: number;

      switch (e.key) {
        case 'ArrowUp':
          newYear = currentYear - 3;
          break;
        case 'ArrowDown':
          newYear = currentYear + 3;
          break;
        case 'ArrowLeft':
          newYear = currentYear - 1;
          break;
        case 'ArrowRight':
          newYear = currentYear + 1;
          break;
        case 'Home':
          newYear = yearRange[0] ?? currentYear;
          break;
        case 'End':
          newYear = yearRange[yearRange.length - 1] ?? currentYear;
          break;
        default:
          return;
      }

      e.preventDefault();

      const clamped = findClosestEnableDate({
        min,
        max,
        value: dateTypeToDateObject(
          dayjs(defaultSelectedDate).year(newYear),
          timezone,
        ),
        timezone,
      });
      const clampedYear = dayjsTimezone(dayjs(clamped), timezone).year();

      setFocusedIdx(yearRange.findIndex((v) => v === clampedYear));

      const yearDate = dateTypeToDateObject(
        dayjs(defaultSelectedDate).set('year', clampedYear),
        timezone,
      );
      if (!disabled && !readOnly) {
        setHoveredDate(yearDate);
      }

      requestAnimationFrame(() => {
        focusRangeDate('year', String(clampedYear), containerRef);
      });
    },
    [
      containerRef,
      defaultSelectedDate,
      disabled,
      max,
      min,
      readOnly,
      setHoveredDate,
      timezone,
      yearRange,
    ],
  );

  return (
    <FlexBox
      flexDirection="column"
      alignItems="flex-start"
      sx={rangePanelStyle}
    >
      <ScrollArea
        sx={rangePanelWrapperStyle}
        zIndex={11}
        role="grid"
        aria-label="Select year range"
        aria-multiselectable
      >
        <FlexBox
          sx={rangeStickyHeaderStyle}
          data-role="date-range-calendar-header"
          flexDirection="column"
        >
          <FlexBox sx={rangePanelHeaderStyle} alignItems="center">
            <FlexBox sx={rangePanelHeaderLabelStyle} flex="1">
              <PanelHeaderLabel label={headerLabel} />
            </FlexBox>
            <FlexBox gap="18px" sx={rangePanelHeaderNavigationStyle} />
          </FlexBox>
        </FlexBox>

        <FlexBox sx={{ paddingBottom: 12 }}>
          <FlexBox flex="1" sx={rangeGridWrapperStyle} flexDirection="column">
            {yearRows.map((rowYears, rowIdx) => (
              <FlexBox
                key={`year-row-${rowIdx}`}
                role="row"
                aria-rowindex={rowIdx + 1}
              >
                {rowYears.map((year, colIndex) => {
                  const yearDate = dateTypeToDateObject(
                    dayjs(defaultSelectedDate).set('year', year),
                    timezone,
                  );
                  const yearVal = String(year);

                  const isRangeStart = isSameDateForView(
                    yearDate,
                    displayRange[0],
                    'year',
                    timezone,
                  );
                  const isRangeEnd = isSameDateForView(
                    yearDate,
                    displayRange[1],
                    'year',
                    timezone,
                  );
                  const isInRange = isDateInRangeForView(
                    yearDate,
                    displayRange[0],
                    displayRange[1],
                    'year',
                    timezone,
                  );

                  const yearIdx = yearRange.indexOf(year);

                  return (
                    <Box
                      key={`${year}-year`}
                      sx={[rangeMonthYearCellStyle, { flex: '1 0 0' }]}
                      data-in-range={isInRange ? true : undefined}
                      data-range-start={isRangeStart ? true : undefined}
                      data-range-end={isRangeEnd ? true : undefined}
                    >
                      <RangeDateItem
                        sx={{ width: 'calc(100% - 4px)' }}
                        onClick={handleClick(year)}
                        data-year={yearVal}
                        isCurrent={now.year() === year}
                        isActive={isRangeStart || isRangeEnd}
                        aria-label={year.toString()}
                        aria-colindex={colIndex + 1}
                        onKeyDown={handleKeyDown}
                        tabIndex={focusedIdx === yearIdx ? 0 : -1}
                        onMouseEnter={() => {
                          if (!disabled && !readOnly) setHoveredDate(yearDate);
                        }}
                      >
                        {year}
                      </RangeDateItem>
                    </Box>
                  );
                })}
              </FlexBox>
            ))}
          </FlexBox>
        </FlexBox>
      </ScrollArea>
    </FlexBox>
  );
});

RangeYearPanel.displayName = 'RangeYearPanel';

type PanelHeaderLabelProps = {
  label: string;
};

const PanelHeaderLabel = memo(({ label }: PanelHeaderLabelProps) => {
  return (
    <Typography variant="body1" weight="bold" color="semantic.label.normal">
      {label}
    </Typography>
  );
});

PanelHeaderLabel.displayName = 'PanelHeaderLabel';

const RangeDateItem = memo(
  forwardRef<
    HTMLButtonElement,
    DefaultComponentPropsInternal<RangeDateItemProps, 'button'>
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
          sx={[rangeDayItemStyle, props.sx]}
        />
      </WithInteraction>
    );
  }),
);

RangeDateItem.displayName = 'RangeDateItem';

export { DateRangeCalendar };

export type { DateRangeCalendarProps, DateRangeType };
