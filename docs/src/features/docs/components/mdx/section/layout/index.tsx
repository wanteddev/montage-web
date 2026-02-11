import { Box, FlexBox, Thumbnail, Typography } from '@wanteddev/wds';
import { Fragment, memo, useMemo } from 'react';

import { useHeadingContext } from '@/features/docs/contexts';
import { getImageUrl } from '@/helpers/image';

import HeadingLink from '../../heading-link';
import { sectionLayoutStyle } from '../style';

import { hasList, renderParsedContent } from './helpers';
import { sectionThumbnailStyle } from './style';

import type { SxProp } from '@wanteddev/wds';
import type { PropsWithChildren, ReactNode } from 'react';

type HeadingProps = {
  content?: string;
  trailingContent?: ReactNode;
  sx?: SxProp;
  id?: string;
};

const Heading2 = memo(
  ({ content, trailingContent, sx, ...props }: HeadingProps) => {
    const { generateHeadingId } = useHeadingContext();

    const id = useMemo(() => {
      if (!content) return '';
      return props.id || generateHeadingId(content);
    }, [content, generateHeadingId, props.id]);

    if (!content) return null;

    return (
      <Typography
        as="h2"
        data-heading=""
        variant="heading1"
        weight="bold"
        color="semantic.label.normal"
        id={id}
        sx={[{ scrollMarginTop: 'calc(var(--gnb-height) + 56px)' }, sx]}
      >
        <HeadingLink id={id}>
          {content}
          {trailingContent}
        </HeadingLink>
      </Typography>
    );
  },
);

const Heading3 = memo(({ content, sx }: HeadingProps) => {
  const { generateHeadingId } = useHeadingContext();

  const id = useMemo(() => {
    if (!content) return '';
    return generateHeadingId(content);
  }, [content, generateHeadingId]);

  if (!content) return null;

  return (
    <Typography
      as="h3"
      data-heading=""
      variant="headline2"
      weight="bold"
      color="semantic.label.normal"
      id={id}
      sx={[{ scrollMarginTop: 'calc(var(--gnb-height) + 64px)' }, sx]}
    >
      <HeadingLink id={id}>{content}</HeadingLink>
    </Typography>
  );
});

type SectionDescriptionProps = {
  content?: ReactNode;
  sx?: SxProp;
};

const SectionDescription = memo(({ content, sx }: SectionDescriptionProps) => {
  const isString = typeof content === 'string';
  const hasListContent = isString && hasList(content);

  const renderContent = useMemo(
    () => (isString ? renderParsedContent(content) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (!content) return null;

  if (!isString) {
    return content;
  }

  if (!hasListContent) {
    return (
      <Typography
        variant="body2-reading"
        weight="medium"
        as="p"
        color="semantic.label.neutral"
        sx={[
          {
            marginBottom: '0 !important',
          },
          sx,
        ]}
      >
        {content.split('\n').map((line, index) => (
          <Fragment key={index}>
            {line}
            <br />
          </Fragment>
        ))}
      </Typography>
    );
  }

  return (
    <Box
      sx={[
        {
          marginBottom: '0 !important',
        },
        sx,
      ]}
    >
      {renderContent}
    </Box>
  );
});

type Props = {
  src?: string;
  ratio?: string;
};

const SectionThumbnail = memo(({ src, ratio }: Props) => {
  if (!src) return null;

  return (
    <Thumbnail
      src={getImageUrl(src)}
      alt="hidden"
      aria-hidden
      width="100%"
      sx={sectionThumbnailStyle(ratio ?? '21 / 9')}
      loading="lazy"
      radius
    />
  );
});

type SectionLayoutProps = PropsWithChildren<{
  title?: string;
  description?: string;
}>;

const SectionLayout = ({
  title,
  children,
  description,
}: SectionLayoutProps) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <FlexBox flexDirection="column">
        <Heading2 content={title} />

        <SectionDescription
          content={description}
          sx={{ marginBottom: '32px !important' }}
        />
      </FlexBox>
      <FlexBox flexDirection="column">{children}</FlexBox>
    </FlexBox>
  );
};

export {
  SectionLayout,
  Heading2,
  Heading3,
  SectionDescription,
  SectionThumbnail,
};
