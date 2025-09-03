import { MEDIUM_SCALE_RATIO, SMALL_SCALE_RATIO } from './constants';

export const getPaginationDotsVisibleArea = ({
  maxDotCount,
  totalPages,
  currentPage,
}: {
  maxDotCount: number;
  currentPage: number;
  totalPages: number;
}): [number, number] => {
  if (!currentPage) {
    return [0, maxDotCount - 1];
  }

  const currentIndex = currentPage - 1;
  const reference = Math.floor(maxDotCount / 2);
  const isEven = maxDotCount % 2 === 0;

  if (
    isEven &&
    currentIndex >= reference &&
    totalPages - reference > currentIndex
  ) {
    return [
      currentIndex - reference + 1,
      currentIndex + Math.floor(maxDotCount / 2),
    ];
  }

  // first
  if (currentIndex <= reference) {
    return [0, maxDotCount - 1];
  }

  // last
  if (totalPages - reference <= currentIndex) {
    return [totalPages - maxDotCount, totalPages - 1];
  }

  return [
    currentIndex - Math.floor(maxDotCount / 2),
    currentIndex + Math.floor(maxDotCount / 2),
  ];
};

type GetPaginationDotScaleParams = {
  index: number;
  visibleArea: [number, number];
  maxDotCount: number;
  totalPages: number;
};

export const getPaginationDotScale = ({
  index,
  visibleArea,
  maxDotCount,
  totalPages,
}: GetPaginationDotScaleParams) => {
  if (!(index >= visibleArea[0] && index <= visibleArea[1])) {
    return 0;
  }

  // first
  if (
    (visibleArea[0] === 0 && Math.floor(maxDotCount / 2) > index) ||
    (visibleArea[0] === 1 && index === 2)
  ) {
    return 1;
  }

  // last
  if (
    (visibleArea[1] === totalPages - 1 &&
      index >= totalPages - Math.floor(maxDotCount / 2) - 1) ||
    (visibleArea[1] === totalPages - 2 && index === totalPages - 3)
  ) {
    return 1;
  }

  const distance = Math.min(
    Math.abs(index - visibleArea[0]),
    Math.abs(index - visibleArea[1]),
  );

  if (
    (visibleArea[0] === 1 && index === 1) ||
    (visibleArea[1] === totalPages - 2 && index === totalPages - 2)
  ) {
    return MEDIUM_SCALE_RATIO;
  }

  if (distance === 1) {
    return maxDotCount <= 4 ? 1 : MEDIUM_SCALE_RATIO;
  }

  if (distance === 0) {
    return maxDotCount <= 4 ? MEDIUM_SCALE_RATIO : SMALL_SCALE_RATIO;
  }

  return 1;
};
