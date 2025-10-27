'use client';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { Box } from '@wanteddev/wds';
import Image from 'next/image';

import { useMDXContext } from '../../context';
import { getFrontmatterImage } from '../../helpers/mdx.client';

import { thumbnailStyle } from './style';

import type { SlugParams } from '../lnb/types';

const DocsThumbnail = () => {
  const { allFrontmatter } = useMDXContext();
  const { slug = [] } = useParams<SlugParams>();

  const frontmatter = useMemo(() => {
    return allFrontmatter.find((v) => v.slug.toString() === slug.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug.toString(), allFrontmatter]);

  const image = useMemo(() => {
    if (!frontmatter) {
      return null;
    }

    return getFrontmatterImage(frontmatter, allFrontmatter);
  }, [frontmatter, allFrontmatter]);

  if (!image) {
    return null;
  }

  return (
    <Box sx={thumbnailStyle}>
      <Box
        as={Image}
        src={image}
        width={760}
        height={326}
        alt={frontmatter?.title ?? 'thumbnail'}
        fetchPriority="high"
        priority
      />
    </Box>
  );
};

export default DocsThumbnail;
