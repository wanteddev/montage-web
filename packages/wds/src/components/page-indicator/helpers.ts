export const getPageIndicatorDotVisibleArea = ({
  maxDotCount,
  totalPage,
  currentPage,
}: {
  maxDotCount: number;
  currentPage: number;
  totalPage: number;
}): [number, number] => {
  if (!currentPage) {
    return [0, maxDotCount - 1];
  }

  const currentIndex = currentPage - 1;
  const reference = Math.floor(maxDotCount / 2);

  // first
  if (currentIndex <= reference) {
    return [0, maxDotCount - 1];
    // last
  } else if (totalPage - reference <= currentIndex) {
    return [totalPage - maxDotCount, totalPage - 1];
  } else {
    const isEven = maxDotCount % 2 === 0;

    return [
      isEven
        ? currentIndex - maxDotCount / 2 + 1
        : currentIndex - Math.floor(maxDotCount / 2),
      isEven
        ? currentIndex + maxDotCount / 2
        : currentIndex + Math.floor(maxDotCount / 2),
    ];
  }
};
