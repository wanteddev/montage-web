import {
  ContentBadge,
  Divider,
  FlexBox,
  Thumbnail,
  Typography,
} from '@wanteddev/wds';
import {
  type ComponentProps,
  Fragment,
  type PropsWithChildren,
  useId,
} from 'react';
import * as React from 'react';
import * as Wds from '@wanteddev/wds';
import { IconCircleCheckFill, IconCircleCloseFill } from '@wanteddev/wds-icon';

import HeadingLink from '../heading-link';
import { inlineCodeStyle } from '../code-block/style';
import { anatomyItemPinStyle, anatomyItemStyle } from '../anatomy/style';
import { useRunner } from '../demo/react-runner';

import {
  customizeStyle,
  sectionFigureStyle,
  sectionFigureThumbnailStyle,
  sectionFigureVariantStyle,
  sectionHierarchyItemStyle,
  sectionLayoutStyle,
} from './style';

type Heading2Props = {
  content?: string;
};

const Heading2 = ({ content }: Heading2Props) => {
  if (!content) return null;

  return (
    <Typography
      as="h2"
      data-heading=""
      variant="title3"
      weight="bold"
      color="semantic.label.normal"
      id={content.replaceAll(' ', '-')}
    >
      <HeadingLink id={content.replaceAll(' ', '-')}>{content}</HeadingLink>
    </Typography>
  );
};

type DescriptionProps = {
  content?: string;
};

