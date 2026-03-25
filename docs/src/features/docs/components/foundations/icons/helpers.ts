export const isColorIcon = (name: string) => {
  return name.endsWith('Color');
};

export const isNavigationIcon = (name: string) => {
  return name.startsWith('IconNavigation');
};

export const isSolidIcon = (name: string) => {
  return !isColorIcon(name) && !isNavigationIcon(name);
};
