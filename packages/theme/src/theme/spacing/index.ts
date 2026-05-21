import primitive from '../primitive';

const spacing = {
  0: primitive[0],
  0.5: '0.5px',
  2: primitive[2],
  4: primitive[4],
  6: primitive[6],
  8: primitive[8],
  10: primitive[10],
  12: primitive[12],
  14: primitive[14],
  16: primitive[16],
  20: primitive[20],
  24: primitive[24],
  32: primitive[32],
  40: primitive[40],
  48: primitive[48],
  56: primitive[56],
  64: primitive[64],
  72: primitive[72],
  80: primitive[80],
} as const;

export default spacing;