const Description = ({ content }: DescriptionProps) => {
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
    <FlexBox flexDirection="column" sx={sectionLayoutStyle} gap="24px">
      <FlexBox flexDirection="column">
        <Heading2 content={title} />

        <Description content={description} />
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

type SectionFigureGroupProps = PropsWithChildren<{
  title?: string;
}>;

const SectionFigureGroup = ({ children, title }: SectionFigureGroupProps) => {
  return (
    <FlexBox
      flexDirection="column"
      sx={[sectionLayoutStyle, { marginBottom: '0 !important' }]}
    >
      {title && (
        <Typography as="h3" variant="heading2" weight="bold">
          {title}
        </Typography>
      )}
      <FlexBox flexDirection="column" gap="88px">
        {children}
      </FlexBox>
    </FlexBox>
  );
};

type SectionFigureProps = {
  title?: string;
  description?: string;
  src?: string;
  ratio?: ComponentProps<typeof Thumbnail>['ratio'];
  portrait?: ComponentProps<typeof Thumbnail>['portrait'];
  variant?: 'positive' | 'negative';
};

const SectionFigure = ({
  ratio = '21:9',
  portrait,
  title,
  src,
  description,
  variant,
}: SectionFigureProps) => {
  const id = useId();

  return (
    <FlexBox flexDirection="column" sx={sectionFigureStyle} flex="1 1 0%">
      {src && (
        <Thumbnail
          aria-labelledby={id}
          src={src}
          alt="thumbnail"
          disableOptimize
          width="100%"
          sx={[sectionFigureThumbnailStyle, variant && { marginBottom: 12 }]}
          ratio={ratio}
          radius
          portrait={portrait}
        />
      )}
      {variant ? (
        <FlexBox gap="16px" sx={sectionFigureVariantStyle(variant)}>
          {variant === 'positive' ? (
            <IconCircleCheckFill sx={{ fontSize: 40 }} />
          ) : (
            <IconCircleCloseFill sx={{ fontSize: 40 }} />
          )}
          <FlexBox
            flexDirection="column"
            gap="2px"
            sx={{ ['&& p']: { marginBottom: '0 !important' } }}
          >
            <Typography
              color={
                variant === 'positive'
                  ? 'semantic.status.positive'
                  : 'semantic.status.negative'
              }
              variant="headline2"
              weight="bold"
            >
              {variant === 'positive' ? 'Do' : "Don't"}
            </Typography>

            <Description content={description} />
          </FlexBox>
        </FlexBox>
      ) : (
        <FlexBox flexDirection="column" gap="4px">
          {title && (
            <Typography
              as="p"
              variant="headline2"
              weight="bold"
              color="semantic.label.normal"
              id={id}
            >
              {title}
            </Typography>
          )}

          <Description content={description} />
        </FlexBox>
      )}
    </FlexBox>
  );
};

type SectionStatesProps = {
  description?: string;
  options?: Array<string>;
  src?: string;
  ratio?: ComponentProps<typeof Thumbnail>['ratio'];
  portrait?: ComponentProps<typeof Thumbnail>['portrait'];
};

const SectionStates = ({
  description,
  options,
  ratio = '21:9',
  portrait,
  src,
}: SectionStatesProps) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <FlexBox flexDirection="column">
        <Heading2 content="States" />

        <Description content={description} />

        {src && (
          <Thumbnail
            aria-labelledby="states"
            src={src}
            alt="component states"
            disableOptimize
            width="100%"
            sx={sectionFigureThumbnailStyle}
            ratio={ratio}
            portrait={portrait}
          />
        )}
      </FlexBox>
      <FlexBox flexWrap="wrap" rowGap="8px" columnGap="64px" flex="1 0 auto">
        {options?.map((value, i) => (
          <FlexBox
            key={value + i}
            sx={[anatomyItemStyle, { width: 200 }]}
            alignItems="center"
            gap="12px"
          >
            <Typography
              variant="caption1"
              weight="bold"
              sx={anatomyItemPinStyle}
            >
              <span>{i + 1}</span>
            </Typography>
            <Typography
              variant="label1"
              weight="bold"
              color="semantic.label.normal"
            >
              {value}
            </Typography>
          </FlexBox>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

type CustomizeProps = {
  data: Array<{
    key: string;
    options: Array<string>;
  }>;
};

const SectionCustomize = ({ data }: CustomizeProps) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <Heading2 content="Customize" />

      {data.map((v, i) => (
        <Fragment key={v.key}>
          <FlexBox sx={customizeStyle}>
            <Typography
              variant="label1"
              weight="bold"
              color="semantic.label.strong"
              sx={{ minWidth: 120 }}
            >
              {v.key}
            </Typography>

            <FlexBox gap="6px" flexWrap="wrap">
              {v.options.map((option) => (
                <code key={option}>
                  <ContentBadge
                    color="accent"
                    accentColor="semantic.accent.foreground.blue"
                    sx={inlineCodeStyle}
                  >
                    {option}
                  </ContentBadge>
                </code>
              ))}
            </FlexBox>
          </FlexBox>

          {i !== data.length - 1 && (
            <Divider color="semantic.line.normal.alternative" />
          )}
        </Fragment>
      ))}
    </FlexBox>
  );
};

const SectionHierarchy = ({ children }: PropsWithChildren) => {
  return (
    <FlexBox flexDirection="column" gap="56px" sx={sectionLayoutStyle}>
      <Heading2 content="Hierarchy" />
      <FlexBox flexDirection="column">{children}</FlexBox>
    </FlexBox>
  );
};

type SectionHierarchyItemProps = {
  level: number;
  description: string;
  render?: string;
};

const SectionHierarchyItem = ({
  level,
  description,
  render,
}: SectionHierarchyItemProps) => {
  const scope = React.useMemo(() => {
    return {
      import: {
        react: React,
        '@wanteddev/wds': Wds,
      },
    };
  }, []);

  const { element } = useRunner({
    code: render ?? '',
    scope,
  });

  return (
    <FlexBox sx={sectionHierarchyItemStyle}>
      <ContentBadge
        color="neutral"
        size="small"
        variant="solid"
        sx={{ flexShrink: 0 }}
      >
        L{level}
      </ContentBadge>

      {element}

      <Description content={description} />
    </FlexBox>
  );
};

export {
  SectionLayout,
  SectionFigure,
  SectionFigureGroup,
  SectionStates,
  SectionCustomize,
  SectionHierarchy,
  SectionHierarchyItem,
};
