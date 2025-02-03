import { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

import {
  dateTypeToDateObject,
  dayjsTimezone,
  getMeridiem,
  isValidDate,
} from '../date-calendar/helpers';
import { getTabbableCandidates } from '../focus-scope/helpers';

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
  readOnly: boolean | undefined;
  disabled: boolean | undefined;
};

export const useDateField = ({
  value,
  format = 'YYYY.MM.DD',
  locale,
  timezone,
  setValue,
  readOnly,
  disabled,
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
    sectionValueRef.current = '';
  }, [focusedSection?.index]);

  const handleValueChange = useCallback(
    (v: DateType) => {
      const newInputValue = isValidDate(v)
        ? toFormat(v, format, locale, timezone)
        : '';
      isTriggeredChange.current = true;
      setInputValue(newInputValue);
      setSections(getDateformatSections(newInputValue, format, locale));

      if (focusedSection) {
        setFocusedSection(sections[focusedSection.index]);
      }
    },
    [focusedSection, format, locale, sections, timezone],
  );

  const handleInputValueChange = useCallback(() => {
    const newInputValue = !inputValue ? format : inputValue;
    setInputValue(newInputValue);
  }, [inputValue, format]);

  useEffect(() => {
    const newInputValue = !inputValue
      ? ''
      : isValidDate(value)
        ? toFormat(value, format, locale, timezone)
        : format;

    const newSections = getDateformatSections(newInputValue, format, locale);
    setSections(newSections);

    if (focusedSection) {
      setFocusedSection(newSections[focusedSection.index]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, locale, timezone]);

  const isFirstRender = useRef(true);
  const isTriggeredChange = useRef(false);

  const prevTimezone = useRef(timezone);

  useEffect(() => {
    if (isFirstRender.current || isTriggeredChange.current) {
      isFirstRender.current = false;
      isTriggeredChange.current = false;
      return;
    }

    if (!inputValue) {
      setSections(getDateformatSections(format, format, locale));
    } else {
      const newInputValue = isValidDate(value)
        ? toFormat(value, format, locale, timezone)
        : format;

      setInputValue(newInputValue);
      setSections(getDateformatSections(newInputValue, format, locale));

      if (focusedSection) {
        setFocusedSection(sections[focusedSection.index]);
      }
    }

    if (isValidDate(value) && prevTimezone.current !== timezone) {
      setValue(dateTypeToDateObject(value, timezone));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timezone, value, locale, format]);

  const handleNextSection = useCallback(
    (newInputValue: string, newSectionValue: Array<DateFormatSection>) => {
      if (!focusedSection) {
        return;
      }
      const nextSection = newSectionValue[focusedSection.index + 1];

      const parsedDate = parseFromFormat(
        newInputValue,
        format,
        locale,
        timezone,
      );

      if (parsedDate && !readOnly && !disabled) {
        setValue(parsedDate);
        isTriggeredChange.current = true;
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
        const nextFocusedSection =
          newSectionValue.find(
            (section) => section.format === focusedSection.format,
          ) ?? focusedSection;

        requestAnimationFrame(() => {
          inputRef.current?.setSelectionRange(
            nextFocusedSection.startIndex,
            nextFocusedSection.endIndex,
          );
        });
      }

      sectionValueRef.current = '';
    },
    [focusedSection, format, locale, setValue, timezone, readOnly, disabled],
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      const newValue = e.clipboardData.getData('text');

      e.preventDefault();

      if (!focusedSection || readOnly || disabled) {
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
          isTriggeredChange.current = true;
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

          const newSectionValue = getDateformatSections(
            newInputValue,
            format,
            locale,
          );

          handleNextSection(newInputValue, newSectionValue);
        }
      } else {
        const numericValue = parseInt(newValue);

        if (!isNaN(numericValue)) {
          const newInputValue =
            inputValue.slice(0, focusedSection.startIndex) +
            `${numericValue}` +
            inputValue.slice(focusedSection.endIndex);

          const newSectionValue = getDateformatSections(
            newInputValue,
            format,
            locale,
          );

          setInputValue(newInputValue);
          handleNextSection(newInputValue, newSectionValue);
        }
      }
    },
    [
      focusedSection,
      readOnly,
      disabled,
      inputValue,
      format,
      locale,
      timezone,
      setValue,
      sections,
      handleNextSection,
    ],
  );

  const focusTimestamp = useRef(0);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      if ('setSelectionRange' in e.currentTarget) {
        let cursorPosition = e.currentTarget.selectionStart ?? 0;

        if (!inputValue || e.timeStamp - focusTimestamp.current < 300) {
          cursorPosition = 0;
        }

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
    [inputValue, sections],
  );

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (
        e.currentTarget.tagName !== 'TEXTAREA' &&
        e.currentTarget.tagName !== 'INPUT'
      ) {
        return;
      }

      let cursorPosition = e.currentTarget.selectionStart ?? 0;

      if (!inputValue) {
        cursorPosition = 0;
        focusTimestamp.current = e.timeStamp;
      }

      const newInputValue = !inputValue ? format : inputValue;
      const newSections = getDateformatSections(newInputValue, format, locale);

      setSections(newSections);
      setInputValue(newInputValue);

      const closetSection = getClosetSection(cursorPosition, newSections);

      if (closetSection) {
        e.preventDefault();
        setFocusedSection(closetSection);
        e.currentTarget.setSelectionRange(
          closetSection.startIndex,
          closetSection.endIndex,
        );
      }
    },
    [format, inputValue, locale],
  );

  const handleBlur = useCallback(() => {
    setFocusedSection(undefined);

    if (inputValue === format) {
      setInputValue('');
    }
  }, [format, inputValue]);

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
        case 'Tab':
          const tabbableCandidates = getTabbableCandidates(document.body);

          const index = tabbableCandidates.findIndex(
            (v) => v === e.currentTarget,
          );

          if (index === -1) {
            return;
          }

          const nextTabbableCandidate =
            tabbableCandidates[e.shiftKey ? index - 1 : index + 1];

          if (nextTabbableCandidate) {
            e.preventDefault();
            nextTabbableCandidate.focus();
          } else {
            e.currentTarget.blur();
          }
          return;
        case 'Backspace':
          e.preventDefault();

          if (readOnly || disabled) {
            return;
          }

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
              isTriggeredChange.current = true;
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
            isTriggeredChange.current = true;
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

          if (readOnly || disabled) {
            return;
          }

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
              isTriggeredChange.current = true;
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
              isTriggeredChange.current = true;
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

          if (readOnly || disabled) {
            return;
          }

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
              isTriggeredChange.current = true;
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
              isTriggeredChange.current = true;
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

      if (e.ctrlKey || e.metaKey || e.altKey || readOnly || disabled) {
        return;
      }

      if (focusedSection.type === 'text') {
        const foundOption = focusedSection.options.filter((v) => {
          if (/^a$/i.test(focusedSection.format)) {
            const meridiem = getMeridiem(locale);
            const [am, pm] = meridiem.map((m) =>
              focusedSection.format === 'a' ? m.lower : m.upper,
            );

            return new RegExp(
              `^${lowerKey === 'a' ? am : lowerKey === 'p' ? pm : '$^'}`,
            ).test(v);
          }

          return new RegExp(
            '^' + String.raw`${sectionValueRef.current}${lowerKey}`,
          ).test(v.toLowerCase());
        });

        let newInputValue: string;
        let isFinished = false;

        if (foundOption.length > 0) {
          newInputValue =
            inputValue.slice(0, focusedSection.startIndex) + foundOption[0];

          const foundOptionValue = foundOption[0] ?? '';
          const prevFocusedSection =
            sections.find(
              (section) => section.format === focusedSection.format,
            ) ?? focusedSection;
          const isLastSection = sections.length - 1 === focusedSection.index;
          const lengthDiff =
            prevFocusedSection.value.length - foundOptionValue.length;

          if (isLastSection) {
            newInputValue += inputValue.slice(
              lengthDiff > 0
                ? prevFocusedSection.endIndex + lengthDiff
                : focusedSection.endIndex,
            );
          } else {
            newInputValue += inputValue.slice(focusedSection.endIndex);
          }

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

        e.preventDefault();
        const newSectionValue = getDateformatSections(
          newInputValue,
          format,
          locale,
        );

        if (isFinished) {
          setInputValue(newInputValue);
          setSections(newSectionValue);
          handleNextSection(newInputValue, newSectionValue);
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
            isTriggeredChange.current = true;
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

        e.preventDefault();

        if (isComplete(sectionValueRef.current)) {
          setInputValue(newInputValue);
          setSections(newSectionValue);
          handleNextSection(newInputValue, newSectionValue);
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
            isTriggeredChange.current = true;
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
      readOnly,
      disabled,
      inputValue,
      format,
      locale,
      timezone,
      sections,
      setValue,
      value,
      handleNextSection,
    ],
  );

  return {
    inputRef,
    inputValue,
    focusedSection,
    sections,
    handlePaste,
    handleFocus,
    handleClick,
    handleBlur,
    handleKeyDown,
    handleValueChange,
    handleInputValueChange,
  };
};
