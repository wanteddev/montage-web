import { MEDIUM_SCALE_RATIO, SMALL_SCALE_RATIO } from './constants';

export const getPaginationDotVisibleArea = ({
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
  const isEven = maxDotCount % 2 === 0;

  if (isEven) {
    // first
    if (currentIndex < reference) {
      return [0, maxDotCount - 1];
    }
    // last
    if (totalPage - reference < currentIndex) {
      return [totalPage - maxDotCount, totalPage - 1];
    }

    return [currentIndex - maxDotCount / 2, currentIndex + maxDotCount / 2 - 1];
  }

  // first
  if (currentIndex <= reference) {
    return [0, maxDotCount - 1];
  }

  // last
  if (totalPage - reference <= currentIndex) {
    return [totalPage - maxDotCount, totalPage - 1];
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
  totalPage: number;
};

export const getPaginationDotScale = ({
  index,
  visibleArea,
  maxDotCount,
  totalPage,
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
    (visibleArea[1] === totalPage - 1 &&
      index >= totalPage - Math.floor(maxDotCount / 2) - 1) ||
    (visibleArea[1] === totalPage - 2 && index === totalPage - 3)
  ) {
    return 1;
  }

  const distance = Math.min(
    Math.abs(index - visibleArea[0]),
    Math.abs(index - visibleArea[1]),
  );

  if (
    distance === 1 ||
    (visibleArea[0] === 1 && index === 1) ||
    (visibleArea[1] === totalPage - 2 && index === totalPage - 2)
  ) {
    return MEDIUM_SCALE_RATIO;
  }

  if (distance === 0) {
    return SMALL_SCALE_RATIO;
  }

  return 1;
};
