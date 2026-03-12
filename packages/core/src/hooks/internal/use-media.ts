import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const useMedia = <T>(
  queries: Array<string>,
  values: Array<T>,
  defaultValue: T,
): T => {
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const defaultValueRef = useRef(defaultValue);
  defaultValueRef.current = defaultValue;

  const mediaQueryLists = useMemo(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    return queries.map((q) => window.matchMedia(q));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, Object.values(queries));

  const getValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return defaultValueRef.current;
    }

    const index = mediaQueryLists.findIndex((mql) => mql.matches);

    return typeof valuesRef.current[index] !== 'undefined'
      ? (valuesRef.current[index] as T)
      : defaultValueRef.current;
  }, [mediaQueryLists]);

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);
    handler();
    mediaQueryLists.forEach((mql) => mql.addEventListener('change', handler));
    return () =>
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener('change', handler),
      );
  }, [mediaQueryLists, getValue]);

  return value;
};
