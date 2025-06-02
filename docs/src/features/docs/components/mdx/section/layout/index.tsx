import { FlexBox, Typography } from '@wanteddev/wds';
import { Fragment, memo, useMemo } from 'react';

import { generateHeadingId } from '@/features/docs/helpers/heading';

import HeadingLink from '../../heading-link';
import { sectionLayoutStyle } from '../style';

import type { PropsWithChildren } from 'react';

type HeadingProps = {
  content?: string;
};

const Heading2 = memo(({ content }: HeadingProps) => {
  const id = useMemo(() => {
    if (!content) return '';
    return generateHeadingId(content);
  }, [content]);

  if (!content) return null;

  return (
    <Typography
      as="h2"
      data-heading=""
      variant="title3"
      weight="bold"
      color="semantic.label.normal"
      id={id}
    >
      <HeadingLink id={id}>{content}</HeadingLink>
    </Typography>
  );
});

const Heading3 = memo(({ content }: HeadingProps) => {
  const id = useMemo(() => {
    if (!content) return '';
    return generateHeadingId(content);
  }, [content]);

  if (!content) return null;

  return (
    <Typography
      as="h3"
      data-heading=""
      variant="heading2"
      weight="bold"
      color="semantic.label.normal"
      id={id}
    >
      <HeadingLink id={id}>{content}</HeadingLink>
    </Typography>
  );
});

type SectionDescriptionProps = {
  content?: string;
};

const SectionDescription = ({ content }: SectionDescriptionProps) => {
  if (!content) return null;

  return (
    <Typography
      variant="body2-reading"
      weight="regular"
      as="p"
      color="semantic.label.neutral"
      sx={{ marginBottom: '0 !important' }}
    >
      {content.split('\n').map((v, i) => (
        <Fragment key={i}>
          {v}
          <br />
        </Fragment>
      ))}
    </Typography>
  );
};

type SectionLayoutProps = PropsWithChildren<{
  title?: string;
  description?: string;
  direction?: 'row' | 'column';
}>;

const SectionLayout = ({
  title,
  children,
  description,
  direction = 'column',
}: SectionLayoutProps) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <FlexBox flexDirection="column">
        <Heading2 content={title} />

        <SectionDescription content={description} />
      </FlexBox>
      <FlexBox
        flexDirection={direction}
        gap={direction === 'row' ? '20px' : '88px'}
      >
        {children}
      </FlexBox>
    </FlexBox>
  );
};

export { SectionLayout, Heading2, Heading3, SectionDescription };
