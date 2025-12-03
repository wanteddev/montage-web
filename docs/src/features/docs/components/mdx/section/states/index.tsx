import { ContentBadge, FlexBox, Thumbnail, Typography } from '@wanteddev/wds';
import { IconGlobe } from '@wanteddev/wds-icon';

import { getImageUrl } from '@/helpers/image';

import { sectionLayoutStyle } from '../style';
import { Heading2, SectionDescription } from '../layout';
import { sectionFigureThumbnailStyle } from '../figure/style';
import { anatomyItemPinStyle, anatomyItemStyle } from '../anatomy/style';

import type { SxProp, ThumbnailProps } from '@wanteddev/wds';

type SectionStatesProps = {
  description?: string;
  options?: Array<string>;
  src?: string;
  ratio?: ThumbnailProps['ratio'];
  portrait?: ThumbnailProps['portrait'];
  isWebOnly?: boolean;
};

const SectionStates = ({
  description,
  options,
  ratio = '21:9',
  portrait,
  src,
  isWebOnly,
}: SectionStatesProps) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <FlexBox flexDirection="column">
        <Heading2
          content="States"
          trailingContent={
            isWebOnly ? (
              <ContentBadge
                variant="solid"
                size="xsmall"
                color="accent"
                leadingContent={
                  <IconGlobe
                    sx={(theme) => ({
                      fontSize: '12px',
                      color: theme.semantic.accent.foreground.purple,
                    })}
                  />
                }
                accentColor="semantic.accent.foreground.purple"
                sx={{ flexShrink: 0 }}
              >
                Web only
              </ContentBadge>
            ) : null
          }
        />

        {src && (
          <Thumbnail
            aria-labelledby="states"
            src={getImageUrl(src)}
            alt="component states"
            width="100%"
            sx={sectionFigureThumbnailStyle}
            loading="lazy"
            ratio={ratio}
            portrait={portrait}
          />
        )}

        <SectionDescription content={description} />

        {options && (
          <SectionStatesItem
            options={options}
            sx={
              Boolean(description) && {
                paddingInline: '12px',
                marginTop: '24px',
              }
            }
          />
        )}
      </FlexBox>
    </FlexBox>
  );
};

type SectionStatesItemProps = {
  options: Array<string>;
  sx?: SxProp;
};

const SectionStatesItem = ({ options, sx }: SectionStatesItemProps) => {
  return (
    <FlexBox
      flexWrap="wrap"
      rowGap="8px"
      columnGap="64px"
      flex="1 0 auto"
      sx={sx}
    >
      {options.map((value, i) => (
        <FlexBox
          key={value + i}
          sx={[anatomyItemStyle, { width: 200 }]}
          alignItems="center"
          gap="12px"
        >
          <Typography variant="caption1" weight="bold" sx={anatomyItemPinStyle}>
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
  );
};

export { SectionStates, SectionStatesItem };
