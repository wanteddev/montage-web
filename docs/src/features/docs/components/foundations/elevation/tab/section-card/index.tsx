import { FlexBox, Grid, GridItem, Thumbnail, Typography } from '@wanteddev/wds';

import { getImageUrl } from '@/helpers/image';

import { sectionCardStyle } from './style';

import type { SxProp } from '@wanteddev/wds';

type Props = {
  data: Array<{ title: string; description: string; image: string }>;
  sx?: SxProp;
};

const SectionCard = ({ data, sx }: Props) => {
  return (
    <Grid columnSpacing={40} rowSpacing={20} sx={sx}>
      {data.map((item) => (
        <GridItem key={item.title} columns={12} sm={{ columns: 6 }}>
          <FlexBox flexDirection="column" gap="8px">
            <Thumbnail
              ratio="2:1"
              border
              radius
              width="100%"
              src={getImageUrl(item.image)}
              aria-hidden
              alt={item.title}
              sx={sectionCardStyle}
            />
            <FlexBox
              flexDirection="column"
              gap="4px"
              sx={{ padding: '0px 6px' }}
            >
              <Typography
                variant="body1"
                weight="bold"
                color="semantic.label.strong"
                as="p"
              >
                {item.title}
              </Typography>

              <Typography
                variant="label2"
                weight="medium"
                color="semantic.label.alternative"
                as="p"
              >
                {item.description}
              </Typography>
            </FlexBox>
          </FlexBox>
        </GridItem>
      ))}
    </Grid>
  );
};

export default SectionCard;
