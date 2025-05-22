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

const FIRST_LEVEL_ORDER: { [key: string]: number } = {
  'get-started': 1,
  foundations: 2,
  components: 3,
};

export const useLNBContent = () => {
  const { allFrontmatter } = useMDXContext();
  const params = useParams<SlugParams>();

  const filteredFrontmatter = useMemo(() => {
    const sortedFrontmatter = [...allFrontmatter].sort((a, b) => {
      const [aFirst] = a.slug;
      const [bFirst] = b.slug;

      // first level은 정해진 순서대로 정렬
      const aOrder = aFirst ? FIRST_LEVEL_ORDER[aFirst] || 999 : 999;
      const bOrder = bFirst ? FIRST_LEVEL_ORDER[bFirst] || 999 : 999;

      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }

      // third level은 알파벳 순서대로 정렬
      const aThirdLevel = a.slug[a.slug.length - 2];
      const bThirdLevel = b.slug[b.slug.length - 2];

      if (aThirdLevel && bThirdLevel) {
        return aThirdLevel.localeCompare(bThirdLevel);
      }

      return 0;
    });

    return sortedFrontmatter.reduce((acc: LNBFrontmatterGroup, cur) => {
      const [firstKey, secondKey, thirdKey] = cur.originSlug;

      if (!firstKey) return acc;

      const isActive = getIsActive(params, cur);

      let firstLevelGroup = acc.find(
        (item) => !isFrontmatter(item) && item.key === firstKey,
      );

      if (!firstLevelGroup && (!secondKey || !thirdKey)) {
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

      if (hasMatchingDevelopPlatformPage(cur.originSlug, allFrontmatter)) {
        return acc;
      }

      if (isActive) {
        (firstLevelGroup as LNBFrontmatterType).defaultOpen = true;
      }

      if (
        secondKey &&
        (!thirdKey || thirdKey.match(PLATFORM_PATTERN) || thirdKey === 'index')
      ) {
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
