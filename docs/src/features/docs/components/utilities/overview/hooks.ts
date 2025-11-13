import { useMemo } from 'react';

import { useMDXContext } from '@/features/docs/contexts';

import type { UtilitiesFrontmatter } from './types';

type UseUtilitiesFrontmatterParams = {
  platform: 'web' | 'android' | 'ios';
};

export const useUtilitiesFrontmatter = ({
  platform,
}: UseUtilitiesFrontmatterParams) => {
  const { allFrontmatter } = useMDXContext();

  const frontmatters = useMemo(() => {
    const filteredFrontmatters = allFrontmatter.filter(
      (frontmatter) =>
        frontmatter.slug.at(0)?.toLowerCase() === 'utilities' &&
        frontmatter.slug.length > 2 &&
        frontmatter.slug.at(1)?.toLowerCase().includes(platform),
    );

    const grouped = filteredFrontmatters.reduce<
      Record<string, Array<(typeof filteredFrontmatters)[number]>>
    >((acc, frontmatter) => {
      const key = frontmatter.slug[1];

      if (!key) return acc;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(frontmatter);
      return acc;
    }, {});

    const result: Array<UtilitiesFrontmatter> = Object.entries(grouped).map(
      ([title, children]) => ({
        title,
        children,
      }),
    );

    return result.sort((a, b) => a.title.localeCompare(b.title));
  }, [allFrontmatter, platform]);

  return frontmatters;
};
