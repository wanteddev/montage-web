import spacing from '../spacing';

const radius = {
  '00': spacing[0],
  '20': spacing[8],
  '25': spacing[10],
  '30': spacing[12],
  '35': spacing[14],
  '40': spacing[16],
  full: '9999px',
} as const;

export default radius;
