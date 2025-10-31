export const isBasicColor = (color: string | number) => {
  switch (color.toString()) {
    case '100':
    case '99':
    case '95':
    case '90':
    case '80':
    case '70':
    case '60':
    case '50':
    case '40':
    case '30':
    case '20':
    case '10':
    case '5':
    case '0':
      return true;
    default:
      return false;
  }
};
