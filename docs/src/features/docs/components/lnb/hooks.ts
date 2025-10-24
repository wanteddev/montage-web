import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import { useMDXContext } from '@/features/docs/context';
import { getFrontmatterTitle } from '@/features/docs/helpers/mdx.client';

import {
  findOrCreateGroup,
  getIsActive,
  hasMatchingDevelopPlatformPage,
} from './helpers';
import { PLATFORM_PATTERN } from './constants';

import type {
  LNBFrontmatterChild,
  LNBFrontmatterGroup,
  LNBFrontmatterType,
  SlugParams,
} from './types';
import type { Frontmatter } from '@/features/docs/types';

export const useLNBContent = () => {
  const { allFrontmatter } = useMDXContext();
  const params = useParams<SlugParams>();

  const frontmatters = useMemo(() => {
    const addToGroup = (
      frontmatter: Frontmatter,
      groups: LNBFrontmatterGroup | Array<LNBFrontmatterChild>,
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
      if (
        depth !== 0 &&
        (depth >= frontmatter.slug.length - 1 ||
          (frontmatter.originSlug.at(-1)?.match(PLATFORM_PATTERN) &&
            depth === frontmatter.originSlug.length - 2))
      ) {
        groups.push({
          ...frontmatter,
          title: currentKey,
        } as unknown as LNBFrontmatterType);

        return;
      }

      const currentGroup = findOrCreateGroup(
        groups as unknown as LNBFrontmatterGroup,
        currentKey,
      );

      if (isActive) {
        currentGroup.defaultOpen = true;
      }

      addToGroup(frontmatter, currentGroup.children, depth + 1);
    };

    const result: LNBFrontmatterGroup = [];

    [...allFrontmatter].forEach((frontmatter) => {
      addToGroup(frontmatter, result);
    });

    return result;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(allFrontmatter), params.slug]);

  return {
    frontmatters,
  };
};
