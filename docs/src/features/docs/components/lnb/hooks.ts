import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import { useMDXContext } from '@/features/docs/context';

import { getIsActive } from './helpers';
import { isFrontmatter } from './group/helpers';

import type {
  LNBFrontmatterChildObj,
  LNBFrontmatterGroup,
  LNBFrontmatterType,
  SlugParams,
} from './types';
import type { Frontmatter } from '@/features/docs/types';

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
      ) as LNBFrontmatterType | undefined;

      if (
        !firstLevelGroup &&
        (!secondKey || secondKey.match(/(web|ios|android|changelog|design)$/))
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

      const newSlug = cur.slug.slice(0);

      if (
        newSlug.at(newSlug.length - 1)?.match(/(web|ios|android|changelog)$/) &&
        allFrontmatter.find(
          (frontmatter) =>
            frontmatter.slug.toString() ===
              cur.slug
                .toString()
                .replace(/(web|ios|android|changelog)$/, 'design') ||
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
      }

      if (
        secondKey &&
        (!thirdKey || thirdKey.match(/(web|ios|android|changelog|design)$/))
      ) {
        (firstLevelGroup.children as Array<Frontmatter>).push(cur);
        return acc;
      }

      if (!secondKey) {
        (firstLevelGroup.children as Array<Frontmatter>).push(cur);
      } else {
        let secondLevelGroup = firstLevelGroup.children.find(
          (item): item is LNBFrontmatterChildObj =>
            'key' in item && item.key === secondKey,
        );

        if (!secondLevelGroup) {
          secondLevelGroup = {
            key: secondKey,
            defaultOpen: false,
            children: [],
          };
          firstLevelGroup.children.push(secondLevelGroup);
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
