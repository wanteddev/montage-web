import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import { useMDXContext } from '@/features/docs/context';

import type { LNBFrontmatterGroup } from './types';
import type { Frontmatter } from '@/features/docs/types';

export const useLNBContent = () => {
  const { allFrontmatter } = useMDXContext();
  const params = useParams();

  const getIsActive = useCallback(
    (item: Frontmatter) => params.slug?.toString() === item.slug.toString(),
    [params],
  );

  const [category, setCategory] = useState<'design' | 'develop'>(
    params.slug?.at(0) === 'design' ? 'design' : 'develop',
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName.match(/(INPUT|TEXTAREA)/)) {
        return;
      }

      if (e.shiftKey && e.key.toLowerCase() === 'd') {
        setCategory((prev) => (prev === 'design' ? 'develop' : 'design'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredFrontmatter = useMemo(() => {
    return allFrontmatter
      .filter((frontmatter) =>
        category === 'design'
          ? frontmatter.slug.at(0) === category
          : frontmatter.slug.at(0)?.match(/^(web|ios|android)$/),
      )
      .reduce((acc: LNBFrontmatterGroup, cur) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, firstKey, secondKey, thirdKey] =
          category === 'design' ? cur.slug : ['', ...cur.slug];

        if (!firstKey) return acc;

        const isActive = getIsActive(cur);

        let firstLevelGroup = acc.find((item) => item.key === firstKey);

        if (!firstLevelGroup) {
          firstLevelGroup = {
            key: firstKey,
            defaultOpen: false,
            children: [],
          };
          acc.push(firstLevelGroup);
        }

        if (isActive) {
          firstLevelGroup.defaultOpen = true;
        }

        if (secondKey && !thirdKey) {
          (firstLevelGroup.children as Array<Frontmatter>).push(cur);
          return acc;
        }

        if (!secondKey) {
          (firstLevelGroup.children as Array<Frontmatter>).push(cur);
        } else {
          let secondLevelGroup = firstLevelGroup.children.find(
            (
              item,
            ): item is {
              key: string;
              children: Array<Frontmatter>;
              defaultOpen?: boolean;
            } => 'key' in item && item.key === secondKey,
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
  }, [allFrontmatter, category, getIsActive]);

  const handleCategoryChange = async (value: string) => {
    const firstParams = params.slug?.at(0);

    if (!firstParams) {
      return;
    }

    setCategory(value as typeof category);
  };

  return {
    frontmatters: filteredFrontmatter,
    category,
    handleCategoryChange,
  };
};
