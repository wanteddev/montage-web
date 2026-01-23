import { Box, FlexBox, Typography } from '@wanteddev/wds';
import { Fragment } from 'react';

import { sectionLayoutStyle } from '../style';
import { Heading2 } from '../layout';
import { inlineCodeStyle } from '../../code-block/style';

import { customizeOptionStyle, customizeStyle } from './style';

type Props = {
  data: Array<{
    key: string;
    options: Array<string>;
  }>;
};

const SectionCustomize = ({ data }: Props) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <Heading2 content="Customize" sx={{ marginBottom: '12px !important' }} />

      {data.map((v) => (
        <Fragment key={v.key}>
          <FlexBox sx={customizeStyle}>
            <Typography
              variant="headline2"
              weight="bold"
              color="semantic.label.strong"
              sx={{ minWidth: 160 }}
            >
              {v.key}
            </Typography>

            <FlexBox gap="12px" flexWrap="wrap">
              {v.options.map((option) => (
                <Box key={option}>
                  <Box as="code" sx={[inlineCodeStyle, customizeOptionStyle]}>
                    {option}
                  </Box>
                </Box>
              ))}
            </FlexBox>
          </FlexBox>
        </Fragment>
      ))}
    </FlexBox>
  );
};

export default SectionCustomize;
