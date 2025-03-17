import { Divider, FlexBox, Thumbnail, Typography } from '@wanteddev/wds';
import {
  type ComponentProps,
  type PropsWithChildren,
  useId,
  useMemo,
} from 'react';

import HeadingLink from '../heading-link';

import {
  sectionFigureStyle,
  sectionFigureThumbnailStyle,
  sectionLayoutStyle,
} from './style';

import type { ThemeColorsToken } from '@wanteddev/wds';

type SectionLayoutProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

const SectionLayout = ({
  title,
  children,
  description,
}: SectionLayoutProps) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <SectionDivider />
      <Typography
        as="h2"
        data-heading=""
        variant="title2"
        weight="bold"
        display="block"
        id={title.replaceAll(' ', '-')}
      >
        <HeadingLink id={title.replaceAll(' ', '-')}>{title}</HeadingLink>
      </Typography>
      {Boolean(description) && (
        <Typography variant="body1" weight="regular" as="p" display="block">
          {description}
        </Typography>
      )}
      <FlexBox gap="20px">{children}</FlexBox>
    </FlexBox>
  );
};

type SectionFigureProps = {
  title: string;
  description?: string;
  src?: string;
  ratio?: ComponentProps<typeof Thumbnail>['ratio'];
  portrait?: ComponentProps<typeof Thumbnail>['portrait'];
  variant?: 'default' | 'do' | 'dont';
};

const SectionFigure = ({
  ratio = '16:9',
  variant = 'default',
  portrait,
  title,
  src,
  description,
}: SectionFigureProps) => {
  const id = useId();

  const color: ThemeColorsToken | undefined = useMemo(() => {
    switch (variant) {
      case 'do':
        return 'semantic.status.positive';
      case 'dont':
        return 'semantic.status.negative';
      case 'default':
      default:
        return undefined;
    }
  }, [variant]);

  return (
    <FlexBox flexDirection="column" sx={sectionFigureStyle} flex="1 1 0%">
      {src && (
        <Thumbnail
          aria-labelledby={id}
          src={src}
          alt="thumbnail"
          disableOptimize
          width="100%"
          sx={sectionFigureThumbnailStyle(color)}
          ratio={ratio}
          portrait={portrait}
        />
      )}
      <FlexBox flexDirection="column" gap="8px">
        <Typography
          as="p"
          variant="headline2"
          weight="bold"
          display="block"
          id={id}
          color={color}
        >
          {title}
        </Typography>

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

export { SectionLayout, SectionFigure, SectionDivider };
