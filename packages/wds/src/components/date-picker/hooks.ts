import { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

import { dayjsTimezone, isValidDate } from '../date-calendar/helpers';

import {
  getClosetSection,
  getDateformatSections,
  getNumericFormatRange,
  getRegexFormat,
  parseFromFormat,
  toFormat,
} from './helpers';

import type { DateType } from '../date-calendar/types';
import type { DateFormatSection } from './helpers';
import type {
  ClipboardEvent,
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  SetStateAction,
} from 'react';
import type { DatePickerProps } from './types';

type UseDateFieldParams = Pick<
  DatePickerProps,
  'value' | 'format' | 'locale' | 'timezone'
> & {
  setValue: Dispatch<SetStateAction<DateType>>;
};

export const useDateField = ({
  value,
  format = 'YYYY.MM.DD',
  locale,
  timezone,
  setValue,
}: UseDateFieldParams) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focusedSection, setFocusedSection] = useState<DateFormatSection>();

  const [inputValue, setInputValue] = useState(
    isValidDate(value) ? toFormat(value, format, locale, timezone) : '',
  );
  const [sections, setSections] = useState(
    getDateformatSections(inputValue, format, locale),
  );
  const sectionValueRef = useRef('');

  useEffect(() => {
    setSections(getDateformatSections(inputValue, format, locale));

    if (focusedSection) {
      setFocusedSection(sections[focusedSection.index]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, locale]);

  useEffect(() => {
    sectionValueRef.current = '';
  }, [focusedSection?.index]);

  const handleValueChange = useCallback(
    (v: DateType) => {
      const newInputValue = isValidDate(v)
        ? toFormat(v, format, locale, timezone)
        : '';
      setInputValue(newInputValue);
      setSections(getDateformatSections(newInputValue, format, locale));

      if (focusedSection) {
        setFocusedSection(sections[focusedSection.index]);
      }
    },
    [focusedSection, format, locale, sections, timezone],
  );

  const handleNextSection = useCallback(
    (newInputValue: string) => {
      if (!focusedSection) {
        return;
      }
      const nextSection = sections[focusedSection.index + 1];

      const parsedDate = parseFromFormat(
        newInputValue,
        format,
        locale,
        timezone,
      );

      if (parsedDate) {
        setValue(parsedDate);
      }

      if (nextSection) {
        setFocusedSection(nextSection);
        requestAnimationFrame(() => {
          inputRef.current?.setSelectionRange(
            nextSection.startIndex,
            nextSection.endIndex,
          );
        });
      } else {
        requestAnimationFrame(() => {
          inputRef.current?.setSelectionRange(
            focusedSection.startIndex,
            focusedSection.endIndex,
          );
        });
      }

      sectionValueRef.current = '';
    },
    [focusedSection, format, locale, sections, setValue, timezone],
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      const newValue = e.clipboardData.getData('text');

      e.preventDefault();

      if (!focusedSection) {
        return;
      }

      if (
        e.currentTarget.selectionStart === 0 &&
        e.currentTarget.selectionEnd === inputValue.length
      ) {
        const parsedDate = parseFromFormat(newValue, format, locale, timezone);

        if (parsedDate && isValidDate(parsedDate)) {
          const newSectionValue = getDateformatSections(
            newValue,
            format,
            locale,
          );
          setValue(parsedDate);
          setInputValue(newValue);
          setSections(newSectionValue);
          setFocusedSection(newSectionValue[newSectionValue.length - 1]);

          requestAnimationFrame(() => {
            inputRef.current?.setSelectionRange(
              newSectionValue[newSectionValue.length - 1]!.startIndex,
              newSectionValue[newSectionValue.length - 1]!.endIndex,
            );
          });
          return;
        } else {
          inputRef.current?.setSelectionRange(
            sections[focusedSection.index]!.startIndex,
            sections[focusedSection.index]!.endIndex,
          );
          return;
        }
      }

      if (focusedSection.type === 'text') {
        const regex = getRegexFormat(focusedSection.format, locale);
        const match = newValue.match(regex);

        if (match) {
          const newInputValue =
            inputValue.slice(0, focusedSection.startIndex) +
            match[0] +
            inputValue.slice(focusedSection.endIndex);

          setInputValue(newInputValue);

          const parsedDate = parseFromFormat(
            newInputValue,
            format,
            locale,
            timezone,
          );

          if (parsedDate) {
            setValue(parsedDate);
          }

          handleNextSection(newInputValue);
        }
      } else {
        const numericValue = parseInt(newValue);

        if (!isNaN(numericValue)) {
          const newInputValue =
            inputValue.slice(0, focusedSection.startIndex) +
            `${numericValue}` +
            inputValue.slice(focusedSection.endIndex);

          setInputValue(newInputValue);
          handleNextSection(newInputValue);
        }
      }
    },
    [
      focusedSection,
      format,
      handleNextSection,
      inputValue,
      locale,
      sections,
      setValue,
      timezone,
    ],
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      if ('setSelectionRange' in e.currentTarget) {
        const cursorPosition = e.currentTarget.selectionStart ?? 0;

        const closetSection = getClosetSection(cursorPosition, sections);
        if (closetSection) {
          e.preventDefault();
          setFocusedSection(closetSection);
          e.currentTarget.setSelectionRange(
            closetSection.startIndex,
            closetSection.endIndex,
          );
        }
      }
    },
    [sections],
  );

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (
        e.currentTarget.tagName !== 'TEXTAREA' &&
        e.currentTarget.tagName !== 'INPUT'
      ) {
        return;
      }

      const cursorPosition = e.currentTarget.selectionStart ?? 0;

      const closetSection = getClosetSection(cursorPosition, sections);
      if (closetSection) {
        e.preventDefault();
        setFocusedSection(closetSection);
        e.currentTarget.setSelectionRange(
          closetSection.startIndex,
          closetSection.endIndex,
        );
      }
    },
    [sections],
  );

  const handleBlur = useCallback(() => {
    setFocusedSection(undefined);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (
        (e.currentTarget.tagName !== 'TEXTAREA' &&
          e.currentTarget.tagName !== 'INPUT') ||
        !focusedSection
      ) {
        return;
      }
      switch (e.key) {
        case 'Backspace':
          e.preventDefault();

          sectionValueRef.current = '';

          if (
            e.currentTarget.selectionStart === 0 &&
            e.currentTarget.selectionEnd === inputValue.length
          ) {
            const removedInputValue = format;

            const removedSections = getDateformatSections(
              format,
              format,
              locale,
            );

            const parsedNewDateFromFormat = parseFromFormat(
              removedInputValue,
              format,
              locale,
              timezone,
            );

            setInputValue(removedInputValue);
            setSections(removedSections);
            setFocusedSection(removedSections[0]);
            if (parsedNewDateFromFormat) {
              setValue(parsedNewDateFromFormat);
            }

            if (removedSections[0]) {
              requestAnimationFrame(() => {
                inputRef.current?.setSelectionRange(
                  removedSections[0]!.startIndex,
                  removedSections[0]!.endIndex,
                );
              });
            }

            return;
          }

          const removedInputValue =
            inputValue.slice(0, focusedSection.startIndex) +
            focusedSection.format +
            inputValue.slice(focusedSection.endIndex);

          const removedSections = getDateformatSections(
            removedInputValue,
            format,
            locale,
          );

          const parsedNewDateFromFormat = parseFromFormat(
            removedInputValue,
            format,
            locale,
            timezone,
          );

          setInputValue(removedInputValue);
          setSections(removedSections);
          setFocusedSection(removedSections[focusedSection.index]);
          if (parsedNewDateFromFormat) {
            setValue(parsedNewDateFromFormat);
          }

          requestAnimationFrame(() => {
            inputRef.current?.setSelectionRange(
              removedSections[focusedSection.index]!.startIndex,
              removedSections[focusedSection.index]!.endIndex,
            );
          });

          return;
        case 'ArrowUp':
          e.preventDefault();

          if (focusedSection.type === 'text') {
            const optionIndex = focusedSection.options.indexOf(
              focusedSection.value,
            );

            const newInputValue =
              inputValue.slice(0, focusedSection.startIndex) +
              focusedSection.options[
                optionIndex === -1
                  ? 0
                  : (optionIndex + 1) % focusedSection.options.length
              ] +
              inputValue.slice(focusedSection.endIndex);

            const newSectionValue = getDateformatSections(
              newInputValue,
              format,
              locale,
            );

            const parsedDate = parseFromFormat(
              newInputValue,
              format,
              locale,
              timezone,
            );

            setInputValue(newInputValue);
            setSections(newSectionValue);
            setFocusedSection(newSectionValue[focusedSection.index]);
            if (parsedDate) {
              setValue(parsedDate);
            }

            requestAnimationFrame(() => {
              inputRef.current?.setSelectionRange(
                newSectionValue[focusedSection.index]!.startIndex,
                newSectionValue[focusedSection.index]!.endIndex,
              );
            });
          } else {
            const { minValue, maxValue } = getNumericFormatRange(
              focusedSection.format,
              value,
              timezone,
            );

            let newParsedValue: string;

            if (isNaN(parseInt(focusedSection.value))) {
              if (
                focusedSection.format === 'YY' ||
                focusedSection.format === 'YYYY'
              ) {
                newParsedValue = dayjsTimezone(dayjs(), timezone).format(
                  focusedSection.format,
                );
              } else {
                newParsedValue = minValue
                  .toString()
                  .padStart(focusedSection.format.length, '0');
              }
            } else if (maxValue <= parseInt(focusedSection.value)) {
              newParsedValue = minValue
                .toString()
                .padStart(focusedSection.format.length, '0');
            } else {
              newParsedValue = (parseInt(focusedSection.value) + 1)
                .toString()
                .padStart(focusedSection.format.length, '0');
            }

            const newInputValue =
              inputValue.slice(0, focusedSection.startIndex) +
              newParsedValue +
              inputValue.slice(focusedSection.endIndex);

            const newSectionValue = getDateformatSections(
              newInputValue,
              format,
              locale,
            );

            const parsedDate = parseFromFormat(
              newInputValue,
              format,
              locale,
              timezone,
            );

            setInputValue(newInputValue);
            setSections(newSectionValue);
            setFocusedSection(newSectionValue[focusedSection.index]);
            if (parsedDate) {
              setValue(parsedDate);
            }

            requestAnimationFrame(() => {
              inputRef.current?.setSelectionRange(
                newSectionValue[focusedSection.index]!.startIndex,
                newSectionValue[focusedSection.index]!.endIndex,
              );
            });
          }
          return;
        case 'ArrowDown':
          e.preventDefault();

          if (focusedSection.type === 'text') {
            const optionIndex = focusedSection.options.indexOf(
              focusedSection.value,
            );

            const newInputValue =
              inputValue.slice(0, focusedSection.startIndex) +
              focusedSection.options[
                optionIndex === -1
                  ? focusedSection.options.length - 1
                  : optionIndex === 0
                    ? focusedSection.options.length - 1
                    : optionIndex - 1
              ] +
              inputValue.slice(focusedSection.endIndex);

            const newSectionValue = getDateformatSections(
              newInputValue,
              format,
              locale,
            );

            const parsedDate = parseFromFormat(
              newInputValue,
              format,
              locale,
              timezone,
            );

            setInputValue(newInputValue);
            setSections(newSectionValue);
            setFocusedSection(newSectionValue[focusedSection.index]);
            if (parsedDate) {
              setValue(parsedDate);
            }

            requestAnimationFrame(() => {
              inputRef.current?.setSelectionRange(
                newSectionValue[focusedSection.index]!.startIndex,
                newSectionValue[focusedSection.index]!.endIndex,
              );
            });
          } else {
            const { minValue, maxValue } = getNumericFormatRange(
              focusedSection.format,
              value,
              timezone,
            );

            let newParsedValue: string;

            if (isNaN(parseInt(focusedSection.value))) {
              if (
                focusedSection.format === 'YY' ||
                focusedSection.format === 'YYYY'
              ) {
                newParsedValue = dayjsTimezone(dayjs(), timezone).format(
                  focusedSection.format,
                );
              } else {
                newParsedValue = minValue
                  .toString()
                  .padStart(focusedSection.format.length, '0');
              }
            } else if (minValue >= parseInt(focusedSection.value)) {
              newParsedValue = maxValue
                .toString()
                .padStart(focusedSection.format.length, '0');
            } else {
              newParsedValue = (parseInt(focusedSection.value) - 1)
                .toString()
                .padStart(focusedSection.format.length, '0');
            }

            const newInputValue =
              inputValue.slice(0, focusedSection.startIndex) +
              newParsedValue +
              inputValue.slice(focusedSection.endIndex);

            const newSectionValue = getDateformatSections(
              newInputValue,
              format,
              locale,
            );

            const parsedDate = parseFromFormat(
              newInputValue,
              format,
              locale,
              timezone,
            );

            setInputValue(newInputValue);
            setSections(newSectionValue);
            setFocusedSection(newSectionValue[focusedSection.index]);
            if (parsedDate) {
              setValue(parsedDate);
            }

            requestAnimationFrame(() => {
              inputRef.current?.setSelectionRange(
                newSectionValue[focusedSection.index]!.startIndex,
                newSectionValue[focusedSection.index]!.endIndex,
              );
            });
          }
          return;
        case 'ArrowRight':
          e.preventDefault();
          if (focusedSection.index === sections.length - 1) {
            requestAnimationFrame(() => {
              inputRef.current?.setSelectionRange(
                focusedSection.startIndex,
                focusedSection.endIndex,
              );
            });
            return;
          }
          setFocusedSection(sections[focusedSection.index + 1]);
          requestAnimationFrame(() => {
            inputRef.current?.setSelectionRange(
              sections[focusedSection.index + 1]!.startIndex,
              sections[focusedSection.index + 1]!.endIndex,
            );
          });
          return;
        case 'ArrowLeft':
          e.preventDefault();
          if (focusedSection.index === 0) {
            requestAnimationFrame(() => {
              inputRef.current?.setSelectionRange(
                focusedSection.startIndex,
                focusedSection.endIndex,
              );
            });
            return;
          }
          setFocusedSection(sections[focusedSection.index - 1]);
          requestAnimationFrame(() => {
            inputRef.current?.setSelectionRange(
              sections[focusedSection.index - 1]!.startIndex,
              sections[focusedSection.index - 1]!.endIndex,
            );
          });
          return;
      }

      const lowerKey = e.key.toLowerCase();

      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      e.preventDefault();

      if (focusedSection.type === 'text') {
        const foundOption = focusedSection.options.filter((v) =>
          new RegExp(
            '^' + String.raw`${sectionValueRef.current}${lowerKey}`,
          ).test(v.toLowerCase()),
        );

        let newInputValue: string;
        let isFinished = false;

        if (foundOption.length > 0) {
          newInputValue =
            inputValue.slice(0, focusedSection.startIndex) +
            foundOption[0] +
            inputValue.slice(focusedSection.endIndex);

          sectionValueRef.current += lowerKey;
          isFinished = foundOption.length === 1;
        } else {
          sectionValueRef.current = lowerKey;

          const fallbackOption = focusedSection.options.filter((v) =>
            new RegExp('^' + String.raw`${sectionValueRef.current}`).test(
              v.toLowerCase(),
            ),
          );

          if (fallbackOption.length === 0) {
            return;
          }

          newInputValue =
            inputValue.slice(0, focusedSection.startIndex) +
            fallbackOption[0] +
            inputValue.slice(focusedSection.endIndex);

          isFinished = fallbackOption.length === 1;
        }

        const newSectionValue = getDateformatSections(
          newInputValue,
          format,
          locale,
        );

        if (isFinished) {
          setInputValue(newInputValue);
          setSections(newSectionValue);
          handleNextSection(newInputValue);
        } else {
          const parsedDate = parseFromFormat(
            newInputValue,
            format,
            locale,
            timezone,
          );

          setInputValue(newInputValue);
          setSections(newSectionValue);
          setFocusedSection(newSectionValue[focusedSection.index]);
          if (parsedDate) {
            setValue(parsedDate);
          }

          requestAnimationFrame(() => {
            inputRef.current?.setSelectionRange(
              newSectionValue[focusedSection.index]!.startIndex,
              newSectionValue[focusedSection.index]!.endIndex,
            );
          });
        }
      } else {
        // numeric
        const numericValue = parseInt(lowerKey);

        if (isNaN(numericValue)) {
          return;
        }

        const { isComplete } = getNumericFormatRange(
          focusedSection.format,
          value,
          timezone,
        );

        sectionValueRef.current = (sectionValueRef.current + lowerKey).slice(
          focusedSection.format.length * -1,
        );

        const newInputValue =
          inputValue.slice(0, focusedSection.startIndex) +
          `${sectionValueRef.current.padStart(focusedSection.format.length, '0')}` +
          inputValue.slice(focusedSection.endIndex);

        const newSectionValue = getDateformatSections(
          newInputValue,
          format,
          locale,
        );

        if (isComplete(sectionValueRef.current)) {
          setInputValue(newInputValue);
          setSections(newSectionValue);
          handleNextSection(newInputValue);
        } else {
          const parsedDate = parseFromFormat(
            newInputValue,
            format,
            locale,
            timezone,
          );

          setInputValue(newInputValue);
          setSections(newSectionValue);
          setFocusedSection(newSectionValue[focusedSection.index]);
          if (parsedDate) {
            setValue(parsedDate);
          }

          requestAnimationFrame(() => {
            inputRef.current?.setSelectionRange(
              newSectionValue[focusedSection.index]!.startIndex,
              newSectionValue[focusedSection.index]!.endIndex,
            );
          });
        }
      }
    },
    [
      focusedSection,
      format,
      handleNextSection,
      inputValue,
      locale,
      sections,
      setValue,
      timezone,
      value,
    ],
  );

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
  };
};
