import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { isDateTypeEmpty, isValidDate } from '../date-calendar/helpers';
import {
  getBoundSectionValue,
  getClosetSection,
  getDateformatSections,
  getIncrementedSectionValue,
  getRegexFormat,
  parseFromFormat,
  processCharacterInput,
  toFormat,
} from '../date-picker/helpers';

import type { DateType } from '../date-calendar/types';
import type { DateRangeType } from '../date-range-calendar/types';
import type { DateFormatSection } from '../date-picker/helpers';
import type {
  ClipboardEvent,
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  SetStateAction,
} from 'react';

const RANGE_SEPARATOR = ' - ';

type RangePosition = 'start' | 'end';

type RangeFocusedSection = DateFormatSection & {
  position: RangePosition;
};

type UseDateRangeFieldParams = {
  value: DateRangeType;
  format: string;
  locale?: string;
  timezone?: string;
  setValue: Dispatch<SetStateAction<DateRangeType>>;
  readOnly?: boolean;
  disabled?: boolean;
};

const buildCombinedValue = (startValue: string, endValue: string): string => {
  return `${startValue}${RANGE_SEPARATOR}${endValue}`;
};

export const useDateRangeField = ({
  value,
  format = 'YYYY.MM.DD',
  locale,
  timezone,
  setValue,
  readOnly,
  disabled,
}: UseDateRangeFieldParams) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [startInputValue, setStartInputValue] = useState(
    isValidDate(value[0]) ? toFormat(value[0], format, locale, timezone) : '',
  );
  const [endInputValue, setEndInputValue] = useState(
    isValidDate(value[1]) ? toFormat(value[1], format, locale, timezone) : '',
  );

  const [startSections, setStartSections] = useState(
    getDateformatSections(startInputValue || format, format, locale),
  );
  const [endSections, setEndSections] = useState(
    getDateformatSections(endInputValue || format, format, locale),
  );

  const [focusedSection, setFocusedSection] = useState<RangeFocusedSection>();

  const sectionValueRef = useRef('');
  const isTriggeredChange = useRef(false);
  const isFirstRender = useRef(true);
  const focusTimestamp = useRef(0);

  useEffect(() => {
    sectionValueRef.current = '';
  }, [focusedSection?.index, focusedSection?.position]);

  // Derive combined values
  const activeStartInput = startInputValue || format;
  const activeEndInput = endInputValue || format;
  const inputValue =
    !startInputValue && !endInputValue
      ? ''
      : buildCombinedValue(activeStartInput, activeEndInput);

  const endOffset = activeStartInput.length + RANGE_SEPARATOR.length;

  // Sync from external value changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isTriggeredChange.current) {
      isTriggeredChange.current = false;
      return;
    }

    const newStart = isValidDate(value[0])
      ? toFormat(value[0], format, locale, timezone)
      : '';
    const newEnd = isValidDate(value[1])
      ? toFormat(value[1], format, locale, timezone)
      : '';

    setStartInputValue(newStart);
    setEndInputValue(newEnd);
    setStartSections(getDateformatSections(newStart || format, format, locale));
    setEndSections(getDateformatSections(newEnd || format, format, locale));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value[0], value[1], format, locale, timezone]);

  // --- Helpers ---

  const getCurrentValue = useCallback(
    (position: RangePosition): DateType => {
      return position === 'start' ? value[0] : value[1];
    },
    [value],
  );

  const getCurrentInputValue = useCallback(
    (position: RangePosition): string => {
      return position === 'start' ? activeStartInput : activeEndInput;
    },
    [activeStartInput, activeEndInput],
  );

  const updateInputAndSections = useCallback(
    (position: RangePosition, newInputValue: string) => {
      const newSections = getDateformatSections(newInputValue, format, locale);

      if (position === 'start') {
        setStartInputValue(newInputValue);
        setStartSections(newSections);
      } else {
        setEndInputValue(newInputValue);
        setEndSections(newSections);
      }

      return newSections;
    },
    [format, locale],
  );

  const tryParse = useCallback(
    (position: RangePosition, inputStr: string) => {
      const parsed = parseFromFormat(
        inputStr,
        format,
        getCurrentValue(position),
        locale,
        timezone,
      );

      if (parsed && !readOnly && !disabled) {
        const newRange: DateRangeType =
          position === 'start' ? [parsed, value[1]] : [value[0], parsed];
        setValue(newRange);
        isTriggeredChange.current = true;
      }
    },
    [
      disabled,
      format,
      getCurrentValue,
      locale,
      readOnly,
      setValue,
      timezone,
      value,
    ],
  );

  const makeFocused = useCallback(
    (
      section: DateFormatSection,
      position: RangePosition,
    ): RangeFocusedSection => {
      return { ...section, position };
    },
    [],
  );

  const setSelectionForSection = useCallback(
    (section: DateFormatSection, position: RangePosition) => {
      const offset = position === 'start' ? 0 : endOffset;
      requestAnimationFrame(() => {
        inputRef.current?.setSelectionRange(
          section.startIndex + offset,
          section.endIndex + offset,
        );
      });
    },
    [endOffset],
  );

  const handleNextSection = useCallback(
    (
      position: RangePosition,
      newInputStr: string,
      newSections: Array<DateFormatSection>,
      currentLocalIndex: number,
    ) => {
      const nextLocalSection = newSections[currentLocalIndex + 1];

      tryParse(position, newInputStr);

      if (nextLocalSection) {
        sectionValueRef.current = '';
        setFocusedSection(makeFocused(nextLocalSection, position));
        setSelectionForSection(nextLocalSection, position);
      } else if (position === 'start') {
        // Move to first section of end
        const firstEndSection = endSections[0];
        if (firstEndSection) {
          sectionValueRef.current = '';
          setFocusedSection(makeFocused(firstEndSection, 'end'));
          setSelectionForSection(firstEndSection, 'end');
        }
      } else {
        // Stay at last section
        const lastSection = newSections[currentLocalIndex];
        if (lastSection) {
          const resolved =
            newSections.find((s) => s.format === lastSection.format) ??
            lastSection;
          setFocusedSection(makeFocused(resolved, position));
          setSelectionForSection(resolved, position);
        }
      }
    },
    [endSections, makeFocused, setSelectionForSection, tryParse],
  );

  // --- Event handlers ---

  const handleValueChange = useCallback(
    (v: DateRangeType) => {
      isTriggeredChange.current = true;

      const newStart = isValidDate(v[0])
        ? toFormat(v[0], format, locale, timezone)
        : '';
      const newEnd = isValidDate(v[1])
        ? toFormat(v[1], format, locale, timezone)
        : '';

      setStartInputValue(newStart);
      setEndInputValue(newEnd);
      setStartSections(
        getDateformatSections(newStart || format, format, locale),
      );
      setEndSections(getDateformatSections(newEnd || format, format, locale));
      setValue(v);
    },
    [format, locale, setValue, timezone],
  );

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (
        e.currentTarget.tagName !== 'TEXTAREA' &&
        e.currentTarget.tagName !== 'INPUT'
      ) {
        return;
      }

      if (!startInputValue && !endInputValue) {
        focusTimestamp.current = e.timeStamp;
      }

      const newStart = startInputValue || format;
      const newEnd = endInputValue || format;
      const newStartSections = getDateformatSections(newStart, format, locale);
      const newEndSections = getDateformatSections(newEnd, format, locale);

      flushSync(() => {
        setStartInputValue(newStart);
        setEndInputValue(newEnd);
        setStartSections(newStartSections);
        setEndSections(newEndSections);
      });

      const closetSection = getClosetSection(0, newStartSections);
      if (closetSection) {
        setFocusedSection(makeFocused(closetSection, 'start'));
        e.currentTarget.setSelectionRange(
          closetSection.startIndex,
          closetSection.endIndex,
        );
      }
    },
    [endInputValue, format, locale, makeFocused, startInputValue],
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      if (!('setSelectionRange' in e.currentTarget)) return;

      let cursorPosition = e.currentTarget.selectionStart ?? 0;

      if (
        (!startInputValue && !endInputValue) ||
        e.timeStamp - focusTimestamp.current < 300
      ) {
        cursorPosition = 0;
      }

      // Determine position based on cursor
      const position: RangePosition =
        cursorPosition < endOffset ? 'start' : 'end';
      const localSections = position === 'start' ? startSections : endSections;
      const offset = position === 'start' ? 0 : endOffset;

      const adjustedCursor = cursorPosition - offset;
      const closetSection = getClosetSection(
        Math.max(0, adjustedCursor),
        localSections,
      );

      if (closetSection) {
        e.preventDefault();
        setFocusedSection(makeFocused(closetSection, position));
        e.currentTarget.setSelectionRange(
          closetSection.startIndex + offset,
          closetSection.endIndex + offset,
        );
      }
    },
    [
      endInputValue,
      endOffset,
      endSections,
      makeFocused,
      startInputValue,
      startSections,
    ],
  );

  const handleBlur = useCallback(() => {
    setFocusedSection(undefined);
    sectionValueRef.current = '';
    isTriggeredChange.current = false;

    const startEmpty = startInputValue === format || isDateTypeEmpty(value[0]);
    const endEmpty = endInputValue === format || isDateTypeEmpty(value[1]);

    if (startEmpty && endEmpty) {
      setStartInputValue('');
      setEndInputValue('');
    }
  }, [endInputValue, format, startInputValue, value]);

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (!focusedSection || readOnly || disabled) return;

      const pastedText = e.clipboardData.getData('text');
      const { position } = focusedSection;
      const localSections = position === 'start' ? startSections : endSections;
      const currentInput = getCurrentInputValue(position);
      const localIndex = focusedSection.index;
      const section = localSections[localIndex];
      if (!section) return;

      // Try full range paste (e.g., "2024.09.21 - 2024.09.26")
      if (
        e.currentTarget.selectionStart === 0 &&
        e.currentTarget.selectionEnd === inputValue.length
      ) {
        const parts = pastedText.split(RANGE_SEPARATOR);
        if (parts.length === 2) {
          const parsedStart = parseFromFormat(
            parts[0]!,
            format,
            value[0],
            locale,
            timezone,
          );
          const parsedEnd = parseFromFormat(
            parts[1]!,
            format,
            value[1],
            locale,
            timezone,
          );
          if (parsedStart && parsedEnd) {
            handleValueChange([parsedStart, parsedEnd]);
            return;
          }
        }
      }

      if (section.type === 'text') {
        const regex = getRegexFormat(section.format, locale);
        const match = pastedText.match(regex);
        if (match) {
          const newInput =
            currentInput.slice(0, section.startIndex) +
            match[0] +
            currentInput.slice(section.endIndex);
          const newSections = updateInputAndSections(position, newInput);
          handleNextSection(position, newInput, newSections, localIndex);
        }
      } else {
        const numericValue = parseInt(pastedText);
        if (!isNaN(numericValue)) {
          const padded = numericValue
            .toString()
            .slice(
              (section.format.length === 1 ? 2 : section.format.length) * -1,
            )
            .replace(/^0+/, '')
            .padStart(section.format.length, '0');
          const newInput =
            currentInput.slice(0, section.startIndex) +
            padded +
            currentInput.slice(section.endIndex);
          const newSections = updateInputAndSections(position, newInput);
          handleNextSection(position, newInput, newSections, localIndex);
        }
      }
    },
    [
      disabled,
      endSections,
      focusedSection,
      format,
      getCurrentInputValue,
      handleNextSection,
      handleValueChange,
      inputValue.length,
      locale,
      readOnly,
      startSections,
      timezone,
      updateInputAndSections,
      value,
    ],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (
        (e.currentTarget.tagName !== 'TEXTAREA' &&
          e.currentTarget.tagName !== 'INPUT') ||
        !focusedSection
      ) {
        return;
      }

      const { position } = focusedSection;
      const localSections = position === 'start' ? startSections : endSections;
      const currentInput = getCurrentInputValue(position);
      const localIndex = focusedSection.index;
      const section = localSections[localIndex];
      if (!section) return;

      const updateSection = (newSectionValue: string) => {
        const newInput =
          currentInput.slice(0, section.startIndex) +
          newSectionValue +
          currentInput.slice(section.endIndex);
        const newSections = updateInputAndSections(position, newInput);
        tryParse(position, newInput);
        const updatedSection = newSections[localIndex];
        if (updatedSection) {
          setFocusedSection(makeFocused(updatedSection, position));
          setSelectionForSection(updatedSection, position);
        }
      };

      switch (e.key) {
        case 'Tab':
          return;

        case 'Backspace': {
          e.preventDefault();
          if (readOnly || disabled) return;
          sectionValueRef.current = '';

          const clearedInput =
            currentInput.slice(0, section.startIndex) +
            section.format +
            currentInput.slice(section.endIndex);
          const clearedSections = updateInputAndSections(
            position,
            clearedInput,
          );
          tryParse(position, clearedInput);
          const clearedSection = clearedSections[localIndex];
          if (clearedSection) {
            setFocusedSection(makeFocused(clearedSection, position));
            setSelectionForSection(clearedSection, position);
          }
          return;
        }

        case 'ArrowRight': {
          e.preventDefault();
          const nextLocal = localSections[localIndex + 1];
          if (nextLocal) {
            setFocusedSection(makeFocused(nextLocal, position));
            setSelectionForSection(nextLocal, position);
          } else if (position === 'start') {
            const firstEnd = endSections[0];
            if (firstEnd) {
              setFocusedSection(makeFocused(firstEnd, 'end'));
              setSelectionForSection(firstEnd, 'end');
            }
          }
          return;
        }

        case 'ArrowLeft': {
          e.preventDefault();
          const prevLocal = localSections[localIndex - 1];
          if (prevLocal) {
            setFocusedSection(makeFocused(prevLocal, position));
            setSelectionForSection(prevLocal, position);
          } else if (position === 'end') {
            const lastStart = startSections[startSections.length - 1];
            if (lastStart) {
              setFocusedSection(makeFocused(lastStart, 'start'));
              setSelectionForSection(lastStart, 'start');
            }
          }
          return;
        }

        case 'ArrowUp':
        case 'ArrowDown': {
          e.preventDefault();
          if (readOnly || disabled) return;

          const direction = e.key === 'ArrowUp' ? 'up' : 'down';
          const newVal = getIncrementedSectionValue(
            section,
            direction,
            getCurrentValue(position),
            timezone,
          );
          if (newVal != null) updateSection(newVal);
          return;
        }

        case 'Home':
        case 'End': {
          e.preventDefault();
          if (readOnly || disabled) return;

          const bound = e.key === 'Home' ? 'home' : 'end';
          const boundVal = getBoundSectionValue(
            section,
            bound,
            getCurrentValue(position),
            timezone,
          );
          if (boundVal != null) updateSection(boundVal);
          return;
        }
      }

      // Character input
      if (e.ctrlKey || e.metaKey || e.altKey || readOnly || disabled) return;
      e.preventDefault();

      const charResult = processCharacterInput(
        e.key,
        section,
        sectionValueRef.current,
        currentInput,
        locale,
        getCurrentValue(position),
        timezone,
      );

      if (!charResult) return;

      const { newInput, isFinished, newSectionRef } = charResult;
      sectionValueRef.current = newSectionRef;

      const newSections = updateInputAndSections(position, newInput);

      if (isFinished) {
        handleNextSection(position, newInput, newSections, localIndex);
      } else {
        tryParse(position, newInput);
        const updated = newSections[localIndex];
        if (updated) {
          setFocusedSection(makeFocused(updated, position));
          setSelectionForSection(updated, position);
        }
      }
    },
    [
      disabled,
      endSections,
      focusedSection,
      getCurrentInputValue,
      getCurrentValue,
      handleNextSection,
      makeFocused,
      locale,
      readOnly,
      setSelectionForSection,
      startSections,
      timezone,
      tryParse,
      updateInputAndSections,
    ],
  );

  const handleInputValueChange = useCallback(() => {
    // no-op: input value is derived from state
  }, []);

  return {
    inputRef,
    inputValue,
    focusedSection,
    handlePaste,
    handleFocus,
    handleClick,
    handleBlur,
    handleKeyDown,
    handleValueChange,
    handleInputValueChange,
  };
};
