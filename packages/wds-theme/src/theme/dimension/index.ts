import primitive from '../primitive';

const dimension = {
  14: primitive[14],
  16: primitive[16],
  18: primitive[18],
  20: primitive[20],
  24: primitive[24],
  32: primitive[32],
  40: primitive[40],
  48: primitive[48],
  56: primitive[56],
  64: primitive[64],
} as const;

export default dimension;
