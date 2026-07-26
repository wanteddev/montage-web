import atomic from '../atomic';
import opacity from '../opacity';
import { addHexOpacity } from '../../utils';

export const light = {
  static: {
    white: atomic.common[100],
    black: atomic.common[0],
  },
  foreground: {
    neutral: {
      primary: atomic.coolNeutral[10],
      strong: atomic.common[0],
      secondary: addHexOpacity(atomic.coolNeutral[22], opacity[88]),
      tertiary: addHexOpacity(atomic.coolNeutral[25], opacity[61]),
      quaternary: addHexOpacity(atomic.coolNeutral[25], opacity[28]),
      inverse: atomic.coolNeutral[99],
    },
    brand: {
      primary: atomic.blue[50],
      inverse: atomic.blue[60],
    },
    positive: {
      primary: atomic.green[50],
    },
    cautionary: {
      primary: atomic.orange[50],
    },
    negative: {
      primary: atomic.red[50],
      strong: atomic.red[40],
    },
    disable: {
      primary: addHexOpacity(atomic.coolNeutral[25], opacity[16]),
    },
    inactive: {
      primary: atomic.coolNeutral[70],
    },
    accent: {
      lime: atomic.lime[37],
      cyan: atomic.cyan[40],
      lightBlue: atomic.lightBlue[40],
      violet: atomic.violet[45],
      purple: atomic.purple[40],
      pink: atomic.pink[46],
    },
  },
  background: {
    neutral: {
      primary: atomic.common[100],
      secondary: atomic.coolNeutral[99],
    },
  },
  surface: {
    neutral: {
      primary: atomic.common[100],
      secondary: addHexOpacity(atomic.coolNeutral[50], opacity[8]),
      tertiary: addHexOpacity(atomic.coolNeutral[50], opacity[5]),
      strong: addHexOpacity(atomic.coolNeutral[50], opacity[16]),
      inverse: atomic.coolNeutral[15],
    },
    elevated: {
      primary: atomic.common[100],
      secondary: atomic.coolNeutral[99],
    },
    brand: {
      primary: atomic.blue[50],
      strong: atomic.blue[45],
      heavy: atomic.blue[40],
      subtle: addHexOpacity(atomic.blue[50], opacity[5]),
    },
    positive: {
      primary: addHexOpacity(atomic.green[50], opacity[8]),
    },
    cautionary: {
      primary: addHexOpacity(atomic.orange[50], opacity[8]),
    },
    negative: {
      primary: addHexOpacity(atomic.red[50], opacity[8]),
      strong: addHexOpacity(atomic.red[50], opacity[12]),
    },
    disable: {
      primary: atomic.coolNeutral[98],
    },
    accent: {
      lime: addHexOpacity(atomic.lime[50], opacity[8]),
      limeOpaque: atomic.lime[50],
      cyan: addHexOpacity(atomic.cyan[50], opacity[8]),
      cyanOpaque: atomic.cyan[50],
      lightBlue: addHexOpacity(atomic.lightBlue[50], opacity[8]),
      lightBlueOpaque: atomic.lightBlue[50],
      violet: addHexOpacity(atomic.violet[50], opacity[8]),
      violetOpaque: atomic.violet[50],
      purple: addHexOpacity(atomic.purple[50], opacity[8]),
      purpleOpaque: atomic.purple[50],
      pink: addHexOpacity(atomic.pink[50], opacity[8]),
      pinkOpaque: atomic.pink[50],
    },
  },
  line: {
    neutral: {
      primary: addHexOpacity(atomic.coolNeutral[50], opacity[22]),
      primaryOpaque: atomic.coolNeutral[96],
      secondary: addHexOpacity(atomic.coolNeutral[50], opacity[16]),
      secondaryOpaque: atomic.coolNeutral[97],
      tertiary: addHexOpacity(atomic.coolNeutral[50], opacity[8]),
      tertiaryOpaque: atomic.coolNeutral[98],
    },
    brand: {
      primary: addHexOpacity(atomic.blue[50], opacity[28]),
      strong: addHexOpacity(atomic.blue[50], opacity[43]),
      focus: addHexOpacity(atomic.blue[50], opacity[12]),
    },
    cautionary: {
      primary: addHexOpacity(atomic.orange[50], opacity[43]),
    },
    positive: {
      primary: addHexOpacity(atomic.green[50], opacity[43]),
    },
    negative: {
      primary: addHexOpacity(atomic.red[50], opacity[43]),
      strong: addHexOpacity(atomic.red[50], opacity[52]),
      focus: addHexOpacity(atomic.red[50], opacity[12]),
    },
    accent: {
      lime: addHexOpacity(atomic.lime[37], opacity[43]),
      cyan: addHexOpacity(atomic.cyan[40], opacity[43]),
      lightBlue: addHexOpacity(atomic.lightBlue[40], opacity[43]),
      violet: addHexOpacity(atomic.violet[45], opacity[43]),
      purple: addHexOpacity(atomic.purple[40], opacity[43]),
      pink: addHexOpacity(atomic.pink[46], opacity[43]),
    },
  },
  effect: {
    dimmer: {
      primary: addHexOpacity(atomic.coolNeutral[10], opacity[52]),
    },
    transparent: {
      primary: addHexOpacity(atomic.common[100], opacity[8]),
      secondary: addHexOpacity(atomic.common[100], opacity[28]),
    },
  },
  elevation: {
    shadow: {
      normal: {
        xsmall: `0px 1px 2px -1px ${addHexOpacity(atomic.neutral[10], 0.1)}`,
        small: `0px 2px 4px -2px ${addHexOpacity(atomic.neutral[10], 0.06)}, 0px 4px 6px -1px ${addHexOpacity(atomic.neutral[10], 0.06)}`,
        medium: `0px 4px 6px -2px ${addHexOpacity(atomic.neutral[10], 0.07)}, 0px 10px 15px -3px ${addHexOpacity(atomic.neutral[10], 0.07)}`,
        large: `0px 6px 10px -4px ${addHexOpacity(atomic.neutral[10], 0.08)}, 0px 16px 24px -6px ${addHexOpacity(atomic.neutral[10], 0.08)}`,
        xlarge: `0px 10px 15px -5px ${addHexOpacity(atomic.neutral[10], 0.1)}, 0px 24px 38px -10px ${addHexOpacity(atomic.neutral[10], 0.12)}`,
      },
      drop: {
        xsmall: `drop-shadow(0px 1px 0.5px ${addHexOpacity(atomic.neutral[10], 0.05)})`,
        small: `drop-shadow(0px 2px 1px ${addHexOpacity(atomic.neutral[10], 0.03)}) drop-shadow(0px 4px 2.5px ${addHexOpacity(atomic.neutral[10], 0.03)})`,
        medium: `drop-shadow(0px 4px 2px ${addHexOpacity(atomic.neutral[10], 0.035)}) drop-shadow(0px 10px 6px ${addHexOpacity(atomic.neutral[10], 0.035)})`,
        large: `drop-shadow(0px 6px 3px ${addHexOpacity(atomic.neutral[10], 0.04)}) drop-shadow(0px 16px 9px ${addHexOpacity(atomic.neutral[10], 0.03)})`,
        xlarge: `drop-shadow(0px 10px 5px ${addHexOpacity(atomic.neutral[10], 0.05)}) drop-shadow(0px 24px 14px ${addHexOpacity(atomic.neutral[10], 0.06)})`,
      },
      spread: {
        small: `0px 0px 60px 0px ${addHexOpacity(atomic.neutral[10], 0.1)}`,
        medium: `0px 15px 75px 0px ${addHexOpacity(atomic.neutral[10], 0.16)}`,
      },
    },
  },
};

