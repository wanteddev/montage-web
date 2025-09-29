import { FlexBox, Thumbnail, Typography } from '@wanteddev/wds';

import { sectionLayoutStyle } from '../style';
import { Heading2, SectionDescription } from '../layout';
import { sectionFigureThumbnailStyle } from '../figure/style';
import { anatomyItemPinStyle, anatomyItemStyle } from '../../anatomy/style';

import type { ThumbnailProps } from '@wanteddev/wds';

type SectionStatesProps = {
  description?: string;
  options?: Array<string>;
  src?: string;
  ratio?: ThumbnailProps['ratio'];
  portrait?: ThumbnailProps['portrait'];
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

        <SectionDescription content={description} />

        {src && (
          <Thumbnail
            aria-labelledby="states"
            src={src}
            alt="component states"
            width="100%"
            sx={sectionFigureThumbnailStyle}
            loading="lazy"
            ratio={ratio}
            portrait={portrait}
          />
        )}

        {options && <SectionStatesItem options={options} />}
      </FlexBox>
    </FlexBox>
  );
};

type SectionStatesItemProps = {
  options: Array<string>;
};

const SectionStatesItem = ({ options }: SectionStatesItemProps) => {
  return (
    <FlexBox flexWrap="wrap" rowGap="8px" columnGap="64px" flex="1 0 auto">
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
