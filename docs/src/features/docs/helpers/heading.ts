const headingCounts = new Map<string, number>();

export const generateHeadingId = (content: string): string => {
  if (!content) return '';

  const baseId = content.replaceAll(' ', '-').toLowerCase();

  if (!headingCounts.has(baseId)) {
    headingCounts.set(baseId, 0);
    return baseId;
  }

  const count = headingCounts.get(baseId)! + 1;
  headingCounts.set(baseId, count);
  return `${baseId}-${count}`;
};

export const resetHeadingIds = () => {
  headingCounts.clear();
};
