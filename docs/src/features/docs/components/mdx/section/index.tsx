import { Box, Divider, FlexBox, Thumbnail, Typography } from '@wanteddev/wds';
import { type ComponentProps, type PropsWithChildren, useId } from 'react';

import HeadingLink from '../heading-link';
import { inlineCodeStyle } from '../code-block/style';

import {
  customizeStyle,
  sectionFigureStyle,
  sectionFigureThumbnailStyle,
  sectionLayoutStyle,
} from './style';

type SectionLayoutProps = PropsWithChildren<{
  title?: string;
  description?: string;
  direction?: 'row' | 'column';
}>;

const SectionLayout = ({
  title,
  children,
  description,
  direction = 'row',
}: SectionLayoutProps) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      {Boolean(title) && (
        <>
          <SectionDivider />
          <Typography
            as="h2"
            data-heading=""
            variant="title2"
            weight="bold"
            display="block"
            id={title!.replaceAll(' ', '-')}
          >
            <HeadingLink id={title!.replaceAll(' ', '-')}>{title}</HeadingLink>
          </Typography>
        </>
      )}

      {Boolean(description) && (
        <Typography variant="body1" weight="regular" as="p" display="block">
          {description}
        </Typography>
      )}
      <FlexBox
        flexDirection={direction}
        gap={direction === 'row' ? '20px' : '56px'}
      >
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
  border?: boolean;
};

const SectionFigure = ({
  ratio = '16:9',
  portrait,
  title,
  src,
  border,
  description,
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
          sx={sectionFigureThumbnailStyle(border)}
          ratio={ratio}
          portrait={portrait}
        />
      )}
      <FlexBox flexDirection="column" gap="8px">
        {title && (
          <Typography
            as="p"
            variant="headline2"
            weight="bold"
            display="block"
            id={id}
          >
            {title}
          </Typography>
        )}

        {Boolean(description) && (
          <Typography variant="body1" weight="regular" as="p" display="block">
            {description}
          </Typography>
        )}
      </FlexBox>
    </FlexBox>
  );
};

const SectionDivider = () => {
  return <Divider sx={{ margin: '48px 0px' }} />;
};

type CustomizeProps = {
  data: Array<{
    key: string;
    options: Array<string>;
  }>;
};

const SectionCustomize = ({ data }: CustomizeProps) => {
  return (
    <FlexBox flexDirection="column" gap="16px" flex="1">
      {data.map((v) => (
        <FlexBox key={v.key} gap="20px" alignItems="center" sx={customizeStyle}>
          <Typography
            variant="label1"
            weight="bold"
            color="semantic.label.strong"
            sx={{ minWidth: 120 }}
          >
            {v.key}
          </Typography>
          <FlexBox gap="6px">
            {v.options.map((option) => (
              <Box key={option} sx={inlineCodeStyle} as="code">
                <span>{option}</span>
              </Box>
            ))}
          </FlexBox>
        </FlexBox>
      ))}
    </FlexBox>
  );
};

export { SectionLayout, SectionFigure, SectionDivider, SectionCustomize };
