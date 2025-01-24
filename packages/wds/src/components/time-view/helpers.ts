export type GetTimeUnitsResult = ReturnType<typeof getHours>;

type GetHoursParams = {
  step?: number;
  is12Hour?: boolean;
};

export const getHours = ({ step = 1, is12Hour = false }: GetHoursParams) => {
  const start = is12Hour ? 1 : 0;
  const end = is12Hour ? 12 : 23;

  return new Array(Math.floor((end - start + 1) / step)).fill(0).map((_, i) => {
    const value = start + i * step;

    return {
      value,
      digit: value.toString(),
    };
  });
};

export const getMinutes = (step = 5) => {
  return new Array(Math.floor(60 / step)).fill(0).map((_, i) => {
    const value = i * step;

    return {
      value,
      digit: value.toString(),
    };
  });
};

export const getSeconds = (step = 5) => {
  return new Array(Math.floor(60 / step)).fill(0).map((_, i) => {
    const value = i * step;

    return {
      value,
      digit: value.toString(),
    };
  });
};
