import type { InternalDocSearchHit } from '../../types';

export const parseStringFromHit = (
  hit: InternalDocSearchHit,
  attribute: string,
) => {
  return (
    getPropertyByPath(hit, `_snippetResult.${attribute}.value`) ||
    getPropertyByPath(hit, attribute)
  );
};

export const getPropertyByPath = (
  object: Record<string, any>,
  path: string,
): any => {
  const parts = path.split('.');

  return parts.reduce((prev, current) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (prev?.[current]) return prev[current];
    return null;
  }, object);
};
