import atomic from '../atomic';
import opacity from '../opacity';
import { addHexOpacity } from '../../utils';

export const light = {
  static: {
    white: atomic.common[100],
    black: atomic.common[0],
  },
  primary: {
    normal: atomic.blue[50],
    strong: atomic.blue[45],
    heavy: atomic.blue[40],
  },
  label: {
    normal: atomic.coolNeutral[10],
    strong: atomic.common[0],
    neutral: addHexOpacity(atomic.coolNeutral[22], opacity[88]),
    alternative: addHexOpacity(atomic.coolNeutral[25], opacity[61]),
    assistive: addHexOpacity(atomic.coolNeutral[25], opacity[28]),
    disable: addHexOpacity(atomic.coolNeutral[25], opacity[16]),
  },
  background: {
    normal: {
      normal: atomic.common[100],
      alternative: atomic.coolNeutral[99],
    },
    elevated: {
      normal: atomic.common[100],
      alternative: atomic.coolNeutral[99],
    },
  },
  interaction: {
    inactive: atomic.coolNeutral[70],
    disable: atomic.coolNeutral[98],
  },
  line: {
    normal: {
      normal: addHexOpacity(atomic.coolNeutral[50], opacity[22]),
      neutral: addHexOpacity(atomic.coolNeutral[50], opacity[16]),
      alternative: addHexOpacity(atomic.coolNeutral[50], opacity[8]),
    },
    solid: {
      normal: atomic.coolNeutral[96],
      neutral: atomic.coolNeutral[97],
      alternative: atomic.coolNeutral[98],
    },
  },
  status: {
    positive: atomic.green[50],
    cautionary: atomic.orange[50],
    negative: atomic.red[50],
  },
  accent: {
    background: {
      lime: atomic.lime[50],
      cyan: atomic.cyan[50],
      lightBlue: atomic.lightBlue[50],
      violet: atomic.violet[50],
      pink: atomic.pink[50],
      redOrange: atomic.redOrange[50],
      purple: atomic.purple[50],
    },
    foreground: {
      red: atomic.red[40],
      redOrange: atomic.redOrange[48],
      orange: atomic.orange[39],
      lime: atomic.lime[37],
      green: atomic.green[40],
      cyan: atomic.cyan[40],
      lightBlue: atomic.lightBlue[40],
      blue: atomic.blue[45],
      violet: atomic.violet[45],
      purple: atomic.purple[40],
      pink: atomic.pink[46],
    },
  },
  inverse: {
    primary: atomic.blue[60],
    background: atomic.coolNeutral[15],
    label: atomic.coolNeutral[99],
  },
  fill: {
    normal: addHexOpacity(atomic.coolNeutral[50], opacity[8]),
    strong: addHexOpacity(atomic.coolNeutral[50], opacity[16]),
    alternative: addHexOpacity(atomic.coolNeutral[50], opacity[5]),
  },
  material: {
    dimmer: addHexOpacity(atomic.coolNeutral[10], opacity[52]),
  },
  elevation: {
    shadow: {
      normal:
        '0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
      emphasize:
        '0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.12)',
      strong:
        '0px 0px 4px 0px rgba(0, 0, 0, 0.08), 0px 4px 8px 0px rgba(0, 0, 0, 0.08), 0px 6px 12px 0px rgba(0, 0, 0, 0.12)',
      heavy:
        '0px 0px 8px 0px rgba(0, 0, 0, 0.08), 0px 8px 16px 0px rgba(0, 0, 0, 0.08), 0px 16px 20px 0px rgba(0, 0, 0, 0.12)',
    },
  },
};

export const dark = {
  static: {
    white: atomic.common[100],
    black: atomic.common[0],
  },
  primary: {
    normal: atomic.blue[60],
    strong: atomic.blue[55],
    heavy: atomic.blue[50],
  },
  label: {
    normal: atomic.coolNeutral[99],
    strong: atomic.common[100],
    neutral: addHexOpacity(atomic.coolNeutral[90], opacity[88]),
    alternative: addHexOpacity(atomic.coolNeutral[80], opacity[61]),
    assistive: addHexOpacity(atomic.coolNeutral[80], opacity[28]),
    disable: addHexOpacity(atomic.coolNeutral[70], opacity[16]),
  },
  background: {
    normal: {
      normal: atomic.coolNeutral[15],
      alternative: atomic.coolNeutral[5],
    },
    elevated: {
      normal: atomic.coolNeutral[17],
      alternative: atomic.coolNeutral[7],
    },
  },
  interaction: {
    inactive: atomic.coolNeutral[40],
    disable: atomic.coolNeutral[22],
  },
  line: {
    normal: {
      normal: addHexOpacity(atomic.coolNeutral[50], 0.32),
      neutral: addHexOpacity(atomic.coolNeutral[50], opacity[28]),
      alternative: addHexOpacity(atomic.coolNeutral[50], opacity[22]),
    },
    solid: {
      normal: atomic.coolNeutral[25],
      neutral: atomic.coolNeutral[23],
      alternative: atomic.coolNeutral[22],
    },
  },
  status: {
    positive: atomic.green[60],
    cautionary: atomic.orange[60],
    negative: atomic.red[60],
  },
  accent: {
    background: {
      lime: atomic.lime[60],
      cyan: atomic.cyan[60],
      lightBlue: atomic.lightBlue[60],
      violet: atomic.violet[60],
      pink: atomic.pink[60],
      redOrange: atomic.redOrange[60],
      purple: atomic.purple[60],
    },
    foreground: {
      red: atomic.red[60],
      redOrange: atomic.redOrange[60],
      orange: atomic.orange[50],
      lime: atomic.lime[50],
      green: atomic.green[60],
      cyan: atomic.cyan[50],
      lightBlue: atomic.lightBlue[50],
      blue: atomic.blue[65],
      violet: atomic.violet[70],
      purple: atomic.purple[60],
      pink: atomic.pink[60],
    },
  },
  inverse: {
    primary: atomic.blue[50],
    background: atomic.common[100],
    label: atomic.coolNeutral[10],
  },
  fill: {
    normal: addHexOpacity(atomic.coolNeutral[50], opacity[22]),
    strong: addHexOpacity(atomic.coolNeutral[50], opacity[28]),
    alternative: addHexOpacity(atomic.coolNeutral[50], opacity[12]),
  },
  material: {
    dimmer: addHexOpacity(atomic.coolNeutral[10], opacity[74]),
  },
  elevation: {
    shadow: {
      normal:
        '0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
      emphasize:
        '0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.12)',
      strong:
        '0px 0px 4px 0px rgba(0, 0, 0, 0.08), 0px 4px 8px 0px rgba(0, 0, 0, 0.08), 0px 6px 12px 0px rgba(0, 0, 0, 0.12)',
      heavy:
        '0px 0px 8px 0px rgba(0, 0, 0, 0.08), 0px 8px 16px 0px rgba(0, 0, 0, 0.08), 0px 16px 20px 0px rgba(0, 0, 0, 0.12)',
    },
  },
};
