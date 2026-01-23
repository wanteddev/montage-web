'use client';
import { Typography } from '@wanteddev/wds';
import { useParams } from 'next/navigation';
import { Fragment, useMemo } from 'react';

import { breakWordStyle } from '@/styles/text';

import { useMDXContext } from '../../contexts';
import {
  getFrontmatterDescription,
  getFrontmatterTitleWithDesignPage,
} from '../../helpers/mdx.client';

import type { SlugParams } from '../lnb/types';

type Props = {
  title?: string;
  description?: string;
};

const DocsTitle = ({
  title: customTitle,
  description: customDescription,
}: Props) => {
  const { allFrontmatter } = useMDXContext();
  const params = useParams<SlugParams>();

  const frontmatter = useMemo(() => {
    return allFrontmatter.find(
      (v) => v.slug.toString() === params.slug?.toString(),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug?.toString(), allFrontmatter]);

  const title = useMemo(() => {
    if (customTitle) {
      return customTitle;
    }

    if (!frontmatter) {
      return null;
    }

    return getFrontmatterTitleWithDesignPage(frontmatter, allFrontmatter);
  }, [frontmatter, allFrontmatter, customTitle]);

  const description = useMemo(() => {
    if (customDescription) {
      return customDescription;
    }

    if (!frontmatter) {
      return null;
    }

    return getFrontmatterDescription(frontmatter, allFrontmatter);
  }, [frontmatter, allFrontmatter, customDescription]);

  if (!title && !description) {
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
          weight="medium"
          color="semantic.label.neutral"
          sx={[
            {
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
