import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import { useMDXContext } from '@/features/docs/context';

import {
  getIsActive,
  hasMatchingDevelopPlatformPage,
  isFrontmatter,
} from './helpers';
import { PLATFORM_PATTERN } from './constants';

import type {
  LNBFrontmatterChildObj,
  LNBFrontmatterGroup,
  LNBFrontmatterType,
  SlugParams,
} from './types';

export const useLNBContent = () => {
  const { allFrontmatter } = useMDXContext();
  const params = useParams<SlugParams>();

  const filteredFrontmatter = useMemo(() => {
    return allFrontmatter.reduce((acc: LNBFrontmatterGroup, cur) => {
      const [firstKey, secondKey, thirdKey] = cur.slug;

      if (!firstKey) return acc;

      const isActive = getIsActive(params, cur);

      let firstLevelGroup = acc.find(
        (item) => !isFrontmatter(item) && item.key === firstKey,
      );

      if (
        !firstLevelGroup &&
        (!secondKey || secondKey.match(PLATFORM_PATTERN))
      ) {
        acc.push(cur);
        return acc;
      }

      if (!firstLevelGroup) {
        firstLevelGroup = {
          key: firstKey,
          defaultOpen: false,
          children: [],
        };
        acc.push(firstLevelGroup);
      }

      if (hasMatchingDevelopPlatformPage(cur.slug, allFrontmatter)) {
        return acc;
      }

      if (isActive) {
        (firstLevelGroup as LNBFrontmatterType).defaultOpen = true;
      }

      if (secondKey && (!thirdKey || thirdKey.match(PLATFORM_PATTERN))) {
        (firstLevelGroup as LNBFrontmatterType).children.push(cur);
        return acc;
      }

      if (!secondKey) {
        (firstLevelGroup as LNBFrontmatterType).children.push(cur);
      } else {
        let secondLevelGroup = (
          firstLevelGroup as LNBFrontmatterType
        ).children.find(
          (item): item is LNBFrontmatterChildObj =>
            'key' in item && item.key === secondKey,
        );

        if (!secondLevelGroup) {
          secondLevelGroup = {
            key: secondKey,
            defaultOpen: false,
            children: [],
          };
          (firstLevelGroup as LNBFrontmatterType).children.push(
            secondLevelGroup,
          );
        }

        if (isActive) {
          secondLevelGroup.defaultOpen = true;
        }

        secondLevelGroup.children.push(cur);
      }

      return acc;
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(allFrontmatter)]);

  return {
    frontmatters: filteredFrontmatter,
  };
};
