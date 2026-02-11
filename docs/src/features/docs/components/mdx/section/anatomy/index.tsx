import { FlexBox, Typography } from '@wanteddev/wds';

import { Heading2, SectionThumbnail } from '../layout';
import { sectionLayoutStyle } from '../style';

import { anatomyItemStyle, anatomyListStyle } from './style';

type Props = {
  data: Array<string>;
  src?: string;
  ratio?: string;
};

const SectionAnatomy = ({ ratio = '21 / 9', data, src }: Props) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <Heading2 content="Anatomy" />

      <FlexBox flexDirection="column">
        <SectionThumbnail src={src} ratio={ratio} />

        <FlexBox
          flexWrap="wrap"
          flex="1 0 auto"
          rowGap="16px"
          columnGap="32px"
          as="ol"
          sx={anatomyListStyle}
        >
          {data.map((value, i) => (
            <Typography
              key={value + i}
              sx={anatomyItemStyle}
              as="li"
              variant="body2"
              weight="medium"
              color="semantic.label.normal"
            >
              <span>{i + 1}.&nbsp;</span>
              {value}
            </Typography>
          ))}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default SectionAnatomy;
