export const isColorIcon = (name: string) => {
  return name.endsWith('Color');
};

export const isNavigationIcon = (name: string) => {
  return name.startsWith('IconNavigation');
};

export const isSolidIcon = (name: string) => {
  return !isColorIcon(name) && !isNavigationIcon(name);
};

export const getKeywords = (description: string) => {
  const match = description.match(/키워드:\s*(.+)/);
  if (!match) return [];

  return match[1]?.split(',').map((keyword) => keyword.trim()) ?? [];
};
