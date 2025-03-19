import { useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';

import { useMDXContext } from '@/features/docs/context';

import type {
  LNBFrontmatterChildObj,
  LNBFrontmatterGroup,
  LNBFrontmatterItem,
} from './types';
import type { Frontmatter } from '@/features/docs/types';

export const useLNBContent = () => {
  const { allFrontmatter } = useMDXContext();
  const params = useParams();

  const getIsActive = useCallback(
    (item: Frontmatter) =>
      params.slug
        ?.toString()
        .replace(/(web|ios|android|changelog|guide)$/, '') ===
      item.slug.toString().replace(/(web|ios|android|changelog|guide)$/, ''),
    [params],
  );

  const filteredFrontmatter = useMemo(() => {
    return allFrontmatter.reduce((acc: LNBFrontmatterGroup, cur) => {
      const [firstKey, secondKey, thirdKey] = cur.slug;

      if (!firstKey) return acc;

      const isActive = getIsActive(cur);

      let firstLevelGroup = acc.find((item) => item.key === firstKey);

      if (!firstLevelGroup) {
        firstLevelGroup = {
          key: firstKey,
          defaultOpen: false,
          isActive: false,
          children: [],
        };
        acc.push(firstLevelGroup);
      }

      const newSlug = cur.slug.slice(0);

      if (
        newSlug.at(newSlug.length - 1)?.match(/(web|ios|android|changelog)$/) &&
        allFrontmatter.find(
          (frontmatter) =>
            frontmatter.slug.toString() ===
              cur.slug
                .toString()
                .replace(/(web|ios|android|changelog)$/, 'guide') ||
            frontmatter.slug.toString() ===
              cur.slug
                .toString()
                .replace(/(web|ios|android|changelog)$/, 'web') ||
            frontmatter.slug.toString() ===
              cur.slug
                .toString()
                .replace(/(web|ios|android|changelog)$/, 'ios') ||
            frontmatter.slug.toString() ===
              cur.slug
                .toString()
                .replace(/(web|ios|android|changelog)$/, 'android'),
        )
      ) {
        return acc;
      }

      if (isActive) {
        firstLevelGroup.defaultOpen = true;
        firstLevelGroup.isActive = true;
      }

      if (secondKey && !thirdKey) {
        (firstLevelGroup.children as Array<LNBFrontmatterItem>).push({
          ...cur,
          isActive,
        });
        return acc;
      }

      if (!secondKey) {
        (firstLevelGroup.children as Array<LNBFrontmatterItem>).push({
          ...cur,
          isActive,
        });
      } else {
        let secondLevelGroup = firstLevelGroup.children.find(
          (item): item is LNBFrontmatterChildObj =>
            'key' in item && item.key === secondKey,
        );

        if (!secondLevelGroup) {
          secondLevelGroup = {
            key: secondKey,
            defaultOpen: false,
            isActive: false,
            children: [],
          };
          firstLevelGroup.children.push(secondLevelGroup);
        }

        if (isActive) {
          secondLevelGroup.defaultOpen = true;
          secondLevelGroup.isActive = true;
        }

        secondLevelGroup.children.push({ ...cur, isActive });
      }

      return acc;
    }, []);
  }, [allFrontmatter, getIsActive]);

  return {
    frontmatters: filteredFrontmatter,
  };
};
