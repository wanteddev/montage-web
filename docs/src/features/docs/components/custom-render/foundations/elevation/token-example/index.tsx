import {
  FlexBox,
  Tab,
  TabList,
  TabListItem,
  TabPanel,
  Thumbnail,
  Typography,
} from '@wanteddev/wds';

import { tokenThumbnailStyle, tokenTypographyStyle } from './style';

const NORMAL_TOKENS = ['XSmall', 'Small', 'Medium', 'Large', 'XLarge'] as const;

const SPREAD_TOKENS = ['Small', 'Medium'] as const;

const TokenExample = () => {
  return (
    <FlexBox flexDirection="column" gap="56px" sx={{ marginTop: '56px' }}>
      <Tab defaultValue="normal">
        <TabList size="large">
          <TabListItem value="normal">Normal</TabListItem>
          <TabListItem value="spread">Spread</TabListItem>
        </TabList>
        <TabPanel value="normal">
          <FlexBox flexWrap="wrap" gap="20px">
            {NORMAL_TOKENS.map((token) => (
              <FlexBox
                key={token}
                flexDirection="column"
                gap="8px"
                sx={{ position: 'relative' }}
              >
                <Thumbnail
                  radius
                  border
                  width="120px"
                  ratio="1:1"
                  src={`/foundations/elevation/normal/${token}.png`}
                  sx={tokenThumbnailStyle}
                />

                <Typography
                  variant="caption2"
                  weight="bold"
                  color="semantic.label.normal"
                  align="center"
                  sx={tokenTypographyStyle}
                >
                  {token}
                </Typography>
              </FlexBox>
            ))}
          </FlexBox>
        </TabPanel>
        <TabPanel value="spread">
          <FlexBox flexWrap="wrap" gap="20px">
            {SPREAD_TOKENS.map((token) => (
              <FlexBox
                key={token}
                flexDirection="column"
                gap="8px"
                sx={{ position: 'relative' }}
              >
                <Thumbnail
                  radius
                  border
                  width="120px"
                  ratio="1:1"
                  src={`/foundations/elevation/normal/${token}.png`}
                  sx={tokenThumbnailStyle}
                />

                <Typography
                  variant="caption2"
                  weight="bold"
                  color="semantic.label.normal"
                  align="center"
                  sx={tokenTypographyStyle}
                >
                  {token}
                </Typography>
              </FlexBox>
            ))}
          </FlexBox>
        </TabPanel>
      </Tab>
    </FlexBox>
  );
};

export default TokenExample;
