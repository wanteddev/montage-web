export const NORMAL_TOKENS = [
  {
    token: 'shadow-normal-none',
    key: 'none',
    values: {
      default: 'none',
      ios: 'none',
      android: 'none',
    },
  },
  {
    token: 'shadow-normal-xsmall',
    key: 'xsmall',
    values: {
      default: 'x:0px, y:1px, blur:2px, spread:-1px, rgba(23, 23, 23, 0.1);',
      ios: 'x:0px, y:1px, shadowRadius:0.5px, rgba(23, 23, 23, 0.05);',
      android:
        'x:0px, y:1px, blurRadius:0.87px, spread:-1px, rgba(23, 23, 23, 0.1);',
    },
  },
  {
    token: 'shadow-normal-small',
    key: 'small',
    values: {
      default:
        'x:0px, y:4px, blur:6px, spread:-1px, rgba(23, 23, 23, 0.06),\nx:0px, y:2px, blur:4px, spread:-2px, rgba(23, 23, 23, 0.06);',
      ios: 'x:0px, y:2px, shadowRadius:1px, rgba(23, 23, 23, 0.03),\nx:0px, y:4px, shadowRadius:2.5px, rgba(23, 23, 23, 0.03);',
      android:
        'x:0px, y:2px, blurRadius:1.73px, spread:-2px, rgba(23, 23, 23, 0.06),\nx:0px, y:4px, blurRadius:4.33px, spread:-1px, rgba(23, 23, 23, 0.06);',
    },
  },
  {
    token: 'shadow-normal-medium',
    key: 'medium',
    values: {
      default:
        'x:0px, y:4px, blur:6px, spread:-2px, rgba(23, 23, 23, 0.07),\nx:0px, y:10px, blur:15px, spread:-3px, rgba(23, 23, 23, 0.07);',
      ios: 'x:0px, y:4px, shadowRadius:2px, rgba(23, 23, 23, 0.035),\nx:0px, y:10px, shadowRadius:6px, rgba(23, 23, 23, 0.035);',
      android:
        'x:0px, y:4px, blurRadius:3.46px, spread:-2px, rgba(23, 23, 23, 0.07),\nx:0px, y:10px, blurRadius:10.39px, spread:-3px, rgba(23, 23, 23, 0.07);',
    },
  },
  {
    token: 'shadow-normal-large',
    key: 'large',
    values: {
      default:
        'x:0px, y:6px, blur:10px, spread:-4px, rgba(23, 23, 23, 0.08),\nx:0px, y:16px, blur:24px, spread:-6px, rgba(23, 23, 23, 0.08);',
      ios: 'x:0px, y:6px, shadowRadius:3px, rgba(23, 23, 23, 0.4),\nx:0px, y:16px, shadowRadius:9px, rgba(23, 23, 23, 0.4);',
      android:
        'x:0px, y:6px, blurRadius:5.20px, spread:-4px, rgba(23, 23, 23, 0.08),\nx:0px, y:16px, blurRadius:15.59px, spread:-6px, rgba(23, 23, 23, 0.08);',
    },
  },
  {
    token: 'shadow-normal-xlarge',
    key: 'xlarge',
    values: {
      default:
        'x:0px, y:10px, blur:15px, spread:-5px, rgba(23, 23, 23, 0.1),\nx:0px, y:24px, blur:38px, spread:-10px, rgba(23, 23, 23, 0.12);',
      ios: 'x:0px, y:10px, shadowRadius:5px, rgba(23, 23, 23, 0.05),\nx:0px, y:24px, shadowRadius:14px, rgba(23, 23, 23, 0.06);',
      android:
        'x:0px, y:10px, blurRadius:8.66px, spread:-5px, rgba(23, 23, 23, 0.1),\nx:0px, y:24px, blurRadius:24.25px, spread:-10px, rgba(23, 23, 23, 0.12);',
    },
  },
];
