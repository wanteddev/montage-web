import primitive from '../primitive';

const radius = {
  0: primitive[0],
  4: primitive[4],
  8: primitive[8],
  10: primitive[10],
  12: primitive[12],
  14: primitive[14],
  16: primitive[16],
  20: primitive[20],
  24: primitive[24],
  full: primitive[9999],
} as const;

export default radius;
