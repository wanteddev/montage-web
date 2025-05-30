import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import { useMDXContext } from '@/features/docs/context';

import {
  findOrCreateGroup,
  getFrontmatterTitle,
  getIsActive,
  hasMatchingDevelopPlatformPage,
  isFrontmatter,
} from './helpers';

import type {
  LNBFrontmatterChild,
  LNBFrontmatterGroup,
  SlugParams,
} from './types';
import type { Frontmatter } from '@/features/docs/types';

const FIRST_LEVEL_ORDER: { [key: string]: number } = {
  'Get started': 0,
  Foundations: 1,
  Components: 2,
  Utilities: 3,
};

export const useLNBContent = () => {
  const { allFrontmatter } = useMDXContext();
  const params = useParams<SlugParams>();

  const filteredFrontmatter = useMemo(() => {
    const addToGroup = (
      frontmatter: Frontmatter,
      groups: LNBFrontmatterGroup,
      depth = 0,
    ): void => {
      if (
        hasMatchingDevelopPlatformPage(frontmatter.originSlug, allFrontmatter)
      ) {
        return;
      }

      const currentKey = getFrontmatterTitle(frontmatter, depth);
      if (!currentKey) return;

      const isActive = getIsActive(params, frontmatter);

      // 마지막 depth이거나 더 이상 하위 키가 없는 경우
      if (depth >= frontmatter.slug.length - 1) {
        if (depth === 0) {
          groups.push({
            ...frontmatter,
            title: currentKey,
          });
        } else {
          groups.push({
            ...frontmatter,
            title: currentKey,
          });
        }
        return;
      }

      if (currentKey === frontmatter.title) {
        groups.push({
          ...frontmatter,
          title: frontmatter.title,
        });
        return;
      }

      const currentGroup = findOrCreateGroup(groups, currentKey);

      if (isActive) {
        currentGroup.defaultOpen = true;
      }

      addToGroup(frontmatter, currentGroup.children, depth + 1);
    };

    const result: LNBFrontmatterGroup = [];

    [...allFrontmatter].reverse().forEach((frontmatter) => {
      addToGroup(frontmatter, result);
    });

    return result.sort((a, b) => {
      const getOrder = (item: LNBFrontmatterChild) => {
        if (isFrontmatter(item)) {
          return FIRST_LEVEL_ORDER[item.title] ?? 0;
        }

        return FIRST_LEVEL_ORDER[item.key] ?? 0;
      };

      return getOrder(a) - getOrder(b);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(allFrontmatter)]);

  return {
    frontmatters: filteredFrontmatter,
  };
};
