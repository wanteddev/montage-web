import { useEffect } from 'react';

import * as helpers from './helpers';

import type {
  TimePickerInputProps,
  TimePickerValue,
  TimeSection,
} from './types';

type Props = Pick<TimePickerInputProps, 'format' | 'hourFormat'> & {
  item: HTMLInputElement | null;
  inputValue: string;
  targetSection: TimeSection | null;
  setValue: (value: TimePickerValue) => void;
  setInputValue: (value: string) => void;
  setTargetSection: (section: TimeSection) => void;
};

const useTimePicker = ({
  format,
  item,
  targetSection,
  inputValue,
  setValue,
  setInputValue,
  setTargetSection,
}: Props) => {
  const getNewInputValue = (value: string) => {
    if (!targetSection) return '';

    return helpers.getNewInputValue({
      section: targetSection,
      value,
      inputValue,
    });
  };

  const setSection = (type: helpers.GetSectionParams['type']) => {
    if (!targetSection || !item) return;

    const section = helpers.getSection({
      type,
      format,
      inputValue,
      sectionType: targetSection.type,
      status: 'update',
    });

    if (section) {
      item.setSelectionRange(section.start, section.end);
      setTargetSection(section);
    }
  };

  const setInputValueAndSection = (
    value: string,
    type: helpers.GetSectionParams['type'],
  ) => {
    if (!targetSection || !item) return;

    const newInputValue = getNewInputValue(value);
    const section = helpers.getSection({
      type,
      format,
      inputValue: newInputValue,
      sectionType: targetSection.type,
      status: 'update',
    });

    if (section) {
      item.value = newInputValue;
      item.setSelectionRange(section.start, section.end);

      setInputValue(newInputValue);
      setTargetSection(section);
    }
  };

  useEffect(() => {
    setValue(helpers.getTimeValue({ format, inputValue }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return {
    setSection,
    setInputValue,
    setInputValueAndSection,
  };
};

export default useTimePicker;
