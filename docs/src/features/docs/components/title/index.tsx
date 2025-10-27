'use client';
import { Typography } from '@wanteddev/wds';
import { useParams } from 'next/navigation';
import { Fragment, useMemo } from 'react';

import { breakWordStyle } from '@/styles/text';

import { useMDXContext } from '../../context';
import {
  getFrontmatterDescription,
  getFrontmatterTitle,
} from '../../helpers/mdx.client';

import type { SlugParams } from '../lnb/types';

const DocsTitle = () => {
  const { allFrontmatter } = useMDXContext();
  const params = useParams<SlugParams>();

  const frontmatter = useMemo(() => {
    return allFrontmatter.find(
      (v) => v.slug.toString() === params.slug?.toString(),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug?.toString(), allFrontmatter]);

  const title = useMemo(() => {
    if (!frontmatter) {
      return null;
    }

    return getFrontmatterTitle(frontmatter);
  }, [frontmatter]);

  const description = useMemo(() => {
    if (!frontmatter) {
      return null;
    }

    return getFrontmatterDescription(frontmatter, allFrontmatter);
  }, [frontmatter, allFrontmatter]);

  if (!frontmatter) {
    return null;
  }

  return (
    <>
      <Typography
        variant="display3"
        weight="bold"
        as="h1"
        data-algolia-page-title
        sx={breakWordStyle}
      >
        {title}
      </Typography>

      {Boolean(description) && (
        <Typography
          variant="body2-reading"
          weight="regular"
          color="semantic.label.neutral"
          sx={[
            {
              maxWidth: '640px',
              marginTop: '24px',
            },
            breakWordStyle,
          ]}
          as="p"
        >
          {description?.split('\n').map((v) => (
            <Fragment key={v}>
              {v}
              <br />
            </Fragment>
          ))}
        </Typography>
      )}
    </>
  );
};

export default DocsTitle;
