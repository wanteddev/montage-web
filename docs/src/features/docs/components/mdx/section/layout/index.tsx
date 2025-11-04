import { Box, FlexBox, Typography } from '@wanteddev/wds';
import { Fragment, memo, useMemo } from 'react';

import { useHeadingContext } from '@/features/docs/contexts';

import HeadingLink from '../../heading-link';
import { sectionLayoutStyle } from '../style';

import { hasList, renderParsedContent } from './helpers';

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
        variant="title3"
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
      variant="heading2"
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
  disablePadding?: boolean;
};

const SectionDescription = memo(
  ({ content, disablePadding = false }: SectionDescriptionProps) => {
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
          weight="regular"
          as="p"
          color="semantic.label.neutral"
          sx={{
            marginBottom: '0 !important',
            paddingInline: '12px !important',
            ...(disablePadding && { paddingInline: '0px !important' }),
          }}
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
        sx={{
          marginBottom: '0 !important',
          paddingInline: '12px !important',
          ...(disablePadding && { paddingInline: '0px !important' }),
        }}
      >
        {renderContent}
      </Box>
    );
  },
);

type SectionLayoutProps = PropsWithChildren<{
  title?: string;
  description?: string;
  direction?: 'row' | 'column';
  disablePadding?: boolean;
}>;

const SectionLayout = ({
  title,
  children,
  description,
  direction = 'column',
  disablePadding = false,
}: SectionLayoutProps) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <FlexBox flexDirection="column">
        <Heading2 content={title} />

        <SectionDescription
          content={description}
          disablePadding={disablePadding}
        />
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