export const dark = {
  static: {
    white: atomic.common[100],
    black: atomic.common[0],
  },
  foreground: {
    neutral: {
      primary: atomic.coolNeutral[99],
      strong: atomic.common[100],
      secondary: addHexOpacity(atomic.coolNeutral[90], opacity[88]),
      tertiary: addHexOpacity(atomic.coolNeutral[80], opacity[61]),
      quaternary: addHexOpacity(atomic.coolNeutral[80], opacity[28]),
      inverse: atomic.coolNeutral[10],
    },
    brand: {
      primary: atomic.blue[60],
      inverse: atomic.blue[50],
    },
    positive: {
      primary: atomic.green[60],
    },
    cautionary: {
      primary: atomic.orange[60],
    },
    negative: {
      primary: atomic.red[60],
      strong: atomic.red[60],
    },
    disable: {
      primary: addHexOpacity(atomic.coolNeutral[70], opacity[16]),
    },
    inactive: {
      primary: atomic.coolNeutral[40],
    },
    accent: {
      lime: atomic.lime[50],
      cyan: atomic.cyan[50],
      lightBlue: atomic.lightBlue[50],
      violet: atomic.violet[70],
      purple: atomic.purple[60],
      pink: atomic.pink[60],
    },
  },
  background: {
    neutral: {
      primary: atomic.coolNeutral[15],
      secondary: atomic.coolNeutral[5],
    },
  },
  surface: {
    neutral: {
      primary: atomic.coolNeutral[15],
      secondary: addHexOpacity(atomic.coolNeutral[50], opacity[22]),
      tertiary: addHexOpacity(atomic.coolNeutral[50], opacity[12]),
      strong: addHexOpacity(atomic.coolNeutral[50], opacity[28]),
      inverse: atomic.common[100],
    },
    elevated: {
      primary: atomic.coolNeutral[17],
      secondary: atomic.coolNeutral[7],
    },
    brand: {
      primary: atomic.blue[60],
      strong: atomic.blue[55],
      heavy: atomic.blue[50],
      subtle: addHexOpacity(atomic.blue[60], opacity[5]),
    },
    positive: {
      primary: addHexOpacity(atomic.green[60], opacity[8]),
    },
    cautionary: {
      primary: addHexOpacity(atomic.orange[60], opacity[8]),
    },
    negative: {
      primary: addHexOpacity(atomic.red[60], opacity[8]),
      strong: addHexOpacity(atomic.red[60], opacity[22]),
    },
    disable: {
      primary: atomic.coolNeutral[22],
    },
    accent: {
      lime: addHexOpacity(atomic.lime[60], opacity[8]),
      limeOpaque: atomic.lime[60],
      cyan: addHexOpacity(atomic.cyan[60], opacity[8]),
      cyanOpaque: atomic.cyan[60],
      lightBlue: addHexOpacity(atomic.lightBlue[60], opacity[8]),
      lightBlueOpaque: atomic.lightBlue[60],
      violet: addHexOpacity(atomic.violet[60], opacity[8]),
      violetOpaque: atomic.violet[60],
      purple: addHexOpacity(atomic.purple[60], opacity[8]),
      purpleOpaque: atomic.purple[60],
      pink: addHexOpacity(atomic.pink[60], opacity[8]),
      pinkOpaque: atomic.pink[60],
    },
  },
  line: {
    neutral: {
      primary: addHexOpacity(atomic.coolNeutral[50], 0.32),
      primaryOpaque: atomic.coolNeutral[25],
      secondary: addHexOpacity(atomic.coolNeutral[50], opacity[28]),
      secondaryOpaque: atomic.coolNeutral[23],
      tertiary: addHexOpacity(atomic.coolNeutral[50], opacity[22]),
      tertiaryOpaque: atomic.coolNeutral[22],
    },
    brand: {
      primary: addHexOpacity(atomic.blue[60], opacity[28]),
      strong: addHexOpacity(atomic.blue[60], opacity[43]),
      focus: addHexOpacity(atomic.blue[60], opacity[12]),
    },
    positive: {
      primary: addHexOpacity(atomic.green[60], opacity[43]),
    },
    cautionary: {
      primary: addHexOpacity(atomic.orange[60], opacity[43]),
    },
    negative: {
      primary: addHexOpacity(atomic.red[60], opacity[43]),
      strong: addHexOpacity(atomic.red[60], opacity[52]),
      focus: addHexOpacity(atomic.red[60], opacity[12]),
    },
    accent: {
      lime: addHexOpacity(atomic.lime[50], opacity[43]),
      cyan: addHexOpacity(atomic.cyan[50], opacity[43]),
      lightBlue: addHexOpacity(atomic.lightBlue[50], opacity[43]),
      violet: addHexOpacity(atomic.violet[70], opacity[43]),
      purple: addHexOpacity(atomic.purple[60], opacity[43]),
      pink: addHexOpacity(atomic.pink[60], opacity[43]),
    },
  },
  effect: {
    dimmer: {
      primary: addHexOpacity(atomic.coolNeutral[10], opacity[74]),
    },
    transparent: {
      primary: addHexOpacity(atomic.coolNeutral[17], opacity[61]),
      secondary: addHexOpacity(atomic.coolNeutral[17], opacity[61]),
    },
  },
  elevation: {
    shadow: {
      normal: {
        xsmall: `0px 1px 2px -1px ${addHexOpacity(atomic.neutral[10], 0.1)}`,
        small: `0px 2px 4px -2px ${addHexOpacity(atomic.neutral[10], 0.06)}, 0px 4px 6px -1px ${addHexOpacity(atomic.neutral[10], 0.06)}`,
        medium: `0px 4px 6px -2px ${addHexOpacity(atomic.neutral[10], 0.07)}, 0px 10px 15px -3px ${addHexOpacity(atomic.neutral[10], 0.07)}`,
        large: `0px 6px 10px -4px ${addHexOpacity(atomic.neutral[10], 0.08)}, 0px 16px 24px -6px ${addHexOpacity(atomic.neutral[10], 0.08)}`,
        xlarge: `0px 10px 15px -5px ${addHexOpacity(atomic.neutral[10], 0.1)}, 0px 24px 38px -10px ${addHexOpacity(atomic.neutral[10], 0.12)}`,
      },
      drop: {
        xsmall: `drop-shadow(0px 1px 0.5px ${addHexOpacity(atomic.neutral[10], 0.05)})`,
        small: `drop-shadow(0px 2px 1px ${addHexOpacity(atomic.neutral[10], 0.03)}) drop-shadow(0px 4px 2.5px ${addHexOpacity(atomic.neutral[10], 0.03)})`,
        medium: `drop-shadow(0px 4px 2px ${addHexOpacity(atomic.neutral[10], 0.035)}) drop-shadow(0px 10px 6px ${addHexOpacity(atomic.neutral[10], 0.035)})`,
        large: `drop-shadow(0px 6px 3px ${addHexOpacity(atomic.neutral[10], 0.04)}) drop-shadow(0px 16px 9px ${addHexOpacity(atomic.neutral[10], 0.03)})`,
        xlarge: `drop-shadow(0px 10px 5px ${addHexOpacity(atomic.neutral[10], 0.05)}) drop-shadow(0px 24px 14px ${addHexOpacity(atomic.neutral[10], 0.06)})`,
      },
      spread: {
        small: `0px 0px 60px 0px ${addHexOpacity(atomic.neutral[10], 0.1)}`,
        medium: `0px 15px 75px 0px ${addHexOpacity(atomic.neutral[10], 0.16)}`,
      },
    },
  },
};
